'use client';

import React from 'react';

interface Props {
  isHovered: boolean;
}

export default function PortfolioFolder({ isHovered }: Props) {
  return (
    <div
      style={{
        width: 360,
        height: 420,
        filter: isHovered
          ? 'drop-shadow(0 28px 56px rgba(0,0,0,0.55)) drop-shadow(0 0 32px rgba(160,100,40,0.3))'
          : 'drop-shadow(0 14px 32px rgba(0,0,0,0.45)) drop-shadow(0 4px 10px rgba(0,0,0,0.25))',
        transform: isHovered
          ? 'translateY(-14px) scale(1.03) rotate(-1deg)'
          : 'rotate(-3deg)',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer',
      }}
    >
      <svg viewBox="0 0 360 420" width="360" height="420" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Back folder - slightly darker kraft */}
          <linearGradient id="backFolder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A07848" />
            <stop offset="30%" stopColor="#B88A58" />
            <stop offset="70%" stopColor="#A87848" />
            <stop offset="100%" stopColor="#906838" />
          </linearGradient>

          {/* Main folder - realistic kraft cardboard */}
          <linearGradient id="mainFolder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C09060" />
            <stop offset="20%" stopColor="#D4A870" />
            <stop offset="50%" stopColor="#C89860" />
            <stop offset="80%" stopColor="#B88850" />
            <stop offset="100%" stopColor="#A87840" />
          </linearGradient>

          {/* Folder left edge shadow */}
          <linearGradient id="folderLeftEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>

          {/* Folder right edge shadow */}
          <linearGradient id="folderRightEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
          </linearGradient>

          {/* Paper sticking out */}
          <linearGradient id="paperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEFAF2" />
            <stop offset="100%" stopColor="#F0E8D8" />
          </linearGradient>

          {/* Label paper */}
          <linearGradient id="labelPaper" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEFCF6" />
            <stop offset="50%" stopColor="#FAF6EC" />
            <stop offset="100%" stopColor="#F4EEE0" />
          </linearGradient>

          {/* Metal paperclip */}
          <linearGradient id="metalPaperclip" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A9098" />
            <stop offset="30%" stopColor="#C8D0D8" />
            <stop offset="60%" stopColor="#A8B0B8" />
            <stop offset="100%" stopColor="#788088" />
          </linearGradient>

          {/* Folder tab */}
          <linearGradient id="folderTab" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B88050" />
            <stop offset="100%" stopColor="#A07040" />
          </linearGradient>

          {/* Kraft texture pattern */}
          <pattern id="kraftFiber" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="4" y2="4" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
            <line x1="4" y1="0" x2="0" y2="4" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="0" y1="2" x2="4" y2="2" stroke="rgba(0,0,0,0.03)" strokeWidth="0.3" />
          </pattern>

          {/* Stamp ink */}
          <radialGradient id="stampInk" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(140,60,40,0.5)" />
            <stop offset="70%" stopColor="rgba(120,50,30,0.35)" />
            <stop offset="100%" stopColor="rgba(100,40,20,0.1)" />
          </radialGradient>

          <filter id="paperShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.2)" />
          </filter>
        </defs>

        {/* Cast shadow on desk */}
        <ellipse cx="185" cy="415" rx="150" ry="12" fill="rgba(0,0,0,0.2)" />

        {/* Back folder (peeking behind) */}
        <rect x="22" y="18" width="308" height="388" rx="6"
          fill="url(#backFolder)"
          transform="rotate(4, 176, 212)"
        />
        {/* Back folder fiber texture */}
        <rect x="22" y="18" width="308" height="388" rx="6"
          fill="url(#kraftFiber)"
          opacity="0.5"
          transform="rotate(4, 176, 212)"
        />
        {/* Back folder tab */}
        <rect x="22" y="18" width="110" height="22" rx="4"
          fill="#9A6838"
          transform="rotate(4, 77, 29)"
        />
        {/* Back folder edge */}
        <rect x="22" y="18" width="308" height="388" rx="6"
          fill="none"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="1"
          transform="rotate(4, 176, 212)"
        />

        {/* Main folder body */}
        <rect x="14" y="22" width="316" height="386" rx="7"
          fill="url(#mainFolder)"
        />
        {/* Kraft fiber texture on main folder */}
        <rect x="14" y="22" width="316" height="386" rx="7"
          fill="url(#kraftFiber)"
          opacity="0.6"
        />

        {/* Folder tab */}
        <rect x="14" y="22" width="128" height="26" rx="5"
          fill="url(#folderTab)"
        />
        <rect x="14" y="22" width="128" height="26" rx="5"
          fill="url(#kraftFiber)"
          opacity="0.4"
        />
        {/* Tab highlight */}
        <rect x="15" y="23" width="126" height="8" rx="4"
          fill="rgba(255,255,255,0.12)"
        />

        {/* Folder left edge shadow */}
        <rect x="14" y="22" width="30" height="386" rx="7"
          fill="url(#folderLeftEdge)"
        />

        {/* Folder right edge shadow */}
        <rect x="300" y="22" width="30" height="386" rx="7"
          fill="url(#folderRightEdge)"
        />

        {/* Folder bottom shadow */}
        <rect x="14" y="370" width="316" height="38" rx="0"
          fill="rgba(0,0,0,0.12)"
          style={{ borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }}
        />

        {/* Folder surface highlight - light catching top edge */}
        <path
          d="M16 42 Q16 400 18 404"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M24 40 Q24 400 26 404"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Papers sticking out top - back paper */}
        <rect x="32" y="8" width="272" height="28" rx="3"
          fill="#F0E8D8"
          stroke="#D8CEB8"
          strokeWidth="0.5"
          transform="rotate(-1.5, 168, 22)"
          filter="url(#paperShadow)"
        />
        {/* Papers sticking out top - front paper */}
        <rect x="28" y="4" width="268" height="26" rx="3"
          fill="url(#paperGrad)"
          stroke="#DDD4C0"
          strokeWidth="0.5"
          transform="rotate(1, 162, 17)"
          filter="url(#paperShadow)"
        />
        {/* Paper ruled lines visible */}
        <line x1="40" y1="12" x2="280" y2="12" stroke="rgba(100,140,200,0.15)" strokeWidth="0.8" transform="rotate(1, 162, 17)" />
        <line x1="40" y1="18" x2="280" y2="18" stroke="rgba(100,140,200,0.12)" strokeWidth="0.8" transform="rotate(1, 162, 17)" />

        {/* Metal paperclip - realistic */}
        <path
          d="M156 38 L156 6 Q156 0 163 0 Q170 0 170 6 L170 40 Q170 50 163 50 Q156 50 156 40 L156 34"
          fill="none"
          stroke="url(#metalPaperclip)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Paperclip inner loop */}
        <path
          d="M159 38 L159 8 Q159 4 163 4 Q167 4 167 8 L167 38"
          fill="none"
          stroke="rgba(200,210,220,0.6)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Paperclip highlight */}
        <path
          d="M157 36 L157 8 Q157 2 163 2"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Label paper - slightly torn/aged */}
        <path
          d="M72 72 L272 66 L276 162 L68 168 Z"
          fill="url(#labelPaper)"
          filter="url(#paperShadow)"
        />
        {/* Label paper edge shadow */}
        <path
          d="M72 72 L272 66 L276 162 L68 168 Z"
          fill="none"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="1"
        />
        {/* Label paper fiber texture */}
        <path
          d="M72 72 L272 66 L276 162 L68 168 Z"
          fill="url(#kraftFiber)"
          opacity="0.3"
        />

        {/* Torn left edge of label */}
        <path
          d="M72 72 L74 76 L70 80 L75 84 L71 88 L76 92 L72 96 L77 100 L73 104 L78 108 L74 112 L79 116 L75 120 L80 124 L76 128 L81 132 L77 136 L82 140 L78 144 L83 148 L79 152 L84 156 L80 160 L68 168"
          fill="url(#labelPaper)"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="0.5"
        />

        {/* PORTFOLIO text - realistic ink on paper */}
        <text
          x="174"
          y="126"
          textAnchor="middle"
          fill="#3A2010"
          fontSize="28"
          fontWeight="900"
          fontFamily="Georgia, serif"
          letterSpacing="3"
          transform="rotate(-2, 174, 116)"
          opacity="0.88"
        >
          KRAF &amp; ARCA
        </text>
        {/* Text shadow for depth */}
        <text
          x="175"
          y="127"
          textAnchor="middle"
          fill="rgba(0,0,0,0.15)"
          fontSize="28"
          fontWeight="900"
          fontFamily="Georgia, serif"
          letterSpacing="3"
          transform="rotate(-2, 174, 116)"
        >
          KRAF &amp; ARCA
        </text>

        {/* Handwritten "by psvk3313" */}
        <text
          x="200"
          y="154"
          textAnchor="middle"
          fill="#6A4A2A"
          fontSize="13"
          fontFamily="cursive"
          transform="rotate(-2, 200, 154)"
          opacity="0.75"
        >
          by psvk3313
        </text>

        {/* Rubber stamp impression - realistic ink bleed */}
        <circle cx="248" cy="320" r="42" fill="none" stroke="url(#stampInk)" strokeWidth="3" opacity="0.6" />
        <circle cx="248" cy="320" r="35" fill="none" stroke="url(#stampInk)" strokeWidth="1.5" opacity="0.5" />
        {/* Stamp text - slightly uneven like real ink */}
        <text
          x="248"
          y="314"
          textAnchor="middle"
          fill="rgba(140,60,40,0.45)"
          fontSize="9"
          fontWeight="700"
          letterSpacing="2.5"
          fontFamily="monospace"
          transform="rotate(-12, 248, 320)"
        >
          PSVK 3313
        </text>
        <text
          x="248"
          y="328"
          textAnchor="middle"
          fill="rgba(140,60,40,0.4)"
          fontSize="8"
          letterSpacing="1.5"
          fontFamily="monospace"
          transform="rotate(-12, 248, 320)"
        >
          ✦ 2026 ✦
        </text>
        {/* Stamp outer ring text */}
        <path id="stampArc" d="M 248 278 A 42 42 0 0 1 290 320" fill="none" />
        <text fill="rgba(140,60,40,0.35)" fontSize="6.5" fontFamily="monospace" letterSpacing="2">
          <textPath href="#stampArc">BENTUK &amp; BINAAN</textPath>
        </text>

        {/* Small decorative washi tape corner */}
        <rect x="14" y="22" width="50" height="14" rx="2"
          fill="rgba(255,200,100,0.45)"
          transform="rotate(-3, 39, 29)"
        />
        <rect x="14" y="22" width="50" height="14" rx="2"
          fill="repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 4px, transparent 4px, transparent 8px)"
          transform="rotate(-3, 39, 29)"
        />
      </svg>
    </div>
  );
}