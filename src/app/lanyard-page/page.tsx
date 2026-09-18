'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LanyardPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background image */}
      <Image
        src="/assets/images/IMG_2681-1789719534313.jpeg"
        alt="Open book background"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
      />

      {/* Overlay for readability */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.25)' }}
      />

      {/* Kembali button */}
      <Link
        href="/desk"
        className="absolute z-20"
        style={{ top: 20, left: 20 }}
      >
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.92)',
            border: 'none',
            borderRadius: 24,
            padding: '10px 20px',
            fontFamily: '"Segoe UI", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 15,
            color: '#3D2B1F',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            transition: 'all 0.2s ease',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9L11 14" stroke="#3D2B1F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali
        </button>
      </Link>
    </div>
  );
}
