"use client";

import { useState, useEffect } from "react";
import { Moon, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 flex items-center justify-between px-12 transition-all duration-[250ms] ease-out",
        isScrolled
          ? "py-5 backdrop-blur-md border-b border-border"
          : "py-5 md:py-8 border-b border-border"
      )}
      style={{
        backgroundColor: "var(--color-nav-bg)",
      }}
    >
      <div className="flex items-center gap-3">
        <Logo className="size-9 shrink-0" />
        <span className="font-display font-bold text-[20px] text-foreground">
          Umless
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="icon-lg"
          className="size-10 rounded-full"
          aria-label="Toggle theme (coming soon)"
          disabled
        >
          <Moon />
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="h-10 rounded-full px-4"
          disabled
        >
          Share
          <ArrowUpRight />
        </Button>
      </div>
    </nav>
  );
}
