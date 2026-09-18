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
  leftText: 'Topeng merupakan salah satu bentuk hasil kraf yang dihasilkan melalui proses pembentukan dan pengolahan bahan bagi menghasilkan rupa atau bentuk yang menyerupai wajah manusia, haiwan, makhluk imaginasi atau watak tertentu.',
  rightText1: 'Topeng lazimnya digunakan sebagai objek hiasan, bahan persembahan, alat ritual, permainan serta medium untuk menyampaikan identiti, simbol dan nilai budaya sesebuah masyarakat. Dalam konteks seni visual, penghasilan topeng melibatkan penerapan unsur seni seperti garisan, rupa, bentuk, warna, jalinan dan ruang, serta prinsip rekaan seperti imbangan, harmoni, kontra, penegasan dan kepelbagaian.',
  rightText2: 'Oleh itu, topeng bukan sahaja mempunyai fungsi praktikal, malah menjadi medium ekspresi kreatif yang membolehkan pengkarya menyampaikan idea, emosi, identiti dan makna tertentu melalui reka bentuk visualnya.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1643d766c-1772506417318.png",
  imageAlt: 'Traditional Malay wooden mask with intricate painted patterns'
},
{
  id: 2,
  topic: 'Ciri-ciri',
  leftHeading: 'Ciri-ciri',
  leftItems: [
  { num: '1', title: 'Mempunyai bentuk tiga dimensi atau separa tiga dimensi', desc: 'Topeng boleh direka dalam bentuk yang mempunyai kedalaman dan struktur tertentu supaya kelihatan lebih nyata serta mempunyai kesan visual yang menarik.' },
  { num: '2', title: 'Menampilkan ciri wajah atau figura tertentu', desc: 'Reka bentuk topeng biasanya mempunyai elemen seperti mata, hidung, mulut dan bentuk muka, sama ada diolah berdasarkan manusia, haiwan, watak tradisional atau imaginasi pengkarya.' },
  { num: '3', title: 'Mempunyai reka bentuk yang ekspresif', desc: 'Bentuk dan susunan elemen pada topeng boleh digunakan untuk menggambarkan emosi, karakter atau personaliti tertentu.' }],

  rightItems: [
  { num: '4', title: 'Menggunakan unsur dan prinsip seni', desc: 'Penghasilan topeng mengaplikasikan unsur seni seperti rupa, bentuk, warna, garisan dan jalinan serta prinsip seperti imbangan, harmoni, kontra, penegasan dan irama.' },
  { num: '5', title: 'Mempunyai nilai simbolik dan budaya', desc: 'Sesetengah topeng mempunyai hubungan dengan adat, kepercayaan, persembahan tradisional dan identiti masyarakat. Motif, bentuk dan warna yang digunakan boleh membawa maksud tertentu.' },
  { num: '6', title: 'Mempunyai nilai hiasan dan fungsi', desc: 'Selain berfungsi sebagai objek yang boleh dipakai dalam persembahan, topeng juga boleh dihasilkan sebagai karya hiasan, bahan pameran atau produk kraf.' },
  { num: '7', title: 'Mempunyai kreativiti dan keunikan tersendiri', desc: 'Reka bentuk topeng boleh diubah suai berdasarkan imaginasi, sumber ilham, tema dan konsep yang ingin diketengahkan oleh pengkarya.' }],

  imageUrl: "https://images.unsplash.com/photo-1562577782-63d55bdee280",
  imageAlt: 'Close-up detail of traditional mask showing intricate facial features and decorative elements'
},
{
  id: 3,
  topic: 'Teknik & Proses',
  leftHeading: 'Teknik & Proses Penghasilan',
  leftSubheading: 'Teknik',
  leftTechniques: [
  { name: 'Teknik binaan', desc: 'Membina struktur asas topeng dengan menyusun dan mencantumkan bahan sehingga membentuk rupa yang dikehendaki.' },
  { name: 'Teknik tampalan', desc: 'Menampal lapisan kertas atau bahan tertentu pada permukaan topeng untuk membina bentuk, tekstur dan ketebalan.' },
  { name: 'Teknik paper mâché', desc: 'Menggunakan cebisan kertas yang dicampurkan dengan bahan pelekat untuk membentuk permukaan topeng yang lebih kukuh.' },
  { name: 'Teknik ukiran atau pembentukan', desc: 'Mengolah bahan seperti tanah liat atau kayu bagi menghasilkan bentuk dan perincian tertentu.' }],

  rightTechniques: [
  { name: 'Teknik mewarna', desc: 'Mengaplikasikan warna pada permukaan topeng untuk membentuk suasana, karakter dan penegasan visual.' },
  { name: 'Teknik hiasan', desc: 'Menambahkan elemen seperti motif, manik, kain, tali atau bahan lain untuk meningkatkan nilai estetika karya.' }],

  rightSubheading: 'Proses Penghasilan',
  rightProcess: [
  'Menentukan tema dan idea',
  'Menghasilkan lakaran idea',
  'Menyediakan bahan dan alatan',
  'Membina struktur asas',
  'Membentuk dan menambah perincian',
  'Mengukuhkan permukaan',
  'Mewarna dan menghias',
  'Kemasan akhir']

},
{
  id: 4,
  topic: 'Nilai Estetika',
  leftHeading: 'Nilai Estetika',
  leftText: 'Nilai estetika dalam kraf topeng dapat dilihat melalui keupayaan pengkarya mengolah bentuk, warna, jalinan, motif dan perincian secara terancang sehingga menghasilkan karya yang menarik secara visual. Penggunaan bentuk yang jelas dan seimbang dapat membentuk karakter topeng, manakala kombinasi warna yang sesuai mampu mewujudkan harmoni, kontra dan penegasan.',
  rightText1: 'Jalinan yang dihasilkan melalui penggunaan kertas, kain, manik atau bahan hiasan pula memberikan variasi pada permukaan serta meningkatkan pengalaman visual dan sentuhan terhadap karya.',
  rightText2: 'Selain itu, nilai estetika topeng turut berkait dengan keaslian idea, kreativiti dan identiti budaya yang ditampilkan. Pemilihan motif, simbol dan warna tertentu dapat memberikan makna yang lebih mendalam kepada karya, khususnya apabila topeng diinspirasikan daripada warisan dan budaya tempatan.',
  rightText3: 'Dengan demikian, topeng bukan sekadar objek hiasan, tetapi dapat berfungsi sebagai karya seni yang menggabungkan aspek keindahan, kreativiti, fungsi dan nilai budaya.',
  imageUrl: "https://images.unsplash.com/photo-1550078809-9bdaf7fae6a8",
  imageAlt: 'Artistic photograph of a completed traditional mask with natural lighting showing aesthetic details'
}];


