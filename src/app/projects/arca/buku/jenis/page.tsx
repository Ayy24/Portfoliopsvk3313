'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

interface ArcaType {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  headerColor: string;
  tabColor: string;
}

const ARCA_TYPES: ArcaType[] = [
{
  id: 'timbulan',
  name: 'Arca Timbulan',
  description: 'Arca timbulan (relief) ialah karya tiga dimensi yang dihasilkan pada permukaan rata, di mana imej atau bentuk menonjol keluar dari latar belakang. Ia terbahagi kepada bas-relief (tonjolan rendah) dan haut-relief (tonjolan tinggi). Teknik ini lazim digunakan dalam ukiran batu, kayu dan logam pada bangunan bersejarah.',
  imageUrl: "https://images.unsplash.com/photo-1634299545129-c3f41cded649",
  imageAlt: 'Ukiran bas-relief batu dari Parthenon Yunani menunjukkan figura manusia menonjol dari permukaan rata',
  headerColor: '#E07070',
  tabColor: '#C85050'
},
{
  id: 'luakan',
  name: 'Arca Luakan',
  description: 'Arca luakan (intaglio/sunken relief) ialah kebalikan arca timbulan — bentuk diukir atau ditekan masuk ke dalam permukaan bahan, mewujudkan imej yang tenggelam. Teknik ini digunakan dalam penghasilan cop mohor, duit syiling, dan ukiran batu permata. Bayangan yang terhasil memberi kedalaman visual yang unik.',
  imageUrl: "https://images.unsplash.com/photo-1675091258508-21bd0183ea2d",
  imageAlt: 'Ukiran sunken relief Mesir purba menunjukkan figura Firaun yang ditekan masuk ke dalam permukaan batu',
  headerColor: '#70A0E0',
  tabColor: '#4A7EC8'
},
{
  id: 'assemblaj',
  name: 'Arca Assemblaj',
  description: 'Arca assemblaj ialah karya seni tiga dimensi yang dibina dengan mengumpulkan dan menyusun pelbagai objek atau bahan ditemui (found objects) menjadi satu komposisi baharu. Teknik ini menekankan kreativiti dalam mengubah fungsi objek seharian menjadi karya seni yang bermakna dan berimpak.',
  imageUrl: "https://images.unsplash.com/photo-1501176625204-f01415bb0d70",
  imageAlt: 'Arca assemblaj karya Picasso menggunakan objek ditemui yang disusun menjadi komposisi seni tiga dimensi',
  headerColor: '#70C870',
  tabColor: '#4AA84A'
},
{
  id: 'mobail',
  name: 'Arca Mobail',
  description: 'Arca mobail (mobile) ialah arca gantung yang bahagian-bahagiannya boleh bergerak bebas akibat angin atau sentuhan. Diperkenalkan oleh Alexander Calder, mobail menggabungkan keseimbangan, pergerakan dan ruang. Setiap bahagian digantung pada wayar atau tali supaya berputar dan berayun secara harmoni.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4b62e0ed1-1789602794122.png",
  imageAlt: 'Arca mobail Alexander Calder dengan bentuk abstrak berwarna-warni digantung pada wayar nipis bergerak bebas',
  headerColor: '#E0C070',
  tabColor: '#C8A040'
},
{
  id: 'stabil',
  name: 'Arca Stabail',
  description: 'Arca stabail ialah arca abstrak yang berdiri tegak di atas lantai atau dipasang pada dinding tanpa bahagian yang bergerak. Berbeza dengan mobail, stabail menekankan kestabilan dan keteguhan bentuk. Ia sering diperbuat daripada logam dan ditempatkan di ruang awam sebagai karya monumental.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4ee1854c4-1789596425505.png",
  imageAlt: 'Arca stabail logam besar karya Alexander Calder berdiri tegak di luar bangunan MIT sebagai karya monumental',
  headerColor: '#C070C8',
  tabColor: '#A050A8'
},
{
  id: 'binaan',
  name: 'Arca Binaan',
  description: 'Arca binaan (constructed sculpture) ialah arca yang dibina dengan menyambung, mengelas, mengikat atau menyusun pelbagai komponen dan bahan. Berbeza dengan arca tradisional yang diukir atau dipahat, arca binaan menggunakan proses pembinaan seperti dalam seni bina. Bahan yang digunakan termasuk logam, kayu, plastik dan bahan industri.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_40620f54b-1789596423914.png",
  imageAlt: 'Arca binaan konstruktivis karya Naum Gabo diperbuat daripada kepingan logam yang disambung membentuk kepala abstrak',
  headerColor: '#E09060',
  tabColor: '#C07040'
},
{
  id: 'kinetik',
  name: 'Arca Kinetik',
  description: 'Arca kinetik ialah arca yang mengandungi elemen bergerak, sama ada digerakkan oleh motor, angin, air atau tenaga lain. Pergerakan menjadi sebahagian daripada karya seni itu sendiri. Arca kinetik meneroka hubungan antara masa, ruang dan pergerakan, mewujudkan pengalaman visual yang dinamik dan sentiasa berubah.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_45e5fde05-1789596424114.png",
  imageAlt: 'Arca kinetik Heureka karya Jean Tinguely dengan bahagian logam bergerak digerakkan oleh motor di Zurich Switzerland',
  headerColor: '#60C0C0',
  tabColor: '#40A0A0'
},
{
  id: 'instalasi',
  name: 'Arca Instalasi',
  description: 'Arca instalasi ialah karya seni tiga dimensi berskala besar yang direka untuk ruang tertentu, melibatkan penonton secara fizikal dan emosional. Ia mengubah persepsi ruang dan sering menggabungkan pelbagai media seperti cahaya, bunyi, video dan objek. Pengalaman keseluruhan ruang menjadi sebahagian daripada karya itu sendiri.',
  imageUrl: "https://images.unsplash.com/photo-1679708593624-29fb6f113147",
  imageAlt: 'Bilik cermin infiniti Infinity Mirror Room karya Yayoi Kusama menunjukkan instalasi seni berskala besar dengan cahaya dan cermin',
  headerColor: '#E070A0',
  tabColor: '#C05080'
}];


