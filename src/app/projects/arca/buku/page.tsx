'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  color: string;
  colorDark: string;
  colorLight: string;
  spineColor: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
}

const BOOKS: Book[] = [
{
  id: 'sejarah',
  title: 'Sejarah Arca',
  color: '#C0392B',
  colorDark: '#922B21',
  colorLight: '#FADBD8',
  spineColor: '#7B241C',
  content:
  'Sejarah arca bermula sejak zaman prasejarah apabila manusia mula menghasilkan patung dan ukiran daripada batu, tanah liat dan tulang sebagai objek ritual, kepercayaan dan ekspresi diri. Tamadun-tamadun awal seperti Mesir, Greek, Rom dan China telah menghasilkan arca yang mencerminkan nilai keagamaan, politik dan estetika masyarakat mereka. Di Malaysia, tradisi arca berkembang melalui pengaruh Hindu-Buddha, Islam dan warisan tempatan, menghasilkan ukiran kayu, tembikar dan patung yang kaya dengan makna budaya. Pada era moden, arca berkembang merentasi pelbagai gaya dan medium, daripada realisme kepada abstrak, daripada bahan tradisional kepada bahan industri dan digital.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_42c4d8c6c-1789740026295.png",
  imageAlt: 'Ancient stone sculpture and carved reliefs from classical civilisation displayed in a museum'
},
{
  id: 'budaya',
  title: 'Hubungan Arca dengan Budaya',
  color: '#1A5276',
  colorDark: '#154360',
  colorLight: '#D6EAF8',
  spineColor: '#0E3460',
  content:
  'Arca mempunyai hubungan yang mendalam dengan budaya kerana setiap karya mencerminkan nilai, kepercayaan, identiti dan sejarah sesebuah masyarakat. Motif, bentuk dan simbol yang digunakan dalam arca sering mewakili makna spiritual, sosial atau politik yang penting. Di Malaysia, arca tradisional seperti ukiran kayu Orang Asli, patung ritual masyarakat Sabah dan Sarawak, serta arca moden di ruang awam menjadi medium untuk memelihara dan menyampaikan warisan budaya kepada generasi akan datang.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1884df7e5-1768886643109.png",
  imageAlt: 'Traditional wooden sculpture with intricate cultural carvings representing Malaysian heritage'
},
{
  id: 'fungsi',
  title: 'Hubungan Arca dengan Fungsi',
  color: '#B7770D',
  colorDark: '#9A6A0A',
  colorLight: '#FDEBD0',
  spineColor: '#7D5A08',
  content:
  'Arca bukan sekadar objek estetik, malah mempunyai pelbagai fungsi dalam kehidupan manusia. Secara tradisinya, arca berfungsi sebagai objek ritual dan keagamaan, simbol kuasa dan pemerintahan, serta tanda peringatan dan monumen. Dalam konteks moden, arca berfungsi sebagai hiasan ruang awam dan peribadi, medium ekspresi seni, alat pendidikan dan komunikasi visual, serta penjana nilai ekonomi melalui industri seni dan pelancongan. Gabungan fungsi estetika dan praktikal menjadikan arca relevan merentasi zaman dan budaya.',
  imageUrl: "https://images.unsplash.com/photo-1674456226235-954bc85b226b",
  imageAlt: 'Modern public sculpture installation in an urban plaza serving as both art and landmark'
},
{
  id: 'kreativiti',
  title: 'Hubungan Arca dengan Kreativiti',
  color: '#1E8449',
  colorDark: '#196F3D',
  colorLight: '#D5F5E3',
  spineColor: '#145A32',
  content:
  'Kreativiti merupakan teras dalam penghasilan arca kerana pengkarya perlu meneroka idea, bentuk, ruang, tekstur dan bahan secara inovatif. Proses kreatif dalam penghasilan arca melibatkan pemerhatian, imaginasi, eksperimentasi dan refleksi yang berterusan. Pengkarya menggunakan kreativiti untuk menterjemahkan konsep abstrak kepada bentuk tiga dimensi yang dapat dilihat dan disentuh. Melalui kreativiti, arca terus berkembang dengan menggabungkan teknik tradisional dengan pendekatan kontemporari, menghasilkan karya yang baharu, bermakna dan berimpak tinggi.',
  imageUrl: "https://images.unsplash.com/photo-1659469092261-00050dc33ac6",
  imageAlt: 'Sculptor hands shaping clay model exploring creative three-dimensional forms and textures'
},
{
  id: 'jenis',
  title: 'Jenis Arca',
  color: '#6C3483',
  colorDark: '#512E5F',
  colorLight: '#E8DAEF',
  spineColor: '#4A235A',
  content:
  'Bidang arca pula melibatkan penghasilan karya tiga dimensi melalui penerokaan bentuk, ruang, bahan dan teknik yang pelbagai. Antara jenis arca yang diterokai ialah:\n\n1. Arca Timbulan\n2. Arca Luakan\n3. Arca Assemblaj\n4. Arca Mobail\n5. Arca Stabil\n6. Arca Binaan\n7. Arca Kinetik\n8. Arca Instalasi',
  imageUrl: "https://images.unsplash.com/photo-1709333951226-a55cd55bce81",
  imageAlt: 'Various types of sculpture including relief, assemblage, mobile and installation art displayed in gallery'
}];