// ─── Bahan Modal Data ─────────────────────────────────────────────────────────
const BAHAN_DATA = [
{ category: 'Bahan Asas', items: [
  { name: 'Kertas surat khabar', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_461eaab96-1789579165815.png", imageAlt: 'Stack of newspapers used as base material for mask making' },
  { name: 'Kertas mahjong', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_40ae53577-1789579167218.png", imageAlt: 'Large sheets of mahjong paper for craft projects' },
  { name: 'Tanah liat', imageUrl: "https://images.unsplash.com/photo-1703294114034-c658b954d525", imageAlt: 'Brown clay material used for sculpting mask forms' },
  { name: 'Kayu balsa', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4cef04808-1789579165967.png", imageAlt: 'Light balsa wood pieces used for mask structure' },
  { name: 'Gipsum / plaster of Paris', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_45cfc26c1-1789579167254.png", imageAlt: 'White plaster of Paris powder for casting mask shapes' }]
},
{ category: 'Bahan Pelekat', items: [
  { name: 'Gam kanji (tepung + air)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_465138942-1789579769718.png", imageAlt: 'Bowl of starch paste made from flour and water for paper mache' },
  { name: 'Gam PVA', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_16483655c-1780576005020.png", imageAlt: 'White PVA glue bottle used for craft adhesive' },
  { name: 'Gam putih', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_17a0c6c4e-1784474291498.png", imageAlt: 'White craft glue for bonding mask materials' },
  { name: 'Pes tepung', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_465138942-1789579769718.png", imageAlt: 'Flour paste mixture used as natural adhesive for paper mache masks' }]
},
{ category: 'Bahan Hiasan', items: [
  { name: 'Cat akrilik', imageUrl: "https://images.unsplash.com/photo-1664651312385-542f597e24f9", imageAlt: 'Tubes and bottles of acrylic paint in various colours for decorating masks' },
  { name: 'Cat poster', imageUrl: "https://images.unsplash.com/photo-1566396561878-20164d7bd2d3", imageAlt: 'Poster paint set with bright colours for mask decoration' },
  { name: 'Manik-manik', imageUrl: "https://images.unsplash.com/photo-1577395594952-8a53f8d4a741", imageAlt: 'Colourful beads and sequins for decorating traditional masks' },
  { name: 'Kain perca', imageUrl: "https://images.unsplash.com/photo-1599350126577-d50da7e8bdda", imageAlt: 'Colourful fabric scraps used as decorative material on masks' },
  { name: 'Tali raffia', imageUrl: "https://images.unsplash.com/photo-1719169395186-18c18f05e15a", imageAlt: 'Raffia string used for tying and decorating craft masks' },
  { name: 'Foil emas/perak', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4e5c5159e-1789579167356.png", imageAlt: 'Gold and silver foil sheets for adding metallic decoration to masks' }]
},
{ category: 'Alatan', items: [
  { name: 'Berus cat', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1500d02d4-1773080686081.png", imageAlt: 'Set of paint brushes of various sizes for painting masks' },
  { name: 'Pisau pemotong', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_47410091f-1789579168782.png", imageAlt: 'Craft cutting knife for trimming and shaping mask materials' },
  { name: 'Gunting', imageUrl: "https://images.unsplash.com/photo-1722963296051-9d7f05b82f73", imageAlt: 'Craft scissors with orange handles used for cutting paper and fabric in mask making' },
  { name: 'Mangkuk pencampur', imageUrl: "https://images.unsplash.com/photo-1666281107556-a9bfa2571fcd", imageAlt: 'Mixing bowl used to prepare paste and paint mixtures for masks' },
  { name: 'Span', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1346454cc-1772086990909.png", imageAlt: 'Sponge used for applying texture and paint on mask surfaces' },
  { name: 'Pensel & pembaris', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_197cd378a-1772539866236.png", imageAlt: 'Pencil and ruler for measuring and sketching mask designs' }]
}];


// ─── Contoh Karya Data ────────────────────────────────────────────────────────
const KARYA_DATA = [
{ title: 'Topeng Mak Yong', desc: 'Topeng yang digunakan dalam tarian Mak Yong, menggambarkan watak-watak dalam cerita rakyat Melayu.', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4ef9516f8-1789735925292.png", imageAlt: 'Traditional Mak Yong performance mask with vibrant colours and expressive Malay theatrical features' },
{ title: 'Topeng Paper Mâché', desc: 'Topeng kontemporari yang dihasilkan menggunakan teknik paper mâché dengan hiasan warna-warni.', imageUrl: "https://images.unsplash.com/photo-1734725260343-ac1d7d3d5e86", imageAlt: 'Colourful paper mache mask with decorative paint and artistic finish' },
{ title: 'Topeng Kayu Ukiran', desc: 'Topeng yang diukir daripada kayu keras dengan perincian halus mencerminkan kemahiran pengkarya.', imageUrl: "https://images.unsplash.com/photo-1640172787980-1d71322b6486", imageAlt: 'Hand-carved wooden mask with detailed facial expressions and natural wood grain' },
{ title: 'Topeng Hiasan Tradisional', desc: 'Topeng hiasan tradisional yang dihiasi dengan motif flora dan fauna khas warisan budaya tempatan.', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1867a434c-1765337445382.png", imageAlt: 'Traditional decorative mask adorned with floral and fauna motifs representing local cultural heritage' }];


// ─── Page Component ───────────────────────────────────────────────────────────
export default function TopengPage() {
  const [bookState, setBookState] = useState<BookState>('closed');
  const [currentSpread, setCurrentSpread] = useState(0); // 0 = cover, 1-4 = spreads
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
      // Open the book
      setBookState('opening');
      setTimeout(() => {
        setBookState('open');
        setCurrentSpread(1);
      }, 800);
    } else if (bookState === 'open') {
      if (currentSpread < 4) {
        // Turn to next spread
        setIsFlipping(true);
        setFlipDirection('forward');
        setTimeout(() => {
          setCurrentSpread((prev) => prev + 1);
          setIsFlipping(false);
        }, 700);
      } else {
        // Close the book
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
      style={{
        backgroundColor: '#8B0000'
      }}>

      {/* Wavy cream center shape background */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
        viewBox="0 0 1200 675"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg">
        
        {/* Navy outline (slightly larger) */}
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


































































          fill="#1a1a4e"
          opacity="0.9" />
        
        {/* Cream fill (slightly smaller / inset) */}
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
        
        {/* Subtle paper texture overlay on cream */}
        <filter id="paper">
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
          filter="url(#paper)" />
        
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
          background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,240,220,0.25) 0%, transparent 70%)'
        }} />
      

      {/* Back button */}
      <Link
        href="/projects/kraf/buku/kad"
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
          
          TOPENG
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
        
        {/* Book wrapper */}
        <div
          onClick={handleBookClick}
          style={{
            cursor: isFlipping ? 'default' : 'pointer',
            perspective: '1400px',
            perspectiveOrigin: '50% 50%'
          }}>
          
          {/* ── CLOSED BOOK ── */}
          {(isClosed || isOpening || bookState === 'closing') &&
          <ClosedBook
            isOpening={isOpening}
            isClosing={bookState === 'closing'} />

          }

          {/* ── OPEN BOOK ── */}
          {(bookState === 'open' || bookState === 'closing') && bookState !== 'closing' &&
          <OpenBook
            currentSpread={currentSpread}
            isFlipping={isFlipping}
            flipDirection={flipDirection} />

          }
        </div>

        {/* Page indicator — only when open */}
        {bookState === 'open' &&
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
            {[1, 2, 3, 4].map((n) =>
          <div
            key={n}
            style={{
              width: n === currentSpread ? 20 : 8,
              height: 8,
              borderRadius: 4,
              background: n === currentSpread ? '#8B1A1A' : 'rgba(90,26,26,0.35)',
              transition: 'all 0.3s ease',
              boxShadow: n === currentSpread ? '0 2px 6px rgba(139,26,26,0.4)' : 'none'
            }} />

          )}
          </div>
        }
      </div>

      {/* ── BOTTOM CORNER ICONS ── */}
      {/* Bahan — bottom left */}
      <button
        onClick={() => setShowBahan(true)}
        className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95"
        style={{
          bottom: '3%',
          left: '3%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8
        }}>
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/IMG_2657-1789578278816.jpeg"
          alt="Box of craft materials for mask making"
          style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '0.85rem',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '0.08em',
            textShadow: '0 1px 4px rgba(255,255,255,0.7)'
          }}>
          
          Bahan
        </span>
      </button>

      {/* Karya — bottom right */}
      <button
        onClick={() => setShowKarya(true)}
        className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95"
        style={{
          bottom: '3%',
          right: '3%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8
        }}>
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/IMG_2656-1789578278955.jpeg"
          alt="Camera for capturing mask artwork examples"
          style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '0.85rem',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '0.08em',
            textShadow: '0 1px 4px rgba(255,255,255,0.7)'
          }}>
          
          Karya
        </span>
      </button>

      {/* ── BAHAN MODAL ── */}
      {showBahan &&
      <Modal title="Bahan & Alatan" onClose={() => setShowBahan(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {BAHAN_DATA.map((section) =>
          <div key={section.category}>
                <h3
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: '#8B1A1A',
                letterSpacing: '0.06em',
                marginBottom: 12,
                borderBottom: '1px solid rgba(139,26,26,0.2)',
                paddingBottom: 4
              }}>
              
                  {section.category}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
                  {section.items.map((item) =>
              <div
                key={item.name}
                style={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: '#fff',
                  border: '1px solid rgba(139,26,26,0.12)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  style={{ width: '100%', height: 70, objectFit: 'cover', display: 'block' }} />
                
                      <div style={{ padding: '6px 8px' }}>
                        <span
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '0.72rem',
                      color: '#3D2B1F',
                      fontWeight: 600,
                      lineHeight: 1.3,
                      display: 'block'
                    }}>
                    
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
      <Modal title="Contoh Karya Topeng" onClose={() => setShowKarya(false)}>
          <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 16
          }}>
          
            {KARYA_DATA.map((karya) =>
          <div
            key={karya.title}
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              background: '#fff',
              border: '1px solid rgba(139,26,26,0.12)'
            }}>
            
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
              src={karya.imageUrl}
              alt={karya.imageAlt}
              style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
            
                <div style={{ padding: '10px 12px' }}>
                  <h4
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#8B1A1A',
                  margin: '0 0 4px'
                }}>
                
                    {karya.title}
                  </h4>
                  <p
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '0.75rem',
                  color: '#5a3a2a',
                  lineHeight: 1.5,
                  margin: 0
                }}>
                
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
        transform: isOpening ?
        'rotateY(-25deg) scale(0.95)' :
        isClosing ?
        'rotateY(-25deg) scale(0.95)' :
        'rotateY(-8deg)',
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
          background: 'linear-gradient(90deg, #7a1a3a 0%, #9e2a50 40%, #b83060 100%)',
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
          
          TOPENG
        </span>
      </div>

      {/* Book cover — front */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(145deg, #e8789a 0%, #d4547a 30%, #c03060 60%, #a82050 100%)',
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
        <div
          style={{
            position: 'absolute',
            inset: 12,
            border: '1.5px solid rgba(255,255,255,0.3)',
            borderRadius: 4,
            pointerEvents: 'none'
          }} />
        
        <div
          style={{
            position: 'absolute',
            inset: 16,
            border: '0.5px solid rgba(255,255,255,0.15)',
            borderRadius: 2,
            pointerEvents: 'none'
          }} />
        

        {/* Mask image */}
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
            src="/assets/images/IMG_2655-1789578005702.jpeg"
            alt="Blue and white Venetian mask on book cover"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          
        </div>

        {/* Title on cover */}
        <div
          style={{
            position: 'absolute',
            bottom: '14%',
            left: 0,
            right: 0,
            textAlign: 'center',
            padding: '0 16px'
          }}>
          
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              fontWeight: 900,
              color: 'rgba(255,240,230,0.97)',
              letterSpacing: '0.2em',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)'
            }}>
            
            TOPENG
          </div>
          <div
            style={{
              width: 40,
              height: 1.5,
              background: 'rgba(255,220,200,0.6)',
              margin: '6px auto 0',
              borderRadius: 1
            }} />
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
          <div
            key={i}
            style={{
              height: '5%',
              borderBottom: '0.5px solid rgba(0,0,0,0.06)'
            }} />

          )}
        </div>
      </div>
    </div>);

}

// ─── Open Book Component ──────────────────────────────────────────────────────
function OpenBook({
  currentSpread,
  isFlipping,
  flipDirection




}: {currentSpread: number;isFlipping: boolean;flipDirection: 'forward' | 'backward';}) {
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
        {/* Page shadow near binding */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 24,
            background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06))',
            pointerEvents: 'none',
            zIndex: 3
          }} />
        
      </div>

      {/* Binding */}
      <div
        style={{
          width: 'clamp(12px, 1.5vw, 20px)',
          background: 'linear-gradient(90deg, #c03060 0%, #9e2a50 40%, #c03060 60%, #a82050 100%)',
          position: 'relative',
          boxShadow: '0 0 12px rgba(0,0,0,0.3)',
          zIndex: 10,
          flexShrink: 0
        }}>
        
        {/* Binding stitches */}
        {Array.from({ length: 8 }).map((_, i) =>
        <div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: `${10 + i * 11}%`,
            transform: 'translateX(-50%)',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'rgba(255,200,180,0.5)'
          }} />

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
        {/* Page shadow near binding */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 24,
            background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.05))',
            pointerEvents: 'none',
            zIndex: 3
          }} />
        
        {/* Page number */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            right: 16,
            fontFamily: 'Georgia, serif',
            fontSize: '0.65rem',
            color: 'rgba(90,26,26,0.4)',
            letterSpacing: '0.1em',
            zIndex: 4
          }}>
          
          {currentSpread * 2}
        </div>
      </div>

      {/* Flipping page overlay */}
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
          animation: 'pageFlip 0.7s cubic-bezier(0.4,0,0.2,1) forwards',
          zIndex: 20,
          borderRadius: '0 8px 8px 0',
          boxShadow: '-8px 0 24px rgba(0,0,0,0.2)'
        }} />

      }

      <style>{`
        @keyframes pageFlip {
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
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")
        `,
        backgroundRepeat: 'repeat',
        opacity: 0.6
      }} />);


}

