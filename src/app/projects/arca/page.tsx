'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ArcaPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const [completed, setCompleted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Draw the parchment content canvas
  const drawContent = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    // Parchment background
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#f5e9c8');
    bg.addColorStop(0.3, '#f0e0b0');
    bg.addColorStop(0.6, '#ede0b5');
    bg.addColorStop(1, '#e8d8a0');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Subtle paper grain noise
    for (let i = 0; i < 8000; i++) {
      let x = Math.random() * w;
      let y = Math.random() * h;
      const alpha = Math.random() * 0.04;
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 80 : 200},${Math.random() > 0.5 ? 60 : 180},${Math.random() > 0.5 ? 30 : 120},${alpha})`;
      ctx.fillRect(x, y, 1, 1);
    }

    // Subtle vignette on parchment
    const vignette = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.85);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(80,50,10,0.18)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    // Margin lines (subtle)
    ctx.strokeStyle = 'rgba(160,120,60,0.12)';
    ctx.lineWidth = 1;
    const margin = w * 0.07;
    ctx.strokeRect(margin, margin * 0.6, w - margin * 2, h - margin * 1.2);

    // Scale font sizes relative to canvas width
    const scale = w / 700;

    // Title: "Arca"
    ctx.fillStyle = '#2c1a0a';
    ctx.font = `900 ${Math.round(52 * scale)}px 'Georgia', serif`;
    ctx.textAlign = 'center';
    ctx.fillText('Arca', w / 2, margin * 1.2 + 50 * scale);

    // Decorative line under title
    const lineY = margin * 1.2 + 62 * scale;
    const lineW = 70 * scale;
    ctx.strokeStyle = 'rgba(120,80,30,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w / 2 - lineW, lineY);
    ctx.lineTo(w / 2 + lineW, lineY);
    ctx.stroke();

    // "Definisi:" label
    const defY = lineY + 42 * scale;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#3a2010';
    ctx.font = `700 ${Math.round(26 * scale)}px 'Georgia', serif`;
    ctx.fillText('Definisi:', margin * 1.1, defY);

    // Definition paragraph — word wrap
    const paraText =
      'Arca ialah karya seni tiga dimensi yang dihasilkan melalui proses membentuk, membina, mengukir, mencantum, menyusun atau mengolah pelbagai jenis bahan bagi menghasilkan bentuk, ruang, struktur dan jalinan yang dapat dilihat serta dinikmati dari pelbagai sudut. Dalam bidang Membentuk dan Membuat Binaan, penghasilan arca melibatkan penerokaan terhadap unsur seni dan prinsip rekaan melalui pemilihan bahan, teknik serta kaedah yang bersesuaian dengan idea dan konsep yang ingin disampaikan. Arca bukan sahaja berfungsi sebagai objek estetik, malah boleh menjadi medium untuk menyampaikan simbol, identiti, emosi, pemikiran, nilai budaya dan mesej tertentu. Penghasilannya boleh menggunakan bahan seperti tanah liat, kayu, logam, batu, plaster, kertas, bahan kitar semula dan bahan semula jadi, bergantung kepada konsep, fungsi dan nilai estetika karya yang ingin dihasilkan.';

    const fontSize = Math.round(16 * scale);
    ctx.font = `400 ${fontSize}px 'Georgia', serif`;
    ctx.fillStyle = '#2e1a08';
    const lineHeight = fontSize * 1.78;
    const textX = margin * 1.1;
    const textMaxW = w - margin * 2.2;
    const startY = defY + 30 * scale;

    // Word wrap — measure total lines needed first
    const words = paraText.split(' ');
    let line = '';
    let y = startY;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > textMaxW && n > 0) {
        ctx.fillText(line.trim(), textX, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), textX, y);
  }, []);

  // Draw the artistic cover layer — no hint text
  const drawCover = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    // Deep charcoal/slate artistic surface
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#1a1410');
    bg.addColorStop(0.25, '#221a12');
    bg.addColorStop(0.5, '#1e1810');
    bg.addColorStop(0.75, '#251e14');
    bg.addColorStop(1, '#1a1208');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Subtle canvas texture lines (horizontal)
    for (let y = 0; y < h; y += 3) {
      const alpha = 0.015 + Math.random() * 0.025;
      ctx.fillStyle = `rgba(255,240,200,${alpha})`;
      ctx.fillRect(0, y, w, 1);
    }

    // Vertical texture
    for (let x = 0; x < w; x += 4) {
      const alpha = 0.01 + Math.random() * 0.015;
      ctx.fillStyle = `rgba(255,240,200,${alpha})`;
      ctx.fillRect(x, 0, 1, h);
    }

    // Subtle warm grain noise
    for (let i = 0; i < 12000; i++) {
      let x = Math.random() * w;
      let y = Math.random() * h;
      const alpha = Math.random() * 0.06;
      ctx.fillStyle = `rgba(200,160,80,${alpha})`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // Radial warm glow center
    const glow = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, w * 0.6);
    glow.addColorStop(0, 'rgba(200,150,60,0.08)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Subtle border
    ctx.strokeStyle = 'rgba(180,140,60,0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, w - 2, h - 2);
  }, []);

  const initCanvases = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!container || !canvas || !overlay) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    canvas.width = w;
    canvas.height = h;
    overlay.width = w;
    overlay.height = h;

    const contentCtx = canvas.getContext('2d');
    const coverCtx = overlay.getContext('2d');
    if (!contentCtx || !coverCtx) return;

    drawContent(contentCtx, w, h);
    drawCover(coverCtx, w, h);
  }, [drawContent, drawCover]);

  useEffect(() => {
    initCanvases();
    const handleResize = () => {
      setCompleted(false);
      setFadeOut(false);
      initCanvases();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvases]);

  const getPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      const touch = (e as React.TouchEvent).touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: ((e as React.MouseEvent).clientX - rect.left) * scaleX,
      y: ((e as React.MouseEvent).clientY - rect.top) * scaleY,
    };
  };

  const scratch = useCallback((x: number, y: number, lastX: number | null, lastY: number | null) => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const ctx = overlay.getContext('2d');
    if (!ctx) return;

    const brushSize = Math.max(overlay.width * 0.055, 38);

    ctx.globalCompositeOperation = 'destination-out';

    if (lastX !== null && lastY !== null) {
      const dist = Math.hypot(x - lastX, y - lastY);
      const steps = Math.max(Math.ceil(dist / (brushSize * 0.25)), 1);
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const ix = lastX + (x - lastX) * t;
        const iy = lastY + (y - lastY) * t;
        const grad = ctx.createRadialGradient(ix, iy, 0, ix, iy, brushSize);
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(0.55, 'rgba(0,0,0,0.92)');
        grad.addColorStop(0.8, 'rgba(0,0,0,0.5)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ix, iy, brushSize, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, brushSize);
      grad.addColorStop(0, 'rgba(0,0,0,1)');
      grad.addColorStop(0.55, 'rgba(0,0,0,0.92)');
      grad.addColorStop(0.8, 'rgba(0,0,0,0.5)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
  }, []);

  const checkReveal = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay || completed) return;
    const ctx = overlay.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, overlay.width, overlay.height);
    const data = imageData.data;
    let transparent = 0;
    const total = data.length / 4;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) transparent++;
    }
    const pct = Math.round((transparent / total) * 100);

    if (pct >= 85 && !completed) {
      setCompleted(true);
      setFadeOut(true);
    }
  }, [completed]);

  const scheduleCheck = useCallback(() => {
    if (checkIntervalRef.current) return;
    checkIntervalRef.current = setTimeout(() => {
      checkReveal();
      checkIntervalRef.current = null;
    }, 200);
  }, [checkReveal]);

  const handlePointerDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (completed) return;
    isDrawingRef.current = true;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const pos = getPos(e, overlay);
    lastPosRef.current = pos;
    scratch(pos.x, pos.y, null, null);
    scheduleCheck();
  }, [completed, scratch, scheduleCheck]);

  const handlePointerMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || completed) return;
    e.preventDefault();
    const overlay = overlayRef.current;
    if (!overlay) return;
    const pos = getPos(e, overlay);
    const last = lastPosRef.current;
    scratch(pos.x, pos.y, last?.x ?? null, last?.y ?? null);
    lastPosRef.current = pos;
    scheduleCheck();
  }, [completed, scratch, scheduleCheck]);

  const handlePointerUp = useCallback(() => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  }, []);

  const handleNavClick = () => {
    setBtnPressed(true);
    setTimeout(() => {
      router.push('/projects/arca/buku');
    }, 320);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (checkIntervalRef.current) clearTimeout(checkIntervalRef.current);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden wood-bg select-none">
      {/* Wood grain overlay — same as kraf page */}
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

      {/* Back button — same style as kraf page */}
      <Link
        href="/projects"
        className="absolute top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
        style={{
          background: 'var(--sticker-white, #FFFEF5)',
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

      {/* ── DECORATIONS — same as kraf page ── */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center"
        style={{ pointerEvents: 'none' }}
      >
        <div style={{ width: 'min(720px, 92vw)', position: 'relative' }}>

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
            <div style={{ width: 12, height: 14, background: '#F4A0A0', borderRadius: '3px 3px 0 0', border: '1px solid rgba(0,0,0,0.1)' }} />
            <div style={{ width: 12, height: 6, background: '#C0A060' }} />
            <div style={{ width: 12, flex: 1, background: 'linear-gradient(90deg, #F5C842 0%, #E8B820 50%, #F5C842 100%)', border: '1px solid rgba(0,0,0,0.08)' }} />
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
            <div style={{ width: 10, flex: 1, background: 'linear-gradient(90deg, #8B5E3C 0%, #A0703A 50%, #8B5E3C 100%)', borderRadius: '4px 4px 0 0', border: '1px solid rgba(0,0,0,0.1)' }} />
            <div style={{ width: 10, height: 10, background: '#B8A060' }} />
            <div style={{ width: 8, height: 22, background: 'linear-gradient(180deg, #C07040 0%, #8B4513 100%)', borderRadius: '0 0 4px 4px' }} />
          </div>

          {/* Paper clip */}
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

          {/* Coffee ring stain */}
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
            <div style={{
              position: 'absolute',
              inset: 6,
              borderRadius: '50%',
              border: '2px solid rgba(139, 90, 43, 0.15)',
            }} />
          </div>

          {/* Scissors */}
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

          {/* Star doodles */}
          <div style={{ position: 'absolute', top: '-30px', left: '20%', zIndex: 15, fontSize: '1rem', opacity: 0.7, transform: 'rotate(-5deg)', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>⭐</div>
          <div style={{ position: 'absolute', top: '-28px', right: '22%', zIndex: 15, fontSize: '0.8rem', opacity: 0.6, transform: 'rotate(8deg)', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>✨</div>

          {/* Washi tape strip */}
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

          {/* Spacer to give decorations height context */}
          <div style={{ width: '100%', paddingBottom: '72%' }} />
        </div>
      </div>

      {/* Canvas container — centered, tall enough for all text */}
      <div
        className="absolute z-30"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(720px, 92vw)',
          height: 'min(680px, 90vh)',
        }}
      >
        {/* Outer shadow */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(180,140,60,0.15)',
            borderRadius: '14px',
          }}
        />

        {/* Canvas frame border */}
        <div
          className="absolute rounded-2xl pointer-events-none z-30"
          style={{
            inset: '-4px',
            border: '2px solid rgba(160,120,50,0.25)',
            borderRadius: '16px',
          }}
        />

        {/* Inner container for canvases */}
        <div
          ref={containerRef}
          className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{ borderRadius: '14px' }}
        >
          {/* Content canvas (parchment + text) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ borderRadius: '14px' }}
          />

          {/* Overlay / cover canvas */}
          <canvas
            ref={overlayRef}
            className="absolute inset-0 w-full h-full"
            style={{
              borderRadius: '14px',
              cursor: completed ? 'default' : 'crosshair',
              opacity: fadeOut ? 0 : 1,
              transition: fadeOut ? 'opacity 1.2s cubic-bezier(0.4,0,0.2,1)' : 'none',
              touchAction: 'none',
            }}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          />

          {/* Completion shimmer overlay */}
          {fadeOut && (
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: 'linear-gradient(135deg, rgba(255,240,180,0.12) 0%, transparent 50%, rgba(255,220,120,0.08) 100%)',
                borderRadius: '14px',
                animation: 'shimmerFade 1.2s ease forwards',
              }}
            />
          )}
        </div>
      </div>

      {/* Next page button — same style as kraf page */}
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

      <style jsx global>{`
        @keyframes shimmerFade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
