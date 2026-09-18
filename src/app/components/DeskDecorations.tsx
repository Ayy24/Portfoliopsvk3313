'use client';

import React from 'react';

export default function DeskDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">

      {/* ── PENCILS (top right area) ── */}
      <div
        className="absolute entrance-fade"
        style={{ top: '8%', right: '18%', animationDelay: '0.7s' }}
      >
        <svg viewBox="0 0 90 22" width="90" height="22">
          <defs>
            <linearGradient id="pencilYellow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F0C830" />
              <stop offset="30%" stopColor="#F8D840" />
              <stop offset="70%" stopColor="#E8C020" />
              <stop offset="100%" stopColor="#D4AC10" />
            </linearGradient>
            <linearGradient id="pencilFerule" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D0C8B8" />
              <stop offset="50%" stopColor="#E8E0D0" />
              <stop offset="100%" stopColor="#B8B0A0" />
            </linearGradient>
          </defs>
          {/* Pencil body */}
          <rect x="12" y="3" width="62" height="16" rx="1" fill="url(#pencilYellow)" />
          {/* Wood grain lines */}
          <line x1="12" y1="7" x2="74" y2="7" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
          <line x1="12" y1="11" x2="74" y2="11" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
          <line x1="12" y1="15" x2="74" y2="15" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
          {/* Pencil tip - wood exposed */}
          <polygon points="74,3 88,11 74,19" fill="#D4A870" />
          <polygon points="80,8 88,11 80,14" fill="#C8956A" />
          {/* Graphite tip */}
          <polygon points="84,10 88,11 84,12" fill="#3A3A3A" />
          {/* Ferule (metal band) */}
          <rect x="8" y="3" width="6" height="16" rx="1" fill="url(#pencilFerule)" />
          <line x1="10" y1="3" x2="10" y2="19" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          {/* Eraser end */}
          <rect x="0" y="5" width="10" height="12" rx="2" fill="#E8A0A8" />
          <rect x="0" y="5" width="10" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
          {/* Pencil top highlight */}
          <rect x="12" y="3" width="62" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
        </svg>
      </div>

      <div
        className="absolute entrance-fade"
        style={{ top: '12%', right: '16%', animationDelay: '0.75s', transform: 'rotate(12deg)' }}
      >
        <svg viewBox="0 0 82 20" width="74" height="18">
          <defs>
            <linearGradient id="pencilGreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#78C060" />
              <stop offset="30%" stopColor="#88D070" />
              <stop offset="70%" stopColor="#68B050" />
              <stop offset="100%" stopColor="#58A040" />
            </linearGradient>
          </defs>
          <rect x="12" y="3" width="58" height="14" rx="1" fill="url(#pencilGreen)" />
          <line x1="12" y1="7" x2="70" y2="7" stroke="rgba(0,0,0,0.07)" strokeWidth="0.5" />
          <line x1="12" y1="10" x2="70" y2="10" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <polygon points="70,3 82,10 70,17" fill="#C8A060" />
          <polygon points="76,7.5 82,10 76,12.5" fill="#B89050" />
          <polygon points="79,9.5 82,10 79,10.5" fill="#3A3A3A" />
          <rect x="8" y="3" width="6" height="14" rx="1" fill="#C8C0B0" />
          <rect x="0" y="4" width="10" height="12" rx="2" fill="#E8A0A8" />
          <rect x="12" y="3" width="58" height="3.5" rx="1" fill="rgba(255,255,255,0.18)" />
        </svg>
      </div>

      {/* ── STICKY NOTE (bottom left) ── */}
      <div
        className="absolute entrance-fade"
        style={{ bottom: '12%', left: '8%', animationDelay: '0.8s', transform: 'rotate(-4deg)' }}
      >
        <div
          style={{
            width: 115,
            height: 115,
            background: 'linear-gradient(160deg, #FFE870 0%, #FFD830 40%, #F0C820 100%)',
            boxShadow: '3px 5px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
            padding: '14px 12px 10px',
            borderRadius: '2px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Paper fiber texture */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 15px, rgba(0,0,0,0.04) 15px, rgba(0,0,0,0.04) 16px)',
          }} />
          {/* Top fold shadow */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 8,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 100%)',
          }} />
          {/* Ruled lines */}
          {[30, 46, 62, 78, 94]?.map((y, i) => (
            <div key={i} style={{
              position: 'absolute', left: 10, right: 10, top: y,
              height: 1, background: 'rgba(0,0,0,0.1)',
            }} />
          ))}
          <p style={{ fontSize: 9, color: '#4A3A0A', fontFamily: 'cursive', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
            Sketches<br />due Friday<br />✓ Mood board<br />□ Final render
          </p>
        </div>
      </div>

      {/* ── STICKY NOTE 2 (right side) ── */}
      <div
        className="absolute entrance-fade"
        style={{ bottom: '28%', right: '6%', animationDelay: '0.9s', transform: 'rotate(5deg)' }}
      >
        <div
          style={{
            width: 95,
            height: 95,
            background: 'linear-gradient(160deg, #FFB0C0 0%, #FF9AAE 50%, #F08098 100%)',
            boxShadow: '3px 4px 14px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.35)',
            padding: '12px 10px',
            borderRadius: '2px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 14px, rgba(0,0,0,0.05) 14px, rgba(0,0,0,0.05) 15px)',
          }} />
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 7,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.07) 0%, transparent 100%)',
          }} />
          <p style={{ fontSize: 9, color: '#4A1020', fontFamily: 'cursive', lineHeight: 1.8, position: 'relative', zIndex: 1 }}>
            PSVK<br />3313<br />★★★
          </p>
        </div>
      </div>

      {/* ── WASHI TAPE strips ── */}
      <div
        className="absolute entrance-fade"
        style={{ top: '38%', right: '2%', animationDelay: '1s', transform: 'rotate(90deg)' }}
      >
        <div style={{ position: 'relative', width: 84, height: 20 }}>
          <div style={{
            width: 84, height: 20, borderRadius: 2, opacity: 0.82,
            background: 'repeating-linear-gradient(90deg, rgba(80,160,220,0.85), rgba(110,190,240,0.85) 10px, rgba(70,150,210,0.85) 20px)',
            boxShadow: '1px 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)',
          }} />
          {/* Washi tape texture - semi-transparent */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 2,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.06) 3px, rgba(255,255,255,0.06) 4px)',
          }} />
          {/* Torn edges */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, width: 4,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)',
          }} />
          <div style={{
            position: 'absolute', top: 0, bottom: 0, right: 0, width: 4,
            background: 'linear-gradient(270deg, rgba(255,255,255,0.15), transparent)',
          }} />
        </div>
      </div>

      <div
        className="absolute entrance-fade"
        style={{ bottom: '40%', left: '1%', animationDelay: '1.05s', transform: 'rotate(90deg)' }}
      >
        <div style={{ position: 'relative', width: 74, height: 18 }}>
          <div style={{
            width: 74, height: 18, borderRadius: 2, opacity: 0.78,
            background: 'repeating-linear-gradient(90deg, rgba(240,160,70,0.85), rgba(255,200,100,0.85) 8px, rgba(230,150,60,0.85) 16px)',
            boxShadow: '1px 2px 6px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.25)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 2,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 4px)',
          }} />
        </div>
      </div>

      {/* ── ERASER ── */}
      <div
        className="absolute entrance-fade"
        style={{ bottom: '18%', right: '22%', animationDelay: '0.95s', transform: 'rotate(-8deg)' }}
      >
        <svg viewBox="0 0 96 38" width="96" height="38">
          <defs>
            <linearGradient id="eraserBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F0A8B8" />
              <stop offset="30%" stopColor="#F8B8C8" />
              <stop offset="70%" stopColor="#E898A8" />
              <stop offset="100%" stopColor="#D88898" />
            </linearGradient>
            <linearGradient id="eraserWrapper" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C07888" />
              <stop offset="50%" stopColor="#D08898" />
              <stop offset="100%" stopColor="#B06878" />
            </linearGradient>
          </defs>
          {/* Eraser shadow */}
          <rect x="4" y="10" width="88" height="24" rx="4" fill="rgba(0,0,0,0.2)" transform="translate(2,3)" />
          {/* Eraser body */}
          <rect x="4" y="7" width="88" height="24" rx="4" fill="url(#eraserBody)" />
          {/* Eraser top highlight */}
          <rect x="4" y="7" width="88" height="7" rx="4" fill="rgba(255,255,255,0.22)" />
          {/* Eraser wrapper band */}
          <rect x="4" y="7" width="22" height="24" rx="4" fill="url(#eraserWrapper)" />
          <rect x="24" y="7" width="4" height="24" fill="rgba(0,0,0,0.1)" />
          {/* Wrapper highlight */}
          <rect x="5" y="8" width="20" height="6" rx="3" fill="rgba(255,255,255,0.18)" />
          {/* Eraser text */}
          <text x="60" y="23" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8" fontFamily="sans-serif" letterSpacing="1.5" fontWeight="600">
            ERASER
          </text>
          {/* Used/worn edge */}
          <path d="M4 7 L10 7 L10 31 L4 31 Z" fill="rgba(0,0,0,0.12)" />
          {/* Eraser right edge shadow */}
          <path d="M90 7 L92 9 L92 29 L90 31 Z" fill="rgba(0,0,0,0.1)" />
        </svg>
      </div>

      {/* ── RULER ── */}
      <div
        className="absolute entrance-fade"
        style={{ bottom: '8%', left: '22%', animationDelay: '1.0s', transform: 'rotate(3deg)' }}
      >
        <svg viewBox="0 0 230 30" width="230" height="30">
          <defs>
            <linearGradient id="rulerBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F4ECD0" />
              <stop offset="20%" stopColor="#EEE4C4" />
              <stop offset="60%" stopColor="#E8DCC0" />
              <stop offset="100%" stopColor="#D8CCA8" />
            </linearGradient>
          </defs>
          {/* Ruler shadow */}
          <rect x="0" y="4" width="230" height="24" rx="2" fill="rgba(0,0,0,0.2)" transform="translate(2,3)" />
          {/* Ruler body */}
          <rect x="0" y="2" width="230" height="26" rx="2" fill="url(#rulerBody)" stroke="#C8BC98" strokeWidth="0.8" />
          {/* Ruler top edge - slightly lighter */}
          <rect x="0" y="2" width="230" height="7" rx="2" fill="rgba(255,255,255,0.25)" />
          {/* Ruler bottom edge shadow */}
          <rect x="0" y="22" width="230" height="6" rx="2" fill="rgba(0,0,0,0.08)" />
          {/* Tick marks */}
          {Array.from({ length: 23 }, (_, i) => (
            <g key={i}>
              <line
                x1={i * 10 + 5}
                y1="2"
                x2={i * 10 + 5}
                y2={i % 5 === 0 ? 16 : i % 2 === 0 ? 11 : 8}
                stroke="#8A7A58"
                strokeWidth={i % 5 === 0 ? 1 : 0.7}
              />
              {i % 5 === 0 && i > 0 && (
                <text x={i * 10 + 5} y="25" textAnchor="middle" fill="#8A7A58" fontSize="6.5" fontFamily="sans-serif">
                  {i}
                </text>
              )}
            </g>
          ))}
          {/* Ruler surface glare */}
          <rect x="0" y="2" width="230" height="3" rx="2" fill="rgba(255,255,255,0.3)" />
        </svg>
      </div>

      {/* ── PAPER CLIPS (scattered) ── */}
      <div
        className="absolute entrance-fade"
        style={{ top: '55%', left: '6%', animationDelay: '1.1s', transform: 'rotate(20deg)' }}
      >
        <svg viewBox="0 0 32 54" width="24" height="40">
          <defs>
            <linearGradient id="clipMetal1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A9098" />
              <stop offset="40%" stopColor="#C0C8D0" />
              <stop offset="100%" stopColor="#7A8088" />
            </linearGradient>
          </defs>
          <path
            d="M9 5 L9 40 Q9 48 16 48 Q23 48 23 40 L23 11 Q23 5 16 5 Q9 5 9 11 L9 38 Q9 44 16 44 Q21 44 21 38 L21 11"
            fill="none"
            stroke="url(#clipMetal1)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Highlight */}
          <path
            d="M10 5 L10 40 Q10 46 16 46"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div
        className="absolute entrance-fade"
        style={{ top: '60%', left: '8%', animationDelay: '1.15s', transform: 'rotate(-15deg)' }}
      >
        <svg viewBox="0 0 28 48" width="20" height="34">
          <defs>
            <linearGradient id="clipMetal2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9AA0A8" />
              <stop offset="40%" stopColor="#C8D0D8" />
              <stop offset="100%" stopColor="#8A9098" />
            </linearGradient>
          </defs>
          <path
            d="M7 4 L7 36 Q7 44 14 44 Q21 44 21 36 L21 10 Q21 4 14 4 Q7 4 7 10 L7 34 Q7 40 14 40 Q19 40 19 34 L19 10"
            fill="none"
            stroke="url(#clipMetal2)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M8 4 L8 36 Q8 42 14 42"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── RUBBER STAMP (bottom center-right) ── */}
      <div
        className="absolute stamp-in"
        style={{ bottom: '14%', left: '42%', animationDelay: '1.3s', transform: 'rotate(8deg)' }}
      >
        <svg viewBox="0 0 74 64" width="74" height="64">
          <defs>
            <linearGradient id="stampHandle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6A3010" />
              <stop offset="40%" stopColor="#8B4513" />
              <stop offset="100%" stopColor="#5A2808" />
            </linearGradient>
            <linearGradient id="stampBase" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B06040" />
              <stop offset="100%" stopColor="#904830" />
            </linearGradient>
          </defs>
          {/* Handle shadow */}
          <rect x="27" y="2" width="20" height="20" rx="3" fill="rgba(0,0,0,0.25)" transform="translate(2,2)" />
          {/* Stamp handle - wood */}
          <rect x="27" y="0" width="20" height="20" rx="3" fill="url(#stampHandle)" />
          {/* Handle wood grain */}
          <line x1="27" y1="6" x2="47" y2="6" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <line x1="27" y1="12" x2="47" y2="12" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
          <line x1="27" y1="18" x2="47" y2="18" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          {/* Handle highlight */}
          <rect x="28" y="1" width="18" height="5" rx="2" fill="rgba(255,255,255,0.15)" />
          {/* Connector piece */}
          <rect x="22" y="17" width="30" height="9" rx="2" fill="#5A2808" />
          <rect x="22" y="17" width="30" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
          {/* Stamp base */}
          <rect x="10" y="24" width="54" height="26" rx="3" fill="url(#stampBase)" />
          <rect x="10" y="24" width="54" height="8" rx="3" fill="rgba(255,255,255,0.1)" />
          {/* Stamp face - rubber */}
          <rect x="12" y="26" width="50" height="22" rx="2" fill="#C06848" />
          {/* Stamp impression */}
          <circle cx="37" cy="37" r="13" fill="none" stroke="rgba(255,210,170,0.45)" strokeWidth="1.5" />
          <text x="37" y="40" textAnchor="middle" fill="rgba(255,220,190,0.55)" fontSize="7" fontWeight="700" letterSpacing="0.5" fontFamily="monospace">
            APPROVED
          </text>
        </svg>
      </div>

      {/* ── SMALL DECORATIVE STAR STICKERS ── */}
      <div
        className="absolute entrance-fade"
        style={{ top: '72%', right: '12%', animationDelay: '1.2s' }}
      >
        <svg viewBox="0 0 24 24" width="22" height="22">
          <defs>
            <radialGradient id="starGold" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFE860" />
              <stop offset="60%" stopColor="#FFD020" />
              <stop offset="100%" stopColor="#E8A800" />
            </radialGradient>
          </defs>
          <path d="M12 2 L14 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L10 9 Z" fill="url(#starGold)" />
          <path d="M12 2 L14 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L10 9 Z" fill="none" stroke="rgba(200,140,0,0.3)" strokeWidth="0.5" />
          {/* Star highlight */}
          <path d="M10 5 L11.5 9 L9 9 Z" fill="rgba(255,255,255,0.4)" />
        </svg>
      </div>
      <div
        className="absolute entrance-fade"
        style={{ top: '74%', right: '14%', animationDelay: '1.25s' }}
      >
        <svg viewBox="0 0 24 24" width="15" height="15">
          <defs>
            <radialGradient id="starPink" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFB8C8" />
              <stop offset="100%" stopColor="#F07090" />
            </radialGradient>
          </defs>
          <path d="M12 2 L14 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L10 9 Z" fill="url(#starPink)" />
        </svg>
      </div>

      {/* ── SMALL NOTE PAPER scraps ── */}
      <div
        className="absolute entrance-fade"
        style={{ top: '80%', left: '30%', animationDelay: '1.1s', transform: 'rotate(-6deg)' }}
      >
        <div
          style={{
            width: 84,
            height: 54,
            background: 'linear-gradient(160deg, #FEFAF0 0%, #F8F2E4 100%)',
            border: '1px solid #D8CEB0',
            boxShadow: '2px 4px 10px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.6)',
            padding: '7px 9px',
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ruled lines */}
          {[14, 24, 34, 44]?.map((y, i) => (
            <div key={i} style={{
              position: 'absolute', left: 6, right: 6, top: y,
              height: 1, background: 'rgba(100,140,200,0.18)',
            }} />
          ))}
          {/* Red margin line */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 18,
            width: 1, background: 'rgba(220,80,80,0.2)',
          }} />
          <p style={{ fontSize: 7.5, color: '#6A5A3A', fontFamily: 'cursive', position: 'relative', zIndex: 1, paddingLeft: 10 }}>
            Week 8<br />submission
          </p>
        </div>
      </div>
    </div>
  );
}