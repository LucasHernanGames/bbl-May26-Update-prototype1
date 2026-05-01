import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   BLACK BELT LINGO — "Your Phrases" Module Flow
   Premium redesign with animated Puffling
   ============================================================ */

// ---------- Inline styles & keyframes ----------
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap');

    .font-display { font-family: 'Fredoka', system-ui, sans-serif; letter-spacing: -0.01em; }
    .font-body    { font-family: 'Nunito', system-ui, sans-serif; }

    /* Soft breathing for sleeping puffling */
    @keyframes breathe {
      0%, 100% { transform: scale(1) translateY(0); }
      50%      { transform: scale(1.025) translateY(-2px); }
    }
    .breathe { animation: breathe 3.2s ease-in-out infinite; transform-origin: 50% 100%; }

    /* Gentle floating for clouds & bubbles */
    @keyframes drift {
      0%   { transform: translate(0, 0); }
      50%  { transform: translate(8px, -10px); }
      100% { transform: translate(0, 0); }
    }
    .drift-1 { animation: drift 7s ease-in-out infinite; }
    .drift-2 { animation: drift 9s ease-in-out infinite reverse; }
    .drift-3 { animation: drift 11s ease-in-out infinite; }

    /* Z floating up for sleeping */
    @keyframes zFloat {
      0%   { transform: translate(0, 0) scale(0.6); opacity: 0; }
      20%  { opacity: 1; }
      80%  { opacity: 1; }
      100% { transform: translate(20px, -60px) scale(1.2); opacity: 0; }
    }
    .z-float { animation: zFloat 3.5s ease-out infinite; }

    /* Phrase bubble drift toward puffling */
    @keyframes bubbleDrift {
      0%   { transform: translate(var(--from-x, -120px), var(--from-y, 0)) scale(0.6); opacity: 0; }
      15%  { opacity: 1; }
      85%  { opacity: 1; }
      100% { transform: translate(0, -10px) scale(0.4); opacity: 0; }
    }
    .bubble-drift { animation: bubbleDrift 5s ease-in-out infinite; }

    /* Sparkle pulse */
    @keyframes sparkle {
      0%, 100% { transform: scale(0.4) rotate(0deg); opacity: 0.3; }
      50%      { transform: scale(1) rotate(180deg); opacity: 1; }
    }
    .sparkle { animation: sparkle 2.4s ease-in-out infinite; }

    /* Bouncy entrance */
    @keyframes popIn {
      0%   { transform: scale(0.4); opacity: 0; }
      60%  { transform: scale(1.08); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    .pop-in { animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

    /* Slide & fade page transition */
    @keyframes slideUp {
      0%   { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    .slide-up { animation: slideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; }

    /* Stagger helper */
    .stagger > * { animation-delay: calc(var(--i, 0) * 60ms); }

    /* Word chip fly into sentence */
    @keyframes chipPop {
      0%   { transform: scale(0); opacity: 0; }
      60%  { transform: scale(1.15); }
      100% { transform: scale(1); opacity: 1; }
    }
    .chip-pop { animation: chipPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

    /* Pulsing CTA glow — preserve the white top-edge highlight throughout the animation */
    @keyframes ctaPulse {
      0%, 100% { box-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.6), 0 8px 0 #C99227, 0 12px 24px rgba(245, 200, 26, 0.4); }
      50%      { box-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.6), 0 8px 0 #C99227, 0 14px 32px rgba(245, 200, 26, 0.6); }
    }
    .cta-pulse { animation: ctaPulse 2.2s ease-in-out infinite; }

    /* Stretching for waking puffling */
    @keyframes stretchUp {
      0%   { transform: scaleY(1) scaleX(1); }
      40%  { transform: scaleY(1.12) scaleX(0.95) translateY(-6px); }
      100% { transform: scaleY(1) scaleX(1); }
    }
    .stretch { animation: stretchUp 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) both; transform-origin: 50% 100%; }

    /* Confetti */
    @keyframes confettiFall {
      0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(420px) rotate(720deg); opacity: 0; }
    }
    .confetti { animation: confettiFall 2.8s ease-in forwards; }

    /* Reps count up bounce */
    @keyframes repsBounce {
      0%   { transform: scale(0.5); opacity: 0; }
      50%  { transform: scale(1.2); }
      100% { transform: scale(1); opacity: 1; }
    }
    .reps-bounce { animation: repsBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both; }

    /* Soft progress shimmer */
    @keyframes shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .shimmer-fill {
      background: linear-gradient(90deg, #5DD8C0 0%, #7DEDD8 30%, #5DD8C0 60%, #5DD8C0 100%);
      background-size: 200% 100%;
      animation: shimmer 2.4s linear infinite;
    }

    /* Tactile press */
    .tactile { transition: transform 80ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 80ms; }
    .tactile:active { transform: translateY(4px) scale(0.98); }

    /* Hide scrollbars on the phone */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    /* Wing wave for grumpy puffling */
    @keyframes huff {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-2px) scale(1.02); }
    }
    .huff { animation: huff 1.8s ease-in-out infinite; }

    /* Triumphant pose — big stretch, then settle */
    @keyframes triumph {
      0%   { transform: scale(0.6) translateY(20px); opacity: 0; }
      35%  { transform: scale(1.15) translateY(-12px); opacity: 1; }
      55%  { transform: scale(0.95) translateY(2px); }
      75%  { transform: scale(1.04) translateY(-2px); }
      100% { transform: scale(1) translateY(0); }
    }
    .triumph { animation: triumph 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both; transform-origin: 50% 100%; }

    /* Slow rotating stage light rays behind the puffling */
    @keyframes rayRotate {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .stage-rays { animation: rayRotate 16s linear infinite; transform-origin: 50% 50%; }

    /* Gentle ambient confetti loop */
    @keyframes confettiLoop {
      0%   { transform: translateY(-30px) rotate(0deg); opacity: 0; }
      10%  { opacity: 1; }
      85%  { opacity: 1; }
      100% { transform: translateY(560px) rotate(540deg); opacity: 0; }
    }
    .confetti-loop { animation: confettiLoop 5.5s linear infinite; }

    /* Reps count tick — micro-bounce on each number change */
    @keyframes countTick {
      0%   { transform: scale(1); }
      35%  { transform: scale(1.08); }
      100% { transform: scale(1); }
    }
    .count-tick { animation: countTick 120ms ease-out; }

    /* Glowing aura pulse around hero number */
    @keyframes auraGlow {
      0%, 100% { box-shadow: 0 6px 0 #D4A81F, 0 0 24px rgba(245, 200, 26, 0.45), 0 12px 28px rgba(245, 200, 26, 0.3); }
      50%      { box-shadow: 0 6px 0 #D4A81F, 0 0 38px rgba(245, 200, 26, 0.7), 0 14px 34px rgba(245, 200, 26, 0.4); }
    }
    .aura-glow { animation: auraGlow 2.4s ease-in-out infinite; }

    /* Burst-in for fullscreen interstitial */
    @keyframes burstIn {
      0%   { transform: scale(0.4); opacity: 0; }
      40%  { transform: scale(1.15); opacity: 1; }
      60%  { transform: scale(0.96); }
      100% { transform: scale(1); opacity: 1; }
    }
    .burst-in { animation: burstIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

    /* Backdrop fade-in for interstitial */
    @keyframes backdropFade {
      0%   { opacity: 0; }
      100% { opacity: 1; }
    }
    .backdrop-fade { animation: backdropFade 0.25s ease-out both; }

    /* Reps counter big pulse — when number increments */
    @keyframes repsPulse {
      0%   { transform: scale(1); }
      30%  { transform: scale(1.35); }
      60%  { transform: scale(0.95); }
      100% { transform: scale(1); }
    }
    .reps-pulse { animation: repsPulse 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }

    /* Floating "+N PHRASES" tag that pops out below the reps pill, hovers, then drifts up and fades */
    @keyframes plusFloat {
      0%   { transform: translateY(-8px) scale(0.5); opacity: 0; }
      18%  { transform: translateY(2px) scale(1.15); opacity: 1; }
      30%  { transform: translateY(0) scale(1); opacity: 1; }
      75%  { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(-32px) scale(0.85); opacity: 0; }
    }
    .plus-float { animation: plusFloat 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

    /* Chip flying into the textarea — quick gold flash + scale */
    @keyframes chipFly {
      0%   { transform: scale(1); background: white; }
      30%  { transform: scale(1.15); background: linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%); box-shadow: 0 0 16px rgba(245, 200, 26, 0.6); }
      100% { transform: scale(0.8); opacity: 0.4; background: linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%); }
    }
    .chip-fly { animation: chipFly 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

    /* Particle dot that flies from chip toward target */
    @keyframes particleArc {
      0%   { transform: translate(0, 0) scale(0.6); opacity: 1; }
      40%  { opacity: 1; }
      100% { transform: translate(var(--dx, 0), var(--dy, 0)) scale(0.2); opacity: 0; }
    }
    .particle-arc { animation: particleArc 0.7s cubic-bezier(0.5, 0, 0.5, 1) forwards; }

    /* Progress bar snap-on-fill — brief shimmer overlay */
    @keyframes barSnap {
      0%, 100% { box-shadow: 0 0 0 rgba(245, 200, 26, 0); }
      40%      { box-shadow: 0 0 18px rgba(245, 200, 26, 0.7); }
    }
    .bar-snap { animation: barSnap 0.6s ease-out; }
  `}</style>
);

/* ============================================================
   PUFFLING — fully custom SVG, multiple emotional states
   states: 'sleeping' | 'stirring' | 'waking' | 'grumpy' | 'happy'
   ============================================================ */
const Puffling = ({ state = "sleeping", size = 220, belt = "white" }) => {
  // Belt colors (karate belt progression: white → yellow → orange → green → blue → purple → brown → black)
  const BELT_COLORS = {
    none:    "#E8E8E8",   // pre-white faint gray (shows user has no belt yet)
    white:   "#FFFFFF",
    yellow:  "#F5D94A",
    orange:  "#FF9B47",
    green:   "#5BC890",
    blue:    "#4DA5D9",
    purple:  "#9F7AEA",
    brown:   "#8B5A2B",
    black:   "#1F2937",
  };
  const beltColor = BELT_COLORS[belt] || BELT_COLORS.white;
  const beltStroke = belt === "none" ? "#C8C8C8" : belt === "white" ? "#E0DCD0" : "rgba(0,0,0,0.15)";
  const wrapper = state === "sleeping" ? "breathe" : state === "waking" ? "stretch" : state === "triumph" ? "triumph" : state === "grumpy" ? "huff" : "";
  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      {/* Floating Z's when sleeping */}
      {state === "sleeping" && (
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute font-display font-bold text-white/90 text-2xl z-float" style={{ top: 28, left: "62%", animationDelay: "0s" }}>z</span>
          <span className="absolute font-display font-bold text-white/90 text-3xl z-float" style={{ top: 12, left: "70%", animationDelay: "1.2s" }}>Z</span>
          <span className="absolute font-display font-bold text-white/90 text-xl z-float" style={{ top: 40, left: "78%", animationDelay: "2.4s" }}>z</span>
        </div>
      )}

      <div className={wrapper} style={{ width: "100%", height: "100%" }}>
        <svg viewBox="0 0 220 220" width="100%" height="100%">
          <defs>
            <radialGradient id="bodyGrad" cx="40%" cy="35%" r="75%">
              <stop offset="0%" stopColor="#A8E0F0" />
              <stop offset="60%" stopColor="#6FBFDC" />
              <stop offset="100%" stopColor="#4A9FC4" />
            </radialGradient>
            <radialGradient id="cheekGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFB3C6" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FF8FB1" stopOpacity="0" />
            </radialGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="0" dy="3" result="offsetblur" />
              <feComponentTransfer><feFuncA type="linear" slope="0.25" /></feComponentTransfer>
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="110" cy="200" rx="62" ry="7" fill="#000" opacity="0.18" />

          {/* Body — fluffy blob with bumpy outline */}
          <g filter="url(#softShadow)">
            <path
              d="M 55 120
                 C 48 95, 55 65, 80 55
                 C 90 45, 100 42, 110 42
                 C 120 42, 130 45, 140 55
                 C 165 65, 172 95, 165 120
                 C 172 140, 165 165, 145 178
                 C 130 188, 115 190, 110 190
                 C 105 190, 90 188, 75 178
                 C 55 165, 48 140, 55 120 Z"
              fill="url(#bodyGrad)"
            />
            {/* Fluffy fur bumps */}
            <circle cx="62" cy="78" r="9" fill="#7BCCE4" />
            <circle cx="72" cy="58" r="8" fill="#7BCCE4" />
            <circle cx="92" cy="48" r="7" fill="#7BCCE4" />
            <circle cx="128" cy="48" r="7" fill="#7BCCE4" />
            <circle cx="148" cy="58" r="8" fill="#7BCCE4" />
            <circle cx="158" cy="78" r="9" fill="#7BCCE4" />
            <circle cx="55" cy="155" r="9" fill="#5BB0CC" />
            <circle cx="165" cy="155" r="9" fill="#5BB0CC" />
          </g>

          {/* Cheeks */}
          <ellipse cx="75" cy="120" rx="11" ry="7" fill="url(#cheekGrad)" />
          <ellipse cx="145" cy="120" rx="11" ry="7" fill="url(#cheekGrad)" />

          {/* Eyes — vary by state */}
          {state === "sleeping" && (
            <g stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" fill="none">
              <path d="M 82 105 Q 90 112 98 105" />
              <path d="M 122 105 Q 130 112 138 105" />
            </g>
          )}
          {state === "stirring" && (
            <g stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" fill="none">
              <path d="M 82 105 Q 90 110 98 106" />
              <path d="M 122 106 Q 130 112 138 105" />
            </g>
          )}
          {(state === "waking" || state === "grumpy" || state === "happy" || state === "triumph") && (
            <g>
              {/* Eyebrows for grumpy */}
              {state === "grumpy" && (
                <g stroke="#1F2937" strokeWidth="4" strokeLinecap="round">
                  <line x1="74" y1="92" x2="96" y2="98" />
                  <line x1="146" y1="92" x2="124" y2="98" />
                </g>
              )}
              <ellipse cx="90" cy="108" rx={state === "triumph" ? 8 : 7} ry={state === "triumph" ? 10 : 9} fill="#1F2937" />
              <ellipse cx="130" cy="108" rx={state === "triumph" ? 8 : 7} ry={state === "triumph" ? 10 : 9} fill="#1F2937" />
              {/* Eye highlights */}
              <circle cx="92" cy="104" r={state === "triumph" ? 3 : 2.4} fill="white" />
              <circle cx="132" cy="104" r={state === "triumph" ? 3 : 2.4} fill="white" />
              <circle cx="88" cy="112" r="1.4" fill="white" opacity="0.7" />
              <circle cx="128" cy="112" r="1.4" fill="white" opacity="0.7" />
              {/* Star sparkle in eye for triumph */}
              {state === "triumph" && (
                <>
                  <circle cx="86" cy="103" r="1.2" fill="#FFD83A" />
                  <circle cx="126" cy="103" r="1.2" fill="#FFD83A" />
                </>
              )}
            </g>
          )}

          {/* Mouth */}
          {state === "sleeping" && (
            <path d="M 105 138 Q 110 142 115 138" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}
          {state === "stirring" && (
            <ellipse cx="110" cy="140" rx="4" ry="3" fill="#1F2937" opacity="0.7" />
          )}
          {state === "waking" && (
            <path d="M 100 138 Q 110 148 120 138" stroke="#1F2937" strokeWidth="3" fill="#3D2A2A" strokeLinecap="round" />
          )}
          {state === "grumpy" && (
            <path d="M 100 142 Q 110 137 120 142" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
          {state === "happy" && (
            <path d="M 98 135 Q 110 150 122 135" stroke="#1F2937" strokeWidth="3" fill="#FF8FB1" strokeLinecap="round" />
          )}
          {state === "triumph" && (
            <path d="M 94 132 Q 110 156 126 132" stroke="#1F2937" strokeWidth="3.5" fill="#FF8FB1" strokeLinecap="round" />
          )}

          {/* Karate belt — colored per user's current belt rank */}
          <rect x="55" y="158" width="110" height="14" fill={beltColor} stroke={beltStroke} strokeWidth="0.8" rx="3" />
          <rect x="100" y="156" width="20" height="18" fill={beltColor} stroke={beltStroke} strokeWidth="0.8" rx="3" />
          <line x1="105" y1="172" x2="103" y2="184" stroke={beltColor} strokeWidth="6" strokeLinecap="round" />
          <line x1="115" y1="172" x2="118" y2="184" stroke={beltColor} strokeWidth="6" strokeLinecap="round" />
          {/* Subtle stripe detail on the knot for higher ranks */}
          {(belt === "brown" || belt === "black") && (
            <rect x="55" y="164" width="110" height="2" fill="rgba(0,0,0,0.2)" />
          )}

          {/* Tiny arms — different positions per state */}
          {state !== "waking" && state !== "triumph" && (
            <>
              <ellipse cx="50" cy={state === "grumpy" ? 145 : 150} rx="10" ry="14" fill="#6FBFDC" transform={state === "grumpy" ? "rotate(20 50 145)" : ""} />
              <ellipse cx="170" cy={state === "grumpy" ? 145 : 150} rx="10" ry="14" fill="#6FBFDC" transform={state === "grumpy" ? "rotate(-20 170 145)" : ""} />
            </>
          )}
          {state === "waking" && (
            <>
              {/* Arms stretched up */}
              <ellipse cx="55" cy="80" rx="9" ry="20" fill="#6FBFDC" transform="rotate(-30 55 80)" />
              <ellipse cx="165" cy="80" rx="9" ry="20" fill="#6FBFDC" transform="rotate(30 165 80)" />
            </>
          )}
          {state === "triumph" && (
            <>
              {/* Both arms thrown straight up — victory pose */}
              <ellipse cx="58" cy="60" rx="10" ry="22" fill="#6FBFDC" transform="rotate(-12 58 60)" />
              <ellipse cx="162" cy="60" rx="10" ry="22" fill="#6FBFDC" transform="rotate(12 162 60)" />
              {/* Tiny "fists" at the top */}
              <circle cx="54" cy="42" r="9" fill="#6FBFDC" />
              <circle cx="166" cy="42" r="9" fill="#6FBFDC" />
            </>
          )}

          {/* Tiny huff cloud for grumpy */}
          {state === "grumpy" && (
            <g opacity="0.6">
              <circle cx="155" cy="95" r="4" fill="white" />
              <circle cx="162" cy="92" r="3" fill="white" />
              <circle cx="168" cy="95" r="2.5" fill="white" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

/* ============================================================
   ATMOSPHERIC BACKGROUND
   ============================================================ */
const Sky = ({ children, variant = "calm" }) => {
  const grad =
    variant === "calm"
      ? "linear-gradient(180deg, #B8E8F5 0%, #8FD8E8 40%, #5DD8C0 100%)"
      : variant === "dawn"
      ? "linear-gradient(180deg, #FFD9A8 0%, #FFC08A 30%, #FFA168 100%)"
      : variant === "victory"
      ? "linear-gradient(180deg, #A8E8C8 0%, #5DD8C0 50%, #4FC9B0 100%)"
      : "linear-gradient(180deg, #FFF8E8 0%, #FFF1D0 100%)";

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: grad }}>
      {/* Soft cloud blobs */}
      <div className="absolute drift-1" style={{ top: "8%", left: "-5%", width: 110, height: 60, background: "white", borderRadius: "50%", opacity: 0.55, filter: "blur(2px)" }} />
      <div className="absolute drift-2" style={{ top: "16%", right: "-8%", width: 140, height: 70, background: "white", borderRadius: "50%", opacity: 0.5, filter: "blur(2px)" }} />
      <div className="absolute drift-3" style={{ top: "32%", left: "20%", width: 90, height: 45, background: "white", borderRadius: "50%", opacity: 0.45, filter: "blur(2px)" }} />
      {/* Grass mound at bottom */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 90, background: "linear-gradient(180deg, transparent 0%, #7BD8A8 30%, #5BC890 100%)", borderRadius: "50% 50% 0 0 / 30% 30% 0 0" }} />
      {children}
    </div>
  );
};

/* ============================================================
   CONFETTI BURST
   ============================================================ */
const Confetti = () => {
  const colors = ["#F5C81A", "#FF8FB1", "#5DD8C0", "#A8E0F0", "#FFB347"];
  const pieces = Array.from({ length: 28 }).map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.4,
    color: colors[i % colors.length],
    size: 6 + Math.random() * 8,
    rot: Math.random() * 360,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="absolute confetti"
          style={{
            left: `${p.left}%`,
            top: -20,
            width: p.size,
            height: p.size * 1.4,
            background: p.color,
            transform: `rotate(${p.rot}deg)`,
            animationDelay: `${p.delay}s`,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
};

/* ============================================================
   AMBIENT CONFETTI LOOP — gentler, never-ending background fall
   Used during the celebration stage to keep the energy alive.
   ============================================================ */
const ConfettiLoop = () => {
  const colors = ["#F5C81A", "#FF8FB1", "#5DD8C0", "#A8E0F0", "#FFB347"];
  const pieces = Array.from({ length: 18 }).map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 5,
    color: colors[i % colors.length],
    size: 5 + Math.random() * 6,
    rot: Math.random() * 360,
    duration: 5 + Math.random() * 3,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="absolute confetti-loop"
          style={{
            left: `${p.left}%`,
            top: -30,
            width: p.size,
            height: p.size * 1.4,
            background: p.color,
            transform: `rotate(${p.rot}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            borderRadius: 2,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
};

/* ============================================================
   STAGE RAYS — slowly rotating sunburst behind the puffling
   ============================================================ */
const StageRays = () => (
  <div
    className="absolute pointer-events-none stage-rays"
    style={{
      width: 520,
      height: 520,
      left: "50%",
      top: "50%",
      marginLeft: -260,
      marginTop: -260,
      opacity: 0.55,
    }}
  >
    <svg viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <radialGradient id="rayFade" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFE89A" stopOpacity="0" />
          <stop offset="35%"  stopColor="#FFE89A" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFE89A" stopOpacity="0" />
        </radialGradient>
      </defs>
      {Array.from({ length: 12 }).map((_, i) => (
        <polygon
          key={i}
          points="100,100 96,0 104,0"
          fill="url(#rayFade)"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
    </svg>
  </div>
);

/* ============================================================
   INTERSTITIAL — fullscreen anticipation moment
   Three variants pace the session: 'great' (mint), 'halfway' (cream),
   'last' (gold). Auto-dismisses, no tap required. Text intentionally
   short and oversized so the user can't possibly miss it.
   ============================================================ */
const VARIANTS = {
  great: {
    bg: "radial-gradient(circle at center, rgba(232, 248, 239, 0.94) 0%, rgba(176, 232, 200, 0.92) 100%)",
    sparkle: "#5BC890",
    sparkleAlt: "#7BD8A8",
    headlineColor: "#073A2C",
    shadowColor: "#5BC890",
    shadowGlow: "rgba(91, 200, 144, 0.5)",
    subColor: "#0A4A38",
    emoji: "💪",
    headline: "NICE!",
  },
  halfway: {
    bg: "radial-gradient(circle at center, rgba(255, 248, 232, 0.94) 0%, rgba(255, 217, 168, 0.92) 100%)",
    sparkle: "#FFA94D",
    sparkleAlt: "#FFC07A",
    headlineColor: "#5C3D14",
    shadowColor: "#FFA94D",
    shadowGlow: "rgba(255, 169, 77, 0.5)",
    subColor: "#7A5A20",
    emoji: "⚡",
    headline: "HALFWAY!",
  },
  last: {
    bg: "radial-gradient(circle at center, rgba(255, 248, 232, 0.94) 0%, rgba(255, 232, 154, 0.92) 100%)",
    sparkle: "#F5C81A",
    sparkleAlt: "#FFD83A",
    headlineColor: "#3D2A05",
    shadowColor: "#F5C81A",
    shadowGlow: "rgba(245, 200, 26, 0.5)",
    subColor: "#7A5A20",
    emoji: "🔥",
    headline: "LAST ONE!",
  },
};

const Interstitial = ({ variant = "last" }) => {
  const v = VARIANTS[variant] || VARIANTS.last;
  return (
    <div
      className="absolute inset-0 flex items-center justify-center backdrop-fade"
      style={{
        background: v.bg,
        zIndex: 100,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Sparkles around the text */}
      <div className="absolute sparkle" style={{ top: "32%",  left: "20%", fontSize: 28, color: v.sparkle }}>✦</div>
      <div className="absolute sparkle" style={{ top: "28%",  right: "22%", fontSize: 22, color: v.sparkleAlt, animationDelay: "0.3s" }}>✦</div>
      <div className="absolute sparkle" style={{ bottom: "35%", left: "30%", fontSize: 18, color: v.sparkle, animationDelay: "0.6s" }}>✦</div>
      <div className="absolute sparkle" style={{ bottom: "32%", right: "28%", fontSize: 24, color: v.sparkleAlt, animationDelay: "0.9s" }}>✦</div>

      <div className="text-center burst-in">
        <div style={{ fontSize: 80, lineHeight: 1, marginBottom: 8 }}>{v.emoji}</div>
        <h1
          className="font-display font-bold"
          style={{
            fontSize: 64,
            lineHeight: 0.95,
            color: v.headlineColor,
            textShadow: `0 3px 0 ${v.shadowColor}, 0 6px 24px ${v.shadowGlow}`,
            letterSpacing: "-0.02em",
          }}
        >
          {v.headline}
        </h1>
      </div>
    </div>
  );
};

/* ============================================================
   PROGRESS BAR with shimmer
   ============================================================ */
const ProgressBar = ({ value }) => (
  <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.08)" }}>
    <div
      className="h-full shimmer-fill rounded-full"
      style={{ width: `${value}%`, transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}
    />
  </div>
);

/* ============================================================
   PRIMARY BUTTON
   ============================================================ */
const PrimaryBtn = ({ children, onClick, disabled, pulse = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`tactile w-full py-4 rounded-2xl font-display font-bold text-lg ${pulse ? "cta-pulse" : ""}`}
    style={{
      background: disabled ? "#E5D9B0" : "linear-gradient(180deg, #FFD83A 0%, #F5C81A 100%)",
      color: disabled ? "#A89968" : "#3D2A05",
      boxShadow: disabled ? "0 4px 0 #BFAE7A" : "0 8px 0 #D4A81F, 0 12px 24px rgba(245, 200, 26, 0.35)",
      letterSpacing: "0.02em",
    }}
  >
    {children}
  </button>
);

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function YourPhrasesFlow() {
  const [screen, setScreen] = useState("home"); // home | chooseTraining | start | topic | startHereCategory | startHereFill | info | transition | phrase | finish
  const [topic, setTopic] = useState(null);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [pufflingState, setPufflingState] = useState("sleeping");
  const [reps, setReps] = useState(0);

  // --- Daily training module completion ---
  // The 5 training modules, done in order each day. Once all 5 are done,
  // the user enters "bonus" mode where they can pick any module to do again.
  // Demo: Your Phrases pre-completed so we can show various states.
  const [modulesComplete, setModulesComplete] = useState({
    phrases: false,
    fiveK: false,
    pronunciation: false,
    shadow: false,
    recall: false,
  });

  // Lifetime Recall reps drive the belt level. State so dev scenarios can override
  // (e.g. fresh user = 0 → White Belt L1; bonus mode = 1670 → Yellow Belt L7).
  const [recallReps, setRecallReps] = useState(0);
  const [hasFinishedFirstSession, setHasFinishedFirstSession] = useState(true);

  // Each module has:
  // - `unit`: the thing the user produces (phrases / words / reps)
  // - `dailyQuota`: how many of that unit completes today's module
  // - `dailyDone`: how many they've produced today (demo values)
  // - `lifetime`: total earned across all time (demo values)
  // - `lifetimeTarget`: mastery goal for this module
  const dailyModules = [
    { id: "phrases",       label: "Your Phrases",  sub: "Phrases about your life",    icon: "📖", color: "#F5C81A", colorLight: "#FFE89A",
      unit: "phrases", dailyQuota: 10,  dailyDone: 0,  lifetime: 234,  lifetimeTarget: 10000 },
    { id: "fiveK",         label: "5K List",       sub: "The most common words",      icon: "🗂️", color: "#5BC890", colorLight: "#7BD8A8",
      unit: "words",   dailyQuota: 15,  dailyDone: 0,  lifetime: 148,  lifetimeTarget: 5000 },
    { id: "pronunciation", label: "Pronunciation", sub: "Master the sounds",          icon: "🔊", color: "#FFA94D", colorLight: "#FFC07A",
      unit: "reps",    dailyQuota: 100, dailyDone: 0,  lifetime: 1420, lifetimeTarget: 100000 },
    { id: "shadow",        label: "Shadow",        sub: "Speak your way to fluency",  icon: "🥊", color: "#9F7AEA", colorLight: "#BFA3F5",
      unit: "reps",    dailyQuota: 100, dailyDone: 0,  lifetime: 890,  lifetimeTarget: 100000 },
    { id: "recall",        label: "Recall",        sub: "Review your phrases",        icon: "⭐", color: "#4DA5D9", colorLight: "#7BCCE4",
      unit: "reps",    dailyQuota: 100, dailyDone: 0,  lifetime: 1670, lifetimeTarget: 100000 },
  ];
  // Override Recall's lifetime with the live state value so the home-screen belt
  // info and the choose-training Recall card stay in sync. (Demo wiring.)
  dailyModules[dailyModules.length - 1].lifetime = recallReps;
  // In the demo: if a module is marked complete, show its dailyDone at the quota.
  // In production this would come from the backend session counters.
  const dailyModulesWithProgress = dailyModules.map((m) => ({
    ...m,
    dailyDone: modulesComplete[m.id] ? m.dailyQuota : m.dailyDone,
  }));

  const completedCount = Object.values(modulesComplete).filter(Boolean).length;
  const allModulesDone = completedCount === 5;
  const currentModuleIdx = Math.min(4, completedCount); // next module to do

  // Stats for the home screen (demo values)
  const streakDays = 121;
  const fluentPct  = 45;

  // --- Belt system ---
  // Each belt has 20 levels. Recall reps drive belt progression up through Brown.
  // Black Belt requires mastery across all 5 modules (see brief).
  // Pre-white state: user has done NO full daily sessions yet.
  const BELT_TIERS = [
    { id: "white",  label: "White Belt",  start: 0,     end: 1000,   perLevel: 50 },
    { id: "yellow", label: "Yellow Belt", start: 1000,  end: 3000,   perLevel: 100 },
    { id: "orange", label: "Orange Belt", start: 3000,  end: 7500,   perLevel: 225 },
    { id: "green",  label: "Green Belt",  start: 7500,  end: 20000,  perLevel: 625 },
    { id: "blue",   label: "Blue Belt",   start: 20000, end: 40000,  perLevel: 1000 },
    { id: "purple", label: "Purple Belt", start: 40000, end: 70000,  perLevel: 1500 },
    { id: "brown",  label: "Brown Belt",  start: 70000, end: 100000, perLevel: 1500 },
    { id: "black",  label: "Black Belt",  start: 100000, end: null,  perLevel: null }, // requires all 5 mastered
  ];

  // Pure function: given total lifetime Recall reps + whether user has ever completed
  // a full daily session, returns belt info + current level + progress.
  const computeBeltProgress = (recallReps, hasFinishedFirstSession) => {
    if (!hasFinishedFirstSession) {
      return {
        belt: "none",
        beltLabel: "No belt yet",
        level: 0,
        maxLevel: 20,
        repsIntoLevel: 0,
        repsPerLevel: 50,
        repsToNextLevel: 50,
        repsToNextBelt: 0,
        isBlackBeltTier: false,
      };
    }
    // Find current belt tier
    const tier = BELT_TIERS.find((t) => t.end === null || recallReps < t.end) || BELT_TIERS[BELT_TIERS.length - 1];
    if (tier.id === "black") {
      return {
        belt: "black", beltLabel: "Black Belt", level: 20, maxLevel: 20,
        repsIntoLevel: 0, repsPerLevel: 0, repsToNextLevel: 0, repsToNextBelt: 0,
        isBlackBeltTier: true,
      };
    }
    const progressWithinBelt = recallReps - tier.start;
    const level = Math.min(20, Math.floor(progressWithinBelt / tier.perLevel) + 1);
    const repsIntoLevel = progressWithinBelt - (level - 1) * tier.perLevel;
    const repsToNextLevel = tier.perLevel - repsIntoLevel;
    const repsToNextBelt = tier.end - recallReps;
    return {
      belt: tier.id,
      beltLabel: tier.label,
      level,
      maxLevel: 20,
      repsIntoLevel,
      repsPerLevel: tier.perLevel,
      repsToNextLevel,
      repsToNextBelt,
      isBlackBeltTier: false,
    };
  };

  // Compute belt info from current Recall reps + first-session flag
  const beltInfo = computeBeltProgress(recallReps, hasFinishedFirstSession);

  // --- Daily quota for the "Your Phrases" module ---
  // In production these would come from user prefs + today's saved progress.
  const dailyGoal = 10;          // total phrases needed today to fully wake the Puffling (set low for testing)
  const [dailyDone, setDailyDone] = useState(0); // demo defaults to fresh user — use dev panel to switch
  const [sessionSize, setSessionSize] = useState(null); // how many to do this session
  const [sessionDone, setSessionDone] = useState(0);    // how many done in this session
  const [sessionStartDaily, setSessionStartDaily] = useState(0); // demo default — see dev panel
  const [interstitial, setInterstitial] = useState(null); // 'great' | 'halfway' | 'last' | null

  // --- Unlock progression ---
  // Tracks lifetime phrase count per topic. Used to compute which topics are unlocked.
  // Start Here always unlocked first; complete all 50 to unlock About You.
  // Each subsequent topic needs 20 phrases in the previous topic to unlock.
  // Demo defaults: brand new user, only Start Here unlocked.
  const [phrasesByTopic, setPhrasesByTopic] = useState({
    startHere: 0, // 0..50, where each value also marks completed categories (10 per category)
    about: 0,
    travel: 0,
    family: 0,
    food: 0,
    hobbies: 0,
    love: 0,
    chats: 0,
  });
  const [startHereCategoryIdx, setStartHereCategoryIdx] = useState(null); // 0..4 when active

  // Topic order — Start Here first, then unlock chain per spec
  const topics = [
    { id: "startHere", label: "Start Here", emoji: "🌱", color: "#C8E8A8", isStartHere: true },
    { id: "about",     label: "About you",  emoji: "🙂", color: "#A8E0F0" },
    { id: "travel",    label: "Travel",     emoji: "✈️", color: "#B8D8F5" },
    { id: "family",    label: "Family",     emoji: "🏠", color: "#FFB3C6" },
    { id: "food",      label: "Food",       emoji: "🥗", color: "#D8E8B8" },
    { id: "hobbies",   label: "Hobbies",    emoji: "🎮", color: "#C8E8A8" },
    { id: "love",      label: "Love",       emoji: "❤️", color: "#FFC0CB" },
    { id: "chats",     label: "Dialogues",  emoji: "💬", color: "#D8C8F0" },
  ];

  // Unlock rule: a topic is unlocked iff the topic before it has hit its threshold
  // (50 for Start Here, 20 for everything else).
  const isTopicUnlocked = (topicId) => {
    const idx = topics.findIndex((t) => t.id === topicId);
    if (idx === 0) return true; // Start Here always unlocked
    const prev = topics[idx - 1];
    const required = prev.id === "startHere" ? 50 : 20;
    return (phrasesByTopic[prev.id] || 0) >= required;
  };

  const phrasesNeededToUnlock = (topicId) => {
    const idx = topics.findIndex((t) => t.id === topicId);
    if (idx === 0) return 0;
    const prev = topics[idx - 1];
    const required = prev.id === "startHere" ? 50 : 20;
    const have = phrasesByTopic[prev.id] || 0;
    return { prev, required, have, remaining: Math.max(0, required - have) };
  };

  // --- Start Here data: 5 categories of 10 fill-in-the-blank sentences ---
  // Each category unlocks the next once all 10 sentences are completed.
  const startHereCategories = [
    {
      id: "basics", label: "Basics", emoji: "👋",
      sentences: [
        "Hello, my name is ___.",
        "I am from ___.",
        "I live in ___.",
        "I speak ___.",
        "I am learning ___.",
        "I am ___ years old.",
        "I work as a ___.",
        "I am a ___.",
        "I love ___.",
        "My favorite food is ___.",
      ],
    },
    {
      id: "preferences", label: "Personal Preferences", emoji: "💭",
      sentences: [
        "I like ___.",
        "I don't like ___.",
        "I want ___.",
        "I need ___.",
        "I prefer ___.",
        "I enjoy ___.",
        "I hate ___.",
        "I'm interested in ___.",
        "I'm afraid of ___.",
        "I'm excited about ___.",
      ],
    },
    {
      id: "daily", label: "Daily Life", emoji: "☀️",
      sentences: [
        "I wake up at ___.",
        "I go to ___ every day.",
        "I drink ___ in the morning.",
        "I eat ___ for breakfast.",
        "I usually watch ___.",
        "I'm going to ___.",
        "I'm coming from ___.",
        "I'm looking for ___.",
        "I'm waiting for ___.",
        "I'm thinking about ___.",
      ],
    },
    {
      id: "people", label: "People & Relationships", emoji: "💞",
      sentences: [
        "This is my ___.",
        "I have a ___.",
        "My best friend is ___.",
        "I live with ___.",
        "I'm meeting ___ today.",
        "I miss ___.",
        "I trust ___.",
        "I respect ___.",
        "I'm proud of ___.",
        "I'm grateful for ___.",
      ],
    },
    {
      id: "travel", label: "Travel & Survival", emoji: "🧭",
      sentences: [
        "Where is ___?",
        "I need to find ___.",
        "I would like ___.",
        "I'm allergic to ___.",
        "I feel ___.",
        "I forgot ___.",
        "I lost my ___.",
        "I found ___.",
        "Can you help with ___?",
        "I'm ready for ___.",
      ],
    },
  ];

  // Helpers for Start Here progression
  const startHereCategoryProgress = (catIdx) => {
    // Each category is 10 sentences. The user completes them in order across categories.
    // phrasesByTopic.startHere is total completed (0..50).
    const done = phrasesByTopic.startHere || 0;
    const start = catIdx * 10;
    const end = start + 10;
    if (done >= end) return { state: "done", count: 10 };
    if (done >= start) return { state: "current", count: done - start };
    return { state: "locked", count: 0 };
  };

  const currentStartHereCategoryIdx = () => {
    const done = phrasesByTopic.startHere || 0;
    return Math.min(4, Math.floor(done / 10));
  };

  /* Interstitial pacing:
     - 1-2 phrases:  no interstitials (too short, would feel forced)
     - 3-4 phrases:  LAST ONE only (before the final question)
     - 5-7 phrases:  HALFWAY (around the middle) + LAST ONE
     - 8+ phrases:   GREAT (after #2) + HALFWAY (middle) + LAST ONE
     `justFinished` is the 1-based question index they just completed.
     Returns 'great' | 'halfway' | 'last' | null. */
  const pickInterstitial = (justFinished, total) => {
    if (total < 3) return null;
    // LAST ONE always fires before the final question (i.e., after second-to-last)
    if (justFinished === total - 1) return "last";
    // HALFWAY at the midpoint, only when session is long enough
    if (total >= 5) {
      const halfwayMark = Math.floor(total / 2);
      // Avoid stacking with a "great" trigger on tiny sessions
      if (justFinished === halfwayMark && halfwayMark > 2) return "halfway";
    }
    // GREAT after question #2, only when session has enough runway after
    if (total >= 8 && justFinished === 2) return "great";
    return null;
  };

  /* Two-phase question structure:
     - info: context-gathering, NOT added to phrase book. Used so AI
       can generate personalized phrases that actually fit the user.
     - phrases: AI-generated personalized prompts. The user's answers
       to THESE get translated and added to the phrase book. */
  const questionSets = {
    work: {
      info: [
        { q: "What's your job?",                     placeholder: "e.g. I work as a barista at Starbucks",            chips: ["I work as a", "I'm a", "My job is", "I work in", "freelance", "student"] },
        { q: "Where do you usually work from?",      placeholder: "e.g. I work from the office downtown",              chips: ["I work from", "I work at", "the office", "home", "a café", "all over"] },
      ],
      phrases: [
        { q: "How long have you been at your current job?",   placeholder: "Type your answer in English...", chips: ["I've been here for", "about", "around", "years", "months", "since"] },
        { q: "What's your favorite thing about your work?",   placeholder: "Type your answer in English...", chips: ["I love", "the people", "the challenge", "being creative", "the freedom", "my team"] },
        { q: "What does a typical day look like for you?",    placeholder: "Type your answer in English...", chips: ["I usually", "first I", "then I", "in the morning", "with my team", "I finish by"] },
        { q: "Who do you work with most closely?",            placeholder: "Type your answer in English...", chips: ["I work with", "my team", "my boss", "my coworkers", "mostly alone"] },
        { q: "What's the hardest part of your job?",          placeholder: "Type your answer in English...", chips: ["The hardest part is", "I struggle with", "deadlines", "long hours", "people"] },
        { q: "What would you change about your work?",        placeholder: "Type your answer in English...", chips: ["I'd change", "less", "more", "I wish", "honestly nothing"] },
        { q: "Where do you see yourself in five years?",      placeholder: "Type your answer in English...", chips: ["In 5 years I'll", "I want to be", "hopefully", "still doing this", "somewhere new"] },
        { q: "How do you usually unwind after work?",         placeholder: "Type your answer in English...", chips: ["After work I", "I like to", "I usually", "with friends", "by myself"] },
        { q: "What's your dream job?",                        placeholder: "Type your answer in English...", chips: ["My dream job is", "I'd love to", "someday", "owning my own"] },
        { q: "What do you usually talk about with coworkers?",placeholder: "Type your answer in English...", chips: ["We talk about", "mostly", "weekend plans", "work stuff", "anything but work"] },
      ],
    },
    about: {
      info: [
        { q: "What's your name?",                    placeholder: "e.g. My name is Alex",                              chips: ["My name is", "I'm", "I go by", "Most people call me"] },
        { q: "Where are you from?",                  placeholder: "e.g. I'm from Mexico City",                         chips: ["I'm from", "I live in", "Originally from", "I grew up in"] },
      ],
      phrases: [
        { q: "What do you love about where you live?",        placeholder: "Type your answer in English...", chips: ["I love", "the food", "the people", "the weather", "the culture", "everything"] },
        { q: "What do you do for fun?",                       placeholder: "Type your answer in English...", chips: ["I enjoy", "I like to", "I love", "in my free time", "with friends"] },
        { q: "What's something you're really passionate about?", placeholder: "Type your answer in English...", chips: ["I'm passionate about", "I really love", "I care a lot about"] },
        { q: "Tell us about your closest friend.",            placeholder: "Type your answer in English...", chips: ["My best friend is", "we met", "they're", "we love to"] },
        { q: "What does a perfect weekend look like for you?",placeholder: "Type your answer in English...", chips: ["A perfect weekend is", "I'd start by", "then", "with"] },
        { q: "What's something you're proud of?",             placeholder: "Type your answer in English...", chips: ["I'm proud of", "I once", "the time I", "honestly"] },
        { q: "What's the best meal you've had recently?",     placeholder: "Type your answer in English...", chips: ["The best meal", "I had", "at", "it was", "with"] },
        { q: "What's a place you'd love to visit?",           placeholder: "Type your answer in English...", chips: ["I'd love to visit", "someday", "always wanted to see"] },
        { q: "What's a favorite memory of yours?",            placeholder: "Type your answer in English...", chips: ["My favorite memory", "when I was", "I remember", "with"] },
        { q: "What never fails to make you laugh?",           placeholder: "Type your answer in English...", chips: ["I always laugh at", "my friends", "dumb jokes", "honestly anything"] },
      ],
    },
  };

  const currentSet = questionSets[topic?.id] || questionSets.about;
  const currentPhase = screen === "info" ? "info" : screen === "phrase" ? "phrases" : null;
  const currentList = currentPhase ? currentSet[currentPhase] : [];
  const currentQ = currentList[qIdx];

  // Move puffling state through the flow.
  // In bonus mode (all 5 modules already done today), the Puffling stays in its
  // earned mood — sleeping/stirring overrides only fire during the normal daily flow.
  useEffect(() => {
    if (allModulesDone) {
      // Keep Puffling thrilled / happy regardless of which Your-Phrases sub-screen we're on
      setPufflingState("happy");
      return;
    }
    if (screen === "start" || screen === "topic" || screen === "info" || screen === "startHereCategory") setPufflingState("sleeping");
    if (screen === "transition") setPufflingState("sleeping");
    if (screen === "phrase" || screen === "startHereFill") setPufflingState("stirring");
  }, [screen, allModulesDone]);

  const saveAnswer = (text) => {
    setAnswers((prev) => ({ ...prev, [`${currentPhase}-${qIdx}`]: text }));
  };

  const advance = (text) => {
    saveAnswer(text);

    // Different totals per phase: info is fixed, phrase uses session size
    const phaseTotal = currentPhase === "info" ? currentList.length : sessionSize;

    // Reps + phrase counters only fire during the real phrase-building phase.
    // The intro questions are context-gathering, not earned phrases.
    // +2 because each question saves both the question and the answer
    // as separate phrases in the user's phrasebook.
    if (currentPhase === "phrases") {
      setReps((r) => r + 2);
      setSessionDone((s) => s + 1);
      setDailyDone((d) => d + 1);
      // Track lifetime per-topic phrase count — drives unlock progression
      // and the "X phrases" badge on the topic-pick tile.
      if (topic?.id) {
        setPhrasesByTopic((p) => ({ ...p, [topic.id]: (p[topic.id] || 0) + 2 }));
      }
    }

    if (qIdx < phaseTotal - 1) {
      // Pacing-aware interstitial: only fires for phrase phase, scaled to session size
      const variant = (currentPhase === "phrases")
        ? pickInterstitial(qIdx + 1, phaseTotal)  // qIdx+1 = the question they just FINISHED
        : null;
      if (variant) {
        setInterstitial(variant);
        const duration = variant === "last" ? 1600 : 1000;
        setTimeout(() => {
          setQIdx(qIdx + 1);
          setInterstitial(null);
        }, duration);
      } else {
        setQIdx(qIdx + 1);
      }
    } else {
      // End of phase
      if (currentPhase === "info") {
        setScreen("transition");
        setQIdx(0);
      } else {
        // Determine if daily goal hit (using snapshot + sessionSize, since state is async)
        const finalDaily = sessionStartDaily + sessionSize;
        const isComplete = finalDaily >= dailyGoal;

        setScreen("finish");
        if (isComplete) {
          setTimeout(() => setPufflingState("waking"), 300);
          setTimeout(() => setPufflingState("grumpy"), 1700);
        } else {
          // Partial session: Puffling stays fully asleep — only the daily
          // quota wakes it. This preserves the open loop: come back to wake me!
          setTimeout(() => setPufflingState("sleeping"), 200);
        }
      }
    }
  };

  const startInfo = () => {
    setScreen("info");
    setQIdx(0);
  };

  // Start Here flow
  const startTopic = () => {
    if (!topic) return;
    if (topic.id === "startHere") {
      // Land on category-select instead of info
      setScreen("startHereCategory");
    } else {
      // Normal topic flow
      setScreen("info");
      setQIdx(0);
    }
  };

  const startStartHereCategory = (catIdx) => {
    setStartHereCategoryIdx(catIdx);
    setScreen("startHereFill");
    setQIdx(0); // index within the 10 sentences
    setSessionStartDaily(dailyDone);
    setSessionSize(10); // each category = 10 sentences
    setSessionDone(0);
    // Wake the puffling state visual to "stirring" since they're actively training
    setPufflingState("stirring");
  };

  // User completed a Start Here fill-in-the-blank
  const advanceStartHere = (text) => {
    setAnswers((prev) => ({
      ...prev,
      [`startHere-${startHereCategoryIdx}-${qIdx}`]: text,
    }));

    // Each filled sentence = 1 phrase added (different from regular phrases which yield 2)
    setReps((r) => r + 1);
    setSessionDone((s) => s + 1);
    setDailyDone((d) => d + 1);
    setPhrasesByTopic((p) => ({ ...p, startHere: (p.startHere || 0) + 1 }));

    const total = 10;
    if (qIdx < total - 1) {
      const variant = pickInterstitial(qIdx + 1, total);
      if (variant) {
        setInterstitial(variant);
        const duration = variant === "last" ? 1600 : 1000;
        setTimeout(() => {
          setQIdx(qIdx + 1);
          setInterstitial(null);
        }, duration);
      } else {
        setQIdx(qIdx + 1);
      }
    } else {
      // End of category — go to finish screen
      const finalDaily = sessionStartDaily + total;
      const isComplete = finalDaily >= dailyGoal;

      setScreen("finish");
      if (isComplete) {
        setTimeout(() => setPufflingState("waking"), 300);
        setTimeout(() => setPufflingState("grumpy"), 1700);
      } else {
        setTimeout(() => setPufflingState("sleeping"), 200);
      }
    }
  };

  const startPhrases = (size) => {
    setSessionSize(size);
    setSessionDone(0);
    setSessionStartDaily(dailyDone);
    setScreen("phrase");
    setQIdx(0);
  };

  // For partial-session finish → user wants to do more right now
  const doMoreSession = () => {
    setScreen("transition");
    setSessionSize(null);
    setSessionDone(0);
  };

  // Called after finishing a session — returns user to the home screen.
  // If the daily quota was hit, marks the corresponding module complete.
  const restart = () => {
    // Mark Your Phrases complete if the user hit daily goal in this session
    if (dailyDone >= dailyGoal && !modulesComplete.phrases) {
      setModulesComplete((m) => ({ ...m, phrases: true }));
    }
    setScreen("home");
    setTopic(null);
    setQIdx(0);
    setAnswers({});
    setReps(0);
    setSessionSize(null);
    setSessionDone(0);
    setStartHereCategoryIdx(null);
    // Note: phrasesByTopic NOT reset, so unlock progression persists across demo runs.
  };

  // Handler for module selection on Choose Training screen (bonus mode)
  // Centralized back-navigation. Each screen's "back" goes to the most natural
  // previous screen. Allows ← / ✕ buttons throughout the app to work correctly.
  const goBack = () => {
    switch (screen) {
      case "topic":
        // From topic select, go back to start screen
        setScreen("start");
        break;
      case "start":
        // From the Wake Up Puffling screen, exit the module back to home
        setScreen("home");
        break;
      case "startHereCategory":
        // Back to topic select
        setScreen("topic");
        break;
      case "startHereFill":
        // Back to category list
        setScreen("startHereCategory");
        break;
      case "info":
      case "phrase":
      case "transition":
        // From inside a question session, exit back to topic select
        // (in production this should probably show a confirm dialog
        // since it loses session progress — flag for dev)
        setScreen("topic");
        break;
      case "finish":
        // From finish screen back to home
        setScreen("home");
        break;
      case "chooseTraining":
        setScreen("home");
        break;
      default:
        setScreen("home");
    }
  };

  const selectModule = (moduleId) => {
    if (moduleId === "phrases") {
      // Enter the Your Phrases flow — in bonus mode this is extra practice
      // beyond the daily quota, so dailyDone stays where it is (already ≥ goal)
      setScreen("start");
    } else {
      // Other modules aren't built yet — in the prototype, tapping them is a no-op
      // in bonus mode (already complete), but for daily flow we'd route into them.
      // Leaving as a placeholder for when your team implements the other modules.
    }
  };

  // --- Dev controls ---
  // Two scenario toggles let the dev preview the app at different lifecycle points
  // without having to actually grind through the flow.

  // FRESH USER — brand new, sleeping Puffling, 0/5 modules, Start Here untouched.
  // Note: hasFinishedFirstSession stays TRUE so belt level still shows (per Tony's request,
  // to keep the demo state consistent for the dev). The "no belt yet" state can be tested
  // separately later if needed.
  const devFreshUser = () => {
    setScreen("home");
    setTopic(null);
    setQIdx(0);
    setAnswers({});
    setReps(0);
    setSessionSize(null);
    setSessionDone(0);
    setDailyDone(0);
    setSessionStartDaily(0);
    setStartHereCategoryIdx(null);
    setModulesComplete({ phrases: false, fiveK: false, pronunciation: false, shadow: false, recall: false });
    setHasFinishedFirstSession(true);
    setRecallReps(0);
    setPhrasesByTopic({ startHere: 0, about: 0, travel: 0, family: 0, food: 0, hobbies: 0, love: 0, chats: 0 });
  };

  // MID-DAY — partway through today's training (Your Phrases done, working on next module)
  const devMidDay = () => {
    setScreen("home");
    setTopic(null);
    setQIdx(0);
    setAnswers({});
    setReps(0);
    setSessionSize(null);
    setSessionDone(0);
    setDailyDone(10);
    setSessionStartDaily(0);
    setStartHereCategoryIdx(null);
    setModulesComplete({ phrases: true, fiveK: false, pronunciation: false, shadow: false, recall: false });
    setHasFinishedFirstSession(true);
    setRecallReps(0);
    setPhrasesByTopic({ startHere: 30, about: 0, travel: 0, family: 0, food: 0, hobbies: 0, love: 0, chats: 0 });
  };

  // BONUS MODE — all 5 modules done today, Puffling thrilled, free to do extra practice
  const devBonusMode = () => {
    setScreen("home");
    setTopic(null);
    setQIdx(0);
    setAnswers({});
    setReps(0);
    setSessionSize(null);
    setSessionDone(0);
    setDailyDone(10);
    setSessionStartDaily(10);
    setStartHereCategoryIdx(null);
    setModulesComplete({ phrases: true, fiveK: true, pronunciation: true, shadow: true, recall: true });
    setHasFinishedFirstSession(true);
    setRecallReps(1670);
    setPhrasesByTopic({ startHere: 50, about: 24, travel: 0, family: 0, food: 0, hobbies: 0, love: 0, chats: 0 });
  };

  // START HERE LOCKED — fresh user, only Start Here available, all other topics still locked
  const devStartHereLocked = () => {
    setScreen("topic");
    setTopic(null);
    setQIdx(0);
    setAnswers({});
    setReps(0);
    setSessionSize(null);
    setSessionDone(0);
    setDailyDone(0);
    setSessionStartDaily(0);
    setStartHereCategoryIdx(null);
    setModulesComplete({ phrases: false, fiveK: false, pronunciation: false, shadow: false, recall: false });
    setHasFinishedFirstSession(true);
    setRecallReps(0);
    setPhrasesByTopic({ startHere: 0, about: 0, travel: 0, family: 0, food: 0, hobbies: 0, love: 0, chats: 0 });
  };

  // START HERE COMPLETE — all 50 starter phrases done, About You unlocked, rest still locked
  const devStartHereDone = () => {
    setScreen("topic");
    setTopic(null);
    setQIdx(0);
    setAnswers({});
    setReps(0);
    setSessionSize(null);
    setSessionDone(0);
    setDailyDone(0);
    setSessionStartDaily(0);
    setStartHereCategoryIdx(null);
    setModulesComplete({ phrases: true, fiveK: false, pronunciation: false, shadow: false, recall: false });
    setHasFinishedFirstSession(true);
    setRecallReps(0);
    setPhrasesByTopic({ startHere: 50, about: 0, travel: 0, family: 0, food: 0, hobbies: 0, love: 0, chats: 0 });
  };

  // ALL TOPICS UNLOCKED — user has built phrases across multiple topics
  const devAllTopicsUnlocked = () => {
    setScreen("topic");
    setTopic(null);
    setQIdx(0);
    setAnswers({});
    setReps(0);
    setSessionSize(null);
    setSessionDone(0);
    setDailyDone(0);
    setSessionStartDaily(0);
    setStartHereCategoryIdx(null);
    setModulesComplete({ phrases: true, fiveK: true, pronunciation: true, shadow: true, recall: true });
    setHasFinishedFirstSession(true);
    setRecallReps(1670);
    setPhrasesByTopic({ startHere: 50, about: 24, travel: 22, family: 20, food: 20, hobbies: 20, love: 20, chats: 0 });
  };

  // Legacy alias used by the home-screen ↻ button
  const devReset = devFreshUser;

  // Dev panel open/closed
  const [devPanelOpen, setDevPanelOpen] = useState(false);

  // Phone frame container
  return (
    <div className="font-body min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg, #2E3138 0%, #1B1D22 100%)" }}>
      <GlobalStyles />

      {/* ============================================================
          DEV SCENARIO PANEL — toggleable corner widget for testing.
          Lets the dev jump between user states without manually
          completing modules. Strip this whole block before shipping
          to production by deleting from "DEV" comment to end of div.
          ============================================================ */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999 }}>
        <button
          onClick={() => setDevPanelOpen((v) => !v)}
          style={{
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 12,
            padding: "8px 14px",
            color: "#FFE89A",
            fontFamily: "inherit",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.05em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>🛠</span>
          <span>DEV{devPanelOpen ? " ▼" : ""}</span>
        </button>

        {devPanelOpen && (
          <div
            style={{
              marginTop: 8,
              background: "rgba(15, 18, 24, 0.95)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 14,
              padding: 12,
              minWidth: 240,
              boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ color: "rgba(255, 232, 154, 0.6)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
              Daily lifecycle
            </div>

            {[
              { label: "🌅 Fresh user", desc: "No belt · 0/5 modules", action: devFreshUser },
              { label: "📈 Mid-day", desc: "Phrases done · working on rest", action: devMidDay },
              { label: "🎉 Bonus mode", desc: "All 5 done · Yellow Belt L7", action: devBonusMode },
            ].map((s) => (
              <button
                key={s.label}
                onClick={s.action}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 10,
                  padding: "10px 12px",
                  marginBottom: 6,
                  color: "white",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "background 150ms ease-out",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245, 200, 26, 0.18)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)"; }}
              >
                <div style={{ fontSize: 13, fontWeight: 700 }}>{s.label}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{s.desc}</div>
              </button>
            ))}

            <div style={{ color: "rgba(255, 232, 154, 0.6)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 14, marginBottom: 8 }}>
              Topic unlock states
            </div>

            {[
              { label: "🔒 Start Here only", desc: "All other topics locked", action: devStartHereLocked },
              { label: "🌱 Start Here done", desc: "About You unlocked, rest locked", action: devStartHereDone },
              { label: "🗝 All topics unlocked", desc: "Multiple topics in progress", action: devAllTopicsUnlocked },
            ].map((s) => (
              <button
                key={s.label}
                onClick={s.action}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 10,
                  padding: "10px 12px",
                  marginBottom: 6,
                  color: "white",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "background 150ms ease-out",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(91, 200, 144, 0.18)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)"; }}
              >
                <div style={{ fontSize: 13, fontWeight: 700 }}>{s.label}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{s.desc}</div>
              </button>
            ))}

            <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", fontSize: 10, lineHeight: 1.4 }}>
              Prototype v1 · Tap a scenario to reset state and view that moment of the user lifecycle.
            </div>
          </div>
        )}
      </div>
      {/* End of dev panel */}

      {/* Phone */}
      <div
        className="relative overflow-hidden shadow-2xl"
        style={{
          width: 390,
          height: 780,
          borderRadius: 44,
          background: "#FFF8E8",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 8px #1B1D22, 0 0 0 9px #444",
        }}
      >
        {/* Status bar */}
        <div className="relative z-50 flex items-center justify-between px-7 pt-3 pb-1 text-xs font-bold" style={{ color: "#1F2937" }}>
          <span>9:41</span>
          <div className="absolute left-1/2 -translate-x-1/2 top-3 w-24 h-6 rounded-full" style={{ background: "#000" }} />
          <span>•••</span>
        </div>

        {/* Screen content */}
        <div className="relative no-scrollbar overflow-hidden" style={{ height: "calc(100% - 32px)" }}>
          {screen === "home" && (
            <HomeScreen
              modules={dailyModulesWithProgress}
              modulesComplete={modulesComplete}
              completedCount={completedCount}
              allModulesDone={allModulesDone}
              streakDays={streakDays}
              fluentPct={fluentPct}
              beltInfo={beltInfo}
              pufflingState={
                allModulesDone ? "triumph" :
                completedCount >= 4 ? "happy" :
                completedCount >= 3 ? "waking" :
                completedCount >= 2 ? "waking" :
                completedCount >= 1 ? "grumpy" :
                "sleeping"
              }
              onStart={() => {
                // Bonus mode: let user pick any module
                if (allModulesDone) {
                  setScreen("chooseTraining");
                  return;
                }
                // Normal flow: go directly to the next module in order.
                // Your Phrases is the first and gets the special "Wake up" intro.
                // Other modules skip the intro and jump straight in.
                const nextId = dailyModules[currentModuleIdx]?.id;
                if (nextId === "phrases") {
                  setDailyDone(3);
                  setSessionStartDaily(3);
                  setScreen("start");
                } else if (nextId) {
                  // Demo: other modules aren't built yet — mark complete and return to home
                  setModulesComplete((m) => ({ ...m, [nextId]: true }));
                }
              }}
              onDevReset={devReset}
            />
          )}
          {screen === "chooseTraining" && (
            <ChooseTrainingScreen
              modules={dailyModulesWithProgress}
              modulesComplete={modulesComplete}
              currentModuleIdx={currentModuleIdx}
              allModulesDone={allModulesDone}
              beltInfo={beltInfo}
              onPick={selectModule}
              onBack={() => setScreen("home")}
            />
          )}
          {screen === "start"      && <StartScreen onStart={() => setScreen("topic")} isBonus={allModulesDone} onBack={goBack} />}
          {screen === "topic"      && (
            <TopicScreen
              topics={topics}
              selected={topic}
              setSelected={setTopic}
              onContinue={startTopic}
              isTopicUnlocked={isTopicUnlocked}
              phrasesNeededToUnlock={phrasesNeededToUnlock}
              phrasesByTopic={phrasesByTopic}
              isBonus={allModulesDone}
              onBack={goBack}
            />
          )}
          {screen === "startHereCategory" && (
            <StartHereCategoryScreen
              categories={startHereCategories}
              currentIdx={currentStartHereCategoryIdx()}
              progressFn={startHereCategoryProgress}
              totalDone={phrasesByTopic.startHere || 0}
              onPick={startStartHereCategory}
              onBack={() => setScreen("topic")}
            />
          )}
          {screen === "startHereFill" && (
            <StartHereFillScreen
              key={`sh-${startHereCategoryIdx}-${qIdx}`}
              category={startHereCategories[startHereCategoryIdx]}
              qIdx={qIdx}
              total={10}
              sentence={startHereCategories[startHereCategoryIdx].sentences[qIdx]}
              onNext={advanceStartHere}
              pufflingState={pufflingState}
              reps={reps}
              onBack={goBack}
            />
          )}
          {(screen === "info" || screen === "phrase") && currentQ && (
            <QuestionScreen
              key={`${currentPhase}-${qIdx}`}
              phase={currentPhase}
              qIdx={qIdx}
              total={currentPhase === "info" ? currentList.length : sessionSize}
              question={currentQ.q}
              placeholder={currentQ.placeholder}
              chips={currentQ.chips}
              onNext={advance}
              topicLabel={topic?.label}
              pufflingState={pufflingState}
              reps={reps}
              onBack={goBack}
            />
          )}
          {screen === "transition" && <TransitionScreen topicLabel={topic?.label} dailyDone={dailyDone} dailyGoal={dailyGoal} onContinue={startPhrases} />}
          {screen === "finish"     && <FinishScreen pufflingState={pufflingState} reps={reps} sessionDone={sessionDone} dailyDone={dailyDone} dailyGoal={dailyGoal} onContinue={restart} onDoMore={doMoreSession} onHome={restart} />}

          {/* Anticipation overlay — fires for ~1.6s before the user's last phrase */}
          {interstitial && <Interstitial variant={interstitial} />}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SCREEN 0 — HOME
   The app's front door. Glowing Puffling in a level ring, daily
   stats strip, and the "Daily Checklist" notepad that tracks
   progress through the 5 training modules.

   Design principles:
   - Spiral notepad metaphor is iconic to BBL — keep it
   - The Puffling's emotional state reflects day's completion
   - Each checked module converts to a gold trophy chip
   - Level ring animates as user progresses toward next level
   ============================================================ */
const HomeScreen = ({
  modules, modulesComplete, completedCount, allModulesDone,
  streakDays, fluentPct, beltInfo,
  pufflingState, onStart, onDevReset,
}) => {
  // Ring fills based on Recall-reps-into-current-level.
  // E.g., if user needs 100 reps per level and has 40 into the current level, ring = 40%.
  const progressPct = beltInfo.isBlackBeltTier
    ? 100
    : beltInfo.repsPerLevel > 0
    ? (beltInfo.repsIntoLevel / beltInfo.repsPerLevel) * 100
    : 0;

  // Ring animation — starts at 0, animates to the true value on mount
  const [ringPct, setRingPct] = useState(0);
  const [moodExpanded, setMoodExpanded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRingPct(progressPct), 400);
    return () => clearTimeout(t);
  }, [progressPct]);

  const RING_SIZE = 160;
  const RING_STROKE = 8;
  const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
  const RING_CIRC = 2 * Math.PI * RING_RADIUS;

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "linear-gradient(180deg, #7BDDC5 0%, #5DD8C0 35%, #5DD8C0 100%)" }}>
      {/* Soft cloud silhouettes */}
      <div className="absolute pointer-events-none" style={{ top: "14%", left: "-5%", width: 140, height: 60, background: "rgba(255,255,255,0.35)", borderRadius: "50%", filter: "blur(8px)" }} />
      <div className="absolute pointer-events-none" style={{ top: "22%", right: "-8%", width: 160, height: 70, background: "rgba(255,255,255,0.3)", borderRadius: "50%", filter: "blur(10px)" }} />
      <div className="absolute pointer-events-none" style={{ top: "36%", left: "10%", width: 100, height: 40, background: "rgba(255,255,255,0.25)", borderRadius: "50%", filter: "blur(6px)" }} />

      {/* Grass mound bottom of sky */}
      <div className="absolute pointer-events-none" style={{ top: "42%", left: 0, right: 0, height: 100, background: "radial-gradient(ellipse at center top, #9FE8B5 0%, transparent 70%)", opacity: 0.7 }} />

      <div className="relative flex flex-col px-4 pt-3 pb-3 h-full">
        {/* Stats strip — compact 40px */}
        <div className="flex gap-2 slide-up">
          <button className="tactile rounded-xl flex items-center justify-center" style={{ width: 40, height: 40, background: "white", boxShadow: "0 2px 0 rgba(0,0,0,0.06)" }}>
            <span style={{ fontSize: 17 }}>🏠</span>
          </button>
          <div className="flex-1 flex items-center justify-center gap-1 rounded-xl px-2" style={{ background: "white", boxShadow: "0 2px 0 rgba(0,0,0,0.06)" }}>
            <span style={{ fontSize: 18 }}>🔥</span>
            <span className="font-display font-bold" style={{ color: "#3D2A05", fontSize: 16 }}>{streakDays}</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1 rounded-xl px-2" style={{ background: "white", boxShadow: "0 2px 0 rgba(0,0,0,0.06)" }}>
            <span style={{ fontSize: 16 }}>🇲🇽</span>
            <span className="font-display font-bold" style={{ color: "#3D2A05", fontSize: 14 }}>{fluentPct}% Fluent</span>
          </div>
          <button onClick={onDevReset} className="tactile rounded-xl flex items-center justify-center" style={{ width: 40, height: 40, background: "white", boxShadow: "0 2px 0 rgba(0,0,0,0.06)", fontSize: 12, color: "#7A5A20" }} title="Dev: reset progress">
            ↻
          </button>
        </div>

        {/* Puffling in level ring + mood ladder on the side — compressed to 200px */}
        <div className="relative flex items-center justify-center mt-2 slide-up" style={{ animationDelay: "100ms", height: 180 }}>
          {/* Faint sparkles around the Puffling */}
          <div className="absolute sparkle" style={{ top: 30,  left: "18%", fontSize: 20, color: "#FFD83A" }}>✦</div>
          <div className="absolute sparkle" style={{ top: 80,  left: "10%", fontSize: 14, color: "#FFD83A", animationDelay: "0.4s" }}>✦</div>
          <div className="absolute sparkle" style={{ top: 40,  right: "22%", fontSize: 18, color: "#FFD83A", animationDelay: "0.8s" }}>✦</div>
          <div className="absolute sparkle" style={{ top: 120, left: "22%", fontSize: 12, color: "#FFD83A", animationDelay: "1.1s" }}>✦</div>

          {/* Level ring with animated gold progress arc */}
          <div className="relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
            <svg width={RING_SIZE} height={RING_SIZE} style={{ transform: "rotate(-90deg)" }}>
              <defs>
                <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#FFE89A" />
                  <stop offset="50%"  stopColor="#FFD83A" />
                  <stop offset="100%" stopColor="#F5C81A" />
                </linearGradient>
                <filter id="ringGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Track */}
              <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={RING_STROKE} />
              {/* Gold arc */}
              <circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RING_RADIUS}
                fill="none"
                stroke="url(#ringGold)"
                strokeWidth={RING_STROKE}
                strokeLinecap="round"
                strokeDasharray={RING_CIRC}
                strokeDashoffset={RING_CIRC - (ringPct / 100) * RING_CIRC}
                filter="url(#ringGlow)"
                style={{ transition: "stroke-dashoffset 1400ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              />
            </svg>
            {/* White inner circle for the Puffling */}
            <div className="absolute inset-3 rounded-full flex items-center justify-center" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.3) 75%, transparent 100%)" }}>
              <Puffling state={pufflingState} size={124} belt={beltInfo.belt} />
            </div>
            {/* Level coin — smaller, sits at bottom-right of ring (8 o'clock-ish) */}
            <div
              className="absolute"
              style={{
                bottom: 4,
                right: 4,
              }}
            >
              <div
                className="rounded-full flex items-center justify-center aura-glow"
                style={{
                  width: 38, height: 38,
                  background: beltInfo.isBlackBeltTier
                    ? "linear-gradient(180deg, #4A4F5A 0%, #1F2937 100%)"
                    : "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)",
                  border: "3px solid #FFFFFF",
                }}
              >
                <span className="font-display font-bold" style={{
                  fontSize: beltInfo.belt === "none" ? 9 : 11,
                  color: beltInfo.isBlackBeltTier ? "#FFE89A" : "#3D2A05",
                  letterSpacing: "-0.02em",
                }}>
                  {beltInfo.belt === "none" ? "—" : `Lv${beltInfo.level}`}
                </span>
              </div>
            </div>
          </div>

          {/* Mood ladder — collapsed: aligns with bottom of Puffling ring.
              Expanded: centers vertically on the Puffling. */}
          <div
            className="absolute right-0"
            style={{
              ...(moodExpanded
                ? { top: "50%", transform: "translateY(-50%)" }
                : { bottom: 12 }),
              transition: "top 350ms cubic-bezier(0.32, 0.72, 0, 1), bottom 350ms cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          >
            <button
              onClick={() => setMoodExpanded((v) => !v)}
              className="rounded-full py-2 px-1.5 flex flex-col items-center gap-1 tactile"
              style={{
                background: "rgba(255,255,255,0.35)",
                backdropFilter: "blur(6px)",
                boxShadow: "0 3px 0 rgba(0,0,0,0.06)",
                transition: "padding 350ms cubic-bezier(0.32, 0.72, 0, 1)",
              }}
            >
              {/* Order is reversed so excitement is at top (peak) and sleeping at bottom (rest).
                  Index `i` still maps to mood-state semantics (0=sleeping, 5=thrilled). */}
              {[...["😴", "😤", "😢", "😐", "😄", "🤩"].entries()].reverse().map(([i, emoji]) => {
                const isCurrent = i === completedCount;
                // When collapsed, only render the current one
                if (!moodExpanded && !isCurrent) return null;
                return (
                  <div
                    key={i}
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: 24, height: 24,
                      background: isCurrent
                        ? "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)"
                        : i < completedCount
                        ? "rgba(245, 200, 26, 0.3)"
                        : "transparent",
                      boxShadow: isCurrent ? "0 2px 0 #D4A81F, 0 0 10px rgba(245, 200, 26, 0.6)" : "none",
                      transform: isCurrent ? "scale(1.15)" : "scale(1)",
                      transition: "all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                      fontSize: 13,
                      opacity: i > completedCount ? 0.55 : 1,
                      // Stagger the expand animation so emojis pop in sequentially
                      animation: moodExpanded && !isCurrent ? `popIn 280ms ${Math.abs(i - completedCount) * 40}ms cubic-bezier(0.34, 1.56, 0.64, 1) both` : undefined,
                    }}
                  >
                    {emoji}
                  </div>
                );
              })}
              {/* Tiny chevron hint when collapsed */}
              {!moodExpanded && (
                <div
                  style={{
                    fontSize: 8,
                    color: "rgba(7, 58, 44, 0.5)",
                    marginTop: 1,
                    letterSpacing: "0.1em",
                  }}
                >
                  •••
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Belt progression — belt name + Recall reps to next level */}
        <div className="flex flex-col items-center gap-1 mt-2 slide-up" style={{ animationDelay: "200ms" }}>
          {beltInfo.belt === "none" ? (
            <div className="font-display font-bold uppercase tracking-widest" style={{ fontSize: 10, color: "#073A2C", letterSpacing: "0.1em" }}>
              Finish today's training to earn your first belt
            </div>
          ) : beltInfo.isBlackBeltTier ? (
            <div
              className="px-3 py-1 rounded-full font-display font-bold uppercase"
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                background: "linear-gradient(180deg, #4A4F5A 0%, #1F2937 100%)",
                color: "#FFE89A",
                boxShadow: "0 2px 0 rgba(0,0,0,0.2)",
              }}
            >
              🥋 Black Belt
            </div>
          ) : (
            <>
              <div
                className="px-3 py-0.5 rounded-full font-display font-bold uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  background: "rgba(255,255,255,0.92)",
                  color: "#073A2C",
                  boxShadow: "0 2px 0 rgba(0,0,0,0.06)",
                }}
              >
                {beltInfo.beltLabel}
              </div>
              <div
                className="font-display font-semibold uppercase"
                style={{ fontSize: 9, color: "rgba(7, 58, 44, 0.7)", letterSpacing: "0.08em" }}
              >
                {beltInfo.repsToNextLevel} recall reps to Level {beltInfo.level + 1}
              </div>
            </>
          )}
        </div>

        {/* Flex spacer — pushes the notepad down, giving the Puffling area breathing room */}
        <div className="flex-1" />

        {/* Notepad with daily checklist — sized to content (no dead space before CTA) */}
        <div
          className="relative rounded-3xl slide-up"
          style={{
            background: "linear-gradient(180deg, #FFE89A 0%, #FFD47A 100%)",
            boxShadow: "0 4px 0 rgba(0,0,0,0.08), inset 0 0 0 2px rgba(255,255,255,0.4)",
            animationDelay: "300ms",
            transition: "background 800ms ease-out",
            padding: "16px 14px 10px 14px",
          }}
        >
          {/* Spiral binding — slightly smaller rings */}
          <div className="absolute left-0 right-0 flex justify-around px-3" style={{ top: -6 }}>
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 7, height: 14,
                  background: "#5B3A1C",
                  borderRadius: 3,
                  boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.25), 0 1px 0 rgba(0,0,0,0.1)",
                }}
              />
            ))}
          </div>

          {/* Header: title centered, X/5 progress chip floats at the top-right.
              The chip turns celebratory gold when all 5 are complete (vs muted teal in progress). */}
          <div className="relative mb-2 flex items-center justify-center" style={{ minHeight: 24 }}>
            <h2 className="font-display font-bold text-center" style={{ fontSize: 18, color: "#073A2C" }}>
              {allModulesDone ? "Done for the day! 🎉" : "Daily Checklist"}
            </h2>
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full flex items-center gap-1 font-display font-bold"
              style={{
                background: allModulesDone
                  ? "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)"
                  : "rgba(10, 74, 56, 0.1)",
                color: "#073A2C",
                fontSize: 10,
                boxShadow: allModulesDone ? "0 2px 0 #D4A81F" : "none",
              }}
            >
              {completedCount}/5
            </div>
          </div>

          {/* Module checklist — same order as Choose Training */}
          <div className="flex flex-col gap-1.5">
            {modules.map((m) => {
              const done = modulesComplete[m.id];
              return (
                <div
                  key={m.id}
                  className="flex items-center gap-2.5 py-2 px-2.5 rounded-xl"
                  style={{
                    background: done ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
                    boxShadow: done ? "0 2px 0 rgba(245, 200, 26, 0.35)" : "0 1px 0 rgba(0,0,0,0.05)",
                    transition: "background 400ms ease-out, box-shadow 400ms ease-out",
                  }}
                >
                  <div
                    className="rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 32, height: 32,
                      background: done ? m.colorLight : `${m.colorLight}99`,
                      fontSize: 16,
                      transition: "background 400ms ease-out",
                    }}
                  >
                    {m.icon}
                  </div>
                  {/* Module label — bigger, no longer cramped by stacked progress text.
                      Strikethrough is rendered as a custom overlay line so it extends
                      slightly past the word on both sides (looks more decisive). */}
                  <div
                    className="flex-1 min-w-0 font-display font-bold"
                    style={{
                      fontSize: 15,
                      color: done ? "#0A4A38" : "#073A2C",
                      lineHeight: 1.1,
                    }}
                  >
                    <span
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      {m.label}
                      {done && (
                        <span
                          aria-hidden
                          style={{
                            position: "absolute",
                            left: "-0.6ch",
                            right: "-0.6ch",
                            top: "50%",
                            transform: "translateY(-50%)",
                            height: 2,
                            background: "rgba(10, 74, 56, 0.6)",
                            borderRadius: 1,
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    </span>
                  </div>
                  {/* Daily progress — moved to the right, just before the checkmark */}
                  <div
                    className="font-display font-semibold flex-shrink-0 text-right"
                    style={{
                      fontSize: 10,
                      color: done ? "rgba(10, 74, 56, 0.55)" : "rgba(7, 58, 44, 0.7)",
                      letterSpacing: "0.02em",
                      lineHeight: 1.15,
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 11, color: done ? "#0A4A38" : "#073A2C" }}>
                      {m.dailyDone}/{m.dailyQuota}
                    </div>
                    <div style={{ marginTop: 1, fontSize: 9, opacity: 0.7 }}>
                      {m.unit}
                    </div>
                  </div>
                  {done ? (
                    <div
                      className="pop-in rounded-full flex items-center justify-center"
                      style={{
                        width: 22, height: 22,
                        background: "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)",
                        boxShadow: "0 2px 0 #D4A81F",
                        color: "#3D2A05",
                        fontSize: 14,
                        fontWeight: 800,
                      }}
                    >
                      ✓
                    </div>
                  ) : (
                    <div
                      style={{
                        width: 22, height: 22,
                        borderRadius: 7,
                        border: "2px solid rgba(10, 74, 56, 0.4)",
                        background: "rgba(255,255,255,0.4)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA — slightly smaller than the standard PrimaryBtn so it fits the
              compressed home screen and doesn't overpower the checklist above it */}
          <div className="mt-2" onMouseDown={(e) => e.preventDefault()}>
            <button
              onClick={onStart}
              className={`tactile w-full py-3 rounded-2xl font-display font-bold relative ${!allModulesDone ? "cta-pulse" : ""}`}
              style={{
                // Brighter gold gradient — top stop is significantly more saturated than
                // the notepad behind, so the button's top + side edges separate naturally
                // without needing a top-shadow (which looks unnatural — light comes from above).
                background: "linear-gradient(180deg, #FFE066 0%, #FFC940 50%, #F5A820 100%)",
                color: "#3D2A05",
                fontSize: 15,
                letterSpacing: "0.02em",
                // Faint white highlight at the very top edge gives a subtle glint
                // that separates the button's top from the notepad behind it.
                boxShadow: "inset 0 1.5px 0 rgba(255, 255, 255, 0.6), 0 8px 0 #C99227, 0 14px 28px rgba(245, 200, 26, 0.5)",
              }}
            >
              {allModulesDone
                ? "🎉 BONUS TRAINING →"
                : completedCount === 0
                ? `START: ${modules[0].label.toUpperCase()} →`
                : `CONTINUE: ${modules[completedCount].label.toUpperCase()} →`}
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div
          className="mt-2 flex items-center justify-around py-1.5 rounded-2xl flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 2px 0 rgba(0,0,0,0.04)",
          }}
        >
          {[
            { label: "Puffling", image: "/puffling.png", active: true },
            { label: "Phrasebook", icon: "📖" },
            { label: "Social", icon: "💬" },
            { label: "Progress", icon: "📊" },
          ].map((tab) => (
            <div key={tab.label} className="flex flex-col items-center gap-0.5">
              {tab.image ? (
                <img
                  src={tab.image}
                  alt={tab.label}
                  style={{
                    width: 22,
                    height: 22,
                    objectFit: "contain",
                    opacity: tab.active ? 1 : 0.55,
                  }}
                />
              ) : (
                <span style={{ fontSize: 17, opacity: tab.active ? 1 : 0.55 }}>{tab.icon}</span>
              )}
              <span className="font-display font-semibold" style={{ fontSize: 9, color: tab.active ? "#0A4A38" : "rgba(10,74,56,0.55)" }}>{tab.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SCREEN 0.5 — CHOOSE YOUR TRAINING
   The 5 daily training modules as a vertical quest path.
   Only the next-up module is tappable (sequential unlock).
   Completed modules show checkmarks + a connector line extends
   in gold underneath them to visualize the journey.

   All-5-complete state: every module becomes tappable, headline
   shifts to "Bonus Training!", confetti loops, Puffling thrilled.
   ============================================================ */
const ChooseTrainingScreen = ({ modules, modulesComplete, currentModuleIdx, allModulesDone, beltInfo, onPick, onBack }) => {
  return (
    <div className="relative w-full h-full overflow-y-auto no-scrollbar" style={{ background: allModulesDone
      ? "linear-gradient(180deg, #FFE89A 0%, #FFD47A 100%)"
      : "linear-gradient(180deg, #FFF8E8 0%, #FFF1D0 100%)" }}>
      {allModulesDone && <ConfettiLoop />}

      <div className="relative flex flex-col px-5 pt-4 pb-5" style={{ minHeight: "100%" }}>
        {/* Header */}
        <div className="flex items-center gap-3 slide-up">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold tactile"
            style={{ background: "white", color: "#1F4A5C", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            ←
          </button>
          <div className="flex-1 text-center pr-9">
            <div className="font-display font-semibold text-xs uppercase tracking-widest" style={{ color: "#7A5A20" }}>
              {allModulesDone ? "Bonus Mode" : "Today's Journey"}
            </div>
          </div>
        </div>

        {/* Title block */}
        <div className="text-center mt-4 slide-up" style={{ animationDelay: "80ms" }}>
          <h1 className="font-display font-bold" style={{ fontSize: 30, color: "#3D2A05", lineHeight: 1 }}>
            {allModulesDone ? "Bonus Training!" : "Choose Your Training"}
          </h1>
          <p className="font-display font-semibold mt-1.5" style={{ fontSize: 13, color: "#7A5A20" }}>
            {allModulesDone
              ? "You earned this — pick any module 🎉"
              : `Complete in order · ${currentModuleIdx}/5 done`}
          </p>
        </div>

        {/* Quest path — 5 modules as a vertical timeline */}
        <div className="relative mt-5 stagger">
          {/* Connector line behind modules — gold fill up to currentModuleIdx */}
          <div
            className="absolute"
            style={{
              left: 39,
              top: 28,
              bottom: 28,
              width: 4,
              background: "rgba(122, 90, 32, 0.15)",
              borderRadius: 2,
              zIndex: 0,
            }}
          />
          <div
            className="absolute"
            style={{
              left: 39,
              top: 28,
              height: allModulesDone
                ? "calc(100% - 28px)"
                : `calc(${(currentModuleIdx / 5) * 100}% - ${(currentModuleIdx / 5) * 56}px)`,
              width: 4,
              background: allModulesDone
                ? "linear-gradient(180deg, #F5C81A 0%, #FFD83A 50%, #F5C81A 100%)"
                : "linear-gradient(180deg, #F5C81A 0%, #FFD83A 100%)",
              backgroundSize: "100% 200%",
              animation: "shimmer 2.6s linear infinite",
              borderRadius: 2,
              boxShadow: "0 0 8px rgba(245, 200, 26, 0.5)",
              transition: "height 1000ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 0,
            }}
          />

          {modules.map((m, i) => {
            const done = modulesComplete[m.id];
            const isCurrent = !done && i === currentModuleIdx;
            const isLocked = !done && !isCurrent && !allModulesDone;
            const isTappable = isCurrent || allModulesDone || done;

            return (
              <div
                key={m.id}
                className="slide-up relative flex items-center gap-3 mb-2.5"
                style={{ ["--i"]: i, zIndex: 1 }}
              >
                {/* Number/status bubble anchoring to the timeline */}
                <div
                  className="rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 44, height: 44,
                    background: done
                      ? "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)"
                      : isCurrent
                      ? `linear-gradient(180deg, ${m.colorLight} 0%, ${m.color} 100%)`
                      : allModulesDone
                      ? "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)"
                      : "white",
                    boxShadow: done || isCurrent || allModulesDone
                      ? `0 3px 0 ${done || allModulesDone ? "#D4A81F" : "rgba(0,0,0,0.15)"}`
                      : "0 2px 0 rgba(0,0,0,0.08)",
                    color: "#3D2A05",
                    fontSize: done ? 20 : 16,
                    fontWeight: 800,
                    border: "3px solid white",
                  }}
                >
                  {done ? "✓" : i + 1}
                </div>

                {/* The module card */}
                <button
                  onClick={() => isTappable && onPick(m.id)}
                  disabled={!isTappable}
                  className="tactile text-left flex-1 rounded-2xl p-3 flex items-center gap-3 relative"
                  style={{
                    background: done
                      ? "white"
                      : isCurrent
                      ? `linear-gradient(135deg, ${m.colorLight} 0%, ${m.color} 100%)`
                      : allModulesDone
                      ? "white"
                      : "rgba(255,255,255,0.7)",
                    boxShadow: isCurrent
                      ? `0 6px 0 rgba(0,0,0,0.12), 0 10px 22px ${m.color}44`
                      : done || allModulesDone
                      ? "0 3px 0 rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.04)"
                      : "0 2px 0 rgba(0,0,0,0.04)",
                    opacity: isLocked ? 0.55 : 1,
                    border: isCurrent ? "2px solid rgba(255,255,255,0.7)" : "2px solid transparent",
                    transform: isCurrent ? "translateY(-1px)" : "none",
                    cursor: isTappable ? "pointer" : "default",
                    transition: "transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  {/* Icon tile */}
                  <div
                    className="rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 42, height: 42,
                      background: isCurrent
                        ? "rgba(255,255,255,0.65)"
                        : done || allModulesDone
                        ? m.colorLight
                        : `${m.colorLight}88`,
                      fontSize: 22,
                      filter: isLocked ? "grayscale(0.5)" : "none",
                    }}
                  >
                    {isLocked ? "🔒" : m.icon}
                  </div>

                  {/* Label + sub */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-display font-bold"
                      style={{
                        fontSize: 15,
                        color: isCurrent ? "#2D1F04" : "#3D2A05",
                        lineHeight: 1.1,
                      }}
                    >
                      {m.label}
                    </div>
                    {/* Subtext: Recall uniquely shows belt progression (since it's
                        the only module that drives belt advancement). Other modules
                        just show their descriptive sub. Cleaner, more meaningful. */}
                    {m.id === "recall" && beltInfo && !beltInfo.isBlackBeltTier && beltInfo.belt !== "none" ? (
                      <div
                        className="font-display font-semibold flex items-center gap-1.5 flex-wrap"
                        style={{
                          fontSize: 11,
                          color: isCurrent ? "rgba(45, 31, 4, 0.78)" : "rgba(61, 42, 5, 0.7)",
                          marginTop: 2,
                        }}
                      >
                        <span style={{ fontSize: 10 }}>🥋</span>
                        <span style={{ fontWeight: 700, color: "#3D2A05" }}>{beltInfo.repsToNextLevel}</span>
                        <span>reps to Level {beltInfo.level + 1}</span>
                      </div>
                    ) : (
                      <div
                        className="font-display font-semibold"
                        style={{
                          fontSize: 11,
                          color: isCurrent ? "rgba(45, 31, 4, 0.72)" : "rgba(61, 42, 5, 0.6)",
                          marginTop: 2,
                        }}
                      >
                        {isLocked
                          ? `Complete ${modules[i - 1].label} first`
                          : allModulesDone
                          ? m.sub
                          : done
                          ? "Done ✨"
                          : m.sub}
                      </div>
                    )}
                  </div>

                  {/* Right-side indicator */}
                  {isCurrent && !allModulesDone && (
                    <div
                      className="font-display font-bold px-2.5 py-1 rounded-full flex items-center gap-0.5"
                      style={{
                        background: "rgba(255, 255, 255, 0.85)",
                        color: "#3D2A05",
                        fontSize: 11,
                        letterSpacing: "0.06em",
                        boxShadow: "0 2px 0 rgba(0,0,0,0.08)",
                      }}
                    >
                      START →
                    </div>
                  )}
                  {allModulesDone && !done && (
                    <div style={{ fontSize: 18, color: m.color }}>→</div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="text-center mt-4 slide-up" style={{ animationDelay: "500ms" }}>
          <p className="font-display font-semibold" style={{ fontSize: 11, color: "rgba(61, 42, 5, 0.55)" }}>
            {allModulesDone
              ? "You've completed today's daily goal! Keep the streak alive ✨"
              : "Modules unlock in order — one at a time"}
          </p>
        </div>

        {/* Puffling waving at the bottom right, only when all complete */}
        {allModulesDone && (
          <div className="absolute" style={{ bottom: 20, right: 20 }}>
            <Puffling state="triumph" size={90} />
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   SCREEN 1 — START / "Wake Up Your Puffling"
   ============================================================ */
const StartScreen = ({ onStart, isBonus = false, onBack = () => {} }) => {
  const phrases = ["Hello", "Buenos días", "¿Cómo estás?", "Bonjour", "こんにちは"];
  return (
    <div className="relative w-full h-full">
      <Sky variant="calm">
        {/* Sparkle stars */}
        <div className="absolute sparkle text-yellow-200 text-2xl" style={{ top: "10%", left: "12%" }}>✦</div>
        <div className="absolute sparkle text-yellow-200 text-xl" style={{ top: "18%", right: "16%", animationDelay: "0.8s" }}>✦</div>
        <div className="absolute sparkle text-white text-base" style={{ top: "26%", left: "75%", animationDelay: "1.4s" }}>✦</div>

        <div className="relative h-full flex flex-col px-6 pt-4 pb-6">
          {/* Module badge */}
          <div className="flex items-center justify-between slide-up">
            <div className="px-3 py-1.5 rounded-full font-display font-semibold text-xs" style={{ background: "rgba(255,255,255,0.7)", color: "#1F4A5C", backdropFilter: "blur(8px)" }}>
              {isBonus ? "🎉 BONUS PRACTICE" : "MODULE 1 OF 5"}
            </div>
            <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold tactile" style={{ background: "rgba(255,255,255,0.7)", color: "#1F4A5C" }}>✕</button>
          </div>

          {/* Title block */}
          <div className="mt-6 text-center slide-up" style={{ animationDelay: "120ms" }}>
            <div className="font-display font-semibold text-sm uppercase tracking-widest" style={{ color: "#0E5C70" }}>Your Phrases</div>
            <h1 className="font-display font-bold mt-1" style={{ fontSize: 36, color: "#0A3A48", lineHeight: 1, textShadow: "0 2px 0 rgba(255,255,255,0.4)" }}>
              {isBonus ? <>Keep Building<br />Your Phrasebook</> : <>Wake Up Your<br />Puffling</>}
            </h1>
            <p className="font-body font-semibold mt-3 text-base" style={{ color: "#1F4A5C" }}>
              {isBonus ? "Add as many phrases as you'd like." : "Your phrases will bring it to life."}
            </p>
          </div>

          {/* Puffling stage */}
          <div className="flex-1 relative flex items-end justify-center">
            {/* Floating phrase bubbles drifting toward puffling */}
            {phrases.map((p, i) => (
              <div
                key={i}
                className="absolute bubble-drift px-3 py-1.5 rounded-2xl font-display font-semibold text-sm shadow-md"
                style={{
                  background: "white",
                  color: "#1F4A5C",
                  bottom: 110 + i * 30,
                  left: i % 2 === 0 ? "8%" : "auto",
                  right: i % 2 === 1 ? "8%" : "auto",
                  ["--from-x"]: i % 2 === 0 ? "-30px" : "30px",
                  ["--from-y"]: "20px",
                  animationDelay: `${i * 0.9}s`,
                }}
              >
                {p}
              </div>
            ))}

            <div className="relative pop-in" style={{ marginBottom: 30 }}>
              <Puffling state={isBonus ? "happy" : "sleeping"} size={220} />
            </div>
          </div>

          {/* CTA */}
          <div className="slide-up" style={{ animationDelay: "300ms" }}>
            <PrimaryBtn onClick={onStart} pulse>
              {isBonus ? "LET'S GO →" : "START TRAINING"}
            </PrimaryBtn>
            {!isBonus && (
              <p className="text-center font-body text-xs mt-3" style={{ color: "#1F4A5C" }}>
                💤 Your Puffling is asleep — let's change that
              </p>
            )}
          </div>
        </div>
      </Sky>
    </div>
  );
};

/* ============================================================
   SCREEN 2 — TOPIC SELECT
   ============================================================ */
const TopicScreen = ({ topics, selected, setSelected, onContinue, isTopicUnlocked, phrasesNeededToUnlock, phrasesByTopic, isBonus = false, onBack = () => {} }) => (
  <div className="relative w-full h-full" style={{ background: "linear-gradient(180deg, #FFF8E8 0%, #FFF1D0 100%)" }}>
    <div className="relative h-full flex flex-col px-5 pt-4 pb-6">
      {/* Header bar with progress */}
      <div className="flex items-center gap-3 slide-up">
        <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold tactile" style={{ background: "white", color: "#1F4A5C", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>←</button>
        <div className="flex-1"><ProgressBar value={10} /></div>
      </div>

      {/* Title row with mini sleeping puffling */}
      <div className="flex items-center gap-3 mt-5 slide-up" style={{ animationDelay: "80ms" }}>
        <Puffling state={isBonus ? "happy" : "sleeping"} size={64} />
        <div>
          <h2 className="font-display font-bold text-2xl leading-tight" style={{ color: "#3D2A05" }}>Pick a topic</h2>
          <p className="font-body text-sm" style={{ color: "#7A5A20" }}>Build phrases from your real life</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 mt-5 stagger flex-1 overflow-y-auto no-scrollbar pb-2">
        {topics.map((t, i) => {
          const unlocked = isTopicUnlocked(t.id);
          const isSelected = unlocked && selected?.id === t.id;
          const lockInfo = !unlocked ? phrasesNeededToUnlock(t.id) : null;
          const isStartHere = t.id === "startHere";
          const startHereDone = phrasesByTopic.startHere || 0;

          return (
            <button
              key={t.id}
              onClick={() => unlocked && setSelected(t)}
              disabled={!unlocked}
              className="tactile slide-up text-left rounded-3xl p-4 relative"
              style={{
                ["--i"]: i,
                background: "white",
                border: isSelected
                  ? "3px solid #F5C81A"
                  : isStartHere && unlocked
                  ? "3px solid #5BC890"
                  : "3px solid transparent",
                boxShadow: isSelected
                  ? "0 8px 0 #D4A81F, 0 12px 24px rgba(245, 200, 26, 0.3)"
                  : isStartHere && unlocked
                  ? "0 6px 0 #4AA078, 0 10px 22px rgba(91, 200, 144, 0.28)"
                  : !unlocked
                  ? "0 3px 0 rgba(0,0,0,0.04), 0 4px 10px rgba(0,0,0,0.04)"
                  : "0 4px 0 rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.06)",
                transform: isSelected ? "translateY(-2px)" : undefined,
                transition: "transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 200ms",
                opacity: !unlocked ? 0.55 : 1,
                cursor: !unlocked ? "default" : "pointer",
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-2 relative"
                  style={{
                    background: t.color,
                    filter: !unlocked ? "grayscale(0.6)" : "none",
                  }}
                >
                  {t.emoji}
                  {!unlocked && (
                    <div
                      className="absolute -bottom-1 -right-1 rounded-full flex items-center justify-center"
                      style={{
                        width: 22, height: 22,
                        background: "white",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                        fontSize: 12,
                      }}
                    >
                      🔒
                    </div>
                  )}
                </div>

                {/* Start Here badge or selection check */}
                {isStartHere && unlocked && startHereDone < 50 && (
                  <div
                    className="px-2 py-0.5 rounded-full font-display font-bold"
                    style={{
                      background: "linear-gradient(180deg, #7BD8A8 0%, #5BC890 100%)",
                      color: "#073A2C",
                      fontSize: 8,
                      letterSpacing: "0.08em",
                      boxShadow: "0 2px 0 #4AA078",
                    }}
                  >
                    BEGIN
                  </div>
                )}
                {isSelected && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center pop-in" style={{ background: "#F5C81A", color: "#3D2A05", fontSize: 12, fontWeight: 800 }}>
                    ✓
                  </div>
                )}
              </div>

              <div
                className="font-display font-bold text-base"
                style={{ color: !unlocked ? "rgba(61, 42, 5, 0.55)" : "#3D2A05" }}
              >
                {t.label}
              </div>

              {/* Sub-text: progress for Start Here when unlocked, lock hint otherwise */}
              {isStartHere && unlocked && (
                <div className="mt-1.5">
                  <div
                    className="rounded-full overflow-hidden"
                    style={{ height: 4, background: "rgba(0,0,0,0.08)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, (startHereDone / 50) * 100)}%`,
                        background: "linear-gradient(90deg, #5BC890, #7BD8A8)",
                        transition: "width 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </div>
                  <div className="font-display font-semibold mt-1" style={{ fontSize: 9, color: "#0A4A38", letterSpacing: "0.04em" }}>
                    {startHereDone}/50 · 5 categories
                  </div>
                </div>
              )}
              {!unlocked && lockInfo && (
                <div
                  className="font-display font-semibold mt-1.5"
                  style={{ fontSize: 9, color: "rgba(61, 42, 5, 0.6)", letterSpacing: "0.04em", lineHeight: 1.3 }}
                >
                  {lockInfo.remaining} more in {lockInfo.prev.label}
                </div>
              )}
              {/* Phrase count for regular unlocked topics — shows training progress */}
              {!isStartHere && unlocked && (
                <div
                  className="font-display font-semibold mt-1"
                  style={{ fontSize: 10, color: "#7A5A20", letterSpacing: "0.02em" }}
                >
                  {(phrasesByTopic[t.id] || 0) === 0 ? (
                    <span style={{ color: "rgba(122, 90, 32, 0.7)" }}>0 phrases · new!</span>
                  ) : (
                    <>{phrasesByTopic[t.id]} {phrasesByTopic[t.id] === 1 ? "phrase" : "phrases"}</>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Continue */}
      <div className="mt-4">
        <PrimaryBtn onClick={onContinue} disabled={!selected}>
          {selected ? `LET'S GO →` : "PICK A TOPIC TO CONTINUE"}
        </PrimaryBtn>
      </div>
    </div>
  </div>
);

/* ============================================================
   SCREEN 2.5 — START HERE CATEGORY SELECT
   Shows the 5 starter categories. Sequential unlock — each
   completes 10 sentences before the next opens.
   ============================================================ */
const StartHereCategoryScreen = ({ categories, currentIdx, progressFn, totalDone, onPick, onBack }) => {
  return (
    <div className="relative w-full h-full" style={{ background: "linear-gradient(180deg, #E8F8EF 0%, #D0F0DD 100%)" }}>
      <div className="relative h-full flex flex-col px-5 pt-4 pb-6">
        {/* Header */}
        <div className="flex items-center gap-3 slide-up">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold tactile"
            style={{ background: "white", color: "#0A4A38", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            ←
          </button>
          <div className="flex-1">
            <div className="rounded-full overflow-hidden" style={{ height: 12, background: "rgba(0,0,0,0.08)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(totalDone / 50) * 100}%`,
                  background: "linear-gradient(90deg, #5BC890, #7BD8A8 50%, #5BC890)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2.6s linear infinite",
                  transition: "width 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 0 8px rgba(91, 200, 144, 0.4)",
                }}
              />
            </div>
          </div>
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full"
            style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <span className="font-display font-bold text-xs" style={{ color: "#0A4A38" }}>
              {totalDone}/50
            </span>
          </div>
        </div>

        {/* Title row */}
        <div className="flex items-center gap-3 mt-4 slide-up" style={{ animationDelay: "60ms" }}>
          <div
            className="rounded-2xl flex items-center justify-center"
            style={{
              width: 56, height: 56,
              background: "linear-gradient(180deg, #7BD8A8 0%, #5BC890 100%)",
              fontSize: 28,
              boxShadow: "0 4px 0 #4AA078",
            }}
          >
            🌱
          </div>
          <div>
            <div className="font-display font-semibold text-xs uppercase tracking-widest" style={{ color: "#0A4A38" }}>
              Start Here
            </div>
            <h2 className="font-display font-bold text-xl leading-tight" style={{ color: "#073A2C" }}>
              Your first phrases
            </h2>
            <p className="font-body text-xs mt-0.5" style={{ color: "#0A4A38" }}>
              Quick, useful, personalized
            </p>
          </div>
        </div>

        {/* Category list */}
        <div className="mt-4 flex flex-col gap-2.5 stagger flex-1 overflow-y-auto no-scrollbar pb-2">
          {categories.map((cat, idx) => {
            const prog = progressFn(idx);
            const isDone = prog.state === "done";
            const isCurrent = prog.state === "current";
            const isLocked = prog.state === "locked";

            return (
              <button
                key={cat.id}
                onClick={() => !isLocked && onPick(idx)}
                disabled={isLocked}
                className="tactile slide-up text-left rounded-3xl p-3.5 relative flex items-center gap-3"
                style={{
                  ["--i"]: idx,
                  background: "white",
                  border: isCurrent
                    ? "3px solid #5BC890"
                    : "3px solid transparent",
                  boxShadow: isCurrent
                    ? "0 6px 0 #4AA078, 0 10px 22px rgba(91, 200, 144, 0.3)"
                    : isLocked
                    ? "0 3px 0 rgba(0,0,0,0.04)"
                    : "0 4px 0 rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.06)",
                  opacity: isLocked ? 0.55 : 1,
                  cursor: isLocked ? "default" : "pointer",
                }}
              >
                {/* Icon */}
                <div
                  className="rounded-2xl flex items-center justify-center flex-shrink-0 relative"
                  style={{
                    width: 56, height: 56,
                    background: isDone
                      ? "linear-gradient(180deg, #7BD8A8 0%, #5BC890 100%)"
                      : isCurrent
                      ? "#E8F8EF"
                      : "rgba(0, 0, 0, 0.04)",
                    fontSize: 26,
                    filter: isLocked ? "grayscale(0.6)" : "none",
                  }}
                >
                  {isDone ? <span style={{ color: "white", fontSize: 28 }}>✓</span> : cat.emoji}
                  {isLocked && (
                    <div
                      className="absolute -bottom-1 -right-1 rounded-full flex items-center justify-center"
                      style={{
                        width: 22, height: 22,
                        background: "white",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                        fontSize: 12,
                      }}
                    >
                      🔒
                    </div>
                  )}
                </div>

                {/* Label + sub */}
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold uppercase" style={{ fontSize: 9, letterSpacing: "0.08em", color: isLocked ? "rgba(7, 58, 44, 0.5)" : isDone ? "#0A4A38" : "#7A5A20" }}>
                    {idx + 1} of 5
                  </div>
                  <div
                    className="font-display font-bold leading-tight"
                    style={{ fontSize: 15, color: isLocked ? "rgba(7, 58, 44, 0.55)" : "#073A2C" }}
                  >
                    {cat.label}
                  </div>
                  {/* Progress hint */}
                  {isCurrent && (
                    <div className="mt-1 flex items-center gap-1.5">
                      <div className="rounded-full overflow-hidden" style={{ height: 4, width: 80, background: "rgba(0,0,0,0.08)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(prog.count / 10) * 100}%`,
                            background: "linear-gradient(90deg, #5BC890, #7BD8A8)",
                          }}
                        />
                      </div>
                      <span className="font-display font-semibold" style={{ fontSize: 9, color: "#0A4A38" }}>
                        {prog.count}/10
                      </span>
                    </div>
                  )}
                  {isDone && (
                    <div className="font-display font-semibold mt-1" style={{ fontSize: 9, color: "#0A4A38" }}>
                      Complete · 10/10
                    </div>
                  )}
                </div>

                {/* Chevron / status */}
                <div className="flex-shrink-0">
                  {isCurrent && (
                    <div
                      className="px-2 py-1 rounded-full font-display font-bold"
                      style={{
                        background: "linear-gradient(180deg, #7BD8A8 0%, #5BC890 100%)",
                        color: "#073A2C",
                        fontSize: 9,
                        letterSpacing: "0.08em",
                        boxShadow: "0 2px 0 #4AA078",
                      }}
                    >
                      START →
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer note */}
        <div
          className="font-body text-center mt-2"
          style={{ fontSize: 11, color: "#0A4A38", opacity: 0.7 }}
        >
          Complete all 5 to unlock more topics
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SCREEN 2.6 — START HERE FILL-IN-THE-BLANK
   Minimal & snappy: sentence with a highlighted blank.
   User taps the blank, types one word, hits Next.
   ============================================================ */
const StartHereFillScreen = ({ category, qIdx, total, sentence, onNext, pufflingState, reps, onBack = () => {} }) => {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const [floatPlus, setFloatPlus] = useState(null);
  const [barSnap, setBarSnap] = useState(false);
  const [repsBumping, setRepsBumping] = useState(false);
  const [displayReps, setDisplayReps] = useState(reps);
  const inputRef = useRef(null);

  // Bump reps counter when reps prop changes
  useEffect(() => {
    if (reps === displayReps) return;
    setDisplayReps(reps);
    setRepsBumping(true);
    const t = setTimeout(() => setRepsBumping(false), 500);
    return () => clearTimeout(t);
  }, [reps]); // eslint-disable-line

  // Auto-focus input when sentence changes
  useEffect(() => {
    setText("");
    const t = setTimeout(() => inputRef.current?.focus(), 220);
    return () => clearTimeout(t);
  }, [qIdx]);

  // Split sentence around the blank ___
  const parts = sentence.split("___");
  const before = parts[0] || "";
  const after  = parts[1] || "";

  const progress = ((qIdx + (text.trim() ? 0.5 : 0)) / total) * 100;

  const handleNext = () => {
    if (!text.trim()) return;

    // +1 phrase floater (each filled sentence = 1 phrase added, not 2)
    setFloatPlus({ id: Date.now(), value: 1 });
    setTimeout(() => setFloatPlus(null), 1600);
    setBarSnap(true);
    setTimeout(() => setBarSnap(false), 600);

    setTimeout(() => {
      onNext(text.trim());
    }, 350);
  };

  return (
    <div className="relative w-full h-full" style={{ background: "linear-gradient(180deg, #E8F8EF 0%, #D0F0DD 100%)" }}>
      <div className="relative h-full flex flex-col px-5 pt-4 pb-5">
        {/* Header */}
        <div className="flex items-center gap-3 slide-up">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold tactile"
            style={{ background: "white", color: "#0A4A38", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            ←
          </button>
          <div className={`flex-1 rounded-full ${barSnap ? "bar-snap" : ""}`} style={{ borderRadius: 999 }}>
            <div className="rounded-full overflow-hidden" style={{ height: 12, background: "rgba(0,0,0,0.08)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #5BC890, #7BD8A8 50%, #5BC890)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2.6s linear infinite",
                  transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
          </div>
          <div className="relative">
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${repsBumping ? "reps-pulse" : ""}`}
              style={{
                background: repsBumping
                  ? "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)"
                  : "white",
                boxShadow: repsBumping
                  ? "0 2px 0 #D4A81F, 0 0 16px rgba(245, 200, 26, 0.6)"
                  : "0 2px 8px rgba(0,0,0,0.08)",
                transition: "background 350ms ease-out, box-shadow 350ms ease-out",
              }}
            >
              <span className="text-sm">⚡</span>
              <span className="font-display font-bold text-xs" style={{ color: "#3D2A05" }}>{reps}</span>
            </div>

            {floatPlus && (
              <div
                key={floatPlus.id}
                className="plus-float absolute pointer-events-none flex items-center gap-1 px-2.5 py-1 rounded-full whitespace-nowrap"
                style={{
                  right: 0,
                  top: "100%",
                  marginTop: 6,
                  background: "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)",
                  boxShadow: "0 3px 0 #D4A81F, 0 0 16px rgba(245, 200, 26, 0.7)",
                  zIndex: 50,
                }}
              >
                <span className="font-display font-bold" style={{ fontSize: 14, color: "#3D2A05", lineHeight: 1 }}>
                  +{floatPlus.value}
                </span>
                <span className="font-display font-bold" style={{ fontSize: 9, color: "#3D2A05", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {floatPlus.value === 1 ? "Phrase" : "Phrases"}
                </span>
                <span style={{ fontSize: 12 }}>📖</span>
              </div>
            )}
          </div>
        </div>

        {/* Topic + count + mini puffling */}
        <div className="flex items-center justify-between mt-4 slide-up" style={{ animationDelay: "60ms" }}>
          <div>
            <div className="font-display font-semibold text-xs uppercase tracking-widest" style={{ color: "#0A4A38" }}>
              Start Here · {category.label}
            </div>
            <div className="font-display font-bold text-base" style={{ color: "#073A2C" }}>
              Phrase {qIdx + 1} of {total}
            </div>
          </div>
          <Puffling state={pufflingState} size={60} />
        </div>

        {/* Sentence card with blank */}
        <div
          className="mt-5 p-5 rounded-3xl slide-up"
          style={{
            background: "white",
            boxShadow: "0 6px 0 rgba(0,0,0,0.05), 0 10px 24px rgba(0,0,0,0.06)",
            animationDelay: "120ms",
          }}
        >
          <div className="font-display font-semibold text-xs uppercase tracking-wider" style={{ color: "#0A4A38", marginBottom: 8 }}>
            Fill in the blank
          </div>

          <div
            className="font-display font-bold leading-snug flex flex-wrap items-baseline"
            style={{ fontSize: 22, color: "#073A2C", gap: 4 }}
          >
            <span>{before}</span>
            {/* The blank input */}
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => { if (e.key === "Enter") handleNext(); }}
              placeholder="___"
              className="font-display font-bold outline-none"
              style={{
                fontSize: 22,
                lineHeight: 1.2,
                minWidth: 80,
                width: `${Math.max(80, (text.length || 3) * 14 + 24)}px`,
                maxWidth: "100%",
                padding: "2px 12px",
                borderRadius: 12,
                background: text.trim()
                  ? "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)"
                  : focused
                  ? "rgba(245, 200, 26, 0.15)"
                  : "rgba(0, 0, 0, 0.05)",
                color: "#3D2A05",
                border: focused ? "2px solid #F5C81A" : "2px solid transparent",
                boxShadow: text.trim()
                  ? "0 2px 0 #D4A81F"
                  : focused
                  ? "0 0 0 3px rgba(245, 200, 26, 0.2)"
                  : "none",
                textAlign: "center",
                transition: "all 220ms cubic-bezier(0.32, 0.72, 0, 1)",
              }}
            />
            <span>{after}</span>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Bottom CTA */}
        <div
          className="mt-3"
          onMouseDown={(e) => e.preventDefault()}
          onPointerDown={(e) => e.preventDefault()}
        >
          <PrimaryBtn onClick={handleNext} disabled={!text.trim()}>
            {qIdx === total - 1 ? "WAKE UP YOUR PUFFLING 🎉" : "NEXT PHRASE"}
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SCREEN 3 — QUESTION (info-gathering OR phrase-building)
   - Typeable textarea (user can type freely)
   - Tappable chips append text to the input
   - No mic button
   - Phase changes header tag + accent color
   ============================================================ */
const QuestionScreen = ({
  phase, qIdx, total, question, placeholder, chips, onNext, topicLabel, pufflingState, reps, onBack = () => {},
}) => {
  const [text, setText] = useState("");
  const [glow, setGlow] = useState(false);
  const [focused, setFocused] = useState(false);
  const [flyingChip, setFlyingChip] = useState(null); // index of chip currently flying
  const [particles, setParticles] = useState([]); // list of particle bursts
  const [displayReps, setDisplayReps] = useState(reps);
  const [repsBumping, setRepsBumping] = useState(false);
  const [floatPlus, setFloatPlus] = useState(null); // {id, value} when +N floats up
  const [barSnap, setBarSnap] = useState(false);
  const inputRef = useRef(null);
  const repsRef = useRef(null);
  const ctaRef = useRef(null);

  const isInfo = phase === "info";

  // Progress: info phase fills the first 35%, phrase phase fills 35→90%
  const phaseStart = isInfo ? 5 : 40;
  const phaseSpan  = isInfo ? 30 : 50;
  const progress = phaseStart + ((qIdx + (text.trim() ? 0.5 : 0)) / total) * phaseSpan;

  // When the parent's `reps` prop changes (because the user just submitted),
  // bump the local counter with a satisfying pulse.
  useEffect(() => {
    if (reps === displayReps) return;
    setDisplayReps(reps);
    setRepsBumping(true);
    const t = setTimeout(() => setRepsBumping(false), 500);
    return () => clearTimeout(t);
  }, [reps]); // eslint-disable-line react-hooks/exhaustive-deps

  const addChip = (chip, chipIdx, e) => {
    const needsSpace = text.length > 0 && !text.endsWith(" ");
    const newText = text + (needsSpace ? " " : "") + chip + " ";
    setText(newText);
    setGlow(true);
    setTimeout(() => setGlow(false), 350);

    // Chip flash + scale animation
    setFlyingChip(chipIdx);
    setTimeout(() => setFlyingChip(null), 450);

    // Spawn 4 particles flying from the chip toward the textarea
    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const inputRect = inputRef.current?.getBoundingClientRect();
      if (inputRect) {
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        const endX = inputRect.left + inputRect.width / 2;
        const endY = inputRect.top + inputRect.height - 20;
        const newParticles = Array.from({ length: 4 }).map((_, i) => ({
          id: `${Date.now()}-${i}`,
          startX,
          startY,
          dx: endX - startX + (Math.random() - 0.5) * 30,
          dy: endY - startY + (Math.random() - 0.5) * 20,
          delay: i * 40,
        }));
        setParticles((p) => [...p, ...newParticles]);
        // Cleanup after animation
        setTimeout(() => {
          setParticles((p) => p.filter((px) => !newParticles.find((np) => np.id === px.id)));
        }, 900);
      }
    }

    if (inputRef.current) inputRef.current.focus();
  };

  const handleNext = () => {
    if (!text.trim()) return;

    // Reward effects only fire during the phrase-building phase.
    // The intro questions don't add phrases to the phrasebook, so no +N floater.
    if (!isInfo) {
      // Show "+2 phrases" floating up from the CTA toward the phrasebook
      // (every question saved = 2 phrases added: the question and the answer)
      setFloatPlus({ id: Date.now(), value: 2 });
      setTimeout(() => setFloatPlus(null), 1600);

      // Snap the progress bar
      setBarSnap(true);
      setTimeout(() => setBarSnap(false), 600);

      // Brief delay so the user sees the +2 float before the screen advances
      setTimeout(() => {
        onNext(text.trim());
        setText("");
      }, 350);
    } else {
      // Info phase: advance immediately, no fanfare
      onNext(text.trim());
      setText("");
    }
  };

  // Phase-specific styling
  const accentColor    = isInfo ? "#0E5C70" : "#A8852A";
  const accentBg       = isInfo ? "#A8E0F0" : "#FFE89A";
  const phaseTagText   = isInfo ? "QUICK INTRO" : "BUILD YOUR PHRASE";
  const phaseLabel     = isInfo ? `Question ${qIdx + 1} of ${total}` : `Phrase ${qIdx + 1} of ${total}`;
  const phaseIcon      = isInfo ? "👋" : "✨";
  const isLastInPhase  = qIdx === total - 1;
  const ctaText        = isInfo
    ? (isLastInPhase ? "ALL SET →" : "NEXT")
    : (isLastInPhase ? "WAKE UP YOUR PUFFLING 🎉" : "NEXT PHRASE");

  return (
    <div className="relative w-full h-full" style={{ background: isInfo ? "linear-gradient(180deg, #F0F9FC 0%, #E8F4F8 100%)" : "linear-gradient(180deg, #FFF8E8 0%, #FFF1D0 100%)" }}>
      <div className="relative h-full flex flex-col px-5 pt-4 pb-5">
        {/* Header */}
        <div className="flex items-center gap-3 slide-up">
          <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold tactile" style={{ background: "white", color: "#1F4A5C", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>←</button>
          <div className={`flex-1 rounded-full ${barSnap ? "bar-snap" : ""}`} style={{ borderRadius: 999 }}>
            <ProgressBar value={progress} />
          </div>
          {/* Reps pill — only shown during the phrase-building phase since
              the intro questions don't earn reps */}
          {!isInfo && (
            <div className="relative">
              <div
                ref={repsRef}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${repsBumping ? "reps-pulse" : ""}`}
                style={{
                  background: repsBumping
                    ? "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)"
                    : "white",
                  boxShadow: repsBumping
                    ? "0 2px 0 #D4A81F, 0 0 16px rgba(245, 200, 26, 0.6)"
                    : "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "background 350ms ease-out, box-shadow 350ms ease-out",
                }}
              >
                <span className="text-sm">⚡</span>
                <span className="font-display font-bold text-xs" style={{ color: "#3D2A05" }}>{reps}</span>
              </div>

              {/* Floating "+N PHRASES 📖" that pops out from the reps pill — anchors
                  the reward visually to the place where the count goes up */}
              {floatPlus && (
                <div
                  key={floatPlus.id}
                  className="plus-float absolute pointer-events-none flex items-center gap-1 px-2.5 py-1 rounded-full whitespace-nowrap"
                  style={{
                    right: 0,
                    top: "100%",
                    marginTop: 6,
                    background: "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)",
                    boxShadow: "0 3px 0 #D4A81F, 0 0 16px rgba(245, 200, 26, 0.7)",
                    zIndex: 50,
                  }}
                >
                  <span className="font-display font-bold" style={{
                    fontSize: 14,
                    color: "#3D2A05",
                    lineHeight: 1,
                  }}>
                    +{floatPlus.value}
                  </span>
                  <span className="font-display font-bold" style={{
                    fontSize: 9,
                    color: "#3D2A05",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>
                    Phrases
                  </span>
                  <span style={{ fontSize: 12 }}>📖</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Topic + question count + mini puffling */}
        <div className="flex items-center justify-between mt-4 slide-up" style={{ animationDelay: "60ms" }}>
          <div>
            <div className="flex items-center gap-2">
              <div className="font-display font-semibold text-xs uppercase tracking-widest" style={{ color: accentColor }}>
                {topicLabel} · {phaseTagText}
              </div>
            </div>
            <div className="font-display font-bold text-base" style={{ color: "#3D2A05" }}>{phaseLabel}</div>
          </div>
          <div className="relative">
            <Puffling state={pufflingState} size={60} />
          </div>
        </div>

        {/* Question card */}
        <div
          className="mt-4 p-4 rounded-3xl slide-up flex items-start gap-3"
          style={{ background: "white", boxShadow: "0 6px 0 rgba(0,0,0,0.05), 0 10px 24px rgba(0,0,0,0.06)" }}
        >
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: accentBg }}>{phaseIcon}</div>
          <div className="flex-1">
            <div className="font-display font-semibold text-xs uppercase tracking-wider" style={{ color: accentColor }}>
              {isInfo ? "Tell us about you" : "Answer in English"}
            </div>
            <div className="font-display font-bold text-lg mt-0.5 leading-tight" style={{ color: "#0A3A48" }}>{question}</div>
          </div>
        </div>

        {/* Typeable answer canvas */}
        <div className="mt-3 relative slide-up" style={{ animationDelay: "120ms", transition: "margin 280ms cubic-bezier(0.32, 0.72, 0, 1)" }}>
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            rows={3}
            className="w-full p-4 rounded-3xl resize-none font-display font-semibold text-base outline-none"
            style={{
              background: "linear-gradient(180deg, #FFFFFF 0%, #FAF7EE 100%)",
              border: (glow || focused) ? "2px solid #F5C81A" : "2px solid rgba(0,0,0,0.08)",
              color: "#3D2A05",
              minHeight: 110,
              boxShadow: glow
                ? "0 0 0 4px rgba(245, 200, 26, 0.25), 0 4px 14px rgba(245, 200, 26, 0.2)"
                : focused
                ? "0 0 0 3px rgba(245, 200, 26, 0.15), 0 4px 12px rgba(245, 200, 26, 0.1)"
                : "inset 0 2px 6px rgba(0,0,0,0.04)",
              transition: "border 200ms cubic-bezier(0.32, 0.72, 0, 1), box-shadow 280ms cubic-bezier(0.32, 0.72, 0, 1), transform 280ms cubic-bezier(0.32, 0.72, 0, 1)",
              transform: focused ? "scale(1.012)" : "scale(1)",
            }}
          />
          {text.length > 0 && (
            <button
              onClick={() => setText("")}
              className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center font-bold tactile pop-in"
              style={{ background: "rgba(0,0,0,0.06)", color: "#7A5A20", fontSize: 14 }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Chips — gracefully collapse when keyboard is open */}
        <div
          className="overflow-y-auto no-scrollbar"
          style={{
            flex: focused ? 0 : 1,
            maxHeight: focused ? 0 : 800,
            opacity: focused ? 0 : 1,
            marginTop: focused ? 0 : 16,
            transition: "max-height 280ms cubic-bezier(0.32, 0.72, 0, 1), opacity 220ms cubic-bezier(0.32, 0.72, 0, 1), margin-top 280ms cubic-bezier(0.32, 0.72, 0, 1), flex 280ms cubic-bezier(0.32, 0.72, 0, 1)",
            pointerEvents: focused ? "none" : "auto",
          }}
        >
          <div className="font-display font-semibold text-xs uppercase tracking-wider mb-2" style={{ color: accentColor }}>
            Tap to add · or just type
          </div>
          <div className="flex flex-wrap gap-2">
            {chips.map((chip, i) => {
              const isFlying = flyingChip === i;
              return (
                <button
                  key={`${qIdx}-${i}`}
                  onClick={(e) => addChip(chip, i, e)}
                  className={`tactile px-3.5 py-2 rounded-2xl font-display font-semibold text-base ${isFlying ? "chip-fly" : ""}`}
                  style={{
                    background: "white",
                    color: "#3D2A05",
                    boxShadow: "0 3px 0 rgba(0,0,0,0.08)",
                  }}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spacer that grows when chips collapse, so CTA stays at the bottom */}
        {focused && <div style={{ flex: 1 }} />}

        {/* Bottom CTA — onMouseDown preventDefault stops the textarea from
            blurring before the click registers, fixing the double-tap bug
            where keyboard dismiss reflows the button position */}
        <div
          ref={ctaRef}
          className="mt-3 relative"
          style={{ transition: "transform 280ms cubic-bezier(0.32, 0.72, 0, 1)" }}
          onMouseDown={(e) => e.preventDefault()}
          onPointerDown={(e) => e.preventDefault()}
        >
          <PrimaryBtn onClick={handleNext} disabled={!text.trim()}>
            {ctaText}
          </PrimaryBtn>
        </div>
      </div>

      {/* Particle layer (chip → input bursts) — fixed-positioned so
          getBoundingClientRect coords from the chip click line up perfectly */}
      <div className="pointer-events-none" style={{ position: "fixed", inset: 0, zIndex: 60 }}>
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle-arc absolute"
            style={{
              left: 0,
              top: 0,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)",
              boxShadow: "0 0 8px rgba(245, 200, 26, 0.8)",
              transform: `translate(${p.startX}px, ${p.startY}px)`,
              ["--dx"]: `${p.dx}px`,
              ["--dy"]: `${p.dy}px`,
              animationDelay: `${p.delay}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   DAILY PROGRESS DOTS — visualizes today's phrase quota
   Done dots are gold. Preview dots glow gold-outline when the
   user picks a session size, showing what they'll be at after.
   ============================================================ */
const DailyProgressDots = ({ done, goal, preview = 0 }) => {
  // Track preview overflow beyond the daily goal (overachiever territory)
  const totalPreview = done + preview;
  const overshoot = Math.max(0, totalPreview - goal);
  const dotsToRender = goal + overshoot;

  return (
    <div>
      <div className="flex justify-center gap-1.5" style={{ flexWrap: "wrap" }}>
        {Array.from({ length: dotsToRender }, (_, i) => {
          const isBonus   = i >= goal; // beyond the daily quota
          const isDone    = i < done;
          const isPreview = preview > 0 && i >= done && i < done + preview;
          return (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: isDone
                  ? "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)"
                  : isPreview
                  ? (isBonus ? "rgba(16, 185, 129, 0.18)" : "rgba(245, 200, 26, 0.18)")
                  : "rgba(0, 0, 0, 0.08)",
                border: isPreview
                  ? (isBonus ? "2px solid #10B981" : "2px solid #F5C81A")
                  : "none",
                boxShadow: isDone ? "0 1px 0 #D4A81F" : "none",
                transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: isPreview ? "scale(1.1)" : "scale(1)",
              }}
            />
          );
        })}
      </div>
      <div className="text-center font-display font-bold mt-2" style={{ fontSize: 11, color: "#0E5C70", letterSpacing: "0.04em" }}>
        {preview > 0 ? (
          overshoot > 0 ? (
            <>
              <span style={{ color: "#A8852A" }}>{goal}/{goal}</span>
              <span style={{ color: "#0E9E73", marginLeft: 6 }}>+{overshoot} bonus 🔥</span>
            </>
          ) : (
            <>
              <span style={{ color: "#A8852A" }}>{totalPreview}/{goal}</span> after this session
            </>
          )
        ) : (
          <>
            <span style={{ color: "#0A3A48" }}>{done}/{goal}</span> phrases today · {goal - done} to go
          </>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   SMART TILE PICKER
   3 adaptive preset tiles (Quick / Standard / Finish today) that
   scale by `remaining`. A 4th compact "Custom" tile reveals an
   inline +/- stepper for any exact number 1...remaining.
   Logic for presets:
   - if remaining <= 3   → 1 / max(remaining-1,1) / remaining
   - if remaining <= 10  → ceil(r/4), ceil(r/2), r
   - if remaining > 10   → 5, ceil(r/2), r  (rounded sensibly)
   Always dedupe so tiles never repeat.
   ============================================================ */
const SmartTilePicker = ({ remaining, value, onChange }) => {
  const [customOpen, setCustomOpen] = useState(false);
  const [customValue, setCustomValue] = useState(null);

  // Generate 2 smaller presets + the "all" tile
  const buildPresets = (r) => {
    if (r <= 1) return [r];
    if (r <= 3) return Array.from({ length: r }, (_, i) => i + 1);
    if (r <= 10) {
      const small = Math.max(1, Math.ceil(r / 4));
      const mid   = Math.max(small + 1, Math.ceil(r / 2));
      return [small, mid, r];
    }
    // r > 10: nicer round numbers
    const small = 5;
    const mid   = Math.round(r / 2 / 5) * 5 || Math.ceil(r / 2);
    return [small, mid, r];
  };

  // Dedupe + sort + clamp
  const presets = Array.from(new Set(buildPresets(remaining)))
    .filter((n) => n >= 1 && n <= remaining)
    .sort((a, b) => a - b);

  // If selected value is one of the presets, custom stays closed.
  // If user picks a custom value, that tile gets the highlight.
  const valueIsPreset = presets.includes(value);
  const customTileShowsValue = customOpen || (value && !valueIsPreset);

  const presetSubLabel = (n, isMax) => {
    if (isMax) return "FINISH TODAY";
    if (n <= 2) return "QUICK";
    if (n <= 5) return "A FEW";
    return "MORE";
  };

  return (
    <div className="mt-3 relative">
      <div className="font-display font-bold text-center mb-2" style={{ fontSize: 11, color: "#A8852A", letterSpacing: "0.1em" }}>
        HOW MANY THIS SESSION?
      </div>

      {/* 4-column grid: 3 preset tiles + 1 custom tile */}
      <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr 1fr 0.8fr" }}>
        {presets.map((n) => {
          const isMax = n === remaining;
          const selected = value === n && !customOpen;
          return (
            <div key={n} className="relative">
              {isMax && (
                <div
                  className="absolute"
                  style={{
                    top: -10,
                    right: -4,
                    fontSize: 18,
                    filter: "drop-shadow(0 1px 2px rgba(212, 160, 23, 0.5))",
                    zIndex: 2,
                    animation: "huff 2s ease-in-out infinite",
                  }}
                >
                  🏆
                </div>
              )}
              <button
                onClick={() => {
                  setCustomOpen(false);
                  onChange(n);
                }}
                className="tactile w-full rounded-2xl flex flex-col items-center justify-center"
                style={{
                  height: 72,
                  background: selected
                    ? "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)"
                    : "white",
                  boxShadow: selected
                    ? "0 4px 0 #D4A81F, 0 8px 16px rgba(245, 200, 26, 0.3)"
                    : isMax
                    ? "0 3px 0 #D4A81F, inset 0 0 0 1px rgba(245, 200, 26, 0.4)"
                    : "0 3px 0 rgba(0,0,0,0.08)",
                  transform: selected ? "translateY(-2px)" : undefined,
                  transition: "all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <span
                  className="font-display font-bold"
                  style={{ fontSize: 26, color: "#3D2A05", lineHeight: 1 }}
                >
                  {n}
                </span>
                <span
                  className="font-display font-semibold mt-1"
                  style={{
                    fontSize: 8,
                    color: isMax ? "#A8852A" : "#7A5A20",
                    letterSpacing: "0.06em",
                  }}
                >
                  {presetSubLabel(n, isMax)}
                </span>
              </button>
            </div>
          );
        })}

        {/* Custom tile */}
        <button
          onClick={() => {
            const next = !customOpen;
            setCustomOpen(next);
            if (next) {
              // Seed with current value if non-preset, else suggest a starting point
              const seed = !valueIsPreset && value ? value : Math.min(remaining, presets[0] || 1);
              setCustomValue(seed);
              onChange(seed);
            }
          }}
          className="tactile w-full rounded-2xl flex flex-col items-center justify-center"
          style={{
            height: 72,
            background: customTileShowsValue
              ? "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)"
              : "white",
            boxShadow: customTileShowsValue
              ? "0 4px 0 #D4A81F, 0 8px 16px rgba(245, 200, 26, 0.3)"
              : "0 3px 0 rgba(0,0,0,0.08)",
            transform: customTileShowsValue ? "translateY(-2px)" : undefined,
            transition: "all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {customOpen || (value && !valueIsPreset) ? (
            <span
              className="font-display font-bold"
              style={{ fontSize: 22, color: "#3D2A05", lineHeight: 1 }}
            >
              {value}
            </span>
          ) : (
            <span style={{ fontSize: 22, lineHeight: 1 }}>✏️</span>
          )}
          <span
            className="font-display font-semibold mt-1"
            style={{ fontSize: 8, color: "#7A5A20", letterSpacing: "0.06em" }}
          >
            CUSTOM
          </span>
        </button>
      </div>

      {/* Inline stepper, only when custom is open */}
      {customOpen && (
        <div
          className="mt-3 pop-in rounded-3xl p-3 flex items-center justify-between relative overflow-hidden"
          style={{
            background: value > remaining
              ? "linear-gradient(180deg, #FFFAE8 0%, #FFF1C8 100%)"
              : "white",
            boxShadow: value > remaining
              ? "0 4px 0 #D4A81F, 0 6px 16px rgba(245, 200, 26, 0.25)"
              : "0 4px 0 rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.08)",
            border: "2px solid #F5C81A",
            transition: "background 250ms, box-shadow 250ms",
          }}
        >
          {/* Overachiever sparkle accent */}
          {value > remaining && (
            <div
              className="absolute sparkle"
              style={{ top: 4, right: 8, fontSize: 14, color: "#F5C81A" }}
            >
              ✦
            </div>
          )}

          {/* Minus */}
          <button
            onClick={() => {
              const next = Math.max(1, (value || 1) - 1);
              onChange(next);
              setCustomValue(next);
            }}
            disabled={(value || 1) <= 1}
            className="tactile rounded-full flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              background: (value || 1) <= 1 ? "rgba(0,0,0,0.06)" : "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)",
              color: (value || 1) <= 1 ? "rgba(0,0,0,0.25)" : "#3D2A05",
              boxShadow: (value || 1) <= 1 ? "none" : "0 3px 0 #D4A81F",
              fontSize: 24,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            −
          </button>

          {/* Big number */}
          <div className="flex flex-col items-center" style={{ minWidth: 110 }}>
            <span
              key={value}
              className="font-display font-bold pop-in"
              style={{ fontSize: 38, color: "#3D2A05", lineHeight: 1 }}
            >
              {value}
              {value > remaining && (
                <span style={{ fontSize: 22, marginLeft: 4 }}>🔥</span>
              )}
            </span>
            <span
              className="font-display font-semibold mt-0.5"
              style={{ fontSize: 9, color: value > remaining ? "#A8852A" : "#7A5A20", letterSpacing: "0.06em" }}
            >
              {value > remaining
                ? `+${value - remaining} BEYOND TODAY`
                : value === remaining
                ? "🏆 FINISHES TODAY"
                : value === 1 ? "PHRASE" : "PHRASES"}
            </span>
          </div>

          {/* Plus — no cap! */}
          <button
            onClick={() => {
              const next = (value || 0) + 1;
              onChange(next);
              setCustomValue(next);
            }}
            className="tactile rounded-full flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              background: "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)",
              color: "#3D2A05",
              boxShadow: "0 3px 0 #D4A81F",
              fontSize: 24,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            +
          </button>
        </div>
      )}

      <div className="text-center font-display font-semibold mt-2" style={{ fontSize: 9, color: "#7A5A20", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        🏆 finishes today's goal
      </div>
    </div>
  );
};

/* ============================================================
   SCREEN 3.5 — TRANSITION between info & phrase phases
   Loading: "Cooking up your questions..."
   Ready:   "Let's go." + daily progress + flexible session picker
   ============================================================ */
const TransitionScreen = ({ topicLabel, dailyDone, dailyGoal, onContinue }) => {
  const [ready, setReady] = useState(false);
  const [pick, setPick] = useState(null);
  const remaining = Math.max(0, dailyGoal - dailyDone);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full">
      <Sky variant="calm">
        {/* Sparkles */}
        <div className="absolute sparkle text-yellow-200 text-2xl" style={{ top: "12%", left: "12%" }}>✦</div>
        <div className="absolute sparkle text-white       text-xl" style={{ top: "16%", right: "14%", animationDelay: "0.6s" }}>✦</div>
        <div className="absolute sparkle text-yellow-300  text-2xl" style={{ top: "26%", left: "78%", animationDelay: "1.2s" }}>✦</div>

        <div className="relative h-full flex flex-col px-5 pt-5 pb-5">
          {/* Status badge */}
          <div className="text-center slide-up">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-display font-bold" style={{ fontSize: 10, background: "rgba(255,255,255,0.7)", color: "#0E5C70", letterSpacing: "0.1em", backdropFilter: "blur(8px)" }}>
              ✓ INTRO COMPLETE
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mt-3 slide-up" style={{ animationDelay: "100ms", minHeight: 80 }}>
            {ready ? (
              <h1 key="ready" className="font-display font-bold pop-in" style={{ fontSize: 42, color: "#0A3A48", lineHeight: 1, textShadow: "0 2px 0 rgba(255,255,255,0.4)" }}>
                Let's go.
              </h1>
            ) : (
              <h1 key="loading" className="font-display font-bold" style={{ fontSize: 26, color: "#0A3A48", lineHeight: 1.1, textShadow: "0 2px 0 rgba(255,255,255,0.4)" }}>
                Cooking up your<br />questions<LoadingDots />
              </h1>
            )}
          </div>

          {/* Puffling */}
          <div className="flex items-center justify-center relative" style={{ minHeight: 150 }}>
            <div className="absolute" style={{ top: 0, left: "12%", animation: "drift 5s ease-in-out infinite" }}>
              <div style={{ fontSize: 26, transform: "rotate(-12deg)" }}>📖</div>
            </div>
            <div className="absolute" style={{ top: 8, right: "12%", animation: "drift 6.5s ease-in-out infinite reverse" }}>
              <div style={{ fontSize: 26, transform: "rotate(12deg)" }}>📚</div>
            </div>
            <div className="pop-in">
              <Puffling state="sleeping" size={120} />
            </div>
          </div>

          {/* Body / picker */}
          {ready ? (
            <div className="slide-up" style={{ animationDelay: "200ms" }}>
              <p className="text-center font-body font-semibold text-sm leading-snug px-2" style={{ color: "#0A3A48" }}>
                Answer questions about your real life.<br />
                <span style={{ color: "#0E5C70", fontWeight: 800 }}>Each answer becomes a phrase you'll keep.</span>
              </p>

              {/* Daily progress */}
              <div className="mt-3 px-2">
                <DailyProgressDots done={dailyDone} goal={dailyGoal} preview={pick || 0} />
              </div>

              {/* Smart tiles: 3 adaptive presets + Custom inline stepper */}
              <SmartTilePicker
                remaining={remaining}
                value={pick}
                onChange={setPick}
              />
            </div>
          ) : (
            <div className="text-center slide-up" style={{ animationDelay: "200ms", minHeight: 60 }}>
              <p className="font-body font-semibold text-sm" style={{ color: "#1F4A5C", opacity: 0.8 }}>
                personalizing every question
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-3">
            <PrimaryBtn onClick={() => onContinue(pick)} disabled={!ready || !pick} pulse={!!pick}>
              {!ready
                ? "ONE SEC..."
                : !pick
                ? "TAP A NUMBER"
                : pick > remaining
                ? `LET'S DO ${pick} 🔥 →`
                : pick === remaining
                ? `FINISH TODAY (${pick}) →`
                : `LET'S DO ${pick} →`}
            </PrimaryBtn>
          </div>
        </div>
      </Sky>
    </div>
  );
};

const LoadingDots = () => (
  <span style={{ display: "inline-block" }}>
    <span style={{ animation: "zFloat 1.4s ease-in-out infinite" }}>.</span>
    <span style={{ animation: "zFloat 1.4s ease-in-out infinite", animationDelay: "0.2s" }}>.</span>
    <span style={{ animation: "zFloat 1.4s ease-in-out infinite", animationDelay: "0.4s" }}>.</span>
  </span>
);

/* ============================================================
   MOOD LADDER — visualizes the 5-state Puffling journey
   This is the addictive hook: see the goal (🤩 thrilled),
   know exactly where you are, want to fill the bar.
   ============================================================ */
const MoodLadder = ({ currentStep = 0 }) => {
  // Animate the fill from 0 → currentStep so the gold visibly flows in on mount
  const [animStep, setAnimStep] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimStep(currentStep), 350);
    return () => clearTimeout(t);
  }, [currentStep]);

  // Step index = number of modules completed (1 after Phrases, etc.)
  const steps = [
    { emoji: "😤", label: "Grumpy",   module: "Phrases" },
    { emoji: "😢", label: "Sad",      module: "5K List" },
    { emoji: "😐", label: "Chill",    module: "Pronunciation" },
    { emoji: "😊", label: "Happy",    module: "Shadowing" },
    { emoji: "🤩", label: "Thrilled", module: "Recall" },
  ];

  return (
    <div className="px-1">
      <div className="flex items-end justify-between relative" style={{ marginBottom: 6 }}>
        {steps.map((s, i) => {
          const isPast    = i < currentStep - 1;
          const isCurrent = i === currentStep - 1;
          const isFuture  = i > currentStep - 1;

          return (
            <div key={i} className="flex flex-col items-center" style={{ flex: 1, position: "relative", zIndex: 2 }}>
              {isCurrent && (
                <div
                  className="font-display font-bold pop-in"
                  style={{ fontSize: 10, color: "#073A2C", marginBottom: 4, letterSpacing: "0.05em" }}
                >
                  YOU ARE HERE
                </div>
              )}
              <div
                className={`flex items-center justify-center rounded-full ${isCurrent ? "pop-in" : ""}`}
                style={{
                  width:  isCurrent ? 46 : 32,
                  height: isCurrent ? 46 : 32,
                  fontSize: isCurrent ? 26 : 16,
                  background: isCurrent
                    ? "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)"
                    : isPast
                    ? "white"
                    : "rgba(255,255,255,0.55)",
                  boxShadow: isCurrent
                    ? "0 4px 0 #D4A81F, 0 0 22px rgba(245, 200, 26, 0.55)"
                    : isPast
                    ? "0 3px 0 rgba(0,0,0,0.1)"
                    : "0 2px 0 rgba(0,0,0,0.06)",
                  opacity: isFuture ? 0.65 : 1,
                  filter: isFuture ? "saturate(0.5)" : "none",
                  transition: "all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <span style={{ filter: isPast ? "grayscale(0.3)" : "none" }}>{s.emoji}</span>
              </div>
              <div
                className="font-display font-semibold mt-1.5 text-center"
                style={{
                  fontSize: 9,
                  color: isCurrent ? "#073A2C" : isPast ? "#0A4A38" : "rgba(7, 58, 44, 0.55)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
        {/* Connecting line behind dots — empty track */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: 30,
            height: 4,
            background: "rgba(255,255,255,0.55)",
            zIndex: 1,
            borderRadius: 999,
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.06)",
          }}
        />
        {/* Gold fill — extends from the LEFT EDGE to the CENTER of the current step */}
        <div
          className="absolute"
          style={{
            top: 28,
            left: 0,
            height: 8,
            width: `${Math.max(0, ((animStep - 1) + 0.5)) * (100 / steps.length)}%`,
            background: "linear-gradient(90deg, #F5C81A 0%, #FFD83A 50%, #F5C81A 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2.6s linear infinite",
            zIndex: 1,
            borderRadius: 999,
            boxShadow: "0 2px 0 #D4A81F, 0 0 12px rgba(245, 200, 26, 0.55)",
            transition: "width 1100ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        {/* Pulsing dot at the leading edge of the fill — at the center of current emoji */}
        {animStep > 0 && animStep <= steps.length && (
          <div
            className="absolute"
            style={{
              top: 24,
              left: `calc(${((animStep - 1) + 0.5) * (100 / steps.length)}% - 8px)`,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "radial-gradient(circle, #FFFFFF 0%, #FFE89A 50%, transparent 80%)",
              zIndex: 1,
              animation: "auraGlow 1.8s ease-in-out infinite",
              pointerEvents: "none",
              transition: "left 1100ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
        )}
      </div>
    </div>
  );
};

/* ============================================================
   SCREEN 4 — FINISH
   Two distinct states based on daily quota:
   - MODULE COMPLETE  → full wake-up celebration, mood ladder, "feed it words"
   - SESSION COMPLETE → calmer ack, daily progress, "do more or come back later"
   ============================================================ */
const FinishScreen = ({ pufflingState, reps, sessionDone, dailyDone, dailyGoal, onContinue, onDoMore, onHome }) => {
  const [showReps, setShowReps] = useState(false);
  const [stage, setStage] = useState("celebrate"); // celebrate | journey
  const [celebState, setCelebState] = useState("triumph"); // triumph → grumpy
  const [displayReps, setDisplayReps] = useState(0); // animated count-up
  const isModuleComplete = dailyDone >= dailyGoal;
  const remaining = Math.max(0, dailyGoal - dailyDone);

  useEffect(() => {
    const t = setTimeout(() => setShowReps(true), isModuleComplete ? 1900 : 800);
    return () => clearTimeout(t);
  }, [isModuleComplete]);

  // Choreograph the celebration: triumph pose → settle into grumpy
  useEffect(() => {
    if (!isModuleComplete || stage !== "celebrate") return;
    const t = setTimeout(() => setCelebState("grumpy"), 1500);
    return () => clearTimeout(t);
  }, [isModuleComplete, stage]);

  // Count-up reps animation — starts shortly after the page lands
  useEffect(() => {
    if (!isModuleComplete || stage !== "celebrate") return;
    setDisplayReps(0);
    const startDelay = setTimeout(() => {
      const duration = 1400; // ms
      const steps = Math.min(reps, 30); // cap step count for visual smoothness
      const stepTime = duration / steps;
      let current = 0;
      const tick = () => {
        current += 1;
        const next = Math.round((current / steps) * reps);
        setDisplayReps(next);
        if (current < steps) setTimeout(tick, stepTime);
      };
      tick();
    }, 500);
    return () => clearTimeout(startDelay);
  }, [isModuleComplete, stage, reps]);

  // ============================================
  // STATE A: MODULE COMPLETE — two stages
  // Stage 1 (celebrate): pure dopamine — choreographed Puffling + hero reps
  // Stage 2 (journey):   mood ladder + decision
  // ============================================
  if (isModuleComplete && stage === "celebrate") {
    return (
      <div className="relative w-full h-full">
        <Sky variant="victory">
          {/* Ambient layers — depth and motion */}
          <ConfettiLoop />
          <Confetti />

          {/* Sparkles */}
          <div className="absolute sparkle text-yellow-300 text-3xl" style={{ top: "8%",  left: "12%" }}>✦</div>
          <div className="absolute sparkle text-white       text-2xl" style={{ top: "12%", right: "14%", animationDelay: "0.6s" }}>✦</div>
          <div className="absolute sparkle text-yellow-200  text-xl"  style={{ top: "22%", left: "22%", animationDelay: "1.2s" }}>✦</div>
          <div className="absolute sparkle text-white       text-base" style={{ top: "28%", right: "20%", animationDelay: "1.8s" }}>✦</div>

          <div className="relative h-full flex flex-col px-6 pt-5 pb-5">
            {/* Title */}
            <div className="text-center slide-up">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-display font-bold" style={{ fontSize: 10, background: "rgba(255,255,255,0.7)", color: "#0A4A38", letterSpacing: "0.1em", backdropFilter: "blur(8px)" }}>
                {dailyDone > dailyGoal ? (
                  <><span>🔥</span> CRUSHED IT · {dailyDone}/{dailyGoal} (+{dailyDone - dailyGoal})</>
                ) : (
                  <><span>✓</span> DAILY GOAL COMPLETE · {dailyDone}/{dailyGoal}</>
                )}
              </div>
              <h1 className="font-display font-bold mt-2" style={{ fontSize: 34, color: "#073A2C", lineHeight: 1, textShadow: "0 2px 0 rgba(255,255,255,0.4)" }}>
                Your Phrases<br />Woke It Up!
              </h1>
            </div>

            {/* Puffling stage with rotating sun rays */}
            <div className="flex-1 flex items-center justify-center relative" style={{ minHeight: 240 }}>
              <StageRays />
              <div key={celebState} className="relative" style={{ zIndex: 2 }}>
                <Puffling state={celebState} size={210} />
              </div>
            </div>

            {/* HERO REPS COUNTER — the dopamine number */}
            <div className="flex justify-center pop-in" style={{ animationDelay: "200ms" }}>
              <div
                className="aura-glow flex items-center gap-2 px-6 py-3 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)",
                  border: "3px solid #FFFFFF",
                }}
              >
                <span style={{ fontSize: 28 }}>⚡</span>
                <span
                  key={displayReps}
                  className="font-display font-bold count-tick"
                  style={{ color: "#3D2A05", fontSize: 38, lineHeight: 1, letterSpacing: "-0.02em" }}
                >
                  +{displayReps}
                </span>
                <span className="font-display font-bold" style={{ color: "#7A5A20", fontSize: 12, letterSpacing: "0.1em", marginLeft: 2 }}>
                  PHRASES
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-4 slide-up" style={{ animationDelay: "400ms" }}>
              <PrimaryBtn onClick={() => setStage("journey")} pulse>
                NICE → SEE WHAT'S NEXT
              </PrimaryBtn>
            </div>
          </div>
        </Sky>
      </div>
    );
  }

  // Stage 2: journey + decision
  if (isModuleComplete && stage === "journey") {
    return (
      <div className="relative w-full h-full">
        <Sky variant="victory">
          <div className="relative h-full flex flex-col px-5 pt-5 pb-5">
            {/* Compact title — celebration is done, this is the next-step moment */}
            <div className="text-center slide-up">
              <div className="font-display font-semibold text-xs uppercase tracking-widest" style={{ color: "#0A4A38" }}>
                Module 1 of 5 · Done
              </div>
              <h2 className="font-display font-bold mt-1.5" style={{ fontSize: 26, color: "#073A2C", lineHeight: 1.05, textShadow: "0 2px 0 rgba(255,255,255,0.4)" }}>
                Your Puffling's<br />journey today
              </h2>
            </div>

            {/* Smaller grumpy Puffling — context, not centerpiece */}
            <div className="flex items-center justify-center my-3 slide-up" style={{ animationDelay: "100ms" }}>
              <Puffling state="grumpy" size={130} />
            </div>

            {/* Mood ladder — now the focal point of the page */}
            <div className="slide-up" style={{ animationDelay: "200ms" }}>
              <MoodLadder currentStep={1} />
            </div>

            {/* Concise narrative */}
            <p
              className="font-body font-semibold text-center mt-5 text-base leading-snug px-2 slide-up"
              style={{ color: "#073A2C", animationDelay: "300ms" }}
            >
              <span style={{ color: "#0A4A38", fontWeight: 800 }}>It's hungry.</span>{" "}
              Feed it words to make it feel better.
            </p>

            <div style={{ flex: 1 }} />

            {/* Decision */}
            <div className="slide-up" style={{ animationDelay: "400ms" }}>
              <PrimaryBtn onClick={onContinue} pulse>
                FEED IT WORDS →
              </PrimaryBtn>
              <p className="text-center font-body font-semibold text-xs mt-5" style={{ color: "#0A4A38" }}>
                Module 2 · The 5K List · ~2 min
              </p>
              <button
                onClick={onHome}
                className="tactile w-full mt-1 py-2 font-display font-semibold text-sm"
                style={{ color: "#0A4A38", background: "transparent", opacity: 0.75 }}
              >
                Back to home
              </button>
            </div>
          </div>
        </Sky>
      </div>
    );
  }

  // ============================================
  // STATE B: SESSION COMPLETE (more to do today)
  // The Puffling is STILL ASLEEP — only the full daily quota wakes it.
  // The screen's job: reward the session, dangle the wake-up.
  // ============================================
  return (
    <div className="relative w-full h-full">
      <Sky variant="calm">
        {/* A few subtle sparkles, no confetti */}
        <div className="absolute sparkle text-yellow-200 text-xl" style={{ top: "10%", left: "14%" }}>✦</div>
        <div className="absolute sparkle text-white       text-base" style={{ top: "16%", right: "16%", animationDelay: "0.8s" }}>✦</div>

        <div className="relative h-full flex flex-col px-5 pt-5 pb-5">
          {/* Title */}
          <div className="text-center slide-up">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-display font-bold" style={{ fontSize: 10, background: "rgba(255,255,255,0.7)", color: "#0E5C70", letterSpacing: "0.1em", backdropFilter: "blur(8px)" }}>
              <span>✓</span> SESSION DONE · +{sessionDone} PHRASES
            </div>
            <h1 className="font-display font-bold mt-2" style={{ fontSize: 32, color: "#0A3A48", lineHeight: 1, textShadow: "0 2px 0 rgba(255,255,255,0.4)" }}>
              Solid work.
            </h1>
            <p className="font-body font-semibold mt-1.5 text-base" style={{ color: "#1F4A5C" }}>
              Your Puffling's still snoozing 💤
            </p>
          </div>

          {/* Puffling — clearly still asleep with Z's */}
          <div className="flex-1 flex items-center justify-center relative">
            <div key={pufflingState} className="pop-in">
              <Puffling state="sleeping" size={170} />
            </div>
            {showReps && (
              <div
                className="absolute reps-bounce flex items-center gap-1.5 px-3.5 py-1.5 rounded-full"
                style={{
                  top: "12%",
                  right: "10%",
                  background: "linear-gradient(180deg, #FFE89A 0%, #F5C81A 100%)",
                  boxShadow: "0 4px 0 #D4A81F, 0 6px 16px rgba(245, 200, 26, 0.4)",
                }}
              >
                <span className="text-base">⚡</span>
                <span className="font-display font-bold" style={{ color: "#3D2A05", fontSize: 16 }}>+{reps}</span>
              </div>
            )}
          </div>

          {/* Wake-up open-loop card */}
          <div
            className="rounded-3xl p-4 slide-up relative overflow-hidden"
            style={{
              background: "white",
              boxShadow: "0 8px 0 rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.12)",
              animationDelay: "200ms",
            }}
          >
            {/* Subtle radial glow behind the number to make it pop */}
            <div
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 160,
                height: 160,
                background: "radial-gradient(circle, rgba(245, 200, 26, 0.18) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div className="font-display font-bold text-center" style={{ fontSize: 11, color: "#0E5C70", letterSpacing: "0.1em", marginBottom: 8 }}>
              TO WAKE YOUR PUFFLING
            </div>

            <DailyProgressDots done={dailyDone} goal={dailyGoal} />

            <div className="mt-3 text-center relative">
              <div className="font-display font-bold leading-none" style={{ fontSize: 38, color: "#3D2A05" }}>
                <span style={{
                  background: "linear-gradient(180deg, #FFD83A 0%, #F5C81A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {remaining} more
                </span>
              </div>
              <div className="font-display font-bold uppercase mt-0.5" style={{ fontSize: 11, color: "#7A5A20", letterSpacing: "0.12em" }}>
                {remaining === 1 ? "phrase" : "phrases"} to go
              </div>
              <p className="font-body font-semibold mt-2 text-sm" style={{ color: "#3D2A05" }}>
                Then it wakes up. ✨
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-3 slide-up" style={{ animationDelay: "400ms" }}>
            <PrimaryBtn onClick={onDoMore} pulse>
              KEEP GOING →
            </PrimaryBtn>
            <button
              onClick={onContinue}
              className="tactile w-full mt-2 py-2 font-display font-semibold text-sm"
              style={{ color: "#1F4A5C", background: "transparent", opacity: 0.75 }}
            >
              Back to home
            </button>
          </div>
        </div>
      </Sky>
    </div>
  );
};
