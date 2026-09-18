'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type BookState = 'closed' | 'opening' | 'open' | 'closing';

const ACCENT = '#2980B9';
const ACCENT_DARK = '#1a5276';
const ACCENT_LIGHT = '#5dade2';

const SPREADS_DATA = [
{
  id: 1,
  topic: 'Definisi',
  leftHeading: 'Definisi',
  leftText: 'Arca luakan (intaglio atau sunken relief) merupakan sejenis arca yang dihasilkan dengan mengukir atau menekan imej ke dalam permukaan bahan, mewujudkan bentuk yang tenggelam di bawah paras permukaan asal. Berbeza dengan arca timbulan yang menonjol keluar, arca luakan menghasilkan kesan kedalaman melalui lekukan dan cekungan pada permukaan bahan.',
  rightText1: 'Teknik arca luakan telah digunakan sejak zaman Mesir Purba, khususnya dalam penghasilan hieroglif dan ukiran dinding kuil. Ia juga digunakan secara meluas dalam penghasilan cop mohor, duit syiling, dan ukiran batu permata (gemstone engraving). Bayangan yang terhasil dari cahaya yang jatuh ke dalam lekukan memberikan kedalaman visual yang unik dan dramatik.',
  rightText2: 'Dalam konteks seni visual Malaysia, arca luakan dapat dilihat pada ukiran kayu tradisional, terutamanya pada panel dinding masjid dan istana Melayu, di mana motif flora dan geometri diukir masuk ke dalam permukaan kayu untuk menghasilkan hiasan yang halus dan berkesan.',
  imageUrl: "https://images.unsplash.com/photo-1607501222928-d035765d7ea1",
  imageAlt: 'Hieroglif Mesir purba diukir masuk ke dalam batu sebagai contoh arca luakan'
},
{
  id: 2,
  topic: 'Ciri-ciri & Jenis',
  leftHeading: 'Ciri-ciri',
  leftItems: [
  { num: '1', title: 'Imej tenggelam di bawah permukaan', desc: 'Bentuk dan figura diukir atau ditekan masuk ke dalam permukaan bahan, menjadikan imej berada di bawah paras permukaan asal.' },
  { num: '2', title: 'Menghasilkan bayangan dramatik', desc: 'Cahaya yang jatuh ke dalam lekukan menghasilkan kontras bayangan yang kuat, memberikan kedalaman visual yang unik walaupun imej tenggelam.' },
  { num: '3', title: 'Sesuai untuk cetakan dan penghasilan salinan', desc: 'Teknik intaglio sangat sesuai untuk menghasilkan cetakan kerana dakwat atau bahan pewarna mengisi lekukan dan boleh dipindahkan ke permukaan lain.' },
  { num: '4', title: 'Memerlukan kemahiran ukiran yang tinggi', desc: 'Penghasilan arca luakan memerlukan kawalan yang tepat kerana kesilapan sukar diperbaiki — bahan yang telah diukir tidak boleh dikembalikan ke keadaan asal.' }],

  rightHeading: 'Jenis Arca Luakan',
  rightItems: [
  { num: 'A', title: 'Intaglio Ukiran (Incised Intaglio)', desc: 'Imej diukir terus ke dalam permukaan menggunakan pahat atau burin. Lazim pada ukiran batu, logam dan kayu.' },
  { num: 'B', title: 'Intaglio Tekanan (Pressed Intaglio)', desc: 'Imej ditekan masuk ke dalam bahan lembut seperti tanah liat atau lilin menggunakan cop atau acuan.' },
  { num: 'C', title: 'Intaglio Kimia (Chemical Intaglio)', desc: 'Asid digunakan untuk menghakis permukaan logam, menghasilkan lekukan yang halus. Teknik ini digunakan dalam etching dan seni cetak.' },
  { num: 'D', title: 'Hieroglif (Pictographic Intaglio)', desc: 'Sistem tulisan bergambar yang diukir masuk ke dalam batu atau kayu, seperti hieroglif Mesir dan ukiran batu prasejarah.' }],

  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_14fad5c3b-1772059504064.png",
  imageAlt: 'Contoh intaglio pada logam menunjukkan teknik ukiran masuk ke dalam permukaan'
},
{
  id: 3,
  topic: 'Teknik Penghasilan',
  leftHeading: 'Teknik Penghasilan',
  leftSubheading: 'Teknik Utama',
  leftTechniques: [
  { name: 'Teknik Ukiran Langsung (Direct Carving)', desc: 'Menggunakan pahat, burin atau pisau ukir untuk mengukir imej terus ke dalam permukaan batu, kayu atau logam secara manual.' },
  { name: 'Teknik Etching (Pengukiran Asid)', desc: 'Permukaan logam dilindungi dengan bahan tahan asid (ground), kemudian asid digunakan untuk menghakis bahagian yang terdedah, menghasilkan lekukan halus.' },
  { name: 'Teknik Drypoint', desc: 'Jarum tajam digunakan untuk mengukir terus ke dalam plat logam tanpa asid, menghasilkan garisan yang kasar dan ekspresif.' }],

  rightTechniques: [
  { name: 'Teknik Engraving (Ukiran Burin)', desc: 'Alat burin berbentuk V digunakan untuk mengukir garisan halus dan tepat ke dalam permukaan logam atau kayu.' },
  { name: 'Teknik Mezzotint', desc: 'Permukaan logam dikasar terlebih dahulu, kemudian dihaluskan semula untuk menghasilkan kawasan gelap dan terang yang halus.' }],

  rightSubheading: 'Proses Penghasilan',
  rightProcess: [
  'Memilih bahan asas (batu, kayu, logam atau tanah liat)',
  'Menghasilkan lakaran dan memindahkan ke permukaan bahan',
  'Menyediakan alatan ukiran yang sesuai',
  'Mengukir atau menekan imej masuk ke dalam permukaan',
  'Mengawal kedalaman lekukan secara berperingkat',
  'Menghaluskan tepi dan perincian lekukan',
  'Kemasan akhir (penggilap, patina atau pewarnaan)']

},
{
  id: 4,
  topic: 'Nilai Estetika',
  leftHeading: 'Nilai Estetika',
  leftText: 'Nilai estetika arca luakan terletak pada keupayaannya menghasilkan kedalaman visual melalui permainan cahaya dan bayangan dalam lekukan. Apabila cahaya jatuh pada permukaan arca luakan, lekukan menghasilkan bayang-bayang yang memberikan ilusi kedalaman dan dimensi, menjadikan imej kelihatan lebih hidup dan bertenaga walaupun ia tenggelam di bawah permukaan.',
  rightText1: 'Kehalusan garisan dan ketepatan ukiran dalam arca luakan mencerminkan kemahiran teknikal yang tinggi. Setiap lekukan mesti dihasilkan dengan kawalan yang tepat untuk memastikan keseragaman kedalaman dan kejelasan imej. Kualiti ini menjadikan arca luakan sebagai medium yang dihormati dalam tradisi seni ukiran dunia.',
  rightText2: 'Dari segi nilai budaya, arca luakan sering digunakan untuk merakam maklumat penting, seperti hieroglif Mesir yang mendokumentasikan sejarah dan kepercayaan agama. Fungsi dokumentasi ini menambahkan nilai sejarah dan arkeologi kepada karya arca luakan, menjadikannya bukan sahaja karya seni tetapi juga sumber ilmu pengetahuan.',
  rightText3: 'Dalam seni kontemporari, teknik intaglio terus digunakan dalam seni cetak (printmaking) sebagai medium ekspresi artistik. Pengkarya moden menggabungkan teknik tradisional dengan pendekatan konseptual baharu, menghasilkan karya yang menghormati warisan teknikal sambil menyampaikan mesej kontemporari yang relevan.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_145f2d3f5-1772143843419.png",
  imageAlt: 'Contoh cetakan intaglio menunjukkan nilai estetika arca luakan dalam seni cetak'
}];


