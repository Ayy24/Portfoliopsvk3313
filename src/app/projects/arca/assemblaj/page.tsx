'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type BookState = 'closed' | 'opening' | 'open' | 'closing';

const ACCENT = '#27AE60';
const ACCENT_DARK = '#1a7a42';
const ACCENT_LIGHT = '#58d68d';

const SPREADS_DATA = [
{
  id: 1,
  topic: 'Definisi',
  leftHeading: 'Definisi',
  leftText: 'Arca assemblaj ialah sejenis karya seni tiga dimensi yang dihasilkan dengan mengumpulkan, menyusun dan menyambung pelbagai objek atau bahan ditemui (found objects) menjadi satu komposisi baharu yang bermakna. Teknik ini menekankan kreativiti dalam mengubah fungsi dan konteks objek seharian, memberikan makna baharu kepada bahan yang mungkin dianggap tidak bernilai.',
  rightText1: 'Arca assemblaj muncul sebagai gerakan seni yang signifikan pada awal abad ke-20, dirintis oleh Pablo Picasso dan Georges Braque dalam konteks Kubisme. Ia kemudiannya berkembang melalui gerakan Dada, Surealisme dan seni Pop Art. Pengkarya seperti Kurt Schwitters, Joseph Cornell dan Robert Rauschenberg telah memperluas definisi assemblaj sebagai medium ekspresi artistik yang bebas.',
  rightText2: 'Dalam konteks pendidikan seni visual Malaysia, arca assemblaj mendorong pelajar untuk melihat potensi estetika dalam objek seharian dan bahan kitar semula, memupuk kreativiti, pemikiran kritis dan kesedaran alam sekitar secara serentak.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4bfec0b5d-1789604407482.png",
  imageAlt: 'Guitar assemblaj karya Pablo Picasso 1912 menggunakan kepingan logam dan wayar'
},
{
  id: 2,
  topic: 'Ciri-ciri & Jenis',
  leftHeading: 'Ciri-ciri',
  leftItems: [
  { num: '1', title: 'Menggunakan objek ditemui (found objects)', desc: 'Bahan dan objek seharian yang ditemui atau dikumpulkan digunakan sebagai komponen utama karya, mengubah fungsi asal objek tersebut.' },
  { num: '2', title: 'Komposisi tiga dimensi', desc: 'Objek disusun dan disambung dalam ruang tiga dimensi, mewujudkan hubungan visual dan konseptual antara pelbagai elemen.' },
  { num: '3', title: 'Menekankan konsep dan makna', desc: 'Pemilihan objek dan cara penyusunannya membawa makna simbolik, naratif atau konseptual yang ingin disampaikan oleh pengkarya.' },
  { num: '4', title: 'Fleksibel dalam penggunaan bahan', desc: 'Tiada had dalam jenis bahan yang boleh digunakan — dari logam, kayu, kain, kertas hingga objek elektronik dan bahan organik.' }],

  rightHeading: 'Jenis Arca Assemblaj',
  rightItems: [
  { num: 'A', title: 'Assemblaj Objek Ditemui (Found Object)', desc: 'Menggunakan objek sedia ada tanpa pengubahsuaian besar, seperti karya Marcel Duchamp yang menggunakan objek industri sebagai karya seni.' },
  { num: 'B', title: 'Assemblaj Kolaj 3D', desc: 'Menggabungkan teknik kolaj dua dimensi dengan elemen tiga dimensi, mewujudkan karya yang menonjol dari permukaan asas.' },
  { num: 'C', title: 'Assemblaj Bahan Kitar Semula', desc: 'Menggunakan bahan buangan dan kitar semula sebagai medium utama, menyampaikan mesej alam sekitar dan kelestarian.' },
  { num: 'D', title: 'Assemblaj Kotak (Box Assemblage)', desc: 'Objek disusun dalam kotak atau bekas, seperti karya Joseph Cornell yang terkenal dengan kotak-kotak berisi objek puitis.' }],

  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4c3e1521b-1789743581280.png",
  imageAlt: 'Contoh arca assemblaj menggunakan pelbagai objek ditemui'
},
{
  id: 3,
  topic: 'Teknik Penghasilan',
  leftHeading: 'Teknik Penghasilan',
  leftSubheading: 'Teknik Utama',
  leftTechniques: [
  { name: 'Teknik Pengumpulan & Pemilihan', desc: 'Objek dan bahan dikumpulkan secara sistematik berdasarkan tema, warna, tekstur atau makna simbolik yang ingin disampaikan.' },
  { name: 'Teknik Penyambungan (Joining)', desc: 'Objek disambung menggunakan pelbagai kaedah seperti gam, skru, wayar, tali, kimpalan atau jahitan bergantung pada jenis bahan.' },
  { name: 'Teknik Pengubahsuaian (Alteration)', desc: 'Objek diubahsuai melalui pemotongan, pengecatan, pembakaran atau proses lain untuk mengubah rupa dan makna asalnya.' }],

  rightTechniques: [
  { name: 'Teknik Penyusunan Komposisi', desc: 'Objek disusun secara berulang kali untuk mencari komposisi terbaik sebelum disambung secara kekal, mempertimbangkan imbangan, irama dan penegasan.' },
  { name: 'Teknik Pemasangan (Installation)', desc: 'Assemblaj berskala besar dipasang pada dinding, lantai atau digantung dari siling, mengambil kira hubungan karya dengan ruang persekitaran.' }],

  rightSubheading: 'Proses Penghasilan',
  rightProcess: [
  'Menentukan tema, konsep dan mesej karya',
  'Mengumpulkan dan memilih objek yang bersesuaian',
  'Menghasilkan lakaran komposisi awal',
  'Mengubahsuai objek jika perlu (cat, potong, bentuk)',
  'Menyusun objek dan menguji komposisi',
  'Menyambung objek secara kekal menggunakan kaedah sesuai',
  'Kemasan akhir dan pemasangan karya']

},
{
  id: 4,
  topic: 'Nilai Estetika',
  leftHeading: 'Nilai Estetika',
  leftText: 'Nilai estetika arca assemblaj terletak pada keupayaannya mencabar persepsi penonton tentang apa yang dianggap sebagai "seni". Dengan menggunakan objek seharian dalam konteks seni, assemblaj mempersoalkan sempadan antara seni dan kehidupan, antara yang bernilai dan yang dianggap buangan. Ketegangan konseptual ini menjadi sumber kekuatan estetika yang unik.',
  rightText1: 'Tekstur, warna dan bentuk pelbagai objek yang digabungkan dalam satu komposisi menghasilkan kekayaan visual yang tidak dapat dicapai melalui medium tunggal. Kontras antara bahan yang berbeza — kasar dan halus, berkilat dan kusam, organik dan industri — mewujudkan dialog visual yang menarik dan dinamik.',
  rightText2: 'Dimensi naratif dan konseptual assemblaj menambahkan lapisan makna yang mendalam. Setiap objek membawa sejarah dan konteks tersendiri, dan apabila digabungkan, ia mewujudkan naratif baharu yang lebih kompleks. Penonton dijemput untuk mentafsir hubungan antara objek dan membina makna mereka sendiri.',
  rightText3: 'Dalam konteks seni Malaysia kontemporari, assemblaj digunakan oleh pengkarya untuk menyampaikan isu sosial, budaya dan alam sekitar. Penggunaan bahan tempatan dan objek yang bermakna secara budaya menjadikan assemblaj sebagai medium yang berkesan untuk menyuarakan identiti dan pengalaman Malaysia.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4de2015b8-1789596424256.png",
  imageAlt: 'Nilai estetika arca assemblaj melalui gabungan pelbagai objek dan bahan'
}];


