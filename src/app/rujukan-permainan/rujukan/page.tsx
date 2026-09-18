'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const rujukanPage1 = [
  {
    number: 1,
    text: 'Kementerian Pendidikan Malaysia. (2018). Dokumen standard kurikulum dan pentaksiran: Pendidikan Seni Visual Tahun 4. Bahagian Pembangunan Kurikulum.',
    label: 'DSKP Pendidikan Seni Visual Tahun 4',
    href: 'https://bpk.moe.gov.my/kurikulum/kssr/kssr-tahun-3-1/146-dskp-kssr-semakan-2017-pendidikan-seni-visual-tahun-4/file',
  },
  {
    number: 2,
    text: 'Kementerian Pendidikan Malaysia. (2019). Dokumen standard kurikulum dan pentaksiran: Pendidikan Seni Visual Tahun 5. Bahagian Pembangunan Kurikulum.',
    label: 'DSKP Pendidikan Seni Visual Tahun 5',
    href: 'https://bpk.moe.gov.my/kurikulum/kssr/kssr-tahun-5?limit=20&limitstart=20',
  },
  {
    number: 3,
    text: 'Kementerian Pendidikan Malaysia. (2015). Dokumen standard kurikulum dan pentaksiran: Pendidikan Seni Visual Tahun 6. Bahagian Pembangunan Kurikulum.',
    label: 'DSKP Pendidikan Seni Visual Tahun 6',
    href: 'https://bpk.moe.gov.my/kurikulum/kssr/kssr-tahun-6',
  },
  {
    number: 4,
    text: 'Lee, H. Y., Mohd Nor, N., & Wong, Y. S. (2022). Analisis keperluan pengajaran dan pembelajaran Pendidikan Seni Visual berasaskan kolaboratif-konstruktivis di sekolah rendah. KUPAS SENI: Jurnal Seni dan Pendidikan Seni, 10, 90–103.',
    label: 'https://doi.org/10.37134/kupasseni.vol10.sp.10.2022',
    href: 'https://doi.org/10.37134/kupasseni.vol10.sp.10.2022',
  },
  {
    number: 5,
    text: 'Mohd Shariff, M. S., Said, T. S., & Ramli, H. (2022). Eksplorasi tanah liat alternatif menerusi adaptasi bentuk tembikar warisan Melayu. Jurnal Peradaban Melayu, 17(2), 39–48.',
    label: 'https://doi.org/10.37134/peradaban.vol17.2.5.2022',
    href: 'https://doi.org/10.37134/peradaban.vol17.2.5.2022',
  },
  {
    number: 6,
    text: 'Abdul Rahman, R., Bebit, M. P., & Ayob, N. (2023). Penggunaan aplikasi TikTok inovasi dalam pelaksanaan apresiasi seni Pendidikan Seni Visual. Jurnal Pendidikan Bitara UPSI, 16, 1–13.',
    label: 'https://doi.org/10.37134/bitara.vol16.sp2.1.2023',
    href: 'https://doi.org/10.37134/bitara.vol16.sp2.1.2023',
  },
];

const rujukanPage2 = [
  {
    number: 7,
    text: 'Yong Ai Kuek, Y. A. K., Wong Abdullah, M. F., & Abdul Aziz Zalay @ Zali, A. A. (2023). Analisis keperluan e-modul perisian Canva dalam mata pelajaran Pendidikan Seni Visual dalam kalangan guru sekolah rendah. KUPAS SENI: Jurnal Seni dan Pendidikan Seni, 11(2).',
    label: 'https://doi.org/10.37134/kupasseni.vol11.2.5.2023',
    href: 'https://doi.org/10.37134/kupasseni.vol11.2.5.2023',
  },
  {
    number: 8,
    text: 'Malir, N. A. I. (2024). Signifikasi infografik terhadap inisiatif Pendidikan Seni Visual. KUPAS SENI: Jurnal Seni dan Pendidikan Seni, 12(1), 1–7.',
    label: 'https://doi.org/10.37134/kupasseni.vol12.1.1.2024',
    href: 'https://doi.org/10.37134/kupasseni.vol12.1.1.2024',
  },
  {
    number: 9,
    text: 'Buruntong, B., & Kindoyop, S. (2024). Kesan integrasi seni visual dalam STEAM terhadap kemahiran berfikir aras tinggi murid sekolah menengah. Jurnal Pendidikan Bitara UPSI, 17, 22–35.',
    label: 'https://doi.org/10.37134/bitara.vol17.sp2.3.2024',
    href: 'https://doi.org/10.37134/bitara.vol17.sp2.3.2024',
  },
  {
    number: 10,
    text: 'Mahsan, I. P. (2021). Ekspresi seni dan komunikasi visual murid berkeperluan khas dalam mata pelajaran Pendidikan Seni Visual sekolah rendah. Jurnal Pendidikan Awal Kanak-kanak Kebangsaan, 10(1).',
    label: 'https://doi.org/10.37134/jpak.vol10.1.4.2021',
    href: 'https://doi.org/10.37134/jpak.vol10.1.4.2021',
  },
  {
    number: 11,
    text: 'Lee, H. Y. (2021). Cabaran yang dihadapi Pendidikan Seni Visual dengan pentaksiran bilik darjah di sekolah rendah daerah Hilir Perak. KUPAS SENI: Jurnal Seni dan Pendidikan Seni, 9(1).',
    label: 'https://doi.org/10.37134/kupasseni.vol9.1.5.2021',
    href: 'https://doi.org/10.37134/kupasseni.vol9.1.5.2021',
  },
];

