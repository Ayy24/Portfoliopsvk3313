'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import ChecklistNoteProp from './ChecklistNoteProp';
import SmartphoneProp from './SmartphoneProp';
import LanyardBadge from './LanyardBadge';
import StickyNoteProp from './StickyNoteProp';
import PortfolioFolder from './PortfolioFolder';
import DeskDecorations from './DeskDecorations';
import ClickHint from './ClickHint';
import MatchaCupTopDown from './MatchaCupTopDown';

// --- Sound utility ---
function useSoundEffects() {
  const audioCtx = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtx.current;
  }, []);

  // Soft paper rustle / hover sound
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

  // Satisfying click / stamp sound
  const playClick = useCallback(() => {
    try {
      const ctx = getCtx();
      // Thud component
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

      // Noise click layer
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

export default function DeskScene() {
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

  const handleHoverLeave = useCallback(() => {
    setHovered(null);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden wood-bg select-none">
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          70% { transform: scale(1.2) rotate(var(--r, 8deg)); opacity: 1; }
          100% { transform: scale(1) rotate(var(--r, 8deg)); opacity: 1; }
        }
      `}</style>
      {/* Realistic wood grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(178deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 48px),
            repeating-linear-gradient(182deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 32px),
            repeating-linear-gradient(179deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 80px)
          `,
        }}
      />

      {/* Ambient light */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,240,200,0.12) 0%, transparent 70%)' }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.28) 70%, rgba(0,0,0,0.55) 100%)' }}
      />

      {/* Side shadows */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.15) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.12) 100%)' }}
      />

      {/* ── TITLE STICKER ── */}
      <div className="absolute top-6 left-1/2 z-30 flex flex-col items-center" style={{ transform: 'translateX(-50%)' }}>
        <div className="title-entrance" style={{ animationDelay: '0.1s' }}>
          <div
            className="relative px-6 py-3 rounded-2xl"
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
                fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
                color: '#3D2B1F',
                fontWeight: 900,
                letterSpacing: '0.05em',
                lineHeight: 1.2,
              }}
            >
              PSVK 3313
              <span className="block" style={{ fontSize: 'clamp(0.9rem, 2.2vw, 1.6rem)', fontWeight: 700 }}>
                BENTUK &amp; BINAAN
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* ── DESK DECORATIONS (non-clickable) ── */}
      <DeskDecorations />

      {/* ── CHECKLIST NOTE (→ Kepentingan PSV) — #5, top left ── */}
      <Link
        href="/kepentingan-psv"
        className="absolute z-20"
        style={{ top: '5%', left: '3%' }}
        onMouseEnter={() => handleHoverEnter('checklist')}
        onMouseLeave={handleHoverLeave}
        onClick={playClick}
        aria-label="Nota senarai semak — lawati Kepentingan dalam PSV"
      >
        <div className="entrance-fade" style={{ animationDelay: '0.3s', position: 'relative', display: 'inline-flex', alignItems: 'flex-start' }}>
          <div style={{ transform: 'scale(1.15)', transformOrigin: 'top left' }}>
            <ChecklistNoteProp isHovered={hovered === 'checklist'} />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-8px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFE066 0%, #FFB347 100%)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.7) inset',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 900,
              fontSize: '16px',
              color: '#5C3A1E',
              border: '3px solid rgba(255,255,255,0.9)',
              zIndex: 30,
              transform: 'rotate(8deg)',
              letterSpacing: '-0.5px',
            }}
          >
            5
          </div>
        </div>
        {hovered === 'checklist' && mounted && (
          <ClickHint label="Kepentingan dalam PSV" />
        )}
      </Link>

      {/* ── SMARTPHONE (→ Perbandingan) — #4, left, larger ── */}
      <Link
        href="/perbandingan-kraf-arca"
        className="absolute z-20"
        style={{ top: '48%', left: '2%' }}
        onMouseEnter={() => handleHoverEnter('phone')}
        onMouseLeave={handleHoverLeave}
        onClick={playClick}
        aria-label="Telefon pintar — lawati halaman Perbandingan Kraf dan Arca"
      >
        <div className="entrance-fade" style={{ animationDelay: '0.5s', position: 'relative' }}>
          <div style={{ transform: 'scale(1.25)', transformOrigin: 'top left' }}>
            <SmartphoneProp isHovered={hovered === 'phone'} />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              right: '-10px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #A8E6CF 0%, #56C596 100%)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.7) inset',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 900,
              fontSize: '16px',
              color: '#1A4731',
              border: '3px solid rgba(255,255,255,0.9)',
              zIndex: 30,
              transform: 'rotate(-6deg)',
              letterSpacing: '-0.5px',
            }}
          >
            4
          </div>
        </div>
        {hovered === 'phone' && mounted && (
          <ClickHint label="Perbandingan Kraf & Arca" />
        )}
      </Link>

      {/* ── LANYARD BADGE (→ Profil Diri) — #1, top right ── */}
      <Link
        href="/profil-diri"
        className="absolute z-20"
        style={{ top: '5%', right: '3%' }}
        onMouseEnter={() => handleHoverEnter('glasses')}
        onMouseLeave={handleHoverLeave}
        onClick={playClick}
        aria-label="Lanyard — lawati halaman Lanyard"
      >
        <div className="entrance-fade" style={{ animationDelay: '0.35s', position: 'relative' }}>
          <div style={{ transform: 'scale(1.1)', transformOrigin: 'top right' }}>
            <LanyardBadge isHovered={hovered === 'glasses'} />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              right: '-10px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFB3C6 0%, #FF6B9D 100%)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.7) inset',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 900,
              fontSize: '16px',
              color: '#5C0A2E',
              border: '3px solid rgba(255,255,255,0.9)',
              zIndex: 30,
              transform: 'rotate(-8deg)',
              letterSpacing: '-0.5px',
            }}
          >
            1
          </div>
        </div>
        {hovered === 'glasses' && mounted && (
          <ClickHint label="Buka Buku" position="left" />
        )}
      </Link>

      {/* ── STICKY NOTE (→ Pengenalan) — #2, RIGHT side ── */}
      <Link
        href="/pengenalan"
        className="absolute z-20"
        style={{ top: '58%', right: '8%' }}
        onMouseEnter={() => handleHoverEnter('lanyard')}
        onMouseLeave={handleHoverLeave}
        onClick={playClick}
        aria-label="Buku — lawati halaman Pengenalan"
      >
        <div className="entrance-fade" style={{ animationDelay: '0.4s', position: 'relative' }}>
          <div style={{ transform: 'scale(1.2)', transformOrigin: 'top right' }}>
            <StickyNoteProp isHovered={hovered === 'lanyard'} />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              right: '-10px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #80DEEA 0%, #00ACC1 100%)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.7) inset',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 900,
              fontSize: '16px',
              color: '#003D4A',
              border: '3px solid rgba(255,255,255,0.9)',
              zIndex: 30,
              transform: 'rotate(-5deg)',
              letterSpacing: '-0.5px',
            }}
          >
            2
          </div>
        </div>
        {hovered === 'lanyard' && mounted && (
          <ClickHint label="Pengenalan" position="left" />
        )}
      </Link>

      {/* ── MATCHA CUP TOP-DOWN (→ Rujukan & Permainan) — centered under folder, #6 ── */}
      <Link
        href="/rujukan-permainan"
        className="absolute z-20"
        style={{ top: '80%', left: '50%', transform: 'translateX(-50%)' }}
        onMouseEnter={() => handleHoverEnter('matcha')}
        onMouseLeave={handleHoverLeave}
        onClick={playClick}
        aria-label="Cawan matcha — lawati halaman Rujukan & Permainan"
      >
        <div className="entrance-fade" style={{ animationDelay: '0.9s', position: 'relative' }}>
          <div style={{ transform: 'scale(1.1)', transformOrigin: 'bottom center' }}>
            <MatchaCupTopDown isHovered={hovered === 'matcha'} />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              right: '-10px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #CE93D8 0%, #9C27B0 100%)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.7) inset',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 900,
              fontSize: '16px',
              color: '#F3E5F5',
              border: '3px solid rgba(255,255,255,0.9)',
              zIndex: 30,
              transform: 'rotate(10deg)',
              letterSpacing: '-0.5px',
            }}
          >
            6
          </div>
        </div>
        {hovered === 'matcha' && mounted && (
          <ClickHint label="Rujukan & Permainan" />
        )}
      </Link>

      {/* ── PORTFOLIO FOLDER (→ Projek) — #3 ── */}
      <Link
        href="/projects"
        className="absolute z-20"
        style={{
          top: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        onMouseEnter={() => handleHoverEnter('folder')}
        onMouseLeave={handleHoverLeave}
        onClick={playClick}
        aria-label="Folder kraf & arca — lawati halaman Projek"
      >
        <div className="entrance-drop" style={{ animationDelay: '0.6s', position: 'relative' }}>
          <PortfolioFolder isHovered={hovered === 'folder'} />
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              right: '-10px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #B3D4FF 0%, #5B9BF5 100%)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.7) inset',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 900,
              fontSize: '16px',
              color: '#0D2B5E',
              border: '3px solid rgba(255,255,255,0.9)',
              zIndex: 30,
              transform: 'rotate(6deg)',
              letterSpacing: '-0.5px',
            }}
          >
            3
          </div>
        </div>
        {hovered === 'folder' && mounted && (
          <ClickHint label="Projek &amp; Karya" />
        )}
      </Link>
    </div>
  );
}