'use client';

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

// Happy & soothing progression: C → F → Am → G (bright, uplifting)
const CHORDS: number[][] = [
  [261.63, 329.63, 392.0, 523.25],  // C:  C4 E4 G4 C5
  [174.61, 261.63, 349.23, 523.25], // F:  F3 C4 F4 C5
  [220.0,  261.63, 329.63, 440.0],  // Am: A3 C4 E4 A4
  [196.0,  246.94, 392.0,  493.88], // G:  G3 B3 G4 B4
];

// Gentle melody notes over the progression (pentatonic, bright)
const MELODY: number[] = [
  523.25, 587.33, 659.25, 587.33, // C5 D5 E5 D5
  698.46, 659.25, 587.33, 523.25, // F5 E5 D5 C5
  440.0,  493.88, 523.25, 587.33, // A4 B4 C5 D5
  659.25, 587.33, 523.25, 493.88, // E5 D5 C5 B4
];

const BPM = 80;
const BEATS_PER_CHORD = 8;
const BEAT_DURATION = 60 / BPM;
const CHORD_DURATION = BEATS_PER_CHORD * BEAT_DURATION;

function createHappyEngine(ctx: AudioContext): () => void {
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.16, ctx.currentTime);
  masterGain.connect(ctx.destination);

  // Warm low-pass filter
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(3500, ctx.currentTime);
  filter.Q.setValueAtTime(0.5, ctx.currentTime);
  filter.connect(masterGain);

  // Gentle reverb
  const convolver = ctx.createConvolver();
  const irLength = ctx.sampleRate * 1.8;
  const irBuffer = ctx.createBuffer(2, irLength, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = irBuffer.getChannelData(ch);
    for (let i = 0; i < irLength; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irLength, 2.2);
    }
  }
  convolver.buffer = irBuffer;
  const reverbGain = ctx.createGain();
  reverbGain.gain.setValueAtTime(0.2, ctx.currentTime);
  convolver.connect(reverbGain);
  reverbGain.connect(masterGain);

  // Very soft vinyl warmth noise (much quieter than before)
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseData.length; i++) {
    noiseData[i] = (Math.random() * 2 - 1) * (Math.random() < 0.001 ? 0.2 : 0.008);
  }
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;
  noiseSource.loop = true;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.setValueAtTime(600, ctx.currentTime);
  noiseFilter.Q.setValueAtTime(0.4, ctx.currentTime);
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.02, ctx.currentTime);
  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);
  noiseSource.start();

  // Soft kick — lighter, bouncier feel
  let kickTime = ctx.currentTime;
  const kickLookahead = 0.1;
  const scheduleKicks = () => {
    const scheduleAhead = 0.25;
    while (kickTime < ctx.currentTime + scheduleAhead) {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(100, kickTime);
      osc.frequency.exponentialRampToValueAtTime(45, kickTime + 0.07);
      env.gain.setValueAtTime(0.28, kickTime);
      env.gain.exponentialRampToValueAtTime(0.001, kickTime + 0.1);
      osc.connect(env);
      env.connect(masterGain);
      osc.start(kickTime);
      osc.stop(kickTime + 0.12);
      kickTime += BEAT_DURATION * 2;
    }
  };
  const kickInterval = setInterval(scheduleKicks, (kickLookahead * 1000) / 2);

  // Gentle hi-hat
  let hatTime = ctx.currentTime;
  const scheduleHats = () => {
    const scheduleAhead = 0.25;
    while (hatTime < ctx.currentTime + scheduleAhead) {
      const bufLen = Math.floor(ctx.sampleRate * 0.035);
      const hatBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
      const hatData = hatBuf.getChannelData(0);
      for (let i = 0; i < bufLen; i++) hatData[i] = Math.random() * 2 - 1;
      const hatSrc = ctx.createBufferSource();
      hatSrc.buffer = hatBuf;
      const hatFilter = ctx.createBiquadFilter();
      hatFilter.type = 'highpass';
      hatFilter.frequency.setValueAtTime(9000, hatTime);
      const hatGain = ctx.createGain();
      const vel = Math.random() < 0.5 ? 0.05 : 0.025;
      hatGain.gain.setValueAtTime(vel, hatTime);
      hatGain.gain.exponentialRampToValueAtTime(0.001, hatTime + 0.035);
      hatSrc.connect(hatFilter);
      hatFilter.connect(hatGain);
      hatGain.connect(masterGain);
      hatSrc.start(hatTime);
      hatSrc.stop(hatTime + 0.04);
      hatTime += BEAT_DURATION / 2;
    }
  };
  const hatInterval = setInterval(scheduleHats, 80);

  // Bright chord pads
  let chordIndex = 0;
  let chordStartTime = ctx.currentTime;

  const playChord = (freqs: number[], startTime: number, duration: number) => {
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = i % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      osc.detune.setValueAtTime((Math.random() - 0.5) * 6, startTime);
      env.gain.setValueAtTime(0.001, startTime);
      env.gain.linearRampToValueAtTime(0.10, startTime + 0.35);
      env.gain.setValueAtTime(0.09, startTime + duration - 0.4);
      env.gain.linearRampToValueAtTime(0.001, startTime + duration);
      osc.connect(env);
      env.connect(filter);
      env.connect(convolver);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    });
  };

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

  // Gentle melody (glockenspiel-like sine tones)
  let melodyIndex = 0;
  let melodyTime = ctx.currentTime;
  const MELODY_NOTE_DURATION = BEAT_DURATION * 2;

  const scheduleMelody = () => {
    const scheduleAhead = CHORD_DURATION * 2;
    while (melodyTime < ctx.currentTime + scheduleAhead) {
      const freq = MELODY[melodyIndex % MELODY.length];
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, melodyTime);
      env.gain.setValueAtTime(0.001, melodyTime);
      env.gain.linearRampToValueAtTime(0.09, melodyTime + 0.05);
      env.gain.exponentialRampToValueAtTime(0.001, melodyTime + MELODY_NOTE_DURATION * 0.85);
      osc.connect(env);
      env.connect(filter);
      env.connect(convolver);
      osc.start(melodyTime);
      osc.stop(melodyTime + MELODY_NOTE_DURATION);
      melodyTime += MELODY_NOTE_DURATION;
      melodyIndex++;
    }
  };
  scheduleMelody();
  const melodyInterval = setInterval(scheduleMelody, CHORD_DURATION * 500);

  // Bass notes (root of each chord)
  const BASS_NOTES = [130.81, 87.31, 110.0, 98.0]; // C3 F2 A2 G2
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
      env.gain.linearRampToValueAtTime(0.18, bassTime + 0.1);
      env.gain.setValueAtTime(0.15, bassTime + CHORD_DURATION - 0.3);
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
    clearInterval(melodyInterval);
    clearInterval(bassInterval);
    try { noiseSource.stop(); } catch {}
    masterGain.disconnect();
  };
}

interface MusicContextValue {
  isMuted: boolean;
  isPlaying: boolean;
  toggleMute: () => void;
}

const MusicContext = createContext<MusicContextValue>({
  isMuted: false,
  isPlaying: false,
  toggleMute: () => {},
});

export function useMusicContext() {
  return useContext(MusicContext);
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const startedRef = useRef(false);

  const startMusic = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;
    const cleanup = createHappyEngine(ctx);
    cleanupRef.current = cleanup;
    setIsPlaying(true);
  }, []);

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

  useEffect(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const checkState = () => setIsMuted(ctx.state === 'suspended');
    ctx.addEventListener('statechange', checkState);
    return () => ctx.removeEventListener('statechange', checkState);
  }, [isPlaying]);

  return (
    <MusicContext.Provider value={{ isMuted, isPlaying, toggleMute }}>
      {children}
    </MusicContext.Provider>
  );
}
