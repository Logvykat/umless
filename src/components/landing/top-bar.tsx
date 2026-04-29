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
        "sticky top-0 z-50 flex items-center justify-between px-6 transition-all duration-[250ms] ease-out",
        isScrolled
          ? "py-2 backdrop-blur-md border-b border-border"
          : "py-4 md:py-[32px] border-b border-transparent"
      )}
      style={{
        backgroundColor: "var(--color-nav-bg)",
      }}
    >
      <div className="flex items-center gap-2">
        <Logo className="size-7 shrink-0" />
        <span className="font-display font-semibold text-[15px] text-foreground">
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
        >
          Share
          <ArrowUpRight />
        </Button>
      </div>
    </nav>
  );
}
