import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function AboutContent() {
  const skills = [
  { name: 'Structural Analysis', level: 88 },
  { name: 'Architectural Drawing', level: 92 },
  { name: 'Digital Modeling', level: 80 },
  { name: 'Material Studies', level: 85 },
  { name: 'Design Presentation', level: 90 }];


  const courseObjectives = [
  {
    icon: '📐',
    title: 'Form & Structure',
    desc: 'Understand the relationship between architectural form and structural systems in built environments.'
  },
  {
    icon: '🏗️',
    title: 'Construction Methods',
    desc: 'Study traditional and contemporary construction techniques applied in Malaysian architectural context.'
  },
  {
    icon: '✏️',
    title: 'Design Process',
    desc: 'Develop systematic design thinking from concept sketches to detailed technical drawings.'
  },
  {
    icon: '🔍',
    title: 'Material Analysis',
    desc: 'Evaluate and select appropriate materials based on structural, aesthetic, and sustainability criteria.'
  }];


  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-1 rounded-full"
            style={{ background: 'var(--primary)' }} />
          
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: 'var(--muted-foreground)' }}>
            
            About
          </span>
        </div>
        <h2
          className="font-display"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--foreground)', lineHeight: 1.1 }}>
          
          Profile &amp; Course Brief
        </h2>
      </div>

      {/* Profile card + course info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">

        {/* Profile card */}
        <div className="md:col-span-4">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'var(--card)',
              border: '1.5px solid var(--border)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
            }}>
            
            {/* Photo area */}
            <div
              className="relative overflow-hidden"
              style={{ height: 220, background: 'var(--muted)' }}>
              
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_10a44cdc6-1785148852147.png"
                alt="Student portrait in warm casual setting, natural light, soft background"
                fill
                className="object-cover" />
              
              {/* Washi tape corner decoration */}
              <div
                className="absolute top-3 right-3 w-14 h-5 rounded-sm opacity-80"
                style={{
                  background: 'repeating-linear-gradient(90deg, rgba(255,220,100,0.85), rgba(255,240,130,0.85) 10px, rgba(255,210,90,0.85) 20px)',
                  transform: 'rotate(10deg)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
                }} />
              
            </div>

            <div className="p-5">
              {/* Name sticker */}
              <div
                className="inline-block px-3 py-1 rounded-lg mb-3"
                style={{
                  background: 'var(--sticker-white)',
                  border: '1.5px solid var(--border)',
                  boxShadow: '1px 2px 6px rgba(0,0,0,0.1)',
                  transform: 'rotate(-1deg)'
                }}>
                
                <p className="font-display font-bold" style={{ color: 'var(--foreground)', fontSize: '1.1rem' }}>
                  Ahmad Razif
                </p>
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>
                Student ID: 2022891234
              </p>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Faculty of Architecture, Planning &amp; Surveying
              </p>

              <div
                className="mt-4 pt-4"
                style={{ borderTop: '1px solid var(--border)' }}>
                
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--muted-foreground)' }}>Programme</span>
                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>B.Arch (Hons)</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--muted-foreground)' }}>Semester</span>
                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>5</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--muted-foreground)' }}>Session</span>
                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>2025/2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course brief */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {/* Course info card */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'var(--card)',
              border: '1.5px solid var(--border)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
            }}>
            
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl"
                style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                
                🏛️
              </div>
              <div>
                <h3 className="font-display font-bold text-xl" style={{ color: 'var(--foreground)' }}>
                  PSVK 3313 — Bentuk &amp; Binaan
                </h3>
                <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
                  Form &amp; Construction · 3 Credit Hours
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)', lineHeight: 1.8 }}>
              This course explores the fundamental principles of architectural form and their relationship to construction systems.
              Students investigate how structural logic, material properties, and tectonic expression converge to produce meaningful
              built environments. The studio component integrates analytical drawing, physical model-making, and digital representation
              to develop a comprehensive understanding of design and construction.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {['Studio Work', 'Technical Drawing', 'Model Making', 'Site Analysis', 'Material Study']?.map((tag) =>
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: 'var(--muted)',
                  color: 'var(--muted-foreground)',
                  border: '1px solid var(--border)'
                }}>
                
                  {tag}
                </span>
              )}
            </div>
          </div>

          {/* Skills */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'var(--card)',
              border: '1.5px solid var(--border)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
            }}>
            
            <h4
              className="font-display font-bold mb-5"
              style={{ color: 'var(--foreground)', fontSize: '1.1rem' }}>
              
              Competencies
            </h4>
            <div className="flex flex-col gap-4">
              {skills?.map((skill) =>
              <div key={skill?.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      {skill?.name}
                    </span>
                    <span className="text-xs font-bold" style={{ color: 'var(--primary)' }}>
                      {skill?.level}%
                    </span>
                  </div>
                  <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ background: 'var(--muted)' }}>
                  
                    <div
                    className="h-full rounded-full"
                    style={{
                      width: `${skill?.level}%`,
                      background: `linear-gradient(90deg, var(--primary), var(--secondary))`
                    }} />
                  
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course objectives */}
      <div className="mb-12">
        <h3
          className="font-display font-bold mb-6"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--foreground)' }}>
          
          Course Objectives
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courseObjectives?.map((obj, i) =>
          <div
            key={i}
            className="rounded-2xl p-5 flex gap-4 items-start"
            style={{
              background: i % 2 === 0 ? 'var(--card)' : 'var(--muted)',
              border: '1.5px solid var(--border)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
            }}>
            
              <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{ background: 'var(--sticker-white)', border: '1px solid var(--border)' }}>
              
                {obj?.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--foreground)' }}>
                  {obj?.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  {obj?.desc}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA row */}
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
          
          View Projects →
        </Link>
        <Link
          href="/process-notes"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
          style={{
            background: 'var(--card)',
            color: 'var(--foreground)',
            border: '1.5px solid var(--border)',
            minHeight: 44
          }}>
          
          See Process Notes →
        </Link>
      </div>
    </div>);

}