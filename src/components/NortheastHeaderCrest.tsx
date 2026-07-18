import React from "react";

interface CrestProps {
  className?: string;
  size?: number;
}

export default function NortheastHeaderCrest({ className = "", size = 260 }: CrestProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]`}
    >
      <defs>
        {/* Luxury Gold Bevel Gradients */}
        <linearGradient id="shield-gold-outer" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="15%" stopColor="#E5C158" />
          <stop offset="50%" stopColor="#AA7C11" />
          <stop offset="85%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#5C4008" />
        </linearGradient>

        <linearGradient id="shield-gold-inner" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFBF0" />
          <stop offset="30%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#8C6239" />
          <stop offset="100%" stopColor="#FFF2B2" />
        </linearGradient>

        {/* Polished Chrome/Silver Gradients for Metallic Layers */}
        <linearGradient id="shield-chrome" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="75%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        <linearGradient id="chrome-bezel" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="30%" stopColor="#CBD5E1" />
          <stop offset="70%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>

        {/* Dark Slate Base under Diamond Facets */}
        <radialGradient id="slate-base" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </radialGradient>

        {/* Diamond Facet Transparency Gradients */}
        <linearGradient id="facet-bright" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.2" />
        </linearGradient>

        <linearGradient id="facet-medium" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="facet-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64748B" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.7" />
        </linearGradient>

        {/* Shadow filters for realistic depth */}
        <filter id="bevel-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.6" />
        </filter>
        <filter id="star-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <clipPath id="shield-clip">
          <path d="M 72,42 
                   L 328,42 
                   C 357,42 361,54 361,71 
                   L 361,154 
                   C 361,247 303,316 200,349 
                   C 97,316 39,247 39,154 
                   L 39,71 
                   C 39,54 43,42 72,42 Z" />
        </clipPath>
      </defs>

      {/* --- LAYER 1: HEAVY GOLD SHIELD OUTER FRAME (3D Bevelled) --- */}
      <g filter="url(#bevel-shadow)">
        {/* Outer Rich Gold Rim */}
        <path
          d="M 60,30 
             L 340,30 
             C 375,30 380,45 380,65 
             L 380,160 
             C 380,265 315,340 200,375 
             C 85,340 20,265 20,160 
             L 20,65 
             C 20,45 25,30 60,30 Z"
          fill="url(#shield-gold-outer)"
          stroke="#402C04"
          strokeWidth="2"
        />
        
        {/* Inner Chrome Bevel Recess */}
        <path
          d="M 66,36 
             L 334,36 
             C 366,36 370,49 370,68 
             L 370,157 
             C 370,256 309,328 200,362 
             C 91,328 30,256 30,157 
             L 30,68 
             C 30,49 34,36 66,36 Z"
          fill="url(#slate-base)"
          stroke="url(#shield-chrome)"
          strokeWidth="4"
        />

        {/* Inside Raised Gold Rim */}
        <path
          d="M 72,42 
             L 328,42 
             C 357,42 361,54 361,71 
             L 361,154 
             C 361,247 303,316 200,349 
             C 97,316 39,247 39,154 
             L 39,71 
             C 39,54 43,42 72,42 Z"
          fill="none"
          stroke="url(#shield-gold-inner)"
          strokeWidth="3.5"
        />
      </g>

      {/* --- LAYER 2: MULTI-FACETED 3D BRILLIANT DIAMOND BACKGROUND --- */}
      {/* Centered on (200, 175) to provide a rich geometric diamond background */}
      <g clipPath="url(#shield-clip)">
        {/* We build a stunning brilliant-cut wireframe filled with gradients for maximum 3D luster */}
        <g id="diamond-facets" className="opacity-95">
          {/* Base facets - Darker, highly refractive slate-blues */}
          <polygon points="200,45 270,75 200,105 130,75" fill="url(#facet-dark)" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1" />
          <polygon points="270,75 358,75 310,135 200,105" fill="url(#facet-medium)" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1" />
          <polygon points="130,75 42,75 90,135 200,105" fill="url(#facet-medium)" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1" />
          
          {/* Top table reflections */}
          <polygon points="200,45 358,75 270,75" fill="url(#facet-bright)" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1" />
          <polygon points="200,45 42,75 130,75" fill="url(#facet-bright)" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1" />

          {/* Lower Pavilion facets converging down to the shield point */}
          <polygon points="42,75 90,135 200,346" fill="url(#facet-dark)" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1" />
          <polygon points="358,75 310,135 200,346" fill="url(#facet-dark)" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1" />
          
          {/* Bright center-top table reflection facets */}
          <polygon points="90,135 200,105 310,135 200,346" fill="url(#facet-bright)" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1" />
          
          {/* Dynamic highlight facets mimicking light flare */}
          <polygon points="200,105 270,75 310,135" fill="url(#facet-bright)" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" />
          <polygon points="200,105 130,75 90,135" fill="url(#facet-bright)" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" />
        </g>
      </g>

      {/* --- LAYER 3: CENTRAL HIGH-CONTRAST COMPASS BADGE (As seen in the uploaded image) --- */}
      {/* Polished Gold Outer Bezel of the circular compass */}
      <circle cx="200" cy="175" r="95" fill="none" stroke="url(#shield-gold-outer)" strokeWidth="6" filter="url(#bevel-shadow)" />
      <circle cx="200" cy="175" r="92" fill="none" stroke="#2D1F03" strokeWidth="1.5" />

      {/* White/Silver Circular Track for crisp navy blue text */}
      <circle cx="200" cy="175" r="90" fill="url(#chrome-bezel)" />
      <circle cx="200" cy="175" r="71" fill="none" stroke="url(#shield-gold-inner)" strokeWidth="3" />

      {/* Deep Navy/Black inner circle background */}
      <circle cx="200" cy="175" r="69" fill="#0E1218" stroke="#1E293B" strokeWidth="1" />

      {/* Elegant SVG Text Paths for NORTHEAST GEMOLOGICAL */}
      <path id="crestPathTop" d="M 120,175 A 80,80 0 0,1 280,175" fill="none" />
      <path id="crestPathBottom" d="M 120,175 A 80,80 0 0,0 280,175" fill="none" />

      {/* Top Text: NORTHEAST in classic deep navy-slate */}
      <text fontFamily="'Times New Roman', Georgia, serif" fontSize="19.5" fontWeight="900" fill="#1E293B" letterSpacing="4.5">
        <textPath href="#crestPathTop" startOffset="50%" textAnchor="middle">
          NORTHEAST
        </textPath>
      </text>

      {/* Bottom Text: GEMOLOGICAL in classic deep navy-slate */}
      <text fontFamily="'Times New Roman', Georgia, serif" fontSize="15" fontWeight="900" fill="#1E293B" letterSpacing="3.5">
        <textPath href="#crestPathBottom" startOffset="50%" textAnchor="middle">
          GEMOLOGICAL
        </textPath>
      </text>

      {/* Inner Silver Ring framing the star */}
      <circle cx="200" cy="175" r="48" fill="#12161E" stroke="url(#shield-chrome)" strokeWidth="2.5" />
      <circle cx="200" cy="175" r="45" fill="none" stroke="url(#shield-gold-inner)" strokeWidth="1" />

      {/* --- LAYER 4: MAGNIFICENT 8-POINT CHROME & COLD-STEEL STAR --- */}
      {/* Shaded with high contrast split halves to look photorealistic 3D */}
      <g transform="translate(200, 175)" filter="url(#star-glow)">
        {/* North Point */}
        <polygon points="0,0 0,-43 9,-10" fill="#FFFFFF" />
        <polygon points="0,0 0,-43 -9,-10" fill="#475569" />

        {/* South Point */}
        <polygon points="0,0 0,43 -9,10" fill="#E2E8F0" />
        <polygon points="0,0 0,43 9,10" fill="#334155" />

        {/* East Point */}
        <polygon points="0,0 43,0 10,9" fill="#F8FAFC" />
        <polygon points="0,0 43,0 10,-9" fill="#1E293B" />

        {/* West Point */}
        <polygon points="0,0 -43,0 -10,-9" fill="#CBD5E1" />
        <polygon points="0,0 -43,0 -10,9" fill="#0F172A" />

        {/* Diagonal Points (Shorter, Gold-trimmed Silver for accent) */}
        {/* Northeast Point */}
        <polygon points="0,0 26,-26 5,-15" fill="#FFFBF0" />
        <polygon points="0,0 26,-26 15,-5" fill="#AA7C11" />

        {/* Southeast Point */}
        <polygon points="0,0 26,26 15,5" fill="#D4AF37" />
        <polygon points="0,0 26,26 5,15" fill="#5C4008" />

        {/* Southwest Point */}
        <polygon points="0,0 -26,26 -5,15" fill="#FFF2B2" />
        <polygon points="0,0 -26,26 -15,5" fill="#AA7C11" />

        {/* Northwest Point */}
        <polygon points="0,0 -26,-26 -15,-5" fill="#FFFBF0" />
        <polygon points="0,0 -26,-26 -5,-15" fill="#8C6239" />

        {/* Central Beveled Rivet Pin */}
        <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
        <circle cx="0" cy="0" r="2.5" fill="url(#shield-gold-outer)" />
      </g>
    </svg>
  );
}

