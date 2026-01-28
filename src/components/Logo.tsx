import React from 'react'

interface LogoProps {
  size?: number
  className?: string
}

const Logo: React.FC<LogoProps> = ({ size = 48, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 300 300" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FFE047', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#81C784', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#81C784', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#1890FF', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#26C6DA', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#81C784', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Yellow pencil */}
      <g transform="translate(150, 50) rotate(-45)">
        <rect x="-15" y="-40" width="30" height="80" rx="8" fill="url(#grad1)" />
      </g>

      {/* Blue brush stroke */}
      <path 
        d="M 180 80 Q 200 100 190 130 Q 185 145 170 140 Q 165 125 175 100 Q 180 90 180 80" 
        fill="url(#grad1)"
      />

      {/* Left cyan circle */}
      <circle cx="80" cy="140" r="60" fill="url(#grad2)" opacity="0.9" />

      {/* Center cyan/blue circle */}
      <circle cx="150" cy="150" r="55" fill="url(#grad3)" opacity="0.85" />

      {/* Right cyan/blue circle */}
      <circle cx="210" cy="140" r="50" fill="#26C6DA" opacity="0.8" />

      {/* White circles (holes) for visual interest */}
      <circle cx="120" cy="170" r="25" fill="white" />
      <circle cx="180" cy="180" r="30" fill="white" />
      <circle cx="240" cy="130" r="20" fill="white" />

      {/* Text: MOZENITH */}
      <text 
        x="150" 
        y="280" 
        textAnchor="middle" 
        fontSize="42" 
        fontWeight="700"
        fill="#1890FF"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="2"
      >
        MOZENITH
      </text>
    </svg>
  )
}

export default Logo
