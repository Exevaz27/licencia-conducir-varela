// ========================================================
// CONTROLADOR PRINCIPAL DE LA APLICACIÓN DE ESTUDIO
// ========================================================

// Estado Global
let currentQuestions = [...questionsData];
let filteredQuestions = [...questionsData];
let currentTab = 'read';
let onlySignsFilter = false;

// Estado de Síntesis de Voz
let synth = window.speechSynthesis;
let availableVoices = [];
let selectedVoice = null;
let speechRate = 1.0;
let isSpeaking = false;
let isContinuousPlaying = false;
let continuousIndex = 0;
let currentActiveCardId = null;

// Estado del Quiz (Modo Práctica)
let quizQuestions = [];
let quizCurrentIndex = 0;
let quizScoreCorrect = 0;
let quizScoreIncorrect = 0;
let quizUserMistakes = [];
let quizLengthSetting = 40;
let quizAutoSpeak = false;

// Estado de Flashcards
let flashcardsList = [...questionsData];
let flashcardIndex = 0;
let flashcardIsFlipped = false;

// ========================================================
// INICIALIZACIÓN
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  initSpeechVoices();
  renderQuestionsList();
  initFlashcard();
});

// Inicializar voces de síntesis de voz en español
function initSpeechVoices() {
  if (!('speechSynthesis' in window)) {
    console.warn('La síntesis de voz no es compatible con este navegador.');
    const statusBadge = document.getElementById('player-status-badge');
    if (statusBadge) statusBadge.innerText = 'Voz no soportada';
    return;
  }

  const loadVoices = () => {
    availableVoices = synth.getVoices().filter(v => v.lang.startsWith('es'));
    const select = document.getElementById('audio-voice-select');
    if (!select) return;

    select.innerHTML = '';
    if (availableVoices.length === 0) {
      // Si no hay filtro específico de español, permitir todas las voces
      availableVoices = synth.getVoices();
    }

    // Preferir voz en español de Argentina o por defecto
    let preferredVoice = availableVoices.find(v => v.lang === 'es-AR') ||
                         availableVoices.find(v => v.lang.startsWith('es')) ||
                         availableVoices[0];

    availableVoices.forEach((v, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.className = 'bg-slate-800 text-white';
      opt.textContent = `${v.name} (${v.lang})`;
      if (v === preferredVoice) {
        opt.selected = true;
        selectedVoice = v;
      }
      select.appendChild(opt);
    });

    if (!selectedVoice && availableVoices.length > 0) {
      selectedVoice = availableVoices[0];
    }
  };

  loadVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
  }
}

function changeVoice(voiceIdx) {
  if (availableVoices[voiceIdx]) {
    selectedVoice = availableVoices[voiceIdx];
  }
}

function changeAudioSpeed(val) {
  speechRate = parseFloat(val) || 1.0;
}

// ========================================================
// GESTIÓN DE PESTAÑAS (TABS)
// ========================================================
function switchTab(tab) {
  currentTab = tab;
  stopAudio();

  // Vistas
  document.getElementById('view-read').classList.add('hidden');
  document.getElementById('view-practice').classList.add('hidden');
  document.getElementById('view-flashcards').classList.add('hidden');

  // Botones
  const resetBtn = (id) => {
    const btn = document.getElementById(id);
    btn.className = 'tab-btn px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-200 flex items-center gap-2';
  };
  const activeBtn = (id) => {
    const btn = document.getElementById(id);
    btn.className = 'tab-btn px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 bg-white text-brand-600 shadow-sm';
  };

  resetBtn('tab-read-btn');
  resetBtn('tab-practice-btn');
  resetBtn('tab-flashcards-btn');

  if (tab === 'read') {
    document.getElementById('view-read').classList.remove('hidden');
    activeBtn('tab-read-btn');
  } else if (tab === 'practice') {
    document.getElementById('view-practice').classList.remove('hidden');
    activeBtn('tab-practice-btn');
  } else if (tab === 'flashcards') {
    document.getElementById('view-flashcards').classList.remove('hidden');
    activeBtn('tab-flashcards-btn');
    renderFlashcard();
  }
}

