'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// ─── Types ───────────────────────────────────────────────────────────────────
type BookState = 'closed' | 'opening' | 'open' | 'closing';

// ─── Spread Data ─────────────────────────────────────────────────────────────
const SPREADS_DATA = [
{
  id: 1,
  topic: 'Definisi',
  leftHeading: 'Definisi',
  leftText:
  'Boneka merupakan salah satu bentuk hasil kraf yang dihasilkan melalui proses pembentukan dan pengolahan pelbagai bahan bagi menghasilkan figura atau rupa yang menyerupai manusia, haiwan, watak imaginasi atau makhluk tertentu dalam saiz yang lebih kecil daripada saiz sebenar.',
  rightText1:
  'Boneka lazimnya digunakan sebagai alat permainan kanak-kanak, objek hiasan, bahan persembahan seni, alat bantu mengajar serta medium untuk menyampaikan cerita, nilai budaya dan identiti sesebuah masyarakat. Dalam konteks seni visual, penghasilan boneka melibatkan penerapan unsur seni seperti garisan, rupa, bentuk, warna, jalinan dan ruang, serta prinsip rekaan seperti imbangan, harmoni, kontra, penegasan dan kepelbagaian.',
  rightText2:
  'Oleh itu, boneka bukan sahaja mempunyai fungsi praktikal sebagai mainan atau alat persembahan, malah menjadi medium ekspresi kreatif yang membolehkan pengkarya menyampaikan idea, emosi, identiti dan makna tertentu melalui reka bentuk visualnya.',
  imageUrl:
  "https://images.unsplash.com/photo-1566238932457-7ca5f13dd38d",
  imageAlt: 'Colourful handmade fabric dolls arranged together showcasing traditional craft'
},
{
  id: 2,
  topic: 'Ciri-ciri',
  leftHeading: 'Ciri-ciri',
  leftItems: [
  {
    num: '1',
    title: 'Mempunyai bentuk figura manusia, haiwan atau watak tertentu',
    desc: 'Boneka direka bentuk menyerupai manusia, haiwan atau watak imaginasi dengan ciri-ciri fizikal yang dapat dikenali seperti kepala, badan, tangan dan kaki.'
  },
  {
    num: '2',
    title: 'Mempunyai saiz yang lebih kecil daripada saiz sebenar',
    desc: 'Boneka biasanya dihasilkan dalam saiz yang lebih kecil dan mudah dipegang, membolehkannya digunakan sebagai mainan, hiasan atau alat persembahan.'
  },
  {
    num: '3',
    title: 'Mempunyai reka bentuk yang ekspresif dan berkarakter',
    desc: 'Ciri wajah, pakaian dan aksesori pada boneka direka untuk menggambarkan emosi, personaliti atau identiti watak yang diwakilinya.'
  }],

  rightItems: [
  {
    num: '4',
    title: 'Menggunakan pelbagai bahan dan teknik penghasilan',
    desc: 'Boneka boleh dihasilkan daripada pelbagai bahan seperti kain, tanah liat, kayu, kertas, dawai dan bahan kitar semula menggunakan teknik jahitan, pembentukan, tampalan atau ukiran.'
  },
  {
    num: '5',
    title: 'Mempunyai nilai simbolik dan budaya',
    desc: 'Sesetengah boneka mempunyai hubungan dengan adat, kepercayaan, persembahan tradisional dan identiti masyarakat. Pakaian, warna dan aksesori yang digunakan boleh membawa maksud tertentu.'
  },
  {
    num: '6',
    title: 'Mempunyai nilai hiasan dan fungsi pelbagai',
    desc: 'Selain berfungsi sebagai mainan, boneka juga boleh dihasilkan sebagai karya hiasan, alat bantu mengajar, bahan pameran atau produk kraf yang bernilai tinggi.'
  },
  {
    num: '7',
    title: 'Mempunyai kreativiti dan keunikan tersendiri',
    desc: 'Reka bentuk boneka boleh diubah suai berdasarkan imaginasi, sumber ilham, tema dan konsep yang ingin diketengahkan oleh pengkarya, menjadikan setiap boneka unik.'
  }],

  imageUrl:
  "https://images.unsplash.com/photo-1643150130859-a8605e8e5873",
  imageAlt: 'Close-up of handmade doll showing detailed facial features and fabric texture'
},
{
  id: 3,
  topic: 'Teknik & Proses',
  leftHeading: 'Teknik & Proses Penghasilan',
  leftSubheading: 'Teknik',
  leftTechniques: [
  {
    name: 'Teknik jahitan',
    desc: 'Menjahit kepingan kain mengikut pola yang telah dilakar untuk membentuk badan, kepala dan anggota boneka, kemudian diisi dengan bahan pengisi.'
  },
  {
    name: 'Teknik pembentukan (tanah liat)',
    desc: 'Membentuk kepala atau bahagian tertentu boneka menggunakan tanah liat atau clay polimer dengan tangan atau alatan khas.'
  },
  {
    name: 'Teknik tampalan (paper mâché)',
    desc: 'Menampal lapisan kertas yang dicampurkan dengan bahan pelekat pada acuan untuk membentuk kepala atau badan boneka yang kukuh.'
  },
  {
    name: 'Teknik lilitan dan anyaman',
    desc: 'Melilitkan atau menganyam benang, tali atau dawai untuk membentuk struktur badan atau rambut boneka.'
  }],

  rightTechniques: [
  {
    name: 'Teknik mewarna dan menghias',
    desc: 'Mengaplikasikan cat atau bahan pewarna pada permukaan boneka untuk membentuk ciri wajah, pakaian dan penegasan visual.'
  },
  {
    name: 'Teknik hiasan dan aksesori',
    desc: 'Menambahkan elemen seperti rambut, pakaian, manik, butang, reben atau bahan lain untuk melengkapkan penampilan boneka.'
  }],

  rightSubheading: 'Proses Penghasilan',
  rightProcess: [
  'Menentukan tema dan watak boneka',
  'Menghasilkan lakaran idea dan pola',
  'Menyediakan bahan dan alatan',
  'Membina struktur atau rangka asas',
  'Membentuk kepala dan anggota badan',
  'Menyiapkan pakaian dan aksesori',
  'Mewarna dan menghias permukaan',
  'Kemasan dan penilaian akhir']
},
{
  id: 4,
  topic: 'Nilai Estetika',
  leftHeading: 'Nilai Estetika',
  leftText:
  'Nilai estetika dalam kraf boneka dapat dilihat melalui keupayaan pengkarya mengolah bentuk, warna, jalinan, pakaian dan perincian secara terancang sehingga menghasilkan figura yang menarik secara visual dan berkarakter. Penggunaan bentuk yang jelas dan seimbang dapat membentuk personaliti boneka, manakala kombinasi warna yang sesuai mampu mewujudkan harmoni, kontra dan penegasan.',
  rightText1:
  'Jalinan yang dihasilkan melalui penggunaan kain, benang, manik atau bahan hiasan pula memberikan variasi pada permukaan serta meningkatkan pengalaman visual dan sentuhan terhadap karya. Pemilihan pakaian dan aksesori yang tepat turut menyumbang kepada keindahan keseluruhan boneka.',
  rightText2:
  'Selain itu, nilai estetika boneka turut berkait dengan keaslian idea, kreativiti dan identiti budaya yang ditampilkan. Pemilihan motif, corak pakaian dan warna tertentu dapat memberikan makna yang lebih mendalam kepada karya, khususnya apabila boneka diinspirasikan daripada watak tradisional atau warisan budaya tempatan.',
  rightText3:
  'Dengan demikian, boneka bukan sekadar objek mainan atau hiasan, tetapi dapat berfungsi sebagai karya seni yang menggabungkan aspek keindahan, kreativiti, fungsi dan nilai budaya yang tinggi.',
  imageUrl:
  "https://images.unsplash.com/photo-1660092450357-bcef45a02568",
  imageAlt: 'Artistic arrangement of handcrafted dolls with colourful clothing showing aesthetic details'
}];


