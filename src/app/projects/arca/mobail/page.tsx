'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type BookState = 'closed' | 'opening' | 'open' | 'closing';

const ACCENT = '#D4AC0D';
const ACCENT_DARK = '#9a7d0a';
const ACCENT_LIGHT = '#f9e79f';

const SPREADS_DATA = [
{
  id: 1,
  topic: 'Definisi',
  leftHeading: 'Definisi',
  leftText: 'Arca mobail (mobile sculpture) ialah sejenis arca gantung yang bahagian-bahagiannya direka untuk bergerak bebas akibat arus udara, sentuhan atau tenaga lain. Diperkenalkan oleh pengarca Amerika Alexander Calder pada awal tahun 1930-an, mobail menggabungkan prinsip keseimbangan, pergerakan dan ruang dalam satu komposisi yang dinamik dan sentiasa berubah.',
  rightText1: 'Calder mencipta istilah "mobile" selepas Marcel Duchamp menggunakannya untuk menggambarkan karya-karya Calder yang bergerak. Mobail berbeza daripada arca statik kerana ia menjadikan masa dan pergerakan sebagai elemen seni yang penting — setiap kedudukan bahagian yang bergerak menghasilkan komposisi visual yang berbeza dan unik.',
  rightText2: 'Dalam konteks pendidikan seni visual, arca mobail mengajar pelajar tentang prinsip keseimbangan, berat dan daya graviti, serta bagaimana pergerakan boleh menjadi elemen estetika yang bermakna dalam karya seni tiga dimensi.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_428ad3abf-1789669528326.png",
  imageAlt: 'Lobster Trap and Fish Tail karya Alexander Calder 1939 contoh arca mobail klasik'
},
{
  id: 2,
  topic: 'Ciri-ciri',
  leftHeading: 'Ciri-ciri',
  leftItems: [
  { num: '1', title: 'Bahagian bergerak bebas', desc: 'Komponen-komponen arca digantung pada wayar atau tali yang membolehkan setiap bahagian berputar, berayun dan bergerak secara bebas dan bebas.' },
  { num: '2', title: 'Keseimbangan yang teliti', desc: 'Setiap bahagian mesti diseimbangkan dengan tepat supaya keseluruhan struktur kekal dalam keseimbangan walaupun bahagian-bahagiannya bergerak.' },
  { num: '3', title: 'Komposisi yang sentiasa berubah', desc: 'Pergerakan menghasilkan komposisi visual yang berbeza pada setiap masa, menjadikan setiap pemerhatian pengalaman yang unik.' },
  { num: '4', title: 'Menggunakan bahan ringan', desc: 'Bahan yang digunakan mestilah ringan seperti logam nipis, kayu ringan atau plastik supaya mudah bergerak dengan angin atau sentuhan ringan.' }],

  rightHeading: 'Nilai Estetika Pergerakan',
  rightItems: [
  { num: 'A', title: 'Dimensi Masa', desc: 'Pergerakan menambahkan dimensi masa kepada arca, menjadikannya karya yang hidup dan sentiasa berubah berbeza dengan arca statik.' },
  { num: 'B', title: 'Hubungan dengan Ruang', desc: 'Bahagian yang bergerak meneroka dan mendefinisikan ruang di sekelilingnya, mewujudkan hubungan dinamik antara arca dan persekitarannya.' },
  { num: 'C', title: 'Keseimbangan Visual', desc: 'Keseimbangan yang teliti antara bahagian-bahagian mencerminkan prinsip harmoni dan keseimbangan dalam alam semula jadi.' },
  { num: 'D', title: 'Interaksi dengan Persekitaran', desc: 'Angin, cahaya dan pergerakan manusia di sekitar arca mempengaruhi pergerakan mobail, menjadikan persekitaran sebahagian daripada karya.' }],

  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_471febd60-1789669528387.png",
  imageAlt: 'Arca mobail menunjukkan ciri-ciri keseimbangan dan pergerakan bebas'
},
{
  id: 3,
  topic: 'Teknik Penghasilan',
  leftHeading: 'Teknik Penghasilan',
  leftSubheading: 'Teknik Utama',
  leftTechniques: [
  { name: 'Teknik Keseimbangan (Balancing)', desc: 'Setiap bahagian mesti diuji keseimbangannya sebelum disambung — titik gantung mesti tepat supaya bahagian kekal mendatar atau pada sudut yang dikehendaki.' },
  { name: 'Teknik Pembentukan Logam', desc: 'Kepingan logam nipis (aluminium, gangsa) dipotong, dibentuk dan dicat untuk menghasilkan bahagian-bahagian mobail yang ringan dan tahan lama.' },
  { name: 'Teknik Penyambungan Wayar', desc: 'Wayar keluli atau tembaga digunakan untuk menghubungkan bahagian-bahagian, dengan panjang dan ketebalan wayar yang berbeza untuk mengawal pergerakan.' }],

  rightTechniques: [
  { name: 'Teknik Pengujian Pergerakan', desc: 'Setiap peringkat pembinaan diuji dalam keadaan angin semula jadi untuk memastikan pergerakan yang dikehendaki tercapai dan keseimbangan terjaga.' },
  { name: 'Teknik Pemasangan Gantung', desc: 'Titik gantung utama mesti dikira dengan tepat untuk memastikan keseluruhan struktur tergantung pada sudut yang betul dan bergerak dengan bebas.' }],

  rightSubheading: 'Proses Penghasilan',
  rightProcess: [
  'Merancang komposisi dan bilangan bahagian',
  'Memilih bahan yang ringan dan sesuai',
  'Memotong dan membentuk setiap bahagian',
  'Mengecat atau kemasan setiap bahagian',
  'Mengira titik keseimbangan setiap bahagian',
  'Menyambung bahagian dengan wayar secara berperingkat dari bawah ke atas',
  'Menguji keseimbangan dan pergerakan keseluruhan']

},
{
  id: 4,
  topic: 'Nilai Estetika',
  leftHeading: 'Nilai Estetika',
  leftText: 'Nilai estetika arca mobail terletak pada keupayaannya menggabungkan keindahan bentuk dengan keindahan pergerakan. Setiap bahagian yang bergerak menghasilkan komposisi visual yang berbeza pada setiap saat, menjadikan pengalaman melihat mobail sebagai pengalaman yang dinamik dan tidak pernah berulang. Keindahan ini tidak dapat ditangkap sepenuhnya dalam gambar statik.',
  rightText1: 'Permainan cahaya dan bayang yang dihasilkan oleh bahagian-bahagian mobail yang bergerak menambahkan dimensi visual yang kaya. Apabila cahaya jatuh pada permukaan logam yang bergerak, ia menghasilkan pantulan dan bayang yang sentiasa berubah, mewujudkan persembahan cahaya yang hidup dan dinamik.',
  rightText2: 'Prinsip keseimbangan yang menjadi asas mobail mencerminkan keseimbangan alam semula jadi — seperti dahan pokok yang berayun dalam angin atau burung yang terbang dalam keseimbangan sempurna. Hubungan antara mobail dan angin menjadikan alam semula jadi sebahagian daripada karya seni itu sendiri.',
  rightText3: 'Dalam konteks seni kontemporari, mobail terus berkembang dengan penggunaan bahan baharu seperti plastik, kaca dan bahan komposit, serta penggabungan teknologi seperti motor dan sensor untuk menghasilkan pergerakan yang lebih kompleks dan terkawal.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4091be7e1-1789669528414.png",
  imageAlt: 'Nilai estetika arca mobail melalui pergerakan dan keseimbangan'
}];


