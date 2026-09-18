'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FlashCard {
  id: string;
  title: string;
  definition: string;
  color: string;
  colorDark: string;
  colorLight: string;
  accentColor: string;
  imageUrl: string;
  imageAlt: string;
}

const CARDS: FlashCard[] = [
{
  id: 'topeng',
  title: 'Topeng',
  definition: 'Karya kraf berbentuk muka atau wajah yang digunakan sebagai hiasan, persembahan atau simbol budaya.',
  color: '#C0392B',
  colorDark: '#922B21',
  colorLight: '#FADBD8',
  accentColor: '#E74C3C',
  imageUrl: "/assets/images/IMG_2655-1789578005702.jpeg",
  imageAlt: 'Blue and white Venetian mask used as Topeng flashcard cover'
},
{
  id: 'boneka',
  title: 'Boneka',
  definition: 'Karya kraf berbentuk figura yang boleh digerakkan dan digunakan sebagai medium permainan atau persembahan.',
  color: '#1A5276',
  colorDark: '#154360',
  colorLight: '#D6EAF8',
  accentColor: '#2980B9',
  imageUrl: "https://images.unsplash.com/photo-1701756429799-521abeef8219",
  imageAlt: 'Handcrafted traditional puppet doll with colourful fabric costume and articulated limbs for performance'
},
{
  id: 'origami',
  title: 'Origami',
  definition: 'Seni menghasilkan bentuk dan objek melalui teknik melipat kertas tanpa menggunakan gam atau bahan pelekat.',
  color: '#B7770D',
  colorDark: '#9A6A0A',
  colorLight: '#FDEBD0',
  accentColor: '#E67E22',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_121b638df-1772085986369.png",
  imageAlt: 'Delicate origami paper cranes and geometric shapes folded from colourful patterned paper on a wooden surface'
},
{
  id: 'model',
  title: 'Model',
  definition: 'Hasil kraf berbentuk tiga dimensi yang dihasilkan sebagai gambaran atau representasi sesuatu objek, struktur atau idea.',
  color: '#1E8449',
  colorDark: '#196F3D',
  colorLight: '#D5F5E3',
  accentColor: '#27AE60',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4b0bce81e-1789099499272.png",
  imageAlt: 'Detailed three-dimensional scale model of a traditional Malay house with miniature architectural features'
},
{
  id: 'diorama',
  title: 'Diorama',
  definition: 'Persembahan tiga dimensi yang menggambarkan sesuatu suasana, peristiwa atau persekitaran dalam ruang yang terhad.',
  color: '#6E2F8A',
  colorDark: '#5B2475',
  colorLight: '#E8DAEF',
  accentColor: '#8E44AD',
  imageUrl: "https://images.unsplash.com/photo-1683624308509-9acbbb6340d7",
  imageAlt: 'Miniature diorama scene depicting a traditional Malaysian village with tiny handcrafted figures and landscape'
}];


