'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// ─── Types ───────────────────────────────────────────────────────────────────
type BookState = 'closed' | 'opening' | 'open' | 'closing';

interface Spread {
  id: number;
  leftHeading: string;
  leftSubheading?: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

// ─── Spread Data ─────────────────────────────────────────────────────────────
const SPREADS_DATA = [
{
  id: 1,
  topic: 'Definisi',
  leftHeading: 'Definisi',
  leftText: 'Arca timbulan (relief sculpture) merupakan sejenis karya seni tiga dimensi yang dihasilkan pada permukaan rata atau datar, di mana imej atau figura ditonjolkan keluar daripada latar belakang asalnya. Berbeza dengan arca bebas yang boleh dilihat dari semua sudut, arca timbulan hanya menonjol dari satu permukaan dan lazimnya dipasang pada dinding, panel atau permukaan bangunan.',
  rightText1: 'Dari sudut sejarah seni, arca timbulan telah dihasilkan sejak zaman purba, termasuklah pada tamadun Mesopotamia, Mesir Purba, Greek, Rom dan Asia Tenggara. Ia digunakan secara meluas dalam konteks seni bina, ritual keagamaan, peringatan sejarah dan ekspresi budaya. Di Alam Melayu, arca timbulan dapat dilihat pada ukiran kayu, batu nisan, dan hiasan dinding masjid serta istana.',
  rightText2: 'Dalam konteks pendidikan seni visual, arca timbulan dikategorikan sebagai salah satu bentuk seni arca yang menggabungkan unsur dua dimensi dan tiga dimensi secara harmonis, menjadikannya medium yang unik dalam penghasilan karya seni.',
  imageUrl: "https://images.unsplash.com/photo-1590637951232-fecd0ab37392",
  imageAlt: 'Parthenon frieze showing classical bas-relief sculpture with figures in procession'
},
{
  id: 2,
  topic: 'Ciri-ciri & Jenis',
  leftHeading: 'Ciri-ciri',
  leftItems: [
  { num: '1', title: 'Menonjol dari permukaan latar', desc: 'Imej atau figura diukir atau dibentuk supaya menonjol keluar dari permukaan asas, memberikan ilusi kedalaman dan dimensi.' },
  { num: '2', title: 'Terikat pada permukaan asas', desc: 'Tidak seperti arca bebas, arca timbulan kekal bersambung dengan latar belakangnya dan tidak boleh dilihat dari semua sudut.' },
  { num: '3', title: 'Menggunakan prinsip perspektif visual', desc: 'Pengkarya menggunakan teknik perspektif, saiz relatif dan pertindihan untuk mewujudkan ilusi kedalaman pada permukaan yang terhad.' },
  { num: '4', title: 'Mempunyai nilai naratif dan simbolik', desc: 'Arca timbulan sering digunakan untuk menceritakan kisah, peristiwa sejarah atau menyampaikan mesej keagamaan dan budaya.' }],
  rightHeading: 'Jenis Arca Timbulan',
  rightItems: [
  { num: 'A', title: 'Bas-relief (Timbulan Rendah)', desc: 'Figura menonjol kurang daripada separuh daripada ketebalan sebenarnya. Contoh: ukiran pada syiling, plak dan hiasan dinding.' },
  { num: 'B', title: 'Alto-relief (Timbulan Tinggi)', desc: 'Figura menonjol lebih daripada separuh daripada ketebalan sebenarnya, hampir menyerupai arca bebas. Contoh: ukiran pada fasad bangunan.' },
  { num: 'C', title: 'Mezzo-relief (Timbulan Sederhana)', desc: 'Figura menonjol tepat separuh daripada ketebalan sebenarnya, berada di antara bas-relief dan alto-relief.' },
  { num: 'D', title: 'Sunken Relief (Timbulan Tenggelam)', desc: 'Imej diukir ke dalam permukaan, bukan menonjol keluar. Lazim dalam seni Mesir Purba (intaglio).' }],
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4d5961cb9-1789601290277.png",
  imageAlt: 'Parthenon frieze showing classical bas-relief sculpture'
},
{
  id: 3,
  topic: 'Teknik Penghasilan',
  leftHeading: 'Teknik Penghasilan',
  leftSubheading: 'Teknik Utama',
  leftTechniques: [
  { name: 'Teknik Ukiran (Carving)', desc: 'Bahan keras seperti batu, kayu atau gipsum diukir menggunakan pahat dan tukul untuk mendedahkan bentuk yang dikehendaki dari dalam bahan asas.' },
  { name: 'Teknik Pemodelan (Modelling)', desc: 'Bahan lembut seperti tanah liat atau lilin dibentuk dengan tangan atau alatan untuk membina figura yang menonjol dari permukaan asas.' },
  { name: 'Teknik Tuangan (Casting)', desc: 'Acuan dibuat dari model asal, kemudian bahan seperti gangsa, plaster atau resin dituang ke dalam acuan untuk menghasilkan salinan arca timbulan.' }],
  rightTechniques: [
  { name: 'Teknik Tampalan (Additive)', desc: 'Bahan ditambah secara berperingkat pada permukaan asas untuk membina bentuk yang menonjol, seperti penggunaan tanah liat atau paper mâché.' },
  { name: 'Teknik Pengukiran Terbalik (Intaglio)', desc: 'Imej diukir ke dalam permukaan bahan, menghasilkan kesan timbulan tenggelam yang kelihatan menonjol apabila dicetak.' }],
  rightSubheading: 'Proses Penghasilan',
  rightProcess: [
  'Menentukan tema, konsep dan komposisi',
  'Menghasilkan lakaran dan pelan kerja',
  'Menyediakan permukaan asas (batu, kayu, tanah liat)',
  'Memindahkan lakaran ke permukaan asas',
  'Mengukir atau membentuk figura secara berperingkat',
  'Menghaluskan permukaan dan perincian',
  'Kemasan akhir (cat, patina, atau vernish)']
},
{
  id: 4,
  topic: 'Nilai Estetika',
  leftHeading: 'Nilai Estetika',
  leftText: 'Nilai estetika arca timbulan terletak pada keupayaan pengkarya mengolah kedalaman, cahaya dan bayang-bayang pada permukaan yang terhad. Permainan cahaya pada permukaan arca timbulan menghasilkan kontras visual yang dramatik, menonjolkan bentuk dan perincian figura dengan lebih jelas. Semakin tinggi tonjolan arca, semakin kuat kesan cahaya dan bayang yang terhasil.',
  rightText1: 'Komposisi dalam arca timbulan memerlukan perancangan yang teliti kerana pengkarya perlu mengurus ruang, saiz dan pertindihan figura dalam kawasan yang terhad. Penggunaan prinsip perspektif, irama, imbangan dan penegasan memainkan peranan penting dalam menghasilkan karya yang harmonis dan berkesan secara visual.',
  rightText2: 'Dari segi nilai budaya, arca timbulan sering menjadi dokumen visual sejarah dan kepercayaan sesebuah tamadun. Motif, simbol dan naratif yang dipaparkan mencerminkan nilai, kepercayaan dan identiti masyarakat penghasilnya, menjadikan arca timbulan bukan sahaja karya seni tetapi juga artifak budaya yang bernilai tinggi.',
  rightText3: 'Dalam konteks seni kontemporari, arca timbulan terus berkembang dengan penggunaan bahan baharu dan pendekatan konseptual yang pelbagai, membuktikan relevansi dan fleksibiliti medium ini merentasi zaman.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4e3f26725-1789601291958.png",
  imageAlt: 'Borobudur bas-relief panel showing detailed carved narrative scenes in stone'
}];

// ─── Bahan Modal Data ─────────────────────────────────────────────────────────
const BAHAN_DATA = [
{ category: 'Bahan Asas', items: [
  { name: 'Batu (Granit / Marmar)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_48787c961-1789601289010.png", imageAlt: 'Granite stone block used as base material for relief sculpture carving', realUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_48787c961-1789601289010.png" },
  { name: 'Kayu Keras (Jati / Cengal)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4fbbdcc5e-1789601291102.png", imageAlt: 'Hardwood timber blocks used for carving relief sculptures' },
  { name: 'Tanah Liat', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1a34decc4-1772073952156.png", imageAlt: 'Brown clay material used for modelling relief sculpture forms' },
  { name: 'Gipsum / Plaster of Paris', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_46eaacf65-1789601289006.png", imageAlt: 'White plaster of Paris used for casting and modelling relief sculptures' },
  { name: 'Gangsa / Logam', imageUrl: "https://images.unsplash.com/photo-1700250794438-874a49a37b39", imageAlt: 'Bronze metal material used for casting relief sculpture panels' }]
},
{ category: 'Bahan Tambahan', items: [
  { name: 'Simen / Konkrit', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4eb158d4b-1789601289032.png", imageAlt: 'Cement and concrete mixture used as base for architectural relief sculptures' },
  { name: 'Resin Epoksi', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_49fca173b-1789601289586.png", imageAlt: 'Epoxy resin material used for modern relief sculpture casting' },
  { name: 'Papan Lapis (MDF)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4135e3e7e-1789601290285.png", imageAlt: 'MDF board used as base panel for relief sculpture work' },
  { name: 'Lilin Pengukiran', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_15e463dc0-1772141693754.png", imageAlt: 'Sculpting wax used for detailed modelling of relief sculpture' }]
},
{ category: 'Alatan Pengukiran', items: [
  { name: 'Pahat Batu', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1647fd4da-1767962312718.png", imageAlt: 'Stone chisels of various sizes used for carving relief sculptures' },
  { name: 'Tukul Pengukir', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1e70283f9-1772157429697.png", imageAlt: 'Sculptor mallet used with chisels for stone and wood carving' },
  { name: 'Pisau Pengukir Kayu', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1b6930ec9-1771899981301.png", imageAlt: 'Wood carving knives and gouges for detailed relief work' },
  { name: 'Alat Pemodelan Tanah Liat', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_408f6c8b7-1789601289011.png", imageAlt: 'Clay modelling tools including wire loops and wooden shapers' },
  { name: 'Kertas Pasir', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1d4454b70-1772085782253.png", imageAlt: 'Sandpaper of various grits for smoothing relief sculpture surfaces' }]
},
{ category: 'Bahan Kemasan', items: [
  { name: 'Cat Akrilik', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_16346260c-1784125766783.png", imageAlt: 'Acrylic paint tubes for colouring and finishing relief sculptures' },
  { name: 'Patina (Larutan Kimia)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1c058cfbd-1764746855600.png", imageAlt: 'Chemical patina solution applied to bronze relief sculptures for aged finish' },
  { name: 'Vernish / Lacquer', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3b59f20-1767597486922.png", imageAlt: 'Varnish and lacquer for protecting and finishing relief sculpture surfaces' },
  { name: 'Berus Cat', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1dfcfec18-1771885571167.png", imageAlt: 'Paint brushes of various sizes for applying finish to relief sculptures' }]
}];

// ─── Contoh Karya Data ────────────────────────────────────────────────────────
const KARYA_DATA = [
{
  title: 'Frieze Parthenon',
  artist: 'Pheidias (diketuai)',
  year: '447–432 SM',
  desc: 'Arca timbulan marmar yang menghiasi bahagian atas Parthenon di Athens, menggambarkan perarakan Panathenaic dengan teknik bas-relief yang halus dan ekspresif.',
  imageUrl: "https://images.unsplash.com/photo-1718140245429-fd5265b437f3",
  imageAlt: 'Parthenon frieze marble bas-relief showing procession of figures in classical Greek style'
},
{
  title: 'Panel Borobudur',
  artist: 'Pengukir Dinasti Sailendra',
  year: '778–850 M',
  desc: 'Lebih 2,600 panel arca timbulan batu andesit yang menghiasi dinding Candi Borobudur di Jawa, menceritakan kisah Buddha dan ajaran Dharma secara naratif visual.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_181a5c6a7-1780790409697.png",
  imageAlt: 'Borobudur temple bas-relief panel carved in andesite stone showing Buddhist narrative scenes'
},
{
  title: 'Ukiran Angkor Wat',
  artist: 'Pengukir Empayar Khmer',
  year: '1113–1150 M',
  desc: 'Arca timbulan batu pasir sepanjang lebih 800 meter yang menghiasi galeri Angkor Wat, menggambarkan epik Hindu Mahabharata dan Ramayana dengan perincian yang luar biasa.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4e3f26725-1789601291958.png",
  imageAlt: 'Angkor Wat sandstone bas-relief gallery showing Hindu epic narrative with detailed carved figures'
},
{
  title: 'Pintu Syurga (Gates of Paradise)',
  artist: 'Lorenzo Ghiberti',
  year: '1425–1452 M',
  desc: 'Panel gangsa alto-relief yang menghiasi pintu Baptisteri Florence, menggambarkan sepuluh kisah Perjanjian Lama dengan teknik perspektif linear yang revolusioner dalam sejarah seni Renaissance.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_401cecf29-1789743581305.png",
  imageAlt: 'Lorenzo Ghiberti Gates of Paradise bronze relief panels on Florence Baptistery doors showing Old Testament scenes'
}];

// ─── Page Component ───────────────────────────────────────────────────────────
export default function ArcaTimbulanPage() {
  const [bookState, setBookState] = useState<BookState>('closed');
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');
  const [showBahan, setShowBahan] = useState(false);
  const [showKarya, setShowKarya] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBookClick = useCallback(() => {
    if (isFlipping) return;

    if (bookState === 'closed') {
      setBookState('opening');
      setTimeout(() => {
        setBookState('open');
        setCurrentSpread(1);
      }, 800);
    } else if (bookState === 'open') {
      if (currentSpread < 4) {
        setIsFlipping(true);
        setFlipDirection('forward');
        setTimeout(() => {
          setCurrentSpread((prev) => prev + 1);
          setIsFlipping(false);
        }, 700);
      } else {
        setIsFlipping(true);
        setFlipDirection('forward');
        setTimeout(() => {
          setBookState('closing');
          setIsFlipping(false);
          setTimeout(() => {
            setBookState('closed');
            setCurrentSpread(0);
          }, 800);
        }, 700);
      }
    }
  }, [bookState, currentSpread, isFlipping]);

  if (!mounted) return null;

  const isOpen = bookState === 'open' || bookState === 'closing';
  const isOpening = bookState === 'opening';
  const isClosed = bookState === 'closed';

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden select-none"
      style={{ backgroundColor: '#C0392B' }}>

      {/* Background image with soft red tint */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/images/IMG_2664-1789601863261.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'rgba(180, 40, 40, 0.72)'
        }} />

      {/* Wavy cream center shape background */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
        viewBox="0 0 1200 675"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 60 180
             C 80 140, 120 100, 160 130
             C 200 160, 180 80, 240 70
             C 300 60, 320 120, 380 100
             C 440 80, 460 40, 520 50
             C 580 60, 600 110, 660 90
             C 720 70, 740 30, 800 50
             C 860 70, 880 120, 940 110
             C 1000 100, 1020 60, 1080 80
             C 1140 100, 1160 150, 1150 200
             C 1140 250, 1100 280, 1120 330
             C 1140 380, 1160 420, 1140 470
             C 1120 520, 1060 540, 1020 510
             C 980 480, 960 530, 900 545
             C 840 560, 820 510, 760 530
             C 700 550, 680 590, 620 580
             C 560 570, 540 520, 480 540
             C 420 560, 400 600, 340 590
             C 280 580, 260 530, 200 520
             C 140 510, 100 550, 70 510
             C 40 470, 50 420, 60 380
             C 70 340, 40 300, 50 260
             C 60 220, 40 220, 60 180 Z"
























































































          fill="#a02020"
          opacity="0.9" />
        <path
          d="M 80 190
             C 98 152, 135 115, 172 143
             C 209 171, 192 95, 250 85
             C 308 75, 328 132, 386 112
             C 444 92, 464 54, 522 64
             C 580 74, 600 122, 658 103
             C 716 84, 736 46, 793 66
             C 850 86, 870 133, 928 122
             C 986 111, 1006 72, 1062 92
             C 1118 112, 1136 160, 1126 208
             C 1116 256, 1078 284, 1097 332
             C 1116 380, 1134 418, 1114 464
             C 1094 510, 1036 528, 998 500
             C 960 472, 942 520, 884 534
             C 826 548, 806 500, 748 519
             C 690 538, 672 576, 614 566
             C 556 556, 538 508, 478 526
             C 418 544, 400 582, 342 572
             C 284 562, 264 514, 206 504
             C 148 494, 110 532, 82 494
             C 54 456, 64 408, 74 370
             C 84 332, 58 294, 68 254
             C 78 214, 62 228, 80 190 Z"
























































































          fill="#f0ece0" />
        <filter id="paper-timbulan">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
        <path
          d="M 80 190
             C 98 152, 135 115, 172 143
             C 209 171, 192 95, 250 85
             C 308 75, 328 132, 386 112
             C 444 92, 464 54, 522 64
             C 580 74, 600 122, 658 103
             C 716 84, 736 46, 793 66
             C 850 86, 870 133, 928 122
             C 986 111, 1006 72, 1062 92
             C 1118 112, 1136 160, 1126 208
             C 1116 256, 1078 284, 1097 332
             C 1116 380, 1134 418, 1114 464
             C 1094 510, 1036 528, 998 500
             C 960 472, 942 520, 884 534
             C 826 548, 806 500, 748 519
             C 690 538, 672 576, 614 566
             C 556 556, 538 508, 478 526
             C 418 544, 400 582, 342 572
             C 284 562, 264 514, 206 504
             C 148 494, 110 532, 82 494
             C 54 456, 64 408, 74 370
             C 84 332, 58 294, 68 254
             C 78 214, 62 228, 80 190 Z"
























































































          fill="rgba(200,190,170,0.18)"
          filter="url(#paper-timbulan)" />
      </svg>

      {/* Fabric texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='none'/%3E%3Ccircle cx='1' cy='1' r='0.5' fill='rgba(0,0,0,0.04)'/%3E%3Ccircle cx='3' cy='3' r='0.5' fill='rgba(0,0,0,0.04)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />

      {/* Ambient light overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,200,180,0.18) 0%, transparent 70%)'
        }} />

      {/* Back button */}
      <Link
        href="/projects/arca/buku/jenis"
        className="absolute top-5 left-5 z-50 flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105"
        style={{
          background: 'rgba(255,255,255,0.88)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
          color: '#3D2B1F',
          fontWeight: 700,
          fontSize: '0.8rem',
          textDecoration: 'none',
          backdropFilter: 'blur(4px)'
        }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="#3D2B1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </Link>

      {/* Page title */}
      <div className="absolute z-30 w-full flex justify-center" style={{ top: '3%' }}>
        <h1
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(1.6rem, 4vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '0.18em',
            color: '#ffffff',
            textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 1px 0 rgba(0,0,0,0.3)',
            lineHeight: 1
          }}>
          ARCA TIMBULAN
        </h1>
      </div>

      {/* ── BOOK CONTAINER ── */}
      <div
        className="absolute z-20"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          marginTop: '2%'
        }}>
        <div
          onClick={handleBookClick}
          style={{
            cursor: isFlipping ? 'default' : 'pointer',
            perspective: '1400px',
            perspectiveOrigin: '50% 50%'
          }}>
          {(isClosed || isOpening || bookState === 'closing') &&
          <ClosedBook isOpening={isOpening} isClosing={bookState === 'closing'} />
          }
          {(bookState === 'open' || bookState === 'closing') && bookState !== 'closing' &&
          <OpenBook currentSpread={currentSpread} isFlipping={isFlipping} flipDirection={flipDirection} />
          }
        </div>

        {bookState === 'open' &&
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
            {[1, 2, 3, 4].map((n) =>
          <div
            key={n}
            style={{
              width: n === currentSpread ? 20 : 8,
              height: 8,
              borderRadius: 4,
              background: n === currentSpread ? '#E74C3C' : 'rgba(192,57,43,0.35)',
              transition: 'all 0.3s ease',
              boxShadow: n === currentSpread ? '0 2px 6px rgba(231,76,60,0.4)' : 'none'
            }} />
          )}
          </div>
        }
      </div>

      {/* ── BOTTOM CORNER ICONS ── */}
      <button
        onClick={() => setShowBahan(true)}
        className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95"
        style={{ bottom: '3%', left: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/IMG_2657-1789578278816.jpeg"
          alt="Box of craft materials for arca timbulan making"
          style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(255,255,255,0.7)' }}>
          Bahan
        </span>
      </button>

      <button
        onClick={() => setShowKarya(true)}
        className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95"
        style={{ bottom: '3%', right: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/IMG_2656-1789578278955.jpeg"
          alt="Camera for capturing arca timbulan artwork examples"
          style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(255,255,255,0.7)' }}>
          Karya
        </span>
      </button>

      {/* ── BAHAN MODAL ── */}
      {showBahan &&
      <Modal title="Bahan & Alatan Arca Timbulan" onClose={() => setShowBahan(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {BAHAN_DATA.map((section) =>
          <div key={section.category}>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', fontWeight: 700, color: '#C0392B', letterSpacing: '0.06em', marginBottom: 12, borderBottom: '1px solid rgba(192,57,43,0.2)', paddingBottom: 4 }}>
                  {section.category}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
                  {section.items.map((item) =>
              <div key={item.name} style={{ borderRadius: 8, overflow: 'hidden', background: '#fff', border: '1px solid rgba(192,57,43,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt={item.imageAlt} style={{ width: '100%', height: 70, objectFit: 'cover', display: 'block' }} />
                      <div style={{ padding: '6px 8px' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.72rem', color: '#3D2B1F', fontWeight: 600, lineHeight: 1.3, display: 'block' }}>
                          {item.name}
                        </span>
                      </div>
                    </div>
              )}
                </div>
              </div>
          )}
          </div>
        </Modal>
      }

      {/* ── CONTOH KARYA MODAL ── */}
      {showKarya &&
      <Modal title="Contoh Karya Arca Timbulan" onClose={() => setShowKarya(false)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {KARYA_DATA.map((karya) =>
          <div key={karya.title} style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', background: '#fff', border: '1px solid rgba(192,57,43,0.12)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={karya.imageUrl} alt={karya.imageAlt} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '10px 12px' }}>
                  <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 700, color: '#C0392B', margin: '0 0 2px' }}>
                    {karya.title}
                  </h4>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.7rem', color: '#8B4513', fontWeight: 600, marginBottom: 2 }}>
                    {karya.artist} · {karya.year}
                  </div>
                  <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.72rem', color: '#5a3a2a', lineHeight: 1.5, margin: 0 }}>
                    {karya.desc}
                  </p>
                </div>
              </div>
          )}
          </div>
        </Modal>
      }
    </div>);

}

// ─── Closed Book Component ────────────────────────────────────────────────────
function ClosedBook({ isOpening, isClosing }: {isOpening: boolean;isClosing: boolean;}) {
  return (
    <div
      style={{
        width: 'clamp(240px, 36vw, 420px)',
        height: 'clamp(340px, 54vh, 600px)',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: isOpening ? 'rotateY(-25deg) scale(0.95)' : isClosing ? 'rotateY(-25deg) scale(0.95)' : 'rotateY(-8deg)',
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.45)) drop-shadow(0 8px 20px rgba(0,0,0,0.3))'
      }}>
      {/* Book spine */}
      <div
        style={{
          position: 'absolute',
          left: -28,
          top: 0,
          width: 28,
          height: '100%',
          background: 'linear-gradient(90deg, #922b21 0%, #c0392b 40%, #d44333 100%)',
          transformOrigin: 'right center',
          transform: 'rotateY(-90deg)',
          borderRadius: '4px 0 0 4px',
          boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <span
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(0.55rem, 1vw, 0.75rem)',
            fontWeight: 700,
            color: 'rgba(255,220,200,0.9)',
            letterSpacing: '0.12em',
            textShadow: '0 1px 4px rgba(0,0,0,0.4)'
          }}>
          ARCA TIMBULAN
        </span>
      </div>

      {/* Book cover — front */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(145deg, #e74c3c 0%, #c0392b 30%, #a93226 60%, #922b21 100%)',
          borderRadius: '2px 8px 8px 2px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
        }}>
        {/* Cloth texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px),
              repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)
            `,
            pointerEvents: 'none'
          }} />
        {/* Cover shine */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: '60%',
            height: '45%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 100%)',
            pointerEvents: 'none'
          }} />
        {/* Decorative border */}
        <div style={{ position: 'absolute', inset: 12, border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 16, border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: 2, pointerEvents: 'none' }} />

        {/* Cover image — real arca timbulan (Borobudur relief) */}
        <div
          style={{
            position: 'absolute',
            top: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '72%',
            height: '48%',
            borderRadius: 6,
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            border: '2px solid rgba(255,255,255,0.25)'
          }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/arca_timbulan_cover.png"
            alt="Arca timbulan ukiran kayu tradisional Melayu pada kulit buku"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>

        {/* Title on cover */}
        <div style={{ position: 'absolute', bottom: '14%', left: 0, right: 0, textAlign: 'center', padding: '0 16px' }}>
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(0.85rem, 2vw, 1.2rem)',
              fontWeight: 900,
              color: 'rgba(255,240,230,0.97)',
              letterSpacing: '0.15em',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)'
            }}>
            ARCA TIMBULAN
          </div>
          <div style={{ width: 40, height: 1.5, background: 'rgba(255,220,200,0.6)', margin: '6px auto 0', borderRadius: 1 }} />
        </div>

        {/* Page edges */}
        <div
          style={{
            position: 'absolute',
            right: -6,
            top: 4,
            bottom: 4,
            width: 6,
            background: 'linear-gradient(90deg, #f0e8e0 0%, #e8ddd5 50%, #ddd0c8 100%)',
            borderRadius: '0 2px 2px 0',
            boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.15)'
          }}>
          {Array.from({ length: 20 }).map((_, i) =>
          <div key={i} style={{ height: '5%', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }} />
          )}
        </div>
      </div>
    </div>);

}

// ─── Open Book Component ──────────────────────────────────────────────────────
function OpenBook({ currentSpread, isFlipping, flipDirection }: {currentSpread: number;isFlipping: boolean;flipDirection: 'forward' | 'backward';}) {
  const spread = SPREADS_DATA[currentSpread - 1];

  return (
    <div
      style={{
        width: 'clamp(320px, 80vw, 900px)',
        height: 'clamp(240px, 55vh, 580px)',
        position: 'relative',
        display: 'flex',
        filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 12px 30px rgba(0,0,0,0.35))'
      }}>
      {/* Left page */}
      <div
        style={{
          flex: 1,
          background: 'linear-gradient(105deg, #fdf6ee 0%, #f8efe3 100%)',
          borderRadius: '8px 0 0 8px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.08)',
          transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-5deg)' : 'rotateY(0deg)',
          transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
          transformOrigin: 'right center',
          transformStyle: 'preserve-3d'
        }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>
          {spread && <LeftPageContent spread={spread} />}
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06))', pointerEvents: 'none', zIndex: 3 }} />
      </div>

      {/* Binding */}
      <div
        style={{
          width: 'clamp(12px, 1.5vw, 20px)',
          background: 'linear-gradient(90deg, #c0392b 0%, #a93226 40%, #c0392b 60%, #b03020 100%)',
          position: 'relative',
          boxShadow: '0 0 12px rgba(0,0,0,0.3)',
          zIndex: 10,
          flexShrink: 0
        }}>
        {Array.from({ length: 8 }).map((_, i) =>
        <div key={i} style={{ position: 'absolute', left: '50%', top: `${10 + i * 11}%`, transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,200,180,0.5)' }} />
        )}
      </div>

      {/* Right page */}
      <div
        style={{
          flex: 1,
          background: 'linear-gradient(75deg, #f8efe3 0%, #fdf6ee 100%)',
          borderRadius: '0 8px 8px 0',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.06)',
          transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
          transformOrigin: 'left center',
          transformStyle: 'preserve-3d'
        }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>
          {spread && <RightPageContent spread={spread} />}
        </div>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.05))', pointerEvents: 'none', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 10, right: 16, fontFamily: 'Georgia, serif', fontSize: '0.65rem', color: 'rgba(192,57,43,0.4)', letterSpacing: '0.1em', zIndex: 4 }}>
          {currentSpread * 2}
        </div>
      </div>

      {isFlipping &&
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(105deg, #f8efe3 0%, #fdf6ee 100%)',
          transformOrigin: 'left center',
          animation: 'pageFlipTimbulan 0.7s cubic-bezier(0.4,0,0.2,1) forwards',
          zIndex: 20,
          borderRadius: '0 8px 8px 0',
          boxShadow: '-8px 0 24px rgba(0,0,0,0.2)'
        }} />
      }

      <style>{`
        @keyframes pageFlipTimbulan {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(-90deg); box-shadow: -20px 0 40px rgba(0,0,0,0.3); }
          100% { transform: rotateY(-180deg); }
        }
      `}</style>
    </div>);

}

// ─── Page Texture ─────────────────────────────────────────────────────────────
function PageTexture() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        opacity: 0.6
      }} />);

}

// ─── Left Page Content ────────────────────────────────────────────────────────
function LeftPageContent({ spread }: {spread: typeof SPREADS_DATA[0];}) {
  const s = spread as any;
  const accentColor = '#C0392B';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vh, 14px)' }}>
      <div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 2vw, 1.4rem)', fontWeight: 900, color: accentColor, letterSpacing: '0.06em', margin: 0, lineHeight: 1.2 }}>
          {s.leftHeading}
        </h2>
        <div style={{ width: 'clamp(28px, 5vw, 48px)', height: 2, background: `linear-gradient(90deg, ${accentColor}, transparent)`, marginTop: 5, borderRadius: 1 }} />
      </div>

      {s.leftText &&
      <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#3D2B1F', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>
          {s.leftText}
        </p>
      }

      {s.imageUrl && s.id === 1 &&
      <div style={{ flex: 1, borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid rgba(192,57,43,0.15)`, minHeight: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      }

      {s.leftItems &&
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>
          {s.leftItems.map((item: any) =>
        <div key={item.num} style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: accentColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>
                {item.num}
              </div>
              <div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: '#7b241c', lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#5a3a2a', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div>
              </div>
            </div>
        )}
        </div>
      }

      {s.leftSubheading &&
      <>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: accentColor, margin: 0, letterSpacing: '0.04em' }}>
            {s.leftSubheading}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)', flex: 1 }}>
            {s.leftTechniques?.map((t: any) =>
          <div key={t.name} style={{ borderLeft: `2px solid rgba(192,57,43,0.4)`, paddingLeft: 8 }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: '#7b241c' }}>{t.name}</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#5a3a2a', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div>
              </div>
          )}
          </div>
        </>
      }

      <div style={{ marginTop: 'auto', fontFamily: 'Georgia, serif', fontSize: '0.6rem', color: `rgba(192,57,43,0.35)`, letterSpacing: '0.1em' }}>
        {spread.id * 2 - 1}
      </div>
    </div>);

}

// ─── Right Page Content ───────────────────────────────────────────────────────
function RightPageContent({ spread }: {spread: typeof SPREADS_DATA[0];}) {
  const s = spread as any;
  const accentColor = '#C0392B';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vh, 14px)' }}>
      {s.id === 1 &&
      <>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#3D2B1F', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>
            {s.rightText1}
          </p>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#3D2B1F', lineHeight: 1.7, margin: 0, textAlign: 'justify', fontStyle: 'italic', borderLeft: `2px solid rgba(192,57,43,0.3)`, paddingLeft: 10 }}>
            {s.rightText2}
          </p>
        </>
      }

      {s.id === 2 && s.rightHeading &&
      <>
          <div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', fontWeight: 900, color: accentColor, letterSpacing: '0.06em', margin: 0, lineHeight: 1.2 }}>
              {s.rightHeading}
            </h2>
            <div style={{ width: 'clamp(28px, 5vw, 48px)', height: 2, background: `linear-gradient(90deg, ${accentColor}, transparent)`, marginTop: 5, borderRadius: 1 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>
            {s.rightItems?.map((item: any) =>
          <div key={item.num} style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: accentColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>
                  {item.num}
                </div>
                <div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: '#7b241c', lineHeight: 1.3 }}>{item.title}</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#5a3a2a', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div>
                </div>
              </div>
          )}
          </div>
        </>
      }

      {s.id === 2 && !s.rightHeading && s.rightItems &&
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>
          {s.rightItems.map((item: any) =>
        <div key={item.num} style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: accentColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>
                {item.num}
              </div>
              <div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: '#7b241c', lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#5a3a2a', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div>
              </div>
            </div>
        )}
        </div>
      }

      {s.rightTechniques &&
      <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)' }}>
            {s.rightTechniques.map((t: any) =>
          <div key={t.name} style={{ borderLeft: `2px solid rgba(192,57,43,0.4)`, paddingLeft: 8 }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: '#7b241c' }}>{t.name}</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#5a3a2a', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div>
              </div>
          )}
          </div>
          {s.rightSubheading &&
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: accentColor, margin: '4px 0 0', letterSpacing: '0.04em' }}>
              {s.rightSubheading}
            </h3>
        }
          {s.rightProcess &&
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
              {s.rightProcess.map((step: string, i: number) =>
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 'clamp(14px, 1.8vw, 20px)', height: 'clamp(14px, 1.8vw, 20px)', borderRadius: '50%', border: `1.5px solid rgba(192,57,43,0.5)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)', fontWeight: 700, color: accentColor, fontFamily: 'Georgia, serif', flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#3D2B1F', lineHeight: 1.4 }}>{step}</div>
                </div>
          )}
            </div>
        }
        </>
      }

      {s.id === 4 &&
      <>
          {s.imageUrl &&
        <div style={{ height: 'clamp(80px, 20vh, 160px)', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid rgba(192,57,43,0.15)`, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
        }
          {[s.rightText1, s.rightText2, s.rightText3].filter(Boolean).map((text: string, i: number) =>
        <p key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: '#3D2B1F', lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>
              {text}
            </p>
        )}
        </>
      }
    </div>);

}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ title, children, onClose }: {title: string;children: React.ReactNode;onClose: () => void;}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, #fdf6ee 0%, #f8efe3 100%)',
          borderRadius: 16,
          padding: 'clamp(20px, 3vw, 32px)',
          maxWidth: 720,
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.25)',
          border: '1px solid rgba(192,57,43,0.15)',
          position: 'relative'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: '1.5px solid rgba(192,57,43,0.2)' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 900, color: '#C0392B', margin: 0, letterSpacing: '0.06em' }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{ background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#C0392B', fontSize: '1rem', fontWeight: 700, transition: 'background 0.2s' }}>
            ×
          </button>
        </div>
        {children}
      </div>
    </div>);

}