// Individual card component with static image
function ArcaCard({
  arca,
  index,
  activeIndex,
  totalCards





}: {arca: ArcaType;index: number;activeIndex: number;totalCards: number;}) {
  const [imgError, setImgError] = useState(false);

  const diff = index - activeIndex;
  const isActive = diff === 0;
  const isBehind = diff < 0;

  let translateY = 0;
  let translateZ = 0;
  let scale = 1;
  let opacity = 1;
  let zIndex = totalCards - Math.abs(diff);

  if (isActive) {
    translateY = 0;
    translateZ = 0;
    scale = 1;
    opacity = 1;
    zIndex = totalCards + 1;
  } else if (isBehind) {
    translateY = diff * 8;
    translateZ = diff * 20;
    scale = 1 + diff * 0.03;
    opacity = Math.max(0.3, 1 + diff * 0.15);
    zIndex = totalCards + diff;
  } else {
    translateY = Math.min(diff * 12, 60);
    translateZ = -diff * 30;
    scale = Math.max(0.88, 1 - diff * 0.04);
    opacity = Math.max(0.4, 1 - diff * 0.18);
    zIndex = totalCards - diff;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        transform: `translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
        opacity,
        zIndex,
        transition: 'transform 0.55s cubic-bezier(0.34,1.2,0.64,1), opacity 0.45s ease, scale 0.45s ease',
        transformOrigin: 'center top',
        willChange: 'transform, opacity'
      }}>
      
      {/* Retro browser window */}
      <div
        style={{
          borderRadius: '10px 10px 8px 8px',
          border: '2.5px solid #5C3A1E',
          boxShadow: isActive ?
          '0 20px 60px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)' :
          '0 8px 24px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          background: '#FBF5E6',
          maxWidth: 720,
          margin: '0 auto'
        }}>
        
        {/* Title bar with tabs */}
        <div
          style={{
            background: arca.headerColor,
            padding: '8px 12px 0',
            borderBottom: '2px solid #5C3A1E',
            display: 'flex',
            alignItems: 'flex-end',
            gap: 4,
            minHeight: 52
          }}>
          
          {/* Browser tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 3,
              flex: 1
            }}>
            
            {/* Active tab */}
            <div
              style={{
                background: '#FBF5E6',
                border: '2px solid #5C3A1E',
                borderBottom: 'none',
                borderRadius: '6px 6px 0 0',
                padding: '5px 16px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#3D2B1F',
                fontFamily: 'Georgia, serif',
                whiteSpace: 'nowrap',
                minWidth: 80
              }}>
              
              {arca.name}
            </div>
            {/* Inactive tab 2 */}
            <div
              style={{
                background: arca.tabColor,
                border: '2px solid #5C3A1E',
                borderBottom: 'none',
                borderRadius: '6px 6px 0 0',
                padding: '4px 12px',
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Georgia, serif',
                opacity: 0.75
              }}>
              
              •••
            </div>
            <div
              style={{
                background: arca.tabColor,
                border: '2px solid #5C3A1E',
                borderBottom: 'none',
                borderRadius: '6px 6px 0 0',
                padding: '4px 12px',
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Georgia, serif',
                opacity: 0.6
              }}>
              
              •••
            </div>
          </div>
          {/* Window controls */}
          <div style={{ display: 'flex', gap: 6, paddingBottom: 8, paddingRight: 4 }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(60,30,10,0.7)', cursor: 'default' }}>─</span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(60,30,10,0.7)', cursor: 'default' }}>□</span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(60,30,10,0.7)', cursor: 'default' }}>✕</span>
          </div>
        </div>

        {/* Address bar */}
        <div
          style={{
            background: `${arca.headerColor}55`,
            padding: '6px 12px',
            borderBottom: '1.5px solid rgba(92,58,30,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
          
          <span style={{ fontSize: '0.7rem', color: 'rgba(60,30,10,0.5)', fontFamily: 'monospace' }}>←</span>
          <span style={{ fontSize: '0.7rem', color: 'rgba(60,30,10,0.5)', fontFamily: 'monospace' }}>→</span>
          <span style={{ fontSize: '0.7rem', color: 'rgba(60,30,10,0.5)', fontFamily: 'monospace' }}>↻</span>
          <div
            style={{
              flex: 1,
              background: '#FBF5E6',
              border: '1.5px solid rgba(92,58,30,0.35)',
              borderRadius: 4,
              padding: '3px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
            
            <span style={{ fontSize: '0.65rem', color: arca.tabColor }}>🔍</span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(60,30,10,0.45)', fontFamily: 'monospace' }}>
              seni.edu.my/arca/{arca.id}
            </span>
          </div>
        </div>

        {/* Content area */}
        <div
          style={{
            display: 'flex',
            minHeight: 0,
            flex: 1,
            background: '#FBF5E6'
          }}>
          
          {/* Left: text content */}
          <div
            style={{
              flex: 1,
              padding: '14px 16px 14px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              overflow: 'hidden'
            }}>
            
            {/* Jenis label */}
            <div style={{ fontSize: '0.62rem', color: arca.tabColor, fontFamily: 'Georgia, serif', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Jenis Arca
            </div>
            {/* Name */}
            <h2
              style={{
                fontFamily: 'Georgia, serif',
                fontWeight: 900,
                fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
                color: '#2A1A0A',
                lineHeight: 1.2,
                margin: 0
              }}>
              
              {arca.name}
            </h2>
            {/* Divider */}
            <div style={{ width: 40, height: 3, borderRadius: 2, background: arca.headerColor }} />
            {/* Description */}
            <p
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(0.65rem, 1.3vw, 0.82rem)',
                color: '#4A3020',
                lineHeight: 1.7,
                margin: 0
              }}>
              
              {arca.description}
            </p>

            {/* Pilih button */}
            {arca.id === 'timbulan' ?
            <Link
              href="/projects/arca/timbulan"
              style={{
                display: 'inline-block',
                marginTop: 10,
                padding: '7px 22px',
                background: arca.headerColor,
                color: '#fff',
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                borderRadius: 6,
                textDecoration: 'none',
                letterSpacing: '0.06em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                transition: 'opacity 0.2s',
                alignSelf: 'flex-start'
              }}>
                Pilih
              </Link> :
            arca.id === 'luakan' ?
            <Link
              href="/projects/arca/luakan"
              style={{
                display: 'inline-block',
                marginTop: 10,
                padding: '7px 22px',
                background: arca.headerColor,
                color: '#fff',
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                borderRadius: 6,
                textDecoration: 'none',
                letterSpacing: '0.06em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                transition: 'opacity 0.2s',
                alignSelf: 'flex-start'
              }}>
                Pilih
              </Link> :
            arca.id === 'assemblaj' ?
            <Link
              href="/projects/arca/assemblaj"
              style={{
                display: 'inline-block',
                marginTop: 10,
                padding: '7px 22px',
                background: arca.headerColor,
                color: '#fff',
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                borderRadius: 6,
                textDecoration: 'none',
                letterSpacing: '0.06em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                transition: 'opacity 0.2s',
                alignSelf: 'flex-start'
              }}>
                Pilih
              </Link> :
            arca.id === 'mobail' ?
            <Link
              href="/projects/arca/mobail"
              style={{
                display: 'inline-block',
                marginTop: 10,
                padding: '7px 22px',
                background: arca.headerColor,
                color: '#fff',
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                borderRadius: 6,
                textDecoration: 'none',
                letterSpacing: '0.06em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                transition: 'opacity 0.2s',
                alignSelf: 'flex-start'
              }}>
                Pilih
              </Link> :
            arca.id === 'stabil' ?
            <Link
              href="/projects/arca/stabil"
              style={{
                display: 'inline-block',
                marginTop: 10,
                padding: '7px 22px',
                background: arca.headerColor,
                color: '#fff',
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                borderRadius: 6,
                textDecoration: 'none',
                letterSpacing: '0.06em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                transition: 'opacity 0.2s',
                alignSelf: 'flex-start'
              }}>
                Pilih
              </Link> :
            arca.id === 'binaan' ?
            <Link
              href="/projects/arca/binaan"
              style={{
                display: 'inline-block',
                marginTop: 10,
                padding: '7px 22px',
                background: arca.headerColor,
                color: '#fff',
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                borderRadius: 6,
                textDecoration: 'none',
                letterSpacing: '0.06em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                transition: 'opacity 0.2s',
                alignSelf: 'flex-start'
              }}>
                Pilih
              </Link> :
            arca.id === 'kinetik' ?
            <Link
              href="/projects/arca/kinetik"
              style={{
                display: 'inline-block',
                marginTop: 10,
                padding: '7px 22px',
                background: arca.headerColor,
                color: '#fff',
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                borderRadius: 6,
                textDecoration: 'none',
                letterSpacing: '0.06em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                transition: 'opacity 0.2s',
                alignSelf: 'flex-start'
              }}>
                Pilih
              </Link> :
            arca.id === 'instalasi' ?
            <Link
              href="/projects/arca/instalasi"
              style={{
                display: 'inline-block',
                marginTop: 10,
                padding: '7px 22px',
                background: arca.headerColor,
                color: '#fff',
                borderRadius: 8,
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                fontSize: '0.82rem',
                textDecoration: 'none',
                letterSpacing: '0.06em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                transition: 'opacity 0.2s',
                alignSelf: 'flex-start'
              }}>
                Pilih
              </Link> :

            <button
              style={{
                display: 'inline-block',
                marginTop: 10,
                padding: '7px 22px',
                background: arca.headerColor,
                color: '#fff',
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                transition: 'opacity 0.2s',
                alignSelf: 'flex-start'
              }}>
                Pilih
              </button>
            }
            {/* Index indicator */}
            <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
              {ARCA_TYPES.map((_, i) =>
              <div
                key={i}
                style={{
                  width: i === index ? 16 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === index ? arca.headerColor : 'rgba(92,58,30,0.2)',
                  transition: 'width 0.3s ease'
                }} />

              )}
            </div>
          </div>

          {/* Right: image */}
          <div
            style={{
              width: 'clamp(140px, 35%, 240px)',
              borderLeft: '1.5px solid rgba(92,58,30,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `${arca.headerColor}18`,
              padding: 12,
              flexShrink: 0
            }}>
            
            <div
              style={{
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: 8,
                overflow: 'hidden',
                border: `2px solid ${arca.headerColor}60`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                background: `${arca.headerColor}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
              
              {!imgError ?
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={arca.imageUrl}
                alt={arca.imageAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={() => setImgError(true)} /> :


              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 8 }}>
                  <div style={{ fontSize: '1.8rem', opacity: 0.4 }}>🖼️</div>
                  <span style={{ fontSize: '0.55rem', color: arca.tabColor, fontFamily: 'Georgia, serif', textAlign: 'center', opacity: 0.7 }}>
                    Gambar tidak tersedia
                  </span>
                </div>
              }
            </div>
          </div>
        </div>

        {/* Scrollbar decoration on right */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 52 + 34,
            bottom: 0,
            width: 14,
            borderLeft: '1.5px solid rgba(92,58,30,0.25)',
            background: '#F5EDD8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 0'
          }}>
          
          <span style={{ fontSize: '0.55rem', color: 'rgba(92,58,30,0.5)' }}>∧</span>
          <div
            style={{
              width: 8,
              height: 40,
              borderRadius: 4,
              background: arca.headerColor,
              opacity: 0.7
            }} />
          
          <span style={{ fontSize: '0.55rem', color: 'rgba(92,58,30,0.5)' }}>∨</span>
        </div>
      </div>
    </div>);

}

