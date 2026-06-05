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
          <radialGradient id="bgGlow1" cx="50%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#d4c5a0" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#d4c5a0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bgGlow2" cx="70%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#c0b8d4" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#c0b8d4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8e7" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#d4c5a0" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#d4c5a0" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="400" cy="480" rx="350" ry="200" fill="url(#bgGlow1)" />
        <ellipse cx="560" cy="180" rx="300" ry="180" fill="url(#bgGlow2)" />

        {/* Film strip decorations */}
        <g opacity="0.06">
          {[100, 650].map((x, i) => (
            <g key={i}>
              {Array.from({ length: 8 }).map((_, j) => (
                <rect key={j} x={x} y={60 + j * 55} width={40} height={40} rx="3" fill="none" stroke="#8b6f4e" strokeWidth="1" strokeDasharray="3 3" />
              ))}
            </g>
          ))}
        </g>

        {/* Character */}
        <g transform="translate(340, 350)" opacity="0.6">
          <ellipse cx="60" cy="70" rx="70" ry="35" fill="#e8e0d4" opacity="0.7" />
          <ellipse cx="60" cy="65" rx="65" ry="30" fill="#f0e8dc" opacity="0.6" />
          <path d="M20 55 Q5 75 10 90" stroke="#c0b0a0" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M100 55 Q115 75 110 90" stroke="#c0b0a0" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.6" />
          <ellipse cx="60" cy="20" rx="30" ry="35" fill="#d4c8b8" opacity="0.7" />
          <path d="M35 15 Q15 0 10 10" stroke="#c0b0a0" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M85 15 Q105 0 110 10" stroke="#c0b0a0" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.6" />
          <rect x="5" y="-5" width="55" height="3" rx="1.5" fill="#b0a090" opacity="0.6" />
          <rect x="8" y="-40" width="49" height="36" rx="3" fill="#e0d8cc" opacity="0.7" />
          <rect x="8" y="-40" width="49" height="36" rx="3" fill="url(#screenGlow)" opacity="0.5">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
          </rect>
          <text x="32" y="-18" textAnchor="middle" fontSize="18" opacity="0.5">🎬</text>
          <circle cx="60" cy="-50" r="22" fill="#d4c8b8" opacity="0.7" />
          <path d="M45 -70 Q50 -78 55 -70 Q60 -80 65 -70 Q70 -78 75 -70" stroke="#c0b0a0" strokeWidth="3" fill="none" opacity="0.5" />
          <path d="M52 -52 Q54 -54 56 -52" stroke="#8b6f4e" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M64 -52 Q66 -54 68 -52" stroke="#8b6f4e" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M56 -45 Q60 -42 64 -45" stroke="#8b6f4e" strokeWidth="1.5" fill="none" opacity="0.4" />
          <rect x="110" y="60" width="16" height="14" rx="3" fill="#c0b0a0" opacity="0.4" />
          <path d="M126 64 Q132 64 132 70 Q132 76 126 76" stroke="#c0b0a0" strokeWidth="2" fill="none" opacity="0.4" />
        </g>
      </svg>

      <button className="lang-toggle" onClick={toggleLang}>
        {langSwitchLabel}
      </button>
    </div>
  );
}
