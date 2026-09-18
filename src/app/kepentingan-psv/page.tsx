'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

/* ─── Types ─── */
interface SectionData {
  number: string;
  title: string;
  subtitle: string;
  color: string;
}

/* ─── Constants ─── */
const TOTAL_SCREENS = 11;

const SECTIONS: SectionData[] = [
{ number: '6.1', title: 'Kreativiti', subtitle: 'Mengembangkan Kreativiti', color: '#f59e0b' },
{ number: '6.2', title: 'Pemikiran Kritis', subtitle: 'Menggalakkan Pemikiran Kritis', color: '#3b82f6' },
{ number: '6.3', title: 'Motor Halus', subtitle: 'Mengembangkan Kemahiran Motor Halus', color: '#10b981' },
{ number: '6.4', title: 'Hands-on', subtitle: 'Pengalaman Pembelajaran Hands-on', color: '#8b5cf6' },
{ number: '6.5', title: 'Estetika', subtitle: 'Meningkatkan Apresiasi Estetika', color: '#ec4899' },
{ number: '6.6', title: 'Ekspresi Diri', subtitle: 'Membina Keyakinan & Ekspresi Diri', color: '#f97316' },
{ number: '6.7', title: 'Budaya', subtitle: 'Memupuk Penghargaan Budaya', color: '#14b8a6' },
{ number: '6.8', title: 'Kolaborasi', subtitle: 'Menggalakkan Pembelajaran Kolaboratif', color: '#a855f7' }];


/* ─── Fonts & base styles ─── */
const baseFont: React.CSSProperties = {
  fontFamily: "'DM Sans', 'Plus Jakarta Sans', sans-serif"
};

const lightText: React.CSSProperties = {
  ...baseFont,
  color: '#f0ece4'
};

/* ─── Background ─── */
const Background = () =>
<div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url("/assets/images/IMG_2680-1789714390384.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} />
  
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,12,20,0.72)' }} />
    <div
    style={{
      position: 'absolute',
      inset: 0,
      background:
      'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,200,60,0.08) 0%, transparent 70%)'
    }} />
  
  </div>;


/* ─── Glass card ─── */
const Glass = ({
  children,
  style,
  className = ''




}: {children: React.ReactNode;style?: React.CSSProperties;className?: string;}) =>
<div
  className={className}
  style={{
    background: 'rgba(255,255,255,0.07)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.14)',
    borderRadius: 16,
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    ...style
  }}>
  
    {children}
  </div>;


/* ─── Animated entrance wrapper ─── */
const FadeIn = ({
  children,
  delay = 0,
  style




}: {children: React.ReactNode;delay?: number;style?: React.CSSProperties;}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style
      }}>
      
      {children}
    </div>);

};

/* ─── Contoh Box (always open) ─── */
const ContohBox = ({
  children,
  title = 'Contoh'



}: {children: React.ReactNode;title?: string;}) =>
<div
  style={{
    border: '1px solid rgba(255,220,80,0.3)',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 12
  }}>
  
    <div
    style={{
      width: '100%',
      background: 'rgba(255,220,80,0.12)',
      padding: '10px 16px'
    }}>
    
      <span
      style={{
        ...lightText,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.07em',
        color: '#ffd84d'
      }}>
      
        {title}
      </span>
    </div>
    <div style={{ padding: '12px 16px', background: 'rgba(0,0,0,0.2)' }}>{children}</div>
  </div>;


/* ─── Kesan Box (always visible) ─── */
const KesanBox = ({ items }: {items: string[];}) =>
<div>
    <div
    style={{
      ...lightText,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      color: '#a8f0c0',
      marginBottom: 10
    }}>
    
      KESAN KEPADA MURID
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {items.map((item, i) =>
    <div
      key={i}
      style={{
        background: 'rgba(100,220,150,0.18)',
        border: '1px solid rgba(100,220,150,0.45)',
        borderRadius: 50,
        padding: '6px 14px'
      }}>
      
          <span style={{ ...lightText, fontSize: 12, fontWeight: 600, color: '#a8f0c0' }}>
            {item}
          </span>
        </div>
    )}
    </div>
  </div>;


/* ─── Real image with caption ─── */
const ImageCard = ({
  src,
  alt,
  caption,
  height = 180





}: {src: string;alt: string;caption: string;height?: number;}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
      
      {!loaded &&
      <div
        style={{
          width: '100%',
          height,
          background: 'rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        
          <div style={{ ...lightText, fontSize: 11, opacity: 0.4 }}>Memuatkan...</div>
        </div>
      }
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height,
          objectFit: 'cover',
          display: loaded ? 'block' : 'none',
          transition: 'transform 0.4s ease'
        }} />
      
      <div style={{ background: 'rgba(0,0,0,0.6)', padding: '7px 12px' }}>
        <p style={{ ...lightText, fontSize: 11, margin: 0, opacity: 0.8, fontStyle: 'italic' }}>
          {caption}
        </p>
      </div>
    </div>);

};

/* ─── Progress bar ─── */
const ProgressBar = ({ current, total }: {current: number;total: number;}) =>
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <div
    style={{
      flex: 1,
      height: 4,
      background: 'rgba(255,255,255,0.12)',
      borderRadius: 2,
      overflow: 'hidden'
    }}>
    
      <div
      style={{
        height: '100%',
        width: `${(current + 1) / total * 100}%`,
        background: 'linear-gradient(90deg, #ffd84d, #ffaa00)',
        borderRadius: 2,
        transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1)'
      }} />
    
    </div>
    <span style={{ ...lightText, fontSize: 10, fontWeight: 700, opacity: 0.6, minWidth: 32 }}>
      {current + 1}/{total}
    </span>
  </div>;


