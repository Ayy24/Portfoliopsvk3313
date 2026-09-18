'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilDiriPage() {
  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#3D5A3E', padding: '40px 20px' }}
    >
      {/* Decorative background shapes */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Top-left yellow blob */}
        <div style={{
          position: 'absolute', top: -40, left: -30,
          width: 200, height: 200,
          background: '#F5E642',
          borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%',
          opacity: 0.9,
        }} />
        {/* Top-right teal triangle */}
        <div style={{
          position: 'absolute', top: 8, right: 80,
          width: 0, height: 0,
          borderLeft: '55px solid transparent',
          borderRight: '55px solid transparent',
          borderBottom: '95px solid #2A7A6A',
          opacity: 0.95,
        }} />
        {/* Top-right orange triangle */}
        <div style={{
          position: 'absolute', top: -12, right: 30,
          width: 0, height: 0,
          borderLeft: '44px solid transparent',
          borderRight: '44px solid transparent',
          borderBottom: '76px solid #E8622A',
          opacity: 0.95,
        }} />
        {/* Top-right yellow star */}
        <svg style={{ position: 'absolute', top: 30, right: 200 }} width="52" height="52" viewBox="0 0 60 60">
          <polygon points="30,2 36,22 58,22 41,35 47,56 30,43 13,56 19,35 2,22 24,22" fill="#F5E642" opacity="0.9" />
        </svg>
        {/* Bottom-right blue+orange badge */}
        <div style={{
          position: 'absolute', bottom: -30, right: -30,
          width: 180, height: 180,
          background: '#1A4FA0',
          borderRadius: '50%',
          opacity: 0.9,
        }}>
          <div style={{
            position: 'absolute', top: 22, left: 22,
            width: 136, height: 136,
            background: '#E8622A',
            borderRadius: '50%',
          }} />
        </div>
        {/* Bottom-left green circle */}
        <div style={{
          position: 'absolute', bottom: 10, left: -40,
          width: 140, height: 140,
          background: '#2A7A6A',
          borderRadius: '50%',
          opacity: 0.75,
        }} />
        {/* Small dots */}
        <div style={{ position: 'absolute', top: 130, left: 50, width: 13, height: 13, background: '#F5E642', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: 90, left: 95, width: 9, height: 9, background: '#E8622A', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: 150, right: 170, width: 11, height: 11, background: '#F5E642', borderRadius: '50%' }} />
      </div>

      {/* Kembali button */}
      <Link href="/desk" className="absolute z-30" style={{ top: 20, left: 20 }}>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.92)',
            border: 'none',
            borderRadius: 24,
            padding: '10px 20px',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 15,
            color: '#3D2B1F',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9L11 14" stroke="#3D2B1F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali
        </button>
      </Link>

      {/* Main card */}
      <div
        className="relative z-10"
        style={{
          background: '#E8622A',
          borderRadius: 24,
          width: '92%',
          maxWidth: 920,
          padding: '40px 0 40px 40px',
          display: 'flex',
          alignItems: 'stretch',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
          overflow: 'visible',
          minHeight: 420,
        }}
      >
        {/* Left side — content */}
        <div
          style={{
            flex: 1,
            paddingRight: 28,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* HAI! heading */}
          <h1
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 50,
              fontWeight: 900,
              color: 'white',
              margin: '0 0 18px 0',
              lineHeight: 1,
              letterSpacing: -1,
              textShadow: '2px 3px 0px rgba(0,0,0,0.15)',
            }}
          >
            HAI!
          </h1>

          {/* Personal details table */}
          <div style={{ marginBottom: 18 }}>
            {[
              { label: 'Nama', value: 'NUR ALYA BATRISIYA AMANI BINTI NORAZLAN' },
              { label: 'Nombor Kad Pengenalan', value: '050524110688' },
              { label: 'Angka Giliran', value: '2025302340163' },
              { label: 'Kumpulan / Unit', value: 'PISMP PSV 1' },
              { label: 'Kod dan Nama Kursus', value: 'PSVK 3313 BENTUK DAN BINAAN' },
              { label: 'Nama Pensyarah', value: 'PN. NUR FAIZAH BINTI CHE ME' },
              { label: 'Tarikh Hantar', value: '18 SEPTEMBER 2025' },
            ]?.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 0,
                  marginBottom: 5,
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: 13,
                  color: 'white',
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                <span style={{ minWidth: 170, flexShrink: 0, fontWeight: 600 }}>{item?.label}</span>
                <span style={{ marginRight: 6, fontWeight: 600 }}>:</span>
                <span style={{ fontWeight: 500 }}>{item?.value}</span>
              </div>
            ))}
          </div>

          {/* Sinopsis */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 12,
            padding: '14px 16px',
            borderLeft: '4px solid rgba(255,255,255,0.6)',
            marginBottom: 20,
          }}>
            <p style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 12.5,
              color: 'white',
              lineHeight: 1.7,
              margin: 0,
              fontWeight: 500,
            }}>
              E-Portfolio ini membincangkan bidang Membentuk dan Membuat Binaan dalam Pendidikan Seni Visual dengan memberi fokus kepada penerokaan dan penghasilan kraf dan arca. Perbincangan merangkumi definisi, jenis, bahan dan media, teknik, proses kerja artistik serta nilai estetika bagi setiap karya. Portfolio ini turut membuat perbandingan antara kraf dan arca serta melihat kepentingan bidang ini dalam mengembangkan kreativiti, kemahiran dan pengalaman pembelajaran murid di sekolah rendah.
            </p>
          </div>

          {/* Seterusnya button */}
          <div>
            <Link href="/penghargaan">
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'white',
                  border: 'none',
                  borderRadius: 24,
                  padding: '12px 28px',
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#E8622A',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}
              >
                Seterusnya
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M7 4L12 9L7 14" stroke="#E8622A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Right side — photo frame only */}
        <div
          style={{
            position: 'relative',
            width: 280,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 60,
            paddingBottom: 20,
            paddingRight: 20,
          }}
        >
          {/* Hello I'm name tag — above the frame */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: '50%',
              transform: 'translateX(-50%) rotate(3deg)',
              background: 'white',
              borderRadius: 12,
              padding: '8px 18px',
              border: '3px solid #1A4FA0',
              zIndex: 20,
              boxShadow: '2px 3px 8px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: 11, fontWeight: 700, color: '#333', letterSpacing: 1 }}>Saya</div>
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: 26,
              fontWeight: 900,
              color: '#E8622A',
              lineHeight: 1,
              letterSpacing: -1,
            }}>Amani</div>
          </div>

          {/* Enlarged stamp / photo frame */}
          <div
            style={{
              transform: 'rotate(-3deg)',
              zIndex: 15,
            }}
          >
            {/* Perforated stamp border */}
            <div style={{
              background: '#4A7A4B',
              padding: 12,
              borderRadius: 6,
              boxShadow: '2px 4px 18px rgba(0,0,0,0.4)',
              backgroundImage: 'radial-gradient(circle, #3D5A3E 2px, transparent 2px)',
              backgroundSize: '10px 10px',
            }}>
              <div style={{
                background: 'white',
                padding: 6,
                borderRadius: 3,
              }}>
                <div style={{ width: 200, height: 260, position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                  <Image
                    src="/assets/images/DSC_0294-1789720930127.jpeg"
                    alt="Profile photo of Nur Alya Batrisiya Amani in stamp frame"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    sizes="200px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
