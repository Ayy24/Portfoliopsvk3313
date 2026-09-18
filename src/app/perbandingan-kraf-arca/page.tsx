'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

const TOTAL_SCREENS = 5;

/* ─── Paper texture SVG filter ─── */
const PaperFilter = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
        <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend" />
        <feComposite in="blend" in2="SourceGraphic" operator="in" />
      </filter>
    </defs>
  </svg>
);

/* ─── Background — real photo ─── */
const PaperBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    {/* Photo background */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'url("/assets/images/IMG_2679-1789703595780.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }} />
    {/* Warm overlay to keep text readable */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(255, 245, 230, 0.45)',
    }} />
    {/* Vignette */}
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(100,65,30,0.22) 80%, rgba(80,45,15,0.38) 100%)' }} />
  </div>
);

/* ─── Tape strip ─── */
const Tape = ({ style }: { style?: React.CSSProperties }) => (
  <div style={{
    width: 60, height: 18, borderRadius: 3,
    background: 'repeating-linear-gradient(90deg, rgba(255,210,60,0.7), rgba(255,230,100,0.7) 8px, rgba(255,200,50,0.65) 16px)',
    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
    ...style,
  }} />
);

/* ─── Paper card ─── */
const PaperCard = ({ children, style, className = '', delay = 0 }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
}) => (
  <div
    className={`paper-card ${className}`}
    style={{
      background: 'linear-gradient(145deg, #fffdf5 0%, #fdf4e0 60%, #f9ecce 100%)',
      borderRadius: 10,
      boxShadow: '0 4px 18px rgba(100,70,40,0.2), 0 1px 4px rgba(100,70,40,0.12), inset 0 1px 0 rgba(255,255,255,0.85)',
      position: 'relative',
      animationDelay: `${delay}ms`,
      ...style,
    }}
  >
    {children}
  </div>
);

/* ─── Section label ─── */
const SectionLabel = ({ label }: { label: string }) => (
  <div style={{
    display: 'inline-block',
    background: 'rgba(200,80,60,0.12)',
    border: '1px solid rgba(200,80,60,0.25)',
    borderRadius: 4,
    padding: '2px 10px',
    fontSize: '0.68rem',
    fontWeight: 800,
    letterSpacing: '0.12em',
    color: '#b84a2e',
    textTransform: 'uppercase',
    marginBottom: 6,
  }}>
    {label}
  </div>
);

/* ─── Comparison row ─── */
const CompRow = ({ category, kraf, arca, delay = 0, icon }: {
  category: string;
  kraf: string;
  arca: string;
  delay?: number;
  icon?: React.ReactNode;
}) => (
  <div className="comp-row-enter" style={{ animationDelay: `${delay}ms` }}>
    <PaperCard style={{ padding: '14px 16px', marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
        {/* Category label */}
        <div style={{
          minWidth: 90, maxWidth: 90,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
          paddingTop: 2,
        }}>
          <div style={{
            fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.1em',
            color: '#5a6e2a', textTransform: 'uppercase', textAlign: 'center',
            background: 'rgba(90,110,42,0.12)', borderRadius: 4,
            padding: '3px 8px', marginBottom: 4,
            border: '1px solid rgba(90,110,42,0.2)',
          }}>
            {category}
          </div>
          {icon && <div style={{ opacity: 0.4, marginTop: 4 }}>{icon}</div>}
        </div>
        {/* Divider */}
        <div style={{ width: 1, background: 'rgba(200,80,60,0.2)', alignSelf: 'stretch', margin: '0 12px', flexShrink: 0 }} />
        {/* Kraf */}
        <div style={{ flex: 1, paddingRight: 10 }}>
          <SectionLabel label="Kraf" />
          <p style={{ fontSize: '0.74rem', fontWeight: 600, color: '#3a2510', lineHeight: 1.6, margin: 0 }}>{kraf}</p>
        </div>
        {/* Divider */}
        <div style={{ width: 1, background: 'rgba(200,80,60,0.2)', alignSelf: 'stretch', margin: '0 12px', flexShrink: 0 }} />
        {/* Arca */}
        <div style={{ flex: 1 }}>
          <SectionLabel label="Arca" />
          <p style={{ fontSize: '0.74rem', fontWeight: 600, color: '#3a2510', lineHeight: 1.6, margin: 0 }}>{arca}</p>
        </div>
      </div>
    </PaperCard>
  </div>
);

/* ─── Navigation bar ─── */
const NavBar = ({
  current, total, onPrev, onNext, prevLabel, nextLabel,
}: {
  current: number; total: number;
  onPrev?: () => void; onNext?: () => void;
  prevLabel?: string; nextLabel?: string;
}) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 0 0', marginTop: 'auto',
  }}>
    <button
      onClick={onPrev}
      disabled={!onPrev}
      style={{
        background: onPrev ? 'rgba(200,80,60,0.12)' : 'transparent',
        border: '1.5px solid rgba(200,80,60,0.25)',
        borderRadius: 8, padding: '6px 14px',
        fontSize: '0.74rem', fontWeight: 800, color: onPrev ? '#b84a2e' : 'rgba(180,60,40,0.3)',
        cursor: onPrev ? 'pointer' : 'default',
        transition: 'all 0.2s',
        fontFamily: 'inherit',
      }}
    >
      ← {prevLabel || 'Sebelumnya'}
    </button>
    <div style={{
      fontSize: '0.72rem', fontWeight: 800, color: 'rgba(90,110,42,0.8)',
      letterSpacing: '0.1em',
      background: 'rgba(90,110,42,0.1)', borderRadius: 20,
      padding: '4px 14px',
      border: '1px solid rgba(90,110,42,0.2)',
    }}>
      {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </div>
    <button
      onClick={onNext}
      disabled={!onNext}
      style={{
        background: onNext ? 'rgba(200,80,60,0.12)' : 'transparent',
        border: '1.5px solid rgba(200,80,60,0.25)',
        borderRadius: 8, padding: '6px 14px',
        fontSize: '0.74rem', fontWeight: 800, color: onNext ? '#b84a2e' : 'rgba(180,60,40,0.3)',
        cursor: onNext ? 'pointer' : 'default',
        transition: 'all 0.2s',
        fontFamily: 'inherit',
      }}
    >
      {nextLabel || 'Seterusnya'} →
    </button>
  </div>
);

