import { useLang } from '../i18n/LanguageContext';

export default function Background() {
  const { toggleLang, langSwitchLabel } = useLang();

  return (
    <div className="background-layer">
      <svg
        className="bg-illustration"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bgG1" cx="20%" cy="15%" r="55%">
            <stop offset="0%" stopColor="#f0e8d8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f5f5f7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bgG2" cx="85%" cy="75%" r="50%">
            <stop offset="0%" stopColor="#e8e4f0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f5f5f7" stopOpacity="0" />
          </radialGradient>
          <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#d4c8b0" opacity="0.35" />
          </pattern>
          <pattern id="crosses" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M28 24v8m-4-4h8" stroke="#c8b898" strokeWidth="0.8" opacity="0.25" />
          </pattern>
          <pattern id="filmDots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="24" height="24" fill="none" />
            <rect x="1" y="1" width="5" height="5" rx="1" fill="#d4c5a0" opacity="0.3" />
            <rect x="18" y="1" width="5" height="5" rx="1" fill="#d4c5a0" opacity="0.3" />
          </pattern>
        </defs>

        {/* Base fill */}
        <rect width="800" height="600" fill="#fafaf8" />

        {/* Radial glows for warmth */}
        <ellipse cx="160" cy="90" rx="440" ry="280" fill="url(#bgG1)" />
        <ellipse cx="680" cy="450" rx="400" ry="250" fill="url(#bgG2)" />

        {/* Dot grid - subtle texture */}
        <rect width="800" height="600" fill="url(#dots)" />

        {/* Film sprocket holes pattern */}
        <rect width="800" height="600" fill="url(#filmDots)" />

        {/* Tiny crosses - very subtle */}
        <rect width="800" height="600" fill="url(#crosses)" />

        {/* Small decorative film reel icons scattered */}
        <g opacity="0.06">
          {[
            [120, 480], [680, 100], [60, 200], [720, 350]
          ].map(([cx, cy], i) => (
            <g key={i} transform={`translate(${cx},${cy}) scale(0.35)`}>
              <circle cx="0" cy="0" r="18" stroke="#8b6f4e" strokeWidth="2" />
              <circle cx="0" cy="0" r="6" fill="#8b6f4e" />
              <rect x="-20" y="-3" width="6" height="6" rx="1" stroke="#8b6f4e" strokeWidth="1.5" />
              <rect x="14" y="-3" width="6" height="6" rx="1" stroke="#8b6f4e" strokeWidth="1.5" />
              <rect x="-3" y="-20" width="6" height="6" rx="1" stroke="#8b6f4e" strokeWidth="1.5" />
              <rect x="-3" y="14" width="6" height="6" rx="1" stroke="#8b6f4e" strokeWidth="1.5" />
            </g>
          ))}
        </g>
      </svg>

      <button className="lang-toggle" onClick={toggleLang}>
        {langSwitchLabel}
      </button>
    </div>
  );
}
