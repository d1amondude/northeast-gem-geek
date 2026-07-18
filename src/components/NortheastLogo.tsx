import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function NortheastLogo({ className = "", size = 64, color = "#D4AF37" }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 240 240" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Subtle radial and linear gold gradients */}
        <radialGradient id="gold-radial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AA7C11" />
        </radialGradient>
        <linearGradient id="gold-linear" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AA7C11" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6239" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Diamond Wireframe background (transparent, gold lines) */}
      <g opacity="0.25">
        {/* Table & Crown Facets */}
        <polygon points="120,15 165,40 120,55 75,40" stroke={color} strokeWidth="1" />
        <polygon points="165,40 225,40 190,75 120,55" stroke={color} strokeWidth="1" />
        <polygon points="75,40 15,40 50,75 120,55" stroke={color} strokeWidth="1" />
        <polygon points="120,15 225,40 165,40" stroke={color} strokeWidth="1" />
        <polygon points="120,15 15,40 75,40" stroke={color} strokeWidth="1" />
        
        {/* Pavilion Facets */}
        <polygon points="15,40 50,75 120,225" stroke={color} strokeWidth="1" />
        <polygon points="225,40 190,75 120,225" stroke={color} strokeWidth="1" />
        <polygon points="50,75 120,55 190,75 120,225" stroke={color} strokeWidth="1" />
      </g>

      {/* Circular Badge Ring */}
      <circle cx="120" cy="120" r="88" stroke="url(#gold-linear)" strokeWidth="4" fill="#080808" fillOpacity="0.9" />
      <circle cx="120" cy="120" r="68" stroke="url(#gold-linear)" strokeWidth="1.5" />

      {/* Circular Text Path for NORTHEAST GEMOLOGICAL */}
      <path id="textPathTop" d="M 46 120 A 74 74 0 0 1 194 120" fill="none" />
      <path id="textPathBottom" d="M 46 120 A 74 74 0 0 0 194 120" fill="none" />

      <text fontFamily="Georgia, serif" fontSize="13.5" fontWeight="bold" fill="url(#gold-linear)" letterSpacing="3.5">
        <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
          NORTHEAST
        </textPath>
      </text>

      <text fontFamily="Georgia, serif" fontSize="11" fontWeight="bold" fill="url(#gold-linear)" letterSpacing="3">
        <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
          GEMOLOGICAL
        </textPath>
      </text>

      {/* 4-Point Compass Rose Star in center */}
      <g transform="translate(120, 120)">
        {/* North point (split: light and dark gold) */}
        <polygon points="0,0 0,-48 10,-10" fill="url(#gold-radial)" />
        <polygon points="0,0 0,-48 -10,-10" fill="#AA7C11" />

        {/* South point */}
        <polygon points="0,0 0,48 -10,10" fill="url(#gold-radial)" />
        <polygon points="0,0 0,48 10,10" fill="#AA7C11" />

        {/* East point */}
        <polygon points="0,0 48,0 10,10" fill="url(#gold-radial)" />
        <polygon points="0,0 48,0 10,-10" fill="#AA7C11" />

        {/* West point */}
        <polygon points="0,0 -48,0 -10,-10" fill="url(#gold-radial)" />
        <polygon points="0,0 -48,0 -10,10" fill="#AA7C11" />

        {/* Outer mini diamond spark ticks */}
        <polygon points="0,-10 10,0 0,10 -10,0" fill="#FFFFFF" opacity="0.3" />
        <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
