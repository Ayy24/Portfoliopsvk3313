'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PenghargaanPage() {
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
      <Link href="/profil-diri" className="absolute z-30" style={{ top: 20, left: 20 }}>
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

      {/* Main card — with picture on right */}
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
          {/* Penghargaan heading */}
          <h1
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 44,
              fontWeight: 900,
              color: 'white',
              margin: '0 0 18px 0',
              lineHeight: 1,
              letterSpacing: -1,
              textShadow: '2px 3px 0px rgba(0,0,0,0.15)',
            }}
          >
            Penghargaan
          </h1>

          {/* Penghargaan text */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 12,
            padding: '16px 18px',
            borderLeft: '4px solid rgba(255,255,255,0.6)',
            flex: 1,
          }}>
            <p style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 13,
              color: 'white',
              lineHeight: 1.75,
              margin: '0 0 12px 0',
              fontWeight: 500,
            }}>
              Setinggi-tinggi penghargaan dan terima kasih saya ucapkan kepada pensyarah, Puan Nur Faizah Binti Che Me, yang telah memberikan bimbingan, tunjuk ajar dan dorongan sepanjang proses menyiapkan e-portfolio ini. Segala perkongsian ilmu, teguran serta pandangan yang diberikan banyak membantu saya dalam memahami konsep, proses dan penghasilan karya dalam bidang Membentuk dan Membuat Binaan.
            </p>
            <p style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 13,
              color: 'white',
              lineHeight: 1.75,
              margin: '0 0 12px 0',
              fontWeight: 500,
            }}>
              Saya amat menghargai setiap ilmu dan pengalaman yang dikongsikan kerana ia bukan sahaja membantu dalam penyempurnaan tugasan, malah memberi ruang kepada saya untuk meneroka idea, memperbaiki kemahiran serta meningkatkan keyakinan dalam menghasilkan karya seni.
            </p>
            <p style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 13,
              color: 'white',
              lineHeight: 1.75,
              margin: 0,
              fontWeight: 500,
            }}>
              Terima kasih atas kesabaran, komitmen dan sokongan yang diberikan sepanjang proses pembelajaran. Segala bimbingan yang diterima akan saya jadikan sebagai pengalaman dan bekalan untuk terus berkembang sebagai seorang pendidik dan pengkarya seni yang lebih kreatif, kritis dan berdaya saing.
            </p>
          </div>

          {/* Seterusnya button */}
          <div style={{ marginTop: 24 }}>
            <Link href="/isi-kandungan">
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

        {/* Right side — Nur Faizah picture in stamp frame */}
        <div
          style={{
            position: 'relative',
            width: 260,
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
          {/* Name tag — above the frame, no overlap */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'white',
              borderRadius: 12,
              padding: '8px 14px',
              border: '3px solid #1A4FA0',
              zIndex: 20,
              boxShadow: '2px 3px 8px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: 10, fontWeight: 700, color: '#333', letterSpacing: 1 }}>Pensyarah</div>
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: 16,
              fontWeight: 900,
              color: '#E8622A',
              lineHeight: 1.2,
              letterSpacing: -0.5,
            }}>Pn. Nur Faizah</div>
          </div>

          {/* Stamp frame — straight (no rotation) */}
          <div
            style={{
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
                <div style={{ width: 190, height: 250, position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                  <Image
                    src="/assets/images/___main_character_needs_a_title___-1789728175479.png"
                    alt="Puan Nur Faizah Binti Che Me, pensyarah PSVK 3313"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    sizes="190px"
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
