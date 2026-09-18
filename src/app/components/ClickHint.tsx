'use client';

import React from 'react';

interface Props {
  label: string;
  position?: 'left' | 'right' | 'center';
}

export default function ClickHint({ label, position = 'center' }: Props) {
  const alignStyle: React.CSSProperties =
    position === 'left'
      ? { right: 0, transform: 'translateX(0)' }
      : position === 'right'
      ? { left: 0 }
      : { left: '50%', transform: 'translateX(-50%)' };

  return (
    <div
      className="absolute -bottom-8 pointer-events-none z-40"
      style={alignStyle}
    >
      <div
        style={{
          background: 'rgba(30,20,10,0.85)',
          color: '#FAF8F3',
          fontSize: 11,
          fontWeight: 600,
          padding: '4px 10px',
          borderRadius: 20,
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          letterSpacing: '0.03em',
        }}
      >
        ✦ {label}
      </div>
    </div>
  );
}