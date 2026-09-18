'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// ─── Data ─────────────────────────────────────────────────────────────────────
interface PrinsipItem {
  id: string;
  number: number;
  label: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  color: string;
  colorLight: string;
}

const PRINSIP_DATA: PrinsipItem[] = [
{
  id: 'harmoni',
  number: 1,
  label: 'Harmoni',
  description: 'Harmoni merujuk kepada keserasian antara unsur seni yang menghasilkan kesan visual yang menyenangkan dan tidak bercanggah.',
  // Harmonious colour palette / complementary colour wheel — accurate for Harmoni
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4b1cfb045-1789672553715.png",
  imageAlt: 'Harmoni — susunan warna dan bentuk yang selaras dan harmoni dalam seni',
  color: '#C8384A',
  colorLight: 'rgba(200,56,74,0.18)'
},
{
  id: 'imbangan',
  number: 2,
  label: 'Imbangan',
  description: 'Imbangan merujuk kepada susunan unsur yang menghasilkan kestabilan dari aspek visual atau fizikal. Dalam karya tiga dimensi, imbangan juga penting bagi memastikan struktur karya dapat berdiri atau berfungsi dengan baik.',
  // Balanced stacked stones — classic visual for Imbangan
  imageUrl: "https://images.unsplash.com/photo-1646666215189-a47985110f69",
  imageAlt: 'Imbangan — batu-batu yang disusun seimbang menunjukkan kestabilan visual',
  color: '#2272C3',
  colorLight: 'rgba(34,114,195,0.18)'
},
{
  id: 'kesatuan',
  number: 3,
  label: 'Kesatuan',
  description: 'Kesatuan merujuk kepada hubungan yang erat antara unsur dan bahagian karya sehingga membentuk satu komposisi yang lengkap dan menyeluruh.',
  // Mosaic / unified pattern — accurate for Kesatuan
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4709b7bee-1789672553726.png",
  imageAlt: 'Kesatuan — corak dan elemen yang bersatu membentuk satu komposisi menyeluruh',
  color: '#D4780A',
  colorLight: 'rgba(212,120,10,0.18)'
},
{
  id: 'kontra',
  number: 4,
  label: 'Kontra',
  description: 'Kontra terhasil melalui perbezaan antara unsur seperti warna, bentuk, saiz, jalinan atau ruang. Kontra dapat mewujudkan penegasan dan menarik perhatian terhadap bahagian tertentu karya.',
  // High contrast black & white / light & dark — accurate for Kontra
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4213b8812-1789672553754.png",
  imageAlt: 'Kontra — perbezaan warna terang dan gelap yang ketara dalam karya seni',
  color: '#7B2FA0',
  colorLight: 'rgba(123,47,160,0.18)'
},
{
  id: 'penegasan',
  number: 5,
  label: 'Penegasan',
  description: 'Penegasan ialah penonjolan sesuatu unsur atau bahagian tertentu sebagai fokus utama dalam karya. Ia boleh dicapai melalui perbezaan warna, saiz, bentuk, kedudukan atau jalinan.',
  // Single focal point / spotlight — accurate for Penegasan
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4027d5090-1789672553396.png",
  imageAlt: 'Penegasan — satu elemen menonjol sebagai fokus utama yang menarik perhatian',
  color: '#2E8B4A',
  colorLight: 'rgba(46,139,74,0.18)'
},
{
  id: 'irama',
  number: 6,
  label: 'Irama dan Pergerakan',
  description: 'Irama terhasil daripada pengulangan atau susunan unsur secara tertentu, manakala pergerakan merujuk kepada kesan gerak yang wujud secara fizikal atau secara visual. Prinsip ini amat ketara dalam karya seperti arca mobail dan arca kinetik.',
  // Repeating wave / rhythm pattern — accurate for Irama dan Pergerakan
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_45fbaa8a0-1789672552804.png",
  imageAlt: 'Irama dan Pergerakan — gelombang berulang yang menunjukkan irama dan pergerakan visual',
  color: '#C04A20',
  colorLight: 'rgba(192,74,32,0.18)'
},
{
  id: 'kepelbagaian',
  number: 7,
  label: 'Kepelbagaian',
  description: 'Kepelbagaian merujuk kepada penggunaan variasi unsur seperti bentuk, saiz, warna, jalinan dan bahan bagi mengelakkan karya kelihatan monoton serta meningkatkan daya tarikan visual.',
  // Variety of colourful flowers / diverse elements — accurate for Kepelbagaian
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_16a5140b3-1774470262957.png",
  imageAlt: 'Kepelbagaian — pelbagai jenis bunga berwarna-warni menunjukkan variasi dan kepelbagaian',
  color: '#0E8A9E',
  colorLight: 'rgba(14,138,158,0.18)'
}];


