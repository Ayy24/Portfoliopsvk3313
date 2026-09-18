'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type BookState = 'closed' | 'opening' | 'open' | 'closing';

const SPREADS_DATA = [
{
  id: 1,
  topic: 'Definisi',
  leftHeading: 'Definisi',
  leftText:
  'Origami merupakan seni melipat kertas yang berasal dari Jepun dan telah berkembang menjadi salah satu bentuk kraf yang diiktiraf secara global. Perkataan "origami" berasal daripada bahasa Jepun iaitu "oru" (melipat) dan "kami" (kertas), yang secara harfiahnya bermaksud seni melipat kertas bagi menghasilkan pelbagai bentuk figura, haiwan, tumbuhan, objek dan reka bentuk geometri tanpa menggunakan gunting atau gam.',
  rightText1:
  'Origami lazimnya digunakan sebagai aktiviti seni kreatif, alat bantu mengajar, hiasan, hadiah, bahan pameran serta medium untuk melatih kemahiran motor halus, tumpuan dan pemikiran spatial. Dalam konteks seni visual, penghasilan origami melibatkan penerapan unsur seni seperti garisan, rupa, bentuk, ruang dan nilai, serta prinsip rekaan seperti imbangan, harmoni, simetri dan penegasan.',
  rightText2:
  'Oleh itu, origami bukan sahaja merupakan aktiviti melipat kertas semata-mata, malah menjadi medium ekspresi kreatif yang membolehkan pengkarya menyampaikan idea, keindahan geometri, identiti budaya dan makna tertentu melalui lipatan yang tepat dan terancang.',
  imageUrl: "https://images.unsplash.com/photo-1567527142939-56d3681e22c1",
  imageAlt: 'Colourful origami paper cranes and geometric shapes arranged artistically'
},
{
  id: 2,
  topic: 'Ciri-ciri',
  leftHeading: 'Ciri-ciri',
  leftItems: [
  { num: '1', title: 'Dihasilkan hanya melalui teknik melipat kertas', desc: 'Origami tradisional dihasilkan semata-mata melalui lipatan kertas tanpa menggunakan gunting, gam atau bahan tambahan lain, menjadikan kemahiran melipat sebagai elemen utama.' },
  { num: '2', title: 'Menggunakan kertas khas atau kertas biasa', desc: 'Origami boleh dihasilkan menggunakan kertas origami khas yang nipis dan mudah dilipat, atau kertas biasa seperti kertas A4, kertas warna dan kertas majalah.' },
  { num: '3', title: 'Mempunyai bentuk geometri yang tepat dan simetri', desc: 'Setiap lipatan dalam origami menghasilkan bentuk geometri yang tepat dan simetri, memerlukan ketepatan dan konsistensi dalam setiap langkah lipatan.' }],
  rightItems: [
  { num: '4', title: 'Mengikuti urutan langkah yang sistematik', desc: 'Penghasilan origami memerlukan pengikutan urutan langkah lipatan yang sistematik dan teratur, di mana setiap lipatan bergantung kepada lipatan sebelumnya.' },
  { num: '5', title: 'Mempunyai nilai simbolik dan budaya', desc: 'Sesetengah bentuk origami seperti burung jenjang (crane) mempunyai makna simbolik yang mendalam dalam budaya Jepun, melambangkan keamanan, keberuntungan dan panjang umur.' },
  { num: '6', title: 'Mempunyai nilai hiasan dan fungsi pelbagai', desc: 'Origami boleh berfungsi sebagai hiasan, hadiah, alat bantu mengajar, bahan pameran atau produk kraf yang bernilai tinggi bergantung kepada kerumitan dan kreativiti reka bentuknya.' },
  { num: '7', title: 'Mempunyai pelbagai tahap kerumitan', desc: 'Origami wujud dalam pelbagai tahap kerumitan, daripada bentuk mudah seperti kapal kertas dan katak, hingga kepada reka bentuk kompleks yang memerlukan ratusan langkah lipatan.' }],
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_463bce5b1-1789581759398.png",
  imageAlt: 'Various origami shapes showing different complexity levels and folding techniques'
},
{
  id: 3,
  topic: 'Teknik & Proses',
  leftHeading: 'Teknik & Proses Penghasilan',
  leftSubheading: 'Teknik',
  leftTechniques: [
  { name: 'Teknik lipatan asas (valley & mountain fold)', desc: 'Dua lipatan asas origami — lipatan lembah (valley fold) melipat kertas ke hadapan, manakala lipatan gunung (mountain fold) melipat kertas ke belakang, membentuk asas semua reka bentuk.' },
  { name: 'Teknik lipatan dalam (inside reverse fold)', desc: 'Melipat bahagian kertas ke dalam struktur sedia ada untuk menghasilkan bentuk seperti paruh, kaki atau ekor pada figura haiwan.' },
  { name: 'Teknik lipatan luar (outside reverse fold)', desc: 'Melipat bahagian kertas ke luar struktur sedia ada untuk menghasilkan bentuk yang menonjol keluar seperti kepala atau sayap.' },
  { name: 'Teknik lipatan segi tiga (squash fold)', desc: 'Membuka dan meratakan lipatan sedia ada untuk menghasilkan bentuk segi tiga atau segi empat yang digunakan sebagai asas reka bentuk yang lebih kompleks.' }],
  rightTechniques: [
  { name: 'Teknik lipatan petal (petal fold)', desc: 'Teknik lipatan yang menghasilkan bentuk kelopak bunga dengan melipat tepi kertas ke tengah dan kemudian membuka semula secara simetri.' },
  { name: 'Teknik modular origami', desc: 'Menggabungkan beberapa unit origami yang dihasilkan secara berasingan untuk membentuk struktur tiga dimensi yang lebih besar dan kompleks.' }],
  rightSubheading: 'Proses Penghasilan',
  rightProcess: [
  'Memilih reka bentuk dan tahap kerumitan',
  'Menyediakan kertas yang sesuai (saiz & jenis)',
  'Memahami simbol dan diagram lipatan',
  'Melakukan lipatan asas dengan tepat',
  'Mengikuti urutan langkah secara sistematik',
  'Membentuk bahagian perincian figura',
  'Menyiapkan dan merapikan lipatan akhir',
  'Kemasan dan penilaian keseluruhan bentuk']
},
{
  id: 4,
  topic: 'Nilai Estetika',
  leftHeading: 'Nilai Estetika',
  leftText:
  'Nilai estetika dalam seni origami dapat dilihat melalui keupayaan pengkarya mengolah kertas menjadi bentuk tiga dimensi yang indah dan bermakna melalui lipatan yang tepat dan terancang. Keindahan origami terletak pada kesederhanaan bahan yang digunakan — hanya sehelai kertas — namun mampu menghasilkan bentuk yang kompleks, ekspresif dan memukau.',
  rightText1:
  'Simetri dan ketepatan geometri dalam setiap lipatan origami menyumbang kepada keindahan visual yang tersendiri. Pemilihan warna kertas yang tepat pula dapat meningkatkan daya tarikan estetika karya, sama ada melalui warna tunggal yang elegan atau gabungan warna yang harmoni dan kontras.',
  rightText2:
  'Selain itu, nilai estetika origami turut berkait dengan makna simbolik dan naratif yang terkandung dalam setiap bentuk. Burung jenjang yang dilipat dengan teliti bukan sahaja indah secara visual, tetapi turut membawa mesej keamanan dan harapan yang mendalam dalam tradisi budaya Jepun.',
  rightText3:
  'Dengan demikian, origami bukan sekadar aktiviti melipat kertas, tetapi merupakan satu bentuk seni yang menggabungkan aspek keindahan geometri, kreativiti, ketepatan teknikal dan nilai budaya yang tinggi.',
  imageUrl: "https://images.unsplash.com/photo-1576447049652-caf697a7cf57",
  imageAlt: 'Beautiful origami creations displayed showing aesthetic geometric forms and colour combinations'
}];


