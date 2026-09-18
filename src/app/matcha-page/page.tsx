'use client';

import React from 'react';
import Link from 'next/link';

export default function MatchaPage() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2D5016 0%, #4A7C28 30%, #6BA840 60%, #8DC858 100%)',
      }}
    >
      {/* Back button */}
      <Link
        href="/desk"
        className="absolute top-5 left-5 z-20 flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105"
        style={{
          background: 'rgba(255,255,255,0.2)',
          color: '#fff',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
        }}
      >
        ← Kembali
      </Link>

      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.3)' }} />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.2)' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-5" style={{ background: 'rgba(255,255,255,0.4)', transform: 'translate(-50%, -50%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-lg">
        {/* Matcha cup icon */}
        <div className="text-8xl" style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))' }}>
          🍵
        </div>

        <div>
          <h1
            className="font-display font-bold mb-3"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              color: '#fff',
              textShadow: '0 2px 12px rgba(0,0,0,0.3)',
              letterSpacing: '0.02em',
            }}
          >
            Matcha Break
          </h1>
          <p
            className="font-sans"
            style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.7,
            }}
          >
            Rehat sebentar sambil menikmati matcha. Kreativiti tumbuh subur apabila minda tenang.
          </p>
        </div>

        <div
          className="px-6 py-4 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          <p
            className="font-sans italic"
            style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', lineHeight: 1.6 }}
          >
            &ldquo;Seni bukan sekadar hasil — ia adalah proses, perasaan, dan perjalanan.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