const BAHAN_DATA = [
{ category: 'Bahan Asas', items: [
  { name: 'Batu Granit', imageUrl: "https://images.unsplash.com/photo-1596069865046-19bd5dd641cd", imageAlt: 'Batu granit untuk ukiran intaglio' },
  { name: 'Plat Tembaga', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_159c98019-1772155416271.png", imageAlt: 'Plat tembaga untuk teknik etching' },
  { name: 'Plat Zink', imageUrl: "https://images.unsplash.com/photo-1572451760336-6926e6e1a8e8", imageAlt: 'Plat zink untuk seni cetak intaglio' },
  { name: 'Kayu Keras', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4fbbdcc5e-1789601291102.png", imageAlt: 'Kayu keras untuk ukiran luakan' },
  { name: 'Tanah Liat', imageUrl: "https://images.unsplash.com/photo-1617565824140-5e511906b62c", imageAlt: 'Tanah liat untuk tekanan intaglio' }]
},
{ category: 'Alatan Ukiran', items: [
  { name: 'Burin (Ukiran Logam)', imageUrl: "https://images.unsplash.com/photo-1613206485477-34b2b17fa93f", imageAlt: 'Burin untuk mengukir logam' },
  { name: 'Pahat Batu', imageUrl: "https://images.unsplash.com/photo-1732190443345-b2a9f6c2efb8", imageAlt: 'Pahat untuk mengukir batu' },
  { name: 'Jarum Drypoint', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1157ed665-1772155425290.png", imageAlt: 'Jarum drypoint untuk ukiran langsung' },
  { name: 'Pisau Ukir', imageUrl: "https://images.unsplash.com/photo-1602063239056-b531b101065d", imageAlt: 'Pisau ukir untuk kayu' },
  { name: 'Tukul Pengukir', imageUrl: "https://images.unsplash.com/photo-1676190365202-ef02bb02a655", imageAlt: 'Tukul untuk membantu ukiran' }]
},
{ category: 'Bahan Kimia & Cetakan', items: [
  { name: 'Asid Nitrik', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_14d4296bf-1767285331341.png", imageAlt: 'Asid nitrik untuk teknik etching' },
  { name: 'Ground (Pelindung Asid)', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_151979687-1764775756658.png", imageAlt: 'Bahan ground pelindung asid' },
  { name: 'Dakwat Cetak', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1a254166b-1772155412528.png", imageAlt: 'Dakwat untuk cetakan intaglio' },
  { name: 'Kertas Cetakan', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1300c0cbf-1772151465761.png", imageAlt: 'Kertas khas untuk cetakan intaglio' }]
},
{ category: 'Bahan Kemasan', items: [
  { name: 'Bahan Penggilap Logam', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1ffbc2ca0-1765350636703.png", imageAlt: 'Bahan penggilap untuk kemasan logam' },
  { name: 'Patina Kimia', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_14fe7dd73-1772114171459.png", imageAlt: 'Patina kimia untuk kemasan arca luakan' },
  { name: 'Vernish Pelindung', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1fd1214bf-1778089978155.png", imageAlt: 'Vernish untuk melindungi permukaan' },
  { name: 'Kertas Pasir Halus', imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1f56c9644-1772173143536.png", imageAlt: 'Kertas pasir halus untuk menghaluskan permukaan' }]
}];


const KARYA_DATA = [
{
  title: 'Hieroglif Kuil Karnak',
  artist: 'Pengukir Dinasti XVIII Mesir',
  year: 'c. 1550–1295 SM',
  desc: 'Ukiran hieroglif intaglio yang menghiasi dinding Kuil Karnak di Luxor, Mesir, merakam sejarah dan ritual keagamaan Firaun dengan ketepatan dan kehalusan yang luar biasa.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1523e5687-1773428885811.png",
  imageAlt: 'Hieroglif intaglio Mesir purba diukir masuk ke dalam dinding batu kuil Karnak Luxor'
},
{
  title: 'Melancholia I',
  artist: 'Albrecht Dürer',
  year: '1514',
  desc: 'Cetakan intaglio (engraving) yang dianggap sebagai salah satu karya seni cetak terhebat dalam sejarah, menggambarkan figura bersayap dalam keadaan kontemplatif dengan perincian teknikal yang luar biasa.',
  imageUrl: "https://images.unsplash.com/photo-1696513553732-099e90c81bc0",
  imageAlt: 'Cetakan intaglio Melancholia I Albrecht Dürer 1514 menggambarkan figura bersayap kontemplatif'
},
{
  title: 'Ukiran Batu Nisan Aceh',
  artist: 'Pengukir Tradisional Aceh',
  year: 'Abad ke-15–17',
  desc: 'Batu nisan berukir intaglio dari kawasan Aceh menampilkan kaligrafi Arab dan motif flora yang diukir masuk ke dalam batu, mencerminkan kehalusan seni ukiran Islam Melayu-Aceh yang tinggi nilainya.',
  imageUrl: "https://images.unsplash.com/photo-1655454666894-a7d16c8f8d04",
  imageAlt: 'Batu nisan Aceh abad ke-15 dengan ukiran intaglio kaligrafi Arab dan motif flora Islam'
},
{
  title: 'The Three Crosses',
  artist: 'Rembrandt van Rijn',
  year: '1653',
  desc: 'Cetakan drypoint dan etching yang menggambarkan penyaliban Kristus dengan penggunaan cahaya dan bayangan yang dramatik, dianggap sebagai puncak pencapaian teknik intaglio dalam seni Barat.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4e7f23d36-1789604408219.png",
  imageAlt: 'Cetakan intaglio The Three Crosses Rembrandt van Rijn 1653 dengan cahaya dan bayangan dramatik'
}];


export default function ArcaLuakanPage() {
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
      {/* Background image with blue tint */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url(/assets/images/IMG_2664-1789601863261.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 z-0" style={{ background: 'rgba(25, 80, 140, 0.72)' }} />

      {/* Ambient light */}
      <div className="absolute inset-0 pointer-events-none z-1" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(100,180,255,0.15) 0%, transparent 70%)' }} />

      {/* Back button */}
      <Link href="/projects/arca/buku/jenis" className="absolute top-5 left-5 z-50 flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.88)', boxShadow: '0 2px 12px rgba(0,0,0,0.25)', color: '#1a3a5c', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="#1a3a5c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Back
      </Link>

      {/* Title */}
      <div className="absolute z-30 w-full flex justify-center" style={{ top: '3%' }}>
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '0.18em', color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.5)', lineHeight: 1 }}>
          ARCA LUAKAN
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
            {[1, 2, 3, 4].map((n) => <div key={n} style={{ width: n === currentSpread ? 20 : 8, height: 8, borderRadius: 4, background: n === currentSpread ? ACCENT : 'rgba(41,128,185,0.35)', transition: 'all 0.3s ease', boxShadow: n === currentSpread ? `0 2px 6px ${ACCENT}66` : 'none' }} />)}
          </div>
        }
      </div>

      {/* Bottom icons */}
      <button onClick={() => setShowBahan(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '3%', left: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2657-1789578278816.jpeg" alt="Bahan arca luakan" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Bahan</span>
      </button>
      <button onClick={() => setShowKarya(true)} className="absolute z-40 flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95" style={{ bottom: '3%', right: '3%', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/IMG_2656-1789578278955.jpeg" alt="Karya arca luakan" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Karya</span>
      </button>

      {showBahan && <Modal title="Bahan & Alatan Arca Luakan" onClose={() => setShowBahan(false)} accent={ACCENT}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {BAHAN_DATA.map((section) =>
          <div key={section.category}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', fontWeight: 700, color: ACCENT, letterSpacing: '0.06em', marginBottom: 12, borderBottom: `1px solid ${ACCENT}33`, paddingBottom: 4 }}>{section.category}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
                {section.items.map((item) =>
              <div key={item.name} style={{ borderRadius: 8, overflow: 'hidden', background: '#fff', border: `1px solid ${ACCENT}22`, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.imageAlt} style={{ width: '100%', height: 70, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '6px 8px' }}><span style={{ fontFamily: 'Georgia, serif', fontSize: '0.72rem', color: '#1a3a5c', fontWeight: 600, lineHeight: 1.3, display: 'block' }}>{item.name}</span></div>
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
      </Modal>}

      {showKarya && <Modal title="Contoh Karya Arca Luakan" onClose={() => setShowKarya(false)} accent={ACCENT}>
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
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 1vw, 0.75rem)', fontWeight: 700, color: 'rgba(200,230,255,0.9)', letterSpacing: '0.12em', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>ARCA LUAKAN</span>
      </div>
      <div style={{ width: '100%', height: '100%', background: `linear-gradient(145deg, ${ACCENT_LIGHT} 0%, ${ACCENT} 30%, #1a5276 60%, ${ACCENT_DARK} 100%)`, borderRadius: '2px 8px 8px 2px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: '60%', height: '45%', background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 12, border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: '72%', height: '48%', borderRadius: 6, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.25)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1664143999514-9610c291e36f" alt="Hieroglif Mesir purba sebagai contoh arca luakan pada kulit buku" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '14%', left: 0, right: 0, textAlign: 'center', padding: '0 16px' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.85rem, 2vw, 1.2rem)', fontWeight: 900, color: 'rgba(220,240,255,0.97)', letterSpacing: '0.15em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>ARCA LUAKAN</div>
          <div style={{ width: 40, height: 1.5, background: 'rgba(180,220,255,0.6)', margin: '6px auto 0', borderRadius: 1 }} />
        </div>
        <div style={{ position: 'absolute', right: -6, top: 4, bottom: 4, width: 6, background: 'linear-gradient(90deg, #e8f4f8 0%, #d6eaf8 50%, #c8e0f0 100%)', borderRadius: '0 2px 2px 0', boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.15)' }}>
          {Array.from({ length: 20 }).map((_, i) => <div key={i} style={{ height: '5%', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }} />)}
        </div>
      </div>
    </div>);

}

function OpenBook({ currentSpread, isFlipping, flipDirection }: {currentSpread: number;isFlipping: boolean;flipDirection: 'forward' | 'backward';}) {
  const spread = SPREADS_DATA[currentSpread - 1];
  return (
    <div style={{ width: 'clamp(320px, 80vw, 900px)', height: 'clamp(240px, 55vh, 580px)', position: 'relative', display: 'flex', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 12px 30px rgba(0,0,0,0.35))' }}>
      <div style={{ flex: 1, background: 'linear-gradient(105deg, #eaf4fb 0%, #d6eaf8 100%)', borderRadius: '8px 0 0 8px', position: 'relative', overflow: 'hidden', boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.08)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-5deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'right center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>
          {spread && <LeftPageContent spread={spread} />}
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06))', pointerEvents: 'none', zIndex: 3 }} />
      </div>
      <div style={{ width: 'clamp(12px, 1.5vw, 20px)', background: `linear-gradient(90deg, ${ACCENT_DARK} 0%, #1a5276 40%, ${ACCENT} 60%, #1f618d 100%)`, position: 'relative', boxShadow: '0 0 12px rgba(0,0,0,0.3)', zIndex: 10, flexShrink: 0 }}>
        {Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: '50%', top: `${10 + i * 11}%`, transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'rgba(180,220,255,0.5)' }} />)}
      </div>
      <div style={{ flex: 1, background: 'linear-gradient(75deg, #d6eaf8 0%, #eaf4fb 100%)', borderRadius: '0 8px 8px 0', position: 'relative', overflow: 'hidden', boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.06)', transform: isFlipping && flipDirection === 'forward' ? 'rotateY(-180deg)' : 'rotateY(0deg)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'left center', transformStyle: 'preserve-3d' }}>
        <PageTexture />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(14px, 2.5vw, 28px)', height: '100%', overflowY: 'auto' }}>
          {spread && <RightPageContent spread={spread} />}
        </div>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.05))', pointerEvents: 'none', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: 10, right: 16, fontFamily: 'Georgia, serif', fontSize: '0.65rem', color: `${ACCENT}66`, letterSpacing: '0.1em', zIndex: 4 }}>{currentSpread * 2}</div>
      </div>
      {isFlipping && <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'linear-gradient(105deg, #d6eaf8 0%, #eaf4fb 100%)', transformOrigin: 'left center', animation: 'pageFlipLuakan 0.7s cubic-bezier(0.4,0,0.2,1) forwards', zIndex: 20, borderRadius: '0 8px 8px 0', boxShadow: '-8px 0 24px rgba(0,0,0,0.2)' }} />}
      <style>{`@keyframes pageFlipLuakan { 0% { transform: rotateY(0deg); } 50% { transform: rotateY(-90deg); } 100% { transform: rotateY(-180deg); } }`}</style>
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
      {s.leftText && <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#1a3a5c', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{s.leftText}</p>}
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
      {s.id === 1 && <><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#1a3a5c', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>{s.rightText1}</p><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.62rem, 1.1vw, 0.82rem)', color: '#1a3a5c', lineHeight: 1.7, margin: 0, textAlign: 'justify', fontStyle: 'italic', borderLeft: `2px solid ${ACCENT}55`, paddingLeft: 10 }}>{s.rightText2}</p></>}
      {s.id === 2 && s.rightHeading && <><div><h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', fontWeight: 900, color: ACCENT, letterSpacing: '0.06em', margin: 0, lineHeight: 1.2 }}>{s.rightHeading}</h2><div style={{ width: 'clamp(28px, 5vw, 48px)', height: 2, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, marginTop: 5, borderRadius: 1 }} /></div><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)', flex: 1 }}>{s.rightItems?.map((item: any) => <div key={item.num} style={{ display: 'flex', gap: 8 }}><div style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)', borderRadius: '50%', background: ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', fontWeight: 700, fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: 1 }}>{item.num}</div><div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', fontWeight: 700, color: ACCENT_DARK, lineHeight: 1.3 }}>{item.title}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#2c3e50', lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div></div></div>)}</div></>}
      {s.rightTechniques && <><div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 0.8vh, 8px)' }}>{s.rightTechniques.map((t: any) => <div key={t.name} style={{ borderLeft: `2px solid ${ACCENT}66`, paddingLeft: 8 }}><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)', fontWeight: 700, color: ACCENT_DARK }}>{t.name}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)', color: '#2c3e50', lineHeight: 1.5, marginTop: 1 }}>{t.desc}</div></div>)}</div>{s.rightSubheading && <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', fontWeight: 700, color: ACCENT, margin: '4px 0 0', letterSpacing: '0.04em' }}>{s.rightSubheading}</h3>}{s.rightProcess && <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>{s.rightProcess.map((step: string, i: number) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 'clamp(14px, 1.8vw, 20px)', height: 'clamp(14px, 1.8vw, 20px)', borderRadius: '50%', border: `1.5px solid ${ACCENT}88`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.45rem, 0.8vw, 0.6rem)', fontWeight: 700, color: ACCENT, fontFamily: 'Georgia, serif', flexShrink: 0 }}>{i + 1}</div><div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)', color: '#1a3a5c', lineHeight: 1.4 }}>{step}</div></div>)}</div>}</>}
      {s.id === 4 && <>{s.imageUrl && <div style={{ height: 'clamp(80px, 20vh, 160px)', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: `1px solid ${ACCENT}33`, flexShrink: 0 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.imageUrl} alt={s.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}{[s.rightText1, s.rightText2, s.rightText3].filter(Boolean).map((text: string, i: number) => <p key={i} style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.58rem, 1vw, 0.78rem)', color: '#1a3a5c', lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>{text}</p>)}</>}
    </div>);

}

function Modal({ title, children, onClose, accent }: {title: string;children: React.ReactNode;onClose: () => void;accent: string;}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(145deg, #eaf4fb 0%, #d6eaf8 100%)', borderRadius: 16, padding: 'clamp(20px, 3vw, 32px)', maxWidth: 720, width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.4)', border: `1px solid ${accent}33`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: `1.5px solid ${accent}44` }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 900, color: accent, margin: 0, letterSpacing: '0.06em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: `${accent}22`, border: `1px solid ${accent}44`, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: accent, fontSize: '1rem', fontWeight: 700 }}>×</button>
        </div>
        {children}
      </div>
    </div>);

}