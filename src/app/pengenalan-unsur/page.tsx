'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Vec2 {x: number;y: number;}

interface Block {
  id: number;
  label: string;
  labelIndex: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  angularVel: number;
  size: number;
  mass: number;
  restitution: number;
  isGrabbed: boolean;
  pressScale: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const LABELS = ['Garisan', 'Bentuk', 'Rupa', 'Warna', 'Jalinan', 'Ruang'];

const DESCRIPTIONS: Record<string, string> = {
  Garisan: 'Garisan merupakan kesan pergerakan titik yang mempunyai arah, panjang dan bentuk tertentu. Dalam karya tiga dimensi, garisan dapat membentuk kontur, corak, struktur dan arah pergerakan sesuatu karya.',
  Rupa: 'Rupa ialah bentuk dua dimensi yang mempunyai panjang dan lebar. Rupa boleh digunakan sebagai asas untuk menghasilkan bentuk tiga dimensi melalui proses melipat, memotong, membentuk atau membina.',
  Bentuk: 'Bentuk mempunyai ciri tiga dimensi, iaitu panjang, lebar dan tinggi. Bentuk merupakan unsur utama dalam bidang Membentuk dan Membuat Binaan kerana menjadi asas kepada penghasilan objek dan karya tiga dimensi.',
  Jalinan: 'Jalinan merujuk kepada sifat atau keadaan permukaan sesuatu objek yang dapat dilihat atau dirasai melalui sentuhan. Dalam karya, jalinan boleh terhasil daripada sifat semula jadi bahan atau teknik yang digunakan oleh pengkarya.',
  Ruang: 'Ruang ialah kawasan atau jarak yang wujud di dalam, di antara dan di sekeliling sesuatu bentuk. Dalam karya tiga dimensi, pengolahan ruang dapat mewujudkan kedalaman serta hubungan antara karya dengan persekitarannya.',
  Warna: 'Warna merupakan unsur visual yang terhasil melalui pantulan cahaya dan digunakan untuk mewujudkan kesan visual, suasana, penegasan serta harmoni dalam karya.'
};

// Colors per unsur
const BLOCK_COLORS: Record<string, {hex: string;soft: string;text: string;}> = {
  Garisan: { hex: '#C8384A', soft: '#FDECEA', text: '#6A0F18' },
  Bentuk: { hex: '#2272C3', soft: '#E3F2FD', text: '#0A3A6E' },
  Rupa: { hex: '#D4780A', soft: '#FFF3E0', text: '#6B2E00' },
  Warna: { hex: '#7B2FA0', soft: '#F3E5F5', text: '#3A0A5A' },
  Jalinan: { hex: '#2E8B4A', soft: '#E8F5E9', text: '#0F3D1C' },
  Ruang: { hex: '#C04A20', soft: '#FBE9E7', text: '#5A1800' }
};

// Accurate images representing each unsur seni
const UNSUR_IMAGES: Record<string, {url: string;alt: string;}> = {
  Garisan: { url: "https://img.rocket.new/generatedImages/rocket_gen_img_4d8c66ee2-1789672040010.png", alt: 'Garisan — pelbagai jenis garisan dalam seni visual' },
  Bentuk: { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e9bbbe3f-1768072247113.png', alt: 'Bentuk — objek tiga dimensi dalam seni' },
  Rupa: { url: "https://images.unsplash.com/photo-1722440814495-3d2d3107a7de", alt: 'Rupa — bentuk dua dimensi dan corak geometri' },
  Warna: { url: "https://images.unsplash.com/photo-1718987629067-ba156dbe7eeb", alt: 'Warna — palet warna yang pelbagai dalam seni visual' },
  Jalinan: { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_105d4d7c1-1772159759723.png', alt: 'Jalinan — tekstur dan permukaan bahan seni' },
  Ruang: { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1be06fa2b-1768309421248.png', alt: 'Ruang — kedalaman dan ruang dalam karya seni tiga dimensi' }
};

// Emoji per unsur for extra personality
const UNSUR_EMOJI: Record<string, string> = {
  Garisan: '〰️',
  Bentuk: '🔷',
  Rupa: '🟡',
  Warna: '🎨',
  Jalinan: '🧶',
  Ruang: '🌌'
};

// ─── Cute File Icon SVG ───────────────────────────────────────────────────────
// A document/file icon: rectangular body with folded top-right corner, label on body
function FileIcon({ label, color, size }: { label: string; color: string; size: number }) {
  const w = size;
  const h = size * 1.28;
  const fold = size * 0.22;
  const foldColor = lightenHex(color, 0.28);
  const gradId = `grad-${label}`;
  const glowId = `glow-${label}`;
  const shadowId = `shadow-${label}`;
  const glossId = `gloss-${label}`;

  // Gradient stops: lighter at top, richer at bottom
  const colorLight = lightenHex(color, 0.22);
  const colorDark = darkenHex(color, 0.12);

  const rawFontSize = size * 0.175;
  const fontSize = Math.max(7, Math.min(rawFontSize, 13));
  const emojiFontSize = Math.max(10, Math.min(size * 0.28, 22));

  const emoji = UNSUR_EMOJI[label] ?? '📄';

  // Rounded rect path for file body (manual, since SVG rect + clip is simpler)
  const r = size * 0.09; // corner radius
  // Body path: top-left rounded, top-right has fold cut, bottom-right rounded, bottom-left rounded
  const bodyPath = [
    `M ${r} 0`,
    `L ${w - fold} 0`,
    `L ${w} ${fold}`,
    `L ${w} ${h - r}`,
    `Q ${w} ${h} ${w - r} ${h}`,
    `L ${r} ${h}`,
    `Q 0 ${h} 0 ${h - r}`,
    `L 0 ${r}`,
    `Q 0 0 ${r} 0`,
    `Z`
  ].join(' ');

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', overflow: 'visible' }}>

      <defs>
        {/* Main gradient — top lighter, bottom richer */}
        <linearGradient id={gradId} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={colorLight} />
          <stop offset="100%" stopColor={colorDark} />
        </linearGradient>

        {/* Gloss overlay gradient */}
        <linearGradient id={glossId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.38)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Soft glow */}
        <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor={color} floodOpacity="0.35" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Drop shadow */}
        <filter id={shadowId} x="-25%" y="-15%" width="150%" height="145%">
          <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="rgba(0,0,0,0.5)" />
        </filter>

        {/* Clip path for gloss to stay inside body */}
        <clipPath id={`clip-${label}`}>
          <path d={bodyPath} />
        </clipPath>
      </defs>

      {/* Glow halo behind icon */}
      <ellipse cx={w / 2} cy={h * 0.88} rx={w * 0.42} ry={h * 0.07} fill={color} opacity="0.22" />

      {/* File body with gradient */}
      <path
        d={bodyPath}
        fill={`url(#${gradId})`}
        filter={`url(#${shadowId})`}
      />

      {/* Gloss highlight clipped to body */}
      <g clipPath={`url(#clip-${label})`}>
        <rect x="0" y="0" width={w} height={h * 0.52} fill={`url(#${glossId})`} />
      </g>

      {/* Fold triangle — lighter shade */}
      <path
        d={`M ${w - fold} 0 L ${w} ${fold} L ${w - fold} ${fold} Z`}
        fill={foldColor}
        opacity="0.9"
      />

      {/* Fold crease line */}
      <path
        d={`M ${w - fold} 0 L ${w - fold} ${fold} L ${w} ${fold}`}
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="0.9"
        fill="none"
      />

      {/* Subtle inner border for depth */}
      <path
        d={bodyPath}
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
      />

      {/* Emoji centred in upper half */}
      <text
        x={w / 2}
        y={h * 0.36}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={emojiFontSize}
        style={{ userSelect: 'none' }}>
        {emoji}
      </text>

      {/* Decorative ruled lines */}
      <line x1={w * 0.18} y1={h * 0.60} x2={w * 0.82} y2={h * 0.60} stroke="rgba(255,255,255,0.32)" strokeWidth="1.1" strokeLinecap="round" />
      <line x1={w * 0.18} y1={h * 0.71} x2={w * 0.82} y2={h * 0.71} stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeLinecap="round" />
      <line x1={w * 0.18} y1={h * 0.82} x2={w * 0.60} y2={h * 0.82} stroke="rgba(255,255,255,0.14)" strokeWidth="0.9" strokeLinecap="round" />

      {/* Label text */}
      <text
        x={w / 2}
        y={h * 0.915}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ffffff"
        fontSize={fontSize}
        fontWeight="800"
        fontFamily='"Segoe UI", "Inter", Arial, sans-serif'
        letterSpacing="0.04em"
        opacity="0.95">
        {label}
      </text>
    </svg>
  );
}

// Simple hex lightener
function lightenHex(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + Math.round(255 * amount));
  const g = Math.min(255, ((num >> 8) & 0xff) + Math.round(255 * amount));
  const b = Math.min(255, (num & 0xff) + Math.round(255 * amount));
  return `rgb(${r},${g},${b})`;
}

