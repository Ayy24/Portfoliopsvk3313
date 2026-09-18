'use client';

import React from 'react';
import { useMusicContext } from './MusicContext';

export default function MusicButton() {
  const { isMuted, toggleMute } = useMusicContext();

  return (
    <button
      onClick={toggleMute}
      aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      title={isMuted ? 'Unmute music' : 'Mute music'}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: isMuted
          ? '2px solid rgba(255,255,255,0.25)'
          : '2px solid rgba(255,216,77,0.6)',
        background: isMuted
          ? 'rgba(30, 20, 10, 0.65)'
          : 'rgba(50, 35, 10, 0.85)',
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: isMuted
          ? '0 2px 12px rgba(0,0,0,0.35)'
          : '0 2px 16px rgba(255,216,77,0.3)',
        transition: 'transform 0.15s ease, background 0.2s ease, border 0.2s ease',
        color: isMuted ? '#fff' : '#ffd84d',
        fontSize: '18px',
        lineHeight: 1,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
      }}
    >
      {isMuted ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
