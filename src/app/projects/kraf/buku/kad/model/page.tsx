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
  'Model merupakan salah satu bentuk hasil kraf tiga dimensi yang dihasilkan sebagai replika, representasi atau gambaran berskala kecil bagi sesebuah objek, bangunan, kenderaan, makhluk hidup atau konsep tertentu. Model dibina dengan menggunakan pelbagai bahan dan teknik bagi menghasilkan bentuk yang menyerupai objek asal dengan ketepatan dan perincian yang tinggi.',
  rightText1:
  'Model lazimnya digunakan sebagai bahan pameran, alat bantu mengajar, prototaip reka bentuk, koleksi peribadi, bahan kajian saintifik serta medium untuk mendokumentasikan warisan seni bina, kenderaan bersejarah dan fenomena alam. Dalam konteks seni visual, penghasilan model melibatkan penerapan unsur seni seperti garisan, rupa, bentuk, warna, jalinan, ruang dan nilai, serta prinsip rekaan seperti imbangan, harmoni, perkadaran dan penegasan.',
  rightText2:
  'Oleh itu, model bukan sahaja berfungsi sebagai replika visual semata-mata, malah menjadi medium ekspresi kreatif yang membolehkan pengkarya menyampaikan idea, ketelitian teknikal, identiti budaya dan makna tertentu melalui pembinaan dan perincian yang terancang.',
  imageUrl: "https://images.unsplash.com/photo-1691317836447-2710cac29f1e",
  imageAlt: 'Detailed scale model showing precise craftsmanship and accurate proportions'
},
{
  id: 2,
  topic: 'Ciri-ciri',
  leftHeading: 'Ciri-ciri',
  leftItems: [
  { num: '1', title: 'Mempunyai skala dan perkadaran yang tepat', desc: 'Model dihasilkan mengikut skala tertentu yang konsisten supaya hubungan antara bahagian-bahagian model mencerminkan perkadaran objek asal dengan tepat dan realistik.' },
  { num: '2', title: 'Menggambarkan objek asal dengan perincian yang tinggi', desc: 'Model yang baik mempunyai perincian yang teliti termasuk tekstur permukaan, warna, corak dan ciri-ciri khusus yang menjadikannya mudah dikenali dan realistik.' },
  { num: '3', title: 'Menggunakan pelbagai bahan yang sesuai', desc: 'Pemilihan bahan untuk model bergantung kepada jenis model yang dihasilkan — kayu untuk model seni bina, plastik untuk model kenderaan, tanah liat untuk model figura dan sebagainya.' }],

  rightItems: [
  { num: '4', title: 'Mempunyai struktur yang kukuh dan stabil', desc: 'Model perlu dibina dengan struktur dalaman yang kukuh supaya dapat berdiri sendiri, tahan lama dan mengekalkan bentuknya dalam jangka masa yang panjang.' },
  { num: '5', title: 'Mempunyai nilai dokumentasi dan pendidikan', desc: 'Model berfungsi sebagai dokumen visual yang merakamkan reka bentuk, struktur dan ciri-ciri objek asal, menjadikannya alat bantu mengajar dan bahan rujukan yang berharga.' },
  { num: '6', title: 'Mempunyai nilai estetika dan artistik', desc: 'Selain ketepatan teknikal, model turut mempunyai nilai estetika melalui kemasan permukaan, pewarnaan, pencahayaan dan persembahan keseluruhan yang menarik secara visual.' },
  { num: '7', title: 'Mempunyai kreativiti dan keunikan tersendiri', desc: 'Walaupun model bertujuan mereplikasi objek asal, pengkarya masih boleh menerapkan kreativiti dalam pemilihan bahan, teknik kemasan dan cara persembahan yang unik.' }],

  imageUrl: "https://images.unsplash.com/photo-1690309184952-55acd26de873",
  imageAlt: 'Close-up of scale model showing intricate details and careful construction techniques'
},
{
  id: 3,
  topic: 'Teknik & Proses',
  leftHeading: 'Teknik & Proses Penghasilan',
  leftSubheading: 'Teknik',
  leftTechniques: [
  { name: 'Teknik binaan (scratch building)', desc: 'Membina model dari awal menggunakan bahan mentah seperti kayu, plastik, kadbod atau logam tanpa menggunakan kit sedia ada, memerlukan kemahiran dan kreativiti yang tinggi.' },
  { name: 'Teknik pemasangan kit (kit assembly)', desc: 'Memasang komponen model yang telah siap dibentuk daripada kit plastik atau kayu mengikut arahan, kemudian mewarna dan menghias untuk menghasilkan model yang lengkap.' },
  { name: 'Teknik pengacuan (casting/moulding)', desc: 'Menggunakan acuan untuk menghasilkan komponen model secara berulang menggunakan bahan seperti resin, plaster atau getah silikon.' },
  { name: 'Teknik pengukiran dan pembentukan', desc: 'Mengukir atau membentuk bahan seperti kayu, busa polystyrene atau tanah liat untuk menghasilkan bentuk dan perincian yang dikehendaki pada model.' }],

  rightTechniques: [
  { name: 'Teknik pengecatan dan kemasan', desc: 'Mengaplikasikan cat, varnish, wash dan teknik kemasan khas untuk menghasilkan warna, tekstur, kesan cuaca dan realisme pada permukaan model.' },
  { name: 'Teknik diorama dan persembahan', desc: 'Menyediakan tapak atau latar belakang yang sesuai untuk mempersembahkan model dalam konteks yang realistik dan menarik secara visual.' }],

  rightSubheading: 'Proses Penghasilan',
  rightProcess: [
  'Menentukan jenis dan skala model',
  'Mengumpul rujukan dan pelan teknikal',
  'Menyediakan bahan dan alatan',
  'Membina struktur rangka asas',
  'Membentuk dan memasang komponen utama',
  'Menambah perincian dan tekstur permukaan',
  'Mewarna, menghias dan kemasan akhir',
  'Menyediakan tapak dan persembahan model']
},
{
  id: 4,
  topic: 'Nilai Estetika',
  leftHeading: 'Nilai Estetika',
  leftText:
  'Nilai estetika dalam kraf model dapat dilihat melalui keupayaan pengkarya mengolah bahan, bentuk, warna, jalinan dan perincian secara terancang sehingga menghasilkan replika yang menarik secara visual dan realistik. Ketepatan perkadaran dan skala yang konsisten menyumbang kepada keindahan visual model, manakala kemasan permukaan yang teliti mampu mewujudkan ilusi bahan, tekstur dan kedalaman yang memukau.',
  rightText1:
  'Teknik pengecatan yang mahir termasuk penggunaan wash, dry brushing dan teknik kemasan khas dapat meningkatkan realisme model dengan ketara. Pemilihan warna yang tepat dan konsisten dengan objek asal pula memastikan model kelihatan autentik dan bernilai tinggi.',
  rightText2:
  'Selain itu, nilai estetika model turut berkait dengan cara persembahan dan kontekstualisasi karya. Penyediaan tapak diorama yang sesuai, pencahayaan yang tepat dan latar belakang yang harmoni dapat meningkatkan kesan visual keseluruhan dan menjadikan model lebih bercerita.',
  rightText3:
  'Dengan demikian, model bukan sekadar replika teknikal, tetapi merupakan karya seni yang menggabungkan aspek keindahan, ketepatan teknikal, kreativiti dan nilai dokumentasi yang tinggi.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_404dba9bc-1789581760524.png",
  imageAlt: 'Artistic display of scale model with careful lighting showing aesthetic presentation'
}];


