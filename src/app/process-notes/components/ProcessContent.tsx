import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const processEntries = [
{
  week: 'Week 3–4',
  title: 'Pavilion Kayu — Concept Sketches',
  type: 'Sketches',
  color: '#FFE88A',
  emoji: '✏️',
  notes: [
  'Explored 6 structural configurations — settled on simple post-and-beam for clarity',
  'Canopy lattice angle studies: 30°, 45°, 60° — 45° gave best balance of shade and openness',
  'Material decision: reclaimed meranti for posts, bamboo for lattice secondary structure'],

  images: [
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1bea3a6d5-1772063406730.png",
    alt: 'Hand-drawn architectural sketches on white paper, pencil lines showing structural diagrams, natural light from left'
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_192df013c-1776515894596.png",
    alt: 'Architectural model making process, balsa wood pieces on clean white desk, bright studio lighting'
  }],

  quote: '"The simplest structure often carries the most meaning."'
},
{
  week: 'Week 5–6',
  title: 'Rumah Bata — Material Studies',
  type: 'Research',
  color: '#FFB8C8',
  emoji: '🔍',
  notes: [
  'Collected 4 brick samples from local suppliers — documented colour, texture, absorption rate',
  'Tested English Bond vs Flemish Bond for aesthetic and structural comparison',
  'Discovered mortar joint depth significantly affects shadow pattern — key design element'],

  images: [
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1bcd3f29f-1772061227718.png",
    alt: 'Close-up of architectural drawing on translucent paper, technical lines in pencil, bright natural light'
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_45c957fc9-1789548408008.png",
    alt: 'Brick samples arranged on white surface with measurement tools, academic study layout, even lighting'
  }],

  quote: '"Material honesty is the first principle of good construction."'
},
{
  week: 'Week 7–8',
  title: 'Bumbung Perabung — Roof Analysis',
  type: 'Analysis',
  color: '#B8E8C8',
  emoji: '📐',
  notes: [
  'Studied 5 traditional Malay roof forms — perabung lima selected for complexity and regional significance',
  'Wind analysis: 35° pitch optimal for Malaysian monsoon conditions',
  'Eave overhang calculation: minimum 600mm for adequate sun shading at 3°N latitude'],

  images: [
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1cd16216f-1773018358507.png",
    alt: 'Traditional Malaysian building exterior with pitched roof, warm daylight, heritage architecture'
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_14b56c1a6-1770585461393.png",
    alt: 'Abstract architectural diagram on white paper, geometric lines showing roof section analysis'
  }],

  quote: '"Climate shapes form. Form shapes culture."'
},
{
  week: 'Week 9–12',
  title: 'Kolom & Tapak — Structure Deep Dive',
  type: 'Technical',
  color: '#C8D8F8',
  emoji: '🏗️',
  notes: [
  'Built 1:20 column model through 4 stages: rebar cage, formwork, pour simulation, stripped finish',
  'Foundation comparison drawings at 1:50 — pad, strip, raft across 3 soil conditions',
  'Key insight: raft foundation most appropriate for soft Klang Valley alluvial soil'],

  images: [
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_170d37759-1765093092088.png",
    alt: 'Concrete structure under construction, reinforcement bars visible, bright midday light'
  },
  {
    src: "https://images.unsplash.com/photo-1724638197367-1bab34842f90",
    alt: 'Technical drawings rolled on desk with pencils, architectural section drawings, warm lamp light'
  }],

  quote: '"Every column tells the story of the forces it carries."'
}];


const moodItems = [
{
  src: "https://images.unsplash.com/photo-1731394732635-e30421f4955b",
  alt: 'Timber structure with filtered light, warm tones, architectural inspiration',
  label: 'Light + Structure'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_4c5f944f0-1789548407342.png",
  alt: 'Clean modern pavilion in landscape, inspiration for final project',
  label: 'Form Reference'
},
{
  src: "https://images.unsplash.com/photo-1577233617173-b8d4ebb7b0f3",
  alt: 'Detailed brick texture close-up, material reference',
  label: 'Texture Study'
},
{
  src: "https://images.unsplash.com/photo-1724864220571-d2b10413aa51",
  alt: 'Traditional roof form in tropical setting, cultural reference',
  label: 'Cultural Ref'
}];


