'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FULL_TEXT = `Unsur seni dan prinsip rekaan merupakan asas penting dalam penghasilan karya seni visual. Unsur seni merujuk kepada komponen asas yang membentuk sesuatu karya, manakala prinsip rekaan merujuk kepada kaedah menyusun dan mengorganisasikan unsur tersebut supaya menghasilkan komposisi yang seimbang, harmoni dan mempunyai nilai estetika. Dalam bidang Membentuk dan Membuat Binaan, penerapan unsur dan prinsip ini dapat dilihat melalui pembentukan struktur, susunan bahan, penggunaan ruang, jalinan, warna serta hubungan antara bahagian karya.`;

export default function PengenalanUpPage() {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTyping(true);
    }, 600);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isTyping) return;
    let i = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      i++;
      setDisplayedText(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [isTyping]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* Background image — same wooden desk, blurred */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/IMG_2667-1789661380498.jpeg"
          alt="Meja kayu sebagai latar belakang"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'blur(6px)',
            transform: 'scale(1.05)',
          }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(30,18,8,0.62)' }}
        />
      </div>

      {/* Page title — top center */}
      <div className="relative z-10 flex justify-center pt-10 pb-4">
        <div
          style={{
            background: 'rgba(20,12,4,0.72)',
            backdropFilter: 'blur(10px)',
            borderRadius: '14px',
            padding: '12px 40px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(210,170,100,0.2) inset',
            border: '1.5px solid rgba(210,170,100,0.35)',
          }}
        >
          <h1
            style={{
              fontFamily: '"Georgia", serif',
              fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)',
              fontWeight: 800,
              color: '#F5E6C8',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: 0,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            1.0 PENGENALAN
          </h1>
        </div>
      </div>

      {/* Main content — centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-8">
        <div
          style={{
            maxWidth: '820px',
            width: '100%',
            background: 'rgba(20,12,4,0.70)',
            backdropFilter: 'blur(14px)',
            borderRadius: '20px',
            padding: 'clamp(28px, 5vw, 52px) clamp(24px, 5vw, 52px)',
            border: '1.5px solid rgba(210,170,100,0.35)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
          }}
        >
          {/* Section number + title */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            {/* Number badge */}
            <div
              style={{
                flexShrink: 0,
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                border: '2px solid rgba(210,170,100,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Georgia", serif',
                fontSize: '15px',
                fontWeight: 700,
                color: '#F5E6C8',
                backdropFilter: 'blur(6px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              1.3
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: '"Georgia", serif',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                fontWeight: 800,
                color: '#F5E6C8',
                letterSpacing: '0.03em',
                lineHeight: 1.35,
                margin: 0,
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                paddingTop: '8px',
              }}
            >
              Unsur Seni dan Prinsip Rekaan
            </h2>
          </div>

          {/* Decorative divider */}
          <div
            style={{
              width: '60px',
              height: '2px',
              background: 'rgba(210,170,100,0.85)',
              borderRadius: '2px',
              marginBottom: '24px',
            }}
          />

          {/* Description — bold, larger, typing animation */}
          <p
            style={{
              fontFamily: '"Segoe UI", sans-serif',
              fontSize: 'clamp(1.05rem, 1.8vw, 1.28rem)',
              fontWeight: 700,
              color: 'rgba(245,230,200,0.97)',
              lineHeight: 1.9,
              margin: 0,
              minHeight: '8em',
            }}
          >
            {displayedText}
            {isTyping && (
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1.1em',
                  background: 'rgba(210,170,100,0.9)',
                  marginLeft: '2px',
                  verticalAlign: 'text-bottom',
                  animation: 'blink 0.75s step-end infinite',
                }}
              />
            )}
          </p>
        </div>
      </div>

      {/* Blinking cursor keyframe */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Navigation buttons — bottom */}
      <div className="relative z-10 flex justify-between items-center px-8 pb-8 pt-2">
        <Link href="/pengenalan">
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(20,12,4,0.72)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(210,170,100,0.4)',
              borderRadius: '50px',
              padding: '12px 28px',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 700,
              fontSize: '15px',
              color: '#F5E6C8',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(20,12,4,0.9)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(20,12,4,0.72)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Kembali
          </button>
        </Link>

        <Link href="/pengenalan-unsur">
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(210,170,100,0.85)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(210,170,100,0.6)',
              borderRadius: '50px',
              padding: '12px 28px',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 700,
              fontSize: '15px',
              color: '#1A0E04',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(210,170,100,1)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(210,170,100,0.85)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            Seterusnya
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