export default function KrafKadPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [btnPressed, setBtnPressed] = useState(false);
  const [selectPressed, setSelectPressed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const goTo = useCallback(
    (index: number, dir: 'left' | 'right') => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      setTimeout(() => {
        setActiveIndex(index);
        setIsAnimating(false);
        setDirection(null);
      }, 420);
    },
    [isAnimating]
  );

  const goPrev = useCallback(() => {
    const newIndex = (activeIndex - 1 + CARDS.length) % CARDS.length;
    goTo(newIndex, 'right');
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    const newIndex = (activeIndex + 1) % CARDS.length;
    goTo(newIndex, 'left');
  }, [activeIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goPrev, goNext]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) goNext();else
      goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    const offset = index - activeIndex;
    const normalizedOffset =
    offset > CARDS.length / 2 ?
    offset - CARDS.length :
    offset < -CARDS.length / 2 ?
    offset + CARDS.length :
    offset;

    const absOffset = Math.abs(normalizedOffset);

    if (absOffset > 2) {
      return { display: 'none' };
    }

    const isActive = normalizedOffset === 0;
    const isLeft = normalizedOffset === -1;
    const isRight = normalizedOffset === 1;
    const isFarLeft = normalizedOffset === -2;
    const isFarRight = normalizedOffset === 2;

    let translateX = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 10;
    let rotateY = 0;

    if (isActive) {
      translateX = 0;
      scale = 1;
      opacity = 1;
      zIndex = 20;
      rotateY = 0;
    } else if (isLeft) {
      translateX = -62;
      scale = 0.82;
      opacity = 0.65;
      zIndex = 15;
      rotateY = 12;
    } else if (isRight) {
      translateX = 62;
      scale = 0.82;
      opacity = 0.65;
      zIndex = 15;
      rotateY = -12;
    } else if (isFarLeft) {
      translateX = -105;
      scale = 0.65;
      opacity = 0.3;
      zIndex = 10;
      rotateY = 22;
    } else if (isFarRight) {
      translateX = 105;
      scale = 0.65;
      opacity = 0.3;
      zIndex = 10;
      rotateY = -22;
    }

    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translateX(calc(-50% + ${translateX}%)) translateY(-50%) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      transition: isAnimating ?
      'transform 0.42s cubic-bezier(0.34,1.2,0.64,1), opacity 0.42s ease' :
      'transform 0.42s cubic-bezier(0.34,1.2,0.64,1), opacity 0.42s ease',
      cursor: isActive ? 'default' : 'pointer',
      pointerEvents: absOffset > 1 ? 'none' : 'auto'
    };
  };

  const activeCard = CARDS[activeIndex];

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ background: '#5C3A1E' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}>
      
      {/* Crumpled brown paper background image */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url('/assets/images/IMG_2660-1789584826042.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />

      {/* Subtle dark overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'rgba(0,0,0,0.18)'
        }} />
      
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.6) 100%)'
        }} />
      

      {/* ── DESK DECORATIONS ── */}
      {/* Pencil cup (left side) */}
      <div className="absolute pointer-events-none z-20" style={{ left: '2%', bottom: '18%' }}>
        <div style={{
          width: 32, height: 40, borderRadius: '4px 4px 8px 8px',
          background: 'linear-gradient(160deg, #D4A96A 0%, #A0724A 100%)',
          border: '2px solid #7A5230',
          boxShadow: '2px 4px 10px rgba(0,0,0,0.4)',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 6px)' }} />
        </div>
        {[
        { left: 3, rotate: -12, color: '#F4D03F', tip: '#2C1A0E' },
        { left: 11, rotate: 5, color: '#E74C3C', tip: '#2C1A0E' },
        { left: 19, rotate: -4, color: '#27AE60', tip: '#2C1A0E' }].
        map((p, i) =>
        <div key={i} style={{
          position: 'absolute', bottom: 32, left: p.left, width: 5, height: 34,
          background: `linear-gradient(180deg, ${p.tip} 0%, ${p.tip} 10%, ${p.color} 10%, ${p.color} 90%, #F5CBA7 90%)`,
          borderRadius: '3px 3px 0 0',
          transform: `rotate(${p.rotate}deg)`,
          transformOrigin: 'bottom center',
          boxShadow: '1px 1px 4px rgba(0,0,0,0.3)'
        }} />
        )}
      </div>

      {/* Sticky note yellow */}
      <div className="absolute pointer-events-none z-20" style={{ left: '1.5%', top: '10%', transform: 'rotate(-4deg)' }}>
        <div style={{
          width: 64, height: 64,
          background: 'linear-gradient(135deg, #FFF176 0%, #F9E400 100%)',
          boxShadow: '2px 4px 12px rgba(0,0,0,0.35)',
          padding: 8, display: 'flex', flexDirection: 'column', gap: 5
        }}>
          {[0, 1, 2].map((i) =>
          <div key={i} style={{ height: 2, background: 'rgba(0,0,0,0.15)', borderRadius: 1 }} />
          )}
        </div>
      </div>

      {/* Sticky note pink */}
      <div className="absolute pointer-events-none z-20" style={{ right: '2%', top: '8%', transform: 'rotate(3deg)' }}>
        <div style={{
          width: 60, height: 60,
          background: 'linear-gradient(135deg, #F8BBD9 0%, #F48FB1 100%)',
          boxShadow: '2px 4px 12px rgba(0,0,0,0.3)',
          padding: 8, display: 'flex', flexDirection: 'column', gap: 5
        }}>
          {[0, 1, 2].map((i) =>
          <div key={i} style={{ height: 2, background: 'rgba(0,0,0,0.12)', borderRadius: 1 }} />
          )}
        </div>
      </div>

      {/* Washi tape strip */}
      <div className="absolute pointer-events-none z-20" style={{ top: 0, left: '28%', width: '20%', height: 13 }}>
        <div style={{
          width: '100%', height: '100%',
          background: 'repeating-linear-gradient(90deg, rgba(255,200,80,0.7), rgba(255,220,120,0.7) 12px, rgba(255,190,60,0.7) 24px)',
          opacity: 0.85, boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
        }} />
      </div>

      {/* Eraser */}
      <div className="absolute pointer-events-none z-20" style={{ right: '3%', bottom: '20%', transform: 'rotate(8deg)' }}>
        <div style={{
          width: 40, height: 18,
          background: 'linear-gradient(180deg, #F1948A 0%, #E74C3C 100%)',
          borderRadius: 3, boxShadow: '2px 3px 8px rgba(0,0,0,0.35)',
          border: '1px solid #C0392B',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontSize: 5, color: 'rgba(255,255,255,0.7)', fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: 1 }}>ERASER</span>
        </div>
      </div>

      {/* Ruler */}
      <div className="absolute pointer-events-none z-20" style={{ left: '5%', bottom: '16%', transform: 'rotate(-6deg)' }}>
        <div style={{
          width: 80, height: 13,
          background: 'linear-gradient(180deg, #AED6F1 0%, #85C1E9 100%)',
          borderRadius: 2, boxShadow: '1px 3px 8px rgba(0,0,0,0.3)',
          border: '1px solid #5DADE2',
          display: 'flex', alignItems: 'flex-end', paddingBottom: 2, paddingLeft: 4, gap: 5, overflow: 'hidden'
        }}>
          {Array.from({ length: 10 }).map((_, i) =>
          <div key={i} style={{ width: 1, height: i % 3 === 0 ? 6 : 4, background: 'rgba(0,0,0,0.3)', flexShrink: 0 }} />
          )}
        </div>
      </div>

      {/* Back button */}
      <Link
        href="/projects/kraf/buku"
        className="absolute top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
        style={{
          background: 'var(--sticker-white, rgba(255,255,255,0.92))',
          boxShadow: '2px 4px 12px rgba(0,0,0,0.3)',
          color: '#3D2B1F',
          fontWeight: 700,
          fontSize: '0.85rem',
          textDecoration: 'none'
        }}>
        
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </Link>

      {/* ── TITLE ── */}
      <div className="absolute z-30 w-full flex justify-center" style={{ top: '4%' }}>
        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            color: 'rgba(255,240,200,0.95)',
            fontWeight: 900,
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.08em',
            textShadow: '0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1)',
            lineHeight: 1
          }}>
          
          Kraf
        </h1>
      </div>

      {/* ── CAROUSEL AREA ── */}
      <div
        ref={containerRef}
        className="absolute z-20"
        style={{
          top: '13%',
          bottom: '16%',
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        
        {/* Cards container */}
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {CARDS.map((card, index) => {
            const cardStyle = getCardStyle(index);
            if (cardStyle.display === 'none') return null;

            const isActive = index === activeIndex;

            return (
              <div
                key={card.id}
                style={cardStyle}
                onClick={() => {
                  if (!isActive) {
                    const offset = index - activeIndex;
                    const normalizedOffset =
                    offset > CARDS.length / 2 ?
                    offset - CARDS.length :
                    offset < -CARDS.length / 2 ?
                    offset + CARDS.length :
                    offset;
                    if (normalizedOffset < 0) goPrev();else
                    goNext();
                  }
                }}>
                
                {/* Flash Card */}
                <div
                  style={{
                    width: 'clamp(160px, 22vw, 280px)',
                    height: 'clamp(280px, 52vh, 520px)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: isActive ?
                    `0 28px 80px rgba(0,0,0,0.65), 0 8px 24px rgba(0,0,0,0.45), 4px 4px 0 rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.25)` :
                    `0 12px 40px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.3)`,
                    background: `linear-gradient(165deg, ${card.color} 0%, ${card.colorDark} 60%, rgba(0,0,0,0.2) 100%)`,
                    transition: 'box-shadow 0.42s ease'
                  }}>
                  
                  {/* Paper texture overlay */}
                  <div style={{
                    position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                    backgroundImage: `
                      repeating-linear-gradient(0deg, transparent 0px, transparent 18px, rgba(255,255,255,0.04) 18px, rgba(255,255,255,0.04) 19px),
                      repeating-linear-gradient(90deg, transparent 0px, transparent 18px, rgba(255,255,255,0.02) 18px, rgba(255,255,255,0.02) 19px)
                    `
                  }} />

                  {/* Card shine */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: '50%', height: '35%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                    zIndex: 2, pointerEvents: 'none'
                  }} />

                  {/* Decorative border inset */}
                  <div style={{
                    position: 'absolute', inset: 8, border: '1.5px solid rgba(255,255,255,0.22)',
                    borderRadius: 10, zIndex: 2, pointerEvents: 'none'
                  }} />

                  {/* Corner ornaments */}
                  <div style={{ position: 'absolute', top: 14, left: 14, width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderRadius: 2, zIndex: 3, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: 14, right: 14, width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderRadius: 2, zIndex: 3, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: 14, left: 14, width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderRadius: 2, zIndex: 3, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: 14, right: 14, width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderRadius: 2, zIndex: 3, pointerEvents: 'none' }} />

                  {/* Card content */}
                  <div style={{
                    position: 'absolute', inset: 0, zIndex: 4,
                    display: 'flex', flexDirection: 'column',
                    padding: 'clamp(14px, 2.5vw, 22px)',
                    gap: 'clamp(8px, 1.5vh, 14px)'
                  }}>
                    {/* Title */}
                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                      <h2 style={{
                        color: 'rgba(255,255,255,0.98)',
                        fontFamily: 'Georgia, serif',
                        fontWeight: 900,
                        fontSize: 'clamp(1rem, 2.2vw, 1.6rem)',
                        letterSpacing: '0.06em',
                        textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                        lineHeight: 1.1,
                        margin: 0
                      }}>
                        {card.title}
                      </h2>
                      {/* Underline accent */}
                      <div style={{
                        width: 'clamp(28px, 4vw, 44px)', height: 2.5, borderRadius: 2,
                        background: 'rgba(255,255,255,0.55)',
                        margin: '6px auto 0'
                      }} />
                    </div>

                    {/* Image */}
                    <div style={{
                      flex: 1,
                      borderRadius: 10,
                      overflow: 'hidden',
                      boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
                      border: '2.5px solid rgba(255,255,255,0.28)',
                      minHeight: 0,
                      position: 'relative'
                    }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={card.imageUrl}
                        alt={card.imageAlt}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.style.background = `linear-gradient(135deg, ${card.colorDark} 0%, rgba(0,0,0,0.4) 100%)`;
                            parent.style.display = 'flex';
                            parent.style.alignItems = 'center';
                            parent.style.justifyContent = 'center';
                          }
                        }} />
                      
                    </div>

                    {/* Definition */}
                    <div style={{
                      flexShrink: 0,
                      background: 'rgba(0,0,0,0.28)',
                      borderRadius: 8,
                      padding: 'clamp(8px, 1.2vw, 12px)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255,255,255,0.12)'
                    }}>
                      <p style={{
                        color: 'rgba(255,255,255,0.93)',
                        fontFamily: 'Georgia, serif',
                        fontSize: 'clamp(0.6rem, 1.1vw, 0.8rem)',
                        lineHeight: 1.65,
                        margin: 0,
                        textAlign: 'center',
                        fontStyle: 'italic'
                      }}>
                        &ldquo;{card.definition}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Page edge effect (right side) */}
                  <div style={{
                    position: 'absolute', right: 0, top: 4, bottom: 4, width: 6,
                    background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)',
                    borderRadius: '0 14px 14px 0',
                    zIndex: 5
                  }} />
                  {/* Bottom edge */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 4, right: 4, height: 5,
                    background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, rgba(0,0,0,0.08) 1px, rgba(0,0,0,0.08) 2px)',
                    borderRadius: '0 0 14px 14px',
                    zIndex: 5
                  }} />
                </div>
              </div>);

          })}
        </div>
      </div>

      {/* ── NAVIGATION ARROWS ── */}
      {/* Left arrow */}
      <button
        onClick={goPrev}
        aria-label="Previous card"
        style={{
          position: 'absolute',
          left: 'clamp(8px, 2vw, 24px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          width: 'clamp(36px, 5vw, 52px)',
          height: 'clamp(36px, 5vw, 52px)',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
          color: 'rgba(255,240,200,0.9)'
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.22)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1.12)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1)';
        }}>
        
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 15L8 10L13 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={goNext}
        aria-label="Next card"
        style={{
          position: 'absolute',
          right: 'clamp(8px, 2vw, 24px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          width: 'clamp(36px, 5vw, 52px)',
          height: 'clamp(36px, 5vw, 52px)',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
          color: 'rgba(255,240,200,0.9)'
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.22)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1.12)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1)';
        }}>
        
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5L12 10L7 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── INDICATOR DOTS + COUNTER ── */}
      <div
        className="absolute z-30"
        style={{
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8
        }}>
        
        {/* Counter */}
        <div style={{
          color: 'rgba(255,230,180,0.7)',
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
          fontWeight: 700,
          letterSpacing: '0.1em'
        }}>
          {activeIndex + 1} / {CARDS.length}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {CARDS.map((card, index) =>
          <button
            key={card.id}
            onClick={() => {
              if (index !== activeIndex) {
                goTo(index, index > activeIndex ? 'left' : 'right');
              }
            }}
            aria-label={`Go to card ${index + 1}`}
            style={{
              width: index === activeIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              background: index === activeIndex ?
              activeCard.accentColor :
              'rgba(255,255,255,0.3)',
              transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
              padding: 0,
              boxShadow: index === activeIndex ?
              `0 2px 8px ${activeCard.accentColor}88` :
              'none'
            }} />

          )}
        </div>
      </div>

      {/* ── SELECT BUTTON ── */}
      <div
        className="absolute z-30"
        style={{
          bottom: '7.5%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'center',
          opacity: isAnimating ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}>
        <button
          onClick={() => {
            router.push(`/projects/kraf/buku/kad/${CARDS[activeIndex].id}`);
          }}
          onMouseDown={() => setSelectPressed(true)}
          onMouseUp={() => setSelectPressed(false)}
          onMouseLeave={() => setSelectPressed(false)}
          onTouchStart={() => setSelectPressed(true)}
          onTouchEnd={() => setSelectPressed(false)}
          style={{
            padding: 'clamp(8px, 1.2vw, 12px) clamp(24px, 4vw, 44px)',
            borderRadius: 50,
            border: `2px solid ${CARDS[activeIndex].accentColor}`,
            background: selectPressed ?
            CARDS[activeIndex].accentColor :
            `rgba(0,0,0,0.35)`,
            backdropFilter: 'blur(8px)',
            color: 'rgba(255,245,210,0.97)',
            fontFamily: 'Georgia, serif',
            fontWeight: 800,
            fontSize: 'clamp(0.75rem, 1.4vw, 1rem)',
            letterSpacing: '0.12em',
            cursor: 'pointer',
            boxShadow: selectPressed ?
            `0 2px 16px ${CARDS[activeIndex].accentColor}88` :
            `0 6px 24px rgba(0,0,0,0.45), 0 2px 8px ${CARDS[activeIndex].accentColor}55`,
            transform: selectPressed ? 'scale(0.96)' : 'scale(1)',
            transition: 'all 0.18s cubic-bezier(0.34,1.56,0.64,1)',
            textTransform: 'uppercase'
          }}>
          
          Select
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>);

}