const BAHAN_DATA = [
{ category: 'Objek Ditemui', items: [
  { name: 'Botol & Tin Terpakai', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_12f6a49d4-1772806482956.png", imageAlt: 'Botol dan tin terpakai untuk assemblaj' },
  { name: 'Kayu Terbuang', imageUrl: "https://images.unsplash.com/photo-1658574011536-7096772a50a2", imageAlt: 'Kepingan kayu terbuang untuk assemblaj' },
  { name: 'Komponen Elektronik', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1b1a85a7e-1772116727934.png", imageAlt: 'Komponen elektronik terpakai untuk assemblaj' },
  { name: 'Kain & Tekstil', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1346213ed-1786185083091.png", imageAlt: 'Kain dan tekstil untuk assemblaj' },
  { name: 'Logam Terbuang', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_18d040a54-1772632232075.png", imageAlt: 'Kepingan logam terbuang untuk assemblaj' }]
},
{ category: 'Bahan Penyambung', items: [
  { name: 'Gam Epoksi', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_14846f57f-1783684964995.png", imageAlt: 'Gam epoksi untuk menyambung objek assemblaj' },
  { name: 'Wayar & Tali', imageUrl: "https://images.unsplash.com/photo-1511624256781-23af4faf2fde", imageAlt: 'Wayar dan tali untuk mengikat objek assemblaj' },
  { name: 'Skru & Paku', imageUrl: "https://images.unsplash.com/photo-1466263726597-c2c4c0c9e0d5", imageAlt: 'Skru dan paku untuk menyambung bahan keras' },
  { name: 'Gam Panas (Hot Glue)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1473b51da-1766747473657.png", imageAlt: 'Gam panas untuk menyambung pelbagai bahan' }]
},
{ category: 'Alatan', items: [
  { name: 'Gergaji & Pemotong', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_14d8554a5-1773040908753.png", imageAlt: 'Gergaji untuk memotong bahan assemblaj' },
  { name: 'Peralatan Kimpalan', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1298a33e7-1769694089720.png", imageAlt: 'Peralatan kimpalan untuk logam' },
  { name: 'Gerudi', imageUrl: "https://images.unsplash.com/photo-1697071628662-6e14d952d488", imageAlt: 'Gerudi untuk membuat lubang pada bahan' },
  { name: 'Tang & Playar', imageUrl: "https://images.unsplash.com/photo-1665632498348-768188fe85c5", imageAlt: 'Tang dan playar untuk membentuk wayar' }]
},
{ category: 'Bahan Kemasan', items: [
  { name: 'Cat Semburan', imageUrl: "https://images.unsplash.com/photo-1578152532108-3429ebaaade3", imageAlt: 'Cat semburan untuk kemasan assemblaj' },
  { name: 'Cat Akrilik', imageUrl: "https://images.unsplash.com/photo-1702632212348-da0fd59b244d", imageAlt: 'Cat akrilik untuk mewarna objek assemblaj' },
  { name: 'Vernish Pelindung', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_162955fae-1765513269713.png", imageAlt: 'Vernish untuk melindungi permukaan assemblaj' },
  { name: 'Patina & Pewarna Logam', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1900280e4-1768750498337.png", imageAlt: 'Patina untuk kemasan logam assemblaj' }]
}];


const KARYA_DATA = [
{
  title: 'Guitar',
  artist: 'Pablo Picasso',
  year: '1912–1914',
  desc: 'Arca assemblaj pertama yang signifikan dalam sejarah seni moden, dibuat daripada kepingan logam dan wayar, menggambarkan gitar dalam bentuk Kubisme tiga dimensi dan mengubah sejarah seni arca.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4bfec0b5d-1789604407482.png",
  imageAlt: 'Guitar assemblaj Pablo Picasso 1912 diperbuat daripada kepingan logam dan wayar di MoMA'
},
{
  title: 'Merzbau',
  artist: 'Kurt Schwitters',
  year: '1923–1937',
  desc: 'Persekitaran assemblaj berskala besar yang dibina di dalam rumah Schwitters di Hannover, menggunakan bahan ditemui dan objek seharian untuk mewujudkan ruang seni yang menyeluruh dan terus berkembang.',
  imageUrl: "https://images.unsplash.com/photo-1617040194373-732045ecbd87",
  imageAlt: 'Merzbau Kurt Schwitters 1923 assemblaj persekitaran berskala besar menggunakan bahan ditemui'
}];


export default function ArcaAssemblagePage() {
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
      <div className="absolute inset-0 z-0" style={{ background: 'rgba(20, 100, 50, 0.72)' }} />
      <div className="absolute inset-0 pointer-events-none z-1" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(100,255,150,0.12) 0%, transparent 70%)' }} />

      <Link href="/projects/arca/buku/jenis" className="absolute top-5 left-5 z-50 flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.88)', boxShadow: '0 2px 12px rgba(0,0,0,0.25)', color: '#1a4a2a', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="#1a4a2a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Back
      </Link>

      <div className="absolute z-30 w-full flex justify-center" style={{ top: '3%' }}>
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '0.18em', color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.5)', lineHeight: 1 }}>ARCA ASSEMBLAJ</h1>
      </div>

      <div className="absolute z-20" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: '2%' }}>
        <div onClick={handleBookClick} style={{ cursor: isFlipping ? 'default' : 'pointer', perspective: '1400px', perspectiveOrigin: '50% 50%' }}>
          {(isClosed || isOpening || bookState === 'closing') && <ClosedBook isOpening={isOpening} isClosing={bookState === 'closing'} />}
          {bookState === 'open' && <OpenBook currentSpread={currentSpread} isFlipping={isFlipping} flipDirection={flipDirection} />}
        </div>
        {bookState === 'open' &&
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
            {[1, 2, 3, 4].map((n) => <div key={n} style={{ width: n === currentSpread ? 20 : 8, height: 8, borderRadius: 4, background: n === currentSpread ? ACCENT : 'rgba(39,174,96,0.35)', transition: 'all 0.3s ease' }} />)}
          </div>
        }
      </div>

      <button onClick={() => setShowBahan(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '3%', left: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2657-1789578278816.jpeg" alt="Bahan arca assemblaj" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Bahan</span>
      </button>
      <button onClick={() => setShowKarya(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '3%', right: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2656-1789578278955.jpeg" alt="Karya arca assemblaj" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Karya</span>
      </button>

      {showBahan && <Modal title="Bahan & Alatan Arca Assemblaj" onClose={() => setShowBahan(false)} accent={ACCENT}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {BAHAN_DATA.map((section) =>
          <div key={section.category}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', fontWeight: 700, color: ACCENT, letterSpacing: '0.06em', marginBottom: 12, borderBottom: `1px solid ${ACCENT}33`, paddingBottom: 4 }}>{section.category}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
                {section.items.map((item) =>
              <div key={item.name} style={{ borderRadius: 8, overflow: 'hidden', background: '#fff', border: `1px solid ${ACCENT}22`, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.imageAlt} style={{ width: '100%', height: 70, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '6px 8px' }}><span style={{ fontFamily: 'Georgia, serif', fontSize: '0.72rem', color: '#1a4a2a', fontWeight: 600, lineHeight: 1.3, display: 'block' }}>{item.name}</span></div>
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
      </Modal>}

      {showKarya && <Modal title="Contoh Karya Arca Assemblaj" onClose={() => setShowKarya(false)} accent={ACCENT}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {KARYA_DATA.map((karya) =>
          <div key={karya.title} style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', background: '#fff', border: `1px solid ${ACCENT}22` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={karya.imageUrl} alt={karya.imageAlt} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '12px 14px' }}>
                <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: 700, color: ACCENT, margin: '0 0 2px' }}>{karya.title}</h4>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.82rem', color: ACCENT_DARK, fontWeight: 600, marginBottom: 4 }}>{karya.artist} · {karya.year}</div>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', color: '#2c3e50', lineHeight: 1.6, margin: 0 }}>{karya.desc}</p>
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
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 1vw, 0.75rem)', fontWeight: 700, color: 'rgba(200,255,220,0.9)', letterSpacing: '0.12em', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>ARCA ASSEMBLAJ</span>
      </div>
      <div style={{ width: '100%', height: '100%', background: `linear-gradient(145deg, ${ACCENT_LIGHT} 0%, ${ACCENT} 30%, #1a7a42 60%, ${ACCENT_DARK} 100%)`, borderRadius: '2px 8px 8px 2px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.2)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 12, border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: '72%', height: '48%', borderRadius: 6, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.25)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1677866255611-3911ee466fdf" alt="Guitar assemblaj Picasso pada kulit buku arca assemblaj" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '14%', left: 0, right: 0, textAlign: 'center', padding: '0 16px' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.85rem, 2vw, 1.2rem)', fontWeight: 900, color: 'rgba(220,255,230,0.97)', letterSpacing: '0.15em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>ARCA ASSEMBLAJ</div>
          <div style={{ width: 40, height: 1.5, background: 'rgba(180,255,200,0.6)', margin: '6px auto 0', borderRadius: 1 }} />
        </div>
        <div style={{ position: 'absolute', right: -6, top: 4, bottom: 4, width: 6, background: 'linear-gradient(90deg, #e8f8ee 0%, #d5f0e0 50%, #c0e8d0 100%)', borderRadius: '0 2px 2px 0', boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.15)' }}>
          {Array.from({ length: 20 }).map((_, i) => <div key={i} style={{ height: '5%', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }} />)}
        </div>
      </div>
    </div>);

}

function OpenBook({ currentSpread, isFlipping, flipDirection }: {currentSpread: number;isFlipping: boolean;flipDirection: 'forward' | 'backward';}) {
  const spread = SPREADS_DATA[currentSpread - 1];
  return (
    <div style={{ width: 'clamp(320px, 80vw, 900px)', height: 'clamp(240px, 55vh, 580px)', position: 'relative', display: 'flex', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 12px 30px rgba(0,0,0,0.35))' }}>
      <div style={{ flex: 1, background: 'linear-gradient(105deg, #eafaf1 0%, #d5f0e0 100%)', borderRadius: '8px 0 0 8px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.08)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-5deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'right center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>{spread && <LeftPageContent spread={spread} />}</div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06))', pointerEvents: 'none', zIndex: 3 }} />
      </div>
      <div style={{ width: 'clamp(12px, 1.5vw, 20px)', background: `linear-gradient(90deg, ${ACCENT_DARK} 0%, #1a7a42 40%, ${ACCENT} 60%, #229954 100%)`, position: 'relative', boxShadow: '0 0 12px rgba(0,0,0,0.3)', zIndex: 10, flexShrink: 0 }}>
        {Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: '50%', top: `${10 + i * 11}%`, transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'rgba(180,255,200,0.5)' }} />)}
      </div>
      <div style={{ flex: 1, background: 'linear-gradient(75deg, #d5f0e0 0%, #eafaf1 100%)', borderRadius: '0 8px 8px 0', position: 'relative', overflow: 'hidden', boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.06)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-180deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'left center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>{spread && <RightPageContent spread={spread} />}</div>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.05))', pointerEvents: 'none', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 10, right: 16, fontFamily: 'Georgia, serif', fontSize: '0.65rem', color: `${ACCENT}66`, letterSpacing: '0.1em', zIndex: 4 }}>{currentSpread * 2}</div>
      </div>
      {isFlipping && <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'linear-gradient(105deg, #d5f0e0 0%, #eafaf1 100%)', transformOrigin: 'left center', animation: 'pageFlipAssemblaj 0.7s cubic-bezier(0.4,0,0.2,1) forwards', zIndex: 20, borderRadius: '0 8px 8px 0', boxShadow: '-8px 0 24px rgba(0,0,0,0.2)' }} />}
      <style>{`@keyframes pageFlipAssemblaj { 0% { transform: rotateY(0deg); } 50% { transform: rotateY(-90deg); } 100% { transform: rotateY(-180deg); } }`}</style>
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
      {s.leftText && <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#1a4a2a', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{s.leftText}</p>}
      {s.id === 1 && s.imageUrl && <div style={{ flex: 1, borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${ACCENT}33`, minHeight: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}
      {s.leftItems && <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>{s.leftItems.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 8 }}><div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: ACCENT_DARK, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#2c3e50', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div></div></div>)}</div>}
      {s.leftSubheading && <><h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: ACCENT, margin: 0, letterSpacing: '0.04em' }}>{s.leftSubheading}</h3><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)', flex: 1 }}>{s.leftTechniques?.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid ${ACCENT}66`, paddingLeft: 8 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: ACCENT_DARK }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#2c3e50', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div></div>)}</div></>}
      <div style={{ marginTop: 'auto', fontFamily: 'Georgia, serif', fontSize: '0.6rem', color: `${ACCENT}55`, letterSpacing: '0.1em' }}>{spread.id * 2 - 1}</div>
    </div>);

}

function RightPageContent({ spread }: {spread: typeof SPREADS_DATA[0];}) {
  const s = spread as any;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vh, 14px)' }}>
      {s.id === 1 && <><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#1a4a2a', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{s.rightText1}</p><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#1a4a2a', lineHeight: 1.7, margin: 0, textAlign: 'justify', fontStyle: 'italic', borderLeft: `2px solid ${ACCENT}55`, paddingLeft: 10 }}>{s.rightText2}</p></>}
      {s.id === 2 && s.rightHeading && <><div><h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', fontWeight: 900, color: ACCENT, letterSpacing: '0.06em', margin: 0, lineHeight: 1.2 }}>{s.rightHeading}</h2><div style={{ width: 'clamp(28px, 5vw, 48px)', height: 2, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, marginTop: 5, borderRadius: 1 }} /></div><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>{s.rightItems?.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 8 }}><div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: ACCENT_DARK, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#2c3e50', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div></div></div>)}</div></>}
      {s.rightTechniques && <><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)' }}>{s.rightTechniques.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid ${ACCENT}66`, paddingLeft: 8 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: ACCENT_DARK }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#2c3e50', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div></div>)}</div>{s.rightSubheading && <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: ACCENT, margin: '4px 0 0', letterSpacing: '0.04em' }}>{s.rightSubheading}</h3>}{s.rightProcess && <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>{s.rightProcess.map((step: string, i: number) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 'clamp(14px, 1.8vw, 20px)', height: 'clamp(14px, 1.8vw, 20px)', borderRadius: '50%', border: `1.5px solid ${ACCENT}88`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)', fontWeight: 700, color: ACCENT, fontFamily: 'Georgia, serif', flexShrink: 0 }}>{i + 1}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#1a4a2a', lineHeight: 1.4 }}>{step}</div></div>)}</div>}</>}
      {s.id === 4 && <>{s.imageUrl && <div style={{ height: 'clamp(80px, 20vh, 160px)', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${ACCENT}33`, flexShrink: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}{[s.rightText1, s.rightText2, s.rightText3].filter(Boolean).map((text: string, i: number) => <p key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: '#1a4a2a', lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{text}</p>)}</>}
    </div>);

}

function Modal({ title, children, onClose, accent }: {title: string;children: React.ReactNode;onClose: () => void;accent: string;}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #eafaf1 0%, #d5f0e0 100%)', borderRadius: 16, padding: 'clamp(20px, 3vw, 32px)', maxWidth: 720, width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.4)', border: `1px solid ${accent}33`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: `1.5px solid ${accent}44` }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 900, color: accent, margin: 0, letterSpacing: '0.06em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: `${accent}22`, border: `1px solid ${accent}44`, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: accent, fontSize: '1rem', fontWeight: 700 }}>×</button>
        </div>
        {children}
      </div>
    </div>);

}