export default function ArcaJenisPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAccum = useRef(0);
  const isAnimating = useRef(false);

  const goToNext = useCallback(() => {
    if (isAnimating.current) return;
    setActiveIndex((prev) => {
      if (prev < ARCA_TYPES.length - 1) {
        isAnimating.current = true;
        setTimeout(() => {isAnimating.current = false;}, 600);
        return prev + 1;
      }
      return prev;
    });
  }, []);

  const goToPrev = useCallback(() => {
    if (isAnimating.current) return;
    setActiveIndex((prev) => {
      if (prev > 0) {
        isAnimating.current = true;
        setTimeout(() => {isAnimating.current = false;}, 600);
        return prev - 1;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollAccum.current += e.deltaY;
      if (scrollAccum.current > 80) {
        scrollAccum.current = 0;
        goToNext();
      } else if (scrollAccum.current < -80) {
        scrollAccum.current = 0;
        goToPrev();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goToPrev();
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goToNext();else
        goToPrev();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goToNext, goToPrev]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden select-none"
      style={{ background: '#5C3A1E' }}>
      
      {/* Wood grain overlay */}
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
      

      {/* Back button */}
      <Link
        href="/projects/arca/buku"
        className="absolute top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
        style={{
          background: 'var(--sticker-white, #FFFDE7)',
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
            letterSpacing: '0.06em',
            textShadow: '0 4px 24px rgba(0,0,0,0.5)',
            lineHeight: 1
          }}>
          
          Arca
        </h1>
      </div>

      {/* Card stack container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 80,
          paddingBottom: 80,
          paddingLeft: 'clamp(16px, 4vw, 60px)',
          paddingRight: 'clamp(16px, 4vw, 60px)',
          zIndex: 20,
          perspective: '1200px'
        }}>
        
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 720,
            height: 'clamp(400px, 68vh, 560px)'
          }}>
          
          {ARCA_TYPES.map((arca, index) =>
          <ArcaCard
            key={arca.id}
            arca={arca}
            index={index}
            activeIndex={activeIndex}
            totalCards={ARCA_TYPES.length} />

          )}
        </div>
      </div>

      {/* Navigation arrows */}
      <div
        style={{
          position: 'fixed',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          display: 'flex',
          gap: 12,
          alignItems: 'center'
        }}>
        
        <button
          onClick={goToPrev}
          disabled={activeIndex === 0}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: 'none',
            cursor: activeIndex === 0 ? 'not-allowed' : 'pointer',
            background: activeIndex === 0 ? 'rgba(192,144,96,0.3)' : 'linear-gradient(135deg, #C09060 0%, #A07040 100%)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            opacity: activeIndex === 0 ? 0.5 : 1
          }}>
          
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Counter */}
        <div
          style={{
            background: 'rgba(92,58,30,0.85)',
            borderRadius: 20,
            padding: '6px 16px',
            color: 'rgba(255,240,200,0.9)',
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            fontSize: '0.8rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
          
          {activeIndex + 1} / {ARCA_TYPES.length}
        </div>

        <button
          onClick={goToNext}
          disabled={activeIndex === ARCA_TYPES.length - 1}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: 'none',
            cursor: activeIndex === ARCA_TYPES.length - 1 ? 'not-allowed' : 'pointer',
            background: activeIndex === ARCA_TYPES.length - 1 ? 'rgba(192,144,96,0.3)' : 'linear-gradient(135deg, #C09060 0%, #A07040 100%)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            opacity: activeIndex === ARCA_TYPES.length - 1 ? 0.5 : 1
          }}>
          
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4L12 9L7 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

    </div>);

}