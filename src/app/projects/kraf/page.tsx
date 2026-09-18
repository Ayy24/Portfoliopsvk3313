'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DEFINITION_TEXT =
  'Kraf merupakan hasil karya seni yang dihasilkan melalui kemahiran tangan, kreativiti dan ketelitian pengkarya dengan menggunakan bahan serta teknik tertentu. Penghasilan kraf bukan sahaja menekankan aspek keindahan dan nilai estetik, malah mencerminkan identiti, warisan, budaya serta nilai kehidupan sesuatu masyarakat.';

export default function KrafPage() {
  const router = useRouter();
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Start typing immediately on mount (no interaction needed)
    const startDelay = setTimeout(() => {
      const type = () => {
        if (indexRef.current < DEFINITION_TEXT.length) {
          indexRef.current += 1;
          setDisplayedText(DEFINITION_TEXT.slice(0, indexRef.current));
          timerRef.current = setTimeout(type, 16);
        } else {
          setTypingDone(true);
        }
      };
      type();
    }, 400);

    return () => {
      clearTimeout(startDelay);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleNavClick = () => {
    setBtnPressed(true);
    setTimeout(() => {
      router.push('/projects/kraf/buku');
    }, 320);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden wood-bg select-none">
      {/* Wood grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              178deg,
              rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px,
              transparent 1px, transparent 48px
            ),
            repeating-linear-gradient(
              182deg,
              rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px,
              transparent 1px, transparent 32px
            )
          `,
        }}
      />

      {/* Ambient light */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,240,200,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.28) 70%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Side shadows */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.15) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.12) 100%)',
        }}
      />

      {/* Back button */}
      <Link
        href="/projects"
        className="absolute top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
        style={{
          background: 'var(--sticker-white)',
          boxShadow: '2px 4px 12px rgba(0,0,0,0.25)',
          color: '#3D2B1F',
          fontWeight: 700,
          fontSize: '0.85rem',
          textDecoration: 'none',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </Link>

      {/* ── LAPTOP ILLUSTRATION ── */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center entrance-fade"
        style={{ animationDelay: '0.2s' }}
      >
        <div style={{ width: 'min(680px, 92vw)', position: 'relative' }}>

          {/* ── DECORATIONS ── */}

          {/* Sticky note — top left, tilted */}
          <div
            style={{
              position: 'absolute',
              top: '-18px',
              left: '-72px',
              width: 80,
              height: 80,
              background: 'linear-gradient(160deg, #FFE066 0%, #FFD43B 100%)',
              borderRadius: '3px',
              transform: 'rotate(-12deg)',
              boxShadow: '2px 4px 10px rgba(0,0,0,0.28)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              padding: '10px 8px 8px',
              zIndex: 15,
            }}
          >
            {/* Sticky note lines */}
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width: '80%', height: 2, borderRadius: 1, background: 'rgba(0,0,0,0.12)' }} />
            ))}
            <div style={{ fontSize: '1.1rem', marginTop: 2 }}>✏️</div>
          </div>

          {/* Sticky note — top right, tilted other way */}
          <div
            style={{
              position: 'absolute',
              top: '-24px',
              right: '-68px',
              width: 76,
              height: 76,
              background: 'linear-gradient(160deg, #A8E6CF 0%, #7FCDAA 100%)',
              borderRadius: '3px',
              transform: 'rotate(10deg)',
              boxShadow: '2px 4px 10px rgba(0,0,0,0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              padding: '10px 8px 8px',
              zIndex: 15,
            }}
          >
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width: '80%', height: 2, borderRadius: 1, background: 'rgba(0,0,0,0.12)' }} />
            ))}
            <div style={{ fontSize: '1.1rem', marginTop: 2 }}>🎨</div>
          </div>

          {/* Pencil — left side, diagonal */}
          <div
            style={{
              position: 'absolute',
              top: '18%',
              left: '-56px',
              width: 12,
              height: 110,
              transform: 'rotate(20deg)',
              zIndex: 15,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Eraser */}
            <div style={{ width: 12, height: 14, background: '#F4A0A0', borderRadius: '3px 3px 0 0', border: '1px solid rgba(0,0,0,0.1)' }} />
            {/* Metal band */}
            <div style={{ width: 12, height: 6, background: '#C0A060' }} />
            {/* Body */}
            <div style={{ width: 12, flex: 1, background: 'linear-gradient(90deg, #F5C842 0%, #E8B820 50%, #F5C842 100%)', border: '1px solid rgba(0,0,0,0.08)' }} />
            {/* Tip */}
            <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '14px solid #D4A020' }} />
            <div style={{ width: 0, height: 0, borderLeft: '3px solid transparent', borderRight: '3px solid transparent', borderTop: '6px solid #2A1A0A' }} />
          </div>

          {/* Paintbrush — right side */}
          <div
            style={{
              position: 'absolute',
              top: '22%',
              right: '-52px',
              width: 10,
              height: 120,
              transform: 'rotate(-18deg)',
              zIndex: 15,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Handle */}
            <div style={{ width: 10, flex: 1, background: 'linear-gradient(90deg, #8B5E3C 0%, #A0703A 50%, #8B5E3C 100%)', borderRadius: '4px 4px 0 0', border: '1px solid rgba(0,0,0,0.1)' }} />
            {/* Ferrule */}
            <div style={{ width: 10, height: 10, background: '#B8A060' }} />
            {/* Bristles */}
            <div style={{ width: 8, height: 22, background: 'linear-gradient(180deg, #C07040 0%, #8B4513 100%)', borderRadius: '0 0 4px 4px' }} />
          </div>

          {/* Paper clip — bottom left corner of screen */}
          <div
            style={{
              position: 'absolute',
              bottom: '28%',
              left: '-38px',
              zIndex: 15,
              transform: 'rotate(-8deg)',
            }}
          >
            <svg width="28" height="48" viewBox="0 0 28 48" fill="none">
              <path d="M14 4 C6 4 4 10 4 16 L4 36 C4 44 10 46 14 46 C18 46 24 44 24 36 L24 18 C24 12 20 10 16 10 C12 10 10 14 10 18 L10 34 C10 38 12 40 14 40 C16 40 18 38 18 34 L18 20" stroke="#C0A060" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>

          {/* Coffee ring stain — bottom right area */}
          <div
            style={{
              position: 'absolute',
              bottom: '20%',
              right: '-60px',
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: '4px solid rgba(139, 90, 43, 0.35)',
              boxShadow: '0 0 0 2px rgba(139, 90, 43, 0.12)',
              zIndex: 14,
              transform: 'rotate(5deg)',
            }}
          >
            {/* Inner ring */}
            <div style={{
              position: 'absolute',
              inset: 6,
              borderRadius: '50%',
              border: '2px solid rgba(139, 90, 43, 0.15)',
            }} />
          </div>

          {/* Small craft scissors — bottom right */}
          <div
            style={{
              position: 'absolute',
              bottom: '-10px',
              right: '-58px',
              zIndex: 15,
              transform: 'rotate(30deg)',
              fontSize: '1.8rem',
              filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.3))',
            }}
          >
            ✂️
          </div>

          {/* Small star doodles */}
          <div style={{ position: 'absolute', top: '-30px', left: '20%', zIndex: 15, fontSize: '1rem', opacity: 0.7, transform: 'rotate(-5deg)', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>⭐</div>
          <div style={{ position: 'absolute', top: '-28px', right: '22%', zIndex: 15, fontSize: '0.8rem', opacity: 0.6, transform: 'rotate(8deg)', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>✨</div>

          {/* Washi tape strip — top of laptop lid */}
          <div
            style={{
              position: 'absolute',
              top: '-6px',
              left: '30%',
              right: '30%',
              height: 14,
              background: 'repeating-linear-gradient(90deg, rgba(192,144,96,0.55) 0px, rgba(192,144,96,0.55) 10px, rgba(160,112,64,0.45) 10px, rgba(160,112,64,0.45) 20px)',
              borderRadius: 3,
              zIndex: 25,
              transform: 'rotate(-0.5deg)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            }}
          />

          {/* Laptop outer shell */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '68%',
            }}
          >
            {/* Screen lid */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '2%',
                right: '2%',
                height: '76%',
                borderRadius: '14px 14px 4px 4px',
                background: 'linear-gradient(160deg, #2A2A2A 0%, #1A1A1A 40%, #222222 100%)',
                boxShadow: '0 -2px 0 rgba(255,255,255,0.08) inset, 0 24px 60px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)',
                overflow: 'hidden',
              }}
            >
              {/* Screen bezel */}
              <div
                style={{
                  position: 'absolute',
                  inset: '6px',
                  borderRadius: '10px',
                  background: '#0D0D0D',
                  overflow: 'hidden',
                }}
              >
                {/* Screen glow */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(160deg, rgba(240,230,210,0.97) 0%, rgba(248,242,228,0.99) 100%)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                >
                  {/* Screen paper texture */}
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '8px',
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(0,0,0,0.025) 22px, rgba(0,0,0,0.025) 23px)',
                  }} />

                  {/* Screen content */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      padding: 'clamp(14px, 3%, 28px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Heading: KRAF centered top */}
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(8px, 2%, 16px)' }}>
                      <h1
                        style={{
                          fontFamily: 'Georgia, serif',
                          fontWeight: 900,
                          fontSize: 'clamp(1.4rem, 4vw, 2.4rem)',
                          color: '#2A1A0A',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          lineHeight: 1.1,
                        }}
                      >
                        Kraf
                      </h1>
                      {/* Underline accent */}
                      <div style={{
                        width: 48, height: 3, borderRadius: 2,
                        background: 'linear-gradient(90deg, #C09060, #A07040)',
                        margin: '6px auto 0',
                      }} />
                    </div>

                    {/* Divider */}
                    <div style={{ height: 1, background: 'rgba(0,0,0,0.1)', marginBottom: 'clamp(8px, 2%, 14px)' }} />

                    {/* Definisi Kraf subheading */}
                    <h2
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontWeight: 800,
                        fontSize: 'clamp(0.85rem, 2.2vw, 1.15rem)',
                        color: '#3D2B1F',
                        letterSpacing: '0.04em',
                        marginBottom: 'clamp(6px, 1.5%, 12px)',
                        textAlign: 'left',
                      }}
                    >
                      Definisi Kraf
                    </h2>

                    {/* Typing text area */}
                    <div
                      style={{
                        flex: 1,
                        fontFamily: '"Courier New", Courier, monospace',
                        fontSize: 'clamp(0.75rem, 1.85vw, 1rem)',
                        fontWeight: 700,
                        color: '#3A2A14',
                        lineHeight: 1.75,
                        textAlign: 'left',
                        position: 'relative',
                        minHeight: 80,
                      }}
                    >
                      {displayedText}
                      {/* Blinking cursor */}
                      {!typingDone && (
                        <span
                          style={{
                            display: 'inline-block',
                            width: '2px',
                            height: '1em',
                            background: '#3A2A14',
                            marginLeft: '1px',
                            verticalAlign: 'text-bottom',
                            animation: 'blink 0.7s step-end infinite',
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Screen glare */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: '60%',
                      height: '35%',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 100%)',
                      borderRadius: '8px 0 0 0',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Webcam dot */}
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#333',
                  border: '1px solid #444',
                }}
              />
            </div>

            {/* Laptop base / keyboard */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '26%',
                borderRadius: '4px 4px 12px 12px',
                background: 'linear-gradient(180deg, #2E2E2E 0%, #252525 40%, #1E1E1E 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 2px 0 rgba(255,255,255,0.06) inset',
              }}
            >
              {/* Keyboard rows */}
              <div style={{ padding: '8px 12px 4px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[14, 13, 12].map((count, row) => (
                  <div key={row} style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    {Array.from({ length: count }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: 5,
                          borderRadius: 1.5,
                          background: 'rgba(255,255,255,0.08)',
                          border: '0.5px solid rgba(255,255,255,0.04)',
                          maxWidth: 22,
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Trackpad */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 6,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '28%',
                  height: 18,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.06)',
                  border: '0.5px solid rgba(255,255,255,0.08)',
                }}
              />
            </div>

            {/* Laptop shadow on desk */}
            <div
              style={{
                position: 'absolute',
                bottom: -12,
                left: '5%',
                right: '5%',
                height: 20,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.35)',
                filter: 'blur(12px)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── FIXED NAVIGATION BUTTON ── */}
      <button
        onClick={handleNavClick}
        aria-label="Navigate to next page"
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 50,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #C09060 0%, #A07040 100%)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.2) inset',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s ease',
          transform: btnPressed ? 'scale(0.88)' : undefined,
        }}
        onMouseEnter={(e) => {
          if (!btnPressed) {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.15)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.4), 0 0 20px rgba(192,144,96,0.45), 0 1px 0 rgba(255,255,255,0.2) inset';
          }
        }}
        onMouseLeave={(e) => {
          if (!btnPressed) {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.2) inset';
          }
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M5 11H17M17 11L11 5M17 11L11 17" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Blink keyframe */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