/* ─── Nav buttons ─── */
const NavButtons = ({
  screen,
  total,
  onPrev,
  onNext





}: {screen: number;total: number;onPrev: () => void;onNext: () => void;}) =>
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
    {screen > 0 ?
  <button
    onClick={onPrev}
    style={{
      ...lightText,
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: 50,
      padding: '10px 20px',
      fontSize: 13,
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 0.2s',
      letterSpacing: '0.03em'
    }}>
    
        ← Sebelumnya
      </button> :

  <Link
    href="/desk"
    style={{
      ...lightText,
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: 50,
      padding: '10px 20px',
      fontSize: 13,
      fontWeight: 700,
      textDecoration: 'none',
      letterSpacing: '0.03em',
      display: 'inline-block'
    }}>
    
        ← Kembali
      </Link>
  }
    {screen < total - 1 ?
  <button
    onClick={onNext}
    style={{
      ...lightText,
      background: 'rgba(255,216,77,0.18)',
      border: '1px solid rgba(255,216,77,0.45)',
      borderRadius: 50,
      padding: '10px 20px',
      fontSize: 13,
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 0.2s',
      letterSpacing: '0.03em',
      color: '#ffd84d'
    }}>
    
        Seterusnya →
      </button> :

  <Link
    href="/desk"
    style={{
      ...lightText,
      background: 'rgba(255,216,77,0.18)',
      border: '1px solid rgba(255,216,77,0.45)',
      borderRadius: 50,
      padding: '10px 20px',
      fontSize: 13,
      fontWeight: 700,
      textDecoration: 'none',
      letterSpacing: '0.03em',
      color: '#ffd84d',
      display: 'inline-block'
    }}>
    
        ← Kembali ke Utama
      </Link>
  }
  </div>;


/* ─── Section header ─── */
const SectionHeader = ({
  section,
  accentColor



}: {section: SectionData;accentColor: string;}) =>
<FadeIn delay={0}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
      <div
      style={{
        background: `${accentColor}22`,
        border: `1px solid ${accentColor}55`,
        borderRadius: 8,
        padding: '4px 12px',
        ...lightText,
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: '0.1em',
        color: accentColor
      }}>
      
        {section.number}
      </div>
    </div>
    <h2
    style={{
      ...lightText,
      fontSize: 'clamp(1.4rem, 4.5vw, 2rem)',
      fontWeight: 900,
      margin: '0 0 16px',
      lineHeight: 1.2
    }}>
    
      {section.subtitle.split(' ').map((word, i, arr) => {
      const isLast = i === arr.length - 1 || i === arr.length - 2;
      return (
        <span key={i} style={{ color: isLast ? accentColor : '#f0ece4' }}>
            {word}
            {i < arr.length - 1 ? ' ' : ''}
          </span>);

    })}
    </h2>
  </FadeIn>;


