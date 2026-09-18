'use client';

import React from 'react';

interface Props {
  isHovered: boolean;
}

export default function StickyNoteProp({ isHovered }: Props) {
  return (
    <div
      style={{
        width: 160,
        height: 180,
        filter: isHovered
          ? 'drop-shadow(0 16px 32px rgba(0,0,0,0.5)) drop-shadow(0 0 16px rgba(120,80,40,0.3))'
          : 'drop-shadow(0 6px 18px rgba(0,0,0,0.42)) drop-shadow(0 2px 5px rgba(0,0,0,0.22))',
        transform: isHovered ? 'translateY(-8px) scale(1.05) rotate(-2deg)' : 'rotate(4deg)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer',
      }}
    >
      <svg viewBox="0 0 160 180" width="160" height="180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C0714A" />
            <stop offset="40%" stopColor="#A85A35" />
            <stop offset="100%" stopColor="#7A3E20" />
          </linearGradient>
          <linearGradient id="bookSpine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5C2A10" />
            <stop offset="60%" stopColor="#8B4520" />
            <stop offset="100%" stopColor="#6B3318" />
          </linearGradient>
          <linearGradient id="pagesGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5EDD8" />
            <stop offset="60%" stopColor="#EDE0C4" />
            <stop offset="100%" stopColor="#D8C8A8" />
          </linearGradient>
          <linearGradient id="coverHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          <filter id="bookShadow">
            <feDropShadow dx="3" dy="4" stdDeviation="5" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>

        {/* Pages (right side, slightly offset for depth) */}
        <rect x="22" y="8" width="130" height="164" rx="2" fill="url(#pagesGrad)" />
        <line x1="24" y1="20" x2="150" y2="20" stroke="rgba(180,160,120,0.3)" strokeWidth="0.5" />
        <line x1="24" y1="32" x2="150" y2="32" stroke="rgba(180,160,120,0.25)" strokeWidth="0.5" />
        <line x1="24" y1="44" x2="150" y2="44" stroke="rgba(180,160,120,0.2)" strokeWidth="0.5" />

        {/* Book cover */}
        <rect x="8" y="4" width="132" height="168" rx="4" fill="url(#bookCover)" filter="url(#bookShadow)" />
        <rect x="8" y="4" width="132" height="168" rx="4" fill="url(#coverHighlight)" />

        {/* Spine */}
        <rect x="8" y="4" width="18" height="168" rx="4" fill="url(#bookSpine)" />
        <rect x="10" y="4" width="4" height="168" rx="2" fill="rgba(255,255,255,0.12)" />

        {/* Cover border/frame */}
        <rect x="30" y="16" width="100" height="140" rx="3" fill="none" stroke="rgba(255,220,180,0.25)" strokeWidth="1.5" />

        {/* Handwriting title — line 1 */}
        <text
          x="82"
          y="58"
          textAnchor="middle"
          fill="#FFE8C8"
          fontSize="14"
          fontFamily="'Caveat', 'Patrick Hand', 'Segoe Script', cursive"
          fontWeight="700"
          letterSpacing="0.3"
        >
          Pengenalan
        </text>

        {/* Handwriting title — line 2 */}
        <text
          x="82"
          y="82"
          textAnchor="middle"
          fill="#FFE8C8"
          fontSize="13"
          fontFamily="'Caveat', 'Patrick Hand', 'Segoe Script', cursive"
          fontWeight="700"
          letterSpacing="0.3"
        >
          Membentuk dan
        </text>

        {/* Handwriting title — line 3 */}
        <text
          x="82"
          y="104"
          textAnchor="middle"
          fill="#FFE8C8"
          fontSize="13"
          fontFamily="'Caveat', 'Patrick Hand', 'Segoe Script', cursive"
          fontWeight="700"
          letterSpacing="0.3"
        >
          Membuat Binaan
        </text>

        {/* Decorative underline squiggle */}
        <path
          d="M38 114 Q60 118 82 114 Q104 110 122 114"
          fill="none"
          stroke="rgba(255,220,160,0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Bookmark ribbon */}
        <rect x="118" y="4" width="8" height="28" rx="1" fill="#E8A060" />
        <polygon points="118,32 122,38 126,32" fill="#E8A060" />

        {/* Decorative doodles */}
        <text x="108" y="140" fill="rgba(255,220,160,0.55)" fontSize="13" fontFamily="sans-serif">✦</text>
        <text x="36" y="148" fill="rgba(255,220,160,0.4)" fontSize="10" fontFamily="sans-serif">✿</text>
      </svg>
    </div>
  );
}