function RujukanItem({ item }: { item: { number: number; text: string; label: string | null; href?: string } }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
      }}
    >
      <span
        style={{
          fontFamily: '"Segoe UI", sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(0.78rem, 1.6vw, 0.88rem)',
          color: '#7A3B10',
          minWidth: '24px',
          paddingTop: '1px',
          flexShrink: 0,
        }}
      >
        {item.number}.
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <p
          style={{
            fontFamily: '"Segoe UI", sans-serif',
            fontSize: 'clamp(0.78rem, 1.6vw, 0.88rem)',
            color: '#3B2008',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {item.text}
        </p>
        {item.label && item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: '"Segoe UI", sans-serif',
              fontSize: 'clamp(0.72rem, 1.4vw, 0.82rem)',
              fontWeight: 600,
              color: '#1A5FA0',
              fontStyle: 'italic',
              textDecoration: 'underline',
              wordBreak: 'break-all',
            }}
          >
            {item.label}
          </a>
        )}
      </div>
    </div>
  );
}

export default function RujukanPage() {
  const [page, setPage] = React.useState(1);
  const currentList = page === 1 ? rujukanPage1 : rujukanPage2;

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center" style={{ padding: '70px 20px' }}>
      {/* Background image */}
      <Image
        src="/assets/images/IMG_2686-1789723596005.jpeg"
        alt="Wooden plank with ivy leaves background"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
      />

      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'rgba(30, 18, 8, 0.35)' }}
      />

      {/* Kembali button — top left */}
      <Link
        href="/rujukan-permainan"
        className="absolute z-30"
        style={{ top: '16px', left: '20px' }}
      >
        <button
          style={{
            background: 'rgba(255, 245, 225, 0.88)',
            border: '2px solid rgba(160, 100, 40, 0.6)',
            borderRadius: '12px',
            padding: '8px 18px',
            fontFamily: '"Segoe UI", sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            color: '#5C3A1E',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            letterSpacing: '0.03em',
            backdropFilter: 'blur(4px)',
          }}
        >
          ← Kembali
        </button>
      </Link>

      {/* Center content box */}
      <div
        className="relative z-20 flex flex-col"
        style={{
          width: 'min(96vw, 960px)',
          background: 'rgba(255, 248, 230, 0.88)',
          border: '3px solid rgba(160, 100, 40, 0.55)',
          borderRadius: '20px',
          boxShadow: '0 12px 48px rgba(0,0,0,0.45), 0 2px 0 rgba(255,255,255,0.5) inset',
          backdropFilter: 'blur(6px)',
          overflow: 'hidden',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(160, 100, 40, 0.85) 0%, rgba(120, 70, 20, 0.9) 100%)',
            padding: '14px 28px 12px',
            borderBottom: '2px solid rgba(160, 100, 40, 0.4)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <h1
            style={{
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(1.2rem, 3.5vw, 1.7rem)',
              color: '#FFF8E7',
              textAlign: 'center',
              letterSpacing: '0.06em',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              margin: 0,
            }}
          >
            Rujukan
          </h1>
          <span style={{
            fontFamily: '"Segoe UI", sans-serif',
            fontSize: '0.85rem',
            color: 'rgba(255,248,230,0.8)',
            fontWeight: 500,
          }}>
            ({page}/2)
          </span>
        </div>

        {/* Content area */}
        <div
          style={{
            padding: '16px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {currentList.map((item) => (
            <RujukanItem key={item.number} item={item} />
          ))}
        </div>

        {/* Pagination footer */}
        <div style={{
          padding: '12px 28px',
          borderTop: '1px solid rgba(160, 100, 40, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255,240,200,0.5)',
        }}>
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            style={{
              background: page === 1 ? 'rgba(160,100,40,0.15)' : 'rgba(160,100,40,0.75)',
              border: 'none',
              borderRadius: '10px',
              padding: '7px 18px',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              color: page === 1 ? '#aaa' : '#FFF8E7',
              cursor: page === 1 ? 'default' : 'pointer',
            }}
          >
            ← Sebelum
          </button>
          <span style={{
            fontFamily: '"Segoe UI", sans-serif',
            fontSize: '0.82rem',
            color: '#7A3B10',
            fontWeight: 600,
          }}>
            {page === 1 ? 'Rujukan 1–6' : 'Rujukan 7–11'}
          </span>
          <button
            onClick={() => setPage(2)}
            disabled={page === 2}
            style={{
              background: page === 2 ? 'rgba(160,100,40,0.15)' : 'rgba(160,100,40,0.75)',
              border: 'none',
              borderRadius: '10px',
              padding: '7px 18px',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              color: page === 2 ? '#aaa' : '#FFF8E7',
              cursor: page === 2 ? 'default' : 'pointer',
            }}
          >
            Seterusnya →
          </button>
        </div>
      </div>
    </div>
  );
}
