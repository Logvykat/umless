"use client";

import { useEffect, useRef, useCallback } from "react";

/* ── constants ── */
const CX = 170;
const CY = 170;
const R = 125;
const STROKE = 48;
const GAP_DEG = 2;
const START_ANGLE = -90;
const MAX_TIME = 420;
const CORNER_R = 12;
const Ro = R + STROKE / 2;
const Ri = R - STROKE / 2;

const ZONES = [
  { label: "5:00", from: 0, to: 300, color: "#22c55e", gradEnd: "#84cc16" },
  { label: "6:00", from: 300, to: 360, color: "#eab308", gradEnd: "#facc15" },
  { label: "7:00", from: 360, to: 420, color: "#ef4444", gradEnd: "#f87171" },
];

const totalUsableDeg = 360 - GAP_DEG * 3;
const zoneSpans = ZONES.map((z) => ((z.to - z.from) / MAX_TIME) * totalUsableDeg);

const segStarts: number[] = [];
let cur = START_ANGLE + GAP_DEG / 2;
zoneSpans.forEach((span) => {
  segStarts.push(cur);
  cur += span + GAP_DEG;
});

function fmt(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polar(r: number, aDeg: number): [number, number] {
  return [CX + r * Math.cos(toRad(aDeg)), CY + r * Math.sin(toRad(aDeg))];
}

function annularSectorPath(
  a1: number,
  a2: number,
  cr1: number,
  cr2: number
): string {
  // Angular offsets produced by corner radii at each radius
  const dO1 = cr1 > 0 ? (cr1 / Ro) * (180 / Math.PI) : 0;
  const dI1 = cr1 > 0 ? (cr1 / Ri) * (180 / Math.PI) : 0;
  const dO2 = cr2 > 0 ? (cr2 / Ro) * (180 / Math.PI) : 0;
  const dI2 = cr2 > 0 ? (cr2 / Ri) * (180 / Math.PI) : 0;

  const outerSpan = (a2 - dO2) - (a1 + dO1);
  const innerSpan = (a2 - dI2) - (a1 + dI1);

  const parts: string[] = [];

  if (cr1 > 0) {
    const [sx, sy] = polar(Ro - cr1, a1);
    parts.push(`M ${sx} ${sy}`);
    const [tx, ty] = polar(Ro, a1 + dO1);
    parts.push(`A ${cr1} ${cr1} 0 0 1 ${tx} ${ty}`);
  } else {
    const [sx, sy] = polar(Ro, a1);
    parts.push(`M ${sx} ${sy}`);
  }

  const [oex, oey] = polar(Ro, a2 - dO2);
  parts.push(`A ${Ro} ${Ro} 0 ${outerSpan > 180 ? 1 : 0} 1 ${oex} ${oey}`);

  if (cr2 > 0) {
    const [ex, ey] = polar(Ro - cr2, a2);
    parts.push(`A ${cr2} ${cr2} 0 0 1 ${ex} ${ey}`);
    const [ix, iy] = polar(Ri + cr2, a2);
    parts.push(`L ${ix} ${iy}`);
    const [itx, ity] = polar(Ri, a2 - dI2);
    parts.push(`A ${cr2} ${cr2} 0 0 1 ${itx} ${ity}`);
  } else {
    const [ix, iy] = polar(Ri, a2);
    parts.push(`L ${ix} ${iy}`);
  }

  const [isx, isy] = polar(Ri, a1 + dI1);
  parts.push(`A ${Ri} ${Ri} 0 ${innerSpan > 180 ? 1 : 0} 0 ${isx} ${isy}`);

  if (cr1 > 0) {
    const [bx, by] = polar(Ri + cr1, a1);
    parts.push(`A ${cr1} ${cr1} 0 0 1 ${bx} ${by}`);
  }

  parts.push("Z");
  return parts.join(" ");
}

/* static track paths — computed once, never change */
const trackPaths = zoneSpans.map((span, i) =>
  annularSectorPath(segStarts[i], segStarts[i] + span, CORNER_R, CORNER_R)
);

/* dot + label positions */
const dotData = ZONES.map((z, i) => {
  const gapCenter = segStarts[i] + zoneSpans[i] + GAP_DEG / 2;
  const dotR = R + 48;
  const labelR = R + 68;
  const rotDeg = gapCenter + 90;
  return {
    cx: CX + dotR * Math.cos(toRad(gapCenter)),
    cy: CY + dotR * Math.sin(toRad(gapCenter)),
    lx: CX + labelR * Math.cos(toRad(gapCenter)),
    ly: CY + labelR * Math.sin(toRad(gapCenter)),
    rot: rotDeg,
    angle: gapCenter,
    label: z.label,
  };
});

/* Dashed arc */
const DASH_R = R + 48;
const DASH_DOT_R = 1.5;
const DASH_SPACING = 3.2;
const dashDots: { cx: number; cy: number }[] = [];
const dashStart = dotData[0].angle;
const dashEnd = dotData[2].angle;
let a = dashStart;
const endNorm = dashEnd < dashStart ? dashEnd + 360 : dashEnd;
while (a <= endNorm) {
  dashDots.push({
    cx: CX + DASH_R * Math.cos(toRad(a)),
    cy: CY + DASH_R * Math.sin(toRad(a)),
  });
  a += DASH_SPACING;
}

export type TimerStatus = "idle" | "running" | "paused";

interface TimerRingProps {
  status: TimerStatus;
  elapsed: number;
  onElapsedChange: (elapsed: number | ((prev: number) => number)) => void;
}

export function TimerRing({ status, elapsed, onElapsedChange }: TimerRingProps) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tick = useCallback(() => onElapsedChange((e: number) => e + 1), [onElapsedChange]);

  useEffect(() => {
    if (status === "running") {
      timerRef.current = setInterval(tick, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, tick]);

  const fills = ZONES.map((z) => {
    if (elapsed <= z.from) return 0;
    if (elapsed >= z.to) return 1;
    return (elapsed - z.from) / (z.to - z.from);
  });

  return (
    <div className="flex items-center justify-center">
      <svg
        width="440"
        height="440"
        viewBox="-30 -30 400 400"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Green zone gradient */}
          <linearGradient
            id="zg0"
            gradientUnits="userSpaceOnUse"
            x1={CX + R * Math.cos(toRad(segStarts[0]))}
            y1={CY + R * Math.sin(toRad(segStarts[0]))}
            x2={CX + R * Math.cos(toRad(segStarts[0] + zoneSpans[0]))}
            y2={CY + R * Math.sin(toRad(segStarts[0] + zoneSpans[0]))}
          >
            <stop offset="0%" stopColor="#d9f99d" />
            <stop offset="40%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          {/* Yellow zone gradient */}
          <linearGradient
            id="zg1"
            gradientUnits="userSpaceOnUse"
            x1={CX + R * Math.cos(toRad(segStarts[1]))}
            y1={CY + R * Math.sin(toRad(segStarts[1]))}
            x2={CX + R * Math.cos(toRad(segStarts[1] + zoneSpans[1]))}
            y2={CY + R * Math.sin(toRad(segStarts[1] + zoneSpans[1]))}
          >
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
          {/* Red zone gradient */}
          <linearGradient
            id="zg2"
            gradientUnits="userSpaceOnUse"
            x1={CX + R * Math.cos(toRad(segStarts[2]))}
            y1={CY + R * Math.sin(toRad(segStarts[2]))}
            x2={CX + R * Math.cos(toRad(segStarts[2] + zoneSpans[2]))}
            y2={CY + R * Math.sin(toRad(segStarts[2] + zoneSpans[2]))}
          >
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
        </defs>

        {/* Track segments (inactive) */}
        {trackPaths.map((d, i) => (
          <path key={`t${i}`} d={d} fill="rgba(57, 60, 60, 0.12)" />
        ))}

        {/* Filled progress — rounded start edge, flat leading edge */}
        {zoneSpans.map((span, i) => {
          if (fills[i] <= 0) return null;
          const a1 = segStarts[i];
          const fillSpan = span * fills[i];
          // Minimum angular span to avoid degenerate geometry
          const minSpan = (CORNER_R / Ro) * (180 / Math.PI) * 2;
          if (fillSpan < minSpan) return null;
          const a2 = a1 + fillSpan;
          const endCr = fills[i] >= 0.99 ? CORNER_R : 0;
          return (
            <path
              key={`f${i}`}
              d={annularSectorPath(a1, a2, CORNER_R, endCr)}
              fill={`url(#zg${i})`}
            />
          );
        })}

        {/* Dashed arc */}
        {dashDots.map((d, i) => (
          <circle
            key={`dash${i}`}
            cx={d.cx}
            cy={d.cy}
            r={DASH_DOT_R}
            fill="#393C3C"
          />
        ))}

        {/* Dot markers + time labels */}
        {dotData.map((m, i) => (
          <g key={`d${i}`}>
            <circle cx={m.cx} cy={m.cy} r={4} fill="#393C3C" />
            <text
              x={m.lx}
              y={m.ly}
              textAnchor="middle"
              dominantBaseline="central"
              transform={`rotate(${m.rot}, ${m.lx}, ${m.ly})`}
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                fill: "#393C3C",
              }}
            >
              {m.label}
            </text>
          </g>
        ))}

        {/* Timer text — stays #393C3C always */}
        <text
          x={CX}
          y={CY + 2}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontWeight: 600,
            fontSize: 48,
            fill: "#393C3C",
            letterSpacing: "-1.5px",
          }}
        >
          {fmt(elapsed)}
        </text>
      </svg>
    </div>
  );
}