/* ─── Tiny SVG icons ─── */
const WoodIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="3" y="8" width="16" height="10" rx="2" stroke="#5a6e2a" strokeWidth="1.2" fill="none" />
    <line x1="3" y1="11" x2="19" y2="11" stroke="#5a6e2a" strokeWidth="0.8" />
    <line x1="3" y1="14" x2="19" y2="14" stroke="#5a6e2a" strokeWidth="0.8" />
    <rect x="7" y="4" width="8" height="5" rx="1" stroke="#5a6e2a" strokeWidth="1" fill="none" />
  </svg>
);
const ClayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <ellipse cx="11" cy="14" rx="8" ry="5" stroke="#5a6e2a" strokeWidth="1.2" fill="none" />
    <path d="M5 14 Q11 6 17 14" stroke="#5a6e2a" strokeWidth="1" fill="none" />
  </svg>
);
const TextileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M4 6 Q7 10 11 6 Q15 2 18 6" stroke="#5a6e2a" strokeWidth="1.2" fill="none" />
    <path d="M4 11 Q7 15 11 11 Q15 7 18 11" stroke="#5a6e2a" strokeWidth="1.2" fill="none" />
    <path d="M4 16 Q7 20 11 16 Q15 12 18 16" stroke="#5a6e2a" strokeWidth="1.2" fill="none" />
  </svg>
);
const ChiselIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="9" y="3" width="4" height="12" rx="1" stroke="#5a6e2a" strokeWidth="1.2" fill="none" />
    <path d="M7 15 L11 19 L15 15" stroke="#5a6e2a" strokeWidth="1.2" fill="none" />
  </svg>
);
const SculptIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 4 Q16 8 16 13 Q16 18 11 18 Q6 18 6 13 Q6 8 11 4Z" stroke="#5a6e2a" strokeWidth="1.2" fill="none" />
    <path d="M8 10 Q11 7 14 10" stroke="#5a6e2a" strokeWidth="0.8" fill="none" />
  </svg>
);

/* ─── Chip tag ─── */
const Chip = ({ label }: { label: string }) => {
  const [lifted, setLifted] = useState(false);
  return (
    <button
      onMouseEnter={() => setLifted(true)}
      onMouseLeave={() => setLifted(false)}
      onClick={() => setLifted(l => !l)}
      style={{
        display: 'inline-block',
        background: lifted ? 'rgba(200,80,60,0.2)' : 'rgba(200,80,60,0.1)',
        border: '1.5px solid rgba(200,80,60,0.3)',
        borderRadius: 20,
        padding: '4px 12px',
        fontSize: '0.7rem',
        fontWeight: 700,
        color: '#8a2e1a',
        cursor: 'pointer',
        margin: '3px 4px 3px 0',
        transform: lifted ? 'translateY(-3px) scale(1.06)' : 'translateY(0) scale(1)',
        boxShadow: lifted ? '0 4px 12px rgba(200,80,60,0.25)' : '0 1px 3px rgba(100,70,40,0.1)',
        transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
        fontFamily: 'inherit',
      }}
    >
      {label}
    </button>
  );
};