type Phase = 'flying' | 'arranged' | 'opening' | 'open';

export default function ArcaBukuPage() {
  const [phase, setPhase] = useState<Phase>('flying');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setPhase('arranged'), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleBookClick = (bookId: string) => {
    if (phase !== 'arranged') return;
    setSelectedBook(bookId);
    setPhase('opening');
    setTimeout(() => setPhase('open'), 600);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (phase !== 'open') return;
    if (e.target === overlayRef.current) {
      closeBook();
    }
  };

  const closeBook = () => {
    if (isClosing) return;
    setIsClosing(true);
    setPhase('opening');
    setTimeout(() => {
      setPhase('arranged');
      setSelectedBook(null);
      setIsClosing(false);
    }, 600);
  };

  const selectedBookData = BOOKS.find((b) => b.id === selectedBook);
  const bookIsOpen = phase === 'opening' || phase === 'open';

  return (
    <div className="relative w-full min-h-screen overflow-hidden select-none" style={{ background: '#5C3A1E' }}>
      {/* Wood grain base */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(178deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 52px),
            repeating-linear-gradient(182deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 36px),
            repeating-linear-gradient(175deg, rgba(255,200,100,0.02) 0px, rgba(255,200,100,0.02) 2px, transparent 2px, transparent 80px)
          `
        }} />
      
      {/* Warm ambient light from top */}
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
      

      {/* ── DESK DECORATIONS ── */}
      {/* Pencil cup (left side) */}
      <div className="absolute pointer-events-none z-20" style={{ left: '3%', bottom: '22%' }}>
        <div style={{
          width: 36, height: 44, borderRadius: '4px 4px 8px 8px',
          background: 'linear-gradient(160deg, #D4A96A 0%, #A0724A 100%)',
          border: '2px solid #7A5230',
          boxShadow: '2px 4px 10px rgba(0,0,0,0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 6px)' }} />
        </div>
        {[
        { left: 4, rotate: -12, color: '#F4D03F', tip: '#2C1A0E' },
        { left: 12, rotate: 5, color: '#E74C3C', tip: '#2C1A0E' },
        { left: 20, rotate: -4, color: '#27AE60', tip: '#2C1A0E' }].
        map((p, i) =>
        <div key={i} style={{
          position: 'absolute',
          bottom: 36,
          left: p.left,
          width: 6,
          height: 38,
          background: `linear-gradient(180deg, ${p.tip} 0%, ${p.tip} 10%, ${p.color} 10%, ${p.color} 90%, #F5CBA7 90%)`,
          borderRadius: '3px 3px 0 0',
          transform: `rotate(${p.rotate}deg)`,
          transformOrigin: 'bottom center',
          boxShadow: '1px 1px 4px rgba(0,0,0,0.3)'
        }} />
        )}
      </div>

      {/* Sticky note (top-left area) */}
      <div className="absolute pointer-events-none z-20" style={{ left: '2%', top: '12%', transform: 'rotate(-4deg)' }}>
        <div style={{
          width: 70, height: 70,
          background: 'linear-gradient(135deg, #FFF176 0%, #F9E400 100%)',
          boxShadow: '2px 4px 12px rgba(0,0,0,0.35)',
          padding: 8,
          display: 'flex', flexDirection: 'column', gap: 5
        }}>
          {[0, 1, 2].map((i) =>
          <div key={i} style={{ height: 2, background: 'rgba(0,0,0,0.15)', borderRadius: 1 }} />
          )}
        </div>
      </div>

      {/* Sticky note pink (right side) */}
      <div className="absolute pointer-events-none z-20" style={{ right: '3%', top: '10%', transform: 'rotate(3deg)' }}>
        <div style={{
          width: 65, height: 65,
          background: 'linear-gradient(135deg, #F8BBD9 0%, #F48FB1 100%)',
          boxShadow: '2px 4px 12px rgba(0,0,0,0.3)',
          padding: 8,
          display: 'flex', flexDirection: 'column', gap: 5
        }}>
          {[0, 1, 2].map((i) =>
          <div key={i} style={{ height: 2, background: 'rgba(0,0,0,0.12)', borderRadius: 1 }} />
          )}
        </div>
      </div>

      {/* Washi tape strip (top) */}
      <div className="absolute pointer-events-none z-20" style={{ top: 0, left: '30%', width: '18%', height: 14 }}>
        <div style={{
          width: '100%', height: '100%',
          background: 'repeating-linear-gradient(90deg, rgba(255,200,80,0.7), rgba(255,220,120,0.7) 12px, rgba(255,190,60,0.7) 24px)',
          opacity: 0.85,
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
        }} />
      </div>

      {/* Eraser */}
      <div className="absolute pointer-events-none z-20" style={{ right: '4%', bottom: '24%', transform: 'rotate(8deg)' }}>
        <div style={{
          width: 44, height: 20,
          background: 'linear-gradient(180deg, #F1948A 0%, #E74C3C 100%)',
          borderRadius: 3,
          boxShadow: '2px 3px 8px rgba(0,0,0,0.35)',
          border: '1px solid #C0392B',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.7)', fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: 1 }}>ERASER</span>
        </div>
      </div>

      {/* Ruler */}
      <div className="absolute pointer-events-none z-20" style={{ left: '6%', bottom: '19%', transform: 'rotate(-6deg)' }}>
        <div style={{
          width: 90, height: 14,
          background: 'linear-gradient(180deg, #AED6F1 0%, #85C1E9 100%)',
          borderRadius: 2,
          boxShadow: '1px 3px 8px rgba(0,0,0,0.3)',
          border: '1px solid #5DADE2',
          display: 'flex', alignItems: 'flex-end', paddingBottom: 2, paddingLeft: 4, gap: 5,
          overflow: 'hidden'
        }}>
          {Array.from({ length: 12 }).map((_, i) =>
          <div key={i} style={{ width: 1, height: i % 3 === 0 ? 6 : 4, background: 'rgba(0,0,0,0.3)', flexShrink: 0 }} />
          )}
        </div>
      </div>

      {/* Small paper clip */}
      <div className="absolute pointer-events-none z-20" style={{ right: '7%', bottom: '20%', transform: 'rotate(20deg)' }}>
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
          <path d="M10 2 C4 2 2 6 2 10 L2 24 C2 28 6 30 10 30 C14 30 18 28 18 24 L18 8 C18 5 16 3 13 3 C10 3 8 5 8 8 L8 22 C8 24 9 25 10 25 C11 25 12 24 12 22 L12 8" stroke="#A0A0A0" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {/* Back button */}
      {!bookIsOpen &&
      <Link
        href="/projects/arca"
        className="absolute top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
        style={{
          background: 'var(--sticker-white)',
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
      }

      {/* ── TITLE ── */}
      {!bookIsOpen &&
      <div
        className="absolute z-30 w-full flex justify-center"
        style={{ top: '5%' }}>
        
          <h1
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            color: 'rgba(255,240,200,0.95)',
            fontWeight: 900,
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.08em',
            textShadow: '0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1)',
            lineHeight: 1
          }}>
          
            Arca
          </h1>
        </div>
      }

      {/* ── TABLE SURFACE ── */}
      <div
        className="absolute z-10"
        style={{
          bottom: '17%',
          left: '3%',
          right: '3%',
          height: 22,
          borderRadius: 6,
          background: 'linear-gradient(180deg, rgba(200,160,100,0.6) 0%, rgba(140,100,55,0.35) 100%)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.4)'
        }} />
      
      <div
        className="absolute z-10"
        style={{
          bottom: 'calc(17% + 20px)',
          left: '3%',
          right: '3%',
          height: 3,
          borderRadius: 2,
          background: 'rgba(255,220,140,0.25)'
        }} />
      

      {/* ── BOOKS AREA ── */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center"
        style={{ paddingTop: '100px', paddingBottom: '22%' }}>
        
        {/* Book open overlay */}
        {(phase === 'opening' || phase === 'open') && selectedBookData &&
        <div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-30 flex items-center justify-center"
          style={{
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)',
            animation: 'fadeIn 0.4s ease forwards'
          }}>
          
            <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: 'clamp(300px, 72vw, 820px)',
              height: 'clamp(340px, 72vh, 600px)',
              animation: phase === 'open' ? 'bookOpen 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'bookClose 0.5s ease forwards',
              transformOrigin: 'left center',
              display: 'flex',
              borderRadius: 10,
              boxShadow: `0 32px 100px rgba(0,0,0,0.7), 0 8px 32px rgba(0,0,0,0.5)`,
              overflow: 'hidden'
            }}>
            
              {/* Left page */}
              <div
              style={{
                width: '42%',
                background: `linear-gradient(155deg, ${selectedBookData.color} 0%, ${selectedBookData.colorDark} 60%, rgba(0,0,0,0.3) 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'clamp(14px, 2.5vw, 28px)',
                position: 'relative',
                overflow: 'hidden'
              }}>
              
                <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: 8,
                background: `linear-gradient(90deg, ${selectedBookData.spineColor} 0%, rgba(0,0,0,0.4) 100%)`,
                boxShadow: '-3px 0 10px rgba(0,0,0,0.4)'
              }} />
                <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 20px, rgba(255,255,255,0.04) 20px, rgba(255,255,255,0.04) 21px)'
              }} />
                <div style={{ position: 'absolute', top: 10, left: 16, width: 24, height: 24, border: '2px solid rgba(255,255,255,0.25)', borderRadius: 2 }} />
                <div style={{ position: 'absolute', bottom: 10, right: 20, width: 24, height: 24, border: '2px solid rgba(255,255,255,0.2)', borderRadius: 2 }} />
                <h2 style={{
                color: 'rgba(255,255,255,0.97)',
                fontFamily: 'Georgia, serif',
                fontWeight: 900,
                fontSize: 'clamp(0.75rem, 1.8vw, 1.2rem)',
                textAlign: 'center',
                lineHeight: 1.35,
                marginBottom: 'clamp(12px, 2.5vh, 22px)',
                position: 'relative', zIndex: 1,
                textShadow: '0 2px 10px rgba(0,0,0,0.4)'
              }}>
                  {selectedBookData.title}
                </h2>
                <div style={{
                width: '88%', aspectRatio: '4/3',
                borderRadius: 8, overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                position: 'relative', zIndex: 1,
                border: '3px solid rgba(255,255,255,0.25)'
              }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                  src={selectedBookData.imageUrl}
                  alt={selectedBookData.imageAlt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                </div>
              </div>

              {/* Right page */}
              <div style={{
              flex: 1,
              background: 'linear-gradient(160deg, #FBF7EE 0%, #F3ECD8 100%)',
              padding: 'clamp(18px, 3vw, 36px)',
              display: 'flex', flexDirection: 'column',
              position: 'relative', overflow: 'hidden'
            }}>
                <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 28px, rgba(0,0,0,0.045) 28px, rgba(0,0,0,0.045) 29px)',
                backgroundPosition: '0 52px'
              }} />
                <div style={{
                position: 'absolute', left: 'clamp(28px, 5vw, 48px)', top: 0, bottom: 0,
                width: 1, background: 'rgba(220,80,80,0.2)'
              }} />
                <div style={{
                position: 'absolute', top: 12, right: 18,
                fontSize: 10, color: 'rgba(0,0,0,0.28)',
                fontFamily: 'Georgia, serif'
              }}>
                  {BOOKS.findIndex((b) => b.id === selectedBook) + 1}
                </div>
                <div style={{
                width: 44, height: 4, borderRadius: 2,
                background: selectedBookData.color,
                marginBottom: 'clamp(10px, 1.8vh, 18px)',
                position: 'relative', zIndex: 1
              }} />
                <h3 style={{
                fontFamily: 'Georgia, serif', fontWeight: 800,
                fontSize: 'clamp(0.8rem, 1.8vw, 1.15rem)',
                color: '#2A1A0A',
                marginBottom: 'clamp(10px, 1.8vh, 18px)',
                lineHeight: 1.3, position: 'relative', zIndex: 1
              }}>
                  {selectedBookData.title}
                </h3>
                <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(0.7rem, 1.45vw, 0.92rem)',
                color: '#3A2A14', lineHeight: 1.9,
                position: 'relative', zIndex: 1,
                flex: 1, overflow: 'auto'
              }}>
                  {selectedBookData.content.split('\n\n').map((block, bi) => {
                  if (bi === 0) {
                    return <p key={bi} style={{ marginBottom: 'clamp(8px, 1.2vh, 14px)', fontStyle: 'italic', color: '#5A3A1A' }}>{block}</p>;
                  }
                  const lines = block.split('\n').filter((l) => l.trim() !== '');
                  const allNumbered = lines.every((l) => /^\d+\.\s/.test(l.trim()));
                  if (allNumbered) {
                    return (
                      <div key={bi}>
                        {lines.map((line, li) => {
                          const m = line.trim().match(/^(\d+)\.\s(.+)$/);
                          if (!m) return null;
                          return (
                            <div key={li} style={{ marginBottom: 'clamp(4px, 0.7vh, 8px)', fontWeight: 700, color: '#2A1A0A', lineHeight: 1.6 }}>
                              <span style={{ color: selectedBookData.color, marginRight: 4 }}>{m[1]}.</span>{m[2]}
                            </div>);

                        })}
                      </div>);

                  }
                  const titleLine = lines[0];
                  const descLine = lines.slice(1).join(' ');
                  const match = titleLine.match(/^(\d+)\.\s(.+)$/);
                  if (match) {
                    return (
                      <div key={bi} style={{ marginBottom: 'clamp(6px, 1vh, 12px)' }}>
                          <div style={{ fontWeight: 800, color: '#2A1A0A', lineHeight: 1.4 }}>
                            <span style={{ color: selectedBookData.color, marginRight: 4 }}>{match[1]}.</span>{match[2]}
                          </div>
                          {descLine && <div style={{ paddingLeft: 'clamp(12px, 2vw, 20px)', color: '#4A3020', lineHeight: 1.75, fontSize: 'clamp(0.65rem, 1.3vw, 0.85rem)' }}>{descLine}</div>}
                        </div>);

                  }
                  return <p key={bi} style={{ marginBottom: 'clamp(6px, 1vh, 10px)' }}>{block}</p>;
                })}
                </div>
                <div style={{
                marginTop: 'clamp(8px, 1.5vh, 16px)',
                fontSize: 'clamp(0.6rem, 1.1vw, 0.72rem)',
                color: 'rgba(0,0,0,0.3)',
                fontFamily: 'Georgia, serif', fontStyle: 'italic',
                position: 'relative', zIndex: 1
              }}>
                  Klik di luar buku untuk menutup
                </div>
              </div>
            </div>
          </div>
        }

        {/* ── HORIZONTAL BOOKS ROW ── */}
        {(phase === 'flying' || phase === 'arranged') &&
        <div
          className="flex items-end justify-center gap-4 md:gap-6 lg:gap-10"
          style={{ width: '100%', maxWidth: 960, padding: '0 20px' }}>
          
            {BOOKS.map((book, index) => {
            const cornerMap = ['top-left', 'top-right', 'top-left', 'top-right', 'top-left'];
            const corners: Record<string, string> = {
              'top-left': 'translate(-130vw, -130vh) rotate(-50deg)',
              'top-right': 'translate(130vw, -130vh) rotate(50deg)'
            };
            const flyingTransform = corners[cornerMap[index]];

            const stickyColors = [
            { bg: 'linear-gradient(145deg, #FFAAAA 0%, #F47C7C 100%)', fold: '#D95555', shadow: 'rgba(217,85,85,0.35)', line: 'rgba(180,60,60,0.22)', pin: '#C0392B' },
            { bg: 'linear-gradient(145deg, #A8D8F0 0%, #7EC8E3 100%)', fold: '#5AAEC8', shadow: 'rgba(90,174,200,0.35)', line: 'rgba(60,130,160,0.22)', pin: '#2980B9' },
            { bg: 'linear-gradient(145deg, #FFD6A5 0%, #FFBA6B 100%)', fold: '#E89A3C', shadow: 'rgba(232,154,60,0.35)', line: 'rgba(180,110,30,0.22)', pin: '#E67E22' },
            { bg: 'linear-gradient(145deg, #B5EAD7 0%, #7DD6B0 100%)', fold: '#4CAF87', shadow: 'rgba(76,175,135,0.35)', line: 'rgba(40,130,90,0.22)', pin: '#27AE60' },
            { bg: 'linear-gradient(145deg, #D7A8F0 0%, #B07EC8 100%)', fold: '#8E44AD', shadow: 'rgba(142,68,173,0.35)', line: 'rgba(100,40,140,0.22)', pin: '#7D3C98' }];

            const sticky = stickyColors[index % stickyColors.length];
            const rotations = [-3, 2, -1.5, 3, -2];
            const baseRotation = rotations[index % rotations.length];

            return (
              <div
                key={book.id}
                onClick={() => handleBookClick(book.id)}
                style={{
                  width: 'clamp(80px, 14vw, 140px)',
                  height: 'clamp(90px, 16vw, 160px)',
                  cursor: phase === 'arranged' ? 'pointer' : 'default',
                  position: 'relative',
                  transform: phase === 'flying' ? flyingTransform : `rotate(${baseRotation}deg)`,
                  opacity: phase === 'flying' ? 0 : 1,
                  transition:
                  phase === 'arranged' ?
                  `transform 0.75s cubic-bezier(0.34,1.56,0.64,1) ${index * 0.1}s, opacity 0.5s ease ${index * 0.1}s, box-shadow 0.2s ease` :
                  'none',
                  flexShrink: 0,
                  filter: `drop-shadow(3px 8px 16px ${sticky.shadow})`
                }}
                onMouseEnter={(e) => {
                  if (phase === 'arranged') {
                    (e.currentTarget as HTMLDivElement).style.transform = `translateY(-14px) rotate(${baseRotation - 1}deg) scale(1.08)`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (phase === 'arranged') {
                    (e.currentTarget as HTMLDivElement).style.transform = `rotate(${baseRotation}deg) scale(1)`;
                  }
                }}>
                
                  <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: sticky.bg,
                  borderRadius: '3px 3px 3px 3px',
                  boxShadow: `2px 6px 18px rgba(0,0,0,0.32), 0 1px 0 rgba(255,255,255,0.6) inset`,
                  overflow: 'hidden'
                }}>
                    {/* Folded corner */}
                    <div style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 0, height: 0,
                    borderStyle: 'solid',
                    borderWidth: '0 0 clamp(14px, 2.5vw, 22px) clamp(14px, 2.5vw, 22px)',
                    borderColor: `transparent transparent ${sticky.fold} transparent`,
                    filter: 'drop-shadow(-2px -2px 3px rgba(0,0,0,0.18))',
                    zIndex: 3
                  }} />
                    <div style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 'clamp(14px, 2.5vw, 22px)', height: 'clamp(14px, 2.5vw, 22px)',
                    background: 'rgba(0,0,0,0.08)',
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                    zIndex: 2
                  }} />
                    {/* Ruled lines */}
                    <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 18px, ${sticky.line} 18px, ${sticky.line} 19px)`,
                    backgroundPosition: '0 32px',
                    zIndex: 1
                  }} />
                    {/* Pin */}
                    <div style={{
                    position: 'absolute', top: 6, left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 4,
                    display: 'flex', flexDirection: 'column', alignItems: 'center'
                  }}>
                      <div style={{
                      width: 'clamp(8px, 1.4vw, 12px)', height: 'clamp(8px, 1.4vw, 12px)',
                      borderRadius: '50%',
                      background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), ${sticky.pin})`,
                      boxShadow: `0 2px 6px rgba(0,0,0,0.4), 0 0 0 1.5px rgba(0,0,0,0.15)`
                    }} />
                      <div style={{ width: 2, height: 'clamp(4px, 0.8vw, 7px)', background: 'rgba(0,0,0,0.3)', borderRadius: '0 0 2px 2px' }} />
                    </div>
                    {/* Title text */}
                    <div style={{
                    position: 'absolute',
                    inset: 'clamp(22px, 4vw, 32px) clamp(8px, 1.5vw, 14px) clamp(16px, 3vw, 24px)',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center',
                    zIndex: 2
                  }}>
                      <span style={{
                      color: 'rgba(50,35,10,0.88)',
                      fontFamily: 'Georgia, serif',
                      fontWeight: 800,
                      fontSize: 'clamp(0.42rem, 1vw, 0.72rem)',
                      textAlign: 'center',
                      lineHeight: 1.45,
                      textShadow: '0 1px 2px rgba(255,255,255,0.5)',
                      wordBreak: 'break-word'
                    }}>
                        {book.title}
                      </span>
                    </div>
                  </div>
                </div>);

          })}
          </div>
        }
      </div>

      {/* ── NEXT PAGE BUTTON ── */}
      <button
        onClick={() => {
          setBtnPressed(true);
          setTimeout(() => {
            setBtnPressed(false);
            window.location.href = '/projects/arca/buku/jenis';
          }, 320);
        }}
        aria-label="Navigate to next page"
        style={{
          position: 'fixed',
          top: 24,
          right: 24,
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
          transform: btnPressed ? 'scale(0.88)' : 'scale(1)'
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
        }}>
        
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M5 11H17M17 11L11 5M17 11L11 17" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bookOpen {
          0% { transform: perspective(1200px) rotateY(-90deg); opacity: 0; }
          60% { transform: perspective(1200px) rotateY(6deg); opacity: 1; }
          100% { transform: perspective(1200px) rotateY(0deg); opacity: 1; }
        }
        @keyframes bookClose {
          0% { transform: perspective(1200px) rotateY(0deg); opacity: 1; }
          100% { transform: perspective(1200px) rotateY(-90deg); opacity: 0; }
        }
      `}</style>
    </div>);

}