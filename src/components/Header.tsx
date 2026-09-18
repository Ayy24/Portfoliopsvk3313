'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';

interface HeaderProps {
  currentPage?: 'projects';
}

export default function Header({ currentPage }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/projects', label: 'Projects' },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'rgba(200,145,90,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(160,100,40,0.3)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center gap-2">
            <AppLogo size={32} />
            <span
              className="font-display font-bold tracking-tight hidden sm:block"
              style={{ color: 'var(--sticker-white)', fontSize: '1rem', letterSpacing: '-0.01em' }}
            >
              PSVK 3313
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            const isActive = link.href === '/projects'
              ? currentPage === 'projects'
              : false;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive ? '#3D2B1F' : 'rgba(255,252,245,0.85)',
                  background: isActive ? 'rgba(255,252,245,0.9)' : 'transparent',
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg"
          style={{ color: 'var(--sticker-white)' }}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 top-14 z-50 flex flex-col gap-2 p-6"
          style={{
            background: 'rgba(180,110,50,0.97)',
            backdropFilter: 'blur(16px)',
          }}
          onClick={() => setMenuOpen(false)}
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-5 py-4 rounded-xl text-base font-semibold transition-all"
              style={{
                color: 'var(--sticker-white)',
                background: 'rgba(255,255,255,0.1)',
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}