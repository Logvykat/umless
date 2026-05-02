'use client';

import dynamic from 'next/dynamic';
import { cn } from "@/lib/utils";

interface DotPatternProps {
  className?: string;
  fadeBottom?: boolean;
  animated?: boolean;
  style?: React.CSSProperties;
  variant?: 'light' | 'dark';
}

// — Static version —————————————————————————————————————————————————————————

function DotPatternStatic({ className, fadeBottom = false, style, variant = 'light' }: DotPatternProps) {
  const fill = variant === 'dark'
    ? 'var(--dot-pattern-dark-bg)'
    : 'var(--dot-pattern-light-bg)';

  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        top: '-12px',
        ...(fadeBottom ? {
          maskImage: "linear-gradient(to bottom, black 30%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 85%)",
        } : {}),
        ...style,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern
          id="dot-pattern-static"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect
            width="4"
            height="4"
            x="10"
            y="10"
            fill={fill}
            transform="rotate(45 12 12)"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dot-pattern-static)" />
      </svg>
    </div>
  );
}

// — Animated version (client-only, no SSR) ————————————————————————————————

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const DOTS_CACHE = Array.from({ length: 200 }, (_, i) => {
  const seed = i * 9973;
  const speedMultiplier = 0.5;
  return {
    col: i % 20,
    row: Math.floor(i / 20),
    dur: ((1.7 + pseudoRandom(seed + 100) * 3) * speedMultiplier).toFixed(15),
    begin: ((-pseudoRandom(seed + 200) * 6) * speedMultiplier).toFixed(15),
    a: (0.1 + pseudoRandom(seed + 1) * 0.2).toFixed(15),
    b: (0.05 + pseudoRandom(seed + 2) * 0.3).toFixed(15),
    c: (0.4 + pseudoRandom(seed + 3) * 0.5).toFixed(15),
    d: (0.1 + pseudoRandom(seed + 4) * 0.25).toFixed(15),
  };
});

function DotPatternAnimatedInner({ className, fadeBottom = false, style, variant = 'light' }: DotPatternProps) {
  const fill = variant === 'dark'
    ? 'var(--dot-pattern-dark-bg)'
    : 'var(--dot-pattern-light-bg)';

  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        top: '-12px',
        ...(fadeBottom ? {
          maskImage: "linear-gradient(to bottom, black 30%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 85%)",
        } : {}),
        ...style,
      }}
    >
      <svg width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <pattern id="dot-pattern-animated" x="0" y="0" width="400" height="200" patternUnits="userSpaceOnUse">
            {DOTS_CACHE.map((dot, i) => (
              <rect key={i} width="4" height="4" x={dot.col * 20 + 10} y={dot.row * 20 + 10} fill={fill} transform={`rotate(45 ${dot.col * 20 + 12} ${dot.row * 20 + 12})`}>
                <animate attributeName="opacity" values={`${dot.a};${dot.b};${dot.c};${dot.d};${dot.a}`} dur={`${dot.dur}s`} begin={`${dot.begin}s`} repeatCount="indefinite" />
              </rect>
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern-animated)" />
      </svg>
    </div>
  );
}

const DotPatternAnimated = dynamic(() => Promise.resolve(DotPatternAnimatedInner), {
  ssr: false,
});

// — Public export ——————————————————————————————————————————————————————————

export function DotPattern({ animated = false, ...props }: DotPatternProps) {
  return animated ? <DotPatternAnimated {...props} /> : <DotPatternStatic {...props} />;
}