'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type BookState = 'closed' | 'opening' | 'open' | 'closing';

const ACCENT = '#8E44AD';
const ACCENT_DARK = '#6c3483';
const ACCENT_LIGHT = '#c39bd3';

const SPREADS_DATA = [
{
  id: 1,
  topic: 'Definisi',
  leftHeading: 'Definisi',
  leftText: 'Arca stabail (stabile) ialah sejenis arca abstrak yang berdiri tegak di atas lantai atau dipasang pada permukaan tanpa bahagian yang bergerak. Istilah "stabile" dicipta oleh pengarca Alexander Calder untuk membezakan karya-karyanya yang statik daripada mobail yang bergerak. Arca stabail menekankan kestabilan, keteguhan dan kehadiran fizikal yang kuat dalam ruang.',
  rightText1: 'Berbeza dengan mobail yang bergantung pada pergerakan, stabail memanfaatkan berat, keseimbangan dan hubungan antara bentuk-bentuk abstrak untuk mewujudkan komposisi yang dinamik secara visual walaupun ia tidak bergerak. Bentuk-bentuk geometri dan organik yang besar sering digunakan untuk mewujudkan kehadiran yang kuat dan monumental.',
  rightText2: 'Arca stabail sering ditempatkan di ruang awam seperti taman, dataran bandar dan hadapan bangunan korporat atau institusi, berfungsi sebagai karya seni awam yang menjadi tanda aras visual dan titik tumpuan dalam persekitaran bandar.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_450975cee-1789738116393.png",
  imageAlt: 'La Grande Vitesse arca stabail Alexander Calder di Grand Rapids Michigan'
},
{
  id: 2,
  topic: 'Ciri-ciri',
  leftHeading: 'Ciri-ciri',
  leftItems: [
  { num: '1', title: 'Struktur statik dan stabail', desc: 'Tidak seperti mobail, stabail tidak bergerak — ia berdiri tegak dengan kestabilan yang kukuh, memanfaatkan berat dan keseimbangan struktur.' },
  { num: '2', title: 'Bentuk abstrak dan geometri', desc: 'Menggunakan bentuk-bentuk abstrak, geometri atau organik yang besar untuk mewujudkan komposisi visual yang kuat dan berimpak.' },
  { num: '3', title: 'Berskala besar dan monumental', desc: 'Banyak stabail direka dalam skala besar untuk ditempatkan di ruang awam, mewujudkan kehadiran yang dominan dalam persekitaran.' },
  { num: '4', title: 'Menggunakan bahan industri', desc: 'Logam seperti keluli, aluminium dan besi lazim digunakan kerana kekuatan, ketahanan dan keupayaannya untuk dibentuk dalam skala besar.' }],

  rightHeading: 'Jenis Arca Stabail',
  rightItems: [
  { num: 'A', title: 'Stabail Lantai (Floor Stabile)', desc: 'Berdiri terus di atas lantai atau tanah dengan kaki atau tapak yang stabail, sering dalam skala besar untuk ruang awam.' },
  { num: 'B', title: 'Stabail Dinding (Wall Stabile)', desc: 'Dipasang pada dinding sebagai karya seni tiga dimensi yang menonjol dari permukaan dinding, menggabungkan elemen arca dan hiasan.' },
  { num: 'C', title: 'Stabail Monumental', desc: 'Arca stabail berskala sangat besar yang menjadi landmark atau tanda aras dalam persekitaran bandar atau institusi.' },
  { num: 'D', title: 'Stabail Meja (Table Stabile)', desc: 'Versi kecil stabail yang direka untuk ditempatkan di atas meja atau permukaan dalaman, sesuai untuk koleksi peribadi.' }],

  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_44d80ad7b-1789738113966.png",
  imageAlt: 'Arca stabail menunjukkan ciri-ciri bentuk abstrak dan struktur statik'
},
{
  id: 3,
  topic: 'Teknik Penghasilan',
  leftHeading: 'Teknik Penghasilan',
  leftSubheading: 'Teknik Utama',
  leftTechniques: [
  { name: 'Teknik Kimpalan (Welding)', desc: 'Kepingan logam disambung menggunakan kimpalan elektrik atau gas untuk menghasilkan struktur yang kukuh dan tahan lama.' },
  { name: 'Teknik Pembentukan Logam (Metal Forming)', desc: 'Logam dipotong, dibengkokkan, ditekan atau ditempa untuk menghasilkan bentuk-bentuk yang dikehendaki sebelum disambung.' },
  { name: 'Teknik Pengecoran (Casting)', desc: 'Logam cair dituang ke dalam acuan untuk menghasilkan bentuk-bentuk kompleks yang sukar dihasilkan melalui pembentukan langsung.' }],

  rightTechniques: [
  { name: 'Teknik Pemotongan Laser', desc: 'Teknologi moden membolehkan pemotongan logam yang tepat dan halus untuk menghasilkan bentuk-bentuk kompleks dengan ketepatan tinggi.' },
  { name: 'Teknik Penggilap & Kemasan', desc: 'Permukaan logam digilap, dicat atau dirawat dengan bahan kimia untuk menghasilkan kemasan yang dikehendaki dan melindungi daripada karat.' }],

  rightSubheading: 'Proses Penghasilan',
  rightProcess: [
  'Merancang konsep dan menghasilkan lakaran',
  'Membuat model skala kecil (maquette)',
  'Memilih dan menyediakan bahan logam',
  'Memotong logam mengikut bentuk yang dikehendaki',
  'Membentuk dan membengkokkan kepingan logam',
  'Mengimpal komponen-komponen bersama',
  'Kemasan akhir (penggilap, cat atau patina)']

},
{
  id: 4,
  topic: 'Nilai Estetika',
  leftHeading: 'Nilai Estetika',
  leftText: 'Nilai estetika arca stabail terletak pada keupayaannya mewujudkan kehadiran yang kuat dan berimpak dalam ruang. Walaupun ia tidak bergerak, komposisi bentuk-bentuk abstrak yang dirancang dengan teliti menghasilkan dinamisme visual yang menarik perhatian dari pelbagai sudut pandang. Setiap sudut pemerhatian mendedahkan hubungan bentuk yang berbeza.',
  rightText1: 'Permainan cahaya dan bayang pada permukaan logam stabail menghasilkan kesan visual yang dramatik dan sentiasa berubah mengikut masa dan keadaan cahaya. Permukaan yang digilap memantulkan persekitaran, manakala permukaan yang kasar atau bercat menyerap cahaya, mewujudkan kontras yang menarik.',
  rightText2: 'Skala monumental banyak arca stabail mewujudkan hubungan yang unik antara manusia dan karya seni. Penonton yang berdiri di bawah atau di sebelah stabail besar merasai kehadiran fizikal yang kuat, menjadikan pengalaman melihat stabail sebagai pengalaman fizikal dan emosional yang berbeza daripada melihat karya seni di galeri.',
  rightText3: 'Dalam konteks seni awam, stabail berfungsi sebagai titik tumpuan visual dan sosial dalam persekitaran bandar. Ia mengubah ruang awam menjadi ruang seni, mengundang interaksi dan pemerhatian daripada orang ramai yang mungkin tidak pernah mengunjungi galeri seni.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4529452ce-1789738116400.png",
  imageAlt: 'Nilai estetika arca stabail dalam ruang awam sebagai karya monumental'
}];