const BAHAN_DATA = [
{ category: 'Bahan Utama', items: [
  { name: 'Kepingan Aluminium', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_141e97119-1767962094922.png", imageAlt: 'Kepingan aluminium nipis untuk bahagian mobail' },
  { name: 'Kepingan Gangsa', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_14d7befd4-1768657918833.png", imageAlt: 'Kepingan gangsa untuk bahagian mobail' },
  { name: 'Kayu Ringan (Balsa)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4cef04808-1789579165967.png", imageAlt: 'Kayu balsa ringan untuk bahagian mobail' },
  { name: 'Plastik Akrilik', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1467c7987-1767706001127.png", imageAlt: 'Plastik akrilik untuk bahagian mobail berwarna' },
  { name: 'Kertas Tebal', imageUrl: "/assets/images/kertas_tebal.png", imageAlt: 'Kertas tebal untuk mobail mudah' }]
},
{ category: 'Bahan Penyambung', items: [
  { name: 'Wayar Keluli', imageUrl: "https://images.unsplash.com/photo-1712600096342-0445dbb13c20", imageAlt: 'Wayar keluli untuk menghubungkan bahagian mobail' },
  { name: 'Wayar Tembaga', imageUrl: "/assets/images/wayar_tembaga.png", imageAlt: 'Wayar tembaga fleksibel untuk mobail' },
  { name: 'Tali Nilon', imageUrl: "https://images.unsplash.com/photo-1638358599022-45c6565876db", imageAlt: 'Tali nilon kuat untuk menggantung bahagian' },
  { name: 'Kait & Gelung Logam', imageUrl: "https://images.unsplash.com/photo-1635854352854-5e723cd9a579", imageAlt: 'Kait dan gelung untuk sambungan mobail' }]
},
{ category: 'Alatan', items: [
  { name: 'Gunting Logam', imageUrl: "/assets/images/gunting_logam.png", imageAlt: 'Gunting logam untuk memotong kepingan logam' },
  { name: 'Tang Bulat', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1cbef45eb-1772075958495.png", imageAlt: 'Tang bulat untuk membentuk wayar' },
  { name: 'Penebuk Lubang', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_142f32774-1773172749179.png", imageAlt: 'Penebuk lubang untuk membuat lubang gantung' },
  { name: 'Penimbang Dacing', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1be5c9f3f-1772664447658.png", imageAlt: 'Penimbang untuk mengukur berat bahagian' }]
},
{ category: 'Bahan Kemasan', items: [
  { name: 'Cat Akrilik', imageUrl: "/assets/images/cat_akrilik.png", imageAlt: 'Cat akrilik untuk mewarna bahagian mobail' },
  { name: 'Cat Semburan', imageUrl: "/assets/images/cat_semburan.png", imageAlt: 'Cat semburan untuk kemasan seragam' },
  { name: 'Vernish Pelindung', imageUrl: "https://images.unsplash.com/photo-1601980753800-347d4fc67142", imageAlt: 'Vernish untuk melindungi kemasan mobail' },
  { name: 'Kertas Pasir Halus', imageUrl: "https://images.unsplash.com/photo-1583119247520-3d0b4772a0eb", imageAlt: 'Kertas pasir untuk menghaluskan tepi logam' }]
}];


const KARYA_DATA = [
{
  title: 'Lobster Trap and Fish Tail',
  artist: 'Alexander Calder',
  year: '1939',
  desc: 'Mobail gangsa dan besi yang tergantung di tangga Museum of Modern Art New York, dianggap sebagai salah satu karya mobail paling ikonik dalam sejarah seni moden.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4735d012d-1789604407454.png",
  imageAlt: 'Lobster Trap and Fish Tail Alexander Calder 1939 mobail gangsa dan besi di MoMA New York'
},
{
  title: 'Big Red',
  artist: 'Alexander Calder',
  year: '1959',
  desc: 'Mobail berskala monumental dengan kepingan logam merah besar yang bergerak perlahan dan megah, kini dipamerkan di Whitney Museum of American Art di New York.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4ec72ad5a-1789602795635.png",
  imageAlt: 'Big Red Alexander Calder 1959 mobail monumental kepingan logam merah besar di Whitney Museum'
},
{
  title: 'Untitled (Hanging Mobile)',
  artist: 'George Rickey',
  year: '1965',
  desc: 'Mobail keluli tahan karat karya Rickey yang bergerak dengan sangat perlahan dan elegan mengikut angin semula jadi, menggambarkan keseimbangan sempurna antara berat dan pergerakan.',
  imageUrl: "https://images.unsplash.com/photo-1601105610773-a0c8decaa9d9",
  imageAlt: 'Mobail keluli tahan karat George Rickey bergerak perlahan dan elegan mengikut angin'
},
{
  title: 'Fountain of Time',
  artist: 'Len Lye',
  year: '1979',
  desc: 'Mobail keluli bergetar karya Len Lye yang menggunakan getaran dan pergerakan halus untuk mewujudkan kesan visual yang hipnotik, menggabungkan seni kinetik dengan eksplorasi masa dan tenaga.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_44cf67f63-1789669528389.png",
  imageAlt: 'Mobail keluli bergetar Len Lye 1979 menggunakan getaran untuk kesan visual hipnotik'
}];


export default function ArcaMobailPage() {
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
      <div className="absolute inset-0 z-0" style={{ background: 'rgba(140, 100, 5, 0.72)' }} />
      <div className="absolute inset-0 pointer-events-none z-1" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,220,50,0.12) 0%, transparent 70%)' }} />

      <Link href="/projects/arca/buku/jenis" className="absolute top-5 left-5 z-50 flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.88)', boxShadow: '0 2px 12px rgba(0,0,0,0.25)', color: '#5a3a00', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="#5a3a00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Back
      </Link>

      <div className="absolute z-30 w-full flex justify-center" style={{ top: '3%' }}>
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '0.18em', color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.5)', lineHeight: 1 }}>ARCA MOBAIL</h1>
      </div>

      <div className="absolute z-20" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: '2%' }}>
        <div onClick={handleBookClick} style={{ cursor: isFlipping ? 'default' : 'pointer', perspective: '1400px', perspectiveOrigin: '50% 50%' }}>
          {(isClosed || isOpening || bookState === 'closing') && <ClosedBook isOpening={isOpening} isClosing={bookState === 'closing'} />}
          {bookState === 'open' && <OpenBook currentSpread={currentSpread} isFlipping={isFlipping} flipDirection={flipDirection} />}
        </div>
        {bookState === 'open' &&
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
            {[1, 2, 3, 4].map((n) => <div key={n} style={{ width: n === currentSpread ? 20 : 8, height: 8, borderRadius: 4, background: n === currentSpread ? ACCENT : 'rgba(212,172,13,0.35)', transition: 'all 0.3s ease' }} />)}
          </div>
        }
      </div>

      <button onClick={() => setShowBahan(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '3%', left: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2657-1789578278816.jpeg" alt="Bahan arca mobail" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Bahan</span>
      </button>
      <button onClick={() => setShowKarya(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '3%', right: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2656-1789578278955.jpeg" alt="Karya arca mobail" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Karya</span>
      </button>

      {showBahan && <Modal title="Bahan & Alatan Arca Mobail" onClose={() => setShowBahan(false)} accent={ACCENT}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {BAHAN_DATA.map((section) =>
          <div key={section.category}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', fontWeight: 700, color: ACCENT, letterSpacing: '0.06em', marginBottom: 12, borderBottom: `1px solid ${ACCENT}33`, paddingBottom: 4 }}>{section.category}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
                {section.items.map((item) =>
              <div key={item.name} style={{ borderRadius: 8, overflow: 'hidden', background: '#fff', border: `1px solid ${ACCENT}22`, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.imageAlt} style={{ width: '100%', height: 70, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '6px 8px' }}><span style={{ fontFamily: 'Georgia, serif', fontSize: '0.72rem', color: '#5a3a00', fontWeight: 600, lineHeight: 1.3, display: 'block' }}>{item.name}</span></div>
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
      </Modal>}

      {showKarya && <Modal title="Contoh Karya Arca Mobail" onClose={() => setShowKarya(false)} accent={ACCENT}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {KARYA_DATA.map((karya) =>
          <div key={karya.title} style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', background: '#fff', border: `1px solid ${ACCENT}22` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={karya.imageUrl} alt={karya.imageAlt} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '10px 12px' }}>
                <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 700, color: ACCENT_DARK, margin: '0 0 2px' }}>{karya.title}</h4>
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
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 1vw, 0.75rem)', fontWeight: 700, color: 'rgba(255,250,200,0.9)', letterSpacing: '0.12em', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>ARCA MOBAIL</span>
      </div>
      <div style={{ width: '100%', height: '100%', background: `linear-gradient(145deg, ${ACCENT_LIGHT} 0%, ${ACCENT} 30%, #9a7d0a 60%, ${ACCENT_DARK} 100%)`, borderRadius: '2px 8px 8px 2px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.2)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 12, border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: '72%', height: '48%', borderRadius: 6, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.25)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/arca_mobail_cover.png" alt="Arca mobail gantung dengan bentuk abstrak berwarna-warni pada kulit buku" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '14%', left: 0, right: 0, textAlign: 'center', padding: '0 16px' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.85rem, 2vw, 1.2rem)', fontWeight: 900, color: 'rgba(255,250,200,0.97)', letterSpacing: '0.15em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>ARCA MOBAIL</div>
          <div style={{ width: 40, height: 1.5, background: 'rgba(255,240,150,0.6)', margin: '6px auto 0', borderRadius: 1 }} />
        </div>
        <div style={{ position: 'absolute', right: -6, top: 4, bottom: 4, width: 6, background: 'linear-gradient(90deg, #fef9e7 0%, #fdebd0 50%, #f9e79f 100%)', borderRadius: '0 2px 2px 0', boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.15)' }}>
          {Array.from({ length: 20 }).map((_, i) => <div key={i} style={{ height: '5%', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }} />)}
        </div>
      </div>
    </div>);

}

function OpenBook({ currentSpread, isFlipping, flipDirection }: {currentSpread: number;isFlipping: boolean;flipDirection: 'forward' | 'backward';}) {
  const spread = SPREADS_DATA[currentSpread - 1];
  return (
    <div style={{ width: 'clamp(320px, 80vw, 900px)', height: 'clamp(240px, 55vh, 580px)', position: 'relative', display: 'flex', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 12px 30px rgba(0,0,0,0.35))' }}>
      <div style={{ flex: 1, background: 'linear-gradient(105deg, #fef9e7 0%, #fdebd0 100%)', borderRadius: '8px 0 0 8px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.08)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-5deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'right center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>{spread && <LeftPageContent spread={spread} />}</div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06))', pointerEvents: 'none', zIndex: 3 }} />
      </div>
      <div style={{ width: 'clamp(12px, 1.5vw, 20px)', background: `linear-gradient(90deg, ${ACCENT_DARK} 0%, #9a7d0a 40%, ${ACCENT} 60%, #b8960c 100%)`, position: 'relative', boxShadow: '0 0 12px rgba(0,0,0,0.3)', zIndex: 10, flexShrink: 0 }}>
        {Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: '50%', top: `${10 + i * 11}%`, transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,240,150,0.5)' }} />)}
      </div>
      <div style={{ flex: 1, background: 'linear-gradient(75deg, #fdebd0 0%, #fef9e7 100%)', borderRadius: '0 8px 8px 0', position: 'relative', overflow: 'hidden', boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.06)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-180deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'left center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>{spread && <RightPageContent spread={spread} />}</div>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.05))', pointerEvents: 'none', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 10, right: 16, fontFamily: 'Georgia, serif', fontSize: '0.65rem', color: `${ACCENT}66`, letterSpacing: '0.1em', zIndex: 4 }}>{currentSpread * 2}</div>
      </div>
      {isFlipping && <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'linear-gradient(105deg, #fdebd0 0%, #fef9e7 100%)', transformOrigin: 'left center', animation: 'pageFlipMobail 0.7s cubic-bezier(0.4,0,0.2,1) forwards', zIndex: 20, borderRadius: '0 8px 8px 0', boxShadow: '-8px 0 24px rgba(0,0,0,0.2)' }} />}
      <style>{`@keyframes pageFlipMobail { 0% { transform: rotateY(0deg); } 50% { transform: rotateY(-90deg); } 100% { transform: rotateY(-180deg); } }`}</style>
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
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 2vw, 1.4rem)', fontWeight: 900, color: ACCENT_DARK, letterSpacing: '0.06em', margin: 0, lineHeight: 1.2 }}>{s.leftHeading}</h2>
        <div style={{ width: 'clamp(28px, 5vw, 48px)', height: 2, background: `linear-gradient(90deg, ${ACCENT_DARK}, transparent)`, marginTop: 5, borderRadius: 1 }} />
      </div>
      {s.leftText && <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#5a3a00', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{s.leftText}</p>}
      {s.id === 1 && s.imageUrl && <div style={{ flex: 1, borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${ACCENT}33`, minHeight: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}
      {s.leftItems && <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>{s.leftItems.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 8 }}><div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: ACCENT_DARK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: ACCENT_DARK, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#5a3a00', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div></div></div>)}</div>}
      {s.leftSubheading && <><h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: ACCENT_DARK, margin: 0, letterSpacing: '0.04em' }}>{s.leftSubheading}</h3><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)', flex: 1 }}>{s.leftTechniques?.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid ${ACCENT}88`, paddingLeft: 8 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: ACCENT_DARK }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#5a3a00', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div></div>)}</div></>}
      <div style={{ marginTop: 'auto', fontFamily: 'Georgia, serif', fontSize: '0.6rem', color: `${ACCENT}88`, letterSpacing: '0.1em' }}>{spread.id * 2 - 1}</div>
    </div>);

}

function RightPageContent({ spread }: {spread: typeof SPREADS_DATA[0];}) {
  const s = spread as any;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vh, 14px)' }}>
      {s.id === 1 && <><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#5a3a00', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{s.rightText1}</p><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#5a3a00', lineHeight: 1.7, margin: 0, textAlign: 'justify', fontStyle: 'italic', borderLeft: `2px solid ${ACCENT}88`, paddingLeft: 10 }}>{s.rightText2}</p></>}
      {s.id === 2 && s.rightHeading && <><div><h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', fontWeight: 900, color: ACCENT_DARK, letterSpacing: '0.06em', margin: 0, lineHeight: 1.2 }}>{s.rightHeading}</h2><div style={{ width: 'clamp(28px, 5vw, 48px)', height: 2, background: `linear-gradient(90deg, ${ACCENT_DARK}, transparent)`, marginTop: 5, borderRadius: 1 }} /></div><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>{s.rightItems?.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 8 }}><div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: ACCENT_DARK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: ACCENT_DARK, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#5a3a00', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div></div></div>)}</div></>}
      {s.rightTechniques && <><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)' }}>{s.rightTechniques.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid ${ACCENT}88`, paddingLeft: 8 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: ACCENT_DARK }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#5a3a00', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div></div>)}</div>{s.rightSubheading && <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: ACCENT_DARK, margin: '4px 0 0', letterSpacing: '0.04em' }}>{s.rightSubheading}</h3>}{s.rightProcess && <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>{s.rightProcess.map((step: string, i: number) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 'clamp(14px, 1.8vw, 20px)', height: 'clamp(14px, 1.8vw, 20px)', borderRadius: '50%', border: `1.5px solid ${ACCENT}88`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)', fontWeight: 700, color: ACCENT_DARK, fontFamily: 'Georgia, serif', flexShrink: 0 }}>{i + 1}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#5a3a00', lineHeight: 1.4 }}>{step}</div></div>)}</div>}</>}
      {s.id === 4 && <>{s.imageUrl && <div style={{ height: 'clamp(80px, 20vh, 160px)', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${ACCENT}33`, flexShrink: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}{[s.rightText1, s.rightText2, s.rightText3].filter(Boolean).map((text: string, i: number) => <p key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: '#5a3a00', lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{text}</p>)}</>}
    </div>);

}

function Modal({ title, children, onClose, accent }: {title: string;children: React.ReactNode;onClose: () => void;accent: string;}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #fef9e7 0%, #fdebd0 100%)', borderRadius: 16, padding: 'clamp(20px, 3vw, 32px)', maxWidth: 720, width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.4)', border: `1px solid ${accent}44`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: `1.5px solid ${accent}66` }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 900, color: ACCENT_DARK, margin: 0, letterSpacing: '0.06em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: `${accent}22`, border: `1px solid ${accent}44`, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: ACCENT_DARK, fontSize: '1rem', fontWeight: 700 }}>×</button>
        </div>
        {children}
      </div>
    </div>);

}