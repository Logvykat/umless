"use client";

import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const NAV_LINKS: { label: string; href: string; external: boolean }[] = [
  { label: "About", href: "#", external: true },
  { label: "Blog", href: "#", external: true },
  { label: "Feedback", href: "#", external: true },
  { label: "Privacy", href: "#", external: false },
];

export function Footer() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.2 });

  return (
    // overflow-hidden clips the wordmark on narrow viewports
    <footer
      ref={ref}
      className={`bg-primary text-primary-foreground overflow-hidden${isRevealed ? " is-revealed" : ""}`}
    >
      {/* Outer: centers the 1100px content column, pt-64 pb-96 per Figma */}
      <div className={`flex flex-col items-center pt-[64px] pb-[96px] reveal-unit`}>
        {/* Content column — 1100px max, matching Figma content frame */}
        <div className="w-full max-w-[1100px] px-6 md:px-0 flex flex-col gap-[64px]">

          {/* Links + copyright row */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <nav className="flex items-center gap-2 flex-wrap">
              {NAV_LINKS.map(({ label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-base font-medium text-[#f5f5f5] hover:text-white transition-colors"
                >
                  {label}
                  {external && <ArrowUpRight className="size-4" />}
                </a>
              ))}
            </nav>
            <span className="text-base text-[#f5f5f5]/60 px-3 md:px-0">
              2026 All rights reserved
            </span>
          </div>

          {/* Ghost wordmark — 317px font fills the 1100px column per Figma.
              Inter semibold, muted-foreground at 24% opacity. */}
          <p
            className="font-sans font-semibold text-muted-foreground opacity-[0.24] text-center whitespace-nowrap leading-none select-none"
            aria-hidden
            style={{ fontSize: "317px" }}
          >
            Umless
          </p>

        </div>
      </div>
    </footer>
  );
}