/* ─── Floating note ─── */
const FloatingNote = ({ children, rotate = 0, delay = 0, style }: {
  children: React.ReactNode;
  rotate?: number;
  delay?: number;
  style?: React.CSSProperties;
}) => (
  <div
    className="float-note-enter"
    style={{
      background: 'linear-gradient(145deg, #fffdf5 0%, #fdf4e0 100%)',
      borderRadius: 8,
      padding: '14px 16px',
      boxShadow: '0 6px 20px rgba(100,70,40,0.18), 0 2px 6px rgba(100,70,40,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
      transform: `rotate(${rotate}deg)`,
      animationDelay: `${delay}ms`,
      ...style,
    }}
  >
    {children}
  </div>
);

/* ══════════════════════════════════════════
   SCREEN 1 — OVERVIEW
══════════════════════════════════════════ */

/* ─── Animated Eyes ─── */
const AnimatedEyes = () => {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ lx: 0, ly: 0, rx: 0, ry: 0 });
  const rafRef = useRef<number | null>(null);
  const [blinkState, setBlinkState] = useState<'open' | 'blink1' | 'open2' | 'blink2'>('open');

  // Track mouse across entire window
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth pupil tracking via rAF
  useEffect(() => {
    const SMOOTHING = 0.10; // 0=gooey, 1=instant
    const EYE_RADIUS = 22; // max pupil travel distance in px

    const getPupilOffset = (eyeEl: HTMLDivElement | null) => {
      if (!eyeEl) return { x: 0, y: 0 };
      const rect = eyeEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mousePos.current.x - cx;
      const dy = mousePos.current.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const clamp = Math.min(dist, EYE_RADIUS) / (dist || 1);
      return { x: dx * clamp, y: dy * clamp };
    };

    const animate = () => {
      const lTarget = getPupilOffset(leftEyeRef.current);
      const rTarget = getPupilOffset(rightEyeRef.current);

      currentPos.current.lx += (lTarget.x - currentPos.current.lx) * SMOOTHING;
      currentPos.current.ly += (lTarget.y - currentPos.current.ly) * SMOOTHING;
      currentPos.current.rx += (rTarget.x - currentPos.current.rx) * SMOOTHING;
      currentPos.current.ry += (rTarget.y - currentPos.current.ry) * SMOOTHING;

      if (leftPupilRef.current) {
        leftPupilRef.current.style.transform = `translate(calc(-50% + ${currentPos.current.lx}px), calc(-50% + ${currentPos.current.ly}px))`;
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.style.transform = `translate(calc(-50% + ${currentPos.current.rx}px), calc(-50% + ${currentPos.current.ry}px))`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // Double-blink cycle every 3.5 seconds
  useEffect(() => {
    const runBlink = () => {
      setBlinkState('blink1');
      setTimeout(() => setBlinkState('open2'), 120);
      setTimeout(() => setBlinkState('blink2'), 280);
      setTimeout(() => setBlinkState('open'), 400);
    };
    const interval = setInterval(runBlink, 3500);
    return () => clearInterval(interval);
  }, []);

  const isBlinking = blinkState === 'blink1' || blinkState === 'blink2';
  const eyeScaleY = isBlinking ? 0.08 : 1;

  const eyeStyle: React.CSSProperties = {
    width: 80,
    height: 80,
    borderRadius: '50%',
    background: 'linear-gradient(145deg, #fffdf5 0%, #fdf4e0 60%, #f9ecce 100%)',
    boxShadow: '0 6px 24px rgba(100,70,40,0.25), 0 2px 8px rgba(100,70,40,0.15), inset 0 2px 0 rgba(255,255,255,0.9)',
    border: '3px solid rgba(100,70,40,0.18)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: `scaleY(${eyeScaleY})`,
    transition: 'transform 0.07s ease-in-out',
    overflow: 'hidden',
  };

  const pupilStyle: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 35%, #5a3a1a, #1a0a00)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
  };

  const pupilShineStyle: React.CSSProperties = {
    width: 9,
    height: 9,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.85)',
    position: 'absolute',
    top: '18%',
    left: '22%',
  };

  return (
    <div style={{
      display: 'flex',
      gap: 28,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 8,
    }}>
      {/* Left eye */}
      <div ref={leftEyeRef} style={eyeStyle}>
        <div ref={leftPupilRef} style={pupilStyle}>
          <div style={pupilShineStyle} />
        </div>
      </div>
      {/* Right eye */}
      <div ref={rightEyeRef} style={eyeStyle}>
        <div ref={rightPupilRef} style={pupilStyle}>
          <div style={pupilShineStyle} />
        </div>
      </div>
    </div>
  );
};

const Screen1 = ({ onNext }: { onNext: () => void }) => {
  const [krafFlipped, setKrafFlipped] = useState(false);
  const [arcaFlipped, setArcaFlipped] = useState(false);

  return (
    <div className="screen-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
      {/* Intro cards — flip on tap */}
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: 600, paddingTop: 8 }}>
        {/* KRAF flip card */}
        <div style={{ flex: 1, perspective: 800 }}>
          <div
            onClick={() => setKrafFlipped(f => !f)}
            style={{
              position: 'relative',
              width: '100%',
              height: 180,
              transformStyle: 'preserve-3d',
              transform: krafFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.55s cubic-bezier(0.4,0.2,0.2,1)',
              cursor: 'pointer',
            }}
          >
            {/* Front */}
            <div style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              background: 'linear-gradient(145deg, #fffdf5 0%, #fdf4e0 60%, #f9ecce 100%)',
              borderRadius: 10,
              boxShadow: '0 4px 20px rgba(200,80,60,0.18), 0 2px 8px rgba(100,70,40,0.12)',
              border: '2px solid rgba(200,80,60,0.15)',
              transform: 'rotate(-2deg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Tape style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%) rotate(-1deg)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: 12 }}>
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ opacity: 0.7 }}>
                    <rect x="8" y="20" width="36" height="24" rx="4" stroke="#b84a2e" strokeWidth="1.8" fill="none" />
                    <path d="M16 20 Q16 10 26 10 Q36 10 36 20" stroke="#b84a2e" strokeWidth="1.8" fill="none" />
                    <path d="M14 28 Q20 24 26 28 Q32 32 38 28" stroke="#b84a2e" strokeWidth="1.2" fill="none" />
                    <path d="M14 34 Q20 30 26 34 Q32 38 38 34" stroke="#b84a2e" strokeWidth="1.2" fill="none" />
                  </svg>
                </div>
                <h2 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#3a1a08', letterSpacing: '0.12em', margin: 0 }}>KRAF</h2>
                <p style={{ fontSize: '0.68rem', fontWeight: 700, color: '#b84a2e', marginTop: 6 }}>Kemahiran Tangan</p>
              </div>
            </div>
            {/* Back */}
            <div style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              background: 'linear-gradient(145deg, #fff5f0 0%, #fde8e0 60%, #f9d8cc 100%)',
              borderRadius: 10,
              boxShadow: '0 4px 20px rgba(200,80,60,0.22), 0 2px 8px rgba(100,70,40,0.12)',
              border: '2px solid rgba(200,80,60,0.3)',
              transform: 'rotateY(180deg) rotate(-2deg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '20px 16px',
            }}>
              <Tape style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%) rotate(-1deg)' }} />
              <p style={{
                fontSize: '0.78rem', fontWeight: 700, color: '#7a2010',
                textAlign: 'center', lineHeight: 1.6, margin: 0,
              }}>
                Kraf ialah hasil karya yang dihasilkan melalui kemahiran tangan dengan teknik tertentu, lazimnya mempunyai fungsi praktikal atau hiasan.
              </p>
            </div>
          </div>
        </div>

        {/* VS divider */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <div style={{ width: 2, height: 40, background: 'rgba(200,80,60,0.3)', borderRadius: 1 }} />
          <span style={{
            fontSize: '0.72rem', fontWeight: 900, color: '#b84a2e',
            letterSpacing: '0.1em',
            background: 'rgba(200,80,60,0.1)',
            border: '1.5px solid rgba(200,80,60,0.25)',
            borderRadius: 6, padding: '2px 8px',
          }}>VS</span>
          <div style={{ width: 2, height: 40, background: 'rgba(200,80,60,0.3)', borderRadius: 1 }} />
        </div>

        {/* ARCA flip card */}
        <div style={{ flex: 1, perspective: 800 }}>
          <div
            onClick={() => setArcaFlipped(f => !f)}
            style={{
              position: 'relative',
              width: '100%',
              height: 180,
              transformStyle: 'preserve-3d',
              transform: arcaFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.55s cubic-bezier(0.4,0.2,0.2,1)',
              cursor: 'pointer',
            }}
          >
            {/* Front */}
            <div style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              background: 'linear-gradient(145deg, #fffdf5 0%, #fdf4e0 60%, #f9ecce 100%)',
              borderRadius: 10,
              boxShadow: '0 4px 20px rgba(90,110,42,0.18), 0 2px 8px rgba(100,70,40,0.12)',
              border: '2px solid rgba(90,110,42,0.2)',
              transform: 'rotate(1.5deg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Tape style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%) rotate(1deg)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: 12 }}>
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ opacity: 0.7 }}>
                    <path d="M26 8 Q34 14 36 24 Q38 34 30 40 Q22 46 16 40 Q10 34 14 24 Q18 14 26 8Z" stroke="#5a6e2a" strokeWidth="1.8" fill="none" />
                    <path d="M20 20 Q26 16 32 20" stroke="#5a6e2a" strokeWidth="1.2" fill="none" />
                    <path d="M18 28 Q26 24 34 28" stroke="#5a6e2a" strokeWidth="1.2" fill="none" />
                    <ellipse cx="26" cy="44" rx="8" ry="3" stroke="#5a6e2a" strokeWidth="1.2" fill="none" />
                  </svg>
                </div>
                <h2 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#1e3008', letterSpacing: '0.12em', margin: 0 }}>ARCA</h2>
                <p style={{ fontSize: '0.68rem', fontWeight: 700, color: '#5a6e2a', marginTop: 6 }}>Ekspresi & Estetika</p>
              </div>
            </div>
            {/* Back */}
            <div style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              background: 'linear-gradient(145deg, #f5fff0 0%, #e8fde0 60%, #d8f9cc 100%)',
              borderRadius: 10,
              boxShadow: '0 4px 20px rgba(90,110,42,0.22), 0 2px 8px rgba(100,70,40,0.12)',
              border: '2px solid rgba(90,110,42,0.3)',
              transform: 'rotateY(180deg) rotate(1.5deg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '20px 16px',
            }}>
              <Tape style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%) rotate(1deg)' }} />
              <p style={{
                fontSize: '0.78rem', fontWeight: 700, color: '#2a5010',
                textAlign: 'center', lineHeight: 1.6, margin: 0,
              }}>
                Arca ialah karya seni tiga dimensi yang dihasilkan untuk menzahirkan idea, ekspresi dan nilai estetika.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Eyes — centred between cards and nav buttons */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatedEyes />
      </div>

      {/* Nav — pushed further down with extra top padding */}
      <div style={{ width: '100%', paddingTop: 16, paddingBottom: 8 }}>
        <NavBar
          current={1} total={TOTAL_SCREENS}
          onNext={onNext}
          nextLabel="Seterusnya"
        />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   SCREEN 2 — ASPEK, FOKUS & FUNGSI
