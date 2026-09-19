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
  'Diorama merupakan salah satu bentuk hasil kraf dan seni visual tiga dimensi yang menggambarkan sesebuah pemandangan, peristiwa, suasana atau persekitaran tertentu dalam bentuk miniatur atau replika berskala kecil. Ia dihasilkan dengan menyusun figura, objek, latar belakang dan elemen hiasan secara terancang di dalam sebuah kotak atau ruang terbuka bagi mewujudkan gambaran yang realistik atau artistik.',
  rightText1:
  'Diorama lazimnya digunakan sebagai bahan pameran, alat bantu mengajar, projek seni sekolah, koleksi peribadi serta medium untuk mendokumentasikan sejarah, budaya, alam semula jadi dan imaginasi kreatif. Dalam konteks seni visual, penghasilan diorama melibatkan penerapan unsur seni seperti garisan, rupa, bentuk, warna, jalinan, ruang dan nilai, serta prinsip rekaan seperti imbangan, harmoni, kontra, penegasan dan kepelbagaian.',
  rightText2:
  'Oleh itu, diorama bukan sahaja berfungsi sebagai replika visual, malah menjadi medium ekspresi kreatif yang membolehkan pengkarya menyampaikan idea, naratif, identiti budaya dan makna tertentu melalui susunan elemen tiga dimensinya.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_175d57348-1767713058739.png",
  imageAlt: 'Miniature diorama scene showing detailed landscape with tiny figures and props'
},
{
  id: 2,
  topic: 'Ciri-ciri',
  leftHeading: 'Ciri-ciri',
  leftItems: [
  { num: '1', title: 'Mempunyai dimensi tiga dimensi yang nyata', desc: 'Diorama dibina dalam bentuk tiga dimensi dengan kedalaman, lebar dan tinggi yang memberikan ilusi ruang dan perspektif yang realistik kepada penonton.' },
  { num: '2', title: 'Menggambarkan sesebuah pemandangan atau peristiwa tertentu', desc: 'Setiap diorama mempunyai tema atau naratif yang jelas, sama ada berdasarkan alam semula jadi, sejarah, budaya, cerita rakyat atau imaginasi pengkarya.' },
  { num: '3', title: 'Menggunakan skala dan perkadaran yang sesuai', desc: 'Elemen-elemen dalam diorama disusun mengikut skala yang konsisten supaya hubungan antara objek, figura dan latar belakang kelihatan harmoni dan realistik.' }],

  rightItems: [
  { num: '4', title: 'Menggunakan pelbagai bahan dan teknik penghasilan', desc: 'Diorama boleh dihasilkan menggunakan pelbagai bahan seperti kayu, kertas, tanah liat, busa, kain, cat dan bahan kitar semula melalui teknik binaan, tampalan, pembentukan dan pengecatan.' },
  { num: '5', title: 'Mempunyai latar belakang dan persekitaran yang lengkap', desc: 'Selain figura utama, diorama turut dilengkapi dengan latar belakang, lantai, langit, tumbuhan, bangunan atau elemen persekitaran lain yang menyokong tema keseluruhan.' },
  { num: '6', title: 'Mempunyai nilai estetika dan naratif yang tinggi', desc: 'Susunan elemen, pemilihan warna, pencahayaan dan perincian dalam diorama menyumbang kepada keindahan visual dan keupayaannya menyampaikan cerita atau mesej.' },
  { num: '7', title: 'Mempunyai kreativiti dan keunikan tersendiri', desc: 'Reka bentuk diorama boleh diubah suai berdasarkan imaginasi, sumber ilham, tema dan konsep yang ingin diketengahkan, menjadikan setiap karya unik dan berbeza.' }],

  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_175d57348-1767713058739.png",
  imageAlt: 'Close-up of diorama showing intricate miniature details and careful craftsmanship'
},
{
  id: 3,
  topic: 'Teknik & Proses',
  leftHeading: 'Teknik & Proses Penghasilan',
  leftSubheading: 'Teknik',
  leftTechniques: [
  { name: 'Teknik binaan (construction)', desc: 'Membina struktur asas diorama menggunakan kayu, kadbod atau bahan keras lain sebagai rangka dan tapak yang kukuh untuk menyokong semua elemen.' },
  { name: 'Teknik tampalan (paper mâché)', desc: 'Menampal lapisan kertas yang dicampurkan dengan bahan pelekat untuk membentuk permukaan bumi, bukit, batu atau elemen landskap dalam diorama.' },
  { name: 'Teknik pembentukan (tanah liat/busa)', desc: 'Membentuk figura, pokok, bangunan atau objek menggunakan tanah liat, busa polystyrene atau clay polimer dengan tangan atau alatan khas.' },
  { name: 'Teknik pengecatan dan pewarnaan', desc: 'Mengaplikasikan cat akrilik, cat poster atau bahan pewarna pada permukaan diorama untuk mewujudkan warna, bayang, kedalaman dan suasana yang dikehendaki.' }],

  rightTechniques: [
  { name: 'Teknik hiasan dan kemasan', desc: 'Menambahkan elemen hiasan seperti pasir, batu kecil, rumput tiruan, daun kering, manik atau bahan semula jadi untuk meningkatkan realisme dan nilai estetika.' },
  { name: 'Teknik pemasangan (assembly)', desc: 'Menyusun dan memasang semua elemen diorama secara terancang menggunakan gam, dawai atau penyangkut supaya kedudukan setiap objek stabil dan seimbang.' }],

  rightSubheading: 'Proses Penghasilan',
  rightProcess: [
  'Menentukan tema dan konsep diorama',
  'Menghasilkan lakaran idea dan pelan susunan',
  'Menyediakan bahan dan alatan',
  'Membina kotak atau tapak asas',
  'Membentuk landskap dan latar belakang',
  'Menghasilkan figura dan objek utama',
  'Mewarna dan menghias semua elemen',
  'Menyusun dan memasang elemen secara keseluruhan']
},
{
  id: 4,
  topic: 'Nilai Estetika',
  leftHeading: 'Nilai Estetika',
  leftText:
  'Nilai estetika dalam kraf diorama dapat dilihat melalui keupayaan pengkarya mengolah ruang, bentuk, warna, jalinan dan perincian secara terancang sehingga menghasilkan pemandangan miniatur yang menarik secara visual dan bercerita. Penggunaan skala yang tepat dan perkadaran yang seimbang dapat mewujudkan ilusi kedalaman dan realisme, manakala kombinasi warna yang harmoni mampu menciptakan suasana dan emosi tertentu.',
  rightText1:
  'Jalinan yang dihasilkan melalui penggunaan pelbagai bahan seperti pasir, batu, kain, tumbuhan tiruan dan bahan semula jadi memberikan variasi pada permukaan serta meningkatkan pengalaman visual dan sentuhan terhadap karya. Pencahayaan yang tepat turut menyumbang kepada keindahan keseluruhan diorama.',
  rightText2:
  'Selain itu, nilai estetika diorama turut berkait dengan keaslian idea, kreativiti naratif dan identiti budaya yang ditampilkan. Pemilihan tema, susunan elemen dan perincian yang teliti dapat memberikan makna yang lebih mendalam kepada karya, khususnya apabila diorama menggambarkan warisan budaya atau peristiwa bersejarah.',
  rightText3:
  'Dengan demikian, diorama bukan sekadar replika visual, tetapi dapat berfungsi sebagai karya seni yang menggabungkan aspek keindahan, kreativiti, naratif dan nilai budaya yang tinggi.',
  imageUrl: "https://images.unsplash.com/photo-1662092560483-99c5877a9fd6",
  imageAlt: 'Artistic diorama with detailed miniature scene showing aesthetic composition and craftsmanship'
}];


