'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type BookState = 'closed' | 'opening' | 'open' | 'closing';

const ACCENT = '#4A235A';
const ACCENT_MID = '#6C3483';
const ACCENT_LIGHT = '#9B59B6';

const SPREADS_DATA = [
{
  id: 1,
  topic: 'Definisi',
  leftHeading: 'Definisi',
  leftText: 'Arca instalasi (installation art) merupakan sejenis karya seni tiga dimensi berskala besar yang direka khusus untuk sesebuah ruang tertentu, sama ada ruang dalaman (galeri, muzium) mahupun ruang luaran (taman, dataran awam). Berbeza dengan arca konvensional yang berdiri sebagai objek tunggal, arca instalasi mengubah keseluruhan persekitaran ruang menjadi sebahagian daripada karya itu sendiri, melibatkan penonton secara fizikal, deria dan emosional.',
  rightText1: 'Arca instalasi muncul sebagai gerakan seni yang signifikan pada dekad 1960-an dan 1970-an, berkembang daripada tradisi seni persembahan, seni konseptual dan seni minimal. Pengkarya seperti Allan Kaprow, Yayoi Kusama, Bruce Nauman dan Christo telah mempelopori pendekatan ini, menolak sempadan antara seni dan kehidupan seharian serta antara karya dan penonton.',
  rightText2: 'Dalam konteks pendidikan seni visual Malaysia, arca instalasi mendorong pelajar untuk berfikir secara konseptual tentang hubungan antara objek, ruang, masa dan penonton. Ia menggalakkan eksperimentasi dengan pelbagai media dan pendekatan, menjadikannya medium yang relevan dan berimpak dalam seni kontemporari.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4436acce8-1789611112824.png",
  imageAlt: 'Infinity Mirror Room karya Yayoi Kusama menunjukkan instalasi seni berskala besar dengan cermin dan cahaya'
},
{
  id: 2,
  topic: 'Ciri-ciri & Jenis',
  leftHeading: 'Ciri-ciri',
  leftItems: [
  { num: '1', title: 'Berskala besar dan site-specific', desc: 'Direka untuk ruang tertentu — dimensi, bentuk dan konteks ruang mempengaruhi reka bentuk karya secara langsung dan tidak boleh dipisahkan.' },
  { num: '2', title: 'Melibatkan penonton secara aktif', desc: 'Penonton bukan sekadar pemerhati pasif tetapi peserta aktif yang bergerak dalam, melalui atau berinteraksi dengan karya, menjadikan pengalaman sebahagian daripada karya.' },
  { num: '3', title: 'Menggabungkan pelbagai media', desc: 'Cahaya, bunyi, video, objek, bahan organik, teknologi digital dan elemen persekitaran boleh digabungkan dalam satu karya instalasi yang menyeluruh.' },
  { num: '4', title: 'Bersifat sementara atau kekal', desc: 'Sesetengah instalasi bersifat sementara dan dibongkar selepas pameran, manakala yang lain dipasang secara kekal sebagai karya seni awam.' }],
  rightHeading: 'Jenis Arca Instalasi',
  rightItems: [
  { num: 'A', title: 'Instalasi Immersive', desc: 'Penonton dikelilingi sepenuhnya oleh karya, mewujudkan pengalaman yang menyeluruh dan membenamkan deria. Contoh: bilik cermin Yayoi Kusama.' },
  { num: 'B', title: 'Instalasi Interaktif', desc: 'Penonton boleh menyentuh, menggerakkan atau mempengaruhi karya secara langsung, menjadikan interaksi manusia sebahagian daripada karya.' },
  { num: 'C', title: 'Instalasi Site-Specific', desc: 'Direka khusus untuk lokasi tertentu dengan mengambil kira sejarah, konteks budaya dan ciri fizikal ruang tersebut.' },
  { num: 'D', title: 'Instalasi Media Baharu', desc: 'Menggunakan teknologi digital, video, cahaya LED, sensor dan perisian komputer untuk menghasilkan pengalaman seni yang dinamik dan responsif.' }],
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1584a82db-1766969274893.png",
  imageAlt: 'Contoh arca instalasi seni kontemporari dengan cahaya dan objek dalam ruang galeri'
},
{
  id: 3,
  topic: 'Teknik Penghasilan',
  leftHeading: 'Teknik Penghasilan',
  leftSubheading: 'Teknik Utama',
  leftTechniques: [
  { name: 'Teknik Pemasangan Ruang (Spatial Installation)', desc: 'Objek, bahan dan elemen disusun dalam ruang tiga dimensi dengan mengambil kira aliran pergerakan penonton, perspektif visual dan hubungan antara elemen.' },
  { name: 'Teknik Cahaya & Bayang (Light Art)', desc: 'Cahaya digunakan sebagai medium utama — lampu LED, projektor, cermin dan bahan translucent dimanipulasi untuk menghasilkan kesan visual yang dramatik.' },
  { name: 'Teknik Bunyi & Audio', desc: 'Elemen bunyi diintegrasikan ke dalam instalasi menggunakan pembesar suara, sensor dan perisian audio untuk mewujudkan persekitaran bunyi yang menyeluruh.' }],
  rightTechniques: [
  { name: 'Teknik Video & Projeksi', desc: 'Video dan imej diproyeksikan pada permukaan, objek atau badan penonton untuk menggabungkan dimensi masa dan naratif ke dalam instalasi.' },
  { name: 'Teknik Pengaturcaraan & Interaktif', desc: 'Sensor, mikrokontroler dan perisian digunakan untuk menjadikan instalasi responsif terhadap kehadiran, pergerakan atau input penonton.' }],
  rightSubheading: 'Proses Penghasilan',
  rightProcess: [
  'Menentukan konsep, tema dan mesej karya',
  'Menjalankan kajian tentang ruang dan konteksnya',
  'Menghasilkan lakaran, pelan lantai dan model skala',
  'Memilih bahan, media dan teknologi yang sesuai',
  'Membina dan menguji komponen secara berasingan',
  'Memasang keseluruhan instalasi dalam ruang sebenar',
  'Menguji pengalaman penonton dan membuat pelarasan akhir']
},
{
  id: 4,
  topic: 'Nilai Estetika',
  leftHeading: 'Nilai Estetika',
  leftText: 'Nilai estetika arca instalasi terletak pada keupayaannya mewujudkan pengalaman seni yang menyeluruh dan transformatif. Berbeza dengan karya seni konvensional yang dilihat dari jarak tertentu, instalasi membenamkan penonton dalam persekitaran seni, mengubah cara mereka merasai dan memahami ruang, masa dan diri mereka sendiri. Pengalaman ini tidak dapat direplikasi melalui gambar atau video.',
  rightText1: 'Dimensi konseptual instalasi menambahkan lapisan makna yang mendalam. Pemilihan bahan, objek dan cara penyusunannya membawa makna simbolik dan naratif yang mengundang penonton untuk berfikir, merasai dan mentafsir. Instalasi yang berkesan bukan sahaja indah secara visual tetapi juga mencetuskan pemikiran dan emosi yang mendalam.',
  rightText2: 'Hubungan antara instalasi dan ruang persekitarannya adalah unik dan tidak dapat dipisahkan. Cahaya semula jadi, bunyi persekitaran, suhu dan kehadiran penonton lain menjadi sebahagian daripada pengalaman karya. Ini menjadikan setiap lawatan ke instalasi sebagai pengalaman yang berbeza dan tidak pernah berulang.',
  rightText3: 'Dalam konteks seni Malaysia kontemporari, instalasi digunakan oleh pengkarya untuk menyampaikan isu sosial, budaya, alam sekitar dan identiti. Penggunaan bahan tempatan, motif budaya dan konteks sejarah Malaysia dalam instalasi mewujudkan karya yang bermakna dan relevan kepada penonton tempatan dan antarabangsa.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1b3932019-1769478006520.png",
  imageAlt: 'Nilai estetika arca instalasi melalui pengalaman immersive cahaya dan ruang'
}];

