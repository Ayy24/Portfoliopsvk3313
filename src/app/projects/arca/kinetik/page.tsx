'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type BookState = 'closed' | 'opening' | 'open' | 'closing';

const ACCENT = '#17A589';
const ACCENT_DARK = '#0e6655';
const ACCENT_LIGHT = '#76d7c4';

const SPREADS_DATA = [
{
  id: 1,
  topic: 'Definisi',
  leftHeading: 'Definisi',
  leftText: 'Arca kinetik (kinetic sculpture) ialah sejenis arca yang mengandungi elemen bergerak, sama ada digerakkan oleh motor elektrik, angin, air, tenaga solar atau interaksi manusia. Pergerakan menjadi sebahagian daripada karya seni itu sendiri, bukan sekadar ciri tambahan. Arca kinetik meneroka hubungan antara masa, ruang dan pergerakan, mewujudkan pengalaman visual yang dinamik dan sentiasa berubah.',
  rightText1: 'Arca kinetik muncul sebagai gerakan seni yang penting pada pertengahan abad ke-20, dengan pengarca seperti Jean Tinguely, Len Lye dan George Rickey sebagai pelopor utama. Tinguely terkenal dengan mesin-mesin kinetik yang bising dan kacau, manakala Rickey menghasilkan arca kinetik yang elegan dan tenang yang bergerak dengan angin.',
  rightText2: 'Dalam konteks pendidikan seni visual, arca kinetik mendorong pelajar untuk memahami hubungan antara seni dan sains, antara estetika dan mekanik, serta bagaimana pergerakan boleh menjadi medium ekspresi artistik yang bermakna dan berimpak.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_45e5fde05-1789596424114.png",
  imageAlt: 'Heureka Jean Tinguely 1964 arca kinetik dengan bahagian logam bergerak digerakkan motor'
},
{
  id: 2,
  topic: 'Ciri-ciri & Jenis',
  leftHeading: 'Ciri-ciri',
  leftItems: [
  { num: '1', title: 'Pergerakan sebagai elemen seni', desc: 'Pergerakan bukan sekadar ciri teknikal tetapi merupakan elemen estetika utama — cara, kelajuan dan irama pergerakan adalah sebahagian daripada karya.' },
  { num: '2', title: 'Menggunakan sumber tenaga', desc: 'Motor elektrik, angin, air, tenaga solar atau interaksi manusia digunakan sebagai sumber tenaga untuk menggerakkan bahagian-bahagian arca.' },
  { num: '3', title: 'Komposisi yang sentiasa berubah', desc: 'Tidak seperti arca statik, arca kinetik tidak mempunyai satu komposisi tetap — ia sentiasa berubah mengikut pergerakan bahagian-bahagiannya.' },
  { num: '4', title: 'Menggabungkan seni dan teknologi', desc: 'Arca kinetik memerlukan pemahaman tentang mekanik, elektronik dan fizik di samping kemahiran seni, menjadikannya persimpangan antara seni dan sains.' }],

  rightHeading: 'Jenis Arca Kinetik',
  rightItems: [
  { num: 'A', title: 'Kinetik Angin (Wind-Driven)', desc: 'Digerakkan oleh angin semula jadi, seperti karya George Rickey dan Len Lye yang bergerak dengan elegan dalam angin.' },
  { num: 'B', title: 'Kinetik Motor (Motor-Driven)', desc: 'Digerakkan oleh motor elektrik, membolehkan kawalan tepat ke atas kelajuan dan corak pergerakan, seperti karya Jean Tinguely.' },
  { num: 'C', title: 'Kinetik Interaktif', desc: 'Digerakkan oleh interaksi penonton — sentuhan, bunyi, cahaya atau pergerakan manusia mencetuskan pergerakan arca.' },
  { num: 'D', title: 'Kinetik Air (Water-Driven)', desc: 'Menggunakan air sebagai sumber tenaga, seperti kincir air artistik atau arca yang bergerak dalam atau dengan air.' }],

  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_47e7d0e08-1789743581235.png",
  imageAlt: 'Arca kinetik menunjukkan ciri-ciri pergerakan dan penggunaan sumber tenaga'
},
{
  id: 3,
  topic: 'Teknik Penghasilan',
  leftHeading: 'Teknik Penghasilan',
  leftSubheading: 'Teknik Utama',
  leftTechniques: [
  { name: 'Teknik Mekanikal', desc: 'Gear, rantai, tali sawat dan sistem mekanikal lain digunakan untuk memindahkan dan mengubah pergerakan dari sumber tenaga kepada bahagian-bahagian arca.' },
  { name: 'Teknik Elektronik', desc: 'Motor elektrik, servo, solenoid dan sistem kawalan elektronik digunakan untuk menghasilkan pergerakan yang tepat dan boleh diprogramkan.' },
  { name: 'Teknik Keseimbangan Dinamik', desc: 'Bahagian-bahagian direka dengan keseimbangan yang teliti supaya bergerak dengan cara yang dikehendaki apabila dikenakan daya atau tenaga.' }],

  rightTechniques: [
  { name: 'Teknik Pneumatik/Hidraulik', desc: 'Udara atau cecair bertekanan digunakan untuk menggerakkan bahagian-bahagian arca, menghasilkan pergerakan yang perlahan dan kuat.' },
  { name: 'Teknik Pengaturcaraan (Programming)', desc: 'Dalam arca kinetik moden, mikrokontroler dan perisian digunakan untuk mengawal corak pergerakan yang kompleks dan responsif.' }],

  rightSubheading: 'Proses Penghasilan',
  rightProcess: [
  'Merancang konsep pergerakan dan estetika',
  'Mereka bentuk sistem mekanikal atau elektronik',
  'Membina rangka dan struktur utama',
  'Memasang sistem penggerak (motor, gear, dll)',
  'Menguji dan melaraskan pergerakan',
  'Menambah elemen estetika dan kemasan',
  'Ujian akhir dan pemasangan karya']

},
{
  id: 4,
  topic: 'Nilai Estetika',
  leftHeading: 'Nilai Estetika',
  leftText: 'Nilai estetika arca kinetik terletak pada keupayaannya mewujudkan pengalaman seni yang hidup dan dinamik. Pergerakan mengubah arca daripada objek statik kepada entiti yang hidup — ia bernafas, bergerak dan berinteraksi dengan persekitarannya. Pengalaman melihat arca kinetik adalah pengalaman yang berbeza pada setiap saat, menjadikan setiap lawatan unik.',
  rightText1: 'Bunyi yang dihasilkan oleh pergerakan bahagian-bahagian arca kinetik menambahkan dimensi auditori kepada pengalaman seni. Bunyi mekanik, geseran logam atau desiran angin menjadi sebahagian daripada karya, mewujudkan pengalaman multi-deria yang kaya dan menyeluruh.',
  rightText2: 'Hubungan antara arca kinetik dan persekitarannya adalah unik — angin, cahaya dan kehadiran manusia mempengaruhi pergerakan arca, menjadikan persekitaran sebahagian daripada karya. Ini mewujudkan dialog antara karya dan ruang yang tidak wujud dalam arca statik.',
  rightText3: 'Dalam konteks seni kontemporari, arca kinetik terus berkembang dengan penggabungan teknologi digital, kecerdasan buatan dan sensor canggih. Arca kinetik interaktif yang responsif kepada penonton mewujudkan pengalaman seni yang peribadi dan unik bagi setiap individu yang berinteraksi dengannya.',
  imageUrl: "https://images.unsplash.com/photo-1548171050-deddced45685",
  imageAlt: 'Nilai estetika arca kinetik melalui pergerakan dinamik dan interaksi dengan persekitaran'
}];


