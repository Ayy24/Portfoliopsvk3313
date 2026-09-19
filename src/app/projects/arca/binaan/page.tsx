'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type BookState = 'closed' | 'opening' | 'open' | 'closing';

const ACCENT = '#E67E22';
const ACCENT_DARK = '#a04000';
const ACCENT_LIGHT = '#f0b27a';

const SPREADS_DATA = [
{
  id: 1,
  topic: 'Definisi',
  leftHeading: 'Definisi',
  leftText: 'Arca binaan (constructed sculpture) ialah sejenis arca yang dihasilkan melalui proses pembinaan — dengan menyambung, mengelas, mengikat atau menyusun pelbagai komponen dan bahan menjadi satu struktur tiga dimensi yang kohesif. Berbeza dengan arca tradisional yang diukir atau dipahat dari satu blok bahan, arca binaan menggunakan proses aditif di mana komponen-komponen ditambah dan disambung.',
  rightText1: 'Arca binaan muncul sebagai gerakan seni yang penting pada awal abad ke-20, dirintis oleh pengarca Rusia seperti Naum Gabo, Antoine Pevsner dan Vladimir Tatlin dalam konteks Konstruktivisme. Mereka menggunakan bahan industri moden seperti logam, kaca dan plastik untuk menghasilkan arca yang mencerminkan semangat teknologi dan kemajuan zaman.',
  rightText2: 'Dalam konteks pendidikan seni visual Malaysia, arca binaan mendorong pelajar untuk memahami prinsip struktur, bahan dan proses pembinaan, serta bagaimana komponen-komponen yang berbeza boleh digabungkan untuk menghasilkan karya seni yang bermakna dan berstruktur.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4cb97f70a-1789602794982.png",
  imageAlt: 'Head No. 2 Naum Gabo 1916 arca binaan konstruktivis daripada kepingan logam'
},
{
  id: 2,
  topic: 'Ciri-ciri & Jenis',
  leftHeading: 'Ciri-ciri',
  leftItems: [
  { num: '1', title: 'Proses aditif (penambahan)', desc: 'Arca dibina dengan menambah dan menyambung komponen, berbeza dengan arca ukiran yang menggunakan proses subtraktif (pengurangan bahan).' },
  { num: '2', title: 'Menggunakan pelbagai bahan', desc: 'Logam, kayu, plastik, kaca, konkrit dan bahan industri lain boleh digabungkan dalam satu karya untuk menghasilkan kesan visual yang pelbagai.' },
  { num: '3', title: 'Menekankan struktur dan pembinaan', desc: 'Cara komponen disambung dan disusun menjadi sebahagian daripada estetika karya — sambungan dan struktur sering kelihatan dan menjadi elemen visual.' },
  { num: '4', title: 'Fleksibel dalam skala dan bentuk', desc: 'Boleh dihasilkan dalam pelbagai saiz dari kecil hingga monumental, dan dalam pelbagai bentuk dari geometri kepada organik.' }],

  rightHeading: 'Jenis Arca Binaan',
  rightItems: [
  { num: 'A', title: 'Binaan Konstruktivis', desc: 'Menggunakan bahan industri moden seperti logam dan plastik dalam bentuk geometri abstrak, mencerminkan semangat Konstruktivisme Rusia.' },
  { num: 'B', title: 'Binaan Kayu', desc: 'Menggunakan kepingan kayu yang dipotong, dibentuk dan disambung untuk menghasilkan struktur tiga dimensi yang organik atau geometri.' },
  { num: 'C', title: 'Binaan Logam Kimpalan', desc: 'Kepingan logam dikimpal bersama untuk menghasilkan arca yang kukuh dan tahan lama, sering dalam skala besar untuk ruang awam.' },
  { num: 'D', title: 'Binaan Bahan Campuran', desc: 'Menggabungkan pelbagai jenis bahan dalam satu karya, memanfaatkan sifat-sifat unik setiap bahan untuk menghasilkan kesan visual yang kaya.' }],

  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_154cc4e87-1775380791824.png",
  imageAlt: 'Arca binaan menunjukkan ciri-ciri proses pembinaan dan penyambungan komponen'
},
{
  id: 3,
  topic: 'Teknik Penghasilan',
  leftHeading: 'Teknik Penghasilan',
  leftSubheading: 'Teknik Utama',
  leftTechniques: [
  { name: 'Teknik Kimpalan (Welding)', desc: 'Komponen logam disambung menggunakan haba kimpalan untuk menghasilkan sambungan yang kukuh dan kekal.' },
  { name: 'Teknik Penyambungan Mekanikal', desc: 'Skru, bolt, rivet dan kait digunakan untuk menyambung komponen secara mekanikal, membolehkan pembongkaran jika perlu.' },
  { name: 'Teknik Pengikatan (Binding)', desc: 'Tali, wayar, tali besi atau bahan pengikatan lain digunakan untuk mengikat komponen bersama, sering menghasilkan kesan tekstur yang menarik.' }],

  rightTechniques: [
  { name: 'Teknik Pengeleman (Adhesive Bonding)', desc: 'Gam industri, epoksi atau simen digunakan untuk menyambung bahan yang tidak sesuai dikimpal atau disekru.' },
  { name: 'Teknik Pembinaan Modular', desc: 'Karya dibina daripada unit-unit modular yang berulang, membolehkan pelbagai konfigurasi dan susunan yang berbeza.' }],

  rightSubheading: 'Proses Penghasilan',
  rightProcess: [
  'Merancang konsep dan struktur karya',
  'Menghasilkan lakaran dan pelan teknikal',
  'Memilih bahan dan komponen yang sesuai',
  'Menyediakan dan memotong komponen mengikut ukuran',
  'Menyambung komponen menggunakan teknik yang sesuai',
  'Menguji kestabilan dan kekuatan struktur',
  'Kemasan akhir dan pemasangan karya']

},
{
  id: 4,
  topic: 'Nilai Estetika',
  leftHeading: 'Nilai Estetika',
  leftText: 'Nilai estetika arca binaan terletak pada keupayaannya mendedahkan proses pembinaan sebagai sebahagian daripada estetika karya. Sambungan, struktur dan cara komponen-komponen disusun menjadi elemen visual yang penting, mencerminkan kejujuran bahan dan proses yang menjadi prinsip utama seni moden.',
  rightText1: 'Penggunaan pelbagai bahan dalam satu karya menghasilkan kekayaan tekstur, warna dan kualiti permukaan yang tidak dapat dicapai melalui medium tunggal. Kontras antara bahan yang berbeza — logam dan kayu, kasar dan halus, berkilat dan kusam — mewujudkan dialog visual yang menarik dan kompleks.',
  rightText2: 'Arca binaan sering mencerminkan nilai-nilai zaman ia dihasilkan — penggunaan bahan industri dalam Konstruktivisme mencerminkan semangat kemajuan teknologi, manakala penggunaan bahan kitar semula dalam arca binaan kontemporari mencerminkan kesedaran alam sekitar dan kritik terhadap budaya pengguna.',
  rightText3: 'Dalam konteks seni Malaysia, arca binaan menawarkan peluang untuk menggabungkan bahan dan teknik tradisional dengan pendekatan moden. Penggunaan bahan tempatan seperti rotan, buluh dan kayu tropika dalam arca binaan mewujudkan karya yang mencerminkan identiti dan warisan budaya Malaysia.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4e2eaad20-1789743581322.png",
  imageAlt: 'Nilai estetika arca binaan melalui pendedahan struktur dan proses pembinaan'
}];


