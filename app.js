// ========================================================
// CONTROLADOR PRINCIPAL - EXAMEN LICENCIA DE CONDUCIR VARELA
// ========================================================

// Estado Global
let currentQuestions = [...questionsData];
let filteredQuestions = [...questionsData];
let currentTab = 'read';
let onlySignsFilter = false;
let hideLearnedFilter = false;

// Almacenamiento: Preguntas Aprendidas ("Ya la sé")
let learnedQuestions = new Set();
try {
  const saved = localStorage.getItem('varela_learned_questions');
  if (saved) learnedQuestions = new Set(JSON.parse(saved));
} catch (e) {}

// Almacenamiento: Banco de Errores ("Mis Preguntas Difíciles")
let mistakesBank = new Set();
try {
  const savedMistakes = localStorage.getItem('varela_mistakes_bank');
  if (savedMistakes) mistakesBank = new Set(JSON.parse(savedMistakes));
} catch (e) {}

// Almacenamiento: Logros y Medallas Desbloqueadas
let unlockedAchievements = new Set();
try {
  const savedAch = localStorage.getItem('varela_achievements');
  if (savedAch) unlockedAchievements = new Set(JSON.parse(savedAch));
} catch (e) {}

// Definición de Logros
const ACHIEVEMENTS_DEF = [
  { id: 'first_quiz', icon: '🎓', title: 'Primer Paso', desc: 'Completaste tu primer simulacro de examen.' },
  { id: 'high_score', icon: '🌟', title: 'Conductor Ejemplar', desc: 'Aprobaste un examen con 90% o más de aciertos.' },
  { id: 'signs_master', icon: '🛑', title: 'Ojo de Halcón', desc: 'Dominaste las preguntas de señales de tránsito.' },
  { id: 'streak_10', icon: '🔥', title: 'Racha Imparable', desc: 'Lograste 10 aciertos consecutivos en Supervivencia.' },
  { id: 'learned_50', icon: '🧠', title: 'Estudiante Dedicado', desc: 'Marcaste 50 preguntas como ya aprendidas.' },
  { id: 'all_learned', icon: '🏆', title: 'Maestro Vial de Varela', desc: '¡Completaste las 117 preguntas oficiales!' }
];

// Estado de Síntesis de Voz
let synth = window.speechSynthesis;
let availableVoices = [];
let selectedVoice = null;
let speechRate = 1.0;
let isSpeaking = false;
let isAudioPaused = false;
let isContinuousPlaying = false;
let currentAudioIndex = 0;
let currentActiveCardId = null;

// Estado del Quiz y Simulador
let quizMode = 'practice'; // 'practice' | 'real_exam' | 'mistakes' | 'survival'
let quizQuestions = [];
let quizCurrentIndex = 0;
let quizScoreCorrect = 0;
let quizScoreIncorrect = 0;
let quizUserMistakes = [];
let quizUserAnswers = []; // Para el modo examen oficial
let quizLengthSetting = 40;
let quizAutoSpeak = false;

// Variables de Temporizadores (Examen Oficial y Supervivencia)
let realExamTimerInterval = null;
let realExamSecondsLeft = 1800; // 30 minutos

let survivalTimerInterval = null;
let survivalSecondsLeft = 15;
let survivalLives = 3;
let survivalCurrentStreak = 0;
let survivalBestStreak = parseInt(localStorage.getItem('varela_survival_record') || '0', 10);

// Estado de Flashcards
let flashcardsList = [...questionsData];
let flashcardIndex = 0;
let flashcardIsFlipped = false;

// ========================================================
// INICIALIZACIÓN
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initServiceWorker();
  initSpeechVoices();
  updateLearnedBadge();
  updateMistakesBadge();
  updateGlobalProgress();
  filterQuestions();
  initFlashcard();
});

// Registro de Service Worker (PWA Offline)
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('Service Worker registrado correctamente (PWA lista)'))
      .catch((err) => console.log('SW no registrado:', err));
  }
}

// Modo Oscuro
function initDarkMode() {
  const isDark = localStorage.getItem('varela_theme') === 'dark' ||
    (!('varela_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.getElementById('dark-mode-icon').innerText = '☀️';
  } else {
    document.documentElement.classList.remove('dark');
    document.getElementById('dark-mode-icon').innerText = '🌙';
  }
}

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('varela_theme', isDark ? 'dark' : 'light');
  document.getElementById('dark-mode-icon').innerText = isDark ? '☀️' : '🌙';
}

