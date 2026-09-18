'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CardData {
  number: string;
  title: string;
  description: string;
  bgPosition: string;
}

const cards: CardData[] = [
  {
    number: '1.1',
    title: 'Pengenalan Bidang Membentuk dan Membuat Binaan',
    description:
      'Bidang Membentuk dan Membuat Binaan merupakan salah satu bidang dalam Pendidikan Seni Visual yang memberi penekanan terhadap penghasilan karya berbentuk tiga dimensi melalui proses penerokaan, pembentukan dan pembinaan. Bidang ini melibatkan penggunaan pelbagai bahan, media dan teknik bagi menghasilkan karya yang mempunyai bentuk, struktur, ruang, jalinan serta nilai estetika.\n\nProses penghasilan karya dalam bidang ini bukan sahaja menekankan hasil akhir, malah turut melibatkan proses kerja artistik yang sistematik bermula daripada pencetusan idea, penerokaan bahan, eksperimentasi teknik, penghasilan karya, kemasan dan apresiasi. Oleh itu, murid berpeluang mengembangkan kreativiti melalui pengalaman pembelajaran yang bersifat hands-on dan berasaskan penerokaan.',
    bgPosition: 'left center',
  },
  {
    number: '1.2',
    title: 'Konsep Membentuk dan Membuat Binaan',
    description:
      'Konsep Membentuk dan Membuat Binaan merujuk kepada proses menghasilkan objek atau karya tiga dimensi dengan memanipulasi bahan tertentu melalui kaedah membentuk, membina, mencantum, melipat, mengukir, meluakkan atau menyusun. Proses tersebut membolehkan sesuatu idea diterjemahkan kepada bentuk fizikal yang dapat dilihat, disentuh dan dinilai dari aspek fungsi serta estetika.\n\nDalam konteks Pendidikan Seni Visual, aktiviti membentuk dan membuat binaan memberi ruang kepada murid untuk meneroka hubungan antara bentuk, ruang, struktur, jalinan, warna dan prinsip rekaan dalam menghasilkan karya yang kreatif dan bermakna.',
    bgPosition: 'right center',
  },
];

// Art-related background images (using Unsplash for art vibes)
const artImages = [
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80', // sculpture/clay art
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', // abstract art installation
];

interface ExpandableCardProps {
  card: CardData;
  artImage: string;
  isExpanded: boolean;
  onToggle: () => void;
}

function ExpandableCard({ card, artImage, isExpanded, onToggle }: ExpandableCardProps) {
  return (
    <div
      onClick={onToggle}
      style={{
        flex: isExpanded ? '3.5' : '1',
        transition: 'flex 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        minWidth: '80px',
        borderRadius: '16px',
      }}
    >
      {/* Card background — art image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${artImage})`,
          backgroundSize: 'cover',
          backgroundPosition: card.bgPosition,
          transform: isExpanded ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isExpanded
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.75) 100%)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 100%)',
          transition: 'background 0.55s ease',
        }}
      />

      {/* COLLAPSED STATE — number badge centered */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          opacity: isExpanded ? 0 : 1,
          transition: 'opacity 0.3s ease',
          pointerEvents: isExpanded ? 'none' : 'auto',
          zIndex: 2,
        }}
      >
        {/* Number badge */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Georgia", serif',
            fontSize: '16px',
            fontWeight: 700,
            color: '#FFFFFF',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          {card.number}
        </div>
      </div>

      {/* EXPANDED STATE — number + title at top, description below */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '36px 32px 40px',
          opacity: isExpanded ? 1 : 0,
          transition: 'opacity 0.35s ease 0.2s',
          pointerEvents: isExpanded ? 'auto' : 'none',
          zIndex: 2,
          overflowY: 'auto',
        }}
      >
        {/* Number + Title row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {/* Number badge */}
          <div
            style={{
              flexShrink: 0,
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.18)',
              border: '2px solid rgba(255,255,255,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Georgia", serif',
              fontSize: '15px',
              fontWeight: 700,
              color: '#FFFFFF',
              backdropFilter: 'blur(6px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            {card.number}
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: '"Georgia", serif',
              fontSize: 'clamp(1rem, 2vw, 1.45rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.03em',
              lineHeight: 1.35,
              margin: 0,
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              paddingTop: '6px',
            }}
          >
            {card.title}
          </h2>
        </div>

        {/* Decorative divider */}
        <div
          style={{
            width: '60px',
            height: '2px',
            background: 'rgba(210,170,100,0.85)',
            borderRadius: '2px',
            marginBottom: '20px',
          }}
        />

        {/* Description text */}
        <div
          style={{
            fontFamily: '"Segoe UI", sans-serif',
            fontSize: 'clamp(0.82rem, 1.3vw, 1rem)',
            color: 'rgba(240,230,210,0.92)',
            lineHeight: 1.75,
            whiteSpace: 'pre-line',
          }}
        >
          {card.description}
        </div>
      </div>
    </div>
  );
}

export default function PengenalanPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* Background image — wooden desk */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/IMG_2667-1789661380498.jpeg"
          alt="Meja kayu sebagai latar belakang halaman pengenalan"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(30,18,8,0.55)' }}
        />
      </div>

      {/* Page title — top center */}
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
            1.0 PENGENALAN
          </h1>
        </div>
      </div>

      {/* Expandable cards — full screen height */}
      <div
        className="relative z-10 flex-1 flex items-stretch"
        style={{
          padding: '16px 24px',
          gap: '12px',
          minHeight: 'calc(100vh - 180px)',
        }}
      >
        {cards.map((card, index) => (
          <ExpandableCard
            key={card.number}
            card={card}
            artImage={artImages[index]}
            isExpanded={expandedIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>

      {/* Navigation buttons — bottom */}
      <div className="relative z-10 flex justify-between items-center px-8 pb-8 pt-2">
        <Link href="/desk">
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
            Kembali
          </button>
        </Link>

        <Link href="/pengenalan-up">
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