const BAHAN_DATA = [
{ category: 'Bahan Struktur', items: [
  { name: 'Kepingan Keluli', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd0f5252-1766505546339.png", imageAlt: 'Kepingan keluli untuk struktur arca kinetik' },
  { name: 'Aluminium Nipis', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_10d371ebb-1783419725374.png", imageAlt: 'Aluminium nipis ringan untuk bahagian bergerak' },
  { name: 'Tiub Keluli', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_415fe1158-1789604407497.png", imageAlt: 'Tiub keluli untuk rangka arca kinetik' },
  { name: 'Plastik Akrilik', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_12e7c7b3d-1774560249547.png", imageAlt: 'Plastik akrilik untuk bahagian kinetik ringan' }]
},
{ category: 'Komponen Mekanikal', items: [
  { name: 'Motor Elektrik', imageUrl: "https://images.unsplash.com/photo-1615483156702-d7b709bf4143", imageAlt: 'Motor elektrik untuk menggerakkan arca kinetik' },
  { name: 'Gear & Rantai', imageUrl: "https://images.unsplash.com/photo-1703756291772-20527a9d5fe1", imageAlt: 'Gear dan rantai untuk sistem mekanikal' },
  { name: 'Galas (Bearing)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4d70c7c02-1789743581207.png", imageAlt: 'Galas untuk pergerakan licin bahagian kinetik' },
  { name: 'Engsel & Pivot', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_42a5c3d8a-1789743581240.png", imageAlt: 'Engsel dan pivot untuk titik pergerakan' }]
},
{ category: 'Komponen Elektronik', items: [
  { name: 'Mikrokontroler Arduino', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_168c73da1-1766292150897.png", imageAlt: 'Arduino untuk kawalan arca kinetik digital' },
  { name: 'Sensor Gerak', imageUrl: "https://images.unsplash.com/photo-1719100423730-bca1b8b82794", imageAlt: 'Sensor gerak untuk arca kinetik interaktif' },
  { name: 'Bekalan Kuasa', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1b06ce9ae-1774797952055.png", imageAlt: 'Bekalan kuasa untuk motor arca kinetik' }]
},
{ category: 'Alatan & Kemasan', items: [
  { name: 'Gerudi & Penebuk', imageUrl: "https://images.unsplash.com/photo-1697071628662-6e14d952d488", imageAlt: 'Gerudi untuk membuat lubang pada bahan' },
  { name: 'Cat Logam', imageUrl: "https://images.unsplash.com/photo-1598077850173-7fc4b5b30750", imageAlt: 'Cat logam untuk kemasan arca kinetik' },
  { name: 'Pelincir Mekanik', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1e0270fe8-1765255146865.png", imageAlt: 'Pelincir untuk bahagian bergerak arca kinetik' }]
}];


const KARYA_DATA = [
{
  title: 'Heureka',
  artist: 'Jean Tinguely',
  year: '1964',
  desc: 'Mesin kinetik besar yang diperbuat daripada besi terpakai dan komponen industri, bergerak dengan bising dan kacau sebagai kritik terhadap industrialisasi dan kemajuan teknologi yang membuta.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4b7b4d0ae-1789602794385.png",
  imageAlt: 'Heureka Jean Tinguely 1964 mesin kinetik besi terpakai bergerak bising sebagai kritik industri'
},
{
  title: 'Two Lines Oblique',
  artist: 'George Rickey',
  year: '1967',
  desc: 'Arca kinetik keluli tahan karat yang terdiri daripada dua bilah panjang bergerak perlahan dan elegan mengikut angin, menggambarkan keseimbangan sempurna antara kestabilan dan pergerakan bebas.',
  imageUrl: "https://images.unsplash.com/photo-1615483156702-d7b709bf4143",
  imageAlt: 'Two Lines Oblique George Rickey 1967 arca kinetik keluli dua bilah bergerak elegan mengikut angin'
},
{
  title: 'Whirligig',
  artist: 'Len Lye',
  year: '1976',
  desc: 'Arca kinetik keluli berputar pantas karya Len Lye yang menggunakan getaran dan putaran untuk mewujudkan kesan visual yang menakjubkan, menggabungkan seni dengan eksplorasi tenaga dan pergerakan.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_44cf67f63-1789669528389.png",
  imageAlt: 'Whirligig Len Lye 1976 arca kinetik keluli berputar pantas menggunakan getaran dan tenaga'
},
{
  title: 'Bicycle Wheel',
  artist: 'Marcel Duchamp',
  year: '1913',
  desc: 'Karya kinetik terawal dalam sejarah seni moden — roda basikal dipasang terbalik di atas bangku, boleh diputar dengan tangan, menandakan permulaan era seni kinetik dan konsep readymade.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4313a6ac7-1789743581209.png",
  imageAlt: 'Bicycle Wheel Marcel Duchamp 1913 roda basikal terbalik di bangku karya kinetik terawal seni moden'
}];


export default function ArcaKinetikPage() {
  const [bookState, setBookState] = useState<BookState>('closed');
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');
  const [showBahan, setShowBahan] = useState(false);
  const [showKarya, setShowKarya] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {setMounted(true);}, []);

  const handleBookClick = useCallback(() => {
    if (isFlipping) return;
    if (bookState === 'closed') {
      setBookState('opening');
      setTimeout(() => {setBookState('open');setCurrentSpread(1);}, 800);
    } else if (bookState === 'open') {
      if (currentSpread < 4) {
        setIsFlipping(true);setFlipDirection('forward');
        setTimeout(() => {setCurrentSpread((p) => p + 1);setIsFlipping(false);}, 700);
      } else {
        setIsFlipping(true);setFlipDirection('forward');
        setTimeout(() => {
          setBookState('closing');setIsFlipping(false);
          setTimeout(() => {setBookState('closed');setCurrentSpread(0);}, 800);
        }, 700);
      }
    }
  }, [bookState, currentSpread, isFlipping]);

  if (!mounted) return null;
  const isOpening = bookState === 'opening';
  const isClosed = bookState === 'closed';

  return (
    <div className="relative w-full min-h-screen overflow-hidden select-none">
      <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url(/assets/images/IMG_2664-1789601863261.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 z-0" style={{ background: 'rgba(10, 100, 85, 0.72)' }} />
      <div className="absolute inset-0 pointer-events-none z-1" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(50,220,200,0.12) 0%, transparent 70%)' }} />

      <Link href="/projects/arca/buku/jenis" className="absolute top-5 left-5 z-50 flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.88)', boxShadow: '0 2px 12px rgba(0,0,0,0.25)', color: '#0e4a40', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="#0e4a40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Back
      </Link>

      <div className="absolute z-30 w-full flex justify-center" style={{ top: '3%' }}>
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '0.18em', color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.5)', lineHeight: 1 }}>ARCA KINETIK</h1>
      </div>

      <div className="absolute z-20" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: '2%' }}>
        <div onClick={handleBookClick} style={{ cursor: isFlipping ? 'default' : 'pointer', perspective: '1400px', perspectiveOrigin: '50% 50%' }}>
          {(isClosed || isOpening || bookState === 'closing') && <ClosedBook isOpening={isOpening} isClosing={bookState === 'closing'} />}
          {bookState === 'open' && <OpenBook currentSpread={currentSpread} isFlipping={isFlipping} flipDirection={flipDirection} />}
        </div>
        {bookState === 'open' &&
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
            {[1, 2, 3, 4].map((n) => <div key={n} style={{ width: n === currentSpread ? 20 : 8, height: 8, borderRadius: 4, background: n === currentSpread ? ACCENT : 'rgba(23,165,137,0.35)', transition: 'all 0.3s ease' }} />)}
          </div>
        }
      </div>

      <button onClick={() => setShowBahan(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '3%', left: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2657-1789578278816.jpeg" alt="Bahan arca kinetik" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Bahan</span>
      </button>
      <button onClick={() => setShowKarya(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '3%', right: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2656-1789578278955.jpeg" alt="Karya arca kinetik" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Karya</span>
      </button>

      {showBahan && <Modal title="Bahan & Alatan Arca Kinetik" onClose={() => setShowBahan(false)} accent={ACCENT}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {BAHAN_DATA.map((section) =>
          <div key={section.category}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', fontWeight: 700, color: ACCENT, letterSpacing: '0.06em', marginBottom: 12, borderBottom: `1px solid ${ACCENT}33`, paddingBottom: 4 }}>{section.category}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
                {section.items.map((item) =>
              <div key={item.name} style={{ borderRadius: 8, overflow: 'hidden', background: '#fff', border: `1px solid ${ACCENT}22`, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.imageAlt} style={{ width: '100%', height: 70, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '6px 8px' }}><span style={{ fontFamily: 'Georgia, serif', fontSize: '0.72rem', color: '#0e4a40', fontWeight: 600, lineHeight: 1.3, display: 'block' }}>{item.name}</span></div>
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
      </Modal>}

      {showKarya && <Modal title="Contoh Karya Arca Kinetik" onClose={() => setShowKarya(false)} accent={ACCENT}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {KARYA_DATA.map((karya) =>
          <div key={karya.title} style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', background: '#fff', border: `1px solid ${ACCENT}22` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={karya.imageUrl} alt={karya.imageAlt} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '10px 12px' }}>
                <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 700, color: ACCENT, margin: '0 0 2px' }}>{karya.title}</h4>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.7rem', color: ACCENT_DARK, fontWeight: 600, marginBottom: 2 }}>{karya.artist} · {karya.year}</div>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.72rem', color: '#2c3e50', lineHeight: 1.5, margin: 0 }}>{karya.desc}</p>
              </div>
            </div>
          )}
        </div>
      </Modal>}
    </div>);

}

function ClosedBook({ isOpening, isClosing }: {isOpening: boolean;isClosing: boolean;}) {
  return (
    <div style={{ width: 'clamp(240px, 36vw, 420px)', height: 'clamp(340px, 54vh, 600px)', position: 'relative', transformStyle: 'preserve-3d', transform: isOpening ? 'rotateY(-25deg) scale(0.95)' : isClosing ? 'rotateY(-25deg) scale(0.95)' : 'rotateY(-8deg)', transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.45)) drop-shadow(0 8px 20px rgba(0,0,0,0.3))' }}>
      <div style={{ position: 'absolute', left: -28, top: 0, width: 28, height: '100%', background: `linear-gradient(90deg, ${ACCENT_DARK} 0%, ${ACCENT} 40%, ${ACCENT_LIGHT} 100%)`, transformOrigin: 'right center', transform: 'rotateY(-90deg)', borderRadius: '4px 0 0 4px', boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 1vw, 0.75rem)', fontWeight: 700, color: 'rgba(200,255,245,0.9)', letterSpacing: '0.12em', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>ARCA KINETIK</span>
      </div>
      <div style={{ width: '100%', height: '100%', background: `linear-gradient(145deg, ${ACCENT_LIGHT} 0%, ${ACCENT} 30%, #0e6655 60%, ${ACCENT_DARK} 100%)`, borderRadius: '2px 8px 8px 2px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.2)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 12, border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: '72%', height: '48%', borderRadius: 6, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.25)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/arca_kinetik_cover.png" alt="Karya arca kinetik pada kulit buku" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '14%', left: 0, right: 0, textAlign: 'center', padding: '0 16px' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.85rem, 2vw, 1.2rem)', fontWeight: 900, color: 'rgba(200,255,245,0.97)', letterSpacing: '0.15em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>ARCA KINETIK</div>
          <div style={{ width: 40, height: 1.5, background: 'rgba(150,240,220,0.6)', margin: '6px auto 0', borderRadius: 1 }} />
        </div>
        <div style={{ position: 'absolute', right: -6, top: 4, bottom: 4, width: 6, background: 'linear-gradient(90deg, #e8f8f5 0%, #d1f2eb 50%, #a9dfbf 100%)', borderRadius: '0 2px 2px 0', boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.15)' }}>
          {Array.from({ length: 20 }).map((_, i) => <div key={i} style={{ height: '5%', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }} />)}
        </div>
      </div>
    </div>);

}

function OpenBook({ currentSpread, isFlipping, flipDirection }: {currentSpread: number;isFlipping: boolean;flipDirection: 'forward' | 'backward';}) {
  const spread = SPREADS_DATA[currentSpread - 1];
  return (
    <div style={{ width: 'clamp(320px, 80vw, 900px)', height: 'clamp(240px, 55vh, 580px)', position: 'relative', display: 'flex', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 12px 30px rgba(0,0,0,0.35))' }}>
      <div style={{ flex: 1, background: 'linear-gradient(105deg, #e8f8f5 0%, #d1f2eb 100%)', borderRadius: '8px 0 0 8px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.08)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-5deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'right center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>{spread && <LeftPageContent spread={spread} />}</div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06))', pointerEvents: 'none', zIndex: 3 }} />
      </div>
      <div style={{ width: 'clamp(12px, 1.5vw, 20px)', background: `linear-gradient(90deg, ${ACCENT_DARK} 0%, #0e6655 40%, ${ACCENT} 60%, #148f77 100%)`, position: 'relative', boxShadow: '0 0 12px rgba(0,0,0,0.3)', zIndex: 10, flexShrink: 0 }}>
        {Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: '50%', top: `${10 + i * 11}%`, transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'rgba(150,240,220,0.5)' }} />)}
      </div>
      <div style={{ flex: 1, background: 'linear-gradient(75deg, #d1f2eb 0%, #e8f8f5 100%)', borderRadius: '0 8px 8px 0', position: 'relative', overflow: 'hidden', boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.06)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-180deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'left center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>{spread && <RightPageContent spread={spread} />}</div>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.05))', pointerEvents: 'none', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 10, right: 16, fontFamily: 'Georgia, serif', fontSize: '0.65rem', color: `${ACCENT}66`, letterSpacing: '0.1em', zIndex: 4 }}>{currentSpread * 2}</div>
      </div>
      {isFlipping && <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'linear-gradient(105deg, #d1f2eb 0%, #e8f8f5 100%)', transformOrigin: 'left center', animation: 'pageFlipKinetik 0.7s cubic-bezier(0.4,0,0.2,1) forwards', zIndex: 20, borderRadius: '0 8px 8px 0', boxShadow: '-8px 0 24px rgba(0,0,0,0.2)' }} />}
      <style>{`@keyframes pageFlipKinetik { 0% { transform: rotateY(0deg); } 50% { transform: rotateY(-90deg); } 100% { transform: rotateY(-180deg); } }`}</style>
    </div>);

}

function PageTexture() {
  return <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', opacity: 0.6 }} />;
}

function LeftPageContent({ spread }: {spread: typeof SPREADS_DATA[0];}) {
  const s = spread as any;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vh, 14px)' }}>
      <div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 2vw, 1.4rem)', fontWeight: 900, color: ACCENT, letterSpacing: '0.06em', margin: 0, lineHeight: 1.2 }}>{s.leftHeading}</h2>
        <div style={{ width: 'clamp(28px, 5vw, 48px)', height: 2, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, marginTop: 5, borderRadius: 1 }} />
      </div>
      {s.leftText && <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#0e4a40', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{s.leftText}</p>}
      {s.id === 1 && s.imageUrl && <div style={{ flex: 1, borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${ACCENT}33`, minHeight: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}
      {s.leftItems && <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>{s.leftItems.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 8 }}><div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: ACCENT_DARK, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#0e4a40', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div></div></div>)}</div>}
      {s.leftSubheading && <><h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: ACCENT, margin: 0, letterSpacing: '0.04em' }}>{s.leftSubheading}</h3><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)', flex: 1 }}>{s.leftTechniques?.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid ${ACCENT}66`, paddingLeft: 8 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: ACCENT_DARK }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#0e4a40', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div></div>)}</div></>}
      <div style={{ marginTop: 'auto', fontFamily: 'Georgia, serif', fontSize: '0.6rem', color: `${ACCENT}55`, letterSpacing: '0.1em' }}>{spread.id * 2 - 1}</div>
    </div>);

}

function RightPageContent({ spread }: {spread: typeof SPREADS_DATA[0];}) {
  const s = spread as any;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vh, 14px)' }}>
      {s.id === 1 && <><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#0e4a40', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{s.rightText1}</p><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#0e4a40', lineHeight: 1.7, margin: 0, textAlign: 'justify', fontStyle: 'italic', borderLeft: `2px solid ${ACCENT}55`, paddingLeft: 10 }}>{s.rightText2}</p></>}
      {s.id === 2 && s.rightHeading && <><div><h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', fontWeight: 900, color: ACCENT, letterSpacing: '0.06em', margin: 0, lineHeight: 1.2 }}>{s.rightHeading}</h2><div style={{ width: 'clamp(28px, 5vw, 48px)', height: 2, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, marginTop: 5, borderRadius: 1 }} /></div><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>{s.rightItems?.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 8 }}><div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: ACCENT_DARK, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#0e4a40', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div></div></div>)}</div></>}
      {s.rightTechniques && <><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)' }}>{s.rightTechniques.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid ${ACCENT}66`, paddingLeft: 8 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: ACCENT_DARK }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#0e4a40', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div></div>)}</div>{s.rightSubheading && <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: ACCENT, margin: '4px 0 0', letterSpacing: '0.04em' }}>{s.rightSubheading}</h3>}{s.rightProcess && <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>{s.rightProcess.map((step: string, i: number) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 'clamp(14px, 1.8vw, 20px)', height: 'clamp(14px, 1.8vw, 20px)', borderRadius: '50%', border: `1.5px solid ${ACCENT}88`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)', fontWeight: 700, color: ACCENT, fontFamily: 'Georgia, serif', flexShrink: 0 }}>{i + 1}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#0e4a40', lineHeight: 1.4 }}>{step}</div></div>)}</div>}</>}
      {s.id === 4 && <>{s.imageUrl && <div style={{ height: 'clamp(80px, 20vh, 160px)', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${ACCENT}33`, flexShrink: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}{[s.rightText1, s.rightText2, s.rightText3].filter(Boolean).map((text: string, i: number) => <p key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: '#0e4a40', lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{text}</p>)}</>}
    </div>);

}

function Modal({ title, children, onClose, accent }: {title: string;children: React.ReactNode;onClose: () => void;accent: string;}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #e8f8f5 0%, #d1f2eb 100%)', borderRadius: 16, padding: 'clamp(20px, 3vw, 32px)', maxWidth: 720, width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.4)', border: `1px solid ${accent}33`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: `1.5px solid ${accent}44` }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 900, color: accent, margin: 0, letterSpacing: '0.06em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: `${accent}22`, border: `1px solid ${accent}44`, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: accent, fontSize: '1rem', fontWeight: 700 }}>×</button>
        </div>
        {children}
      </div>
    </div>);

}