// Voces de síntesis de voz en español
function initSpeechVoices() {
  if (!('speechSynthesis' in window)) return;

  const loadVoices = () => {
    const all = synth.getVoices();
    availableVoices = all.filter(v => v.lang.startsWith('es'));
    if (availableVoices.length === 0) availableVoices = all;

    const select = document.getElementById('audio-voice-select');
    if (!select) return;
    select.innerHTML = '';

    let preferred = availableVoices.find(v => v.lang === 'es-AR') ||
                    availableVoices.find(v => v.lang.startsWith('es')) ||
                    availableVoices[0];

    availableVoices.forEach((v, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.className = 'bg-slate-800 text-white';
      opt.textContent = `${v.name} (${v.lang})`;
      if (v === preferred) {
        opt.selected = true;
        selectedVoice = v;
      }
      select.appendChild(opt);
    });

    if (!selectedVoice && availableVoices.length > 0) selectedVoice = availableVoices[0];
  };

  loadVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
  }
}

function changeVoice(idx) {
  if (availableVoices[idx]) selectedVoice = availableVoices[idx];
}

function changeAudioSpeed(val) {
  speechRate = parseFloat(val) || 1.0;
}

// ========================================================
// SISTEMA DE LOGROS Y PROGRESO GENERAL
// ========================================================
function unlockAchievement(id) {
  if (unlockedAchievements.has(id)) return;
  unlockedAchievements.add(id);

  try {
    localStorage.setItem('varela_achievements', JSON.stringify([...unlockedAchievements]));
  } catch (e) {}

  const ach = ACHIEVEMENTS_DEF.find(a => a.id === id);
  if (ach) {
    showToast(ach.icon, ach.title);
  }
}

