'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

// --- Sound utility ---
function useSoundEffects() {
  const audioCtx = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtx.current;
  }, []);

  const playHover = useCallback(() => {
    try {
      const ctx = getCtx();
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3) * 0.18;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.35, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 3200;
      filter.Q.value = 0.8;
      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      source.start();
    } catch (_) {}
  }, [getCtx]);

  const playClick = useCallback(() => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.12);
      gainNode.gain.setValueAtTime(0.55, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);

      const bufferSize = ctx.sampleRate * 0.06;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2) * 0.3;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      noiseSource.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSource.start();
    } catch (_) {}
  }, [getCtx]);

  return { playHover, playClick };
}

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { playHover, playClick } = useSoundEffects();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleHoverEnter = useCallback((key: string) => {
    setHovered(key);
    playHover();
  }, [playHover]);

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

      {/* ── DESK DECORATIONS ── */}
      <div className="absolute inset-0 pointer-events-none z-10">

        {/* Pencils top-right */}
        <div className="absolute entrance-fade" style={{ top: '8%', right: '14%', animationDelay: '0.7s' }}>
          <svg viewBox="0 0 90 22" width="90" height="22">
            <defs>
              <linearGradient id="pYellow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F0C830" />
                <stop offset="50%" stopColor="#F8D840" />
                <stop offset="100%" stopColor="#D4AC10" />
              </linearGradient>
            </defs>
            <rect x="12" y="3" width="62" height="16" rx="1" fill="url(#pYellow)" />
            <line x1="12" y1="7" x2="74" y2="7" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
            <line x1="12" y1="15" x2="74" y2="15" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
            <polygon points="74,3 88,11 74,19" fill="#D4A870" />
            <polygon points="80,8 88,11 80,14" fill="#C8956A" />
            <polygon points="84,10 88,11 84,12" fill="#3A3A3A" />
            <rect x="8" y="3" width="6" height="16" rx="1" fill="#D0C8B8" />
            <rect x="0" y="5" width="10" height="12" rx="2" fill="#E8A0A8" />
            <rect x="12" y="3" width="62" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>

        <div className="absolute entrance-fade" style={{ top: '13%', right: '12%', animationDelay: '0.75s', transform: 'rotate(14deg)' }}>
          <svg viewBox="0 0 82 20" width="74" height="18">
            <defs>
              <linearGradient id="pGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#78C060" />
                <stop offset="50%" stopColor="#88D070" />
                <stop offset="100%" stopColor="#58A040" />
              </linearGradient>
            </defs>
            <rect x="12" y="3" width="58" height="14" rx="1" fill="url(#pGreen)" />
            <polygon points="70,3 82,10 70,17" fill="#C8A060" />
            <polygon points="76,7.5 82,10 76,12.5" fill="#B89050" />
            <polygon points="79,9.5 82,10 79,10.5" fill="#3A3A3A" />
            <rect x="8" y="3" width="6" height="14" rx="1" fill="#C8C0B0" />
            <rect x="0" y="4" width="10" height="12" rx="2" fill="#E8A0A8" />
            <rect x="12" y="3" width="58" height="3.5" rx="1" fill="rgba(255,255,255,0.18)" />
          </svg>
        </div>

        {/* Sticky note bottom-left */}
        <div className="absolute entrance-fade" style={{ bottom: '14%', left: '6%', animationDelay: '0.8s', transform: 'rotate(-4deg)' }}>
          <div style={{
            width: 110, height: 110,
            background: 'linear-gradient(160deg, #FFE870 0%, #FFD830 40%, #F0C820 100%)',
            boxShadow: '3px 5px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
            padding: '14px 12px 10px', borderRadius: '2px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 15px, rgba(0,0,0,0.04) 15px, rgba(0,0,0,0.04) 16px)' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 100%)' }} />
            <p style={{ fontSize: 9, color: '#4A3A0A', fontFamily: 'cursive', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
              Sketches<br />due Friday<br />✓ Mood board<br />□ Final render
            </p>
          </div>
        </div>

        {/* Sticky note pink right side */}
        <div className="absolute entrance-fade" style={{ bottom: '30%', right: '5%', animationDelay: '0.9s', transform: 'rotate(5deg)' }}>
          <div style={{
            width: 92, height: 92,
            background: 'linear-gradient(160deg, #FFB0C0 0%, #FF9AAE 50%, #F08098 100%)',
            boxShadow: '3px 4px 14px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.35)',
            padding: '12px 10px', borderRadius: '2px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 14px, rgba(0,0,0,0.05) 14px, rgba(0,0,0,0.05) 15px)' }} />
            <p style={{ fontSize: 9, color: '#4A1020', fontFamily: 'cursive', lineHeight: 1.8, position: 'relative', zIndex: 1 }}>
              PSVK<br />3313<br />★★★
            </p>
          </div>
        </div>

        {/* Washi tape strips */}
        <div className="absolute entrance-fade" style={{ top: '40%', right: '1%', animationDelay: '1s', transform: 'rotate(90deg)' }}>
          <div style={{ width: 80, height: 18, borderRadius: 2, opacity: 0.82, background: 'repeating-linear-gradient(90deg, rgba(80,160,220,0.85), rgba(110,190,240,0.85) 10px, rgba(70,150,210,0.85) 20px)', boxShadow: '1px 2px 8px rgba(0,0,0,0.25)' }} />
        </div>

        <div className="absolute entrance-fade" style={{ bottom: '42%', left: '0%', animationDelay: '1.05s', transform: 'rotate(90deg)' }}>
          <div style={{ width: 72, height: 16, borderRadius: 2, opacity: 0.78, background: 'repeating-linear-gradient(90deg, rgba(240,160,70,0.85), rgba(255,200,100,0.85) 8px, rgba(230,150,60,0.85) 16px)', boxShadow: '1px 2px 6px rgba(0,0,0,0.22)' }} />
        </div>

        {/* Eraser bottom-right area */}
        <div className="absolute entrance-fade" style={{ bottom: '20%', right: '20%', animationDelay: '0.95s', transform: 'rotate(-8deg)' }}>
          <svg viewBox="0 0 96 38" width="86" height="34">
            <defs>
              <linearGradient id="eraserB" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F0A8B8" />
                <stop offset="50%" stopColor="#F8B8C8" />
                <stop offset="100%" stopColor="#D88898" />
              </linearGradient>
            </defs>
            <rect x="4" y="7" width="88" height="24" rx="4" fill="url(#eraserB)" />
            <rect x="4" y="7" width="88" height="7" rx="4" fill="rgba(255,255,255,0.22)" />
            <rect x="4" y="7" width="22" height="24" rx="4" fill="#C07888" />
            <text x="60" y="23" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8" fontFamily="sans-serif" letterSpacing="1.5" fontWeight="600">ERASER</text>
          </svg>
        </div>

        {/* Ruler bottom */}
        <div className="absolute entrance-fade" style={{ bottom: '7%', left: '18%', animationDelay: '1.0s', transform: 'rotate(2deg)' }}>
          <svg viewBox="0 0 230 30" width="200" height="26">
            <defs>
              <linearGradient id="rulerB" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F4ECD0" />
                <stop offset="60%" stopColor="#E8DCC0" />
                <stop offset="100%" stopColor="#D8CCA8" />
              </linearGradient>
            </defs>
            <rect x="0" y="2" width="230" height="26" rx="2" fill="url(#rulerB)" stroke="#C8BC98" strokeWidth="0.8" />
            <rect x="0" y="2" width="230" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
            {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].map((i) => (
              <line key={i} x1={10 + i * 10} y1="2" x2={10 + i * 10} y2={i % 5 === 0 ? 14 : 9} stroke="#8A7A5A" strokeWidth={i % 5 === 0 ? 1 : 0.6} />
            ))}
            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
              <text key={n} x={10 + (n - 1) * 50 + 25} y="24" textAnchor="middle" fill="#6A5A3A" fontSize="7" fontFamily="sans-serif">{n * 5}</text>
            ))}
          </svg>
        </div>

        {/* Small paper clip top-left */}
        <div className="absolute entrance-fade" style={{ top: '18%', left: '8%', animationDelay: '1.1s', transform: 'rotate(-15deg)' }}>
          <svg viewBox="0 0 24 60" width="18" height="45">
            <path d="M12 4 C6 4 4 8 4 12 L4 44 C4 50 8 54 12 54 C16 54 20 50 20 44 L20 16 C20 12 18 8 14 8 C10 8 8 12 8 16 L8 42 C8 44 10 46 12 46 C14 46 16 44 16 42 L16 18" fill="none" stroke="#B0A090" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Small blue sticky note top area */}
        <div className="absolute entrance-fade" style={{ top: '10%', left: '20%', animationDelay: '0.85s', transform: 'rotate(3deg)' }}>
          <div style={{
            width: 80, height: 80,
            background: 'linear-gradient(160deg, #A8D8F0 0%, #88C4E8 50%, #70B0D8 100%)',
            boxShadow: '2px 4px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)',
            padding: '10px 8px', borderRadius: '2px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 7, background: 'linear-gradient(180deg, rgba(0,0,0,0.07) 0%, transparent 100%)' }} />
            <p style={{ fontSize: 8, color: '#1A3A5A', fontFamily: 'cursive', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
              Kraf &<br />Arca<br />📁
            </p>
          </div>
        </div>

      </div>

      {/* Back button */}
      <Link
        href="/desk"
        className="absolute top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
        style={{
          background: 'var(--sticker-white)',
          boxShadow: '2px 4px 12px rgba(0,0,0,0.25)',
          color: '#3D2B1F',
          fontWeight: 700,
          fontSize: '0.85rem',
          textDecoration: 'none',
        }}
        onClick={playClick}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </Link>

      {/* Title sticker */}
      <div className="absolute top-6 left-1/2 z-30 flex flex-col items-center" style={{ transform: 'translateX(-50%)' }}>
        <div className="entrance-fade" style={{ animationDelay: '0.1s' }}>
          <div
            className="relative px-8 py-4 rounded-2xl"
            style={{
              background: 'var(--sticker-white)',
              boxShadow: '2px 4px 12px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.8) inset',
              transform: 'rotate(-0.5deg)',
            }}
          >
            <div
              className="absolute -top-3 left-1/2 w-20 h-5 rounded-sm opacity-80"
              style={{
                transform: 'translateX(-50%) rotate(-1deg)',
                background: 'repeating-linear-gradient(90deg, rgba(255,220,100,0.8), rgba(255,235,130,0.8) 10px, rgba(255,210,90,0.8) 20px)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}
            />
            <h1
              className="font-display text-center tracking-wide"
              style={{
                fontSize: 'clamp(1.4rem, 3.5vw, 2.6rem)',
                color: '#3D2B1F',
                fontWeight: 900,
                letterSpacing: '0.05em',
                lineHeight: 1.2,
              }}
            >
              PORTFOLIO
              <span className="block" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.8rem)', fontWeight: 800, color: '#7B4F2E' }}>
                PSVK3313
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Two folders side by side */}
      <div
        className="absolute z-20 flex items-center justify-center gap-16"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* KRAF folder */}
        <Link
          href="/projects/kraf"
          className="entrance-fade"
          style={{ animationDelay: '0.4s', textDecoration: 'none' }}
          onMouseEnter={() => handleHoverEnter('kraf')}
          onMouseLeave={() => setHovered(null)}
          onClick={playClick}
          aria-label="Kraf project folder"
        >
          <FolderCard
            label="Kraf"
            isHovered={hovered === 'kraf'}
            rotation={-3}
          >
            <div
              className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg"
              style={{ padding: '8px' }}
            >
              <AppImage
                src="/assets/images/IMG_2650-1789564620617.jpeg"
                alt="Blue origami crane folded with precision, vivid cobalt paper against neutral background"
                width={120}
                height={120}
                className="object-contain"
                style={{ borderRadius: '8px', maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
          </FolderCard>
        </Link>

        {/* ARCA folder */}
        <Link
          href="/projects/arca"
          className="entrance-fade"
          style={{ animationDelay: '0.6s', textDecoration: 'none' }}
          onMouseEnter={() => handleHoverEnter('arca')}
          onMouseLeave={() => setHovered(null)}
          onClick={playClick}
          aria-label="Arca project folder"
        >
          <FolderCard
            label="Arca"
            isHovered={hovered === 'arca'}
            rotation={3}
          >
            <div
              className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg"
              style={{ padding: '8px' }}
            >
              <AppImage
                src="/assets/images/IMG_2651-1789564620589.jpeg"
                alt="White sculptural form with smooth organic curves, minimalist art piece on clean surface"
                width={120}
                height={120}
                className="object-contain"
                style={{ borderRadius: '8px', maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
          </FolderCard>
        </Link>
      </div>

      {/* Bottom hint removed */}
    </div>
  );
}

interface FolderCardProps {
  label: string;
  isHovered: boolean;
  rotation: number;
  children: React.ReactNode;
}

function FolderCard({ label, isHovered, rotation, children }: FolderCardProps) {
  return (
    <div
      style={{
        width: 260,
        cursor: 'pointer',
        filter: isHovered
          ? 'drop-shadow(0 28px 56px rgba(0,0,0,0.55)) drop-shadow(0 0 32px rgba(160,100,40,0.3))'
          : 'drop-shadow(0 14px 32px rgba(0,0,0,0.45)) drop-shadow(0 4px 10px rgba(0,0,0,0.25))',
        transform: isHovered
          ? `translateY(-14px) scale(1.05) rotate(${rotation * 0.3}deg)`
          : `rotate(${rotation}deg)`,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* Folder SVG */}
      <svg viewBox="0 0 220 260" width="260" height="308" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`backFolder-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A07848" />
            <stop offset="50%" stopColor="#B88A58" />
            <stop offset="100%" stopColor="#906838" />
          </linearGradient>
          <linearGradient id={`mainFolder-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C09060" />
            <stop offset="30%" stopColor="#D4A870" />
            <stop offset="70%" stopColor="#C89860" />
            <stop offset="100%" stopColor="#A87840" />
          </linearGradient>
          <linearGradient id={`folderLeftEdge-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          <linearGradient id={`folderRightEdge-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
          </linearGradient>
          <pattern id={`kraftFiber-${label}`} x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="4" y2="4" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
            <line x1="4" y1="0" x2="0" y2="4" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          </pattern>
          <filter id={`paperShadow-${label}`}>
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.2)" />
          </filter>
        </defs>

        {/* Cast shadow */}
        <ellipse cx="110" cy="256" rx="90" ry="7" fill="rgba(0,0,0,0.2)" />

        {/* Back folder */}
        <rect x="12" y="10" width="190" height="238" rx="5"
          fill={`url(#backFolder-${label})`}
          transform="rotate(3, 107, 129)"
        />
        <rect x="12" y="10" width="190" height="238" rx="5"
          fill={`url(#kraftFiber-${label})`}
          opacity="0.5"
          transform="rotate(3, 107, 129)"
        />

        {/* Main folder body */}
        <rect x="8" y="14" width="196" height="236" rx="6"
          fill={`url(#mainFolder-${label})`}
        />
        <rect x="8" y="14" width="196" height="236" rx="6"
          fill={`url(#kraftFiber-${label})`}
          opacity="0.6"
        />

        {/* Folder tab */}
        <rect x="8" y="14" width="80" height="18" rx="4" fill="#B88050" />
        <rect x="9" y="15" width="78" height="6" rx="3" fill="rgba(255,255,255,0.12)" />

        {/* Left/right edge shadows */}
        <rect x="8" y="14" width="20" height="236" rx="6" fill={`url(#folderLeftEdge-${label})`} />
        <rect x="184" y="14" width="20" height="236" rx="6" fill={`url(#folderRightEdge-${label})`} />

        {/* Bottom shadow */}
        <rect x="8" y="226" width="196" height="24" rx="0" fill="rgba(0,0,0,0.12)" />

        {/* Surface highlight */}
        <path d="M10 28 Q10 244 12 248" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="4" strokeLinecap="round" />

        {/* Label area */}
        <rect x="20" y="38" width="172" height="36" rx="4"
          fill="rgba(255,252,240,0.92)"
          filter={`url(#paperShadow-${label})`}
        />
        <rect x="20" y="38" width="172" height="36" rx="4" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />

        {/* Label text */}
        <text x="106" y="62" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="18" fill="#3D2B1F" letterSpacing="2">
          {label.toUpperCase()}
        </text>

        {/* Image area */}
        <rect x="30" y="88" width="152" height="148" rx="8"
          fill="rgba(255,252,240,0.85)"
          filter={`url(#paperShadow-${label})`}
        />
        <rect x="30" y="88" width="152" height="148" rx="8" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />

        {/* Folder bottom edge highlight */}
        <path d="M10 246 Q110 250 202 246" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      </svg>

      {/* Image overlaid on the folder's image area */}
      <div
        style={{
          position: 'absolute',
          top: '104px',
          left: '36px',
          width: '180px',
          height: '175px',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
}