// ─── Bahan Modal Data ─────────────────────────────────────────────────────────
const BAHAN_DATA = [
{
  category: 'Bahan Asas',
  items: [
  {
    name: 'Kain kapas / kain felt',
    imageUrl: "https://images.unsplash.com/photo-1594255385954-d287c2b6024e",
    imageAlt: 'Colourful felt fabric sheets used as base material for doll making'
  },
  {
    name: 'Tanah liat polimer',
    imageUrl: "https://images.unsplash.com/photo-1725570794570-a32088926714",
    imageAlt: 'Colourful polymer clay blocks used for sculpting doll heads and parts'
  },
  {
    name: 'Kertas surat khabar',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_461eaab96-1789579165815.png",
    imageAlt: 'Stack of newspapers used as base material for paper mache doll making'
  },
  {
    name: 'Dawai / rangka wayar',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_160b46319-1772154844870.png",
    imageAlt: 'Wire armature frame used as internal skeleton for poseable dolls'
  },
  {
    name: 'Bahan pengisi (kapas / dakron)',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_134393a51-1779112788073.png",
    imageAlt: 'White cotton stuffing material used to fill fabric dolls'
  }]

},
{
  category: 'Bahan Pelekat',
  items: [
  {
    name: 'Gam PVA',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_49c73caa6-1789581758944.png",
    imageAlt: 'White PVA glue bottle used for craft adhesive in doll making'
  },
  {
    name: 'Gam tembak (hot glue)',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1de1fc233-1785313710879.png",
    imageAlt: 'Hot glue gun and glue sticks for assembling doll parts'
  },
  {
    name: 'Gam kanji (tepung + air)',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_465138942-1789579769718.png",
    imageAlt: 'Bowl of starch paste made from flour and water for paper mache dolls'
  }]

},
{
  category: 'Bahan Hiasan',
  items: [
  {
    name: 'Cat akrilik',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_16346260c-1784125766783.png",
    imageAlt: 'Tubes and bottles of acrylic paint in various colours for decorating dolls'
  },
  {
    name: 'Benang sulam / benang wol',
    imageUrl: "https://images.unsplash.com/photo-1735232057989-6fddf56bdfe8",
    imageAlt: 'Colourful embroidery and wool threads used for doll hair and decoration'
  },
  {
    name: 'Manik-manik & butang',
    imageUrl: "https://images.unsplash.com/photo-1652379544320-f64588928c37",
    imageAlt: 'Colourful beads and buttons for decorating handmade dolls'
  },
  {
    name: 'Kain perca & reben',
    imageUrl: "https://images.unsplash.com/photo-1649537984082-3d5e69996a4b",
    imageAlt: 'Colourful fabric scraps and ribbons used for doll clothing and accessories'
  },
  {
    name: 'Rambut palsu / benang rami',
    imageUrl: "https://images.unsplash.com/photo-1568551320200-047e7f87a4d4",
    imageAlt: 'Yarn and synthetic hair material used for making doll hair'
  },
  {
    name: 'Mata boneka (googly eyes)',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_46dd20cc1-1789579772523.png",
    imageAlt: 'Plastic googly eyes and button eyes used for doll facial features'
  }]

},
{
  category: 'Alatan',
  items: [
  {
    name: 'Jarum & benang jahit',
    imageUrl: "https://images.unsplash.com/photo-1546023769-a9fb54328a31",
    imageAlt: 'Sewing needles and colourful thread spools for stitching fabric doll parts together'
  },
  {
    name: 'Gunting',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1974161ee-1767697890931.png",
    imageAlt: 'Sharp craft scissors for cutting fabric and materials in doll making'
  },
  {
    name: 'Berus cat',
    imageUrl: 'https://img.rocket.new/generatedImages/rocket_gen_img_1500d02d4-1773080686081.png',
    imageAlt: 'Set of paint brushes of various sizes for painting doll faces and details'
  },
  {
    name: 'Pensel & pembaris',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_18ec18f89-1772077437209.png",
    imageAlt: 'Pencil and ruler for measuring and tracing doll patterns'
  },
  {
    name: 'Pisau pemotong',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_47410091f-1789579168782.png",
    imageAlt: 'Craft cutting knife for trimming clay and materials in doll making'
  },
  {
    name: 'Mesin jahit (pilihan)',
    imageUrl: "https://images.unsplash.com/photo-1641320197434-6ae0ca235048",
    imageAlt: 'Sewing machine optionally used for stitching fabric doll bodies efficiently'
  }]
}];