function showToast(icon, title) {
  const toast = document.getElementById('achievement-toast');
  if (!toast) return;

  document.getElementById('toast-icon').innerText = icon;
  document.getElementById('toast-title').innerText = title;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

function updateGlobalProgress() {
  const learnedCount = learnedQuestions.size;
  const total = questionsData.length;
  const pct = Math.round((learnedCount / total) * 100);

  const bar = document.getElementById('header-global-progress-bar');
  const txt = document.getElementById('header-global-progress-text');
  if (bar) bar.style.width = `${pct}%`;
  if (txt) txt.innerText = `${pct}%`;

  if (learnedCount >= 50) unlockAchievement('learned_50');
  if (learnedCount >= 117) unlockAchievement('all_learned');
}

// ========================================================
// GESTIÓN DE PREGUNTAS APRENDIDAS ("YA LA SÉ")
// ========================================================
function toggleLearned(id, event) {
  if (event) event.stopPropagation();

  if (learnedQuestions.has(id)) {
    learnedQuestions.delete(id);
  } else {
    learnedQuestions.add(id);
  }

  try {
    localStorage.setItem('varela_learned_questions', JSON.stringify([...learnedQuestions]));
  } catch (e) {}

  updateLearnedBadge();
  updateGlobalProgress();
  filterQuestions();
}

function updateLearnedBadge() {
  const badge = document.getElementById('learned-count-badge');
  if (badge) badge.innerText = learnedQuestions.size;
}

function updateMistakesBadge() {
  const badge = document.getElementById('mistakes-mode-badge');
  if (badge) badge.innerText = `${mistakesBank.size} preguntas`;
}

function toggleHideLearned() {
  hideLearnedFilter = !hideLearnedFilter;
  const btn = document.getElementById('toggle-hide-learned-btn');
  const icon = document.getElementById('hide-learned-icon');
  
  if (hideLearnedFilter) {
    btn.className = 'px-3 py-2.5 rounded-xl border border-brand-500 text-xs sm:text-sm font-bold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 whitespace-nowrap transition flex items-center gap-1.5 shadow-sm';
    icon.innerText = '🙈';
  } else {
    btn.className = 'px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 whitespace-nowrap transition flex items-center gap-1.5';
    icon.innerText = '👁️';
  }
  filterQuestions();
}

// ========================================================
// GESTIÓN DE PESTAÑAS (TABS)
// ========================================================
function switchTab(tab) {
  currentTab = tab;
  stopAudio();
  stopQuizTimers();

  document.getElementById('view-read').classList.add('hidden');
  document.getElementById('view-practice').classList.add('hidden');
  document.getElementById('view-flashcards').classList.add('hidden');

  const resetBtn = (id) => {
    const btn = document.getElementById(id);
    btn.className = 'tab-btn px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200 flex items-center gap-1.5';
  };
  const activeBtn = (id) => {
    const btn = document.getElementById(id);
    btn.className = 'tab-btn px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm';
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
    updateMistakesBadge();
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
      <div class="col-span-full py-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <div class="text-4xl mb-3">🔍</div>
        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">No se encontraron preguntas</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Prueba cambiando los filtros o desactivando "Ocultar las que ya sé".</p>
      </div>
    `;
    return;
  }

  filteredQuestions.forEach((q) => {
    const isLearned = learnedQuestions.has(q.id);
    const isMistake = mistakesBank.has(q.id);
    const card = document.createElement('div');
    card.id = `card-q-${q.id}`;
    card.className = `bg-white dark:bg-slate-900 rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
      isLearned ? 'card-learned' : 'border-slate-200/80 dark:border-slate-800'
    }`;

    const signalHtml = getSignalSvg(q.id);

    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="w-7 h-7 rounded-lg ${isLearned ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'} font-black text-xs flex items-center justify-center shrink-0">
              #${q.id}
            </span>
            <span class="badge-tag bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-semibold">
              ${q.category}
            </span>
            ${isLearned ? '<span class="badge-tag bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">✓ Dominada</span>' : ''}
            ${isMistake ? '<span class="badge-tag bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-[10px] font-bold">⚠️ Difícil</span>' : ''}
          </div>

          <!-- Acciones de Tarjeta -->
          <div class="flex items-center gap-1.5 shrink-0">
            <button onclick="toggleLearned(${q.id}, event)" class="p-2 rounded-xl ${isLearned ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600 hover:bg-slate-100'} transition text-xs font-semibold" title="${isLearned ? 'Desmarcar' : 'Marcar como ya aprendida'}">
              <svg class="w-4 h-4" fill="${isLearned ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </button>

            <button onclick="speakQuestionCard(${q.id})" id="audio-btn-${q.id}" class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950 text-slate-600 dark:text-slate-300 hover:text-brand-600 transition flex items-center gap-1 text-xs font-semibold" title="Escuchar en voz alta">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"/></svg>
              <span class="hidden sm:inline">Escuchar</span>
            </button>
          </div>
        </div>

        <h3 class="font-bold text-slate-900 dark:text-white text-base leading-snug mb-3">
          ${q.question}
        </h3>

        ${signalHtml ? `<div class="my-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl">${signalHtml}</div>` : ''}

        <div class="mt-3 p-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 rounded-xl">
          <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
            Respuesta:
          </div>
          <p class="text-sm font-semibold text-emerald-950 dark:text-emerald-100 leading-relaxed">
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
    if (hideLearnedFilter && learnedQuestions.has(q.id)) return false;
    if (catVal !== 'all' && q.category !== catVal) return false;
    if (onlySignsFilter && !q.hasSignalImages && q.type !== 'sign') return false;
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
    btn.className = 'px-3 py-2.5 rounded-xl border border-brand-500 text-xs sm:text-sm font-bold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 whitespace-nowrap transition flex items-center gap-1.5 shadow-sm';
  } else {
    btn.className = 'px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 whitespace-nowrap transition flex items-center gap-1.5';
  }
  filterQuestions();
}

// ========================================================
// SISTEMA DE AUDIO Y REPRODUCTOR FLOTANTE
// ========================================================
function speakText(text, onEndCallback = null) {
  if (!('speechSynthesis' in window)) return;

  synth.cancel();
  isAudioPaused = false;

  const cleanText = text
    .replace(/[\[\]]/g, '')
    .replace(/Km\/h/gi, 'kilómetros por hora')
    .replace(/gr\./gi, 'gramos')
    .replace(/Nº|N°/gi, 'número');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = speechRate;
  utterance.lang = 'es-AR';
  if (selectedVoice) utterance.voice = selectedVoice;

  utterance.onend = () => {
    isSpeaking = false;
    if (onEndCallback) onEndCallback();
  };
  utterance.onerror = () => {
    isSpeaking = false;
    if (onEndCallback) onEndCallback();
  };

  isSpeaking = true;
  synth.speak(utterance);
}

function speakQuestionCard(id) {
  const idx = filteredQuestions.findIndex(item => item.id === id);
  if (idx !== -1) currentAudioIndex = idx;
  playCurrentQuestionAudio();
}

function playCurrentQuestionAudio() {
  if (filteredQuestions.length === 0) return;
  if (currentAudioIndex < 0) currentAudioIndex = 0;
  if (currentAudioIndex >= filteredQuestions.length) {
    stopAudio();
    return;
  }

  const q = filteredQuestions[currentAudioIndex];
  highlightCard(q.id);
  showFloatingPlayer(q);

  const titleEl = document.getElementById('player-current-title');
  const badgeEl = document.getElementById('player-status-badge');
  if (titleEl) titleEl.innerText = `Pregunta #${q.id}: ${q.question}`;
  if (badgeEl) {
    badgeEl.innerText = 'Hablando';
    badgeEl.className = 'px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500 text-white animate-pulse';
  }

  const fullText = `Pregunta número ${q.id}. ${q.question}. Respuesta: ${q.answer}`;
  speakText(fullText, () => {
    if (isContinuousPlaying) {
      currentAudioIndex++;
      if (currentAudioIndex < filteredQuestions.length) {
        setTimeout(playCurrentQuestionAudio, 600);
      } else {
        stopAudio();
      }
    } else {
      if (badgeEl) {
        badgeEl.innerText = 'Listo';
        badgeEl.className = 'px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white';
      }
      updateFloatingPlayState(false);
    }
  });

  updateFloatingPlayState(true);
}

function nextAudioQuestion() {
  if (filteredQuestions.length === 0) return;
  currentAudioIndex = (currentAudioIndex < filteredQuestions.length - 1) ? currentAudioIndex + 1 : 0;
  playCurrentQuestionAudio();
}

function prevAudioQuestion() {
  if (filteredQuestions.length === 0) return;
  currentAudioIndex = (currentAudioIndex > 0) ? currentAudioIndex - 1 : filteredQuestions.length - 1;
  playCurrentQuestionAudio();
}

function markCurrentAsLearnedAndNext() {
  if (filteredQuestions.length === 0) return;
  const q = filteredQuestions[currentAudioIndex];
  if (q) {
    learnedQuestions.add(q.id);
    try {
      localStorage.setItem('varela_learned_questions', JSON.stringify([...learnedQuestions]));
    } catch (e) {}
    updateLearnedBadge();
    updateGlobalProgress();
  }

  if (hideLearnedFilter) {
    filterQuestions();
    if (filteredQuestions.length === 0) {
      stopAudio();
      alert('¡Excelente! Has marcado todas las preguntas filtradas como aprendidas.');
      return;
    }
    if (currentAudioIndex >= filteredQuestions.length) currentAudioIndex = 0;
  } else {
    currentAudioIndex = (currentAudioIndex < filteredQuestions.length - 1) ? currentAudioIndex + 1 : 0;
    renderQuestionsList();
  }

  playCurrentQuestionAudio();
}

function togglePlayPauseAudio() {
  if (!('speechSynthesis' in window)) return;
  if (synth.speaking && !synth.paused) {
    synth.pause();
    isAudioPaused = true;
    updateFloatingPlayState(false);
  } else if (synth.paused) {
    synth.resume();
    isAudioPaused = false;
    updateFloatingPlayState(true);
  } else {
    playCurrentQuestionAudio();
  }
}

function toggleContinuousPlay() {
  if (isContinuousPlaying) stopContinuousPlay();
  else startContinuousPlay();
}

function startContinuousPlay() {
  if (filteredQuestions.length === 0) return;
  isContinuousPlaying = true;
  currentAudioIndex = 0;

  const btnText = document.getElementById('play-btn-text');
  const playIcon = document.getElementById('play-icon');
  const badgeEl = document.getElementById('player-status-badge');

  if (btnText) btnText.innerText = 'Pausar Lectura';
  if (playIcon) playIcon.innerHTML = `<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>`;
  if (badgeEl) {
    badgeEl.innerText = 'Lectura Continua Activa';
    badgeEl.className = 'px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500 text-white animate-pulse';
  }

  playCurrentQuestionAudio();
}

function stopContinuousPlay() {
  isContinuousPlaying = false;
  synth.cancel();

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
  updateFloatingPlayState(false);
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

function showFloatingPlayer(q) {
  const bar = document.getElementById('floating-audio-bar');
  if (!bar) return;
  bar.classList.add('visible');

  const badgeEl = document.getElementById('floating-question-badge');
  const textEl = document.getElementById('floating-question-text');
  const statusEl = document.getElementById('floating-status-text');

  if (badgeEl) badgeEl.innerText = `#${q.id}`;
  if (textEl) textEl.innerText = q.question;
  if (statusEl) statusEl.innerText = isContinuousPlaying ? 'Lectura Continua' : 'Reproduciendo';
}

function closeFloatingPlayer() {
  stopAudio();
  const bar = document.getElementById('floating-audio-bar');
  if (bar) bar.classList.remove('visible');
}

function updateFloatingPlayState(playing) {
  const icon = document.getElementById('floating-play-icon');
  const label = document.getElementById('floating-play-label');
  const statusEl = document.getElementById('floating-status-text');

  if (playing) {
    if (icon) icon.innerHTML = `<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>`;
    if (label) label.innerText = 'Pausa';
    if (statusEl) statusEl.innerText = isContinuousPlaying ? 'Lectura Continua' : 'Reproduciendo';
  } else {
    if (icon) icon.innerHTML = `<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>`;
    if (label) label.innerText = 'Reanudar';
    if (statusEl) statusEl.innerText = 'En Pausa';
  }
}

// ========================================================
// PESTAÑA 2: SIMULADOR Y MODOS DE EVALUACIÓN
// ========================================================
function selectQuizMode(mode) {
  quizMode = mode;
  const modes = ['practice', 'real_exam', 'mistakes', 'survival'];

  modes.forEach(m => {
    const card = document.getElementById(`mode-card-${m}`);
    if (m === mode) {
      card.className = 'cursor-pointer p-4 rounded-2xl border-2 border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 transition';
    } else {
      card.className = 'cursor-pointer p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-brand-400 transition';
    }
  });

  const lenSection = document.getElementById('quiz-length-section');
  const catSection = document.getElementById('quiz-cat-section');
  const startBtn = document.getElementById('start-btn-label');

  if (mode === 'real_exam') {
    lenSection.classList.remove('hidden');
    catSection.classList.add('hidden');
    startBtn.innerText = 'Comenzar Examen Oficial (30 Min)';
  } else if (mode === 'mistakes') {
    lenSection.classList.add('hidden');
    catSection.classList.add('hidden');
    startBtn.innerText = `Practicar Errores (${mistakesBank.size} pendientes)`;
  } else if (mode === 'survival') {
    lenSection.classList.add('hidden');
    catSection.classList.add('hidden');
    startBtn.innerText = '¡Empezar Modo Supervivencia!';
  } else {
    lenSection.classList.remove('hidden');
    catSection.classList.remove('hidden');
    startBtn.innerText = 'Iniciar Entrenamiento';
  }
}

function selectQuizLength(num) {
  quizLengthSetting = num;
  document.querySelectorAll('.quiz-len-btn').forEach(btn => {
    if (parseInt(btn.getAttribute('data-len')) === num) {
      btn.className = 'quiz-len-btn p-3 rounded-xl border-2 border-brand-500 bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-center font-bold transition';
    } else {
      btn.className = 'quiz-len-btn p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-bold text-slate-700 dark:text-slate-300 hover:border-brand-500 transition';
    }
  });
}

function startQuiz() {
  quizAutoSpeak = document.getElementById('quiz-auto-speech').checked;
  stopQuizTimers();

  let pool = [];

  if (quizMode === 'mistakes') {
    if (mistakesBank.size === 0) {
      alert('¡Excelente! No tienes preguntas en el banco de errores todavía. Cuando falles preguntas en un simulacro, aparecerán aquí para repasarlas.');
      return;
    }
    pool = questionsData.filter(q => mistakesBank.has(q.id));
  } else if (quizMode === 'survival') {
    pool = [...questionsData];
    survivalLives = 3;
    survivalCurrentStreak = 0;
  } else {
    const cat = document.getElementById('quiz-category-select').value;
    pool = (cat !== 'all') ? questionsData.filter(q => q.category === cat) : [...questionsData];
  }

  if (pool.length === 0) {
    alert('No hay preguntas disponibles con la configuración elegida.');
    return;
  }

  pool.sort(() => Math.random() - 0.5);

  const total = (quizMode === 'mistakes' || quizMode === 'survival') ? pool.length : Math.min(quizLengthSetting, pool.length);
  quizQuestions = pool.slice(0, total);

  quizCurrentIndex = 0;
  quizScoreCorrect = 0;
  quizScoreIncorrect = 0;
  quizUserMistakes = [];
  quizUserAnswers = new Array(quizQuestions.length).fill(null);

  // Ajustar visibilidad de indicadores de modo
  const survivalInd = document.getElementById('survival-indicators');
  const realTimerBox = document.getElementById('real-exam-timer-box');
  const trainingScoreBox = document.getElementById('training-score-box');

  if (quizMode === 'survival') {
    survivalInd.classList.remove('hidden');
    survivalInd.classList.add('flex');
    realTimerBox.classList.add('hidden');
    trainingScoreBox.classList.add('hidden');
    updateSurvivalLivesDisplay();
  } else if (quizMode === 'real_exam') {
    survivalInd.classList.add('hidden');
    realTimerBox.classList.remove('hidden');
    realTimerBox.classList.add('flex');
    trainingScoreBox.classList.add('hidden');
    startRealExamTimer();
  } else {
    survivalInd.classList.add('hidden');
    realTimerBox.classList.add('hidden');
    trainingScoreBox.classList.remove('hidden');
  }

  document.getElementById('quiz-setup').classList.add('hidden');
  document.getElementById('quiz-results').classList.add('hidden');
  document.getElementById('quiz-active').classList.remove('hidden');

  renderQuizQuestion();
}

function startRealExamTimer() {
  realExamSecondsLeft = 1800; // 30 min
  updateRealExamTimerDisplay();
  realExamTimerInterval = setInterval(() => {
    realExamSecondsLeft--;
    updateRealExamTimerDisplay();
    if (realExamSecondsLeft <= 0) {
      clearInterval(realExamTimerInterval);
      alert('¡El tiempo oficial de 30 minutos ha finalizado! Se entregará el examen.');
      finishQuiz();
    }
  }, 1000);
}

function updateRealExamTimerDisplay() {
  const m = Math.floor(realExamSecondsLeft / 60);
  const s = realExamSecondsLeft % 60;
  const timerEl = document.getElementById('real-exam-timer-text');
  if (timerEl) {
    timerEl.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
}

function startSurvivalTimer() {
  clearInterval(survivalTimerInterval);
  survivalSecondsLeft = 15;
  document.getElementById('survival-timer-sec').innerText = survivalSecondsLeft;

  survivalTimerInterval = setInterval(() => {
    survivalSecondsLeft--;
    document.getElementById('survival-timer-sec').innerText = survivalSecondsLeft;
    if (survivalSecondsLeft <= 0) {
      clearInterval(survivalTimerInterval);
      handleSurvivalTimeout();
    }
  }, 1000);
}

function handleSurvivalTimeout() {
  const q = quizQuestions[quizCurrentIndex];
  survivalLives--;
  survivalCurrentStreak = 0;
  document.getElementById('survival-streak').innerText = survivalCurrentStreak;
  updateSurvivalLivesDisplay();

  mistakesBank.add(q.id);
  saveMistakesBank();

  alert(`⏰ ¡Tiempo agotado! La respuesta correcta era: ${q.answer}`);

  if (survivalLives <= 0) {
    alert('💥 ¡Te has quedado sin vidas! Fin del Modo Supervivencia.');
    finishQuiz();
  } else {
    nextQuizQuestion();
  }
}

function updateSurvivalLivesDisplay() {
  const container = document.getElementById('survival-lives');
  let hearts = '';
  for (let i = 0; i < 3; i++) {
    hearts += (i < survivalLives) ? '❤️' : '🖤';
  }
  container.innerHTML = hearts;
}

function stopQuizTimers() {
  clearInterval(realExamTimerInterval);
  clearInterval(survivalTimerInterval);
}

function renderQuizQuestion() {
  const q = quizQuestions[quizCurrentIndex];
  const total = quizQuestions.length;

  document.getElementById('quiz-current-num').innerText = quizCurrentIndex + 1;
  document.getElementById('quiz-total-num').innerText = total;
  document.getElementById('quiz-score-correct').innerText = quizScoreCorrect;
  document.getElementById('quiz-score-incorrect').innerText = quizScoreIncorrect;

  const pct = Math.round(((quizCurrentIndex) / total) * 100);
  document.getElementById('quiz-progress-bar').style.width = `${pct}%`;
  document.getElementById('quiz-percent-text').innerText = `${pct}%`;

  document.getElementById('quiz-question-category').innerText = q.category;
  document.getElementById('quiz-question-text').innerText = `${q.id}. ${q.question}`;

  const signalBox = document.getElementById('quiz-signal-container');
  const signalSvg = getSignalSvg(q.id);
  if (signalSvg) {
    signalBox.innerHTML = signalSvg;
    signalBox.classList.remove('hidden');
  } else {
    signalBox.classList.add('hidden');
    signalBox.innerHTML = '';
  }

  document.getElementById('quiz-feedback-box').classList.add('hidden');
  const nextBtn = document.getElementById('quiz-next-btn');
  nextBtn.disabled = true;

  const isLast = (quizCurrentIndex === total - 1);
  document.getElementById('quiz-next-btn-text').innerText = (quizMode === 'real_exam' && isLast) ? 'Entregar Examen' : 'Siguiente';

  const optsContainer = document.getElementById('quiz-options-container');
  optsContainer.innerHTML = '';

  q.options.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-brand-500 bg-white dark:bg-slate-800 hover:bg-slate-50 text-left font-semibold text-slate-800 dark:text-slate-100 text-sm sm:text-base flex items-start gap-3 transition active:scale-[0.99]';
    btn.onclick = () => selectQuizAnswer(idx, q);

    const letter = ['A', 'B', 'C', 'D'][idx] || (idx + 1);
    btn.innerHTML = `
      <span class="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
        ${letter}
      </span>
      <span class="leading-relaxed flex-1">${optText}</span>
    `;

    optsContainer.appendChild(btn);
  });

  if (quizMode === 'survival') {
    startSurvivalTimer();
  }

  if (quizAutoSpeak) {
    speakText(`Pregunta ${q.id}. ${q.question}`);
  }
}

function selectQuizAnswer(chosenIndex, q) {
  clearInterval(survivalTimerInterval);
  const optButtons = document.querySelectorAll('.quiz-opt-btn');

  // EN MODO EXAMEN OFICIAL: Guardar respuesta y avanzar sin revelar si fue correcta
  if (quizMode === 'real_exam') {
    quizUserAnswers[quizCurrentIndex] = chosenIndex;
    optButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === chosenIndex) {
        btn.classList.add('border-brand-500', 'bg-brand-50', 'dark:bg-brand-950', 'ring-2', 'ring-brand-400');
      }
    });
    document.getElementById('quiz-next-btn').disabled = false;
    return;
  }

  // MODOS CON FEEDBACK (Entrenamiento, Errores, Supervivencia)
  optButtons.forEach(btn => {
    btn.disabled = true;
    btn.classList.remove('hover:border-brand-500', 'hover:bg-slate-50', 'active:scale-[0.99]');
  });

  const isCorrect = (chosenIndex === q.correctIndex);
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const feedbackIcon = document.getElementById('quiz-feedback-icon');
  const feedbackTitle = document.getElementById('quiz-feedback-title');
  const feedbackDesc = document.getElementById('quiz-feedback-desc');

  optButtons.forEach((btn, idx) => {
    if (idx === q.correctIndex) {
      btn.classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950', 'text-emerald-900', 'dark:text-emerald-200', 'ring-2', 'ring-emerald-400');
    } else if (idx === chosenIndex && !isCorrect) {
      btn.classList.add('border-rose-500', 'bg-rose-50', 'dark:bg-rose-950', 'text-rose-900', 'dark:text-rose-200', 'ring-2', 'ring-rose-400');
    }
  });

  if (isCorrect) {
    quizScoreCorrect++;
    feedbackBox.className = 'p-4 rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/90 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 transition-all';
    feedbackIcon.className = 'w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold';
    feedbackIcon.innerHTML = '✓';
    feedbackTitle.innerText = '¡Respuesta Correcta!';
    feedbackDesc.innerText = q.answer;

    // Si estaba en el banco de errores y acertó, se borra del banco
    if (mistakesBank.has(q.id)) {
      mistakesBank.delete(q.id);
      saveMistakesBank();
    }

    if (quizMode === 'survival') {
      survivalCurrentStreak++;
      document.getElementById('survival-streak').innerText = survivalCurrentStreak;
      if (survivalCurrentStreak > survivalBestStreak) {
        survivalBestStreak = survivalCurrentStreak;
        localStorage.setItem('varela_survival_record', survivalBestStreak);
      }
      if (survivalCurrentStreak >= 10) unlockAchievement('streak_10');
    }
  } else {
    quizScoreIncorrect++;
    quizUserMistakes.push({
      question: q,
      chosenText: q.options[chosenIndex],
      correctText: q.options[q.correctIndex]
    });

    // Guardar en banco de errores
    mistakesBank.add(q.id);
    saveMistakesBank();

    feedbackBox.className = 'p-4 rounded-2xl border border-rose-300 dark:border-rose-800 bg-rose-50/90 dark:bg-rose-950/70 text-rose-950 dark:text-rose-100 transition-all';
    feedbackIcon.className = 'w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 font-bold';
    feedbackIcon.innerHTML = '✕';
    feedbackTitle.innerText = 'Respuesta Incorrecta';
    feedbackDesc.innerText = `La respuesta correcta es: ${q.answer}`;

    if (quizMode === 'survival') {
      survivalLives--;
      survivalCurrentStreak = 0;
      document.getElementById('survival-streak').innerText = survivalCurrentStreak;
      updateSurvivalLivesDisplay();

      if (survivalLives <= 0) {
        setTimeout(() => {
          alert('💥 ¡Te has quedado sin vidas! Fin del Modo Supervivencia.');
          finishQuiz();
        }, 1200);
        return;
      }
    }
  }

  feedbackBox.classList.remove('hidden');
  document.getElementById('quiz-score-correct').innerText = quizScoreCorrect;
  document.getElementById('quiz-score-incorrect').innerText = quizScoreIncorrect;
  document.getElementById('quiz-next-btn').disabled = false;
}