// ─── FAQ Item Component ───────────────────────────────────────────────────────
interface FAQItemProps {
  item: PrinsipItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ item, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      style={{
        background: isOpen ?
        `linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.12) 100%)` :
        `linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '16px',
        border: isOpen ?
        `1.5px solid ${item.color}88` :
        '1.5px solid rgba(255,255,255,0.25)',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, background 0.3s ease',
        boxShadow: isOpen ?
        `0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)` :
        `0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)`
      }}>
      
      {/* Header row — always visible */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 16px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left'
        }}>
        
        {/* Number badge */}
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: item.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 2px 8px ${item.color}66`
        }}>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: '13px', fontFamily: '"Segoe UI", sans-serif' }}>
            {item.number}
          </span>
        </div>

        {/* Label */}
        <span style={{
          flex: 1,
          fontFamily: '"Segoe UI", "Inter", "Arial", sans-serif',
          fontSize: 'clamp(0.88rem, 2.5vw, 1.05rem)',
          fontWeight: 700,
          color: '#ffffff',
          textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          letterSpacing: '0.02em'
        }}>
          {item.label}
        </span>

        {/* Chevron */}
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Expandable content — two-column: text left, image right */}
      <div style={{
        maxHeight: isOpen ? '2400px' : '0px',
        overflow: isOpen ? 'visible' : 'hidden',
        transition: 'max-height 0.65s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div style={{ padding: '0 16px 18px' }}>
          {/* Divider */}
          <div style={{ height: '1px', background: `linear-gradient(90deg, ${item.color}66, transparent)`, marginBottom: '14px' }} />

          {/* Two-column layout: description left, image right */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            alignItems: 'flex-start'
          }}>
            {/* Left: Description */}
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <p style={{
                fontFamily: '"Georgia", "Times New Roman", serif',
                fontSize: 'clamp(1.1rem, 2.8vw, 1.45rem)',
                fontWeight: 800,
                color: '#ffffff',
                margin: '0 0 10px 0',
                textShadow: `0 1px 8px ${item.color}99`,
                letterSpacing: '0.03em'
              }}>
                {item.label}
              </p>
              <p style={{
                fontFamily: '"Georgia", serif',
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.92)',
                margin: 0,
                textShadow: '0 1px 3px rgba(0,0,0,0.4)'
              }}>
                {item.description}
              </p>
            </div>

            {/* Right: Image */}
            <div style={{
              flex: '1 1 0',
              minWidth: 0,
              borderRadius: '14px',
              border: `2px solid ${item.color}66`,
              boxShadow: `0 6px 24px rgba(0,0,0,0.4), 0 0 0 1px ${item.color}22`,
              background: 'rgba(0,0,0,0.2)'
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.imageAlt}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '12px'
                }} />
            </div>
          </div>
        </div>
      </div>
    </div>);

}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PengenalanPrinsipPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => prev === id ? null : id);
  };

  return (
    <div className="relative w-full min-h-screen" style={{ fontFamily: '"Georgia", serif', display: 'flex', flexDirection: 'column' }}>

      {/* ── Background — real beach view ── */}
      <div className="fixed inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1730574895083-710fae2ec934"
          alt="Pemandangan pantai yang indah"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        
        {/* Overlay for readability */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,30,60,0.55) 0%, rgba(0,20,50,0.45) 50%, rgba(0,10,30,0.60) 100%)' }} />
      </div>

      {/* ── Title bar ── */}
      <div className="relative z-10 flex justify-center pt-4 pb-2 px-4 flex-shrink-0">
        <div style={{
          background: 'rgba(0,30,70,0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '14px',
          padding: '9px 32px',
          border: '1.5px solid rgba(100,180,255,0.35)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(150,220,255,0.15)'
        }}>
          <h1 style={{
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontSize: 'clamp(0.85rem, 2.2vw, 1.25rem)',
            fontWeight: 700,
            color: '#C8E8FF',
            letterSpacing: '0.06em',
            margin: 0,
            textShadow: '0 1px 8px rgba(0,100,200,0.6)'
          }}>
            1.3.2 Prinsip Rekaan
          </h1>
        </div>
      </div>

      {/* ── FAQ Glass Panel ── */}
      <div className="relative z-10 flex-1" style={{ margin: '0 10%', paddingBottom: '8px' }}>
        <div
          style={{
            borderRadius: '20px',
            border: '1.5px solid rgba(255,255,255,0.2)',
            background: 'rgba(0,20,50,0.35)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
          
          {PRINSIP_DATA.map((item) =>
          <FAQItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)} />

          )}
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="relative z-10 flex justify-between items-center px-6 pb-4 pt-3 flex-shrink-0">
        <Link href="/pengenalan-unsur">
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(0,30,70,0.75)', backdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(100,180,255,0.4)', borderRadius: '50px',
            padding: '10px 24px', fontWeight: 700, fontSize: '14px',
            color: '#A8D8FF', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            fontFamily: '"Segoe UI", sans-serif'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Kembali
          </button>
        </Link>

        <Link href="/proses-kerja-artistik">
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(0,80,160,0.85)', backdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(100,180,255,0.55)', borderRadius: '50px',
            padding: '10px 24px', fontWeight: 700, fontSize: '14px',
            color: '#D8F0FF', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            fontFamily: '"Segoe UI", sans-serif'
          }}>
            Seterusnya
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>
    </div>);

}