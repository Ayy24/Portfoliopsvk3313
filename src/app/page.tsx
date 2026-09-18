'use client';

import { useRouter } from 'next/navigation';
import { useRef, useCallback } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
  const lastTapRef = useRef<number>(0);

  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    const timeSince = now - lastTapRef?.current;
    if (timeSince < 400 && timeSince > 0) {
      router?.push('/desk');
    }
    lastTapRef.current = now;
  }, [router]);

  return (
    <div
      onDoubleClick={() => router?.push('/desk')}
      onTouchEnd={handleDoubleTap}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        background: '#000',
      }}
    >
      <Image
        src="/assets/images/PROGRAM_IJAZAH_SARJANA_MUDA_PERGURUAN__PISMP__AMBILAN_OGOS_2024JULAI_2026_TUGASAN_1__E-PORTFOLIO_PSVK3313_BENTUK_DAN_BINAAN-1789732492523.png"
        alt="PSVK3313 E-Portfolio Cover"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
  );
}