══════════════════════════════════════════ */
const Screen2 = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => (
  <div className="screen-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    {/* Column headers */}
    <div style={{ display: 'flex', gap: 0, marginBottom: 10 }}>
      <div style={{ minWidth: 90 }} />
      <div style={{ flex: 1, textAlign: 'center', paddingLeft: 12 }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 900, letterSpacing: '0.12em', color: '#b84a2e', textTransform: 'uppercase' }}>KRAF</span>
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 900, letterSpacing: '0.12em', color: '#5a6e2a', textTransform: 'uppercase' }}>ARCA</span>
      </div>
    </div>

    <div style={{ flex: 1, overflowY: 'auto' }}>
      <CompRow
        category="DEFINISI"
        kraf="Hasil karya yang dihasilkan melalui kemahiran tangan dan teknik tertentu, lazimnya mempunyai fungsi praktikal atau hiasan."
        arca="Karya seni tiga dimensi yang dihasilkan untuk menzahirkan idea, ekspresi dan nilai estetika."
        delay={100}
      />
      <CompRow
        category="FOKUS"
        kraf="Menekankan kemahiran pertukangan, ketelitian dan fungsi."
        arca="Menekankan idea, ekspresi, bentuk dan nilai estetika."
        delay={220}
      />
      <CompRow
        category="FUNGSI"
        kraf="Boleh digunakan sebagai barangan harian, hiasan atau mempunyai fungsi budaya."
        arca="Kebanyakannya berfungsi sebagai karya seni, simbolik atau elemen hiasan ruang."
        delay={340}
      />
    </div>

    <NavBar current={2} total={TOTAL_SCREENS} onPrev={onPrev} onNext={onNext} />
  </div>
);