// ─── Contoh Karya Data ────────────────────────────────────────────────────────
const KARYA_DATA = [
{
  title: 'Boneka Wayang Golek',
  desc: 'Boneka wayang golek yang diukir daripada kayu dengan pakaian tradisional Jawa yang kaya warna, digunakan dalam persembahan wayang tradisional.',
  imageUrl: "https://images.unsplash.com/photo-1679936052466-75c1aec75f8b",
  imageAlt: 'Colourful wooden wayang golek puppet with traditional Javanese costume and detailed carving'
},
{
  title: 'Boneka Tanah Liat',
  desc: 'Boneka yang dihasilkan menggunakan tanah liat polimer dengan perincian wajah yang halus dan pakaian yang diwarnakan dengan cat akrilik.',
  imageUrl: "https://images.unsplash.com/photo-1728412386980-dbf5bb6bf846",
  imageAlt: 'Handcrafted clay doll with detailed painted facial features and colourful clothing'
},
{
  title: 'Boneka Wayang Kulit',
  desc: 'Boneka wayang kulit yang diperbuat daripada kulit lembu atau kerbau, diukir dengan motif tradisional dan digunakan dalam persembahan wayang.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_12b3b1e4e-1777630733117.png",
  imageAlt: 'Traditional shadow puppet wayang kulit made from leather with intricate carved patterns'
},
{
  title: 'Boneka Benang & Kain Felt',
  desc: 'Boneka kontemporari yang dihasilkan menggunakan kain felt dan benang wol dengan reka bentuk yang kreatif dan warna-warni.',
  imageUrl: "https://images.unsplash.com/photo-1735232057989-6fddf56bdfe8",
  imageAlt: 'Colourful felt and yarn doll with creative contemporary design and bright colours'
}];


