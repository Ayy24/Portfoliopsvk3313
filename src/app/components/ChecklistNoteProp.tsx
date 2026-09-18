'use client';

import React from 'react';

interface Props {
  isHovered: boolean;
}

export default function ChecklistNoteProp({ isHovered }: Props) {
  const items = [
    'Kreativiti',
    'Pemikiran Kritis',
    'Motor Halus',
    'Hands-on',
    'Estetika',
  ];

  return (
    <div
      style={{
        width: 170,
        height: 200,
        filter: isHovered
          ? 'drop-shadow(0 16px 32px rgba(0,0,0,0.45)) drop-shadow(0 0 16px rgba(255,220,80,0.25))'
          : 'drop-shadow(0 6px 18px rgba(0,0,0,0.38)) drop-shadow(0 2px 5px rgba(0,0,0,0.2))',
        transform: isHovered ? 'translateY(-8px) scale(1.05) rotate(-2deg)' : 'rotate(3deg)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* Paper background */}
      <div
        style={{
          width: 170,
          height: 200,
          borderRadius: 4,
          background: 'linear-gradient(160deg, #FFF9C4 0%, #FFF176 40%, #FFEE58 100%)',
          boxShadow: '2px 3px 8px rgba(0,0,0,0.18)',
          padding: '10px 12px 10px 12px',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top adhesive strip */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 20,
            background: 'rgba(240,180,0,0.22)',
            borderRadius: '4px 4px 0 0',
          }}
        />

        {/* Ruled lines */}
        {[52, 72, 92, 112, 132, 152, 172].map((y) => (
          <div
            key={y}
            style={{
              position: 'absolute',
              left: 12,
              right: 12,
              top: y,
              height: 1,
              background: 'rgba(180,140,0,0.1)',
            }}
          />
        ))}

        {/* Title */}
        <div
          style={{
            fontFamily: "'Caveat', 'Patrick Hand', cursive",
            fontWeight: 800,
            fontSize: 15,
            color: '#4A3000',
            textAlign: 'center',
            marginTop: 14,
            marginBottom: 8,
            letterSpacing: 0.5,
          }}
        >
          Kepentingan
        </div>

        {/* Underline squiggle */}
        <svg width="146" height="8" viewBox="0 0 146 8" style={{ display: 'block', margin: '0 auto 6px' }}>
          <path d="M2 4 Q20 8 36 4 Q52 0 68 4 Q84 8 100 4 Q116 0 132 4 Q140 6 144 4" fill="none" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>

        {/* Checklist items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {/* Checkbox */}
              <div
                style={{
                  width: 13,
                  height: 13,
                  border: '2px solid #8B6914',
                  borderRadius: 2,
                  background: i < 3 ? 'rgba(139,105,20,0.15)' : 'transparent',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {i < 3 && (
                  <svg width="8" height="7" viewBox="0 0 8 7">
                    <path d="M1 3.5 L3 5.5 L7 1" stroke="#5C3A00" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              {/* Label */}
              <span
                style={{
                  fontFamily: "'Caveat', 'Patrick Hand', cursive",
                  fontSize: 12,
                  color: '#4A3000',
                  fontWeight: 600,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom-right curl shadow */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 24,
            height: 24,
            background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 100%)',
            borderRadius: '0 0 4px 0',
          }}
        />
      </div>
    </div>
  );
}