/* ══════════════════════════════════════════
   SCREEN 3 — BENTUK, BAHAN & TEKNIK
══════════════════════════════════════════ */
const Screen3 = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => (
  <div className="screen-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    {/* Column headers */}
    <div style={{ display: 'flex', gap: 0, marginBottom: 10 }}>
      <div style={{ minWidth: 90 }} />
      <div style={{ flex: 1, textAlign: 'center', paddingLeft: 12 }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 900, letterSpacing: '0.12em', color: '#b84a2e', textTransform: 'uppercase' }}>KRAF</span>
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 900, letterSpacing: '0.12em', color: '#5a6e2a', textTransform: 'uppercase' }}>ARCA</span>
      </div>
    </div>

    <div style={{ flex: 1, overflowY: 'auto' }}>
      <CompRow
        category="BENTUK"
        kraf="Boleh berbentuk dua atau tiga dimensi bergantung kepada jenis kraf."
        arca="Lazimnya berbentuk tiga dimensi dan mempunyai ruang, isi padu serta struktur."
        delay={100}
      />
      <CompRow
        category="BAHAN"
        kraf="Menggunakan bahan seperti kayu, rotan, tanah liat, tekstil, logam dan bahan semula jadi."
        arca="Menggunakan bahan seperti tanah liat, kayu, batu, logam, plaster, bahan kitar semula dan bahan campuran."
        delay={220}
        icon={<div style={{ display: 'flex', gap: 4 }}><WoodIcon /><ClayIcon /></div>}
      />
      <CompRow
        category="TEKNIK"
        kraf="Melibatkan teknik seperti anyaman, ukiran, tembikar, jahitan dan tenunan."
        arca="Melibatkan teknik seperti binaan, luakan, acuan, assemblaj dan ukiran."
        delay={340}
        icon={<div style={{ display: 'flex', gap: 4 }}><TextileIcon /><ChiselIcon /></div>}
      />
    </div>

    {/* Decorative material icons strip */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, padding: '6px 0', opacity: 0.4 }}>
      <WoodIcon /><ClayIcon /><TextileIcon /><ChiselIcon /><SculptIcon />
    </div>

    <NavBar current={3} total={TOTAL_SCREENS} onPrev={onPrev} onNext={onNext} />
  </div>
);