// ─── Page Component ───────────────────────────────────────────────────────────
export default function BonekaPage() {
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

  const isOpening = bookState === 'opening';
  const isClosed = bookState === 'closed';
  const isOpen = bookState === 'open';

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ backgroundColor: '#0a2a5e', height: '100dvh', display: 'flex', flexDirection: 'column' }}>

      {/* Wavy cream center shape background */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
        viewBox="0 0 1200 675"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M 60 180 C 80 140, 120 100, 160 130 C 200 160, 180 80, 240 70 C 300 60, 320 120, 380 100 C 440 80, 460 40, 520 50 C 580 60, 600 110, 660 90 C 720 70, 740 30, 800 50 C 860 70, 880 120, 940 110 C 1000 100, 1020 60, 1080 80 C 1140 100, 1160 150, 1150 200 C 1140 250, 1100 280, 1120 330 C 1140 380, 1160 420, 1140 470 C 1120 520, 1060 540, 1020 510 C 980 480, 960 530, 900 545 C 840 560, 820 510, 760 530 C 700 550, 680 590, 620 580 C 560 570, 540 520, 480 540 C 420 560, 400 600, 340 590 C 280 580, 260 530, 200 520 C 140 510, 100 550, 70 510 C 40 470, 50 420, 60 380 C 70 340, 40 300, 50 260 C 60 220, 40 220, 60 180 Z" fill="#061830" opacity="0.9" />
        <path d="M 80 190 C 98 152, 135 115, 172 143 C 209 171, 192 95, 250 85 C 308 75, 328 132, 386 112 C 444 92, 464 54, 522 64 C 580 74, 600 122, 658 103 C 716 84, 736 46, 793 66 C 850 86, 870 133, 928 122 C 986 111, 1006 72, 1062 92 C 1118 112, 1136 160, 1126 208 C 1116 256, 1078 284, 1097 332 C 1116 380, 1134 418, 1114 464 C 1094 510, 1036 528, 998 500 C 960 472, 942 520, 884 534 C 826 548, 806 500, 748 519 C 690 538, 672 576, 614 566 C 556 556, 538 508, 478 526 C 418 544, 400 582, 342 572 C 284 562, 264 514, 206 504 C 148 494, 110 532, 82 494 C 54 456, 64 408, 74 370 C 84 332, 58 294, 68 254 C 78 214, 62 228, 80 190 Z" fill="#ddeeff" />
      </svg>

      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='none'/%3E%3Ccircle cx='1' cy='1' r='0.5' fill='rgba(0,0,0,0.04)'/%3E%3Ccircle cx='3' cy='3' r='0.5' fill='rgba(0,0,0,0.04)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(180,220,255,0.2) 0%, transparent 70%)' }} />

      {/* Back button */}
      <Link
        href="/projects/kraf/buku/kad"
        className="absolute top-3 left-3 z-50 flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:scale-105"
        style={{ background: 'rgba(255,255,255,0.88)', boxShadow: '0 2px 12px rgba(0,0,0,0.25)', color: '#1a3a6e', fontWeight: 700, fontSize: '0.75rem', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="#1a3a6e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Back
      </Link>

      {/* Page title */}
      <div className="absolute z-30 w-full flex justify-center" style={{ top: '2%' }}>
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 900, letterSpacing: '0.18em', color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.5)', lineHeight: 1 }}>BONEKA</h1>
      </div>

      {/* ── BOOK CONTAINER — fills remaining space ── */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: 0,
          right: 0,
          bottom: '12%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          gap: 8
        }}>

        <div
          onClick={handleBookClick}
          style={{ cursor: isFlipping ? 'default' : 'pointer', perspective: '1400px', perspectiveOrigin: '50% 50%', width: '100%', display: 'flex', justifyContent: 'center' }}>

          {(isClosed || isOpening || bookState === 'closing') &&
          <ClosedBook isOpening={isOpening} isClosing={bookState === 'closing'} />
          }

          {isOpen &&
          <OpenBook currentSpread={currentSpread} isFlipping={isFlipping} flipDirection={flipDirection} />
          }
        </div>

        {isOpen &&
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {[1, 2, 3, 4].map((n) =>
          <div key={n} style={{ width: n === currentSpread ? 20 : 8, height: 8, borderRadius: 4, background: n === currentSpread ? '#1a5fb4' : 'rgba(26,63,140,0.35)', transition: 'all 0.3s ease', boxShadow: n === currentSpread ? '0 2px 6px rgba(26,95,180,0.4)' : 'none' }} />
          )}
          </div>
        }
      </div>

      {/* ── BOTTOM CORNER ICONS — fixed at bottom, won't overlap book ── */}
      <button
        onClick={() => setShowBahan(true)}
        className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95"
        style={{ bottom: '2%', left: '2%', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2657-1789578278816.jpeg" alt="Box of craft materials for doll making" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.75rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>Bahan</span>
      </button>

      <button
        onClick={() => setShowKarya(true)}
        className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95"
        style={{ bottom: '2%', right: '2%', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2656-1789578278955.jpeg" alt="Camera for capturing boneka artwork examples" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.75rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>Karya</span>
      </button>

      {/* ── BAHAN MODAL ── */}
      {showBahan &&
      <Modal title="Bahan & Alatan" onClose={() => setShowBahan(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {BAHAN_DATA.map((section) =>
          <div key={section.category}>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', fontWeight: 700, color: '#1a5fb4', letterSpacing: '0.06em', marginBottom: 12, borderBottom: '1px solid rgba(26,95,180,0.2)', paddingBottom: 4 }}>{section.category}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
                  {section.items.map((item) =>
              <div key={item.name} style={{ borderRadius: 8, overflow: 'hidden', background: '#fff', border: '1px solid rgba(26,95,180,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt={item.imageAlt} style={{ width: '100%', height: 70, objectFit: 'cover', display: 'block' }} />
                      <div style={{ padding: '6px 8px' }}><span style={{ fontFamily: 'Georgia, serif', fontSize: '0.72rem', color: '#1a3a6e', fontWeight: 600, lineHeight: 1.3, display: 'block' }}>{item.name}</span></div>
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
      <Modal title="Contoh Karya Boneka" onClose={() => setShowKarya(false)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {KARYA_DATA.map((karya) =>
          <div key={karya.title} style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', background: '#fff', border: '1px solid rgba(26,95,180,0.12)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={karya.imageUrl} alt={karya.imageAlt} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '10px 12px' }}>
                  <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 700, color: '#1a5fb4', margin: '0 0 4px' }}>{karya.title}</h4>
                  <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.75rem', color: '#1a3a6e', lineHeight: 1.5, margin: 0 }}>{karya.desc}</p>
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
    <div style={{ width: 'clamp(180px, 28vw, 320px)', height: 'clamp(260px, 48vh, 480px)', position: 'relative', transformStyle: 'preserve-3d', transform: isOpening || isClosing ? 'rotateY(-25deg) scale(0.95)' : 'rotateY(-8deg)', transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.45)) drop-shadow(0 8px 20px rgba(0,0,0,0.3))' }}>
      <div style={{ position: 'absolute', left: -24, top: 0, width: 24, height: '100%', background: 'linear-gradient(90deg, #0d3a7a 0%, #1a5fb4 40%, #2070d0 100%)', transformOrigin: 'right center', transform: 'rotateY(-90deg)', borderRadius: '4px 0 0 4px', boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.5rem, 0.9vw, 0.7rem)', fontWeight: 700, color: 'rgba(200,230,255,0.9)', letterSpacing: '0.12em', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>BONEKA</span>
      </div>
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg, #78b4e8 0%, #4a90d9 30%, #2060c0 60%, #1040a0 100%)', borderRadius: '2px 8px 8px 2px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 10, border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: '72%', height: '48%', borderRadius: 6, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.25)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/IMG_2655-1789578005702.jpeg" alt="Boneka craft book cover image" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '12%', left: 0, right: 0, textAlign: 'center', padding: '0 16px' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.85rem, 2vw, 1.3rem)', fontWeight: 900, color: 'rgba(230,245,255,0.97)', letterSpacing: '0.2em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>BONEKA</div>
        </div>
        <div style={{ position: 'absolute', right: -6, top: 4, bottom: 4, width: 6, background: 'linear-gradient(90deg, #f0f4f8 0%, #e8eef4 50%, #dde4ec 100%)', borderRadius: '0 2px 2px 0', boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.15)' }}>
          {Array.from({ length: 20 }).map((_, i) => <div key={i} style={{ height: '5%', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }} />)}
        </div>
      </div>
    </div>);
}

// ─── Open Book Component ──────────────────────────────────────────────────────
function OpenBook({ currentSpread, isFlipping, flipDirection }: {currentSpread: number;isFlipping: boolean;flipDirection: 'forward' | 'backward';}) {
  const spread = SPREADS_DATA[currentSpread - 1];

  return (
    <div style={{ width: 'clamp(320px, 90vw, 1100px)', height: 'clamp(220px, 62vh, 560px)', position: 'relative', display: 'flex', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 12px 30px rgba(0,0,0,0.35))' }}>
      {/* Left page */}
      <div style={{ flex: 1, background: 'linear-gradient(105deg, #f0f6ff 0%, #e8f0fb 100%)', borderRadius: '8px 0 0 8px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.08)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-5deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'right center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(10px, 1.8vw, 20px)', height: '100%', overflowY: 'auto' }}>
          {spread && <LeftPageContent spread={spread} />}
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06))', pointerEvents: 'none', zIndex: 3 }} />
      </div>

      {/* Binding */}
      <div style={{ width: 'clamp(10px, 1.2vw, 16px)', background: 'linear-gradient(90deg, #1a5fb4 0%, #0d3a7a 40%, #1a5fb4 60%, #0d3a7a 100%)', position: 'relative', boxShadow: '0 0 12px rgba(0,0,0,0.3)', zIndex: 10, flexShrink: 0 }}>
        {Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: '50%', top: `${10 + i * 11}%`, transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'rgba(180,210,255,0.5)' }} />)}
      </div>

      {/* Right page */}
      <div style={{ flex: 1, background: 'linear-gradient(75deg, #e8f0fb 0%, #f0f6ff 100%)', borderRadius: '0 8px 8px 0', position: 'relative', overflow: 'hidden', boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.06)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-180deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'left center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(10px, 1.8vw, 20px)', height: '100%', overflowY: 'auto' }}>
          {spread && <RightPageContent spread={spread} />}
        </div>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.05))', pointerEvents: 'none', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 8, right: 12, fontFamily: 'Georgia, serif', fontSize: '0.6rem', color: 'rgba(26,63,140,0.4)', letterSpacing: '0.1em', zIndex: 4 }}>{currentSpread * 2}</div>
      </div>

      {isFlipping &&
      <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'linear-gradient(105deg, #e8f0fb 0%, #f0f6ff 100%)', transformOrigin: 'left center', animation: 'pageFlipBlue 0.7s cubic-bezier(0.4,0,0.2,1) forwards', zIndex: 20, borderRadius: '0 8px 8px 0', boxShadow: '-8px 0 24px rgba(0,0,0,0.2)' }} />
      }

      <style>{`
        @keyframes pageFlipBlue {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(-90deg); box-shadow: -20px 0 40px rgba(0,0,0,0.3); }
          100% { transform: rotateY(-180deg); }
        }
      `}</style>
    </div>);
}

function PageTexture() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', opacity: 0.6 }} />);

}

function LeftPageContent({ spread }: {spread: (typeof SPREADS_DATA)[0];}) {
  const s = spread as any;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.2vh, 12px)' }}>
      <div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.8rem, 1.8vw, 1.2rem)', fontWeight: 900, color: '#1a5fb4', letterSpacing: '0.06em', margin: 0, lineHeight: 1.2 }}>{s.leftHeading}</h2>
        <div style={{ width: 'clamp(24px, 4vw, 40px)', height: 2, background: 'linear-gradient(90deg, #1a5fb4, transparent)', marginTop: 4, borderRadius: 1 }} />
      </div>
      {s.leftText && s.id !== 4 &&
      <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: '#1a3a6e', lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{s.leftText}</p>
      }
      {s.imageUrl && s.id === 1 &&
      <div style={{ flex: 1, borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: '1px solid rgba(26,95,180,0.15)', minHeight: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      }
      {s.leftItems &&
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 9px)', flex: 1 }}>
          {s.leftItems.map((item: any) =>
        <div key={item.num} style={{ display: 'flex', gap: 7 }}>
              <div style={{ width: 'clamp(14px, 1.8vw, 20px)', height: 'clamp(14px, 1.8vw, 20px)', borderRadius: '50%', background: '#1a5fb4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div>
              <div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', fontWeight: 700, color: '#0d3a7a', lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)', color: '#1a3a6e', lineHeight: 1.45, marginTop: 1 }}>{item.desc}</div>
              </div>
            </div>
        )}
        </div>
      }
      {s.leftSubheading &&
      <>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1.1vw, 0.8rem)', fontWeight: 700, color: '#1a5fb4', margin: 0, letterSpacing: '0.04em' }}>{s.leftSubheading}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.7vh, 7px)', flex: 1 }}>
            {s.leftTechniques?.map((t: any) =>
          <div key={t.name} style={{ borderLeft: '2px solid rgba(26,95,180,0.4)', paddingLeft: 7 }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.88vw, 0.68rem)', fontWeight: 700, color: '#0d3a7a' }}>{t.name}</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.48rem, 0.78vw, 0.62rem)', color: '#1a3a6e', lineHeight: 1.45, marginTop: 1 }}>{t.desc}</div>
              </div>
          )}
          </div>
        </>
      }
      {s.id === 4 && s.leftText &&
      <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: '#1a3a6e', lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{s.leftText}</p>
      }
      <div style={{ marginTop: 'auto', fontFamily: 'Georgia, serif', fontSize: '0.55rem', color: 'rgba(26,63,140,0.35)', letterSpacing: '0.1em' }}>{spread.id * 2 - 1}</div>
    </div>);
}

function RightPageContent({ spread }: {spread: (typeof SPREADS_DATA)[0];}) {
  const s = spread as any;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.2vh, 12px)' }}>
      {s.id === 1 &&
      <>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: '#1a3a6e', lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{s.rightText1}</p>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: '#1a3a6e', lineHeight: 1.65, margin: 0, textAlign: 'justify', fontStyle: 'italic', borderLeft: '2px solid rgba(26,95,180,0.3)', paddingLeft: 10 }}>{s.rightText2}</p>
        </>
      }
      {s.rightItems &&
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 9px)', flex: 1 }}>
          {s.rightItems.map((item: any) =>
        <div key={item.num} style={{ display: 'flex', gap: 7 }}>
              <div style={{ width: 'clamp(14px, 1.8vw, 20px)', height: 'clamp(14px, 1.8vw, 20px)', borderRadius: '50%', background: '#1a5fb4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div>
              <div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', fontWeight: 700, color: '#0d3a7a', lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)', color: '#1a3a6e', lineHeight: 1.45, marginTop: 1 }}>{item.desc}</div>
              </div>
            </div>
        )}
        </div>
      }
      {s.rightTechniques &&
      <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.7vh, 7px)' }}>
            {s.rightTechniques.map((t: any) =>
          <div key={t.name} style={{ borderLeft: '2px solid rgba(26,95,180,0.4)', paddingLeft: 7 }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.88vw, 0.68rem)', fontWeight: 700, color: '#0d3a7a' }}>{t.name}</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.48rem, 0.78vw, 0.62rem)', color: '#1a3a6e', lineHeight: 1.45, marginTop: 1 }}>{t.desc}</div>
              </div>
          )}
          </div>
          {s.rightSubheading &&
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1.1vw, 0.8rem)', fontWeight: 700, color: '#1a5fb4', margin: '2px 0 0', letterSpacing: '0.04em' }}>{s.rightSubheading}</h3>
        }
          {s.rightProcess &&
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {s.rightProcess.map((step: string, i: number) =>
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 'clamp(12px, 1.6vw, 18px)', height: 'clamp(12px, 1.6vw, 18px)', borderRadius: '50%', border: '1.5px solid rgba(26,95,180,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)', fontWeight: 700, color: '#1a5fb4', fontFamily: 'Georgia, serif', flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.5rem, 0.85vw, 0.65rem)', color: '#1a3a6e', lineHeight: 1.35 }}>{step}</div>
                </div>
          )}
            </div>
        }
          {/* YouTube Video for Teknik spread */}
        </>
      }
      {s.id === 4 &&
      <>
          {s.imageUrl &&
        <div style={{ height: 'clamp(60px, 16vh, 130px)', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: '1px solid rgba(26,95,180,0.15)', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
        }
          {[s.rightText1, s.rightText2, s.rightText3].filter(Boolean).map((text: string, i: number) =>
        <p key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.95vw, 0.75rem)', color: '#1a3a6e', lineHeight: 1.6, margin: 0, textAlign: 'justify' }}>{text}</p>
        )}
        </>
      }
    </div>);
}

function Modal({ title, children, onClose }: {title: string;children: React.ReactNode;onClose: () => void;}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #f0f6ff 0%, #e8f0fb 100%)', borderRadius: 16, padding: 'clamp(16px, 2.5vw, 28px)', maxWidth: 680, width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.25)', border: '1px solid rgba(26,95,180,0.15)', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 10, borderBottom: '1.5px solid rgba(26,95,180,0.2)' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)', fontWeight: 900, color: '#1a5fb4', margin: 0, letterSpacing: '0.06em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'rgba(26,95,180,0.1)', border: '1px solid rgba(26,95,180,0.2)', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1a5fb4', fontSize: '1rem', fontWeight: 700 }}>×</button>
        </div>
        {children}
      </div>
    </div>);
}