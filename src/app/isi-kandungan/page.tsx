'use client';

import React from 'react';
import Link from 'next/link';

export default function IsiKandunganPage() {
  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#3D5A3E', padding: '20px' }}
    >
      {/* Decorative background shapes */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: -40, left: -30,
          width: 200, height: 200,
          background: '#F5E642',
          borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%',
          opacity: 0.9,
        }} />
        <div style={{
          position: 'absolute', top: 8, right: 80,
          width: 0, height: 0,
          borderLeft: '55px solid transparent',
          borderRight: '55px solid transparent',
          borderBottom: '95px solid #2A7A6A',
          opacity: 0.95,
        }} />
        <div style={{
          position: 'absolute', top: -12, right: 30,
          width: 0, height: 0,
          borderLeft: '44px solid transparent',
          borderRight: '44px solid transparent',
          borderBottom: '76px solid #E8622A',
          opacity: 0.95,
        }} />
        <svg style={{ position: 'absolute', top: 30, right: 200 }} width="52" height="52" viewBox="0 0 60 60">
          <polygon points="30,2 36,22 58,22 41,35 47,56 30,43 13,56 19,35 2,22 24,22" fill="#F5E642" opacity="0.9" />
        </svg>
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
        <div style={{
          position: 'absolute', bottom: 10, left: -40,
          width: 140, height: 140,
          background: '#2A7A6A',
          borderRadius: '50%',
          opacity: 0.75,
        }} />
        <div style={{ position: 'absolute', top: 130, left: 50, width: 13, height: 13, background: '#F5E642', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: 90, left: 95, width: 9, height: 9, background: '#E8622A', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: 150, right: 170, width: 11, height: 11, background: '#F5E642', borderRadius: '50%' }} />
      </div>

      {/* Kembali button */}
      <Link href="/penghargaan" className="absolute z-30" style={{ top: 20, left: 20 }}>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.92)',
            border: 'none',
            borderRadius: 24,
            padding: '8px 16px',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 13,
            color: '#3D2B1F',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
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
          borderRadius: 20,
          width: '92%',
          maxWidth: 860,
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        }}
      >
        {/* Heading */}
        <h1
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 28,
            fontWeight: 900,
            color: 'white',
            margin: '0 0 16px 0',
            lineHeight: 1,
            letterSpacing: -0.5,
            textShadow: '2px 3px 0px rgba(0,0,0,0.15)',
            textAlign: 'center',
          }}
        >
          Isi Kandungan
        </h1>

        {/* TOC content — two columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0 24px',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            color: 'white',
          }}
        >
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TocItem num="1." text="Pengenalan" bold />
            <TocItem num="1.1" text="Pengenalan Bidang Membentuk dan Membuat Binaan" indent />
            <TocItem num="1.2" text="Konsep Membentuk dan Membuat Binaan" indent />
            <TocItem num="1.3" text="Unsur Seni dan Prinsip Rekaan" indent />
            <TocItem num="2." text="Proses Kerja Artistik" bold />
            <TocItem num="3." text="Kraf" bold />
            <TocItem num="3.1" text="Topeng" indent />
            <TocItem num="3.2" text="Boneka" indent />
            <TocItem num="3.3" text="Origami" indent />
            <TocItem num="3.4" text="Model" indent />
            <TocItem num="3.5" text="Diorama" indent />
            <TocItem num="4." text="Arca" bold />
            <TocItem num="4.1" text="Arca Timbulan" indent />
            <TocItem num="4.2" text="Arca Luakan" indent />
            <TocItem num="4.3" text="Arca Asemblaj" indent />
            <TocItem num="4.4" text="Arca Mobail" indent />
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TocItem num="4.5" text="Arca Stabail" indent />
            <TocItem num="4.6" text="Arca Binaan" indent />
            <TocItem num="4.7" text="Arca Kinetik" indent />
            <TocItem num="4.8" text="Arca Instalasi" indent />
            <TocItem num="5." text="Perbandingan Kraf dan Arca" bold />
            <TocItem num="6." text="Kepentingan Membentuk dan Membuat Binaan dalam PSV Sekolah Rendah" bold />
            <TocItem num="6.1" text="Kreativiti" indent />
            <TocItem num="6.2" text="Pemikiran Kritis" indent />
            <TocItem num="6.3" text="Motor Halus" indent />
            <TocItem num="6.4" text="Hands-on" indent />
            <TocItem num="6.5" text="Estetika" indent />
            <TocItem num="6.6" text="Ekspresi Diri" indent />
            <TocItem num="6.7" text="Budaya" indent />
            <TocItem num="6.8" text="Kolaborasi" indent />
            <TocItem num="7." text="Refleksi" bold />
            <TocItem num="8." text="Rumusan" bold />
            <TocItem num="9." text="Rujukan" bold />
          </div>
        </div>
      </div>
    </div>
  );
}

function TocItem({ num, text, bold, indent }: { num: string; text: string; bold?: boolean; indent?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        paddingLeft: indent ? 12 : 0,
        paddingTop: bold ? 6 : 1,
      }}
    >
      <span
        style={{
          fontWeight: bold ? 800 : 500,
          fontSize: bold ? 11 : 10,
          color: bold ? '#fff' : 'rgba(255,255,255,0.88)',
          minWidth: indent ? 28 : 20,
          flexShrink: 0,
          lineHeight: 1.4,
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontWeight: bold ? 800 : 400,
          fontSize: bold ? 11 : 10,
          color: bold ? '#fff' : 'rgba(255,255,255,0.88)',
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );
}