const BAHAN_DATA = [
{ category: 'Bahan Logam', items: [
  { name: 'Kepingan Keluli', imageUrl: "https://images.unsplash.com/photo-1676377049135-44ff7e9ce75c", imageAlt: 'Kepingan keluli untuk arca binaan' },
  { name: 'Tiub Aluminium', imageUrl: "https://images.unsplash.com/photo-1656546106266-5eb910ebafda", imageAlt: 'Tiub aluminium untuk struktur arca binaan' },
  { name: 'Rod Besi', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_10797cfa1-1772061304039.png", imageAlt: 'Rod besi untuk rangka arca binaan' },
  { name: 'Wayar Keluli', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1b058f0b1-1766804551838.png", imageAlt: 'Wayar keluli untuk pengikatan dan struktur' }]
},
{ category: 'Bahan Kayu & Organik', items: [
  { name: 'Papan Kayu Keras', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_12a068267-1779380389287.png", imageAlt: 'Papan kayu keras untuk arca binaan' },
  { name: 'Buluh', imageUrl: "/assets/images/buluh_bamboo.png", imageAlt: 'Buluh (bamboo) untuk arca binaan tradisional' },
  { name: 'Rotan', imageUrl: "/assets/images/rotan_rattan.png", imageAlt: 'Rotan (rattan) untuk arca binaan anyaman' }]
},
{ category: 'Alatan Pembinaan', items: [
  { name: 'Mesin Kimpalan', imageUrl: "https://images.unsplash.com/photo-1683470156390-bfbad8f229c2", imageAlt: 'Mesin kimpalan untuk menyambung logam' },
  { name: 'Gergaji Jigsaw', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1253939cd-1765702728839.png", imageAlt: 'Gergaji jigsaw untuk memotong bahan' },
  { name: 'Gerudi Elektrik', imageUrl: "https://images.unsplash.com/photo-1548335497-14c1226df130", imageAlt: 'Gerudi elektrik untuk membuat lubang' },
  { name: 'Skru & Bolt', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_198bf645b-1772274909404.png", imageAlt: 'Skru dan bolt untuk penyambungan mekanikal' }]
},
{ category: 'Bahan Penyambung & Kemasan', items: [
  { name: 'Gam Epoksi', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_146991d08-1766499900195.png", imageAlt: 'Gam epoksi untuk menyambung bahan berbeza' },
  { name: 'Cat Semburan', imageUrl: "https://images.unsplash.com/photo-1699975769002-89e002cf0038", imageAlt: 'Cat semburan untuk kemasan arca binaan' },
  { name: 'Vernish Kayu', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_18b6e04ae-1783845896993.png", imageAlt: 'Vernish kayu untuk kemasan bahagian kayu' },
  { name: 'Primer Anti-Karat', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1eff8bf22-1782716884671.png", imageAlt: 'Primer anti-karat untuk melindungi logam' }]
}];


const KARYA_DATA = [
{
  title: 'Head No. 2',
  artist: 'Naum Gabo',
  year: '1916',
  desc: 'Arca binaan konstruktivis yang dibuat daripada kepingan logam yang disambung, menggambarkan kepala manusia dalam bentuk geometri abstrak dan menandakan permulaan era arca binaan moden.',
  imageUrl: "https://images.unsplash.com/photo-1616442918958-f419891e4436",
  imageAlt: 'Head No. 2 Naum Gabo 1916 arca binaan konstruktivis kepingan logam bentuk geometri abstrak'
},
{
  title: 'Cubi XII',
  artist: 'David Smith',
  year: '1963',
  desc: 'Arca binaan keluli tahan karat yang menggabungkan bentuk-bentuk kubik dalam komposisi yang seimbang dan dinamik, mencerminkan pengaruh Kubisme dalam arca binaan Amerika.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4fa260dae-1789602793927.png",
  imageAlt: 'Cubi XII David Smith 1963 arca binaan keluli tahan karat bentuk kubik seimbang dan dinamik'
},
{
  title: 'Endless Column',
  artist: 'Constantin Brancusi',
  year: '1938',
  desc: 'Tiang arca binaan besi tuang setinggi 29 meter di Târgu Jiu Romania, terdiri daripada unit-unit modular berulang yang mewakili keabadian dan hubungan antara bumi dan langit.',
  imageUrl: "/assets/images/endless_column_brancusi.png",
  imageAlt: 'Endless Column Constantin Brancusi 1938 tiang arca binaan besi tuang 29 meter unit modular berulang di Targu Jiu Romania'
},
{
  title: 'Linear Construction No. 1',
  artist: 'Naum Gabo',
  year: '1942–1943',
  desc: 'Arca binaan daripada plastik dan benang nilon yang menggambarkan bentuk tiga dimensi melalui garisan-garisan halus yang direntang, menunjukkan keupayaan bahan moden dalam menghasilkan bentuk abstrak yang kompleks.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4d1622612-1789743579437.png",
  imageAlt: 'Linear Construction No. 1 Naum Gabo 1942 arca binaan plastik dan benang nilon bentuk abstrak'
}];


export default function ArcaBinaanPage() {
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
      <div className="absolute inset-0 z-0" style={{ background: 'rgba(140, 60, 10, 0.72)' }} />
      <div className="absolute inset-0 pointer-events-none z-1" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,160,60,0.12) 0%, transparent 70%)' }} />

      <Link href="/projects/arca/buku/jenis" className="absolute top-5 left-5 z-50 flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.88)', boxShadow: '0 2px 12px rgba(0,0,0,0.25)', color: '#6a2a00', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="#6a2a00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Back
      </Link>

      <div className="absolute z-30 w-full flex justify-center" style={{ top: '3%' }}>
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '0.18em', color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.5)', lineHeight: 1 }}>ARCA BINAAN</h1>
      </div>

      <div className="absolute z-20" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: '2%' }}>
        <div onClick={handleBookClick} style={{ cursor: isFlipping ? 'default' : 'pointer', perspective: '1400px', perspectiveOrigin: '50% 50%' }}>
          {(isClosed || isOpening || bookState === 'closing') && <ClosedBook isOpening={isOpening} isClosing={bookState === 'closing'} />}
          {bookState === 'open' && <OpenBook currentSpread={currentSpread} isFlipping={isFlipping} flipDirection={flipDirection} />}
        </div>
        {bookState === 'open' &&
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
            {[1, 2, 3, 4].map((n) => <div key={n} style={{ width: n === currentSpread ? 20 : 8, height: 8, borderRadius: 4, background: n === currentSpread ? ACCENT : 'rgba(230,126,34,0.35)', transition: 'all 0.3s ease' }} />)}
          </div>
        }
      </div>

      <button onClick={() => setShowBahan(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '3%', left: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2657-1789578278816.jpeg" alt="Bahan arca binaan" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Bahan</span>
      </button>
      <button onClick={() => setShowKarya(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '3%', right: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2656-1789578278955.jpeg" alt="Karya arca binaan" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Karya</span>
      </button>

      {showBahan && <Modal title="Bahan & Alatan Arca Binaan" onClose={() => setShowBahan(false)} accent={ACCENT}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {BAHAN_DATA.map((section) =>
          <div key={section.category}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', fontWeight: 700, color: ACCENT, letterSpacing: '0.06em', marginBottom: 12, borderBottom: `1px solid ${ACCENT}33`, paddingBottom: 4 }}>{section.category}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
                {section.items.map((item) =>
              <div key={item.name} style={{ borderRadius: 8, overflow: 'hidden', background: '#fff', border: `1px solid ${ACCENT}22`, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.imageAlt} style={{ width: '100%', height: 70, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '6px 8px' }}><span style={{ fontFamily: 'Georgia, serif', fontSize: '0.72rem', color: '#6a2a00', fontWeight: 600, lineHeight: 1.3, display: 'block' }}>{item.name}</span></div>
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
      </Modal>}

      {showKarya && <Modal title="Contoh Karya Arca Binaan" onClose={() => setShowKarya(false)} accent={ACCENT}>
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
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 1vw, 0.75rem)', fontWeight: 700, color: 'rgba(255,230,200,0.9)', letterSpacing: '0.12em', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>ARCA BINAAN</span>
      </div>
      <div style={{ width: '100%', height: '100%', background: `linear-gradient(145deg, ${ACCENT_LIGHT} 0%, ${ACCENT} 30%, #a04000 60%, ${ACCENT_DARK} 100%)`, borderRadius: '2px 8px 8px 2px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.2)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 12, border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: '72%', height: '48%', borderRadius: 6, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.25)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/arca_binaan_cover.png" alt="Karya arca binaan pada kulit buku" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '14%', left: 0, right: 0, textAlign: 'center', padding: '0 16px' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.85rem, 2vw, 1.2rem)', fontWeight: 900, color: 'rgba(255,230,200,0.97)', letterSpacing: '0.15em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>ARCA BINAAN</div>
          <div style={{ width: 40, height: 1.5, background: 'rgba(255,200,150,0.6)', margin: '6px auto 0', borderRadius: 1 }} />
        </div>
        <div style={{ position: 'absolute', right: -6, top: 4, bottom: 4, width: 6, background: 'linear-gradient(90deg, #fef5e7 0%, #fde8c8 50%, #fcd5a0 100%)', borderRadius: '0 2px 2px 0', boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.15)' }}>
          {Array.from({ length: 20 }).map((_, i) => <div key={i} style={{ height: '5%', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }} />)}
        </div>
      </div>
    </div>);

}

function OpenBook({ currentSpread, isFlipping, flipDirection }: {currentSpread: number;isFlipping: boolean;flipDirection: 'forward' | 'backward';}) {
  const spread = SPREADS_DATA[currentSpread - 1];
  return (
    <div style={{ width: 'clamp(320px, 80vw, 900px)', height: 'clamp(240px, 55vh, 580px)', position: 'relative', display: 'flex', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 12px 30px rgba(0,0,0,0.35))' }}>
      <div style={{ flex: 1, background: 'linear-gradient(105deg, #fef5e7 0%, #fde8c8 100%)', borderRadius: '8px 0 0 8px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.08)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-5deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'right center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>{spread && <LeftPageContent spread={spread} />}</div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06))', pointerEvents: 'none', zIndex: 3 }} />
      </div>
      <div style={{ width: 'clamp(12px, 1.5vw, 20px)', background: `linear-gradient(90deg, ${ACCENT_DARK} 0%, #a04000 40%, ${ACCENT} 60%, #ca6f1e 100%)`, position: 'relative', boxShadow: '0 0 12px rgba(0,0,0,0.3)', zIndex: 10, flexShrink: 0 }}>
        {Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: '50%', top: `${10 + i * 11}%`, transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,200,150,0.5)' }} />)}
      </div>
      <div style={{ flex: 1, background: 'linear-gradient(75deg, #fde8c8 0%, #fef5e7 100%)', borderRadius: '0 8px 8px 0', position: 'relative', overflow: 'hidden', boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.06)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-180deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'left center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>{spread && <RightPageContent spread={spread} />}</div>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.05))', pointerEvents: 'none', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 10, right: 16, fontFamily: 'Georgia, serif', fontSize: '0.65rem', color: `${ACCENT}66`, letterSpacing: '0.1em', zIndex: 4 }}>{currentSpread * 2}</div>
      </div>
      {isFlipping && <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'linear-gradient(105deg, #fde8c8 0%, #fef5e7 100%)', transformOrigin: 'left center', animation: 'pageFlipBinaan 0.7s cubic-bezier(0.4,0,0.2,1) forwards', zIndex: 20, borderRadius: '0 8px 8px 0', boxShadow: '-8px 0 24px rgba(0,0,0,0.2)' }} />}
      <style>{`@keyframes pageFlipBinaan { 0% { transform: rotateY(0deg); } 50% { transform: rotateY(-90deg); } 100% { transform: rotateY(-180deg); } }`}</style>
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
      {s.leftText && <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#6a2a00', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{s.leftText}</p>}
      {s.id === 1 && s.imageUrl && <div style={{ flex: 1, borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${ACCENT}33`, minHeight: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}
      {s.leftItems && <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>{s.leftItems.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 8 }}><div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: ACCENT_DARK, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#6a2a00', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div></div></div>)}</div>}
      {s.leftSubheading && <><h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: ACCENT, margin: 0, letterSpacing: '0.04em' }}>{s.leftSubheading}</h3><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)', flex: 1 }}>{s.leftTechniques?.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid ${ACCENT}66`, paddingLeft: 8 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: ACCENT_DARK }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#6a2a00', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div></div>)}</div></>}
      <div style={{ marginTop: 'auto', fontFamily: 'Georgia, serif', fontSize: '0.6rem', color: `${ACCENT}55`, letterSpacing: '0.1em' }}>{spread.id * 2 - 1}</div>
    </div>);

}

function RightPageContent({ spread }: {spread: typeof SPREADS_DATA[0];}) {
  const s = spread as any;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vh, 14px)' }}>
      {s.id === 1 && <><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#6a2a00', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{s.rightText1}</p><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#6a2a00', lineHeight: 1.7, margin: 0, textAlign: 'justify', fontStyle: 'italic', borderLeft: `2px solid ${ACCENT}55`, paddingLeft: 10 }}>{s.rightText2}</p></>}
      {s.id === 2 && s.rightHeading && <><div><h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', fontWeight: 900, color: ACCENT, letterSpacing: '0.06em', margin: 0, lineHeight: 1.2 }}>{s.rightHeading}</h2><div style={{ width: 'clamp(28px, 5vw, 48px)', height: 2, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, marginTop: 5, borderRadius: 1 }} /></div><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>{s.rightItems?.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 8 }}><div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: ACCENT_DARK, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#6a2a00', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div></div></div>)}</div></>}
      {s.rightTechniques && <><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)' }}>{s.rightTechniques.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid ${ACCENT}66`, paddingLeft: 8 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: ACCENT_DARK }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#6a2a00', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div></div>)}</div>{s.rightSubheading && <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: ACCENT, margin: '4px 0 0', letterSpacing: '0.04em' }}>{s.rightSubheading}</h3>}{s.rightProcess && <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>{s.rightProcess.map((step: string, i: number) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 'clamp(14px, 1.8vw, 20px)', height: 'clamp(14px, 1.8vw, 20px)', borderRadius: '50%', border: `1.5px solid ${ACCENT}88`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)', fontWeight: 700, color: ACCENT, fontFamily: 'Georgia, serif', flexShrink: 0 }}>{i + 1}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#6a2a00', lineHeight: 1.4 }}>{step}</div></div>)}</div>}</>}
      {s.id === 4 && <>{s.imageUrl && <div style={{ height: 'clamp(80px, 20vh, 160px)', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${ACCENT}33`, flexShrink: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}{[s.rightText1, s.rightText2, s.rightText3].filter(Boolean).map((text: string, i: number) => <p key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: '#6a2a00', lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{text}</p>)}</>}
    </div>);

}

function Modal({ title, children, onClose, accent }: {title: string;children: React.ReactNode;onClose: () => void;accent: string;}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #fef5e7 0%, #fde8c8 100%)', borderRadius: 16, padding: 'clamp(20px, 3vw, 32px)', maxWidth: 720, width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.4)', border: `1px solid ${accent}33`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: `1.5px solid ${accent}44` }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 900, color: accent, margin: 0, letterSpacing: '0.06em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: `${accent}22`, border: `1px solid ${accent}44`, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: accent, fontSize: '1rem', fontWeight: 700 }}>×</button>
        </div>
        {children}
      </div>
    </div>);

}