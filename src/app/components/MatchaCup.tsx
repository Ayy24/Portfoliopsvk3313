'use client';

import React from 'react';

interface Props {
  isHovered: boolean;
}

export default function MatchaCup({ isHovered }: Props) {
  return (
    <div
      className="desk-item-hover"
      style={{
        width: 180,
        height: 180,
        filter: isHovered
          ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.55)) drop-shadow(0 0 24px rgba(80,130,60,0.35))'
          : 'drop-shadow(0 10px 22px rgba(0,0,0,0.45)) drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
        transform: isHovered ? 'translateY(-10px) scale(1.05) rotate(-2deg)' : 'rotate(-5deg)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <svg viewBox="0 0 180 180" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Ceramic body gradient - warm white with depth */}
          <linearGradient id="ceramicBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8B49A" />
            <stop offset="15%" stopColor="#E8D8C4" />
            <stop offset="40%" stopColor="#F5EDE0" />
            <stop offset="65%" stopColor="#EDE0CC" />
            <stop offset="85%" stopColor="#D4C0A8" />
            <stop offset="100%" stopColor="#B8A088" />
          </linearGradient>

          {/* Saucer gradient */}
          <linearGradient id="saucerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EDE0CC" />
            <stop offset="50%" stopColor="#D8C8B0" />
            <stop offset="100%" stopColor="#C4B09A" />
          </linearGradient>

          {/* Matcha liquid gradient - realistic green */}
          <radialGradient id="matchaLiquid" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#9DC86A" />
            <stop offset="30%" stopColor="#7BAF4A" />
            <stop offset="70%" stopColor="#5A9030" />
            <stop offset="100%" stopColor="#3D7020" />
          </radialGradient>

          {/* Matcha foam/surface */}
          <radialGradient id="matchaFoam" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#B8D880" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#8FC050" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6A9A30" stopOpacity="0.3" />
          </radialGradient>

          {/* Handle gradient */}
          <linearGradient id="handleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8A088" />
            <stop offset="40%" stopColor="#D8C8B0" />
            <stop offset="100%" stopColor="#A89078" />
          </linearGradient>

          {/* Rim gradient */}
          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8F0E4" />
            <stop offset="100%" stopColor="#D8C8B0" />
          </linearGradient>

          {/* Shadow under cup */}
          <radialGradient id="cupShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* Steam gradient */}
          <linearGradient id="steamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <filter id="steamBlur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Cast shadow on desk */}
        <ellipse cx="88" cy="158" rx="58" ry="10" fill="url(#cupShadow)" />

        {/* Saucer */}
        <ellipse cx="88" cy="148" rx="64" ry="13" fill="#B8A088" opacity="0.5" />
        <ellipse cx="88" cy="146" rx="62" ry="11" fill="url(#saucerGrad)" />
        <ellipse cx="88" cy="144" rx="56" ry="8" fill="#EDE0CC" />
        {/* Saucer rim highlight */}
        <ellipse cx="88" cy="143" rx="54" ry="7" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        {/* Saucer center ring */}
        <ellipse cx="88" cy="144" rx="30" ry="4" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />

        {/* Cup body - main shape with realistic taper */}
        <path
          d="M36 82 Q33 118 38 132 Q50 148 88 150 Q126 148 138 132 Q143 118 140 82 Z"
          fill="url(#ceramicBody)"
        />

        {/* Cup body - left shadow (depth) */}
        <path
          d="M36 82 Q33 118 38 132 Q44 142 58 147 Q44 130 42 110 Q40 95 42 82 Z"
          fill="rgba(0,0,0,0.12)"
        />

        {/* Cup body - right shadow */}
        <path
          d="M140 82 Q143 118 138 132 Q132 142 118 147 Q132 130 134 110 Q136 95 134 82 Z"
          fill="rgba(0,0,0,0.08)"
        />

        {/* Cup body - specular highlight (light reflection) */}
        <path
          d="M55 88 Q52 110 54 128 Q56 136 60 140"
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M62 86 Q60 108 62 126"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Rim ellipse - top of cup */}
        <ellipse cx="88" cy="82" rx="52" ry="13" fill="url(#rimGrad)" />
        <ellipse cx="88" cy="81" rx="50" ry="11" fill="#F0E4D0" />
        {/* Rim inner shadow */}
        <ellipse cx="88" cy="82" rx="48" ry="10" fill="rgba(0,0,0,0.06)" />

        {/* Matcha liquid surface */}
        <ellipse cx="88" cy="82" rx="46" ry="9.5" fill="url(#matchaLiquid)" />

        {/* Matcha surface foam/texture */}
        <ellipse cx="84" cy="80" rx="38" ry="7.5" fill="url(#matchaFoam)" />

        {/* Matcha surface - chasen (whisk) pattern */}
        <path d="M68 79 Q76 75 84 79 Q92 83 100 79" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M72 82 Q80 78 88 82 Q96 86 104 82" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" />
        <path d="M76 77 Q84 73 92 77" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round" />

        {/* Matcha surface specular */}
        <ellipse cx="76" cy="78" rx="12" ry="4" fill="rgba(255,255,255,0.18)" transform="rotate(-10, 76, 78)" />

        {/* Handle - realistic ceramic handle */}
        <path
          d="M140 92 Q162 92 162 108 Q162 124 140 124"
          fill="none"
          stroke="#B8A088"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Handle highlight */}
        <path
          d="M140 94 Q158 94 158 108 Q158 122 140 122"
          fill="none"
          stroke="url(#handleGrad)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Handle inner shadow */}
        <path
          d="M140 98 Q154 98 154 108 Q154 118 140 118"
          fill="none"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Handle specular */}
        <path
          d="M141 96 Q156 96 156 108"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Steam wisps - realistic diffuse */}
        <g filter="url(#steamBlur)" opacity="0.7">
          <path
            d="M68 68 Q64 56 68 46 Q72 36 68 26"
            fill="none"
            stroke="url(#steamGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <animateTransform attributeName="transform" type="translate" values="0,0; 3,-6; 0,0" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.2s" repeatCount="indefinite" />
          </path>
          <path
            d="M88 62 Q84 50 88 40 Q92 30 88 20"
            fill="none"
            stroke="url(#steamGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <animateTransform attributeName="transform" type="translate" values="0,0; -3,-7; 0,0" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.8s" repeatCount="indefinite" />
          </path>
          <path
            d="M106 68 Q102 56 106 46 Q110 36 106 26"
            fill="none"
            stroke="url(#steamGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <animateTransform attributeName="transform" type="translate" values="0,0; 2,-5; 0,0" dur="3.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.15;0.5" dur="3.2s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
    </div>
  );
}