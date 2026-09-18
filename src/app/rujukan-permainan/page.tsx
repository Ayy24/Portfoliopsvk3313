'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const refleksiText = `Sepanjang mempelajari subjek ini, saya memperoleh pengetahuan baharu tentang kraf dan arca serta proses penghasilan karya secara lebih terperinci. Saya mendapati pembelajaran ini menarik kerana memberi peluang untuk meneroka idea, teknik dan bahan yang berbeza, di samping meningkatkan kreativiti dan pemahaman saya terhadap bidang PSV.

Proses menghasilkan e-portfolio pula memberikan pengalaman baharu dalam menyusun maklumat dan menyampaikan kandungan secara lebih kreatif. Saya turut berpeluang mempelajari penggunaan platform digital yang baharu, sekali gus meningkatkan kemahiran teknologi dan memberi pendedahan kepada saya tentang bagaimana teknologi boleh dimanfaatkan untuk menghasilkan bahan pembelajaran PSV yang lebih interaktif dan menarik.`;

const rumusanText = `Secara keseluruhannya, penghasilan e-portfolio ini telah memberikan saya pemahaman yang lebih mendalam tentang bidang Membentuk dan Membuat Binaan, khususnya dalam aspek kraf dan arca. Penerokaan terhadap konsep, ciri, bahan, teknik dan proses penghasilan menjadikan pembelajaran lebih menarik serta membantu saya memahami kepentingan kreativiti, perancangan dan nilai estetika dalam penghasilan karya seni.

Pengetahuan yang diperoleh juga merupakan satu asas penting dalam Pendidikan Seni Visual (PSV), khususnya sebagai bakal pendidik. Portfolio ini bukan sahaja memperkukuh pemahaman saya terhadap kandungan pembelajaran, malah membantu saya menghargai proses kreatif dan kepelbagaian dalam penghasilan karya seni.`;

function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        fontFamily: '"Segoe UI", sans-serif',
        fontSize: 'clamp(0.72rem, 1.5vw, 0.82rem)',
        color: '#3B2008',
        lineHeight: 1.6,
        whiteSpace: 'pre-line',
      }}
    >
      {text}
    </div>
  );
}

export default function PenutupPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center" style={{ padding: '70px 20px' }}>
      {/* Background image */}
      <Image
        src="/assets/images/IMG_2686-1789723596005.jpeg"
        alt="Wooden plank with ivy leaves background"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
      />

      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'rgba(30, 18, 8, 0.35)' }}
      />

      {/* Kembali button — top left */}
      <Link
        href="/desk"
        className="absolute z-30"
        style={{ top: '16px', left: '20px' }}
      >
        <button
          style={{
            background: 'rgba(255, 245, 225, 0.88)',
            border: '2px solid rgba(160, 100, 40, 0.6)',
            borderRadius: '12px',
            padding: '8px 18px',
            fontFamily: '"Segoe UI", sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            color: '#5C3A1E',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            letterSpacing: '0.03em',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(4px)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255, 235, 190, 1)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255, 245, 225, 0.88)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
          }}
        >
          ← Kembali
        </button>
      </Link>

      {/* Seterusnya button — top right */}
      <Link
        href="/rujukan-permainan/rujukan"
        className="absolute z-30"
        style={{ top: '16px', right: '20px' }}
      >
        <button
          style={{
            background: 'rgba(255, 245, 225, 0.88)',
            border: '2px solid rgba(160, 100, 40, 0.6)',
            borderRadius: '12px',
            padding: '8px 18px',
            fontFamily: '"Segoe UI", sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            color: '#5C3A1E',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            letterSpacing: '0.03em',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(4px)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255, 235, 190, 1)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255, 245, 225, 0.88)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
          }}
        >
          Seterusnya →
        </button>
      </Link>

      {/* Center content box */}
      <div
        className="relative z-20 flex flex-col"
        style={{
          width: 'min(96vw, 960px)',
          background: 'rgba(255, 248, 230, 0.88)',
          border: '3px solid rgba(160, 100, 40, 0.55)',
          borderRadius: '20px',
          boxShadow: '0 12px 48px rgba(0,0,0,0.45), 0 2px 0 rgba(255,255,255,0.5) inset',
          backdropFilter: 'blur(6px)',
          overflow: 'hidden',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(160, 100, 40, 0.85) 0%, rgba(120, 70, 20, 0.9) 100%)',
            padding: '14px 28px 12px',
            borderBottom: '2px solid rgba(160, 100, 40, 0.4)',
            flexShrink: 0,
          }}
        >
          <h1
            style={{
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(1.2rem, 3.5vw, 1.7rem)',
              color: '#FFF8E7',
              textAlign: 'center',
              letterSpacing: '0.06em',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              margin: 0,
            }}
          >
            Penutup
          </h1>
        </div>

        {/* Content area */}
        <div
          style={{
            padding: '16px 26px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Refleksi section */}
          <div>
            <h2
              style={{
                fontFamily: '"Segoe UI", sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                color: '#7A3B10',
                letterSpacing: '0.08em',
                marginBottom: '8px',
                textTransform: 'uppercase',
                borderBottom: '2px solid rgba(160, 100, 40, 0.35)',
                paddingBottom: '4px',
              }}
            >
              Refleksi
            </h2>
            <AnimatedText text={refleksiText} delay={200} />
          </div>

          {/* Rumusan section */}
          <div>
            <h2
              style={{
                fontFamily: '"Segoe UI", sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                color: '#7A3B10',
                letterSpacing: '0.08em',
                marginBottom: '8px',
                textTransform: 'uppercase',
                borderBottom: '2px solid rgba(160, 100, 40, 0.35)',
                paddingBottom: '4px',
              }}
            >
              Rumusan
            </h2>
            <AnimatedText text={rumusanText} delay={600} />
          </div>
        </div>
      </div>
    </div>
  );
}