/* ══════════════════════════════════════════
   SCREEN 4 — NILAI, BUDAYA & CONTOH
══════════════════════════════════════════ */
const Screen4 = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => (
  <div className="screen-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    {/* Column headers */}
    <div style={{ display: 'flex', gap: 0, marginBottom: 10 }}>
      <div style={{ minWidth: 90 }} />
      <div style={{ flex: 1, textAlign: 'center', paddingLeft: 12 }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 900, letterSpacing: '0.12em', color: '#b84a2e', textTransform: 'uppercase' }}>KRAF</span>
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 900, letterSpacing: '0.12em', color: '#5a6e2a', textTransform: 'uppercase' }}>ARCA</span>
      </div>
    </div>

    <div style={{ flex: 1, overflowY: 'auto' }}>
      <CompRow
        category="NILAI"
        kraf="Mempunyai nilai fungsi, estetika, budaya dan warisan."
        arca="Mempunyai nilai estetika, ekspresi, simbolik dan konseptual."
        delay={100}
      />
      <CompRow
        category="HUBUNGAN BUDAYA"
        kraf="Sangat berkait dengan tradisi, identiti dan warisan masyarakat."
        arca="Boleh mencerminkan budaya, tetapi lebih terbuka kepada idea dan interpretasi individu."
        delay={220}
      />

      {/* CONTOH row with chips */}
      <div className="comp-row-enter" style={{ animationDelay: '340ms' }}>
        <PaperCard style={{ padding: '14px 16px', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
            <div style={{ minWidth: 90, maxWidth: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.1em', color: '#5a6e2a', textTransform: 'uppercase', textAlign: 'center', background: 'rgba(90,110,42,0.12)', borderRadius: 4, padding: '3px 8px', border: '1px solid rgba(90,110,42,0.2)' }}>
                CONTOH
              </div>
            </div>
            <div style={{ width: 1, background: 'rgba(200,80,60,0.2)', alignSelf: 'stretch', margin: '0 12px', flexShrink: 0 }} />
            <div style={{ flex: 1, paddingRight: 10 }}>
              <SectionLabel label="Kraf" />
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 4 }}>
                {['Topeng', 'Anyaman', 'Batik', 'Tembikar', 'Ukiran'].map(t => <Chip key={t} label={t} />)}
              </div>
            </div>
            <div style={{ width: 1, background: 'rgba(200,80,60,0.2)', alignSelf: 'stretch', margin: '0 12px', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <SectionLabel label="Arca" />
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 4 }}>
                {['Arca Abstrak', 'Arca Binaan', 'Arca Mobail', 'Arca Assemblaj'].map(t => <Chip key={t} label={t} />)}
              </div>
            </div>
          </div>
        </PaperCard>
      </div>
    </div>

    <NavBar current={4} total={TOTAL_SCREENS} onPrev={onPrev} onNext={onNext} nextLabel="Lihat Persamaan" />
  </div>
);

/* ══════════════════════════════════════════
   SCREEN 5 — PERSAMAAN & KESIMPULAN
══════════════════════════════════════════ */
const Screen5 = ({ onPrev }: { onPrev: () => void }) => {
  const points = [
    'Menghasilkan karya melalui proses kreatif dan kemahiran tertentu.',
    'Menggunakan pelbagai bahan, alat dan teknik.',
    'Mementingkan unsur seni dan prinsip rekaan.',
    'Memerlukan proses penerokaan, perancangan dan penghasilan.',
    'Mempunyai nilai estetika dan boleh menyampaikan idea atau makna.',
  ];
  const rotations = [-1.5, 1, -0.8, 1.5, -1];

  return (
    <div className="screen-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Floating notes grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 16 }}>
          {points.map((p, i) => (
            <FloatingNote key={i} rotate={rotations[i]} delay={i * 100}>
              <Tape style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)' }} />
              <p style={{ fontSize: '0.74rem', fontWeight: 600, color: '#3a2510', lineHeight: 1.6, margin: 0, paddingTop: 4 }}>{p}</p>
            </FloatingNote>
          ))}
        </div>

        {/* Kesimpulan card */}
        <div className="float-note-enter" style={{ animationDelay: '550ms' }}>
          <div style={{
            background: 'linear-gradient(145deg, #fff3e0 0%, #ffe0b2 100%)',
            borderRadius: 10,
            padding: '18px 20px',
            boxShadow: '0 8px 28px rgba(200,80,60,0.2), 0 2px 8px rgba(100,70,40,0.14), inset 0 1px 0 rgba(255,255,255,0.7)',
            position: 'relative',
            border: '2px solid rgba(200,80,60,0.2)',
          }}>
            <Tape style={{ position: 'absolute', top: -9, left: 24, background: 'repeating-linear-gradient(90deg, rgba(200,80,60,0.5), rgba(230,120,80,0.5) 8px, rgba(200,80,60,0.45) 16px)' }} />
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: '0.68rem', fontWeight: 900, letterSpacing: '0.12em',
                color: '#8a2e1a', textTransform: 'uppercase',
                borderBottom: '2.5px solid rgba(200,80,60,0.5)',
                paddingBottom: 2,
                fontStyle: 'italic',
              }}>
                ✦ Kesimpulan
              </span>
            </div>
            <p style={{ fontSize: '0.76rem', fontWeight: 700, color: '#3d1a08', lineHeight: 1.7, margin: 0 }}>
              Kraf lebih menekankan kemahiran, fungsi dan nilai warisan, manakala arca lebih menekankan bentuk, ekspresi, idea dan nilai estetika. Namun begitu, kedua-duanya berkongsi proses kreatif, penggunaan bahan serta penerapan unsur seni dan prinsip rekaan dalam penghasilan karya.
            </p>
          </div>
        </div>
      </div>

      <NavBar
        current={5} total={TOTAL_SCREENS}
        onPrev={onPrev}
        prevLabel="Kembali ke Perbandingan"
      />
    </div>
  );
};

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function PerbandinganPage() {
  const [screen, setScreen] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((next: number, dir: 'forward' | 'backward') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setScreen(next);
      setAnimating(false);
    }, 320);
  }, [animating]);

  const goNext = useCallback(() => {
    if (screen < TOTAL_SCREENS) goTo(screen + 1, 'forward');
  }, [screen, goTo]);

  const goPrev = useCallback(() => {
    if (screen > 1) goTo(screen - 1, 'backward');
  }, [screen, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  // Touch/swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <>
      <PaperFilter />
      <PaperBackground />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Fraunces:ital,wght@0,600;0,700;0,900;1,700&display=swap');

        .perbandingan-page * {
          font-family: 'DM Sans', system-ui, sans-serif;
          box-sizing: border-box;
        }
        .perbandingan-page h1, .perbandingan-page h2 {
          font-family: 'Fraunces', Georgia, serif;
        }

        @keyframes slideInForward {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInBackward {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutForward {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-40px); }
        }
        @keyframes slideOutBackward {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(40px); }
        }
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatNoteIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .screen-enter-forward  { animation: slideInForward  0.32s cubic-bezier(0.22,1,0.36,1) both; }
        .screen-enter-backward { animation: slideInBackward 0.32s cubic-bezier(0.22,1,0.36,1) both; }
        .screen-exit-forward   { animation: slideOutForward  0.28s ease-in both; }
        .screen-exit-backward  { animation: slideOutBackward 0.28s ease-in both; }

        .paper-card { animation: cardFadeIn 0.4s cubic-bezier(0.22,1,0.36,1) both; }
        .comp-row-enter { animation: cardFadeIn 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .float-note-enter { animation: floatNoteIn 0.5s cubic-bezier(0.22,1,0.36,1) both; }

        .screen-content { padding: 0 2px; }

        /* Scrollbar styling */
        .screen-content ::-webkit-scrollbar { width: 4px; }
        .screen-content ::-webkit-scrollbar-track { background: transparent; }
        .screen-content ::-webkit-scrollbar-thumb { background: rgba(200,80,60,0.25); border-radius: 2px; }
      `}</style>

      <div
        className="perbandingan-page"
        style={{
          position: 'relative', zIndex: 1,
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '20px 16px 16px',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Back link */}
        <div style={{ width: '100%', maxWidth: 720, marginBottom: 8 }}>
          <Link
            href="/desk"
            style={{
              fontSize: '0.7rem', fontWeight: 700, color: 'rgba(180,60,30,0.75)',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
              transition: 'color 0.2s',
            }}
          >
            ← Kembali
          </Link>
        </div>

        {/* Main paper sheet */}
        <div style={{
          width: '100%', maxWidth: 720,
          background: 'linear-gradient(160deg, rgba(255,253,245,0.97) 0%, rgba(253,244,224,0.97) 50%, rgba(249,236,206,0.97) 100%)',
          borderRadius: 12,
          boxShadow: '0 10px 48px rgba(100,70,40,0.28), 0 2px 12px rgba(100,70,40,0.16), inset 0 1px 0 rgba(255,255,255,0.9)',
          padding: '24px 28px 20px',
          position: 'relative',
          minHeight: 'min(80vh, 560px)',
          display: 'flex', flexDirection: 'column',
          border: '1px solid rgba(200,80,60,0.12)',
        }}>
          {/* Top tape */}
          <Tape style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%) rotate(-0.5deg)', width: 80 }} />

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <h1 style={{
              fontSize: 'clamp(1rem, 3vw, 1.5rem)',
              fontWeight: 900, color: '#2d1508',
              margin: 0, letterSpacing: '0.02em', lineHeight: 1.2,
            }}>
              Perbandingan Antara Kraf dan Arca
            </h1>
            {/* Underline */}
            <div style={{ width: 70, height: 3, background: 'linear-gradient(90deg, #b84a2e, #5a6e2a)', borderRadius: 2, margin: '10px auto 0' }} />
          </div>

          {/* Screen content */}
          <div
            key={screen}
            className={animating
              ? (direction === 'forward' ? 'screen-exit-forward' : 'screen-exit-backward')
              : (direction === 'forward' ? 'screen-enter-forward' : 'screen-enter-backward')
            }
            style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: 6 }}
          >
            {screen === 1 && <Screen1 onNext={goNext} />}
            {screen === 2 && <Screen2 onPrev={goPrev} onNext={goNext} />}
            {screen === 3 && <Screen3 onPrev={goPrev} onNext={goNext} />}
            {screen === 4 && <Screen4 onPrev={goPrev} onNext={goNext} />}
            {screen === 5 && <Screen5 onPrev={goPrev} />}
          </div>
        </div>
      </div>
    </>
  );
}
