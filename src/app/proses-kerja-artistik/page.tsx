'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface StepData {
  number: string;
  title: string;
  description: string;
}

const steps: StepData[] = [
  {
    number: '1',
    title: 'Penerokaan Idea',
    description: 'Mencari dan mengembangkan idea berdasarkan tema, pengalaman dan pemerhatian.',
  },
  {
    number: '2',
    title: 'Perancangan',
    description: 'Menghasilkan lakaran serta menentukan bentuk dan konsep karya.',
  },
  {
    number: '3',
    title: 'Pemilihan Bahan & Teknik',
    description: 'Memilih bahan, media dan teknik yang sesuai dengan karya.',
  },
  {
    number: '4',
    title: 'Penghasilan Karya',
    description: 'Membentuk, membina atau mencantum bahan mengikut perancangan.',
  },
  {
    number: '5',
    title: 'Kemasan',
    description: 'Memperkemas struktur, permukaan, warna dan keseluruhan karya.',
  },
  {
    number: '6',
    title: 'Apresiasi & Penilaian',
    description: 'Menilai karya dari aspek bentuk, ruang, jalinan, imbangan dan nilai estetika.',
  },
];

const stepColors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f97316'];

export default function ProsesKerjaArtistikPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/IMG_2667-1789661380498.jpeg"
          alt="Meja kayu sebagai latar belakang halaman proses kerja artistik"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(30,18,8,0.55)' }}
        />
      </div>

      {/* Page title */}
      <div className="relative z-10 flex justify-center pt-10 pb-4">
        <div
          style={{
            background: 'rgba(20,12,4,0.72)',
            backdropFilter: 'blur(10px)',
            borderRadius: '14px',
            padding: '12px 40px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(210,170,100,0.2) inset',
            border: '1.5px solid rgba(210,170,100,0.35)',
          }}
        >
          <h1
            style={{
              fontFamily: '"Georgia", serif',
              fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)',
              fontWeight: 800,
              color: '#F5E6C8',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: 0,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            2.0 Proses Kerja Artistik
          </h1>
        </div>
      </div>

      {/* Main content area */}
      <div
        className="relative z-10 flex-1 flex flex-col"
        style={{ padding: '0 24px 16px', gap: '16px' }}
      >
        {/* Intro paragraph */}
        <div
          style={{
            background: 'rgba(20,12,4,0.65)',
            backdropFilter: 'blur(10px)',
            borderRadius: '14px',
            padding: '18px 24px',
            border: '1px solid rgba(210,170,100,0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <p
            style={{
              fontFamily: '"Segoe UI", sans-serif',
              fontSize: 'clamp(0.82rem, 1.4vw, 1rem)',
              color: 'rgba(240,230,210,0.92)',
              lineHeight: 1.75,
              margin: '0 0 12px 0',
            }}
          >
            Proses kerja artistik merupakan satu proses yang sistematik dalam menghasilkan sesuatu karya seni, bermula daripada pencetusan idea sehingga karya siap. Dalam bidang Membentuk dan Membuat Binaan, proses ini melibatkan beberapa peringkat utama seperti penerokaan idea, perancangan, pemilihan bahan dan teknik, penghasilan karya, kemasan serta apresiasi.
          </p>
          <p
            style={{
              fontFamily: '"Segoe UI", sans-serif',
              fontSize: 'clamp(0.82rem, 1.4vw, 1rem)',
              color: 'rgba(240,230,210,0.92)',
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Pada peringkat awal, idea diteroka melalui pemerhatian, pengalaman dan lakaran. Seterusnya, bahan serta teknik yang sesuai dipilih berdasarkan konsep dan bentuk karya yang ingin dihasilkan. Proses penghasilan kemudiannya dilakukan melalui percubaan, pembentukan atau pembinaan sehingga menghasilkan karya yang dikehendaki. Karya akhir diperiksa dan dikemaskan sebelum dinilai dari aspek bentuk, struktur, ruang, jalinan, imbangan dan nilai estetika. Proses ini membolehkan pengkarya membuat penambahbaikan serta menghasilkan karya yang lebih terancang dan bermakna.
          </p>
        </div>

        {/* Steps grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            flex: 1,
          }}
        >
          {steps.map((step, index) => {
            const isExpanded = expandedIndex === index;
            const color = stepColors[index];
            return (
              <div
                key={step.number}
                onClick={() => handleToggle(index)}
                style={{
                  background: isExpanded
                    ? `linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)`
                    : 'rgba(20,12,4,0.60)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '14px',
                  border: isExpanded
                    ? `1.5px solid ${color}99`
                    : '1px solid rgba(210,170,100,0.2)',
                  padding: '18px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isExpanded
                    ? `0 8px 28px rgba(0,0,0,0.35), 0 0 0 1px ${color}33`
                    : '0 4px 16px rgba(0,0,0,0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {/* Number badge + title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: `0 3px 10px ${color}66`,
                    }}
                  >
                    <span
                      style={{
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '14px',
                        fontFamily: '"Georgia", serif',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: '"Georgia", serif',
                      fontSize: 'clamp(0.82rem, 1.5vw, 1rem)',
                      fontWeight: 800,
                      color: '#F5E6C8',
                      margin: 0,
                      lineHeight: 1.3,
                      textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                    }}
                  >
                    {step.title}
                  </h3>
                </div>

                {/* Description — always visible */}
                <p
                  style={{
                    fontFamily: '"Segoe UI", sans-serif',
                    fontSize: 'clamp(0.78rem, 1.2vw, 0.9rem)',
                    color: 'rgba(240,230,210,0.85)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>

                {/* Decorative bottom line */}
                <div
                  style={{
                    height: '2px',
                    background: `linear-gradient(90deg, ${color}88, transparent)`,
                    borderRadius: '2px',
                    marginTop: 'auto',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="relative z-10 flex justify-between items-center px-8 pb-8 pt-2">
        <Link href="/pengenalan-prinsip">
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(20,12,4,0.72)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(210,170,100,0.4)',
              borderRadius: '50px',
              padding: '12px 28px',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 700,
              fontSize: '15px',
              color: '#F5E6C8',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(20,12,4,0.9)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(20,12,4,0.72)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Sebelumnya
          </button>
        </Link>

        <Link href="/projects">
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(210,170,100,0.85)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(210,170,100,0.6)',
              borderRadius: '50px',
              padding: '12px 28px',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 700,
              fontSize: '15px',
              color: '#1A0E04',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(210,170,100,1)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(210,170,100,0.85)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            Seterusnya
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
