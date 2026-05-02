"use client";

import { Mic, Clock4 } from "lucide-react";
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
      className={`relative overflow-hidden py-24 px-6 border-t border-border bg-muted${isRevealed ? " is-revealed" : ""}`}
    >
      <DotPattern variant="dark"/>

      <div className="relative z-10 flex flex-col items-center text-center max-w-[32rem] md:max-w-[40rem] mx-auto">
        <div className="size-12 rounded-full bg-background flex items-center justify-center shadow-sm-soft mb-8">
          <Mic
            className="size-6 text-foreground"
            strokeWidth={1.5}
            data-reveal-child
            data-stagger-index="0"
          />
        </div>  

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

        <span data-reveal-child data-stagger-index="3">
          <Button
            variant="default"
            size="2xl"
            disabled
          >
          Recording is coming soon
          <Clock4 />
         </Button>
        </span>

      </div>
    </section>
  );
}
