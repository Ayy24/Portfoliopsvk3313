'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const projects = [
{
  id: 1,
  title: 'Pavilion Kayu',
  subtitle: 'Timber Pavilion Structure',
  category: 'Structural',
  tag: 'Model Making',
  description: 'A lightweight timber pavilion exploring post-and-beam construction, joinery details, and the spatial quality of filtered light through a lattice canopy.',
  image: "https://images.unsplash.com/photo-1657813605032-35326bcf76fe",
  alt: 'Timber pavilion structure with lattice roof in bright outdoor setting, warm afternoon sunlight filtering through wooden beams',
  week: 'Week 3–4',
  grade: 'A',
  tags: ['Timber', 'Pavilion', 'Joinery']
},
{
  id: 2,
  title: 'Rumah Bata',
  subtitle: 'Masonry Wall Study',
  category: 'Material',
  tag: 'Drawing',
  description: 'Detailed technical study of brick bonding patterns, mortar joints, and load distribution in a traditional Malay residential wall section.',
  image: "https://images.unsplash.com/photo-1632147251950-bbfc2e40765f",
  alt: 'Close-up of textured brick wall with varied bonding patterns in warm afternoon light, deep shadows between courses',
  week: 'Week 5–6',
  grade: 'A-',
  tags: ['Masonry', 'Technical Drawing', 'Detail']
},
{
  id: 3,
  title: 'Bumbung Perabung',
  subtitle: 'Traditional Roof Form',
  category: 'Form',
  tag: 'Analysis',
  description: 'Analytical decomposition of the perabung lima roof form — examining its structural logic, cultural significance, and climatic performance in tropical settings.',
  image: "https://images.unsplash.com/photo-1703839837946-c0706289b074",
  alt: 'Traditional Malaysian roofline against blue sky, warm terracotta tiles, dramatic angle showing pitched form',
  week: 'Week 7–8',
  grade: 'A',
  tags: ['Roof', 'Traditional', 'Climate']
},
{
  id: 4,
  title: 'Kolom Konkrit',
  subtitle: 'Concrete Column Sequence',
  category: 'Structural',
  tag: 'Model Making',
  description: 'Sequential model series documenting the formwork, reinforcement, and finished concrete column at 1:20 scale, with annotated section drawings.',
  image: "https://images.unsplash.com/photo-1713725642702-b9fee481d8bb",
  alt: 'Concrete construction columns in daylight, raw industrial textures, geometric repetition, bright sky above',
  week: 'Week 9–10',
  grade: 'B+',
  tags: ['Concrete', 'Formwork', 'Section']
},
{
  id: 5,
  title: 'Tapak Bangunan',
  subtitle: 'Foundation Systems Study',
  category: 'Construction',
  tag: 'Drawing',
  description: 'Comparative analysis of pad, strip, and raft foundation systems through section drawings and a 1:50 physical model showing substructure relationships.',
  image: "https://images.unsplash.com/photo-1418156427006-5f8c87e9f4f0",
  alt: 'Architectural technical drawings spread on desk, pencil marks visible, warm desk lamp light, detailed foundation plans',
  week: 'Week 11–12',
  grade: 'A-',
  tags: ['Foundation', 'Substructure', 'Technical']
},
{
  id: 6,
  title: 'Projek Akhir',
  subtitle: 'Final Integration Project',
  category: 'Integrated',
  tag: 'Final',
  description: 'A comprehensive design-build proposal integrating all course themes: a small community reading pavilion using local materials with demonstrated structural integrity.',
  image: "https://images.unsplash.com/photo-1661652941404-b8ea2ba0c4be",
  alt: 'Modern pavilion structure with clean lines in green landscape, warm dusk light, architectural model quality',
  week: 'Week 13–14',
  grade: 'A',
  tags: ['Final', 'Integrated', 'Community']
}];


const categories = ['All', 'Structural', 'Material', 'Form', 'Construction', 'Integrated'];

