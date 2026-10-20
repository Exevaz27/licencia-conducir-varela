// Generador de SVGs nítidos y oficiales para las señales del examen
const trafficSignals = {
  // Señal de Pare (Octógono rojo)
  pare: `
    <svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-md mx-auto">
      <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#dc2626" stroke="#ffffff" stroke-width="3"/>
      <text x="50" y="58" font-family="Arial, sans-serif" font-weight="900" font-size="22" fill="#ffffff" text-anchor="middle" letter-spacing="1">PARE</text>
    </svg>
  `,

  // Puesto de Policía (Informativa azul)
  policia: `
    <svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-md mx-auto">
      <rect x="5" y="5" width="90" height="90" rx="8" fill="#1d4ed8" stroke="#ffffff" stroke-width="3"/>
      <rect x="12" y="12" width="76" height="76" rx="4" fill="#ffffff"/>
      <path d="M40 35 L40 50 L48 50 L48 65 L52 65 L52 50 L60 50 L60 35 Z" fill="#1e3a8a"/>
      <circle cx="50" cy="28" r="6" fill="#1e3a8a"/>
      <text x="50" y="82" font-family="Arial, sans-serif" font-weight="800" font-size="11" fill="#1e3a8a" text-anchor="middle">POLICÍA</text>
    </svg>
  `,

  // Escolares (Preventiva amarilla)
  escolares: `
    <svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-md mx-auto">
      <g transform="rotate(45 50 50)">
        <rect x="15" y="15" width="70" height="70" rx="6" fill="#facc15" stroke="#000000" stroke-width="4"/>
      </g>
      <!-- Silueta adulto y niño escolar -->
      <circle cx="43" cy="38" r="5" fill="#000000"/>
      <path d="M41 44 L45 44 L47 62 L43 62 L42 54 L41 62 L37 62 Z" fill="#000000"/>
      <circle cx="58" cy="46" r="4" fill="#000000"/>
      <path d="M56 51 L60 51 L61 65 L58 65 L57 59 L56 65 L53 65 Z" fill="#000000"/>
      <text x="50" y="86" font-family="Arial, sans-serif" font-weight="800" font-size="9" fill="#000000" text-anchor="middle">ESCOLARES</text>
    </svg>
  `,

  // Camino sinuoso (Pregunta 71)
  winding_road: `
    <svg viewBox="0 0 100 100" class="w-28 h-28 drop-shadow-md mx-auto">
      <g transform="rotate(45 50 50)">
        <rect x="15" y="15" width="70" height="70" rx="8" fill="#facc15" stroke="#111827" stroke-width="4"/>
      </g>
      <!-- Trazo serpenteante -->
      <path d="M50 74 Q 40 64 50 52 T 50 30" fill="none" stroke="#111827" stroke-width="7" stroke-linecap="round"/>
      <polygon points="50,22 42,32 58,32" fill="#111827"/>
    </svg>
  `,

  // Preferencia de avance (Pregunta 72: Círculo blanco borde rojo con flechas)
  priority_advance: `
    <svg viewBox="0 0 100 100" class="w-28 h-28 drop-shadow-md mx-auto">
      <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#dc2626" stroke-width="8"/>
      <!-- Flecha negra hacia abajo (izquierda) -->
      <line x1="41" y1="30" x2="41" y2="66" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
      <polygon points="41,74 34,62 48,62" fill="#111827"/>
      <!-- Flecha roja hacia arriba (derecha) -->
      <line x1="59" y1="70" x2="59" y2="34" stroke="#dc2626" stroke-width="6" stroke-linecap="round"/>
      <polygon points="59,26 52,38 66,38" fill="#dc2626"/>
    </svg>
  `,

  // Paso obligado (Pregunta 73: Círculo blanco borde rojo con flecha diagonal)
  mandatory_pass: `
    <svg viewBox="0 0 100 100" class="w-28 h-28 drop-shadow-md mx-auto">
      <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#dc2626" stroke-width="8"/>
      <!-- Flecha diagonal apuntando abajo-izquierda -->
      <line x1="62" y1="36" x2="38" y2="60" stroke="#111827" stroke-width="7" stroke-linecap="round"/>
      <polygon points="32,66 34,50 50,66" fill="#111827"/>
    </svg>
  `,

  // Ceda el paso (Pregunta 74: Triángulo invertido blanco borde rojo)
  yield: `
    <svg viewBox="0 0 100 100" class="w-28 h-28 drop-shadow-md mx-auto">
      <polygon points="50,88 10,18 90,18" fill="#ffffff" stroke="#dc2626" stroke-width="9" stroke-linejoin="round"/>
    </svg>
  `,

  // Carril exclusivo (Pregunta 75: Rombo blanco con contorno azul)
  exclusive_lane: `
    <svg viewBox="0 0 100 100" class="w-28 h-28 drop-shadow-md mx-auto">
      <g transform="rotate(45 50 50)">
        <rect x="18" y="18" width="64" height="64" rx="4" fill="#ffffff" stroke="#2563eb" stroke-width="8"/>
      </g>
    </svg>
  `,

  // Estrella Amarilla (Pregunta 59 y 60)
  estrella_amarilla: `
    <svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-md mx-auto">
      <polygon points="50,12 61,38 89,38 66,55 75,81 50,65 25,81 34,55 11,38 39,38" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
    </svg>
  `
};

function getSignalSvg(id) {
  if (id === 66) {
    return `
      <div class="flex items-center justify-around gap-2 my-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
        <div class="text-center">
          <div class="text-xs font-bold text-slate-500 mb-1">A.</div>
          ${trafficSignals.policia}
          <span class="text-xs font-medium text-slate-600 dark:text-slate-300">Policía</span>
        </div>
        <div class="text-center">
          <div class="text-xs font-bold text-emerald-600 mb-1">B. (Reglamentaria)</div>
          ${trafficSignals.pare}
          <span class="text-xs font-bold text-emerald-600">PARE</span>
        </div>
        <div class="text-center">
          <div class="text-xs font-bold text-slate-500 mb-1">C.</div>
          ${trafficSignals.escolares}
          <span class="text-xs font-medium text-slate-600 dark:text-slate-300">Escolares</span>
        </div>
      </div>
    `;
  }
  if (id === 71) return trafficSignals.winding_road;
  if (id === 72) return trafficSignals.priority_advance;
  if (id === 73) return trafficSignals.mandatory_pass;
  if (id === 74) return trafficSignals.yield;
  if (id === 75) return trafficSignals.exclusive_lane;
  if (id === 59 || id === 60) return trafficSignals.estrella_amarilla;
  return null;
}
