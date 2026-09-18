import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="w-full border-t"
      style={{
        borderColor: 'rgba(160,98,42,0.2)',
        background: 'var(--muted)',
        padding: '40px 24px',
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-sm font-medium"
          style={{ color: 'var(--muted-foreground)' }}
        >
          © 2026 PSVK 3313 Bentuk &amp; Binaan
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-foreground"
            style={{ color: 'var(--muted-foreground)', minHeight: 44, display: 'flex', alignItems: 'center' }}
          >
            About
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium transition-colors hover:text-foreground"
            style={{ color: 'var(--muted-foreground)', minHeight: 44, display: 'flex', alignItems: 'center' }}
          >
            Projects
          </Link>
          <Link
            href="/process-notes"
            className="text-sm font-medium transition-colors hover:text-foreground"
            style={{ color: 'var(--muted-foreground)', minHeight: 44, display: 'flex', alignItems: 'center' }}
          >
            Process
          </Link>
        </div>
      </div>
    </footer>
  );
}