export default function ProjectsContent() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ?
  projects :
  projects.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-1 rounded-full" style={{ background: 'var(--primary)' }} />
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--muted-foreground)' }}>
            Works
          </span>
        </div>
        <h2
          className="font-display"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--foreground)', lineHeight: 1.1 }}>
          
          Projects &amp; Works
        </h2>
        <p className="mt-3 text-sm" style={{ color: 'var(--muted-foreground)', maxWidth: 480 }}>
          Design outputs from PSVK 3313 Bentuk &amp; Binaan — exploring form, structure, and material through studio projects.
        </p>
      </div>

      {/* Folder tab decoration */}
      <div
        className="relative rounded-t-2xl px-5 py-3 mb-0 inline-flex items-center gap-2"
        style={{
          background: 'var(--kraft)',
          border: '1.5px solid var(--kraft-dark)',
          borderBottom: 'none'
        }}>
        
        <span className="text-sm font-bold" style={{ color: 'var(--sticker-white)' }}>PORTFOLIO</span>
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>— {filtered.length} projects</span>
      </div>

      {/* Folder body */}
      <div
        className="rounded-b-2xl rounded-tr-2xl p-6 mb-8"
        style={{
          background: 'var(--card)',
          border: '1.5px solid var(--border)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
        }}>
        
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) =>
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{
              background: activeCategory === cat ? 'var(--primary)' : 'var(--muted)',
              color: activeCategory === cat ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
              border: `1.5px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--border)'}`,
              minHeight: 36
            }}>
            
              {cat}
            </button>
          )}
        </div>

        {/* Projects grid */}
        {/* BENTO AUDIT: 6 cards in 3-col grid
               Row 1: [col-1: Pavilion Kayu cs-1] [col-2: Rumah Bata cs-1] [col-3: Bumbung Perabung cs-1]
               Row 2: [col-1: Kolom Konkrit cs-1] [col-2: Tapak Bangunan cs-1] [col-3: Projek Akhir cs-1]
               Placed 6/6 ✓ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, idx) => (
          /* Card idx: {idx} */
          <div
            key={project.id}
            className="group rounded-2xl overflow-hidden transition-all duration-500"
            style={{
              background: 'var(--background)',
              border: '1.5px solid var(--border)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              animationDelay: `${idx * 0.08}s`
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px) rotate(0.5deg)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = '';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
            }}>
            
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: 180 }}>
                <AppImage
                src={project.image}
                alt={project.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105" />
              
                {/* Grade badge */}
                <div
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-xs font-black"
                style={{
                  background: 'var(--sticker-white)',
                  color: 'var(--primary)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  border: '1.5px solid var(--border)'
                }}>
                
                  {project.grade}
                </div>
                {/* Week tag */}
                <div
                className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-xs font-semibold"
                style={{
                  background: 'rgba(30,20,10,0.75)',
                  color: 'rgba(255,252,245,0.9)',
                  backdropFilter: 'blur(4px)'
                }}>
                
                  {project.week}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3
                  className="font-display font-bold"
                  style={{ color: 'var(--foreground)', fontSize: '1rem', lineHeight: 1.3 }}>
                  
                    {project.title}
                  </h3>
                  <span
                  className="shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    background: 'var(--muted)',
                    color: 'var(--muted-foreground)',
                    border: '1px solid var(--border)'
                  }}>
                  
                    {project.tag}
                  </span>
                </div>
                <p
                className="text-xs font-medium mb-2"
                style={{ color: 'var(--primary)' }}>
                
                  {project.subtitle}
                </p>
                <p
                className="text-xs leading-relaxed mb-3"
                style={{ color: 'var(--muted-foreground)' }}>
                
                  {project.description}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((t) =>
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-xs"
                  style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}>
                  
                      {t}
                    </span>
                )}
                </div>
              </div>
            </div>)
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-4 flex-wrap">
        <Link
          href="/process-notes"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
          style={{
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
            boxShadow: '0 4px 16px rgba(160,98,42,0.3)',
            minHeight: 44
          }}>
          
          See Process Notes →
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