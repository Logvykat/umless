"use client";

import { Mic, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DotPattern } from "./dot-pattern";

interface CloserProps {
  onRecord: () => void;
}

export function Closer({ onRecord }: CloserProps) {
  return (
    <section className="relative overflow-hidden py-24 px-6 bg-muted">
      <DotPattern />

      <div className="relative z-10 flex flex-col items-center text-center max-w-[32rem] md:max-w-[40rem] mx-auto">
        <Mic className="size-8 mb-8 text-muted-foreground" strokeWidth={1.5} />

        <h2 className="font-display font-semibold text-[32px] leading-none tracking-[-1px] text-foreground mb-6 md:text-[48px]">
          Ready to hear yourself?
        </h2>

        <p className="text-base text-muted-foreground mb-8 max-w-[20rem] md:max-w-[24rem] md:text-[17px] md:leading-[26px]">
          Five or seven minutes. The Toastmasters speech you want to nail.
        </p>

        <Button variant="default" size="2xl" onClick={onRecord}>
          Start recording
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