const BAHAN_DATA = [
{ category: 'Bahan Struktur', items: [
  { name: 'Rangka Keluli', imageUrl: "https://images.unsplash.com/photo-1619172800038-786b7d601c89", imageAlt: 'Rangka keluli untuk struktur instalasi berskala besar' },
  { name: 'Kayu Lapis & MDF', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1ee4c19eb-1773179374457.png", imageAlt: 'Kayu lapis dan MDF untuk panel instalasi' },
  { name: 'Plastik Akrilik', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_120140a67-1767525918530.png", imageAlt: 'Plastik akrilik transparen untuk instalasi cahaya' },
  { name: 'Cermin', imageUrl: "https://images.unsplash.com/photo-1508610784997-16dcaa57dd65", imageAlt: 'Cermin untuk instalasi reflektif dan immersive' },
  { name: 'Kain & Tekstil', imageUrl: "https://images.unsplash.com/photo-1705414435607-902a49e6d2e3", imageAlt: 'Kain dan tekstil untuk instalasi lembut' }]
},
{ category: 'Bahan Cahaya & Elektronik', items: [
  { name: 'Lampu LED', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_180693732-1768405883874.png", imageAlt: 'Lampu LED pelbagai warna untuk instalasi cahaya' },
  { name: 'Projektor Video', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1a1d9be14-1767516382705.png", imageAlt: 'Projektor video untuk instalasi media baharu' },
  { name: 'Sensor Gerak', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1b51d8bf1-1767789403058.png", imageAlt: 'Sensor gerak untuk instalasi interaktif' },
  { name: 'Mikrokontroler', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_46ed38066-1789743581297.png", imageAlt: 'Mikrokontroler untuk kawalan instalasi digital' }]
},
{ category: 'Objek & Bahan Ditemui', items: [
  { name: 'Objek Seharian', imageUrl: "/assets/images/objek_seharian.png", imageAlt: 'Objek seharian seperti cawan, botol dan kerusi untuk instalasi konseptual' },
  { name: 'Bahan Organik', imageUrl: "/assets/images/bahan_organik.png", imageAlt: 'Bahan organik seperti daun kering, ranting dan biji benih untuk instalasi alam' },
  { name: 'Tali & Benang', imageUrl: "https://images.unsplash.com/photo-1657862158458-20bd8d1330ae", imageAlt: 'Tali dan benang untuk instalasi tekstil' },
  { name: 'Kertas & Karton', imageUrl: "/assets/images/kertas_karton.png", imageAlt: 'Kertas dan karton pelbagai jenis untuk instalasi ringan' }]
},
{ category: 'Bahan Kemasan & Audio', items: [
  { name: 'Cat Semburan', imageUrl: "https://images.unsplash.com/photo-1610493471869-a6e3da6c6713", imageAlt: 'Cat semburan untuk kemasan instalasi' },
  { name: 'Pembesar Suara', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_153753bc7-1785997389894.png", imageAlt: 'Pembesar suara untuk instalasi bunyi' },
  { name: 'Gam & Pelekat', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_19776a274-1786010612675.png", imageAlt: 'Gam dan pelekat untuk menyambung elemen instalasi' },
  { name: 'Vernish & Pelindung', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1780f2544-1783942439186.png", imageAlt: 'Vernish dan bahan pelindung untuk kemasan instalasi' }]
}];

const KARYA_DATA = [
{
  title: 'Infinity Mirror Room — Phalli\'s Field',
  artist: 'Yayoi Kusama',
  year: '1965',
  desc: 'Bilik cermin immersive pertama Kusama yang dipenuhi dengan ribuan patung lembut berbintik merah, dipantulkan tanpa had oleh cermin di sekeliling, mewujudkan pengalaman infiniti yang menakjubkan.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4436acce8-1789611112824.png",
  imageAlt: 'Infinity Mirror Room Yayoi Kusama 1965 instalasi cermin immersive dengan pantulan infiniti'
},
{
  title: 'The Weather Project',
  artist: 'Olafur Eliasson',
  year: '2003',
  desc: 'Instalasi berskala monumental di Turbine Hall Tate Modern London, menampilkan matahari tiruan daripada lampu mono-frequency dan cermin siling yang memantulkan pengunjung, menarik 2 juta pelawat.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_43dd9a95d-1789743585602.png",
  imageAlt: 'The Weather Project Olafur Eliasson 2003 instalasi matahari tiruan di Tate Modern London'
},
{
  title: 'The Gates',
  artist: 'Christo & Jeanne-Claude',
  year: '2005',
  desc: 'Instalasi sementara di Central Park New York terdiri daripada 7,503 pintu gerbang bertirai kain oren sepanjang 37 km jalan taman, mewujudkan pengalaman berjalan dalam karya seni berskala bandar.',
  imageUrl: "/assets/images/the_gates_christo.png",
  imageAlt: 'The Gates Christo Jeanne-Claude 2005 instalasi pintu gerbang kain oren di Central Park New York'
},
{
  title: 'Rain Room',
  artist: 'Random International',
  year: '2012',
  desc: 'Instalasi interaktif di mana hujan turun berterusan dalam bilik gelap tetapi berhenti secara automatik di mana-mana penonton berdiri, menggunakan sensor 3D untuk mengesan pergerakan manusia.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4a7a6c007-1789604410114.png",
  imageAlt: 'Rain Room Random International 2012 instalasi hujan interaktif dengan sensor pengesan manusia'
}];

export default function ArcaInstalasiPage() {
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
  const isOpen = bookState === 'open' || bookState === 'closing';
  const isOpening = bookState === 'opening';
  const isClosed = bookState === 'closed';

  return (
    <div className="relative w-full min-h-screen overflow-hidden select-none">
      {/* Background image with deep indigo tint */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url(/assets/images/IMG_2664-1789601863261.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 z-0" style={{ background: 'rgba(30, 15, 60, 0.78)' }} />

      {/* Ambient light */}
      <div className="absolute inset-0 pointer-events-none z-1" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(120,60,200,0.18) 0%, transparent 70%)' }} />

      {/* Wavy cream center shape */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <path d="M 60 180 C 80 140, 120 100, 160 130 C 200 160, 180 80, 240 70 C 300 60, 320 120, 380 100 C 440 80, 460 40, 520 50 C 580 60, 600 110, 660 90 C 720 70, 740 30, 800 50 C 860 70, 880 120, 940 110 C 1000 100, 1020 60, 1080 80 C 1140 100, 1160 150, 1150 200 C 1140 250, 1100 280, 1120 330 C 1140 380, 1160 420, 1140 470 C 1120 520, 1060 540, 1020 510 C 980 480, 960 530, 900 545 C 840 560, 820 510, 760 530 C 700 550, 680 590, 620 580 C 560 570, 540 520, 480 540 C 420 560, 400 600, 340 590 C 280 580, 260 530, 200 520 C 140 510, 100 550, 70 510 C 40 470, 50 420, 60 380 C 70 340, 40 300, 50 260 C 60 220, 40 220, 60 180 Z" fill="#3d1a6e" opacity="0.85" />
        <path d="M 80 190 C 98 152, 135 115, 172 143 C 209 171, 192 95, 250 85 C 308 75, 328 132, 386 112 C 444 92, 464 54, 522 64 C 580 74, 600 122, 658 103 C 716 84, 736 46, 793 66 C 850 86, 870 133, 928 122 C 986 111, 1006 72, 1062 92 C 1118 112, 1136 160, 1126 208 C 1116 256, 1078 284, 1097 332 C 1116 380, 1134 418, 1114 464 C 1094 510, 1036 528, 998 500 C 960 472, 942 520, 884 534 C 826 548, 806 500, 748 519 C 690 538, 672 576, 614 566 C 556 556, 538 508, 478 526 C 418 544, 400 582, 342 572 C 284 562, 264 514, 206 504 C 148 494, 110 532, 82 494 C 54 456, 64 408, 74 370 C 84 332, 58 294, 68 254 C 78 214, 62 228, 80 190 Z" fill="#f0ece0" />
        <filter id="paper-instalasi">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
        <path d="M 80 190 C 98 152, 135 115, 172 143 C 209 171, 192 95, 250 85 C 308 75, 328 132, 386 112 C 444 92, 464 54, 522 64 C 580 74, 600 122, 658 103 C 716 84, 736 46, 793 66 C 850 86, 870 133, 928 122 C 986 111, 1006 72, 1062 92 C 1118 112, 1136 160, 1126 208 C 1116 256, 1078 284, 1097 332 C 1116 380, 1134 418, 1114 464 C 1094 510, 1036 528, 998 500 C 960 472, 942 520, 884 534 C 826 548, 806 500, 748 519 C 690 538, 672 576, 614 566 C 556 556, 538 508, 478 526 C 418 544, 400 582, 342 572 C 284 562, 264 514, 206 504 C 148 494, 110 532, 82 494 C 54 456, 64 408, 74 370 C 84 332, 58 294, 68 254 C 78 214, 62 228, 80 190 Z" fill="rgba(180,160,220,0.15)" filter="url(#paper-instalasi)" />
      </svg>

      {/* Fabric texture overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='none'/%3E%3Ccircle cx='1' cy='1' r='0.5' fill='rgba(0,0,0,0.04)'/%3E%3Ccircle cx='3' cy='3' r='0.5' fill='rgba(0,0,0,0.04)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />

      {/* Back button */}
      <Link href="/projects/arca/buku/jenis" className="absolute top-5 left-5 z-50 flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.88)', boxShadow: '0 2px 12px rgba(0,0,0,0.25)', color: '#2c0e4a', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="#2c0e4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Back
      </Link>

      {/* Title */}
      <div className="absolute z-30 w-full flex justify-center" style={{ top: '3%' }}>
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '0.18em', color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 1px 0 rgba(0,0,0,0.3)', lineHeight: 1 }}>
          ARCA INSTALASI
        </h1>
      </div>

      {/* Book container */}
      <div className="absolute z-20" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: '2%' }}>
        <div onClick={handleBookClick} style={{ cursor: isFlipping ? 'default' : 'pointer', perspective: '1400px', perspectiveOrigin: '50% 50%' }}>
          {(isClosed || isOpening || bookState === 'closing') && <ClosedBook isOpening={isOpening} isClosing={bookState === 'closing'} />}
          {bookState === 'open' && <OpenBook currentSpread={currentSpread} isFlipping={isFlipping} flipDirection={flipDirection} />}
        </div>
        {bookState === 'open' &&
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
            {[1, 2, 3, 4].map((n) => <div key={n} style={{ width: n === currentSpread ? 20 : 8, height: 8, borderRadius: 4, background: n === currentSpread ? ACCENT_LIGHT : 'rgba(108,52,131,0.35)', transition: 'all 0.3s ease', boxShadow: n === currentSpread ? `0 2px 6px ${ACCENT_LIGHT}66` : 'none' }} />)}
          </div>
        }
      </div>

      {/* Bottom icons */}
      <button onClick={() => setShowBahan(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '3%', left: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2657-1789578278816.jpeg" alt="Bahan arca instalasi" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Bahan</span>
      </button>
      <button onClick={() => setShowKarya(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '3%', right: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2656-1789578278955.jpeg" alt="Karya arca instalasi" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Karya</span>
      </button>

      {showBahan && <Modal title="Bahan & Alatan Arca Instalasi" onClose={() => setShowBahan(false)} accent={ACCENT_MID}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {BAHAN_DATA.map((section) =>
          <div key={section.category}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', fontWeight: 700, color: ACCENT_MID, letterSpacing: '0.06em', marginBottom: 12, borderBottom: `1px solid ${ACCENT_MID}33`, paddingBottom: 4 }}>{section.category}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
                {section.items.map((item) =>
              <div key={item.name} style={{ borderRadius: 8, overflow: 'hidden', background: '#fff', border: `1px solid ${ACCENT_MID}22`, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.imageAlt} style={{ width: '100%', height: 70, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '6px 8px' }}><span style={{ fontFamily: 'Georgia, serif', fontSize: '0.72rem', color: '#2c0e4a', fontWeight: 600, lineHeight: 1.3, display: 'block' }}>{item.name}</span></div>
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
      </Modal>}

      {showKarya && <Modal title="Contoh Karya Arca Instalasi" onClose={() => setShowKarya(false)} accent={ACCENT_MID}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {KARYA_DATA.map((karya) =>
          <div key={karya.title} style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', background: '#fff', border: `1px solid ${ACCENT_MID}22` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={karya.imageUrl} alt={karya.imageAlt} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '10px 12px' }}>
                <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 700, color: ACCENT_MID, margin: '0 0 2px' }}>{karya.title}</h4>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.7rem', color: ACCENT, fontWeight: 600, marginBottom: 2 }}>{karya.artist} · {karya.year}</div>
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
      {/* Spine */}
      <div style={{ position: 'absolute', left: -28, top: 0, width: 28, height: '100%', background: 'linear-gradient(90deg, #2c0e4a 0%, #4a235a 40%, #6c3483 100%)', transformOrigin: 'right center', transform: 'rotateY(-90deg)', borderRadius: '4px 0 0 4px', boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 1vw, 0.75rem)', fontWeight: 700, color: 'rgba(220,200,255,0.9)', letterSpacing: '0.12em', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>ARCA INSTALASI</span>
      </div>
      {/* Cover */}
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg, #7d3c98 0%, #6c3483 30%, #4a235a 60%, #2c0e4a 100%)', borderRadius: '2px 8px 8px 2px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: '60%', height: '45%', background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 12, border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 16, border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: 2, pointerEvents: 'none' }} />
        {/* Cover image */}
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: '72%', height: '48%', borderRadius: 6, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.25)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/arca_instalasi_cover.png" alt="Karya arca instalasi pada kulit buku" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '14%', left: 0, right: 0, textAlign: 'center', padding: '0 16px' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.85rem, 2vw, 1.2rem)', fontWeight: 900, color: 'rgba(240,220,255,0.97)', letterSpacing: '0.15em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>ARCA INSTALASI</div>
          <div style={{ width: 40, height: 1.5, background: 'rgba(200,180,255,0.6)', margin: '6px auto 0', borderRadius: 1 }} />
        </div>
        {/* Page edges */}
        <div style={{ position: 'absolute', right: -6, top: 4, bottom: 4, width: 6, background: 'linear-gradient(90deg, #f0e8f8 0%, #e8ddf0 50%, #ddd0e8 100%)', borderRadius: '0 2px 2px 0', boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.15)' }}>
          {Array.from({ length: 20 }).map((_, i) => <div key={i} style={{ height: '5%', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }} />)}
        </div>
      </div>
    </div>);

}

function OpenBook({ currentSpread, isFlipping, flipDirection }: {currentSpread: number;isFlipping: boolean;flipDirection: 'forward' | 'backward';}) {
  const spread = SPREADS_DATA[currentSpread - 1];
  return (
    <div style={{ width: 'clamp(320px, 80vw, 900px)', height: 'clamp(240px, 55vh, 580px)', position: 'relative', display: 'flex', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 12px 30px rgba(0,0,0,0.35))' }}>
      {/* Left page */}
      <div style={{ flex: 1, background: 'linear-gradient(105deg, #fdf6ee 0%, #f8efe3 100%)', borderRadius: '8px 0 0 8px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.08)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-5deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'right center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>
          {spread && <LeftPageContent spread={spread} />}
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06))', pointerEvents: 'none', zIndex: 3 }} />
      </div>
      {/* Binding */}
      <div style={{ width: 'clamp(12px, 1.5vw, 20px)', background: 'linear-gradient(90deg, #4a235a 0%, #6c3483 40%, #4a235a 60%, #3d1a6e 100%)', position: 'relative', boxShadow: '0 0 12px rgba(0,0,0,0.3)', zIndex: 10, flexShrink: 0 }}>
        {Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: '50%', top: `${10 + i * 11}%`, transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'rgba(200,180,255,0.5)' }} />)}
      </div>
      {/* Right page */}
      <div style={{ flex: 1, background: 'linear-gradient(75deg, #f8efe3 0%, #fdf6ee 100%)', borderRadius: '0 8px 8px 0', position: 'relative', overflow: 'hidden', boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.06)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-180deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'left center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>
          {spread && <RightPageContent spread={spread} />}
        </div>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.05))', pointerEvents: 'none', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 10, right: 16, fontFamily: 'Georgia, serif', fontSize: '0.65rem', color: 'rgba(108,52,131,0.4)', letterSpacing: '0.1em', zIndex: 4 }}>{currentSpread * 2}</div>
      </div>
      {isFlipping &&
      <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'linear-gradient(105deg, #f8efe3 0%, #fdf6ee 100%)', transformOrigin: 'left center', animation: 'pageFlipInstalasi 0.7s cubic-bezier(0.4,0,0.2,1) forwards', zIndex: 20, borderRadius: '0 8px 8px 0', boxShadow: '-8px 0 24px rgba(0,0,0,0.2)' }} />
      }
      <style>{`@keyframes pageFlipInstalasi { 0% { transform: rotateY(0deg); } 50% { transform: rotateY(-90deg); } 100% { transform: rotateY(-180deg); } }`}</style>
    </div>);

}

function PageTexture() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', opacity: 0.6 }} />);

}

function LeftPageContent({ spread }: {spread: typeof SPREADS_DATA[0];}) {
  const s = spread as any;
  const accentColor = '#6C3483';
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vh, 14px)' }}>
      <div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 2vw, 1.4rem)', fontWeight: 900, color: accentColor, letterSpacing: '0.06em', margin: 0, lineHeight: 1.2 }}>{s.leftHeading}</h2>
        <div style={{ width: 'clamp(28px, 5vw, 48px)', height: 2, background: `linear-gradient(90deg, ${accentColor}, transparent)`, marginTop: 5, borderRadius: 1 }} />
      </div>
      {s.leftText && <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#3D2B1F', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{s.leftText}</p>}
      {s.imageUrl && s.id === 1 && <div style={{ flex: 1, borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid rgba(108,52,131,0.15)`, minHeight: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>}
      {s.leftItems && <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>
        {s.leftItems.map((item: any) =>
        <div key={item.num} style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: accentColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div>
            <div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: '#4a235a', lineHeight: 1.3 }}>{item.title}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#3a2a4a', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div>
            </div>
          </div>
        )}
      </div>}
      {s.leftSubheading && <>
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: accentColor, margin: 0, letterSpacing: '0.04em' }}>{s.leftSubheading}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)', flex: 1 }}>
          {s.leftTechniques?.map((t: any) =>
          <div key={t.name} style={{ borderLeft: `2px solid rgba(108,52,131,0.4)`, paddingLeft: 8 }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: '#4a235a' }}>{t.name}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#3a2a4a', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div>
            </div>
          )}
        </div>
      </>}
      <div style={{ marginTop: 'auto', fontFamily: 'Georgia, serif', fontSize: '0.6rem', color: `rgba(108,52,131,0.35)`, letterSpacing: '0.1em' }}>{spread.id * 2 - 1}</div>
    </div>);

}

function RightPageContent({ spread }: {spread: typeof SPREADS_DATA[0];}) {
  const s = spread as any;
  const accentColor = '#6C3483';
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vh, 14px)' }}>
      {s.id === 1 && <>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#3D2B1F', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{s.rightText1}</p>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#3D2B1F', lineHeight: 1.7, margin: 0, textAlign: 'justify', fontStyle: 'italic', borderLeft: `2px solid rgba(108,52,131,0.3)`, paddingLeft: 10 }}>{s.rightText2}</p>
      </>}
      {s.id === 2 && s.rightHeading && <>
        <div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', fontWeight: 900, color: accentColor, letterSpacing: '0.06em', margin: 0, lineHeight: 1.2 }}>{s.rightHeading}</h2>
          <div style={{ width: 'clamp(28px, 5vw, 48px)', height: 2, background: `linear-gradient(90deg, ${accentColor}, transparent)`, marginTop: 5, borderRadius: 1 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>
          {s.rightItems?.map((item: any) =>
          <div key={item.num} style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: accentColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div>
              <div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: '#4a235a', lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#3a2a4a', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div>
              </div>
            </div>
          )}
        </div>
      </>}
      {s.rightTechniques && <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)' }}>
          {s.rightTechniques.map((t: any) =>
          <div key={t.name} style={{ borderLeft: `2px solid rgba(108,52,131,0.4)`, paddingLeft: 8 }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: '#4a235a' }}>{t.name}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#3a2a4a', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div>
            </div>
          )}
        </div>
        {s.rightSubheading && <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: accentColor, margin: '4px 0 0', letterSpacing: '0.04em' }}>{s.rightSubheading}</h3>}
        {s.rightProcess && <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {s.rightProcess.map((step: string, i: number) =>
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 'clamp(14px, 1.8vw, 20px)', height: 'clamp(14px, 1.8vw, 20px)', borderRadius: '50%', border: `1.5px solid rgba(108,52,131,0.5)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)', fontWeight: 700, color: accentColor, fontFamily: 'Georgia, serif', flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#3D2B1F', lineHeight: 1.4 }}>{step}</div>
            </div>
          )}
        </div>}
      </>}
      {s.id === 4 && <>
        {s.imageUrl && <div style={{ height: 'clamp(80px, 20vh, 160px)', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid rgba(108,52,131,0.15)`, flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>}
        {[s.rightText1, s.rightText2, s.rightText3].filter(Boolean).map((text: string, i: number) =>
        <p key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: '#3D2B1F', lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{text}</p>
        )}
      </>}
    </div>);

}

function Modal({ title, children, onClose, accent }: {title: string;children: React.ReactNode;onClose: () => void;accent: string;}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #fdf6ee 0%, #f8efe3 100%)', borderRadius: 16, padding: 'clamp(20px, 3vw, 32px)', maxWidth: 720, width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.25)', border: `1px solid ${accent}22`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: `1.5px solid ${accent}33` }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 900, color: accent, margin: 0, letterSpacing: '0.06em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: `${accent}18`, border: `1px solid ${accent}33`, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: accent, fontSize: '1rem', fontWeight: 700 }}>×</button>
        </div>
        {children}
      </div>
    </div>);

}