const BAHAN_DATA = [
{
  category: 'Bahan Asas',
  items: [
  { name: 'Kotak kadbod / kotak kasut', imageUrl: "https://images.unsplash.com/photo-1559378200-e98f298a6723", imageAlt: 'Plain cardboard box and shoebox used as the base container for diorama scene' },
  { name: 'Kayu balsa / papan lapis', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4cef04808-1789579165967.png", imageAlt: 'Light balsa wood sheets for building diorama structure' },
  { name: 'Styrofoam', imageUrl: "https://images.unsplash.com/photo-1642352258961-b98c5f99c080", imageAlt: 'White styrofoam blocks for sculpting terrain and landscape' },
  { name: 'Tanah liat polimer', imageUrl: 'https://images.unsplash.com/photo-1725570794570-a32088926714', imageAlt: 'Colourful polymer clay for making miniature figures and objects' },
  { name: 'Kertas surat khabar', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_461eaab96-1789579165815.png", imageAlt: 'Newspapers for paper mache base layers in diorama' }]

},
{
  category: 'Bahan Pelekat',
  items: [
  { name: 'Gam PVA', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4c134910b-1789581760596.png", imageAlt: 'PVA glue for bonding diorama materials together' },
  { name: 'Gam tembak (hot glue)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_49c73caa6-1789581758944.png", imageAlt: 'Hot glue gun with glue sticks for assembling diorama components' },
  { name: 'Gam kanji (tepung + air)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4c134910b-1789581760596.png", imageAlt: 'Starch paste for paper mache layers in diorama' }]

},
{
  category: 'Bahan Hiasan',
  items: [
  { name: 'Cat akrilik', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_16346260c-1784125766783.png", imageAlt: 'Tubes of acrylic paint in various colours for colouring diorama surfaces and figures' },
  { name: 'Pasir & batu kecil', imageUrl: "https://images.unsplash.com/photo-1539397726814-5afbfa7934f3", imageAlt: 'Sand and small pebbles for realistic ground texture in diorama' },
  { name: 'Rumput tiruan / moss', imageUrl: "https://images.unsplash.com/photo-1700763415650-39d1af4bb50e", imageAlt: 'Artificial grass and moss for natural landscape in diorama' },
  { name: 'Ranting & daun kering', imageUrl: "https://images.unsplash.com/photo-1474815358446-5f778488f59f", imageAlt: 'Dried twigs and leaves for natural elements in diorama' },
  { name: 'Kain perca & benang', imageUrl: "https://images.unsplash.com/photo-1569728808392-4c637feee42b", imageAlt: 'Fabric scraps and thread for clothing miniature figures' },
  { name: 'Foil emas/perak', imageUrl: "https://images.unsplash.com/photo-1643061493163-e50ef8dec4cd", imageAlt: 'Gold and silver foil for decorative accents in diorama' }]

},
{
  category: 'Alatan',
  items: [
  { name: 'Berus cat', imageUrl: "https://images.unsplash.com/photo-1622017559292-e4f0b81b4feb", imageAlt: 'Paint brushes for painting diorama elements' },
  { name: 'Pisau pemotong', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_47410091f-1789579168782.png", imageAlt: 'Craft knife for cutting and shaping diorama materials' },
  { name: 'Gunting', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1c668c7c5-1772087239090.png", imageAlt: 'Scissors for cutting paper and fabric in diorama making' },
  { name: 'Pensel & pembaris', imageUrl: "https://images.unsplash.com/photo-1627556704387-e3f28658e782", imageAlt: 'Pencil and ruler for measuring and planning diorama layout' },
  { name: 'Span', imageUrl: "https://images.unsplash.com/photo-1726074324374-98452647e241", imageAlt: 'Sponge for applying texture and paint effects on diorama' }]

}];


const KARYA_DATA = [
{ title: 'Diorama Kampung Tradisional', desc: 'Diorama yang menggambarkan suasana perkampungan Melayu tradisional dengan rumah papan, pokok kelapa dan sawah padi.', imageUrl: "https://images.unsplash.com/photo-1683624308509-9acbbb6340d7", imageAlt: 'Miniature diorama of traditional Malay village with wooden houses and rice fields' },
{ title: 'Diorama Hutan', desc: 'Diorama yang memaparkan suasana hutan dengan pokok-pokok miniatur, lumut, ranting dan figura haiwan yang disusun secara realistik.', imageUrl: "https://images.unsplash.com/photo-1709732900542-d5b48d44e3cb", imageAlt: 'Miniature forest diorama with tiny trees, moss, branches and animal figures arranged realistically' },
{ title: 'Diorama Peristiwa Sejarah', desc: 'Diorama yang merakamkan peristiwa bersejarah penting dengan figura pejuang dan latar belakang yang tepat.', imageUrl: "https://images.unsplash.com/photo-1599779462059-545738f600fa", imageAlt: 'Historical diorama depicting important event with detailed miniature figures and setting' },
{ title: 'Diorama Bawah Laut', desc: 'Diorama kreatif yang menggambarkan kehidupan bawah laut dengan terumbu karang, ikan warna-warni dan tumbuhan laut.', imageUrl: "https://images.unsplash.com/photo-1715104565795-208789c5998d", imageAlt: 'Underwater diorama with coral reef, colourful fish and sea plants' }];


// Colour palette
const C = {
  bg: '#2d0a4e',
  outline: '#1a0030',
  fill: '#f0e6ff',
  fillLight: 'rgba(200,170,240,0.18)',
  accent: '#7c3aed',
  accentDark: '#4c1d95',
  accentLight: '#a78bfa',
  pageLeft: 'linear-gradient(105deg, #f5f0ff 0%, #ede8fb 100%)',
  pageRight: 'linear-gradient(75deg, #ede8fb 0%, #f5f0ff 100%)',
  binding: 'linear-gradient(90deg, #7c3aed 0%, #4c1d95 40%, #7c3aed 60%, #4c1d95 100%)',
  cover: 'linear-gradient(145deg, #c4a0f0 0%, #9b59e8 30%, #6d28d9 60%, #4c1d95 100%)',
  spine: 'linear-gradient(90deg, #3b0764 0%, #6d28d9 40%, #7c3aed 100%)',
  dot: 'rgba(220,200,255,0.5)',
  textPrimary: '#4c1d95',
  textSecondary: '#3b0764',
  textMuted: 'rgba(76,29,149,0.35)',
  borderAccent: 'rgba(124,58,237,0.2)',
  borderLight: 'rgba(124,58,237,0.15)',
  indicatorActive: '#7c3aed',
  indicatorInactive: 'rgba(124,58,237,0.35)',
  indicatorShadow: 'rgba(124,58,237,0.4)',
  ambientGradient: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(180,140,255,0.2) 0%, transparent 70%)',
  flipAnim: 'pageFlipPurple'
};

export default function DioramaPage() {
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
    <div className="relative w-full overflow-hidden select-none" style={{ backgroundColor: C.bg, height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Background SVG */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <path d="M 60 180 C 80 140, 120 100, 160 130 C 200 160, 180 80, 240 70 C 300 60, 320 120, 380 100 C 440 80, 460 40, 520 50 C 580 60, 600 110, 660 90 C 720 70, 740 30, 800 50 C 860 70, 880 120, 940 110 C 1000 100, 1020 60, 1080 80 C 1140 100, 1160 150, 1150 200 C 1140 250, 1100 280, 1120 330 C 1140 380, 1160 420, 1140 470 C 1120 520, 1060 540, 1020 510 C 980 480, 960 530, 900 545 C 840 560, 820 510, 760 530 C 700 550, 680 590, 620 580 C 560 570, 540 520, 480 540 C 420 560, 400 600, 340 590 C 280 580, 260 530, 200 520 C 140 510, 100 550, 70 510 C 40 470, 50 420, 60 380 C 70 340, 40 300, 50 260 C 60 220, 40 220, 60 180 Z" fill={C.outline} opacity="0.9" />
        <path d="M 80 190 C 98 152, 135 115, 172 143 C 209 171, 192 95, 250 85 C 308 75, 328 132, 386 112 C 444 92, 464 54, 522 64 C 580 74, 600 122, 658 103 C 716 84, 736 46, 793 66 C 850 86, 870 133, 928 122 C 986 111, 1006 72, 1062 92 C 1118 112, 1136 160, 1126 208 C 1116 256, 1078 284, 1097 332 C 1116 380, 1134 418, 1114 464 C 1094 510, 1036 528, 998 500 C 960 472, 942 520, 884 534 C 826 548, 806 500, 748 519 C 690 538, 672 576, 614 566 C 556 556, 538 508, 478 526 C 418 544, 400 582, 342 572 C 284 562, 264 514, 206 504 C 148 494, 110 532, 82 494 C 54 456, 64 408, 74 370 C 84 332, 58 294, 68 254 C 78 214, 62 228, 80 190 Z" fill={C.fill} />
        <path d="M 80 190 C 98 152, 135 115, 172 143 C 209 171, 192 95, 250 85 C 308 75, 328 132, 386 112 C 444 92, 464 54, 522 64 C 580 74, 600 122, 658 103 C 716 84, 736 46, 793 66 C 850 86, 870 133, 928 122 C 986 111, 1006 72, 1062 92 C 1118 112, 1136 160, 1126 208 C 1116 256, 1078 284, 1097 332 C 1116 380, 1134 418, 1114 464 C 1094 510, 1036 528, 998 500 C 960 472, 942 520, 884 534 C 826 548, 806 500, 748 519 C 690 538, 672 576, 614 566 C 556 556, 538 508, 478 526 C 418 544, 400 582, 342 572 C 284 562, 264 514, 206 504 C 148 494, 110 532, 82 494 C 54 456, 64 408, 74 370 C 84 332, 58 294, 68 254 C 78 214, 62 228, 80 190 Z" fill={C.fillLight} />
      </svg>
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='none'/%3E%3Ccircle cx='1' cy='1' r='0.5' fill='rgba(0,0,0,0.04)'/%3E%3Ccircle cx='3' cy='3' r='0.5' fill='rgba(0,0,0,0.04)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: C.ambientGradient }} />

      {/* Back button */}
      <Link href="/projects/kraf/buku/kad" className="absolute top-3 left-3 z-50 flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.88)', boxShadow: '0 2px 12px rgba(0,0,0,0.25)', color: C.accentDark, fontWeight: 700, fontSize: '0.75rem', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke={C.accentDark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Back
      </Link>

      {/* Page title */}
      <div className="absolute z-30 w-full flex justify-center" style={{ top: '2%' }}>
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 900, letterSpacing: '0.18em', color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.5)', lineHeight: 1 }}>DIORAMA</h1>
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

      {/* Bahan button */}
      <button onClick={() => setShowBahan(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '2%', left: '2%', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2657-1789578278816.jpeg" alt="Box of craft materials for diorama making" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.75rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>Bahan</span>
      </button>

      {/* Karya button */}
      <button onClick={() => setShowKarya(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '2%', right: '2%', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2656-1789578278955.jpeg" alt="Camera for capturing diorama artwork examples" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.75rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>Karya</span>
      </button>

      {/* Bahan Modal */}
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
                      <div style={{ padding: '6px 8px' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.72rem', color: C.accentDark, fontWeight: 600, lineHeight: 1.3, display: 'block' }}>{item.name}</span>
                      </div>
                    </div>
              )}
                </div>
              </div>
          )}
          </div>
        </Modal>
      }

      {/* Karya Modal */}
      {showKarya &&
      <Modal title="Contoh Karya Diorama" onClose={() => setShowKarya(false)}>
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
      {/* Spine */}
      <div style={{ position: 'absolute', left: -28, top: 0, width: 28, height: '100%', background: C.spine, transformOrigin: 'right center', transform: 'rotateY(-90deg)', borderRadius: '4px 0 0 4px', boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 1vw, 0.75rem)', fontWeight: 700, color: 'rgba(230,210,255,0.9)', letterSpacing: '0.12em', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>DIORAMA</span>
      </div>
      {/* Cover */}
      <div style={{ width: '100%', height: '100%', background: C.cover, borderRadius: '2px 8px 8px 2px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: '60%', height: '45%', background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 12, border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 16, border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: '72%', height: '48%', borderRadius: 6, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.25)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1597355873549-05ed04c3a36f" alt="Diorama craft book cover showing detailed miniature scene" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '14%', left: 0, right: 0, textAlign: 'center', padding: '0 16px' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 900, color: 'rgba(240,230,255,0.97)', letterSpacing: '0.2em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>DIORAMA</div>
          <div style={{ width: 40, height: 1.5, background: 'rgba(220,200,255,0.6)', margin: '6px auto 0', borderRadius: 1 }} />
        </div>
        <div style={{ position: 'absolute', right: -6, top: 4, bottom: 4, width: 6, background: 'linear-gradient(90deg, #f0f0f8 0%, #e8e4f4 50%, #ddd8ec 100%)', borderRadius: '0 2px 2px 0', boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.15)' }}>
          {Array.from({ length: 20 }).map((_, i) => <div key={i} style={{ height: '5%', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }} />)}
        </div>
      </div>
    </div>);

}

function OpenBook({ currentSpread, isFlipping, flipDirection }: {currentSpread: number;isFlipping: boolean;flipDirection: 'forward' | 'backward';}) {
  const spread = SPREADS_DATA[currentSpread - 1];
  return (
    <div style={{ width: 'clamp(320px, 90vw, 1100px)', height: 'clamp(220px, 62vh, 560px)', position: 'relative', display: 'flex', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 12px 30px rgba(0,0,0,0.35))' }}>
      {/* Left page */}
      <div style={{ flex: 1, background: C.pageLeft, borderRadius: '8px 0 0 8px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.08)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-5deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'right center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(10px, 1.8vw, 20px)', height: '100%', overflowY: 'auto' }}>
          {spread && <LeftPageContent spread={spread} />}
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06))', pointerEvents: 'none', zIndex: 3 }} />
      </div>
      {/* Binding */}
      <div style={{ width: 'clamp(10px, 1.2vw, 16px)', background: C.binding, position: 'relative', boxShadow: '0 0 12px rgba(0,0,0,0.3)', zIndex: 10, flexShrink: 0 }}>
        {Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: '50%', top: `${10 + i * 11}%`, transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: C.dot }} />)}
      </div>
      {/* Right page */}
      <div style={{ flex: 1, background: C.pageRight, borderRadius: '0 8px 8px 0', position: 'relative', overflow: 'hidden', boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.06)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-180deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'left center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(10px, 1.8vw, 20px)', height: '100%', overflowY: 'auto' }}>
          {spread && <RightPageContent spread={spread} />}
        </div>
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
      {s.leftSubheading && <><h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1.1vw, 0.8rem)', fontWeight: 700, color: C.accent, margin: 0, letterSpacing: '0.04em' }}>{s.leftSubheading}</h3><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.7vh, 7px)', flex: 1 }}>{s.leftTechniques?.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid rgba(124,58,237,0.4)`, paddingLeft: 7 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.88vw, 0.68rem)', fontWeight: 700, color: C.accentDark }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.48rem, 0.78vw, 0.62rem)', color: C.textSecondary, lineHeight: 1.45, marginTop: 1 }}>{t.desc}</div></div>)}</div></>}
      {s.id === 4 && s.leftText && <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: C.textSecondary, lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{s.leftText}</p>}
      <div style={{ marginTop: 'auto', fontFamily: 'Georgia, serif', fontSize: '0.55rem', color: C.textMuted, letterSpacing: '0.1em' }}>{spread.id * 2 - 1}</div>
    </div>);

}

function RightPageContent({ spread }: {spread: (typeof SPREADS_DATA)[0];}) {
  const s = spread as any;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.2vh, 12px)' }}>
      {s.id === 1 && <><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: C.textSecondary, lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{s.rightText1}</p><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: C.textSecondary, lineHeight: 1.65, margin: 0, textAlign: 'justify', fontStyle: 'italic', borderLeft: `2px solid rgba(124,58,237,0.3)`, paddingLeft: 10 }}>{s.rightText2}</p></>}
      {s.rightItems && <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 9px)', flex: 1 }}>{s.rightItems.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 7 }}><div style={{ width: 'clamp(14px, 1.8vw, 20px)', height: 'clamp(14px, 1.8vw, 20px)', borderRadius: '50%', background: C.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', fontWeight: 700, color: C.accentDark, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)', color: C.textSecondary, lineHeight: 1.45, marginTop: 1 }}>{item.desc}</div></div></div>)}</div>}
      {s.rightTechniques &&
      <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.7vh, 7px)' }}>{s.rightTechniques.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid rgba(124,58,237,0.4)`, paddingLeft: 7 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.88vw, 0.68rem)', fontWeight: 700, color: C.accentDark }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.48rem, 0.78vw, 0.62rem)', color: C.textSecondary, lineHeight: 1.45, marginTop: 1 }}>{t.desc}</div></div>)}</div>
          {s.rightSubheading && <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1.1vw, 0.8rem)', fontWeight: 700, color: C.accent, margin: '2px 0 0', letterSpacing: '0.04em' }}>{s.rightSubheading}</h3>}
          {s.rightProcess && <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>{s.rightProcess.map((step: string, i: number) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}><div style={{ width: 'clamp(12px, 1.6vw, 18px)', height: 'clamp(12px, 1.6vw, 18px)', borderRadius: '50%', border: `1.5px solid rgba(124,58,237,0.5)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.4rem, 0.7vw, 0.55rem)', fontWeight: 700, color: C.accent, fontFamily: 'Georgia, serif', flexShrink: 0 }}>{i + 1}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.5rem, 0.85vw, 0.65rem)', color: C.textSecondary, lineHeight: 1.35 }}>{step}</div></div>)}</div>}
        </>
      }
      {s.id === 4 && <>{s.imageUrl && <div style={{ height: 'clamp(60px, 16vh, 130px)', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${C.borderLight}`, flexShrink: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}{[s.rightText1, s.rightText2, s.rightText3].filter(Boolean).map((text: string, i: number) => <p key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.95vw, 0.75rem)', color: C.textSecondary, lineHeight: 1.6, margin: 0, textAlign: 'justify' }}>{text}</p>)}</>}
    </div>);

}

function Modal({ title, children, onClose }: {title: string;children: React.ReactNode;onClose: () => void;}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #f5f0ff 0%, #ede8fb 100%)', borderRadius: 16, padding: 'clamp(20px, 3vw, 32px)', maxWidth: 680, width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.25)', border: `1px solid ${C.borderLight}`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: `1.5px solid ${C.borderAccent}` }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 900, color: C.accent, margin: 0, letterSpacing: '0.06em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: `rgba(124,58,237,0.1)`, border: `1px solid rgba(124,58,237,0.2)`, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: C.accent, fontSize: '1rem', fontWeight: 700 }}>×</button>
        </div>
        {children}
      </div>
    </div>);

}