// ─── Left Page Content ────────────────────────────────────────────────────────
function LeftPageContent({ spread }: {spread: typeof SPREADS_DATA[0];}) {
  const s = spread as any;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vh, 14px)' }}>
      {/* Heading */}
      <div>
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
            fontWeight: 900,
            color: '#8B1A1A',
            letterSpacing: '0.06em',
            margin: 0,
            lineHeight: 1.2
          }}>
          
          {s.leftHeading}
        </h2>
        <div
          style={{
            width: 'clamp(28px, 5vw, 48px)',
            height: 2,
            background: 'linear-gradient(90deg, #8B1A1A, transparent)',
            marginTop: 5,
            borderRadius: 1
          }} />
        
      </div>

      {/* Spread 1 — Definisi left */}
      {s.leftText &&
      <p
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)',
          color: '#3D2B1F',
          lineHeight: 1.7,
          margin: 0,
          textAlign: 'justify'
        }}>
        
          {s.leftText}
        </p>
      }

      {/* Spread 1 — mask image */}
      {s.imageUrl && s.id === 1 &&
      <div
        style={{
          flex: 1,
          borderRadius: 6,
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          border: '1px solid rgba(139,26,26,0.15)',
          minHeight: 0
        }}>
        
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
          src={s.imageUrl}
          alt={s.imageAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        
        </div>
      }

      {/* Spread 2 — Ciri-ciri left items */}
      {s.leftItems &&
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>
          {s.leftItems.map((item: any) =>
        <div key={item.num} style={{ display: 'flex', gap: 8 }}>
              <div
            style={{
              width: 'clamp(16px, 2vw, 22px)',
              height: 'clamp(16px, 2vw, 22px)',
              borderRadius: '50%',
              background: '#8B1A1A',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)',
              fontWeight: 700,
              fontFamily: 'Georgia, serif',
              flexShrink: 0,
              marginTop: 1
            }}>
            
                {item.num}
              </div>
              <div>
                <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                fontWeight: 700,
                color: '#5a1a1a',
                lineHeight: 1.3
              }}>
              
                  {item.title}
                </div>
                <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)',
                color: '#5a3a2a',
                lineHeight: 1.5,
                marginTop: 2
              }}>
              
                  {item.desc}
                </div>
              </div>
            </div>
        )}
        </div>
      }

      {/* Spread 3 — Teknik left */}
      {s.leftSubheading &&
      <>
          <h3
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
            fontWeight: 700,
            color: '#8B1A1A',
            margin: 0,
            letterSpacing: '0.04em'
          }}>
          
            {s.leftSubheading}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)', flex: 1 }}>
            {s.leftTechniques?.map((t: any) =>
          <div key={t.name} style={{ borderLeft: '2px solid rgba(139,26,26,0.4)', paddingLeft: 8 }}>
                <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)',
                fontWeight: 700,
                color: '#5a1a1a'
              }}>
              
                  {t.name}
                </div>
                <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)',
                color: '#5a3a2a',
                lineHeight: 1.5,
                marginTop: 1
              }}>
              
                  {t.desc}
                </div>
              </div>
          )}
          </div>
        </>
      }

      {/* Spread 4 — Nilai Estetika left */}
      {s.id === 4 && s.leftText &&
      <p
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)',
          color: '#3D2B1F',
          lineHeight: 1.7,
          margin: 0,
          textAlign: 'justify'
        }}>
        
          {s.leftText}
        </p>
      }

      {/* Page number */}
      <div
        style={{
          marginTop: 'auto',
          fontFamily: 'Georgia, serif',
          fontSize: '0.6rem',
          color: 'rgba(90,26,26,0.35)',
          letterSpacing: '0.1em'
        }}>
        
        {spread.id * 2 - 1}
      </div>
    </div>);

}