const BAHAN_DATA = [
{
  category: 'Bahan Asas',
  items: [
  { name: 'Kertas origami (washi)', imageUrl: "https://images.unsplash.com/photo-1632047094596-851f985c6c85", imageAlt: 'Colourful origami paper sheets in various sizes and patterns' },
  { name: 'Kertas A4 / kertas warna', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1ab65acc5-1772085902033.png", imageAlt: 'Coloured A4 paper sheets used for origami folding' },
  { name: 'Kertas majalah / kertas koran', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_476b4dde3-1789581757701.png", imageAlt: 'Magazine and newspaper pages used for origami practice' },
  { name: 'Kertas foil / kertas metalik', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_10aefd5be-1772085911237.png", imageAlt: 'Metallic foil paper for decorative origami creations' }]
},
{
  category: 'Bahan Pelekat (Origami Modular)',
  items: [
  { name: 'Gam PVA (untuk origami modular)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_40625b5b8-1789581759982.png", imageAlt: 'PVA glue for assembling modular origami units' },
  { name: 'Pita pelekat dua muka', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4c20cf0be-1789581758875.png", imageAlt: 'Double-sided tape for joining origami modules' }]
},
{
  category: 'Bahan Hiasan',
  items: [
  { name: 'Cat akrilik / penanda warna', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_16346260c-1784125766783.png", imageAlt: 'Tubes of acrylic paint in various colours for decorating origami' },
  { name: 'Stiker & cap cop', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4bcf1635c-1789737132023.png", imageAlt: 'Decorative stickers and rubber stamps for embellishing origami paper' },
  { name: 'Benang & tali', imageUrl: "https://images.unsplash.com/photo-1581872553286-2746c6a8b295", imageAlt: 'Thread and string for hanging origami decorations' },
  { name: 'Manik-manik kecil', imageUrl: "https://images.unsplash.com/photo-1708689464273-0cc9ce273dd3", imageAlt: 'Small beads for adding decorative details to origami' }]
},
{
  category: 'Alatan',
  items: [
  { name: 'Pembaris & pensel', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_16548a25f-1771885567922.png", imageAlt: 'Ruler and pencil for measuring and marking origami folds' },
  { name: 'Tulang lipatan (bone folder)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_14886d34a-1772216188957.png", imageAlt: 'Bone folder tool for making crisp and precise origami folds' },
  { name: 'Gunting (untuk origami kirigami)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1ed41c2b2-1772216188208.png", imageAlt: 'Sharp craft scissors for kirigami cutting combined with origami folding' },
  { name: 'Papan alas', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_175e44b14-1772216192025.png", imageAlt: 'Green self-healing cutting mat board for working on origami projects' }]
}];


const KARYA_DATA = [
{ title: 'Burung Jenjang (Crane)', desc: 'Origami burung jenjang adalah simbol keamanan dan keberuntungan dalam budaya Jepun. Seribu burung jenjang dipercayai membawa keberuntungan.', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1773fc3d9-1772085719606.png", imageAlt: 'Traditional origami crane folded from white paper symbolising peace and good fortune' },
{ title: 'Bunga Lotus Origami', desc: 'Origami bunga lotus yang dilipat dengan teliti menggunakan kertas warna-warni, menggambarkan keindahan dan kesucian dalam budaya Asia.', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1e25811f0-1772085717814.png", imageAlt: 'Real origami lotus flower folded from pink and white paper with layered petals' },
{ title: 'Origami Modular (Kusudama)', desc: 'Bola kusudama yang dihasilkan daripada gabungan puluhan unit origami yang disusun secara simetri membentuk struktur sfera yang indah.', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff00d303-1772086094432.png", imageAlt: 'Modular origami kusudama ball made from multiple folded paper units' },
{ title: 'Haiwan Origami', desc: 'Koleksi figura haiwan origami termasuk katak, arnab, ikan dan rama-rama yang dihasilkan dengan pelbagai teknik lipatan yang kreatif.', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1e425171f-1772085986606.png", imageAlt: 'Collection of origami animals including frogs, rabbits and butterflies' }];


const C = {
  bg: '#4a3200',
  outline: '#2d1e00',
  fill: '#fff9e6',
  fillLight: 'rgba(240,210,100,0.18)',
  accent: '#d97706',
  accentDark: '#78350f',
  accentLight: '#fbbf24',
  pageLeft: 'linear-gradient(105deg, #fffbf0 0%, #fef3c7 100%)',
  pageRight: 'linear-gradient(75deg, #fef3c7 0%, #fffbf0 100%)',
  binding: 'linear-gradient(90deg, #d97706 0%, #92400e 40%, #d97706 60%, #92400e 100%)',
  cover: 'linear-gradient(145deg, #fde68a 0%, #f59e0b 30%, #d97706 60%, #92400e 100%)',
  spine: 'linear-gradient(90deg, #451a03 0%, #b45309 40%, #d97706 100%)',
  dot: 'rgba(255,230,150,0.5)',
  textPrimary: '#92400e',
  textSecondary: '#78350f',
  textMuted: 'rgba(146,64,14,0.35)',
  borderAccent: 'rgba(217,119,6,0.2)',
  borderLight: 'rgba(217,119,6,0.15)',
  indicatorActive: '#d97706',
  indicatorInactive: 'rgba(217,119,6,0.35)',
  indicatorShadow: 'rgba(217,119,6,0.4)',
  ambientGradient: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,210,80,0.2) 0%, transparent 70%)',
  flipAnim: 'pageFlipYellow'
};

export default function OrigamiPage() {
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
  const isOpen = bookState === 'open';

  return (
    <div className="relative w-full overflow-hidden select-none" style={{ backgroundColor: C.bg, height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <path d="M 60 180 C 80 140, 120 100, 160 130 C 200 160, 180 80, 240 70 C 300 60, 320 120, 380 100 C 440 80, 460 40, 520 50 C 580 60, 600 110, 660 90 C 720 70, 740 30, 800 50 C 860 70, 880 120, 940 110 C 1000 100, 1020 60, 1080 80 C 1140 100, 1160 150, 1150 200 C 1140 250, 1100 280, 1120 330 C 1140 380, 1160 420, 1140 470 C 1120 520, 1060 540, 1020 510 C 980 480, 960 530, 900 545 C 840 560, 820 510, 760 530 C 700 550, 680 590, 620 580 C 560 570, 540 520, 480 540 C 420 560, 400 600, 340 590 C 280 580, 260 530, 200 520 C 140 510, 100 550, 70 510 C 40 470, 50 420, 60 380 C 70 340, 40 300, 50 260 C 60 220, 40 220, 60 180 Z" fill={C.outline} opacity="0.9" />
        <path d="M 80 190 C 98 152, 135 115, 172 143 C 209 171, 192 95, 250 85 C 308 75, 328 132, 386 112 C 444 92, 464 54, 522 64 C 580 74, 600 122, 658 103 C 716 84, 736 46, 793 66 C 850 86, 870 133, 928 122 C 986 111, 1006 72, 1062 92 C 1118 112, 1136 160, 1126 208 C 1116 256, 1078 284, 1097 332 C 1116 380, 1134 418, 1114 464 C 1094 510, 1036 528, 998 500 C 960 472, 942 520, 884 534 C 826 548, 806 500, 748 519 C 690 538, 672 576, 614 566 C 556 556, 538 508, 478 526 C 418 544, 400 582, 342 572 C 284 562, 264 514, 206 504 C 148 494, 110 532, 82 494 C 54 456, 64 408, 74 370 C 84 332, 58 294, 68 254 C 78 214, 62 228, 80 190 Z" fill={C.fill} />
        <path d="M 80 190 C 98 152, 135 115, 172 143 C 209 171, 192 95, 250 85 C 308 75, 328 132, 386 112 C 444 92, 464 54, 522 64 C 580 74, 600 122, 658 103 C 716 84, 736 46, 793 66 C 850 86, 870 133, 928 122 C 986 111, 1006 72, 1062 92 C 1118 112, 1136 160, 1126 208 C 1116 256, 1078 284, 1097 332 C 1116 380, 1134 418, 1114 464 C 1094 510, 1036 528, 998 500 C 960 472, 942 520, 884 534 C 826 548, 806 500, 748 519 C 690 538, 672 576, 614 566 C 556 556, 538 508, 478 526 C 418 544, 400 582, 342 572 C 284 562, 264 514, 206 504 C 148 494, 110 532, 82 494 C 54 456, 64 408, 74 370 C 84 332, 58 294, 68 254 C 78 214, 62 228, 80 190 Z" fill={C.fillLight} />
      </svg>
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='none'/%3E%3Ccircle cx='1' cy='1' r='0.5' fill='rgba(0,0,0,0.04)'/%3E%3Ccircle cx='3' cy='3' r='0.5' fill='rgba(0,0,0,0.04)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: C.ambientGradient }} />

      <Link href="/projects/kraf/buku/kad" className="absolute top-3 left-3 z-50 flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.88)', boxShadow: '0 2px 12px rgba(0,0,0,0.25)', color: C.accentDark, fontWeight: 700, fontSize: '0.75rem', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke={C.accentDark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Back
      </Link>

      <div className="absolute z-30 w-full flex justify-center" style={{ top: '2%' }}>
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 900, letterSpacing: '0.18em', color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.5)', lineHeight: 1 }}>ORIGAMI</h1>
      </div>

      {/* Book container fills screen */}
      <div style={{ position: 'absolute', top: '10%', left: 0, right: 0, bottom: '12%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20, gap: 8 }}>
        <div onClick={handleBookClick} style={{ cursor: isFlipping ? 'default' : 'pointer', perspective: '1400px', perspectiveOrigin: '50% 50%', width: '100%', display: 'flex', justifyContent: 'center' }}>
          {(isClosed || isOpening || bookState === 'closing') && <ClosedBook isOpening={isOpening} isClosing={bookState === 'closing'} />}
          {isOpen && <OpenBook currentSpread={currentSpread} isFlipping={isFlipping} flipDirection={flipDirection} />}
        </div>
        {isOpen &&
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {[1, 2, 3, 4].map((n) =>
          <div key={n} style={{ width: n === currentSpread ? 20 : 8, height: 8, borderRadius: 4, background: n === currentSpread ? C.indicatorActive : C.indicatorInactive, transition: 'all 0.3s ease', boxShadow: n === currentSpread ? `0 2px 6px ${C.indicatorShadow}` : 'none' }} />
          )}
          </div>
        }
      </div>

      <button onClick={() => setShowBahan(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '2%', left: '2%', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2657-1789578278816.jpeg" alt="Box of craft materials for origami making" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.75rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>Bahan</span>
      </button>

      <button onClick={() => setShowKarya(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '2%', right: '2%', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2656-1789578278955.jpeg" alt="Camera for capturing origami artwork examples" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.75rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>Karya</span>
      </button>

      {showBahan &&
      <Modal title="Bahan & Alatan" onClose={() => setShowBahan(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {BAHAN_DATA.map((section) =>
          <div key={section.category}>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', fontWeight: 700, color: C.accent, letterSpacing: '0.06em', marginBottom: 12, borderBottom: `1px solid ${C.borderAccent}`, paddingBottom: 4 }}>{section.category}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
                  {section.items.map((item) =>
              <div key={item.name} style={{ borderRadius: 8, overflow: 'hidden', background: '#fff', border: `1px solid ${C.borderLight}`, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt={item.imageAlt} style={{ width: '100%', height: 70, objectFit: 'cover', display: 'block' }} />
                      <div style={{ padding: '6px 8px' }}><span style={{ fontFamily: 'Georgia, serif', fontSize: '0.72rem', color: C.accentDark, fontWeight: 600, lineHeight: 1.3, display: 'block' }}>{item.name}</span></div>
                    </div>
              )}
                </div>
              </div>
          )}
          </div>
        </Modal>
      }

      {showKarya &&
      <Modal title="Contoh Karya Origami" onClose={() => setShowKarya(false)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {KARYA_DATA.map((karya) =>
          <div key={karya.title} style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', background: '#fff', border: `1px solid ${C.borderLight}` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={karya.imageUrl} alt={karya.imageAlt} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '10px 12px' }}>
                  <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 700, color: C.accent, margin: '0 0 4px' }}>{karya.title}</h4>
                  <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.75rem', color: C.accentDark, lineHeight: 1.5, margin: 0 }}>{karya.desc}</p>
                </div>
              </div>
          )}
          </div>
        </Modal>
      }
    </div>);
}

function ClosedBook({ isOpening, isClosing }: {isOpening: boolean;isClosing: boolean;}) {
  return (
    <div style={{ width: 'clamp(180px, 28vw, 320px)', height: 'clamp(260px, 48vh, 480px)', position: 'relative', transformStyle: 'preserve-3d', transform: isOpening || isClosing ? 'rotateY(-25deg) scale(0.95)' : 'rotateY(-8deg)', transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.45)) drop-shadow(0 8px 20px rgba(0,0,0,0.3))' }}>
      <div style={{ position: 'absolute', left: -24, top: 0, width: 24, height: '100%', background: C.spine, transformOrigin: 'right center', transform: 'rotateY(-90deg)', borderRadius: '4px 0 0 4px', boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.5rem, 0.9vw, 0.7rem)', fontWeight: 700, color: 'rgba(255,240,180,0.9)', letterSpacing: '0.12em', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>ORIGAMI</span>
      </div>
      <div style={{ width: '100%', height: '100%', background: C.cover, borderRadius: '2px 8px 8px 2px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 10, border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: '72%', height: '48%', borderRadius: 6, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.25)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1565845016594-05d199a987ea" alt="Origami craft book cover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '12%', left: 0, right: 0, textAlign: 'center', padding: '0 16px' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.85rem, 2vw, 1.3rem)', fontWeight: 900, color: 'rgba(255,250,220,0.97)', letterSpacing: '0.2em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>ORIGAMI</div>
        </div>
        <div style={{ position: 'absolute', right: -6, top: 4, bottom: 4, width: 6, background: 'linear-gradient(90deg, #fffbf0 0%, #fef3c7 50%, #fde68a 100%)', borderRadius: '0 2px 2px 0', boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.15)' }}>
          {Array.from({ length: 20 }).map((_, i) => <div key={i} style={{ height: '5%', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }} />)}
        </div>
      </div>
    </div>);
}

function OpenBook({ currentSpread, isFlipping, flipDirection }: {currentSpread: number;isFlipping: boolean;flipDirection: 'forward' | 'backward';}) {
  const spread = SPREADS_DATA[currentSpread - 1];
  return (
    <div style={{ width: 'clamp(320px, 90vw, 1100px)', height: 'clamp(220px, 62vh, 560px)', position: 'relative', display: 'flex', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 12px 30px rgba(0,0,0,0.35))' }}>
      <div style={{ flex: 1, background: C.pageLeft, borderRadius: '8px 0 0 8px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.08)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-5deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'right center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(10px, 1.8vw, 20px)', height: '100%', overflowY: 'auto' }}>{spread && <LeftPageContent spread={spread} />}</div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06))', pointerEvents: 'none', zIndex: 3 }} />
      </div>
      <div style={{ width: 'clamp(10px, 1.2vw, 16px)', background: C.binding, position: 'relative', boxShadow: '0 0 12px rgba(0,0,0,0.3)', zIndex: 10, flexShrink: 0 }}>
        {Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: '50%', top: `${10 + i * 11}%`, transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: C.dot }} />)}
      </div>
      <div style={{ flex: 1, background: C.pageRight, borderRadius: '0 8px 8px 0', position: 'relative', overflow: 'hidden', boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.06)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-180deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'left center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(10px, 1.8vw, 20px)', height: '100%', overflowY: 'auto' }}>{spread && <RightPageContent spread={spread} />}</div>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.05))', pointerEvents: 'none', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 8, right: 12, fontFamily: 'Georgia, serif', fontSize: '0.6rem', color: C.textMuted, letterSpacing: '0.1em', zIndex: 4 }}>{currentSpread * 2}</div>
      </div>
      {isFlipping && <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: C.pageLeft, transformOrigin: 'left center', animation: `${C.flipAnim} 0.7s cubic-bezier(0.4,0,0.2,1) forwards`, zIndex: 20, borderRadius: '0 8px 8px 0', boxShadow: '-8px 0 24px rgba(0,0,0,0.2)' }} />}
      <style>{`@keyframes ${C.flipAnim} { 0% { transform: rotateY(0deg); } 50% { transform: rotateY(-90deg); } 100% { transform: rotateY(-180deg); } }`}</style>
    </div>);
}

function PageTexture() {
  return <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', opacity: 0.6 }} />;
}

function LeftPageContent({ spread }: {spread: (typeof SPREADS_DATA)[0];}) {
  const s = spread as any;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.2vh, 12px)' }}>
      <div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.8rem, 1.8vw, 1.2rem)', fontWeight: 900, color: C.accent, letterSpacing: '0.06em', margin: 0, lineHeight: 1.2 }}>{s.leftHeading}</h2>
        <div style={{ width: 'clamp(24px, 4vw, 40px)', height: 2, background: `linear-gradient(90deg, ${C.accent}, transparent)`, marginTop: 4, borderRadius: 1 }} />
      </div>
      {s.leftText && s.id !== 4 && <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: C.textSecondary, lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{s.leftText}</p>}
      {s.imageUrl && s.id === 1 && <div style={{ flex: 1, borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${C.borderLight}`, minHeight: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}
      {s.leftItems && <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 9px)', flex: 1 }}>{s.leftItems.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 7 }}><div style={{ width: 'clamp(14px, 1.8vw, 20px)', height: 'clamp(14px, 1.8vw, 20px)', borderRadius: '50%', background: C.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', fontWeight: 700, color: C.accentDark, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)', color: C.textSecondary, lineHeight: 1.45, marginTop: 1 }}>{item.desc}</div></div></div>)}</div>}
      {s.leftSubheading && <><h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1.1vw, 0.8rem)', fontWeight: 700, color: C.accent, margin: 0, letterSpacing: '0.04em' }}>{s.leftSubheading}</h3><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.7vh, 7px)', flex: 1 }}>{s.leftTechniques?.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid ${C.borderAccent}`, paddingLeft: 7 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.88vw, 0.68rem)', fontWeight: 700, color: C.accentDark }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.48rem, 0.78vw, 0.62rem)', color: C.textSecondary, lineHeight: 1.45, marginTop: 1 }}>{t.desc}</div></div>)}</div></>}
      {s.id === 4 && s.leftText && <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: C.textSecondary, lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{s.leftText}</p>}
      <div style={{ marginTop: 'auto', fontFamily: 'Georgia, serif', fontSize: '0.55rem', color: C.textMuted, letterSpacing: '0.1em' }}>{spread.id * 2 - 1}</div>
    </div>);
}

function RightPageContent({ spread }: {spread: (typeof SPREADS_DATA)[0];}) {
  const s = spread as any;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.2vh, 12px)' }}>
      {s.id === 1 && <><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: C.textSecondary, lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{s.rightText1}</p><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: C.textSecondary, lineHeight: 1.65, margin: 0, textAlign: 'justify', fontStyle: 'italic', borderLeft: `2px solid ${C.borderAccent}`, paddingLeft: 10 }}>{s.rightText2}</p></>}
      {s.rightItems && <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 9px)', flex: 1 }}>{s.rightItems.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 7 }}><div style={{ width: 'clamp(14px, 1.8vw, 20px)', height: 'clamp(14px, 1.8vw, 20px)', borderRadius: '50%', background: C.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', fontWeight: 700, color: C.accentDark, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)', color: C.textSecondary, lineHeight: 1.45, marginTop: 1 }}>{item.desc}</div></div></div>)}</div>}
      {s.rightTechniques &&
      <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.7vh, 7px)' }}>{s.rightTechniques.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid ${C.borderAccent}`, paddingLeft: 7 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.88vw, 0.68rem)', fontWeight: 700, color: C.accentDark }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.48rem, 0.78vw, 0.62rem)', color: C.textSecondary, lineHeight: 1.45, marginTop: 1 }}>{t.desc}</div></div>)}</div>
          {s.rightSubheading && <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1.1vw, 0.8rem)', fontWeight: 700, color: C.accent, margin: '2px 0 0', letterSpacing: '0.04em' }}>{s.rightSubheading}</h3>}
          {s.rightProcess && <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>{s.rightProcess.map((step: string, i: number) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}><div style={{ width: 'clamp(12px, 1.6vw, 18px)', height: 'clamp(12px, 1.6vw, 18px)', borderRadius: '50%', border: `1.5px solid ${C.borderAccent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)', fontWeight: 700, color: C.accent, fontFamily: 'Georgia, serif', flexShrink: 0 }}>{i + 1}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.5rem, 0.85vw, 0.65rem)', color: C.textSecondary, lineHeight: 1.35 }}>{step}</div></div>)}</div>}
        </>
      }
      {s.id === 4 && <>{s.imageUrl && <div style={{ height: 'clamp(60px, 16vh, 130px)', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${C.borderLight}`, flexShrink: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}{[s.rightText1, s.rightText2, s.rightText3].filter(Boolean).map((text: string, i: number) => <p key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.95vw, 0.75rem)', color: C.textSecondary, lineHeight: 1.6, margin: 0, textAlign: 'justify' }}>{text}</p>)}</>}
    </div>);
}

function Modal({ title, children, onClose }: {title: string;children: React.ReactNode;onClose: () => void;}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #fffbf0 0%, #fef3c7 100%)', borderRadius: 16, padding: 'clamp(16px, 2.5vw, 28px)', maxWidth: 680, width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.4)', border: `1px solid ${C.borderLight}`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 10, borderBottom: `1.5px solid ${C.borderAccent}` }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)', fontWeight: 900, color: C.accent, margin: 0, letterSpacing: '0.06em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: `rgba(217,119,6,0.1)`, border: `1px solid rgba(217,119,6,0.2)`, borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: C.accent, fontSize: '1rem', fontWeight: 700 }}>×</button>
        </div>
        {children}
      </div>
    </div>);
}