// ========================================================
// PESTAÑA 1: LECTURA Y PREGUNTAS
// ========================================================
function renderQuestionsList() {
  const container = document.getElementById('questions-list');
  const countEl = document.getElementById('filtered-count');
  container.innerHTML = '';

  countEl.innerText = filteredQuestions.length;

  if (filteredQuestions.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center bg-white rounded-3xl border border-slate-200">
        <div class="text-4xl mb-3">🔍</div>
        <h3 class="text-lg font-bold text-slate-800">No se encontraron preguntas</h3>
        <p class="text-sm text-slate-500 mt-1">Prueba con otra palabra clave o selecciona "Todas las categorías".</p>
      </div>
    `;
    return;
  }

  filteredQuestions.forEach((q) => {
    const card = document.createElement('div');
    card.id = `card-q-${q.id}`;
    card.className = 'bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between';

    const signalHtml = getSignalSvg(q.id);

    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center shrink-0">
              #${q.id}
            </span>
            <span class="badge-tag bg-slate-100 text-slate-600 text-[11px] font-semibold">
              ${q.category}
            </span>
          </div>

          <!-- Botón de Audio Individual -->
          <button onclick="speakQuestionCard(${q.id})" id="audio-btn-${q.id}" class="p-2 rounded-xl bg-slate-50 hover:bg-brand-50 text-slate-500 hover:text-brand-600 transition flex items-center gap-1 text-xs font-semibold" title="Escuchar en voz alta">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"/></svg>
            <span class="hidden sm:inline">Escuchar</span>
          </button>
        </div>

        <!-- Pregunta -->
        <h3 class="font-bold text-slate-900 text-base leading-snug mb-3">
          ${q.question}
        </h3>

        <!-- Gráfico o señal vial si corresponde -->
        ${signalHtml ? `<div class="my-3 py-2 bg-slate-50 rounded-xl">${signalHtml}</div>` : ''}

        <!-- Respuesta Oficial Resaltada -->
        <div class="mt-3 p-3.5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl">
          <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1 flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
            Respuesta:
          </div>
          <p class="text-sm font-semibold text-emerald-950 leading-relaxed">
            ${q.answer}
          </p>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function filterQuestions() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
  const catVal = document.getElementById('category-filter').value;

  filteredQuestions = questionsData.filter(q => {
    // Filtro por categoría
    if (catVal !== 'all' && q.category !== catVal) {
      return false;
    }
    // Filtro por señales
    if (onlySignsFilter && !q.hasSignalImages && q.type !== 'sign') {
      return false;
    }
    // Filtro por término de búsqueda
    if (searchTerm) {
      const matchQ = q.question.toLowerCase().includes(searchTerm);
      const matchA = q.answer.toLowerCase().includes(searchTerm);
      const matchNum = q.id.toString() === searchTerm;
      return matchQ || matchA || matchNum;
    }
    return true;
  });

  renderQuestionsList();
}

function toggleSignsFilter() {
  onlySignsFilter = !onlySignsFilter;
  const btn = document.getElementById('toggle-signs-btn');
  if (onlySignsFilter) {
    btn.className = 'px-3 py-2.5 rounded-xl border border-brand-500 text-xs sm:text-sm font-bold bg-brand-50 text-brand-700 whitespace-nowrap transition flex items-center gap-1.5 shadow-sm';
  } else {
    btn.className = 'px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 whitespace-nowrap transition flex items-center gap-1.5';
  }
  filterQuestions();
}

// ========================================================
// SISTEMA DE SÍNTESIS DE VOZ (TEXT-TO-SPEECH)
// ========================================================
function speakText(text, onEndCallback = null) {
  if (!('speechSynthesis' in window)) {
    alert('Tu navegador no soporta síntesis de voz.');
    return;
  }

  synth.cancel(); // Detener reproducción previa

  const cleanText = text
    .replace(/[\[\]]/g, '')
    .replace(/Km\/h/gi, 'kilómetros por hora')
    .replace(/gr\./gi, 'gramos')
    .replace(/Nº|N°/gi, 'número');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = speechRate;
  utterance.lang = 'es-AR';

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.onend = () => {
    isSpeaking = false;
    if (onEndCallback) onEndCallback();
  };

  utterance.onerror = (e) => {
    console.error('Error de voz:', e);
    isSpeaking = false;
    if (onEndCallback) onEndCallback();
  };

  isSpeaking = true;
  synth.speak(utterance);
}

function speakQuestionCard(id) {
  stopContinuousPlay();
  const q = questionsData.find(item => item.id === id);
  if (!q) return;

  highlightCard(id);

  const titleEl = document.getElementById('player-current-title');
  const badgeEl = document.getElementById('player-status-badge');
  if (titleEl) titleEl.innerText = `Pregunta #${q.id}: ${q.question}`;
  if (badgeEl) {
    badgeEl.innerText = 'Hablando';
    badgeEl.className = 'px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500 text-white animate-pulse';
  }

  const fullText = `Pregunta número ${q.id}. ${q.question}. Respuesta: ${q.answer}`;
  speakText(fullText, () => {
    clearHighlightCard();
    if (badgeEl) {
      badgeEl.innerText = 'Listo';
      badgeEl.className = 'px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white';
    }
  });
}

function highlightCard(id) {
  clearHighlightCard();
  currentActiveCardId = id;
  const card = document.getElementById(`card-q-${id}`);
  if (card) {
    card.classList.add('audio-active-card');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function clearHighlightCard() {
  if (currentActiveCardId) {
    const prev = document.getElementById(`card-q-${currentActiveCardId}`);
    if (prev) prev.classList.remove('audio-active-card');
    currentActiveCardId = null;
  }
}

// Reproducción Continua (Modo Manos Libres)
function toggleContinuousPlay() {
  if (isContinuousPlaying) {
    stopContinuousPlay();
  } else {
    startContinuousPlay();
  }
}

function startContinuousPlay() {
  if (filteredQuestions.length === 0) return;
  isContinuousPlaying = true;
  continuousIndex = 0;

  const btnText = document.getElementById('play-btn-text');
  const playIcon = document.getElementById('play-icon');
  const badgeEl = document.getElementById('player-status-badge');

  if (btnText) btnText.innerText = 'Pausar Lectura';
  if (playIcon) playIcon.innerHTML = `<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>`;
  if (badgeEl) {
    badgeEl.innerText = 'Lectura Continua Activa';
    badgeEl.className = 'px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500 text-white animate-pulse';
  }

  playNextInSequence();
}

function playNextInSequence() {
  if (!isContinuousPlaying) return;

  if (continuousIndex >= filteredQuestions.length) {
    stopContinuousPlay();
    const titleEl = document.getElementById('player-current-title');
    if (titleEl) titleEl.innerText = 'Lectura de preguntas finalizada con éxito.';
    return;
  }

  const q = filteredQuestions[continuousIndex];
  highlightCard(q.id);

  const titleEl = document.getElementById('player-current-title');
  if (titleEl) titleEl.innerText = `[${continuousIndex + 1}/${filteredQuestions.length}] Pregunta #${q.id}: ${q.question}`;

  const speechText = `Pregunta ${q.id}. ${q.question}. Respuesta: ${q.answer}`;
  speakText(speechText, () => {
    if (isContinuousPlaying) {
      continuousIndex++;
      setTimeout(playNextInSequence, 700); // Pequeña pausa natural entre preguntas
    }
  });
}

function stopContinuousPlay() {
  isContinuousPlaying = false;
  synth.cancel();
  clearHighlightCard();

  const btnText = document.getElementById('play-btn-text');
  const playIcon = document.getElementById('play-icon');
  const badgeEl = document.getElementById('player-status-badge');

  if (btnText) btnText.innerText = 'Reproducir Todo';
  if (playIcon) playIcon.innerHTML = `<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>`;
  if (badgeEl) {
    badgeEl.innerText = 'Detenido';
    badgeEl.className = 'px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white';
  }
}

function stopAudio() {
  stopContinuousPlay();
  synth.cancel();
  clearHighlightCard();
}

// ========================================================
// PESTAÑA 2: MODO PRÁCTICA (TEST INTERACTIVO)
// ========================================================
function selectQuizLength(num) {
  quizLengthSetting = num;
  document.querySelectorAll('.quiz-len-btn').forEach(btn => {
    if (parseInt(btn.getAttribute('data-len')) === num) {
      btn.className = 'quiz-len-btn p-3 rounded-xl border-2 border-brand-500 bg-brand-50 text-brand-700 text-center font-bold transition';
    } else {
      btn.className = 'quiz-len-btn p-3 rounded-xl border border-slate-200 text-center font-bold text-slate-700 hover:border-brand-500 hover:text-brand-600 transition';
    }
  });
}

function startQuiz() {
  const catFilter = document.getElementById('quiz-category-select').value;
  quizAutoSpeak = document.getElementById('quiz-auto-speech').checked;

  let pool = [...questionsData];
  if (catFilter !== 'all') {
    pool = pool.filter(q => q.category === catFilter);
  }

  if (pool.length === 0) {
    alert('No hay preguntas disponibles con el filtro seleccionado.');
    return;
  }

  // Shuffle aleatorio
  pool.sort(() => Math.random() - 0.5);

  // Limitar cantidad
  const total = Math.min(quizLengthSetting, pool.length);
  quizQuestions = pool.slice(0, total);

  quizCurrentIndex = 0;
  quizScoreCorrect = 0;
  quizScoreIncorrect = 0;
  quizUserMistakes = [];

  document.getElementById('quiz-setup').classList.add('hidden');
  document.getElementById('quiz-results').classList.add('hidden');
  document.getElementById('quiz-active').classList.remove('hidden');

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = quizQuestions[quizCurrentIndex];
  const total = quizQuestions.length;

  // Actualizar marcadores
  document.getElementById('quiz-current-num').innerText = quizCurrentIndex + 1;
  document.getElementById('quiz-total-num').innerText = total;
  document.getElementById('quiz-score-correct').innerText = quizScoreCorrect;
  document.getElementById('quiz-score-incorrect').innerText = quizScoreIncorrect;

  const pct = Math.round(((quizCurrentIndex) / total) * 100);
  document.getElementById('quiz-progress-bar').style.width = `${pct}%`;
  document.getElementById('quiz-percent-text').innerText = `${pct}%`;

  document.getElementById('quiz-question-category').innerText = q.category;
  document.getElementById('quiz-question-text').innerText = `${q.id}. ${q.question}`;

  // Gráfico/Señal
  const signalBox = document.getElementById('quiz-signal-container');
  const signalSvg = getSignalSvg(q.id);
  if (signalSvg) {
    signalBox.innerHTML = signalSvg;
    signalBox.classList.remove('hidden');
  } else {
    signalBox.classList.add('hidden');
    signalBox.innerHTML = '';
  }

  // Ocultar feedback previo y deshabilitar botón siguiente
  const feedbackBox = document.getElementById('quiz-feedback-box');
  feedbackBox.classList.add('hidden');
  document.getElementById('quiz-next-btn').disabled = true;

  // Renderizar Opciones de respuesta
  const optsContainer = document.getElementById('quiz-options-container');
  optsContainer.innerHTML = '';

  q.options.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn w-full p-4 rounded-2xl border-2 border-slate-200 hover:border-brand-500 bg-white hover:bg-slate-50 text-left font-semibold text-slate-800 text-sm sm:text-base flex items-start gap-3 transition active:scale-[0.99]';
    btn.onclick = () => selectQuizAnswer(idx, q);

    const letter = ['A', 'B', 'C', 'D'][idx] || (idx + 1);
    btn.innerHTML = `
      <span class="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
        ${letter}
      </span>
      <span class="leading-relaxed flex-1">${optText}</span>
    `;

    optsContainer.appendChild(btn);
  });

  // Auto-hablar pregunta si está activado
  if (quizAutoSpeak) {
    speakText(`Pregunta ${q.id}. ${q.question}`);
  }
}

function selectQuizAnswer(chosenIndex, q) {
  // Deshabilitar todos los botones para que no vuelva a tocar
  const optButtons = document.querySelectorAll('.quiz-opt-btn');
  optButtons.forEach(btn => {
    btn.disabled = true;
    btn.classList.remove('hover:border-brand-500', 'hover:bg-slate-50', 'active:scale-[0.99]');
  });

  const isCorrect = (chosenIndex === q.correctIndex);
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const feedbackIcon = document.getElementById('quiz-feedback-icon');
  const feedbackTitle = document.getElementById('quiz-feedback-title');
  const feedbackDesc = document.getElementById('quiz-feedback-desc');

  // Resaltar opciones elegidas y correctas
  optButtons.forEach((btn, idx) => {
    if (idx === q.correctIndex) {
      btn.classList.remove('border-slate-200', 'bg-white');
      btn.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-900', 'ring-2', 'ring-emerald-400');
    } else if (idx === chosenIndex && !isCorrect) {
      btn.classList.remove('border-slate-200', 'bg-white');
      btn.classList.add('border-rose-500', 'bg-rose-50', 'text-rose-900', 'ring-2', 'ring-rose-400');
    }
  });

  if (isCorrect) {
    quizScoreCorrect++;
    feedbackBox.className = 'p-4 rounded-2xl border border-emerald-300 bg-emerald-50/90 text-emerald-950 transition-all';
    feedbackIcon.className = 'w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold';
    feedbackIcon.innerHTML = '✓';
    feedbackTitle.innerText = '¡Respuesta Correcta!';
    feedbackDesc.innerText = q.answer;
  } else {
    quizScoreIncorrect++;
    quizUserMistakes.push({
      question: q,
      chosenText: q.options[chosenIndex],
      correctText: q.options[q.correctIndex]
    });
    feedbackBox.className = 'p-4 rounded-2xl border border-rose-300 bg-rose-50/90 text-rose-950 transition-all';
    feedbackIcon.className = 'w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 font-bold';
    feedbackIcon.innerHTML = '✕';
    feedbackTitle.innerText = 'Respuesta Incorrecta';
    feedbackDesc.innerText = `La respuesta correcta es: ${q.answer}`;
  }

  feedbackBox.classList.remove('hidden');

  // Actualizar marcadores inmediatos
  document.getElementById('quiz-score-correct').innerText = quizScoreCorrect;
  document.getElementById('quiz-score-incorrect').innerText = quizScoreIncorrect;
  document.getElementById('quiz-next-btn').disabled = false;
}

function speakCurrentQuizQuestion() {
  const q = quizQuestions[quizCurrentIndex];
  if (!q) return;
  speakText(`Pregunta ${q.id}. ${q.question}`);
}

function nextQuizQuestion() {
  quizCurrentIndex++;
  if (quizCurrentIndex < quizQuestions.length) {
    renderQuizQuestion();
  } else {
    finishQuiz();
  }
}

function exitQuiz() {
  if (confirm('¿Deseas salir del examen en curso? Tu progreso se perderá.')) {
    stopAudio();
    document.getElementById('quiz-active').classList.add('hidden');
    document.getElementById('quiz-setup').classList.remove('hidden');
  }
}

function finishQuiz() {
  stopAudio();
  document.getElementById('quiz-active').classList.add('hidden');
  document.getElementById('quiz-results').classList.remove('hidden');

  const total = quizQuestions.length;
  const pct = Math.round((quizScoreCorrect / total) * 100);

  document.getElementById('results-percentage').innerText = `${pct}%`;
  document.getElementById('results-correct-count').innerText = quizScoreCorrect;
  document.getElementById('results-incorrect-count').innerText = quizScoreIncorrect;

  const passed = pct >= 80; // Criterio de aprobación estándar vial
  const badgeIcon = document.getElementById('results-badge-icon');
  const banner = document.getElementById('results-status-banner');
  const title = document.getElementById('results-title');

  if (passed) {
    badgeIcon.innerText = '🎉';
    badgeIcon.className = 'w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg text-3xl bg-emerald-100 text-emerald-600';
    title.innerText = '¡Felicitaciones! Has Aprobado';
    banner.className = 'p-4 rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold text-sm';
    banner.innerHTML = `Obtuviste <strong>${pct}%</strong> de aciertos (Mínimo requerido: 80%). ¡Estás listo para rendir el examen oficial de Florencio Varela!`;
  } else {
    badgeIcon.innerText = '⚠️';
    badgeIcon.className = 'w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg text-3xl bg-amber-100 text-amber-600';
    title.innerText = 'Necesitas Repasar un Poco Más';
    banner.className = 'p-4 rounded-2xl border border-amber-300 bg-amber-50 text-amber-900 font-semibold text-sm';
    banner.innerHTML = `Obtuviste <strong>${pct}%</strong> de aciertos. Para aprobar se requiere al menos un 80%. Te sugerimos repasar las preguntas falladas en la pestaña de estudio.`;
  }

  // Lista de errores para repasar
  const mistakesContainer = document.getElementById('results-mistakes-container');
  const mistakesList = document.getElementById('results-mistakes-list');
  mistakesList.innerHTML = '';

  if (quizUserMistakes.length > 0) {
    mistakesContainer.classList.remove('hidden');
    quizUserMistakes.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'p-3 bg-white rounded-xl border border-rose-200 text-xs space-y-1';
      row.innerHTML = `
        <div class="font-bold text-slate-800">#${item.question.id}. ${item.question.question}</div>
        <div class="text-rose-600 font-medium">❌ Tu respuesta: ${item.chosenText}</div>
        <div class="text-emerald-700 font-semibold">✅ Correcta: ${item.correctText}</div>
      `;
      mistakesList.appendChild(row);
    });
  } else {
    mistakesContainer.classList.add('hidden');
  }
}