// ─── Right Page Content ───────────────────────────────────────────────────────
function RightPageContent({ spread }: {spread: typeof SPREADS_DATA[0];}) {
  const s = spread as any;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vh, 14px)' }}>
      {/* Spread 1 — Definisi right */}
      {s.id === 1 &&
      <>
          <p
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)',
            color: '#3D2B1F',
            lineHeight: 1.7,
            margin: 0,
            textAlign: 'justify'
          }}>
          
            {s.rightText1}
          </p>
          <p
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)',
            color: '#3D2B1F',
            lineHeight: 1.7,
            margin: 0,
            textAlign: 'justify',
            fontStyle: 'italic',
            borderLeft: '2px solid rgba(139,26,26,0.3)',
            paddingLeft: 10
          }}>
          
            {s.rightText2}
          </p>
        </>
      }

      {/* Spread 2 — Ciri-ciri right items */}
      {s.rightItems &&
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>
          {s.rightItems.map((item: any) =>
        <div key={item.num} style={{ display: 'flex', gap: 8 }}>
              <div
            style={{
              width: 'clamp(16px, 2vw, 22px)',
              height: 'clamp(16px, 2vw, 22px)',
              borderRadius: '50%',
              background: '#8B1A1A',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)',
              fontWeight: 700,
              fontFamily: 'Georgia, serif',
              flexShrink: 0,
              marginTop: 1
            }}>
            
                {item.num}
              </div>
              <div>
                <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                fontWeight: 700,
                color: '#5a1a1a',
                lineHeight: 1.3
              }}>
              
                  {item.title}
                </div>
                <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)',
                color: '#5a3a2a',
                lineHeight: 1.5,
                marginTop: 2
              }}>
              
                  {item.desc}
                </div>
              </div>
            </div>
        )}
        </div>
      }

      {/* Spread 3 — Teknik right */}
      {s.rightTechniques &&
      <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)' }}>
            {s.rightTechniques.map((t: any) =>
          <div key={t.name} style={{ borderLeft: '2px solid rgba(139,26,26,0.4)', paddingLeft: 8 }}>
                <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)',
                fontWeight: 700,
                color: '#5a1a1a'
              }}>
              
                  {t.name}
                </div>
                <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)',
                color: '#5a3a2a',
                lineHeight: 1.5,
                marginTop: 1
              }}>
              
                  {t.desc}
                </div>
              </div>
          )}
          </div>
          {s.rightSubheading &&
        <h3
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
            fontWeight: 700,
            color: '#8B1A1A',
            margin: '4px 0 0',
            letterSpacing: '0.04em'
          }}>
          
              {s.rightSubheading}
            </h3>
        }
          {s.rightProcess &&
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
              {s.rightProcess.map((step: string, i: number) =>
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div
              style={{
                width: 'clamp(14px, 1.8vw, 20px)',
                height: 'clamp(14px, 1.8vw, 20px)',
                borderRadius: '50%',
                border: '1.5px solid rgba(139,26,26,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)',
                fontWeight: 700,
                color: '#8B1A1A',
                fontFamily: 'Georgia, serif',
                flexShrink: 0
              }}>
              
                    {i + 1}
                  </div>
                  <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)',
                color: '#3D2B1F',
                lineHeight: 1.4
              }}>
              
                    {step}
                  </div>
                </div>
          )}
            </div>
        }
          {/* YouTube video — Teknik Penghasilan Topeng */}
          <div style={{ marginTop: 8, borderRadius: 8, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.25)', border: '1.5px solid rgba(139,26,26,0.2)', flexShrink: 0 }}>
            <div style={{ background: 'rgba(139,26,26,0.08)', padding: '4px 8px', borderBottom: '1px solid rgba(139,26,26,0.15)' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.5rem, 0.85vw, 0.65rem)', fontWeight: 700, color: '#8B1A1A', letterSpacing: '0.04em' }}>🎬 Video: Teknik Penghasilan Topeng</span>
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
              src="https://www.youtube.com/embed/jANy6iKIMGw"
              title="Teknik Penghasilan Topeng"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} />
            
            </div>
          </div>
        </>
      }

      {/* Spread 4 — Nilai Estetika right */}
      {s.id === 4 &&
      <>
          {s.imageUrl &&
        <div
          style={{
            height: 'clamp(80px, 20vh, 160px)',
            borderRadius: 6,
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            border: '1px solid rgba(139,26,26,0.15)',
            flexShrink: 0
          }}>
          
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
            src={s.imageUrl}
            alt={s.imageAlt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          
            </div>
        }
          {[s.rightText1, s.rightText2, s.rightText3].filter(Boolean).map((text: string, i: number) =>
        <p
          key={i}
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(0.58rem, 1vw, 0.78rem)',
            color: '#3D2B1F',
            lineHeight: 1.65,
            margin: 0,
            textAlign: 'justify'
          }}>
          
              {text}
            </p>
        )}
        </>
      }
    </div>);

}

