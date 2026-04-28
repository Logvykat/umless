import { cn } from "@/lib/utils";

interface DotPatternProps {
  className?: string;
  /** Apply a linear gradient mask that fades out toward the bottom */
  fadeBottom?: boolean;
}

/**
 * Static SVG pattern: 4x4px square rotated 45° (diamond, ~5.66px visual) on a 20px grid.
 * Mirrors Figma's `.Cross` mark.
 *
 * Note (deferred): Figma also defines `.Halfcross` (10x5 with 5.657x2.828 rect) used as the
 * section's first row only — visually a half-height crown of diamonds. Skipping for v1; the
 * uniform repeat reads close enough at the current opacity. Revisit if the seam stands out.
 *
 * Stage 2: will modulate fill-opacity from a parent CSS variable to visualize live audio level.
 */
export function DotPattern({ className, fadeBottom = false }: DotPatternProps) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={
        fadeBottom
          ? {
              maskImage:
                "linear-gradient(to bottom, black 30%, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 30%, transparent 85%)",
            }
          : undefined
      }
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern
          id="dot-pattern"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          {/* 4x4 square rotated 45° = ~5.66px diamond, per Figma .Cross */}
          <rect
            width="4"
            height="4"
            x="10"
            y="10"
            fill="var(--color-dot-pattern)"
            transform="rotate(45 12 12)"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
  );
}