const BAHAN_DATA = [
{
  category: 'Bahan Asas',
  items: [
  { name: 'Kayu balsa / kayu lapis', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_17a0434d5-1772111175384.png", imageAlt: 'Balsa wood sheets for building scale model structures' },
  { name: 'Plastik styrene (plastik model)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4a9595b51-1789581761166.png", imageAlt: 'Styrene plastic sheets for model construction' },
  { name: 'Tanah liat polimer', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_123fa093f-1772558274644.png", imageAlt: 'Polymer clay for sculpting model figures and details' },
  { name: 'Resin / plaster of Paris', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4b329eef3-1789581760899.png", imageAlt: 'Resin and plaster for casting model components' },
  { name: 'Kadbod tebal / foam board', imageUrl: "https://images.unsplash.com/photo-1649826209197-21a3462db6ac", imageAlt: 'Thick cardboard and foam board for model base construction' }]

},
{
  category: 'Bahan Pelekat',
  items: [
  { name: 'Gam plastik model (cement)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_49c73caa6-1789581758944.png", imageAlt: 'Plastic model cement glue for bonding styrene parts' },
  { name: 'Gam tembak (hot glue)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4763bca15-1789581759456.png", imageAlt: 'Hot glue gun for assembling model components' },
  { name: 'Gam epoksi (epoxy)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_14846f57f-1783684964995.png", imageAlt: 'Two-part epoxy adhesive for strong model joints' }]

},
{
  category: 'Bahan Hiasan & Kemasan',
  items: [
  { name: 'Cat akrilik / cat model', imageUrl: "https://images.unsplash.com/photo-1640520941506-36aedf1f14e1", imageAlt: 'Acrylic and model paints for finishing scale models' },
  { name: 'Varnish / clear coat', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_179270537-1769855645152.png", imageAlt: 'Varnish and clear coat for protecting and finishing models' },
  { name: 'Pasir & batu kecil (tapak)', imageUrl: "https://images.unsplash.com/photo-1572788689625-a60845736f9f", imageAlt: 'Sand and pebbles for creating realistic model base terrain' },
  { name: 'Rumput tiruan & moss', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4a904767c-1789581759769.png", imageAlt: 'Artificial grass and moss for model diorama bases' },
  { name: 'Foil logam / dawai', imageUrl: "https://images.unsplash.com/photo-1691317836447-2710cac29f1e", imageAlt: 'Metal foil and wire for adding metallic details to models' }]

},
{
  category: 'Alatan',
  items: [
  { name: 'Berus cat pelbagai saiz', imageUrl: "https://images.unsplash.com/photo-1543928240-aa3845f4ae65", imageAlt: 'Various sized paint brushes for painting scale models' },
  { name: 'Pisau pemotong & gergaji kecil', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_18544d998-1772220772099.png", imageAlt: 'Craft knife and small saw for cutting model materials' },
  { name: 'Pensel & pembaris', imageUrl: "https://images.unsplash.com/photo-1638718260002-18bdc8082608", imageAlt: 'Pencil and ruler for measuring and marking model parts' },
  { name: 'Kertas pasir (sandpaper)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_162f373a6-1765833235885.png", imageAlt: 'Close-up of actual sandpaper sheets showing abrasive grit texture for smoothing model surfaces' },
  { name: 'Penyepit & klip', imageUrl: "https://images.unsplash.com/photo-1663422468271-dc79caa4b02f", imageAlt: 'Tweezers and clips for holding small model parts during assembly' }]

}];


const KARYA_DATA = [
{ title: 'Model Seni Bina Tradisional', desc: 'Model berskala rumah tradisional Melayu yang dibina dengan perincian halus termasuk ukiran kayu, bumbung dan tiang yang tepat.', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1884df7e5-1768886643109.png", imageAlt: 'Scale model of traditional Malay architecture with detailed wooden carvings and roof structure' },
{ title: 'Model Kenderaan Bersejarah', desc: 'Model kenderaan bersejarah yang dibina menggunakan kit plastik dengan kemasan cat dan decal yang tepat mengikut warna asal.', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_130b71c21-1772911937467.png", imageAlt: 'Detailed scale model of historical vehicle with accurate paint finish and markings' },
{ title: 'Model Kapal Layar', desc: 'Model kapal layar tradisional yang dibina daripada kayu dengan tali, layar dan perincian yang mencerminkan kemahiran kraf tinggi.', imageUrl: "https://images.unsplash.com/photo-1642532909450-b24122327a84", imageAlt: 'Wooden sailing ship model with rigging, sails and intricate nautical details' },
{ title: 'Model Figura', desc: 'Model figura manusia atau haiwan yang disusun dalam diorama berskala kecil untuk menceritakan sesebuah peristiwa atau suasana.', imageUrl: "https://images.unsplash.com/photo-1599779462059-545738f600fa", imageAlt: 'Miniature figure models arranged in a diorama scene depicting a historical or cultural event' }];


const C = {
  bg: '#0a2e0a',
  outline: '#051505',
  fill: '#e8f5e8',
  fillLight: 'rgba(100,200,100,0.18)',
  accent: '#16a34a',
  accentDark: '#14532d',
  accentLight: '#4ade80',
  pageLeft: 'linear-gradient(105deg, #f0fdf4 0%, #dcfce7 100%)',
  pageRight: 'linear-gradient(75deg, #dcfce7 0%, #f0fdf4 100%)',
  binding: 'linear-gradient(90deg, #16a34a 0%, #14532d 40%, #16a34a 60%, #14532d 100%)',
  cover: 'linear-gradient(145deg, #86efac 0%, #22c55e 30%, #16a34a 60%, #14532d 100%)',
  spine: 'linear-gradient(90deg, #052e16 0%, #15803d 40%, #16a34a 100%)',
  dot: 'rgba(180,240,180,0.5)',
  textPrimary: '#14532d',
  textSecondary: '#166534',
  textMuted: 'rgba(20,83,45,0.35)',
  borderAccent: 'rgba(22,163,74,0.2)',
  borderLight: 'rgba(22,163,74,0.15)',
  indicatorActive: '#16a34a',
  indicatorInactive: 'rgba(22,163,74,0.35)',
  indicatorShadow: 'rgba(22,163,74,0.4)',
  ambientGradient: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(100,220,100,0.2) 0%, transparent 70%)',
  flipAnim: 'pageFlipGreen'
};

export default function ModelPage() {
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
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 900, letterSpacing: '0.18em', color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.5)', lineHeight: 1 }}>MODEL</h1>
      </div>

      {/* Book container fills screen */}
      <div style={{ position: 'absolute', top: '10%', left: 0, right: 0, bottom: '12%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20, gap: 8 }}>
        <div onClick={handleBookClick} style={{ cursor: isFlipping ? 'default' : 'pointer', perspective: '1400px', perspectiveOrigin: '50% 50%', width: '100%', display: 'flex', justifyContent: 'center' }}>
          {(isClosed || isOpening || bookState === 'closing') && <ClosedBook isOpening={isOpening} isClosing={bookState === 'closing'} />}
          {bookState === 'open' && <OpenBook currentSpread={currentSpread} isFlipping={isFlipping} flipDirection={flipDirection} />}
        </div>
        {bookState === 'open' &&
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {[1, 2, 3, 4].map((n) =>
          <div key={n} style={{ width: n === currentSpread ? 20 : 8, height: 8, borderRadius: 4, background: n === currentSpread ? C.indicatorActive : C.indicatorInactive, transition: 'all 0.3s ease', boxShadow: n === currentSpread ? `0 2px 6px ${C.indicatorShadow}` : 'none' }} />
          )}
          </div>
        }
      </div>

      <button onClick={() => setShowBahan(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '2%', left: '2%', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2657-1789578278816.jpeg" alt="Box of craft materials for model making" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.75rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>Bahan</span>
      </button>

      <button onClick={() => setShowKarya(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '2%', right: '2%', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2656-1789578278955.jpeg" alt="Camera for capturing model artwork examples" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
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
      <Modal title="Contoh Karya Model" onClose={() => setShowKarya(false)}>
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
      <div style={{ position: 'absolute', left: -28, top: 0, width: 28, height: '100%', background: C.spine, transformOrigin: 'right center', transform: 'rotateY(-90deg)', borderRadius: '4px 0 0 4px', boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 1vw, 0.75rem)', fontWeight: 700, color: 'rgba(200,240,200,0.9)', letterSpacing: '0.12em', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>MODEL</span>
      </div>
      <div style={{ width: '100%', height: '100%', background: C.cover, borderRadius: '2px 8px 8px 2px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: '60%', height: '45%', background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 12, border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 16, border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: '72%', height: '48%', borderRadius: 6, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.25)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://img.rocket.new/generatedImages/rocket_gen_img_136a8a9ca-1768760769598.png" alt="Model craft book cover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '14%', left: 0, right: 0, textAlign: 'center', padding: '0 16px' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 900, color: 'rgba(220,255,220,0.97)', letterSpacing: '0.2em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>MODEL</div>
          <div style={{ width: 40, height: 1.5, background: 'rgba(180,255,180,0.6)', margin: '6px auto 0', borderRadius: 1 }} />
        </div>
        <div style={{ position: 'absolute', right: -6, top: 4, bottom: 4, width: 6, background: 'linear-gradient(90deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)', borderRadius: '0 2px 2px 0', boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.15)' }}>
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
      {s.leftSubheading && <><h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1.1vw, 0.8rem)', fontWeight: 700, color: C.accent, margin: 0, letterSpacing: '0.04em' }}>{s.leftSubheading}</h3><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.7vh, 7px)', flex: 1 }}>{s.leftTechniques?.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid rgba(22,163,74,0.4)`, paddingLeft: 7 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.88vw, 0.68rem)', fontWeight: 700, color: C.accentDark }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.48rem, 0.78vw, 0.62rem)', color: C.textSecondary, lineHeight: 1.45, marginTop: 1 }}>{t.desc}</div></div>)}</div></>}
      {s.id === 4 && s.leftText && <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: C.textSecondary, lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{s.leftText}</p>}
      <div style={{ marginTop: 'auto', fontFamily: 'Georgia, serif', fontSize: '0.55rem', color: C.textMuted, letterSpacing: '0.1em' }}>{spread.id * 2 - 1}</div>
    </div>);

}

function RightPageContent({ spread }: {spread: (typeof SPREADS_DATA)[0];}) {
  const s = spread as any;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.2vh, 12px)' }}>
      {s.id === 1 && <><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: C.textSecondary, lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{s.rightText1}</p><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: C.textSecondary, lineHeight: 1.65, margin: 0, textAlign: 'justify', fontStyle: 'italic', borderLeft: `2px solid rgba(22,163,74,0.3)`, paddingLeft: 10 }}>{s.rightText2}</p></>}
      {s.rightItems && <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 9px)', flex: 1 }}>{s.rightItems.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 7 }}><div style={{ width: 'clamp(14px, 1.8vw, 20px)', height: 'clamp(14px, 1.8vw, 20px)', borderRadius: '50%', background: C.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', fontWeight: 700, color: C.accentDark, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)', color: C.textSecondary, lineHeight: 1.45, marginTop: 1 }}>{item.desc}</div></div></div>)}</div>}
      {s.rightTechniques &&
      <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.7vh, 7px)' }}>{s.rightTechniques.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid rgba(22,163,74,0.4)`, paddingLeft: 7 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.88vw, 0.68rem)', fontWeight: 700, color: C.accentDark }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.48rem, 0.78vw, 0.62rem)', color: C.textSecondary, lineHeight: 1.45, marginTop: 1 }}>{t.desc}</div></div>)}</div>
          {s.rightSubheading && <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1.1vw, 0.8rem)', fontWeight: 700, color: C.accent, margin: '2px 0 0', letterSpacing: '0.04em' }}>{s.rightSubheading}</h3>}
          {s.rightProcess && <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>{s.rightProcess.map((step: string, i: number) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}><div style={{ width: 'clamp(12px, 1.6vw, 18px)', height: 'clamp(12px, 1.6vw, 18px)', borderRadius: '50%', border: `1.5px solid rgba(22,163,74,0.5)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)', fontWeight: 700, color: C.accent, fontFamily: 'Georgia, serif', flexShrink: 0 }}>{i + 1}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.5rem, 0.85vw, 0.65rem)', color: C.textSecondary, lineHeight: 1.35 }}>{step}</div></div>)}</div>}
        </>
      }
      {s.id === 4 && <>{s.imageUrl && <div style={{ height: 'clamp(60px, 16vh, 130px)', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${C.borderLight}`, flexShrink: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}{[s.rightText1, s.rightText2, s.rightText3].filter(Boolean).map((text: string, i: number) => <p key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.95vw, 0.75rem)', color: C.textSecondary, lineHeight: 1.6, margin: 0, textAlign: 'justify' }}>{text}</p>)}</>}
    </div>);

}

function Modal({ title, children, onClose }: {title: string;children: React.ReactNode;onClose: () => void;}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%)', borderRadius: 16, padding: 'clamp(20px, 3vw, 32px)', maxWidth: 680, width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.25)', border: `1px solid ${C.borderLight}`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: `1.5px solid ${C.borderAccent}` }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 900, color: C.accent, margin: 0, letterSpacing: '0.06em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: `rgba(22,163,74,0.1)`, border: `1px solid rgba(22,163,74,0.2)`, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: C.accent, fontSize: '1rem', fontWeight: 700 }}>×</button>
        </div>
        {children}
      </div>
    </div>);

}