function restartQuiz() {
  document.getElementById('quiz-results').classList.add('hidden');
  document.getElementById('quiz-setup').classList.remove('hidden');
}

// ========================================================
// PESTAÑA 3: FLASHCARDS (TARJETAS RÁPIDAS)
// ========================================================
function initFlashcard() {
  flashcardIndex = 0;
  flashcardIsFlipped = false;
  document.getElementById('fc-total-count').innerText = flashcardsList.length;
}

function renderFlashcard() {
  if (flashcardsList.length === 0) return;
  const q = flashcardsList[flashcardIndex];

  document.getElementById('fc-current-index').innerText = flashcardIndex + 1;
  document.getElementById('fc-category-badge').innerText = q.category;
  document.getElementById('fc-question-text').innerText = `${q.id}. ${q.question}`;
  document.getElementById('fc-answer-text').innerText = q.answer;

  const signalBox = document.getElementById('fc-signal-box');
  const signalSvg = getSignalSvg(q.id);
  if (signalSvg) {
    signalBox.innerHTML = signalSvg;
    signalBox.classList.remove('hidden');
  } else {
    signalBox.innerHTML = '';
    signalBox.classList.add('hidden');
  }

  // Asegurar que la tarjeta arranque del frente
  const cardEl = document.getElementById('active-flashcard');
  cardEl.classList.remove('flipped');
  flashcardIsFlipped = false;
}

function flipFlashcard() {
  const cardEl = document.getElementById('active-flashcard');
  cardEl.classList.toggle('flipped');
  flashcardIsFlipped = cardEl.classList.contains('flipped');
}

function nextFlashcard() {
  stopAudio();
  if (flashcardIndex < flashcardsList.length - 1) {
    flashcardIndex++;
  } else {
    flashcardIndex = 0; // Volver al inicio
  }
  renderFlashcard();
}

function prevFlashcard() {
  stopAudio();
  if (flashcardIndex > 0) {
    flashcardIndex--;
  } else {
    flashcardIndex = flashcardsList.length - 1;
  }
  renderFlashcard();
}

function shuffleFlashcards() {
  flashcardsList.sort(() => Math.random() - 0.5);
  flashcardIndex = 0;
  renderFlashcard();
}

function speakCurrentFlashcard() {
  const q = flashcardsList[flashcardIndex];
  if (!q) return;

  if (flashcardIsFlipped) {
    speakText(`Respuesta: ${q.answer}`);
  } else {
    speakText(`Pregunta ${q.id}: ${q.question}`);
  }
}
