'use client';

import React from 'react';
import Image from 'next/image';

interface Props {
  isHovered: boolean;
}

export default function LanyardBadge({ isHovered }: Props) {
  return (
    <div
      style={{
        width: 220,
        height: 260,
        filter: isHovered
          ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(180,140,60,0.3))'
          : 'drop-shadow(0 8px 20px rgba(0,0,0,0.45)) drop-shadow(0 3px 6px rgba(0,0,0,0.2))',
        transform: isHovered ? 'translateY(-8px) scale(1.04) rotate(-1deg)' : 'rotate(4deg)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <svg viewBox="0 0 220 260" width="220" height="260" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          {/* Lanyard fabric - dark navy with texture */}
          <linearGradient id="lanyardFabric" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A2240" />
            <stop offset="20%" stopColor="#243060" />
            <stop offset="40%" stopColor="#1E2A54" />
            <stop offset="60%" stopColor="#243060" />
            <stop offset="80%" stopColor="#1E2A54" />
            <stop offset="100%" stopColor="#1A2240" />
          </linearGradient>

          {/* Metal clip gradient */}
          <linearGradient id="metalClip" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D0D0D8" />
            <stop offset="25%" stopColor="#F0F0F4" />
            <stop offset="50%" stopColor="#C8C8D0" />
            <stop offset="75%" stopColor="#E8E8EC" />
            <stop offset="100%" stopColor="#A8A8B0" />
          </linearGradient>

          {/* Badge card - white PVC */}
          <linearGradient id="badgeCard" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8F8FA" />
            <stop offset="40%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F0F0F4" />
          </linearGradient>

          {/* Badge header - deep navy */}
          <linearGradient id="badgeHeader" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E2A5A" />
            <stop offset="50%" stopColor="#243268" />
            <stop offset="100%" stopColor="#1A2450" />
          </linearGradient>

          {/* Card edge/shadow */}
          <linearGradient id="cardEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.2)" />
            <stop offset="5%" stopColor="rgba(0,0,0,0)" />
            <stop offset="95%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
          </linearGradient>

          {/* Card glare */}
          <linearGradient id="cardGlare" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Clip path for profile photo */}
          <clipPath id="photoClip">
            <rect x="16" y="128" width="56" height="68" rx="5" />
          </clipPath>

          <filter id="cardShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>

        {/* Lanyard strap - left side */}
        <path
          d="M82 0 Q78 18 84 32 Q90 46 92 62"
          fill="none"
          stroke="url(#lanyardFabric)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M82 0 Q78 18 84 32 Q90 46 92 62"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Lanyard strap - right side */}
        <path
          d="M138 0 Q142 18 136 32 Q130 46 128 62"
          fill="none"
          stroke="url(#lanyardFabric)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M138 0 Q142 18 136 32 Q130 46 128 62"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Metal clip body */}
        <rect x="95" y="58" width="30" height="16" rx="4" fill="url(#metalClip)" />
        <rect x="95" y="58" width="30" height="16" rx="4" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
        <rect x="101" y="62" width="18" height="8" rx="3" fill="rgba(0,0,0,0.15)" />
        <rect x="102" y="63" width="16" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="96" y="59" width="28" height="4" rx="3" fill="rgba(255,255,255,0.35)" />

        {/* Badge card shadow */}
        <rect x="8" y="78" width="204" height="176" rx="8" fill="rgba(0,0,0,0.25)" transform="translate(3,4)" />

        {/* Badge card body */}
        <rect x="8" y="76" width="204" height="176" rx="8" fill="url(#badgeCard)" filter="url(#cardShadow)" />
        <rect x="8" y="76" width="204" height="176" rx="8" fill="url(#cardEdge)" />

        {/* Badge header section — blue top */}
        <rect x="8" y="76" width="204" height="52" rx="8" fill="url(#badgeHeader)" />
        <rect x="8" y="110" width="204" height="18" fill="url(#badgeHeader)" />

        {/* Header decorative line */}
        <rect x="8" y="118" width="204" height="2" fill="rgba(255,200,80,0.6)" />

        {/* Header text */}
        <text x="110" y="97" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="10" fontWeight="800" fontFamily="system-ui" letterSpacing="1.5">
          PSVK 3313
        </text>
        <text x="110" y="112" textAnchor="middle" fill="rgba(255,220,100,0.95)" fontSize="8.5" fontWeight="700" fontFamily="system-ui" letterSpacing="0.8">
          Bentuk &amp; Binaan
        </text>

        {/* Photo border frame */}
        <rect x="15" y="127" width="58" height="70" rx="6" fill="rgba(180,200,220,0.4)" />

        {/* Right side — name and details */}
        <text x="84" y="144" fill="#1A1A2E" fontSize="11" fontWeight="800" fontFamily="system-ui">
          Amani
        </text>
        <text x="84" y="160" fill="#3A3A5A" fontSize="8.5" fontFamily="system-ui">
          Kelas PSV 1
        </text>
        <text x="84" y="174" fill="#5A5A7A" fontSize="7.5" fontFamily="system-ui">
          PIMSP Ambilan
        </text>
        <text x="84" y="185" fill="#5A5A7A" fontSize="7.5" fontFamily="system-ui">
          Ogos 2025
        </text>

        {/* Divider line */}
        <line x1="16" y1="204" x2="204" y2="204" stroke="#E0E0E8" strokeWidth="1" />

        {/* Barcode area */}
        <rect x="16" y="210" width="188" height="34" rx="3" fill="white" />
        <rect x="16" y="210" width="188" height="34" rx="3" fill="none" stroke="#E0E0E8" strokeWidth="0.5" />
        {[18,21,23,25,28,30,32,35,37,39,42,44,46,49,51,53,56,58,60,63,65,67,70,72,74,77,79,81,84,86,88,91,93,95,98,100,102,105,107,109,112,114,116,119,121,123,126,128,130,133,135,137,140,142,144,147,149,151,154,156,158,161,163,165,168,170,172,175,177,179,182,184,186,189,191,193,196,198].map((x, i) => (
          <rect
            key={i}
            x={x}
            y={212}
            width={i % 4 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1}
            height={24}
            fill="#1A1A1A"
            opacity={i % 7 === 0 ? 0.9 : i % 5 === 0 ? 0.7 : 0.85}
          />
        ))}
        <text x="110" y="250" textAnchor="middle" fill="#8A8A9A" fontSize="7" fontFamily="monospace" letterSpacing="1">
          PSVK-0234-2025
        </text>

        {/* Card surface glare */}
        <path d="M10 78 L90 78 L10 158 Z" fill="url(#cardGlare)" />
      </svg>

      {/* Profile photo using Next.js Image — rendered on top of SVG, clipped to photo area */}
      <div
        style={{
          position: 'absolute',
          top: 127,
          left: 15,
          width: 58,
          height: 70,
          borderRadius: 6,
          overflow: 'hidden',
          border: '1.5px solid rgba(180,200,220,0.6)',
        }}
      >
        <Image
          src="/assets/images/DSC_0294-1789720930127.jpeg"
          alt="Profile photo"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          sizes="58px"
        />
      </div>
    </div>
  );
}