export default function ProcessContent() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-1 rounded-full" style={{ background: 'var(--primary)' }} />
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--muted-foreground)' }}>
            Behind the Work
          </span>
        </div>
        <h2
          className="font-display"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--foreground)', lineHeight: 1.1 }}>
          
          Process &amp; Notes
        </h2>
        <p className="mt-3 text-sm" style={{ color: 'var(--muted-foreground)', maxWidth: 520 }}>
          Sketches, research notes, material studies, and reflections from the PSVK 3313 studio journey.
        </p>
      </div>

      {/* Matcha cup decoration hint */}
      <div
        className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-10 text-sm"
        style={{
          background: 'var(--card)',
          border: '1.5px solid var(--border)',
          color: 'var(--muted-foreground)'
        }}>
        
        <span>☕</span>
        <span className="font-medium">Brewed over 14 weeks of studio work</span>
      </div>

      {/* Process entries — notebook style */}
      <div className="flex flex-col gap-10 mb-14">
        {processEntries?.map((entry, idx) =>
        <div
          key={idx}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'var(--card)',
            border: '1.5px solid var(--border)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)'
          }}>
          
            {/* Washi tape top decoration */}
            <div
            className="absolute top-0 left-8 w-16 h-4 rounded-b-sm"
            style={{
              background: entry?.color,
              opacity: 0.8,
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }} />
          

            <div className="p-6 pt-8">
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: entry?.color, border: '1px solid rgba(0,0,0,0.08)' }}>
                  
                    {entry?.emoji}
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--muted-foreground)' }}>
                      {entry?.week} · {entry?.type}
                    </p>
                    <h3 className="font-display font-bold" style={{ color: 'var(--foreground)', fontSize: '1.1rem' }}>
                      {entry?.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Two-column: notes + images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Notes */}
                <div>
                  {/* Notebook lines background */}
                  <div
                  className="rounded-xl p-4"
                  style={{
                    background: '#FDFAF4',
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 27px, rgba(100,140,200,0.12) 27px, rgba(100,140,200,0.12) 28px)',
                    border: '1px solid var(--border)'
                  }}>
                  
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--muted-foreground)' }}>
                      Field Notes
                    </p>
                    <ul className="flex flex-col gap-3">
                      {entry?.notes?.map((note, ni) =>
                    <li key={ni} className="flex gap-2 text-sm" style={{ color: 'var(--foreground)' }}>
                          <span style={{ color: 'var(--primary)', flexShrink: 0, fontWeight: 700 }}>—</span>
                          <span style={{ lineHeight: 1.7 }}>{note}</span>
                        </li>
                    )}
                    </ul>
                    {/* Quote */}
                    <blockquote
                    className="mt-4 pt-4 text-xs italic"
                    style={{
                      borderTop: '1px dashed var(--border)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-fraunces), serif'
                    }}>
                    
                      {entry?.quote}
                    </blockquote>
                  </div>
                </div>

                {/* Images */}
                <div className="grid grid-cols-2 gap-3">
                  {entry?.images?.map((img, ii) =>
                <div
                  key={ii}
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    height: 130,
                    border: '1.5px solid var(--border)',
                    boxShadow: '1px 2px 8px rgba(0,0,0,0.1)',
                    transform: ii === 0 ? 'rotate(-1.5deg)' : 'rotate(1deg)'
                  }}>
                  
                      {/* Washi tape on photo */}
                      <div
                    className="absolute top-0 left-1/2 w-12 h-3 z-10"
                    style={{
                      transform: 'translateX(-50%)',
                      background: 'repeating-linear-gradient(90deg, rgba(255,220,100,0.75), rgba(255,240,130,0.75) 8px, rgba(255,210,90,0.75) 16px)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                    }} />
                  
                      <AppImage
                    src={img?.src}
                    alt={img?.alt}
                    fill
                    className="object-cover" />
                  
                    </div>
                )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mood board section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-1 rounded-full" style={{ background: 'var(--primary)' }} />
          <h3 className="font-display font-bold text-xl" style={{ color: 'var(--foreground)' }}>
            Mood Board — Visual References
          </h3>
        </div>

        {/* Cork board */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: '#C4956A',
            backgroundImage: 'radial-gradient(ellipse at 20% 30%, rgba(180,120,60,0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(140,90,40,0.3) 0%, transparent 50%)',
            border: '3px solid #A07040',
            boxShadow: '0 6px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}>
          
          {/* BENTO AUDIT: 4 mood items in 2x2 grid
                Row 1: [col-1: Light+Structure cs-1] [col-2: Form Reference cs-1]
                Row 2: [col-1: Texture Study cs-1] [col-2: Cultural Ref cs-1]
                Placed 4/4 ✓ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {moodItems?.map((item, i) => (
            /* Mood item {i} */
            <div
              key={i}
              className="relative rounded-xl overflow-hidden"
              style={{
                height: 140,
                border: '3px solid rgba(255,255,255,0.7)',
                boxShadow: '2px 4px 12px rgba(0,0,0,0.25)',
                transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                background: 'white'
              }}>
              
                {/* Pin */}
                <div
                className="absolute top-1.5 left-1/2 w-3 h-3 rounded-full z-10"
                style={{
                  transform: 'translateX(-50%)',
                  background: i % 2 === 0 ? '#E05050' : '#5080E0',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
                }} />
              
                <AppImage
                src={item?.src}
                alt={item?.alt}
                fill
                className="object-cover" />
              
                <div
                className="absolute bottom-0 left-0 right-0 px-2 py-1.5 text-center"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  fontSize: 9,
                  fontWeight: 700,
                  color: '#3D2B1F',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                
                  {item?.label}
                </div>
              </div>)
            )}
          </div>
        </div>
      </div>

      {/* Reflection card */}
      <div
        className="rounded-2xl p-6 mb-10 relative overflow-hidden"
        style={{
          background: 'var(--muted)',
          border: '1.5px solid var(--border)'
        }}>
        
        {/* Decorative stamp */}
        <div
          className="absolute right-6 top-6 opacity-20"
          style={{ transform: 'rotate(15deg)' }}>
          
          <svg viewBox="0 0 80 80" width="60" height="60">
            <circle cx="40" cy="40" r="36" fill="none" stroke="var(--primary)" strokeWidth="3" />
            <circle cx="40" cy="40" r="28" fill="none" stroke="var(--primary)" strokeWidth="1.5" />
            <text x="40" y="38" textAnchor="middle" fill="var(--primary)" fontSize="9" fontWeight="bold">PSVK</text>
            <text x="40" y="50" textAnchor="middle" fill="var(--primary)" fontSize="8">3313</text>
          </svg>
        </div>

        <h4 className="font-display font-bold text-lg mb-3" style={{ color: 'var(--foreground)' }}>
          Semester Reflection
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)', maxWidth: 600 }}>
          PSVK 3313 challenged me to think beyond aesthetics — every design decision had to be grounded in structural
          logic and material truth. The most valuable lesson: a beautiful building is one where beauty and necessity
          are inseparable. The studio environment pushed iterative thinking, and each week&apos;s critique sharpened
          both my technical precision and design intuition.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
          style={{
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
            boxShadow: '0 4px 16px rgba(160,98,42,0.3)',
            minHeight: 44
          }}>
          
          View Final Projects →
        </Link>
        <Link
          href="/desk"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
          style={{
            background: 'var(--card)',
            color: 'var(--foreground)',
            border: '1.5px solid var(--border)',
            minHeight: 44
          }}>
          
          ← Back to Desk
        </Link>
      </div>
    </div>);

}