// Simple hex darkener
function darkenHex(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - Math.round(255 * amount));
  const g = Math.max(0, ((num >> 8) & 0xff) - Math.round(255 * amount));
  const b = Math.max(0, (num & 0xff) - Math.round(255 * amount));
  return `rgb(${r},${g},${b})`;
}

function randomBetween(a: number, b: number) {return a + Math.random() * (b - a);}

function createBlocks(canvasW: number): Block[] {
  const blocks: Block[] = [];
  let id = 0;
  for (let li = 0; li < LABELS.length; li++) {
    for (let copy = 0; copy < 2; copy++) {
      const size = randomBetween(44, 58);
      blocks.push({
        id: id++,
        label: LABELS[li],
        labelIndex: li,
        x: randomBetween(canvasW * 0.1, canvasW * 0.9),
        y: randomBetween(-320, -40) - id * 65,
        vx: randomBetween(-1.5, 1.5),
        vy: randomBetween(0.5, 2),
        angle: randomBetween(-0.18, 0.18),
        angularVel: randomBetween(-0.02, 0.02),
        size,
        mass: 1,
        restitution: 0.42,
        isGrabbed: false,
        pressScale: 1.0
      });
    }
  }
  return blocks;
}

function getHalfSize(block: Block) {return block.size * 1.05;}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PengenalanUnsurPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<Block[]>([]);
  const grabRef = useRef<{id: number;offsetX: number;offsetY: number;} | null>(null);
  const velHistRef = useRef<Vec2[]>([]);
  const lastMouseRef = useRef<{x: number;y: number;t: number;}>({ x: 0, y: 0, t: 0 });
  const containerSizeRef = useRef<{w: number;h: number;}>({ w: 0, h: 0 });
  const lastTapRef = useRef<{id: number;time: number;} | null>(null);
  const animFrameRef = useRef<number>(0);

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeDescription, setActiveDescription] = useState<string | null>(null);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [descVisible, setDescVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

  const gravityRef = useRef(0.45);
  const bouncinessRef = useRef(0.42);
  const frictionRef = useRef(0.16);
  const throwPowerRef = useRef(1.3);

  const initBlocks = useCallback((w: number) => {
    const newBlocks = createBlocks(w);
    blocksRef.current = newBlocks;
    setBlocks([...newBlocks]);
  }, []);

  // ─── Physics loop ─────────────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      containerSizeRef.current = { w, h };
      if (blocksRef.current.length === 0) initBlocks(w);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const WALL = 10;

    const tick = () => {
      const { w: W, h: H } = containerSizeRef.current;
      const g = gravityRef.current;
      const bounce = bouncinessRef.current;
      const fric = frictionRef.current;
      const bls = blocksRef.current;

      for (const bl of bls) {
        const targetScale = bl.isGrabbed ? 1.1 : 1.0;
        bl.pressScale += (targetScale - bl.pressScale) * 0.18;
        if (bl.isGrabbed) continue;

        bl.vy += g;
        bl.vx *= 1 - fric * 0.04;
        bl.x += bl.vx;
        bl.y += bl.vy;
        bl.angle += bl.angularVel;
        bl.angularVel *= 0.98;

        const hs = getHalfSize(bl);
        if (bl.y + hs > H - WALL) {bl.y = H - WALL - hs;bl.vy *= -bounce;bl.vx *= 1 - fric * 0.35;bl.angularVel *= 0.82;if (Math.abs(bl.vy) < 0.6) bl.vy = 0;}
        if (bl.y - hs < WALL) {bl.y = WALL + hs;bl.vy *= -bounce;}
        if (bl.x - hs < WALL) {bl.x = WALL + hs;bl.vx *= -bounce;bl.angularVel *= 0.8;}
        if (bl.x + hs > W - WALL) {bl.x = W - WALL - hs;bl.vx *= -bounce;bl.angularVel *= 0.8;}
      }

      // Block-to-block collision
      for (let i = 0; i < bls.length; i++) {
        for (let j = i + 1; j < bls.length; j++) {
          const a = bls[i],b = bls[j];
          const ra = getHalfSize(a),rb = getHalfSize(b);
          const dx = b.x - a.x,dy = b.y - a.y;
          const overlapX = ra + rb - Math.abs(dx);
          const overlapY = ra + rb - Math.abs(dy);
          if (overlapX > 0 && overlapY > 0) {
            if (overlapX < overlapY) {
              const nx = dx > 0 ? 1 : -1;
              a.x -= nx * overlapX * 0.5;b.x += nx * overlapX * 0.5;
              const relVx = b.vx - a.vx;
              if (relVx * nx < 0) {const imp = -(1 + bouncinessRef.current) * relVx * nx / 2;a.vx -= imp * nx;b.vx += imp * nx;a.angularVel += relVx * 0.03;b.angularVel -= relVx * 0.03;}
            } else {
              const ny = dy > 0 ? 1 : -1;
              a.y -= ny * overlapY * 0.5;b.y += ny * overlapY * 0.5;
              const relVy = b.vy - a.vy;
              if (relVy * ny < 0) {const imp = -(1 + bouncinessRef.current) * relVy * ny / 2;a.vy -= imp * ny;b.vy += imp * ny;}
            }
          }
        }
      }

      setBlocks([...bls]);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {cancelAnimationFrame(animFrameRef.current);ro.disconnect();};
  }, [initBlocks]);

  // ─── Pointer helpers ──────────────────────────────────────────────────────
  const getContainerPos = (e: React.MouseEvent | React.TouchEvent) => {
    const container = containerRef.current!;
    const rect = container.getBoundingClientRect();
    let cx: number, cy: number;
    if ('touches' in e) {
      cx = e.touches[0]?.clientX ?? lastMouseRef.current.x;
      cy = e.touches[0]?.clientY ?? lastMouseRef.current.y;
    } else {
      cx = (e as React.MouseEvent).clientX;
      cy = (e as React.MouseEvent).clientY;
    }
    return { x: cx - rect.left, y: cy - rect.top };
  };

  const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getContainerPos(e);
    const now = Date.now();
    const bls = blocksRef.current;

    for (let i = bls.length - 1; i >= 0; i--) {
      const bl = bls[i];
      const hs = getHalfSize(bl);
      if (Math.abs(pos.x - bl.x) < hs && Math.abs(pos.y - bl.y) < hs) {
        const lastTap = lastTapRef.current;
        if (lastTap && lastTap.id === bl.id && now - lastTap.time < 350) {
          setActiveLabel(bl.label);
          setActiveDescription(DESCRIPTIONS[bl.label] ?? '');
          setDescVisible(true);
          setImgError(false);
          lastTapRef.current = null;
        } else {
          lastTapRef.current = { id: bl.id, time: now };
        }
        bl.isGrabbed = true;bl.vx = 0;bl.vy = 0;bl.angularVel = 0;
        grabRef.current = { id: bl.id, offsetX: pos.x - bl.x, offsetY: pos.y - bl.y };
        velHistRef.current = [];
        lastMouseRef.current = { x: pos.x, y: pos.y, t: now };
        break;
      }
    }
  };

  const onPointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!grabRef.current) return;
    const pos = getContainerPos(e);
    const bl = blocksRef.current.find((s) => s.id === grabRef.current!.id);
    if (!bl) return;
    bl.x = pos.x - grabRef.current.offsetX;
    bl.y = pos.y - grabRef.current.offsetY;
    const now = Date.now();
    const dt = Math.max(1, now - lastMouseRef.current.t);
    velHistRef.current.push({ x: (pos.x - lastMouseRef.current.x) / dt * 16, y: (pos.y - lastMouseRef.current.y) / dt * 16 });
    if (velHistRef.current.length > 6) velHistRef.current.shift();
    lastMouseRef.current = { x: pos.x, y: pos.y, t: now };
  };

  const onPointerUp = useCallback(() => {
    if (!grabRef.current) return;
    const bl = blocksRef.current.find((s) => s.id === grabRef.current!.id);
    if (bl) {
      bl.isGrabbed = false;
      const hist = velHistRef.current;
      if (hist.length > 0) {
        const avgVx = hist.reduce((s, v) => s + v.x, 0) / hist.length;
        const avgVy = hist.reduce((s, v) => s + v.y, 0) / hist.length;
        const tp = throwPowerRef.current;
        bl.vx = avgVx * tp;bl.vy = avgVy * tp;bl.angularVel = avgVx * 0.035 * tp;
      }
    }
    grabRef.current = null;velHistRef.current = [];
  }, []);

  const activeColors = activeLabel ? BLOCK_COLORS[activeLabel] : null;
  const activeImage = activeLabel ? UNSUR_IMAGES[activeLabel] : null;

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ fontFamily: '"Georgia", serif', display: 'flex', flexDirection: 'column' }}>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2667-1789661380498.jpeg" alt="Latar belakang meja kayu" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div className="absolute inset-0" style={{ background: 'rgba(40,20,5,0.38)' }} />
      </div>

      {/* Title bar */}
      <div className="relative z-10 flex justify-center pt-4 pb-2 px-4 flex-shrink-0">
        <div style={{ background: 'rgba(60,30,10,0.82)', backdropFilter: 'blur(14px)', borderRadius: '14px', padding: '9px 32px', border: '1.5px solid rgba(210,160,80,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,220,140,0.15)' }}>
          <h1 style={{ fontFamily: '"Georgia", "Times New Roman", serif', fontSize: 'clamp(0.85rem, 2.2vw, 1.25rem)', fontWeight: 700, color: '#F0D090', letterSpacing: '0.06em', margin: 0, textShadow: '0 1px 8px rgba(180,100,20,0.6)' }}>
            1.3.1 Unsur Seni
          </h1>
        </div>
      </div>

      {/* Physics area */}
      <div className="relative z-10 flex flex-1 mx-3 mb-3 overflow-hidden" style={{ minHeight: 0 }}>
        <div
          ref={containerRef}
          className="relative flex-1 rounded-2xl overflow-hidden"
          style={{
            border: '1.5px solid rgba(180,120,50,0.4)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            background: 'rgba(40,20,5,0.12)',
            minWidth: 0,
            touchAction: 'none',
            cursor: grabRef.current ? 'grabbing' : 'grab'
          }}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}>
          
          {/* Render cute file icons as DOM elements */}
          {blocks.map((bl) => {
            const s = bl.size;
            const iconW = s * 2;
            const iconH = iconW * 1.28;
            const sc = bl.pressScale ?? 1.0;
            const color = BLOCK_COLORS[bl.label]?.hex ?? '#888888';
            // Stagger float animation offset per block id
            const floatDelay = (bl.id * 0.37) % 2.4;

            return (
              <div
                key={bl.id}
                style={{
                  position: 'absolute',
                  left: bl.x - iconW / 2,
                  top: bl.y - iconH / 2,
                  width: iconW,
                  height: iconH,
                  transform: `rotate(${bl.angle}rad) scale(${sc})`,
                  transformOrigin: `${iconW / 2}px ${iconH / 2}px`,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  filter: bl.isGrabbed ? `drop-shadow(0 6px 16px ${color}88)` : `drop-shadow(0 2px 6px ${color}55)`,
                  transition: 'filter 0.15s ease'
                }}>
                <FileIcon label={bl.label} color={color} size={iconW} />
              </div>
            );
          })}

          {/* Instruction hint */}
          <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(50,25,8,0.80)', backdropFilter: 'blur(8px)', borderRadius: '20px', padding: '5px 18px', border: '1px solid rgba(200,150,70,0.35)', color: 'rgba(240,210,150,0.95)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', pointerEvents: 'none', whiteSpace: 'nowrap', fontFamily: '"Segoe UI", sans-serif' }}>
            sentuh ikon 👆🏻
          </div>
        </div>
      </div>

      {/* Description overlay */}
      {descVisible && activeLabel && activeColors &&
      <div
        style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(20,10,3,0.60)', backdropFilter: 'blur(5px)', padding: '20px' }}
        onClick={() => setDescVisible(false)}>
        
          <div
          style={{ background: activeColors.soft, borderRadius: '22px', border: `3px solid ${activeColors.hex}`, boxShadow: `0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px ${activeColors.hex}44`, maxWidth: '460px', width: '100%', position: 'relative', overflow: 'hidden' }}
          onClick={(e) => e.stopPropagation()}>
          
            {/* Header strip */}
            <div style={{ background: activeColors.hex, padding: '16px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontFamily: '"Segoe UI", "Arial", sans-serif', fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '0.02em', textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
                  {activeLabel}
                </h2>
              </div>
              <button onClick={() => setDescVisible(false)} style={{ background: 'rgba(255,255,255,0.25)', border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ffffff', fontSize: '14px', fontWeight: 700, lineHeight: 1, flexShrink: 0 }}>✕</button>
            </div>

            {/* Image */}
            {activeImage && !imgError &&
          <div style={{ width: '100%', height: '160px', overflow: 'hidden', position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeImage.url} alt={activeImage.alt} onError={() => setImgError(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: `${activeColors.hex}22` }} />
              </div>
          }

            {/* Body */}
            <div style={{ padding: '18px 22px 20px' }}>
              <div style={{ display: 'inline-block', background: activeColors.hex, color: '#ffffff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '20px', padding: '3px 12px', marginBottom: '12px', fontFamily: '"Segoe UI", sans-serif' }}>
                Unsur Seni
              </div>
              <p style={{ color: activeColors.text, fontSize: 'clamp(0.88rem, 2vw, 1rem)', lineHeight: 1.75, margin: 0, fontFamily: '"Georgia", serif', fontWeight: 500 }}>
                {activeDescription}
              </p>
            </div>
          </div>
        </div>
      }

      {/* Navigation */}
      <div className="relative z-10 flex justify-between items-center px-6 pb-4 pt-1 flex-shrink-0">
        <Link href="/pengenalan-up">
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(50,25,8,0.82)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(180,120,50,0.45)', borderRadius: '50px', padding: '10px 24px', fontWeight: 700, fontSize: '14px', color: '#E8C880', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', fontFamily: '"Segoe UI", sans-serif' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Kembali
          </button>
        </Link>

        <button
          onClick={() => {blocksRef.current = [];initBlocks(containerSizeRef.current.w);setActiveDescription(null);setActiveLabel(null);setDescVisible(false);}}
          style={{ background: 'rgba(180,120,50,0.18)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(180,120,50,0.4)', borderRadius: '50px', padding: '10px 16px', fontWeight: 700, fontSize: '16px', color: '#E8C880', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px' }}
          title="Jana Semula">
          🔄</button>

        <Link href="/pengenalan-prinsip">
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(160,100,30,0.88)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(210,160,80,0.6)', borderRadius: '50px', padding: '10px 24px', fontWeight: 700, fontSize: '14px', color: '#FFF0C8', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', fontFamily: '"Segoe UI", sans-serif' }}>
            Seterusnya
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </Link>
      </div>
    </div>);

}