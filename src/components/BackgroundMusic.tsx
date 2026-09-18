'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// Lo-fi chord progression: Cmaj7 → Am7 → Fmaj7 → G7
// Each chord plays for ~2 bars at 72 BPM
const CHORDS: number[][] = [
  [261.63, 329.63, 392.0, 493.88],  // Cmaj7: C4 E4 G4 B4
  [220.0,  261.63, 329.63, 392.0],  // Am7:   A3 C4 E4 G4
  [174.61, 220.0,  261.63, 349.23], // Fmaj7: F3 A3 C4 F4
  [196.0,  246.94, 293.66, 392.0],  // G7:    G3 B3 D4 G4
];

const BPM = 72;
const BEATS_PER_CHORD = 8; // 2 bars of 4/4
const BEAT_DURATION = 60 / BPM;
const CHORD_DURATION = BEATS_PER_CHORD * BEAT_DURATION;

function createLofiEngine(ctx: AudioContext): () => void {
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
  masterGain.connect(ctx.destination);

  // Soft low-pass filter for lo-fi warmth
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2200, ctx.currentTime);
  filter.Q.setValueAtTime(0.7, ctx.currentTime);
  filter.connect(masterGain);

  // Subtle reverb via convolver (impulse response)
  const convolver = ctx.createConvolver();
  const irLength = ctx.sampleRate * 1.5;
  const irBuffer = ctx.createBuffer(2, irLength, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = irBuffer.getChannelData(ch);
    for (let i = 0; i < irLength; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irLength, 2.5);
    }
  }
  convolver.buffer = irBuffer;
  const reverbGain = ctx.createGain();
  reverbGain.gain.setValueAtTime(0.25, ctx.currentTime);
  convolver.connect(reverbGain);
  reverbGain.connect(masterGain);

  // Vinyl crackle noise
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseData.length; i++) {
    noiseData[i] = (Math.random() * 2 - 1) * (Math.random() < 0.002 ? 0.4 : 0.015);
  }
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;
  noiseSource.loop = true;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.setValueAtTime(800, ctx.currentTime);
  noiseFilter.Q.setValueAtTime(0.5, ctx.currentTime);
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.04, ctx.currentTime);
  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);
  noiseSource.start();

  // Gentle kick drum pattern (every beat 1 and 3)
  let kickTime = ctx.currentTime;
  const kickLookahead = 0.1;
  const scheduleKicks = () => {
    const scheduleAhead = 0.2;
    while (kickTime < ctx.currentTime + scheduleAhead) {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, kickTime);
      osc.frequency.exponentialRampToValueAtTime(40, kickTime + 0.08);
      env.gain.setValueAtTime(0.35, kickTime);
      env.gain.exponentialRampToValueAtTime(0.001, kickTime + 0.12);
      osc.connect(env);
      env.connect(masterGain);
      osc.start(kickTime);
      osc.stop(kickTime + 0.15);
      kickTime += BEAT_DURATION * 2; // every 2 beats
    }
  };
  const kickInterval = setInterval(scheduleKicks, (kickLookahead * 1000) / 2);

  // Hi-hat pattern (every half beat)
  let hatTime = ctx.currentTime;
  const scheduleHats = () => {
    const scheduleAhead = 0.2;
    while (hatTime < ctx.currentTime + scheduleAhead) {
      const bufLen = Math.floor(ctx.sampleRate * 0.04);
      const hatBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
      const hatData = hatBuf.getChannelData(0);
      for (let i = 0; i < bufLen; i++) hatData[i] = Math.random() * 2 - 1;
      const hatSrc = ctx.createBufferSource();
      hatSrc.buffer = hatBuf;
      const hatFilter = ctx.createBiquadFilter();
      hatFilter.type = 'highpass';
      hatFilter.frequency.setValueAtTime(8000, hatTime);
      const hatGain = ctx.createGain();
      const vel = Math.random() < 0.5 ? 0.06 : 0.03;
      hatGain.gain.setValueAtTime(vel, hatTime);
      hatGain.gain.exponentialRampToValueAtTime(0.001, hatTime + 0.04);
      hatSrc.connect(hatFilter);
      hatFilter.connect(hatGain);
      hatGain.connect(masterGain);
      hatSrc.start(hatTime);
      hatSrc.stop(hatTime + 0.05);
      hatTime += BEAT_DURATION / 2;
    }
  };
  const hatInterval = setInterval(scheduleHats, 80);

  // Chord pads — cycle through progression
  let chordIndex = 0;
  let chordStartTime = ctx.currentTime;
  const activeOscs: OscillatorNode[] = [];

  const playChord = (freqs: number[], startTime: number, duration: number) => {
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = i % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      // Slight detune for warmth
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, startTime);
      env.gain.setValueAtTime(0.001, startTime);
      env.gain.linearRampToValueAtTime(0.12, startTime + 0.4);
      env.gain.setValueAtTime(0.10, startTime + duration - 0.5);
      env.gain.linearRampToValueAtTime(0.001, startTime + duration);
      osc.connect(env);
      env.connect(filter);
      env.connect(convolver);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
      activeOscs.push(osc);
    });
  };

  // Schedule chords ahead of time
  const scheduleChords = () => {
    const scheduleAhead = CHORD_DURATION * 2;
    while (chordStartTime < ctx.currentTime + scheduleAhead) {
      playChord(CHORDS[chordIndex % CHORDS.length], chordStartTime, CHORD_DURATION);
      chordStartTime += CHORD_DURATION;
      chordIndex++;
    }
  };
  scheduleChords();
  const chordInterval = setInterval(scheduleChords, CHORD_DURATION * 500);

  // Bass notes (root of each chord, one octave down)
  const BASS_NOTES = [130.81, 110.0, 87.31, 98.0]; // C3 A2 F2 G2
  let bassIndex = 0;
  let bassTime = ctx.currentTime;
  const scheduleBass = () => {
    const scheduleAhead = CHORD_DURATION * 2;
    while (bassTime < ctx.currentTime + scheduleAhead) {
      const freq = BASS_NOTES[bassIndex % BASS_NOTES.length];
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, bassTime);
      env.gain.setValueAtTime(0.001, bassTime);
      env.gain.linearRampToValueAtTime(0.22, bassTime + 0.1);
      env.gain.setValueAtTime(0.18, bassTime + CHORD_DURATION - 0.3);
      env.gain.linearRampToValueAtTime(0.001, bassTime + CHORD_DURATION);
      osc.connect(env);
      env.connect(masterGain);
      osc.start(bassTime);
      osc.stop(bassTime + CHORD_DURATION + 0.1);
      bassTime += CHORD_DURATION;
      bassIndex++;
    }
  };
  scheduleBass();
  const bassInterval = setInterval(scheduleBass, CHORD_DURATION * 500);

  return () => {
    clearInterval(kickInterval);
    clearInterval(hatInterval);
    clearInterval(chordInterval);
    clearInterval(bassInterval);
    noiseSource.stop();
    masterGain.disconnect();
  };
}

export default function BackgroundMusic() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const masterGainNodeRef = useRef<GainNode | null>(null);

  const startMusic = useCallback(() => {
    if (isPlaying) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Master gain for mute control
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(1, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainNodeRef.current = masterGain;

    // Patch destination to go through master gain
    const origDest = ctx.destination;
    // We'll use gain node inline in createLofiEngine instead
    const cleanup = createLofiEngine(ctx);
    cleanupRef.current = cleanup;
    setIsPlaying(true);
  }, [isPlaying]);

  // Auto-start on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      startMusic();
    };
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [startMusic]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) cleanupRef.current();
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  const toggleMute = useCallback(() => {
    if (!isPlaying) {
      startMusic();
      setIsMuted(false);
      return;
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
      setIsMuted(false);
    } else {
      ctx.suspend();
      setIsMuted(true);
    }
  }, [isPlaying, startMusic]);

  // Sync muted state with context state
  useEffect(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const checkState = () => setIsMuted(ctx.state === 'suspended');
    ctx.addEventListener('statechange', checkState);
    return () => ctx.removeEventListener('statechange', checkState);
  }, [isPlaying]);

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
