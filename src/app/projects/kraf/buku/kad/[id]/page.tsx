'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
  imageUrl: 'https://img.rocket.new/generatedImages/rocket_gen_img_1643d766c-1772506417318.png',
  imageAlt: 'Colourful traditional Malay wooden mask with intricate painted patterns used in cultural performances'
},
{
  id: 'boneka',
  title: 'Boneka',
  definition: 'Karya kraf berbentuk figura yang boleh digerakkan dan digunakan sebagai medium permainan atau persembahan.',
  color: '#1A5276',
  colorDark: '#154360',
  colorLight: '#D6EAF8',
  accentColor: '#2980B9',
  imageUrl: 'https://images.unsplash.com/photo-1701756429799-521abeef8219',
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
  imageUrl: 'https://img.rocket.new/generatedImages/rocket_gen_img_121b638df-1772085986369.png',
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
  imageUrl: 'https://img.rocket.new/generatedImages/rocket_gen_img_4b0bce81e-1789099499272.png',
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
  imageUrl: 'https://images.unsplash.com/photo-1683624308509-9acbbb6340d7',
  imageAlt: 'Miniature diorama scene depicting a traditional Malaysian village with tiny handcrafted figures and landscape'
}];


export default function KadDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);

  const card = CARDS.find((c) => c.id === id);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  if (!card) {
    return (
      <div className="w-full h-screen flex items-center justify-center" style={{ background: '#5C3A1E' }}>
        <div style={{ color: 'rgba(255,240,200,0.9)', fontFamily: 'Georgia, serif', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: 16 }}>Kad tidak dijumpai.</p>
          <Link href="/projects/kraf/buku/kad" style={{ color: '#E67E22', textDecoration: 'underline' }}>
            Kembali
          </Link>
        </div>
      </div>);

  }

  const currentIndex = CARDS.findIndex((c) => c.id === id);
  const prevCard = CARDS[(currentIndex - 1 + CARDS.length) % CARDS.length];
  const nextCard = CARDS[(currentIndex + 1) % CARDS.length];

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ background: '#5C3A1E' }}>
      
      {/* Wood grain */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(178deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 52px),
            repeating-linear-gradient(182deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 36px),
            repeating-linear-gradient(175deg, rgba(255,200,100,0.02) 0px, rgba(255,200,100,0.02) 2px, transparent 2px, transparent 80px)
          `
        }} />
      

      {/* Warm ambient light */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(255,230,160,0.18) 0%, transparent 65%)'
        }} />
      

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.6) 100%)'
        }} />
      

      {/* Decorations */}
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

      {/* Washi tape */}
      <div className="absolute pointer-events-none z-20" style={{ top: 0, left: '28%', width: '20%', height: 13 }}>
        <div style={{
          width: '100%', height: '100%',
          background: 'repeating-linear-gradient(90deg, rgba(255,200,80,0.7), rgba(255,220,120,0.7) 12px, rgba(255,190,60,0.7) 24px)',
          opacity: 0.85, boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
        }} />
      </div>

      {/* Back button */}
      <Link
        href="/projects/kraf/buku/kad"
        className="absolute top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
        style={{
          background: 'rgba(255,255,255,0.92)',
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

      {/* Title */}
      <div className="absolute z-30 w-full flex justify-center" style={{ top: '4%' }}>
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            color: 'rgba(255,240,200,0.95)',
            fontWeight: 900,
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.08em',
            textShadow: '0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1)',
            lineHeight: 1
          }}>
          
          {card.title}
        </h1>
      </div>

      {/* Main card — centered, large */}
      <div
        className="absolute z-30"
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${entered ? 1 : 0.85})`,
          opacity: entered ? 1 : 0,
          transition: 'transform 0.55s cubic-bezier(0.34,1.2,0.64,1), opacity 0.45s ease'
        }}>
        
        <div
          style={{
            width: 'clamp(220px, 38vw, 420px)',
            height: 'clamp(360px, 65vh, 680px)',
            borderRadius: 20,
            overflow: 'hidden',
            position: 'relative',
            boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 12px 32px rgba(0,0,0,0.5), 6px 6px 0 rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.25)`,
            background: `linear-gradient(165deg, ${card.color} 0%, ${card.colorDark} 60%, rgba(0,0,0,0.2) 100%)`
          }}>
          
          {/* Paper texture */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent 0px, transparent 18px, rgba(255,255,255,0.04) 18px, rgba(255,255,255,0.04) 19px),
              repeating-linear-gradient(90deg, transparent 0px, transparent 18px, rgba(255,255,255,0.02) 18px, rgba(255,255,255,0.02) 19px)
            `
          }} />

          {/* Shine */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: '50%', height: '35%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 100%)',
            zIndex: 2, pointerEvents: 'none'
          }} />

          {/* Inset border */}
          <div style={{
            position: 'absolute', inset: 10, border: '2px solid rgba(255,255,255,0.25)',
            borderRadius: 12, zIndex: 2, pointerEvents: 'none'
          }} />

          {/* Corner ornaments */}
          {[
          { top: 18, left: 18 }, { top: 18, right: 18 },
          { bottom: 18, left: 18 }, { bottom: 18, right: 18 }].
          map((pos, i) =>
          <div key={i} style={{
            position: 'absolute', ...pos, width: 20, height: 20,
            border: '2.5px solid rgba(255,255,255,0.35)', borderRadius: 3,
            zIndex: 3, pointerEvents: 'none'
          }} />
          )}

          {/* Content */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 4,
            display: 'flex', flexDirection: 'column',
            padding: 'clamp(18px, 3vw, 28px)',
            gap: 'clamp(10px, 2vh, 18px)'
          }}>
            {/* Title */}
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <h2 style={{
                color: 'rgba(255,255,255,0.98)',
                fontFamily: 'Georgia, serif',
                fontWeight: 900,
                fontSize: 'clamp(1.2rem, 2.8vw, 2rem)',
                letterSpacing: '0.06em',
                textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                lineHeight: 1.1,
                margin: 0
              }}>
                {card.title}
              </h2>
              <div style={{
                width: 'clamp(32px, 5vw, 52px)', height: 3, borderRadius: 2,
                background: 'rgba(255,255,255,0.6)',
                margin: '8px auto 0'
              }} />
            </div>

            {/* Image */}
            <div style={{
              flex: 1,
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
              border: '3px solid rgba(255,255,255,0.3)',
              minHeight: 0,
              position: 'relative'
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.imageUrl}
                alt={card.imageAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.style.background = `linear-gradient(135deg, ${card.colorDark} 0%, rgba(0,0,0,0.4) 100%)`;
                  }
                }} />
              
            </div>

            {/* Definition */}
            <div style={{
              flexShrink: 0,
              background: 'rgba(0,0,0,0.32)',
              borderRadius: 10,
              padding: 'clamp(10px, 1.5vw, 16px)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}>
              <p style={{
                color: 'rgba(255,255,255,0.95)',
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(0.65rem, 1.2vw, 0.9rem)',
                lineHeight: 1.7,
                margin: 0,
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                &ldquo;{card.definition}&rdquo;
              </p>
            </div>
          </div>

          {/* Page edge */}
          <div style={{
            position: 'absolute', right: 0, top: 4, bottom: 4, width: 7,
            background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)',
            borderRadius: '0 18px 18px 0', zIndex: 5
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 4, right: 4, height: 6,
            background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, rgba(0,0,0,0.08) 1px, rgba(0,0,0,0.08) 2px)',
            borderRadius: '0 0 18px 18px', zIndex: 5
          }} />
        </div>
      </div>

      {/* Prev / Next navigation */}
      <Link
        href={`/projects/kraf/buku/kad/${prevCard.id}`}
        aria-label={`Previous: ${prevCard.title}`}
        style={{
          position: 'absolute',
          left: 'clamp(8px, 2vw, 24px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          width: 'clamp(36px, 5vw, 52px)',
          height: 'clamp(36px, 5vw, 52px)',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,240,200,0.9)',
          textDecoration: 'none',
          transition: 'all 0.2s ease'
        }}>
        
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 15L8 10L13 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      <Link
        href={`/projects/kraf/buku/kad/${nextCard.id}`}
        aria-label={`Next: ${nextCard.title}`}
        style={{
          position: 'absolute',
          right: 'clamp(8px, 2vw, 24px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          width: 'clamp(36px, 5vw, 52px)',
          height: 'clamp(36px, 5vw, 52px)',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,240,200,0.9)',
          textDecoration: 'none',
          transition: 'all 0.2s ease'
        }}>
        
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5L12 10L7 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {/* Dot indicator */}
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
        
        <div style={{
          color: 'rgba(255,230,180,0.7)',
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
          fontWeight: 700,
          letterSpacing: '0.1em'
        }}>
          {currentIndex + 1} / {CARDS.length}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {CARDS.map((c, index) =>
          <Link
            key={c.id}
            href={`/projects/kraf/buku/kad/${c.id}`}
            aria-label={`Go to ${c.title}`}
            style={{
              width: index === currentIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: index === currentIndex ? card.accentColor : 'rgba(255,255,255,0.3)',
              transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
              display: 'block',
              boxShadow: index === currentIndex ? `0 2px 8px ${card.accentColor}88` : 'none'
            }} />

          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>);

}