const BAHAN_DATA = [
{ category: 'Bahan Utama', items: [
  { name: 'Kepingan Keluli', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4dbad9da2-1789738115009.png", imageAlt: 'Kepingan keluli untuk arca stabail' },
  { name: 'Aluminium Tebal', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1bf98fb1d-1765116632666.png", imageAlt: 'Aluminium tebal untuk stabail' },
  { name: 'Besi Tuang', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_480da82c6-1789738114119.png", imageAlt: 'Besi tuang untuk arca stabail berat' },
  { name: 'Gangsa', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4776fddce-1789738114182.png", imageAlt: 'Gangsa untuk arca stabail berkualiti tinggi' },
  { name: 'Batu Granit', imageUrl: "https://images.unsplash.com/photo-1500522713058-19679d16413f", imageAlt: 'Batu granit untuk tapak arca stabail' }]
},
{ category: 'Alatan Kimpalan', items: [
  { name: 'Mesin Kimpalan MIG', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_18c9d5c8e-1772488831575.png", imageAlt: 'Mesin kimpalan MIG untuk logam' },
  { name: 'Mesin Kimpalan TIG', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_15638fa4f-1765071693856.png", imageAlt: 'Mesin kimpalan TIG untuk kerja halus' },
  { name: 'Gerinder Sudut', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_15219762a-1772115095903.png", imageAlt: 'Gerinder sudut untuk menghaluskan kimpalan' }]
},
{ category: 'Alatan Pembentukan', items: [
  { name: 'Penebuk Hidraulik', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1c9999c36-1767780846633.png", imageAlt: 'Penebuk hidraulik untuk membentuk logam' },
  { name: 'Tukul Besi', imageUrl: "/assets/images/tukul_besi.png", imageAlt: 'Tukul besi untuk kerja tempa logam' }]
},
{ category: 'Bahan Kemasan', items: [
  { name: 'Cat Logam Tahan Karat', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1ebb8df92-1766724396966.png", imageAlt: 'Cat logam tahan karat untuk kemasan stabail' },
  { name: 'Patina Kimia', imageUrl: "https://images.unsplash.com/photo-1573875488734-e7497faf82b1", imageAlt: 'Patina kimia untuk kemasan gangsa' },
  { name: 'Bahan Penggilap Logam', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_10078b43b-1771184118931.png", imageAlt: 'Bahan penggilap untuk kemasan logam berkilat' },
  { name: 'Primer Anti-Karat', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_18a42edf4-1782716883152.png", imageAlt: 'Primer anti-karat untuk perlindungan logam' }]
}];


const KARYA_DATA = [
{
  title: 'La Grande Vitesse',
  artist: 'Alexander Calder',
  year: '1969',
  desc: 'Arca stabail keluli merah berskala besar di Grand Rapids, Michigan, merupakan karya seni awam pertama yang dibiayai oleh National Endowment for the Arts Amerika Syarikat dan menjadi simbol bandar tersebut.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_498604256-1789738116646.png",
  imageAlt: 'La Grande Vitesse Alexander Calder 1969 arca stabail keluli merah di Grand Rapids Michigan'
},
{
  title: 'Flamingo',
  artist: 'Alexander Calder',
  year: '1974',
  desc: 'Arca stabail keluli merah setinggi 16 meter di Federal Plaza Chicago, menampilkan bentuk organik yang menyerupai flamingo dan menjadi salah satu karya seni awam paling terkenal di Amerika Syarikat.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4ec72ad5a-1789602795635.png",
  imageAlt: 'Flamingo Alexander Calder 1974 arca stabail keluli merah setinggi 16 meter di Federal Plaza Chicago'
},
{
  title: 'Cloud Gate',
  artist: 'Anish Kapoor',
  year: '2006',
  desc: 'Arca stabail keluli tahan karat berbentuk kacang besar di Millennium Park Chicago, memantulkan pemandangan bandar dan langit secara melengkung, menjadi antara karya seni awam paling banyak difotografi di dunia.',
  imageUrl: "https://images.unsplash.com/photo-1603156368531-0720b6373a38",
  imageAlt: 'Cloud Gate Anish Kapoor 2006 arca stabail keluli tahan karat berbentuk kacang di Millennium Park Chicago'
},
{
  title: 'Spoonbridge and Cherry',
  artist: 'Claes Oldenburg & Coosje van Bruggen',
  year: '1988',
  desc: 'Arca stabail ikonik di Minneapolis Sculpture Garden menggambarkan sudu besar dengan ceri merah di hujungnya, menggabungkan humor, skala monumental dan kritik budaya pengguna dalam satu karya awam.',
  imageUrl: "https://images.unsplash.com/photo-1595295330421-5741a3490beb",
  imageAlt: 'Spoonbridge and Cherry Claes Oldenburg 1988 arca stabail sudu besar dengan ceri di Minneapolis'
}];


export default function ArcaStabilPage() {
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
      <div className="absolute inset-0 z-0" style={{ background: 'rgba(80, 30, 120, 0.72)' }} />
      <div className="absolute inset-0 pointer-events-none z-1" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(180,100,255,0.12) 0%, transparent 70%)' }} />

      <Link href="/projects/arca/buku/jenis" className="absolute top-5 left-5 z-50 flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.88)', boxShadow: '0 2px 12px rgba(0,0,0,0.25)', color: '#4a1a6a', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="#4a1a6a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Back
      </Link>

      <div className="absolute z-30 w-full flex justify-center" style={{ top: '3%' }}>
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '0.18em', color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.5)', lineHeight: 1 }}>ARCA STABAIL</h1>
      </div>

      <div className="absolute z-20" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: '2%' }}>
        <div onClick={handleBookClick} style={{ cursor: isFlipping ? 'default' : 'pointer', perspective: '1400px', perspectiveOrigin: '50% 50%' }}>
          {(isClosed || isOpening || bookState === 'closing') && <ClosedBook isOpening={isOpening} isClosing={bookState === 'closing'} />}
          {bookState === 'open' && <OpenBook currentSpread={currentSpread} isFlipping={isFlipping} flipDirection={flipDirection} />}
        </div>
        {bookState === 'open' &&
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
            {[1, 2, 3, 4].map((n) => <div key={n} style={{ width: n === currentSpread ? 20 : 8, height: 8, borderRadius: 4, background: n === currentSpread ? ACCENT : 'rgba(142,68,173,0.35)', transition: 'all 0.3s ease' }} />)}
          </div>
        }
      </div>

      <button onClick={() => setShowBahan(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '3%', left: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2657-1789578278816.jpeg" alt="Bahan arca stabail" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Bahan</span>
      </button>
      <button onClick={() => setShowKarya(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '3%', right: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2656-1789578278955.jpeg" alt="Karya arca stabail" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Karya</span>
      </button>

      {showBahan && <Modal title="Bahan & Alatan Arca Stabail" onClose={() => setShowBahan(false)} accent={ACCENT}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {BAHAN_DATA.map((section) =>
          <div key={section.category}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', fontWeight: 700, color: ACCENT, letterSpacing: '0.06em', marginBottom: 12, borderBottom: `1px solid ${ACCENT}33`, paddingBottom: 4 }}>{section.category}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
                {section.items.map((item) =>
              <div key={item.name} style={{ borderRadius: 8, overflow: 'hidden', background: '#fff', border: `1px solid ${ACCENT}22`, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.imageAlt} style={{ width: '100%', height: 70, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '6px 8px' }}><span style={{ fontFamily: 'Georgia, serif', fontSize: '0.72rem', color: '#4a1a6a', fontWeight: 600, lineHeight: 1.3, display: 'block' }}>{item.name}</span></div>
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
      </Modal>}

      {showKarya && <Modal title="Contoh Karya Arca Stabail" onClose={() => setShowKarya(false)} accent={ACCENT}>
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
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 1vw, 0.75rem)', fontWeight: 700, color: 'rgba(240,200,255,0.9)', letterSpacing: '0.12em', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>ARCA STABAIL</span>
      </div>
      <div style={{ width: '100%', height: '100%', background: `linear-gradient(145deg, ${ACCENT_LIGHT} 0%, ${ACCENT} 30%, #6c3483 60%, ${ACCENT_DARK} 100%)`, borderRadius: '2px 8px 8px 2px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.2)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 12, border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: '72%', height: '48%', borderRadius: 6, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.25)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://img.rocket.new/generatedImages/rocket_gen_img_4212bf6cb-1789669528406.png" alt="Arca stabil Calder pada kulit buku" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '14%', left: 0, right: 0, textAlign: 'center', padding: '0 16px' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.85rem, 2vw, 1.2rem)', fontWeight: 900, color: 'rgba(240,200,255,0.97)', letterSpacing: '0.15em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>ARCA STABAIL</div>
          <div style={{ width: 40, height: 1.5, background: 'rgba(220,180,255,0.6)', margin: '6px auto 0', borderRadius: 1 }} />
        </div>
        <div style={{ position: 'absolute', right: -6, top: 4, bottom: 4, width: 6, background: 'linear-gradient(90deg, #f5eef8 0%, #e8daef 50%, #d7bde2 100%)', borderRadius: '0 2px 2px 0', boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.15)' }}>
          {Array.from({ length: 20 }).map((_, i) => <div key={i} style={{ height: '5%', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }} />)}
        </div>
      </div>
    </div>);

}

function OpenBook({ currentSpread, isFlipping, flipDirection }: {currentSpread: number;isFlipping: boolean;flipDirection: 'forward' | 'backward';}) {
  const spread = SPREADS_DATA[currentSpread - 1];
  return (
    <div style={{ width: 'clamp(320px, 80vw, 900px)', height: 'clamp(240px, 55vh, 580px)', position: 'relative', display: 'flex', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 12px 30px rgba(0,0,0,0.35))' }}>
      <div style={{ flex: 1, background: 'linear-gradient(105deg, #f5eef8 0%, #e8daef 100%)', borderRadius: '8px 0 0 8px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.08)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-5deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'right center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>{spread && <LeftPageContent spread={spread} />}</div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06))', pointerEvents: 'none', zIndex: 3 }} />
      </div>
      <div style={{ width: 'clamp(12px, 1.5vw, 20px)', background: `linear-gradient(90deg, ${ACCENT_DARK} 0%, #6c3483 40%, ${ACCENT} 60%, #7d3c98 100%)`, position: 'relative', boxShadow: '0 0 12px rgba(0,0,0,0.3)', zIndex: 10, flexShrink: 0 }}>
        {Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: '50%', top: `${10 + i * 11}%`, transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'rgba(220,180,255,0.5)' }} />)}
      </div>
      <div style={{ flex: 1, background: 'linear-gradient(75deg, #e8daef 0%, #f5eef8 100%)', borderRadius: '0 8px 8px 0', position: 'relative', overflow: 'hidden', boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.06)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-180deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'left center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>{spread && <RightPageContent spread={spread} />}</div>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.05))', pointerEvents: 'none', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 10, right: 16, fontFamily: 'Georgia, serif', fontSize: '0.65rem', color: `${ACCENT}66`, letterSpacing: '0.1em', zIndex: 4 }}>{currentSpread * 2}</div>
      </div>
      {isFlipping && <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'linear-gradient(105deg, #e8daef 0%, #f5eef8 100%)', transformOrigin: 'left center', animation: 'pageFlipStabail 0.7s cubic-bezier(0.4,0,0.2,1) forwards', zIndex: 20, borderRadius: '0 8px 8px 0', boxShadow: '-8px 0 24px rgba(0,0,0,0.2)' }} />}
      <style>{`@keyframes pageFlipStabail { 0% { transform: rotateY(0deg); } 50% { transform: rotateY(-90deg); } 100% { transform: rotateY(-180deg); } }`}</style>
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
      {s.leftText && <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#4a1a6a', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{s.leftText}</p>}
      {s.id === 1 && s.imageUrl && <div style={{ flex: 1, borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${ACCENT}33`, minHeight: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}
      {s.leftItems && <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>{s.leftItems.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 8 }}><div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: ACCENT_DARK, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#4a1a6a', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div></div></div>)}</div>}
      {s.leftSubheading && <><h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: ACCENT, margin: 0, letterSpacing: '0.04em' }}>{s.leftSubheading}</h3><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)', flex: 1 }}>{s.leftTechniques?.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid ${ACCENT}66`, paddingLeft: 8 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: ACCENT_DARK }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#4a1a6a', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div></div>)}</div></>}
      <div style={{ marginTop: 'auto', fontFamily: 'Georgia, serif', fontSize: '0.6rem', color: `${ACCENT}55`, letterSpacing: '0.1em' }}>{spread.id * 2 - 1}</div>
    </div>);

}

function RightPageContent({ spread }: {spread: typeof SPREADS_DATA[0];}) {
  const s = spread as any;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vh, 14px)' }}>
      {s.id === 1 && <><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#4a1a6a', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{s.rightText1}</p><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#4a1a6a', lineHeight: 1.7, margin: 0, textAlign: 'justify', fontStyle: 'italic', borderLeft: `2px solid ${ACCENT}55`, paddingLeft: 10 }}>{s.rightText2}</p></>}
      {s.id === 2 && s.rightHeading && <><div><h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', fontWeight: 900, color: ACCENT, letterSpacing: '0.06em', margin: 0, lineHeight: 1.2 }}>{s.rightHeading}</h2><div style={{ width: 'clamp(28px, 5vw, 48px)', height: 2, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, marginTop: 5, borderRadius: 1 }} /></div><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>{s.rightItems?.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 8 }}><div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: ACCENT_DARK, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#4a1a6a', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div></div></div>)}</div></>}
      {s.rightTechniques && <><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)' }}>{s.rightTechniques.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid ${ACCENT}66`, paddingLeft: 8 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: ACCENT_DARK }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#4a1a6a', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div></div>)}</div>{s.rightSubheading && <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: ACCENT, margin: '4px 0 0', letterSpacing: '0.04em' }}>{s.rightSubheading}</h3>}{s.rightProcess && <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>{s.rightProcess.map((step: string, i: number) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 'clamp(14px, 1.8vw, 20px)', height: 'clamp(14px, 1.8vw, 20px)', borderRadius: '50%', border: `1.5px solid ${ACCENT}88`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)', fontWeight: 700, color: ACCENT, fontFamily: 'Georgia, serif', flexShrink: 0 }}>{i + 1}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#4a1a6a', lineHeight: 1.4 }}>{step}</div></div>)}</div>}</>}
      {s.id === 4 && <>{s.imageUrl && <div style={{ height: 'clamp(80px, 20vh, 160px)', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${ACCENT}33`, flexShrink: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}{[s.rightText1, s.rightText2, s.rightText3].filter(Boolean).map((text: string, i: number) => <p key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: '#4a1a6a', lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{text}</p>)}</>}
    </div>);

}

function Modal({ title, children, onClose, accent }: {title: string;children: React.ReactNode;onClose: () => void;accent: string;}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #f5eef8 0%, #e8daef 100%)', borderRadius: 16, padding: 'clamp(20px, 3vw, 32px)', maxWidth: 720, width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.4)', border: `1px solid ${accent}33`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: `1.5px solid ${accent}44` }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 900, color: accent, margin: 0, letterSpacing: '0.06em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: `${accent}22`, border: `1px solid ${accent}44`, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: accent, fontSize: '1rem', fontWeight: 700 }}>×</button>
        </div>
        {children}
      </div>
    </div>);

}