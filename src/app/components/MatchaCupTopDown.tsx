'use client';

import React from 'react';

interface Props {
  isHovered: boolean;
}

export default function MatchaCupTopDown({ isHovered }: Props) {
  return (
    <div
      style={{
        width: 150,
        height: 150,
        filter: isHovered
          ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 24px rgba(80,160,40,0.5))'
          : 'drop-shadow(0 10px 24px rgba(0,0,0,0.5)) drop-shadow(0 4px 8px rgba(0,0,0,0.25))',
        transform: isHovered ? 'translateY(-10px) scale(1.1)' : 'scale(1)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer',
      }}
    >
      <svg viewBox="0 0 150 150" width="150" height="150" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Saucer */}
          <radialGradient id="saucerGrad" cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#F5EAD8" />
            <stop offset="45%" stopColor="#DEC9A8" />
            <stop offset="80%" stopColor="#C4A87C" />
            <stop offset="100%" stopColor="#A88860" />
          </radialGradient>
          {/* Cup outer rim */}
          <radialGradient id="cupOuter" cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#EDE0CC" />
            <stop offset="55%" stopColor="#D0B890" />
            <stop offset="100%" stopColor="#B09060" />
          </radialGradient>
          {/* Cup inner wall */}
          <radialGradient id="cupInner" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#E8D8C0" />
            <stop offset="100%" stopColor="#C0A070" />
          </radialGradient>
          {/* Matcha liquid */}
          <radialGradient id="matchaLiquid" cx="40%" cy="36%" r="70%">
            <stop offset="0%" stopColor="#C8E870" />
            <stop offset="20%" stopColor="#9ED040" />
            <stop offset="50%" stopColor="#6AAE18" />
            <stop offset="80%" stopColor="#4A8A08" />
            <stop offset="100%" stopColor="#2E6400" />
          </radialGradient>
          {/* Foam highlight */}
          <radialGradient id="foamHighlight" cx="38%" cy="34%" r="58%">
            <stop offset="0%" stopColor="rgba(220,255,160,0.9)" />
            <stop offset="35%" stopColor="rgba(160,220,80,0.55)" />
            <stop offset="70%" stopColor="rgba(100,180,30,0.2)" />
            <stop offset="100%" stopColor="rgba(60,140,0,0)" />
          </radialGradient>
          {/* Specular highlight */}
          <radialGradient id="specular" cx="35%" cy="30%" r="40%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          {/* Ground shadow */}
          <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          {/* Saucer rim highlight */}
          <linearGradient id="saucerRimHL" x1="20%" y1="20%" x2="80%" y2="80%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          {/* Handle gradient */}
          <linearGradient id="handleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D8C090" />
            <stop offset="50%" stopColor="#F0E0B8" />
            <stop offset="100%" stopColor="#B89860" />
          </linearGradient>
          {/* Steam filter */}
          <filter id="steamBlur">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="76" cy="142" rx="52" ry="8" fill="url(#groundShadow)" />

        {/* Saucer — slightly elliptical top-down */}
        <ellipse cx="75" cy="80" rx="68" ry="62" fill="url(#saucerGrad)" />
        {/* Saucer rim highlight arc */}
        <ellipse cx="73" cy="77" rx="66" ry="60" fill="none" stroke="url(#saucerRimHL)" strokeWidth="2" />
        {/* Saucer inner depression ring */}
        <ellipse cx="75" cy="80" rx="50" ry="45" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
        <ellipse cx="75" cy="80" rx="49" ry="44" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

        {/* Cup outer body */}
        <ellipse cx="75" cy="78" rx="46" ry="42" fill="url(#cupOuter)" />
        {/* Cup outer rim highlight */}
        <ellipse cx="73" cy="75" rx="44" ry="40" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />

        {/* Cup inner wall ring (depth illusion) */}
        <ellipse cx="75" cy="78" rx="40" ry="36" fill="url(#cupInner)" />
        <ellipse cx="75" cy="78" rx="39" ry="35" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />

        {/* Matcha liquid surface */}
        <ellipse cx="75" cy="77" rx="36" ry="32" fill="url(#matchaLiquid)" />

        {/* Foam layer */}
        <ellipse cx="73" cy="75" rx="30" ry="26" fill="url(#foamHighlight)" />

        {/* Latte art — heart/swirl pattern */}
        <path
          d="M62 72 Q68 64 75 70 Q82 64 88 72 Q88 80 75 86 Q62 80 62 72 Z"
          fill="none"
          stroke="rgba(200,255,120,0.55)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Chasen whisk swirl lines */}
        <path d="M55 70 Q65 62 75 68 Q85 74 95 68" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M57 76 Q67 68 77 74 Q87 80 97 74" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M58 82 Q68 74 78 80 Q88 86 96 80" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" />
        {/* Center swirl dot */}
        <circle cx="75" cy="74" r="3.5" fill="rgba(200,255,100,0.45)" />
        <circle cx="75" cy="74" r="1.8" fill="rgba(255,255,255,0.35)" />

        {/* Specular highlight on liquid */}
        <ellipse cx="64" cy="65" rx="11" ry="7" fill="url(#specular)" transform="rotate(-20, 64, 65)" />

        {/* Handle — visible from top-down (right side arc) */}
        <path
          d="M118 62 Q136 78 118 94"
          fill="none"
          stroke="#C8A870"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M118 64 Q133 78 118 92"
          fill="none"
          stroke="url(#handleGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Handle inner shadow */}
        <path
          d="M118 66 Q130 78 118 90"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Steam wisps (subtle) */}
        <g filter="url(#steamBlur)" opacity="0.5">
          <path d="M68 30 Q65 22 68 14 Q71 6 68 0" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          <path d="M75 28 Q72 20 75 12 Q78 4 75 -2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
          <path d="M82 30 Q79 22 82 14 Q85 6 82 0" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
