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
        {/* Ambient glow */}
        <defs>
          <radialGradient id="glow1" cx="50%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow2" cx="70%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#8b6f9e" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#8b6f9e" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8e7" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#c9a96e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
          </radialGradient>
          <filter id="softShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
            <feOffset dx="0" dy="4" />
            <feComposite in2="SourceGraphic" operator="over" />
          </filter>
        </defs>

        {/* Background glows */}
        <ellipse cx="400" cy="480" rx="350" ry="200" fill="url(#glow1)" />
        <ellipse cx="560" cy="180" rx="300" ry="180" fill="url(#glow2)" />

        {/* Stars */}
        {[[120,80],[650,60],[200,150],[700,200],[80,220],[600,100],[350,50],[500,140],[150,180],[720,280]].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r={1 + (i % 3) * 0.5} fill="#fff" opacity={0.15 + (i % 4) * 0.08}>
            <animate attributeName="opacity" values={`${0.1 + (i % 4) * 0.05};${0.2 + (i % 4) * 0.08};${0.1 + (i % 4) * 0.05}`} dur={`${2 + i % 3}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Film strip decorations */}
        <g opacity="0.08">
          {[100, 650].map((x, i) => (
            <g key={i}>
              {Array.from({ length: 8 }).map((_, j) => (
                <rect key={j} x={x} y={60 + j * 55} width={40} height={40} rx="3" fill="none" stroke="#c9a96e" strokeWidth="1" strokeDasharray="3 3" />
              ))}
            </g>
          ))}
        </g>

        {/* Character body */}
        <g transform="translate(340, 350)">
          {/* Bean bag / cushion */}
          <ellipse cx="60" cy="70" rx="70" ry="35" fill="#2a2240" opacity="0.5" />
          <ellipse cx="60" cy="65" rx="65" ry="30" fill="#3a2f55" opacity="0.4" />

          {/* Legs crossed */}
          <path d="M20 55 Q5 75 10 90" stroke="#8b7a9e" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.5" />
          <path d="M100 55 Q115 75 110 90" stroke="#8b7a9e" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.5" />

          {/* Body / torso */}
          <ellipse cx="60" cy="20" rx="30" ry="35" fill="#5a4a7a" opacity="0.6" />

          {/* Arms holding laptop */}
          <path d="M35 15 Q15 0 10 10" stroke="#7a6a9a" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.5" />
          <path d="M85 15 Q105 0 110 10" stroke="#7a6a9a" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.5" />

          {/* Laptop base */}
          <rect x="5" y="-5" width="55" height="3" rx="1.5" fill="#3a3050" opacity="0.7" />

          {/* Laptop screen */}
          <rect x="8" y="-40" width="49" height="36" rx="3" fill="#1a1530" opacity="0.8" />
          {/* Screen glow */}
          <rect x="8" y="-40" width="49" height="36" rx="3" fill="url(#screenGlow)" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
          </rect>
          {/* Screen content - film icon */}
          <text x="32" y="-18" textAnchor="middle" fontSize="18" opacity="0.6">🎬</text>

          {/* Head */}
          <circle cx="60" cy="-50" r="22" fill="#6a5a8a" opacity="0.5" />
          {/* Hair tuft */}
          <path d="M45 -70 Q50 -78 55 -70 Q60 -80 65 -70 Q70 -78 75 -70" stroke="#8a7aae" strokeWidth="3" fill="none" opacity="0.4" />
          {/* Eyes - sleepy/happy */}
          <path d="M52 -52 Q54 -54 56 -52" stroke="#c9a96e" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M64 -52 Q66 -54 68 -52" stroke="#c9a96e" strokeWidth="1.5" fill="none" opacity="0.6" />
          {/* Small smile */}
          <path d="M56 -45 Q60 -42 64 -45" stroke="#c9a96e" strokeWidth="1.5" fill="none" opacity="0.4" />

          {/* Cup of tea/coffee nearby */}
          <rect x="110" y="60" width="16" height="14" rx="3" fill="#4a3a5a" opacity="0.3" />
          <path d="M126 64 Q132 64 132 70 Q132 76 126 76" stroke="#4a3a5a" strokeWidth="2" fill="none" opacity="0.3" />
          {/* Steam */}
          <path d="M114 58 Q112 52 114 48" stroke="#8a7a9e" strokeWidth="1" fill="none" opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M118 57 Q120 50 118 45" stroke="#8a7a9e" strokeWidth="1" fill="none" opacity="0.15">
            <animate attributeName="opacity" values="0.05;0.2;0.05" dur="2.5s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Floating film icons */}
        <g opacity="0.08">
          <text x="200" y="200" fontSize="24" transform="rotate(-15 200 200)">🎞️</text>
          <text x="580" y="320" fontSize="20" transform="rotate(10 580 320)">📽️</text>
          <text x="160" y="380" fontSize="16" transform="rotate(-8 160 380)">🎥</text>
        </g>
      </svg>

      <button className="lang-toggle" onClick={toggleLang}>
        {langSwitchLabel}
      </button>
    </div>
  );
}
