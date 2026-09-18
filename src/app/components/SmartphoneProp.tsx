'use client';

import React, { useState, useEffect } from 'react';

interface Props {
  isHovered: boolean;
}

export default function SmartphoneProp({ isHovered }: Props) {
  const [colonVisible, setColonVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setColonVisible(v => !v);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: 130,
        height: 220,
        filter: isHovered
          ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.65)) drop-shadow(0 0 20px rgba(60,100,200,0.25))'
          : 'drop-shadow(0 12px 28px rgba(0,0,0,0.55)) drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        transform: isHovered ? 'translateY(-10px) scale(1.05) rotate(1deg)' : 'rotate(8deg)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer',
      }}
    >
      <svg viewBox="0 0 130 220" width="130" height="220" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Phone frame - brushed aluminum/titanium */}
          <linearGradient id="phoneFrame" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A1A1E" />
            <stop offset="8%" stopColor="#2E2E34" />
            <stop offset="15%" stopColor="#3A3A42" />
            <stop offset="50%" stopColor="#28282E" />
            <stop offset="85%" stopColor="#3A3A42" />
            <stop offset="92%" stopColor="#2E2E34" />
            <stop offset="100%" stopColor="#1A1A1E" />
          </linearGradient>

          {/* Screen gradient - OLED deep black with subtle blue tint */}
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D0D14" />
            <stop offset="40%" stopColor="#080810" />
            <stop offset="100%" stopColor="#050508" />
          </linearGradient>

          {/* Screen reflection - glass glare */}
          <linearGradient id="screenReflection" x1="0%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Side button gradient */}
          <linearGradient id="sideBtn" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E1E24" />
            <stop offset="50%" stopColor="#3A3A44" />
            <stop offset="100%" stopColor="#1E1E24" />
          </linearGradient>

          {/* Wallpaper gradient - subtle blue/purple */}
          <linearGradient id="wallpaper" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A0A1A" />
            <stop offset="30%" stopColor="#0D1228" />
            <stop offset="60%" stopColor="#0A0F20" />
            <stop offset="100%" stopColor="#050810" />
          </linearGradient>

          {/* Frame edge highlight */}
          <linearGradient id="frameEdge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>

          <filter id="screenGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Phone outer frame - titanium/aluminum */}
        <rect x="2" y="2" width="126" height="216" rx="22" ry="22" fill="url(#phoneFrame)" />

        {/* Frame edge highlight */}
        <rect x="2" y="2" width="126" height="216" rx="22" ry="22"
          fill="none"
          stroke="url(#frameEdge)"
          strokeWidth="1.5"
        />

        {/* Screen bezel */}
        <rect x="5" y="5" width="120" height="210" rx="20" ry="20" fill="#0A0A0F" />

        {/* Screen surface */}
        <rect x="7" y="7" width="116" height="206" rx="18" ry="18" fill="url(#wallpaper)" />

        {/* Wallpaper - subtle star/bokeh effect */}
        <circle cx="30" cy="50" r="1.5" fill="rgba(255,255,255,0.4)" />
        <circle cx="95" cy="35" r="1" fill="rgba(255,255,255,0.3)" />
        <circle cx="55" cy="170" r="1.2" fill="rgba(255,255,255,0.25)" />
        <circle cx="110" cy="140" r="0.8" fill="rgba(255,255,255,0.2)" />
        <circle cx="20" cy="160" r="1" fill="rgba(255,255,255,0.2)" />
        <circle cx="80" cy="190" r="0.8" fill="rgba(255,255,255,0.15)" />

        {/* Subtle wallpaper glow */}
        <ellipse cx="65" cy="110" rx="50" ry="70" fill="rgba(40,60,120,0.15)" />

        {/* Dynamic Island / punch-hole camera */}
        <rect x="44" y="12" width="42" height="14" rx="7" fill="#050508" />
        {/* Camera dot inside dynamic island */}
        <circle cx="78" cy="19" r="4" fill="#0A0A10" />
        <circle cx="78" cy="19" r="2.5" fill="#050508" />
        <circle cx="77" cy="18" r="0.8" fill="rgba(255,255,255,0.08)" />

        {/* Time display - random time, no date */}
        <text
          x="65"
          y="95"
          textAnchor="middle"
          fill="rgba(255,255,255,0.95)"
          fontSize="36"
          fontWeight="300"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-1"
        >
          {`10${colonVisible ? ':' : ' '}27`}
        </text>

        {/* Notification card - Messages */}
        <rect x="14" y="110" width="102" height="30" rx="10" fill="rgba(255,255,255,0.08)" />
        <rect x="14" y="110" width="102" height="30" rx="10" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <circle cx="28" cy="125" r="8" fill="rgba(100,180,100,0.7)" />
        <text x="28" y="129" textAnchor="middle" fill="white" fontSize="9">✉</text>
        <text x="44" y="122" fill="rgba(255,255,255,0.8)" fontSize="8" fontFamily="system-ui" fontWeight="600">Messages</text>
        <text x="44" y="134" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="system-ui">2 new messages</text>

        {/* Search bar notification */}
        <rect x="14" y="145" width="102" height="34" rx="10" fill="rgba(255,255,255,0.07)" />
        <rect x="14" y="145" width="102" height="34" rx="10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        {/* Search icon */}
        <circle cx="26" cy="159" r="5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
        <line x1="30" y1="163" x2="33" y2="166" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
        {/* Search text — two lines */}
        <text x="38" y="157" fill="rgba(255,255,255,0.85)" fontSize="6.5" fontFamily="system-ui" fontWeight="700">Perbandingan Kraf</text>
        <text x="38" y="168" fill="rgba(255,255,255,0.85)" fontSize="6.5" fontFamily="system-ui" fontWeight="700">dan Arca</text>

        {/* Home indicator bar */}
        <rect x="44" y="206" width="42" height="4" rx="2" fill="rgba(255,255,255,0.35)" />

        {/* Glass screen reflection - diagonal glare */}
        <path
          d="M10 10 L50 10 L10 60 Z"
          fill="url(#screenReflection)"
          opacity="0.6"
        />
        <path
          d="M15 10 L35 10 L10 40 L10 25 Z"
          fill="rgba(255,255,255,0.06)"
        />

        {/* Side buttons - volume up */}
        <rect x="0" y="58" width="3.5" height="26" rx="1.75" fill="url(#sideBtn)" />
        <rect x="0.5" y="59" width="2" height="24" rx="1" fill="rgba(255,255,255,0.08)" />

        {/* Side buttons - volume down */}
        <rect x="0" y="90" width="3.5" height="26" rx="1.75" fill="url(#sideBtn)" />
        <rect x="0.5" y="91" width="2" height="24" rx="1" fill="rgba(255,255,255,0.08)" />

        {/* Side button - power/lock */}
        <rect x="126.5" y="68" width="3.5" height="36" rx="1.75" fill="url(#sideBtn)" />
        <rect x="127" y="69" width="2" height="34" rx="1" fill="rgba(255,255,255,0.1)" />

        {/* Frame corner highlights - subtle metallic sheen */}
        <path d="M2 22 Q2 2 22 2" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <path d="M108 2 Q128 2 128 22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      </svg>
    </div>
  );
}