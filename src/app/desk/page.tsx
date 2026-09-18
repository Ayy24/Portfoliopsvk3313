'use client';

import { useRouter } from 'next/navigation';
import DeskScene from '../components/DeskScene';
import MusicButton from '../../components/MusicButton';

export default function DeskPage() {
  const router = useRouter();

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <button
        onClick={() => router.push('/')}
        aria-label="Back to home"
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 9999,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.3)',
          background: 'rgba(30, 20, 10, 0.6)',
          backdropFilter: 'blur(8px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
          transition: 'transform 0.15s ease, background 0.2s ease',
          color: '#fff',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(50, 35, 15, 0.85)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(30, 20, 10, 0.6)';
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <DeskScene />
      <MusicButton />
    </div>
  );
}