/* ═══════════════════════════════════════════
   SCREEN 0 — INTRO
═══════════════════════════════════════════ */
const Screen0 = ({ onNavigate }: {onNavigate: (i: number) => void;}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex flex-col px-4 py-8 w-full max-w-2xl mx-auto">
      <FadeIn delay={0}>
        <div style={{ marginBottom: 6 }}>
          <div
            style={{
              ...lightText,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.15em',
              opacity: 0.5,
              marginBottom: 8
            }}>
            
            BAHAGIAN 4
          </div>
          <h1
            style={{
              ...lightText,
              fontSize: 'clamp(1.8rem, 5.5vw, 2.8rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              margin: '0 0 8px'
            }}>
            
            Kepentingan Bidang
            <br />
            <span style={{ color: '#ffd84d' }}>Membentuk & Membuat Binaan</span>
          </h1>
          <div
            style={{ height: 3, width: 60, background: '#ffd84d', borderRadius: 2, marginBottom: 16 }} />
          
          <p style={{ ...lightText, fontSize: 13, opacity: 0.7, margin: 0 }}>
            dalam Pendidikan Seni Visual Sekolah Rendah
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={120}>
        <Glass style={{ padding: '18px 20px', marginBottom: 24, marginTop: 16 }}>
          <p style={{ ...lightText, fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>
            Bidang ini memberi peluang kepada murid menghasilkan karya{' '}
            <strong style={{ color: '#ffd84d' }}>tiga dimensi</strong> melalui penerokaan idea, bahan,
            media dan teknik. Aktiviti seperti menghasilkan{' '}
            <em>topeng, boneka, model, diorama</em> dan <em>arca</em> bukan sahaja mengembangkan kemahiran
            seni, malah dapat membentuk kreativiti, pemikiran kritis, kemahiran motor serta keupayaan murid
            menyelesaikan masalah secara praktikal.
          </p>
        </Glass>
      </FadeIn>

      <FadeIn delay={220}>
        <div
          style={{
            ...lightText,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            opacity: 0.5,
            marginBottom: 12
          }}>
          
          8 KEPENTINGAN
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {SECTIONS.map((s, i) =>
          <button
            key={s.number}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onNavigate(i + 1)}
            style={{
              background: hovered === i ? `${s.color}22` : 'rgba(255,255,255,0.05)',
              border: `1px solid ${hovered === i ? s.color + '55' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 12,
              padding: '12px 14px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
              transform: hovered === i ? 'translateY(-2px)' : 'translateY(0)'
            }}>
            
              <div
              style={{
                ...lightText,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: s.color,
                marginBottom: 3
              }}>
              
                {s.number}
              </div>
              <div style={{ ...lightText, fontSize: 12, fontWeight: 700 }}>{s.title}</div>
            </button>
          )}
        </div>
      </FadeIn>
    </div>);

};

/* ═══════════════════════════════════════════
   SCREEN 1 — 4.1 KREATIVITI
═══════════════════════════════════════════ */
const Screen1 = () =>
<div className="flex flex-col px-4 py-6 w-full max-w-2xl mx-auto">
    <SectionHeader section={SECTIONS[0]} accentColor="#f59e0b" />

    <FadeIn delay={80}>
      <Glass style={{ padding: '16px 18px', marginBottom: 16 }}>
        <p style={{ ...lightText, fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>
          Bidang ini memberi ruang kepada murid untuk menghasilkan{' '}
          <strong style={{ color: '#f59e0b' }}>idea yang pelbagai</strong> dan tidak terikat kepada satu
          jawapan yang betul. Murid boleh membuat pilihan sendiri terhadap bentuk, saiz, warna, bahan dan
          cara menghasilkan sesuatu karya. Proses penerokaan tersebut menggalakkan murid menggunakan
          imaginasi serta menghasilkan karya berdasarkan idea dan pengalaman mereka sendiri.
        </p>
      </Glass>
    </FadeIn>

    <FadeIn delay={160}>
      <ImageCard
      src="https://images.unsplash.com/photo-1666864733116-5c5cf6b200df"
      alt="Kanak-kanak memakai topeng haiwan warna-warni yang mereka hasilkan sendiri semasa aktiviti seni di sekolah"
      caption="Murid memakai topeng haiwan fantasi hasil kerja tangan sendiri"
      height={220} />
    
    </FadeIn>

    <FadeIn delay={220}>
      <ContohBox title="Contoh: Tema Haiwan Fantasi">
        <p style={{ ...lightText, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          Dalam aktiviti menghasilkan topeng haiwan, guru boleh memberikan tema{' '}
          <strong style={{ color: '#f59e0b' }}>"Haiwan Fantasi"</strong>. Murid bebas memilih haiwan dan
          menggabungkan ciri-ciri haiwan yang berbeza. Seorang murid mungkin menghasilkan topeng yang
          mempunyai telinga arnab, tanduk rusa dan corak seperti harimau.
        </p>
      </ContohBox>
    </FadeIn>

    <FadeIn delay={300}>
      <Glass style={{ padding: '14px 16px', marginTop: 14 }}>
        <KesanBox
        items={['Imaginasi berkembang', 'Berani mencuba idea baharu', 'Satu tema → pelbagai karya unik']} />
      
      </Glass>
    </FadeIn>
  </div>;


/* ═══════════════════════════════════════════
   SCREEN 2 — 4.2 PEMIKIRAN KRITIS
═══════════════════════════════════════════ */
const Screen2 = () =>
<div className="flex flex-col px-4 py-6 w-full max-w-2xl mx-auto">
    <SectionHeader section={SECTIONS[1]} accentColor="#3b82f6" />

    <FadeIn delay={80}>
      <Glass style={{ padding: '16px 18px', marginBottom: 16 }}>
        <p style={{ ...lightText, fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>
          Penghasilan karya tiga dimensi memerlukan murid{' '}
          <strong style={{ color: '#3b82f6' }}>membuat keputusan dan menyelesaikan masalah</strong>{' '}
          sepanjang proses. Murid perlu memikirkan bahan yang sesuai, cara mencantumkan komponen,
          kestabilan struktur dan teknik yang boleh digunakan.
        </p>
      </Glass>
    </FadeIn>

    <FadeIn delay={160}>
      <ImageCard
      src="https://img.rocket.new/generatedImages/rocket_gen_img_142cfea7e-1772099134888.png"
      alt="Kanak-kanak sekolah rendah membina model bangunan menggunakan kadbod dan bahan kitar semula di dalam kelas"
      caption="Murid membina model bangunan — menyelesaikan masalah kestabilan struktur"
      height={220} />
    
    </FadeIn>

    <FadeIn delay={220}>
      <ContohBox title="Contoh: Model Bangunan">
        <p style={{ ...lightText, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          Semasa menghasilkan model bangunan, murid mendapati struktur bangunan mereka mudah tumbang.
          Murid perlu mengenal pasti punca masalah dan mencari penyelesaian seperti{' '}
          <strong style={{ color: '#3b82f6' }}>memperkukuh bahagian tapak</strong>, mengubah susunan bahan
          atau menggunakan bahan sokongan.
        </p>
      </ContohBox>
    </FadeIn>

    <FadeIn delay={300}>
      <Glass style={{ padding: '14px 16px', marginTop: 14 }}>
        <KesanBox
        items={[
        'Buat pemerhatian teliti',
        'Kenal pasti punca masalah',
        'Cuba penyelesaian & nilai hasilnya']
        } />
      
      </Glass>
    </FadeIn>

    <FadeIn delay={360}>
      <Glass style={{ padding: '14px 16px', marginTop: 12 }}>
        <div
        style={{
          ...lightText,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.07em',
          color: '#3b82f6',
          marginBottom: 10
        }}>
        
          PROSES PENYELESAIAN MASALAH
        </div>
        {[
      { label: 'Kenal pasti masalah', detail: 'Murid perhatikan bahawa struktur bangunan mudah tumbang.' },
      { label: 'Cari penyelesaian', detail: 'Murid fikirkan cara memperkukuh tapak atau mengubah susunan bahan.' },
      { label: 'Cuba & ubah suai', detail: 'Murid uji pelbagai teknik dan bahan sokongan.' },
      { label: 'Nilai hasilnya', detail: 'Murid semak sama ada struktur kini lebih stabail dan kukuh.' }].
      map((s, i) =>
      <div
        key={i}
        style={{
          background: 'rgba(59,130,246,0.1)',
          border: '1px solid rgba(59,130,246,0.25)',
          borderRadius: 8,
          padding: '10px 12px',
          marginBottom: 6,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10
        }}>
        
            <div
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
          
              <span style={{ ...lightText, fontSize: 10, fontWeight: 800 }}>{i + 1}</span>
            </div>
            <div>
              <div style={{ ...lightText, fontSize: 12, fontWeight: 700, color: '#93c5fd', marginBottom: 2 }}>
                {s.label}
              </div>
              <div style={{ ...lightText, fontSize: 12, opacity: 0.8 }}>{s.detail}</div>
            </div>
          </div>
      )}
      </Glass>
    </FadeIn>
  </div>;


/* ═══════════════════════════════════════════
   SCREEN 3 — 4.3 MOTOR HALUS
═══════════════════════════════════════════ */
const Screen3 = () =>
<div className="flex flex-col px-4 py-6 w-full max-w-2xl mx-auto">
    <SectionHeader section={SECTIONS[2]} accentColor="#10b981" />

    <FadeIn delay={80}>
      <Glass style={{ padding: '16px 18px', marginBottom: 16 }}>
        <p style={{ ...lightText, fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>
          Aktiviti Membentuk dan Membuat Binaan melibatkan pelbagai pergerakan tangan seperti memotong,
          melipat, menggulung, mencantum, mengikat, menekan dan membentuk. Pergerakan ini membantu murid
          mengembangkan{' '}
          <strong style={{ color: '#10b981' }}>koordinasi mata dan tangan</strong> serta kawalan pergerakan
          yang lebih tepat.
        </p>
      </Glass>
    </FadeIn>

    <FadeIn delay={140}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
        {['Memotong', 'Melipat', 'Menggulung', 'Mencantum', 'Mengikat', 'Membentuk'].map((skill, i) =>
      <div
        key={i}
        style={{
          background: 'rgba(16,185,129,0.12)',
          border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: 10,
          padding: '12px 8px',
          textAlign: 'center'
        }}>
        
            <div style={{ ...lightText, fontSize: 12, fontWeight: 700, color: '#6ee7b7' }}>{skill}</div>
          </div>
      )}
      </div>
    </FadeIn>

    <FadeIn delay={200}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
        <ImageCard
        src="https://img.rocket.new/generatedImages/rocket_gen_img_4b82c2da9-1789719439464.png"
        alt="Kanak-kanak melipat kertas origami dengan teliti untuk menghasilkan bentuk haiwan di dalam kelas"
        caption="Origami — ketepatan lipatan membentuk koordinasi tangan"
        height={170} />
      
        <ImageCard
        src="https://img.rocket.new/generatedImages/rocket_gen_img_414b5b345-1789719439114.png"
        alt="Murid memotong dan menyusun kadbod untuk membina diorama di dalam kelas seni"
        caption="Diorama — memotong dan menyusun komponen"
        height={170} />
      
      </div>
    </FadeIn>

    <FadeIn delay={280}>
      <ContohBox title="Contoh: Origami & Diorama">
        <p style={{ ...lightText, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          Dalam aktiviti origami, murid perlu membuat lipatan mengikut kedudukan dan ukuran tertentu bagi
          menghasilkan bentuk haiwan. Ketepatan setiap lipatan mempengaruhi bentuk akhir karya. Begitu juga
          dalam penghasilan diorama, murid perlu{' '}
          <strong style={{ color: '#10b981' }}>memotong kadbod</strong>, melekatkan objek kecil dan menyusun
          komponen mengikut ruang.
        </p>
      </ContohBox>
    </FadeIn>

    <FadeIn delay={340}>
      <Glass style={{ padding: '14px 16px', marginTop: 14 }}>
        <KesanBox
        items={['Ketelitian meningkat', 'Koordinasi mata dan tangan', 'Kemahiran mengendalikan alatan']} />
      
      </Glass>
    </FadeIn>
  </div>;


/* ═══════════════════════════════════════════
   SCREEN 4 — 4.4 HANDS-ON
═══════════════════════════════════════════ */
const Screen4 = () =>
<div className="flex flex-col px-4 py-6 w-full max-w-2xl mx-auto">
    <SectionHeader section={SECTIONS[3]} accentColor="#8b5cf6" />

    <FadeIn delay={80}>
      <Glass style={{ padding: '16px 18px', marginBottom: 16 }}>
        <p style={{ ...lightText, fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>
          Bidang ini membolehkan murid belajar melalui{' '}
          <strong style={{ color: '#8b5cf6' }}>pengalaman secara langsung</strong>. Murid bukan sekadar
          melihat contoh atau mendengar penerangan guru, tetapi mengalami sendiri proses meneroka bahan,
          mencuba teknik, melakukan kesilapan dan memperbaiki karya.
        </p>
      </Glass>
    </FadeIn>

    <FadeIn delay={160}>
      <ImageCard
      src="https://img.rocket.new/generatedImages/rocket_gen_img_411cf968b-1789719439594.png"
      alt="Kanak-kanak sekolah rendah meneroka dan mencuba pelbagai bahan untuk menghasilkan arca yang seimbang di dalam kelas"
      caption="Arca Stabail — murid mencuba pelbagai susunan untuk mencapai keseimbangan"
      height={220} />
    
    </FadeIn>

    <FadeIn delay={220}>
      <ContohBox title="Contoh: Arca Stabail">
        <p style={{ ...lightText, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          Guru mengajar tentang konsep keseimbangan melalui penghasilan arca stabail. Murid diberi beberapa
          bahan seperti batang kayu, kadbod dan objek ringan. Mereka perlu{' '}
          <strong style={{ color: '#8b5cf6' }}>mencuba pelbagai susunan</strong> sehingga karya dapat berdiri
          dengan stabail.
        </p>
      </ContohBox>
    </FadeIn>

    <FadeIn delay={280}>
      <Glass style={{ padding: '14px 16px', marginTop: 14 }}>
        <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          marginBottom: 14
        }}>
        
          <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10,
            padding: '14px'
          }}>
          
            <div
            style={{
              ...lightText,
              fontSize: 11,
              fontWeight: 700,
              opacity: 0.5,
              marginBottom: 8,
              textDecoration: 'line-through'
            }}>
            
              Pembelajaran Teori
            </div>
            <div style={{ ...lightText, fontSize: 12, opacity: 0.5 }}>
              Baca tentang imbangan dalam buku teks
            </div>
          </div>
          <div
          style={{
            background: 'rgba(139,92,246,0.15)',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: 10,
            padding: '14px'
          }}>
          
            <div
            style={{
              ...lightText,
              fontSize: 11,
              fontWeight: 700,
              color: '#8b5cf6',
              marginBottom: 8
            }}>
            
              Pembelajaran Hands-on
            </div>
            <div style={{ ...lightText, fontSize: 12, color: '#c4b5fd' }}>
              Rasa sendiri konsep imbangan melalui arca stabail — cuba, gagal, cuba lagi!
            </div>
          </div>
        </div>
        <KesanBox
        items={['Konsep lebih mudah difahami', 'Belajar melalui pengalaman fizikal', 'Bukan sekadar teori']} />
      
      </Glass>
    </FadeIn>
  </div>;


/* ═══════════════════════════════════════════
   SCREEN 5 — 4.5 ESTETIKA
═══════════════════════════════════════════ */
const Screen5 = () =>
<div className="flex flex-col px-4 py-6 w-full max-w-2xl mx-auto">
    <SectionHeader section={SECTIONS[4]} accentColor="#ec4899" />

    <FadeIn delay={80}>
      <Glass style={{ padding: '16px 18px', marginBottom: 16 }}>
        <p style={{ ...lightText, fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>
          Murid dapat memahami dan menghargai aspek estetika melalui pengalaman menghasilkan serta melihat
          karya. Mereka belajar mengenal pasti penggunaan{' '}
          <strong style={{ color: '#ec4899' }}>
            warna, bentuk, jalinan, ruang, imbangan, harmoni, kesatuan dan pergerakan
          </strong>{' '}
          dalam karya.
        </p>
      </Glass>
    </FadeIn>

    <FadeIn delay={160}>
      <ImageCard
      src="https://img.rocket.new/generatedImages/rocket_gen_img_4daf2a590-1789719437527.png"
      alt="Diorama habitat hutan yang menunjukkan pelbagai unsur seni visual seperti warna, saiz dan jalinan yang dihasilkan oleh murid"
      caption="Diorama Habitat Hutan — unsur seni digunakan secara sedar"
      height={220} />
    
    </FadeIn>

    <FadeIn delay={220}>
      <ContohBox title="Contoh: Diorama Habitat Hutan">
        <p style={{ ...lightText, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          Selepas menghasilkan diorama habitat hutan, murid boleh membentangkan karya dan menerangkan
          bagaimana mereka menggunakan:
        </p>
        <ul style={{ ...lightText, fontSize: 13, lineHeight: 1.8, margin: '8px 0 0 0', paddingLeft: 18 }}>
          <li>warna untuk mewujudkan suasana,</li>
          <li>saiz untuk menunjukkan kedalaman,</li>
          <li>susunan objek untuk menghasilkan ruang,</li>
          <li>jalinan untuk menggambarkan permukaan pokok dan tanah.</li>
        </ul>
      </ContohBox>
    </FadeIn>

    <FadeIn delay={300}>
      <Glass style={{ padding: '14px 16px', marginTop: 14 }}>
        <KesanBox
        items={[
        'Fahami nilai estetika',
        'Bukan sekadar "cantik"',
        'Unsur & prinsip seni digunakan dengan sedar']
        } />
      
      </Glass>
    </FadeIn>
  </div>;


/* ═══════════════════════════════════════════
   SCREEN 6 — 4.6 EKSPRESI DIRI
═══════════════════════════════════════════ */
const Screen6 = () =>
<div className="flex flex-col px-4 py-6 w-full max-w-2xl mx-auto">
    <SectionHeader section={SECTIONS[5]} accentColor="#f97316" />

    <FadeIn delay={80}>
      <Glass style={{ padding: '16px 18px', marginBottom: 16 }}>
        <p style={{ ...lightText, fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>
          Membentuk dan Membuat Binaan memberi peluang kepada murid{' '}
          <strong style={{ color: '#f97316' }}>menzahirkan idea, imaginasi dan pengalaman</strong> melalui
          karya. Apabila murid diberi kebebasan membuat pilihan, mereka dapat membina identiti serta
          keyakinan terhadap hasil kerja sendiri.
        </p>
      </Glass>
    </FadeIn>

    <FadeIn delay={160}>
      <ImageCard
      src="https://images.unsplash.com/photo-1600792172862-49adb765add3"
      alt="Kanak-kanak memegang dan memainkan boneka tangan yang mereka hasilkan sendiri dengan penuh bangga di dalam kelas"
      caption="Aktiviti Boneka — murid menzahirkan watak yang mewakili diri sendiri"
      height={220} />
    
    </FadeIn>

    <FadeIn delay={220}>
      <ContohBox title="Contoh: Aktiviti Boneka">
        <p style={{ ...lightText, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          Dalam aktiviti boneka, murid diminta menghasilkan watak yang mewakili diri mereka. Murid boleh
          menentukan rupa, pakaian, warna dan personaliti boneka sebelum menggunakannya dalam{' '}
          <strong style={{ color: '#f97316' }}>aktiviti bercerita</strong>.
        </p>
      </ContohBox>
    </FadeIn>

    <FadeIn delay={300}>
      <Glass style={{ padding: '14px 16px', marginTop: 14 }}>
        <KesanBox
        items={[
        'Yakin terangkan karya kepada guru & rakan',
        'Ekspresi visual dan lisan',
        'Bina identiti diri sendiri']
        } />
      
      </Glass>
    </FadeIn>
  </div>;


/* ═══════════════════════════════════════════
   SCREEN 7 — 4.7 BUDAYA
═══════════════════════════════════════════ */
const Screen7 = () =>
<div className="flex flex-col px-4 py-6 w-full max-w-2xl mx-auto">
    <SectionHeader section={SECTIONS[6]} accentColor="#14b8a6" />

    <FadeIn delay={80}>
      <Glass style={{ padding: '16px 18px', marginBottom: 16 }}>
        <p style={{ ...lightText, fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>
          Kraf boleh menjadi medium untuk memperkenalkan murid kepada{' '}
          <strong style={{ color: '#14b8a6' }}>budaya, tradisi dan identiti masyarakat</strong>. Penghasilan
          karya yang berkaitan dengan warisan membolehkan murid mengenali motif, bentuk, fungsi dan nilai
          yang terdapat dalam seni tradisional.
        </p>
      </Glass>
    </FadeIn>

    <FadeIn delay={160}>
      <ImageCard
      src="https://images.unsplash.com/photo-1470359166359-ebe013a08b19"
      alt="Topeng tradisional berwarna-warni yang diinspirasikan daripada seni warisan tempatan Asia Tenggara"
      caption="Topeng berinspirasikan tradisi — menghubungkan seni dengan warisan budaya"
      height={220} />
    
    </FadeIn>

    <FadeIn delay={220}>
      <ContohBox title="Contoh: Kraf Berinspirasikan Tradisi">
        <p style={{ ...lightText, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          Guru boleh meminta murid menghasilkan topeng yang diinspirasikan daripada seni tradisional
          tempatan atau menghasilkan corak pada model menggunakan{' '}
          <strong style={{ color: '#14b8a6' }}>motif flora dan fauna</strong> yang terdapat dalam kraf
          Melayu. Murid kemudiannya boleh membandingkan karya mereka dengan contoh kraf tradisional dan
          membincangkan persamaan serta perbezaannya.
        </p>
      </ContohBox>
    </FadeIn>

    <FadeIn delay={280}>
      <Glass style={{ padding: '14px 16px', marginTop: 14 }}>
        <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
          marginBottom: 14
        }}>
        
          {[
        { label: 'Motif Flora', detail: 'Bunga, daun dan tumbuhan dalam ukiran dan tenunan tradisional Melayu.' },
        { label: 'Motif Fauna', detail: 'Haiwan seperti burung dan rama-rama dalam batik dan songket.' },
        { label: 'Motif Geometri', detail: 'Corak berulang dalam anyaman dan ukiran tradisional.' }].
        map((m, i) =>
        <div
          key={i}
          style={{
            background: 'rgba(20,184,166,0.12)',
            border: '1px solid rgba(20,184,166,0.3)',
            borderRadius: 10,
            padding: '12px 10px'
          }}>
          
              <div
            style={{
              ...lightText,
              fontSize: 11,
              fontWeight: 700,
              color: '#2dd4bf',
              marginBottom: 6
            }}>
            
                {m.label}
              </div>
              <div style={{ ...lightText, fontSize: 11, opacity: 0.75, lineHeight: 1.5 }}>{m.detail}</div>
            </div>
        )}
        </div>
        <KesanBox
        items={['Seni ada hubungan dengan sejarah', 'Hayati warisan budaya', 'Fahami identiti masyarakat']} />
      
      </Glass>
    </FadeIn>
  </div>;


/* ═══════════════════════════════════════════
   SCREEN 8 — 4.8 KOLABORASI
═══════════════════════════════════════════ */
const Screen8 = () =>
<div className="flex flex-col px-4 py-6 w-full max-w-2xl mx-auto">
    <SectionHeader section={SECTIONS[7]} accentColor="#a855f7" />

    <FadeIn delay={80}>
      <Glass style={{ padding: '16px 18px', marginBottom: 16 }}>
        <p style={{ ...lightText, fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>
          Aktiviti membentuk dan membuat binaan juga sesuai dijalankan secara berkumpulan. Murid perlu{' '}
          <strong style={{ color: '#a855f7' }}>
            berkomunikasi, membahagikan tugas, berkongsi bahan
          </strong>{' '}
          dan membuat keputusan bersama untuk menghasilkan satu karya.
        </p>
      </Glass>
    </FadeIn>

    <FadeIn delay={160}>
      <ImageCard
      src="https://img.rocket.new/generatedImages/rocket_gen_img_1d3921e23-1772737511317.png"
      alt="Kumpulan kanak-kanak sekolah rendah bekerjasama menghasilkan projek seni diorama secara kolaboratif di dalam kelas"
      caption="Pembelajaran kolaboratif — murid berkongsi tugas menghasilkan diorama bersama"
      height={220} />
    
    </FadeIn>

    <FadeIn delay={220}>
      <ContohBox title='Contoh: Diorama "Kampung Saya"'>
        <p style={{ ...lightText, fontSize: 13, lineHeight: 1.7, margin: '0 0 10px' }}>
          Guru memberikan tugasan menghasilkan diorama "Kampung Saya" secara berkumpulan.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
        { role: 'Murid 1', task: 'Menghasilkan rumah' },
        { role: 'Murid 2', task: 'Menghasilkan pokok' },
        { role: 'Murid 3', task: 'Menghasilkan watak manusia' },
        { role: 'Murid 4', task: 'Menyusun komposisi diorama' }].
        map((t, i) =>
        <div
          key={i}
          style={{
            background: 'rgba(168,85,247,0.12)',
            border: '1px solid rgba(168,85,247,0.3)',
            borderRadius: 8,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
          
              <div
            style={{
              ...lightText,
              fontSize: 10,
              fontWeight: 800,
              color: '#c084fc',
              minWidth: 52
            }}>
            
                {t.role}
              </div>
              <div style={{ ...lightText, fontSize: 12 }}>{t.task}</div>
            </div>
        )}
        </div>
      </ContohBox>
    </FadeIn>

    <FadeIn delay={300}>
      <Glass style={{ padding: '14px 16px', marginTop: 14 }}>
        <KesanBox
        items={['Belajar bekerjasama', 'Menghormati idea rakan', 'Bertanggungjawab terhadap tugasan']} />
      
      </Glass>
    </FadeIn>
  </div>;


/* ═══════════════════════════════════════════
   SCREEN 9 — RINGKASAN
═══════════════════════════════════════════ */
const Screen9 = () => {
  const rows = [
  { color: '#f59e0b', kepentingan: 'Kreativiti', contoh: 'Topeng haiwan fantasi', kemahiran: 'Imaginasi & idea' },
  { color: '#3b82f6', kepentingan: 'Pemikiran Kritis', contoh: 'Model bangunan', kemahiran: 'Penyelesaian masalah' },
  { color: '#10b981', kepentingan: 'Motor Halus', contoh: 'Origami', kemahiran: 'Koordinasi mata-tangan' },
  { color: '#8b5cf6', kepentingan: 'Hands-on', contoh: 'Arca stabail', kemahiran: 'Belajar melalui pengalaman' },
  { color: '#ec4899', kepentingan: 'Estetika', contoh: 'Diorama habitat', kemahiran: 'Apresiasi seni' },
  { color: '#f97316', kepentingan: 'Ekspresi Diri', contoh: 'Boneka', kemahiran: 'Keyakinan & komunikasi' },
  { color: '#14b8a6', kepentingan: 'Budaya', contoh: 'Kraf tradisi', kemahiran: 'Penghayatan warisan' },
  { color: '#a855f7', kepentingan: 'Kolaborasi', contoh: 'Diorama berkumpulan', kemahiran: 'Kerjasama' }];


  return (
    <div className="flex flex-col px-4 py-6 w-full max-w-2xl mx-auto">
      <FadeIn delay={0}>
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              ...lightText,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.12em',
              opacity: 0.5,
              marginBottom: 6
            }}>
            
            RINGKASAN
          </div>
          <h2
            style={{
              ...lightText,
              fontSize: 'clamp(1.4rem, 4vw, 1.9rem)',
              fontWeight: 900,
              margin: '0 0 8px'
            }}>
            
            8 Kepentingan <span style={{ color: '#ffd84d' }}>Bidang Membentuk</span>
          </h2>
          <div style={{ height: 3, width: 50, background: '#ffd84d', borderRadius: 2 }} />
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <Glass style={{ overflow: 'hidden' }}>
          {/* Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 2fr',
              background: 'rgba(255,220,80,0.12)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              padding: '10px 14px'
            }}>
            
            {['Kepentingan', 'Contoh Aktiviti', 'Kemahiran Dibina'].map((h) =>
            <div
              key={h}
              style={{
                ...lightText,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.06em',
                opacity: 0.7
              }}>
              
                {h}
              </div>
            )}
          </div>
          {/* Rows */}
          {rows.map((row, i) =>
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 2fr',
              padding: '10px 14px',
              background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
              borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none'
            }}>
            
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: row.color,
                  flexShrink: 0
                }} />
              
                <span style={{ ...lightText, fontSize: 12, fontWeight: 700 }}>{row.kepentingan}</span>
              </div>
              <div style={{ ...lightText, fontSize: 12, opacity: 0.8 }}>{row.contoh}</div>
              <div style={{ ...lightText, fontSize: 12, color: row.color, fontWeight: 600 }}>
                {row.kemahiran}
              </div>
            </div>
          )}
        </Glass>
      </FadeIn>
    </div>);

};

/* ═══════════════════════════════════════════
   SCREEN 10 — PENUTUP
═══════════════════════════════════════════ */
const Screen10 = () => {
  const pillars = [
  { label: 'Kreativiti', color: '#f59e0b' },
  { label: 'Kemahiran Psikomotor', color: '#10b981' },
  { label: 'Pemikiran Kritis', color: '#3b82f6' },
  { label: 'Penyelesaian Masalah', color: '#8b5cf6' },
  { label: 'Apresiasi Estetika', color: '#ec4899' },
  { label: 'Ekspresi Diri', color: '#f97316' },
  { label: 'Penghayatan Budaya', color: '#14b8a6' }];


  return (
    <div className="flex flex-col items-center px-4 py-8 w-full max-w-2xl mx-auto">
      <FadeIn delay={0} style={{ width: '100%', textAlign: 'center' }}>
        <div
          style={{
            ...lightText,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.12em',
            opacity: 0.5,
            marginBottom: 8
          }}>
          
          KESIMPULAN
        </div>
        <h2
          style={{
            ...lightText,
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            fontWeight: 900,
            margin: '0 0 8px'
          }}>
          
          Bidang yang <span style={{ color: '#ffd84d' }}>Menyeluruh</span>
        </h2>
        <div
          style={{
            height: 3,
            width: 50,
            background: '#ffd84d',
            borderRadius: 2,
            margin: '0 auto 20px'
          }} />
        
      </FadeIn>

      <FadeIn delay={100} style={{ width: '100%' }}>
        <Glass style={{ padding: '20px 22px', marginBottom: 20 }}>
          <p style={{ ...lightText, fontSize: 13.5, lineHeight: 1.85, margin: '0 0 16px' }}>
            Bidang <strong style={{ color: '#ffd84d' }}>Membentuk dan Membuat Binaan</strong> bukan sekadar
            mengajar murid menghasilkan objek atau karya tiga dimensi. Bidang ini menyediakan pengalaman
            pembelajaran yang menggabungkan:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {pillars.map((p, i) =>
            <div
              key={i}
              style={{
                background: `${p.color}18`,
                border: `1px solid ${p.color}44`,
                borderRadius: 50,
                padding: '5px 14px'
              }}>
              
                <span style={{ ...lightText, fontSize: 11, fontWeight: 700, color: p.color }}>
                  {p.label}
                </span>
              </div>
            )}
          </div>
          <p style={{ ...lightText, fontSize: 13.5, lineHeight: 1.85, margin: 0, opacity: 0.9 }}>
            Melalui pengalaman meneroka bahan dan teknik secara langsung, murid dapat membina{' '}
            <strong style={{ color: '#a8f0c0' }}>pemahaman seni yang lebih bermakna</strong> serta
            menghubungkan pembelajaran dengan pengalaman kehidupan mereka.
          </p>
        </Glass>
      </FadeIn>

      <FadeIn delay={200}>
        <Link
          href="/desk"
          style={{
            ...lightText,
            background: 'rgba(255,216,77,0.15)',
            border: '1.5px solid rgba(255,216,77,0.5)',
            borderRadius: 50,
            padding: '12px 28px',
            fontSize: 14,
            fontWeight: 700,
            textDecoration: 'none',
            letterSpacing: '0.04em',
            display: 'inline-block',
            color: '#ffd84d',
            transition: 'all 0.2s'
          }}>
          
          ← Kembali ke Halaman Utama
        </Link>
      </FadeIn>
    </div>);

};

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function KepentinganPSVPage() {
  const [screen, setScreen] = useState(0);
  const [visible, setVisible] = useState(true);
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('left');
  const contentRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= TOTAL_SCREENS) return;
      setSlideDir(next > screen ? 'left' : 'right');
      setVisible(false);
      setTimeout(() => {
        setScreen(next);
        setVisible(true);
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    },
    [screen]
  );

  const screenLabel =
  screen === 0 ?
  'PENGENALAN' :
  screen <= 8 ?
  `${SECTIONS[screen - 1].number} — ${SECTIONS[screen - 1].title}` :
  screen === 9 ?
  'RINGKASAN' : 'PENUTUP';

  const screenComponents = [
  <Screen0 key="s0" onNavigate={goTo} />,
  <Screen1 key="s1" />,
  <Screen2 key="s2" />,
  <Screen3 key="s3" />,
  <Screen4 key="s4" />,
  <Screen5 key="s5" />,
  <Screen6 key="s6" />,
  <Screen7 key="s7" />,
  <Screen8 key="s8" />,
  <Screen9 key="s9" />,
  <Screen10 key="s10" />];


  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden">
      <Background />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;0,9..40,700;0,9..40,900;1,9..40,400&display=swap');

        .screen-wrap {
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .screen-wrap.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .screen-wrap.hidden-left {
          opacity: 0;
          transform: translateX(-24px);
        }
        .screen-wrap.hidden-right {
          opacity: 0;
          transform: translateX(24px);
        }

        button:hover {
          filter: brightness(1.08);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-4 pt-4 pb-2">
        <div
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 50,
            padding: '4px 14px',
            ...lightText,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            opacity: 0.85
          }}>
          
          {screenLabel}
        </div>
        <div style={{ minWidth: 120 }}>
          <ProgressBar current={screen} total={TOTAL_SCREENS} />
        </div>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="relative z-10 flex-1 overflow-y-auto">
        <div
          className={`screen-wrap ${
          visible ? 'visible' : slideDir === 'left' ? 'hidden-left' : 'hidden-right'} w-full max-w-2xl mx-auto`
          }
          style={{ minHeight: 'calc(100vh - 130px)' }}>
          
          {screenComponents[screen]}
        </div>
      </div>

      {/* Navigation */}
      <div
        className="relative z-20 pb-5 px-4 pt-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        
        <NavButtons
          screen={screen}
          total={TOTAL_SCREENS}
          onPrev={() => goTo(screen - 1)}
          onNext={() => goTo(screen + 1)} />
        
      </div>
    </div>);

}