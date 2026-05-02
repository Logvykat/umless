"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "@/components/ui/link";

const KITCHEN_URL = "https://your-substack-url.substack.com";
const PORTFOLIO_URL = "https://your-portfolio.com";

const NAV_LINKS: { label: string; href: string; external: boolean; active: boolean }[] = [
  { label: "About", href: PORTFOLIO_URL, external: true, active: true },
  { label: "Blog", href: KITCHEN_URL, external: true, active: true },
  { label: "Feedback", href: "#", external: false, active: false },
  { label: "Privacy", href: "#", external: false, active: false },
];

export function Footer() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.2 });

  return (
    <footer
      ref={ref}
      className={`bg-primary text-primary-foreground overflow-hidden${isRevealed ? " is-revealed" : ""}`}
    >
      <div className="flex flex-col items-center pt-[64px] pb-[96px] reveal-unit">
        <div className="w-full max-w-[1100px] px-6 md:px-0 flex flex-col gap-[64px]">

          {/* Links + copyright row */}
          <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between">
            <nav className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
              {NAV_LINKS.map(({ label, href, external, active }) => (
                <Link
                  key={label}
                  variant="nav"
                  href={href}
                  external={external}
                  disabled={!active}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <span className="text-base opacity-30 px-3 pt-5 md:px-0">
              Made with Claude & coffee, 2026
            </span>
          </div>

          {/* Ghost wordmark — hidden on mobile */}
          <p
            className="hidden md:block font-sans font-semibold text-muted-foreground opacity-[0.24] text-center whitespace-nowrap leading-none select-none"
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