// ─── File Icon ────────────────────────────────────────────────────────────────
function FileIcon({ color }: {color: string;}) {
  return (
    <svg
      width="36"
      height="44"
      viewBox="0 0 36 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))' }}>
      
      <path
        d="M4 2H22L32 12V42H4V2Z"
        fill="rgba(255,255,255,0.85)"
        stroke={color}
        strokeWidth="1.5" />
      
      <path
        d="M22 2L32 12H22V2Z"
        fill={color}
        opacity="0.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round" />
      
      <line x1="9" y1="20" x2="27" y2="20" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <line x1="9" y1="26" x2="27" y2="26" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <line x1="9" y1="32" x2="20" y2="32" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>);

}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({
  title,
  children,
  onClose




}: {title: string;children: React.ReactNode;onClose: () => void;}) {
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
          maxWidth: 680,
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.25)',
          border: '1px solid rgba(139,26,26,0.15)',
          position: 'relative'
        }}>
        
        {/* Modal header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            paddingBottom: 12,
            borderBottom: '1.5px solid rgba(139,26,26,0.2)'
          }}>
          
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              fontWeight: 900,
              color: '#8B1A1A',
              margin: 0,
              letterSpacing: '0.06em'
            }}>
            
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(139,26,26,0.1)',
              border: '1px solid rgba(139,26,26,0.2)',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#8B1A1A',
              fontSize: '1rem',
              fontWeight: 700,
              transition: 'background 0.2s'
            }}>
            
            ×
          </button>
        </div>
        {children}
      </div>
    </div>);

}