function saveMistakesBank() {
  try {
    localStorage.setItem('varela_mistakes_bank', JSON.stringify([...mistakesBank]));
  } catch (e) {}
  updateMistakesBadge();
}

function speakCurrentQuizQuestion() {
  const q = quizQuestions[quizCurrentIndex];
  if (q) speakText(`Pregunta ${q.id}. ${q.question}`);
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
    stopQuizTimers();
    stopAudio();
    document.getElementById('quiz-active').classList.add('hidden');
    document.getElementById('quiz-setup').classList.remove('hidden');
  }
}

function finishQuiz() {
  stopQuizTimers();
  stopAudio();
  unlockAchievement('first_quiz');

  // Si fue modo oficial, calificar respuestas ahora
  if (quizMode === 'real_exam') {
    quizScoreCorrect = 0;
    quizScoreIncorrect = 0;
    quizUserMistakes = [];

    quizQuestions.forEach((q, idx) => {
      const chosen = quizUserAnswers[idx];
      if (chosen === q.correctIndex) {
        quizScoreCorrect++;
      } else {
        quizScoreIncorrect++;
        quizUserMistakes.push({
          question: q,
          chosenText: (chosen !== null) ? q.options[chosen] : 'No respondió',
          correctText: q.options[q.correctIndex]
        });
        mistakesBank.add(q.id);
      }
    });
    saveMistakesBank();
  }

  document.getElementById('quiz-active').classList.add('hidden');
  document.getElementById('quiz-results').classList.remove('hidden');

  const total = quizQuestions.length;
  const pct = Math.round((quizScoreCorrect / total) * 100);

  document.getElementById('results-percentage').innerText = `${pct}%`;
  document.getElementById('results-correct-count').innerText = quizScoreCorrect;
  document.getElementById('results-incorrect-count').innerText = quizScoreIncorrect;

  const passed = pct >= 80;
  const badgeIcon = document.getElementById('results-badge-icon');
  const banner = document.getElementById('results-status-banner');
  const title = document.getElementById('results-title');
  const certWrapper = document.getElementById('certificate-btn-wrapper');

  if (passed) {
    badgeIcon.innerText = '🎉';
    badgeIcon.className = 'w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg text-3xl bg-emerald-100 text-emerald-600';
    title.innerText = '¡Felicitaciones! Has Aprobado';
    banner.className = 'p-4 rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-semibold text-sm';
    banner.innerHTML = `Obtuviste <strong>${pct}%</strong> de aciertos (Mínimo requerido: 80%). ¡Estás listo para rendir el examen oficial de Florencio Varela!`;
    certWrapper.classList.remove('hidden');

    if (pct >= 90) unlockAchievement('high_score');
  } else {
    badgeIcon.innerText = '⚠️';
    badgeIcon.className = 'w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg text-3xl bg-amber-100 text-amber-600';
    title.innerText = 'Necesitas Repasar un Poco Más';
    banner.className = 'p-4 rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-semibold text-sm';
    banner.innerHTML = `Obtuviste <strong>${pct}%</strong> de aciertos. Para aprobar se requiere al menos un 80%. Las preguntas falladas se guardaron en tu "Banco de Errores" para repasarlas.`;
    certWrapper.classList.add('hidden');
  }

  // Lista de errores
  const mistakesContainer = document.getElementById('results-mistakes-container');
  const mistakesList = document.getElementById('results-mistakes-list');
  mistakesList.innerHTML = '';

  if (quizUserMistakes.length > 0) {
    mistakesContainer.classList.remove('hidden');
    quizUserMistakes.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'p-3 bg-white dark:bg-slate-800 rounded-xl border border-rose-200 dark:border-rose-900/60 text-xs space-y-1';
      row.innerHTML = `
        <div class="font-bold text-slate-800 dark:text-white">#${item.question.id}. ${item.question.question}</div>
        <div class="text-rose-600 font-medium">❌ Tu respuesta: ${item.chosenText}</div>
        <div class="text-emerald-700 dark:text-emerald-400 font-semibold">✅ Correcta: ${item.correctText}</div>
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
  flashcardIndex = (flashcardIndex < flashcardsList.length - 1) ? flashcardIndex + 1 : 0;
  renderFlashcard();
}

function prevFlashcard() {
  stopAudio();
  flashcardIndex = (flashcardIndex > 0) ? flashcardIndex - 1 : flashcardsList.length - 1;
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

// ========================================================
// MODALES: CIFRAS CLAVE, LOGROS Y CERTIFICADO
// ========================================================
function openCheatSheetModal() {
  document.getElementById('modal-cheat-sheet').classList.remove('hidden');
}
function closeCheatSheetModal() {
  document.getElementById('modal-cheat-sheet').classList.add('hidden');
}

function openAchievementsModal() {
  const container = document.getElementById('achievements-list-container');
  container.innerHTML = '';

  ACHIEVEMENTS_DEF.forEach(ach => {
    const isUnlocked = unlockedAchievements.has(ach.id);
    const item = document.createElement('div');
    item.className = `p-3.5 rounded-2xl border flex items-center gap-3 transition ${
      isUnlocked ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/80' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-50'
    }`;
    item.innerHTML = `
      <div class="text-3xl shrink-0 ${isUnlocked ? '' : 'grayscale'}">${ach.icon}</div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <h4 class="font-bold text-sm text-slate-900 dark:text-white">${ach.title}</h4>
          ${isUnlocked ? '<span class="text-[10px] font-black bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">Desbloqueado</span>' : '<span class="text-[10px] font-bold text-slate-400">Bloqueado</span>'}
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${ach.desc}</p>
      </div>
    `;
    container.appendChild(item);
  });

  document.getElementById('modal-achievements').classList.remove('hidden');
}
function closeAchievementsModal() {
  document.getElementById('modal-achievements').classList.add('hidden');
}

function openCertificateModal() {
  const pct = document.getElementById('results-percentage').innerText;
  document.getElementById('cert-score-text').innerText = pct;
  const today = new Date();
  document.getElementById('cert-date-text').innerText = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  document.getElementById('modal-certificate').classList.remove('hidden');
}
function closeCertificateModal() {
  document.getElementById('modal-certificate').classList.add('hidden');
}
