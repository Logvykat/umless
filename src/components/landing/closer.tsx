"use client";

import { Mic, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DotPattern } from "./dot-pattern";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CloserProps {
  onRecord: () => void;
}

export function Closer({ onRecord }: CloserProps) {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden py-24 px-6 bg-muted${isRevealed ? " is-revealed" : ""}`}
    >
      <DotPattern />

      <div className="relative z-10 flex flex-col items-center text-center max-w-[32rem] md:max-w-[40rem] mx-auto">
        <Mic
          className="size-8 mb-8 text-muted-foreground"
          strokeWidth={1.5}
          data-reveal-child
          data-stagger-index="0"
        />

        <h2
          className="font-display font-semibold text-[32px] leading-none tracking-[-1px] text-foreground mb-6 md:text-[48px]"
          data-reveal-child
          data-stagger-index="1"
        >
          Ready to hear yourself?
        </h2>

        <p
          className="text-base text-muted-foreground mb-8 max-w-[20rem] md:max-w-[24rem] md:text-[17px] md:leading-[26px]"
          data-reveal-child
          data-stagger-index="2"
        >
          Five or seven minutes. The Toastmasters speech you want to nail.
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
