"use client";

import { ArrowRight, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DotPattern } from "./dot-pattern";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface HeroProps {
  onRecord: () => void;
}

export function Hero({ onRecord }: HeroProps) {
  const { ref, isRevealed } = useScrollReveal({ immediate: true, delay: 150 });

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden bg-background${isRevealed ? " is-revealed" : ""}`}
    >
      <DotPattern fadeBottom />

      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-6 md:pt-26 md:pb-12 w-full max-w-[960px] mx-auto">
        <Badge
          variant="outline"
          className="mb-8"
          data-reveal-child
          data-stagger-index="0"
        >
          <Globe />
          English only
        </Badge>

        {/* H1 — w-full so it fills the constrained container */}
        <h1
          className="w-full font-display font-semibold text-[40px] leading-[46px] tracking-[-1.5px] text-foreground mb-6 md:text-[72px] md:leading-[80px]"
          data-reveal-child
          data-stagger-index="1"
        >
          Rehearse in private.
          <br />
          Deliver in public.
        </h1>

        {/* Subtitle — 18px Inter, line-height 32px per Figma (paragraph/title) */}
        <p
          className="text-[18px] leading-[32px] text-foreground/80 max-w-[485px] mb-9"
          data-reveal-child
          data-stagger-index="2"
        >
          A free speech timer that catches your fillers, tracks your pace, and
          respects your time. Built for Toastmasters milestones — 5, 6, and 7
          minutes.
        </p>

        <Button
          variant="default"
          size="2xl"
          onClick={onRecord}
          data-reveal-child
          data-stagger-index="3"
        >
          Start recording
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
