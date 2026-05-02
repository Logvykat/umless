"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const STEPS = [
  { n: 1, title: "Hit record", description: "One tap. No setup." },
  { n: 2, title: "Say your piece", description: "As many takes as you need." },
  {
    n: 3,
    title: "Face the playback",
    description: "Pace, fillers, pauses. Laid bare.",
  },
];

export function HowItWorks() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`pt-12 pb-24 px-6 bg-background${isRevealed ? " is-revealed" : ""}`}
    >
      <div className="max-w-[1100px] mx-auto">
        <h2
          className="font-display font-semibold text-[32px] leading-none tracking-[-1px] text-center mb-12 md:text-[48px]"
          data-reveal-child
          data-stagger-index="0"
        >
          How it works
        </h2>

        <div className="flex flex-col divide-y divide-border">
          {STEPS.map(({ n, title, description }, idx) => (
            <div
              key={n}
              className="flex items-start justify-between gap-6 p-[32px] md:items-center"
              data-reveal-child
              data-stagger-index={idx + 1}
            >
              <div className="flex items-center gap-6 shrink-0">
                <div className="size-8 rounded-full bg-foreground flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-background leading-none">
                    {n}
                  </span>
                </div>
                <span className="font-display font-semibold text-[32px] leading-[36px] tracking-[-1px] text-foreground">
                  {title}
                </span>
              </div>

              {/* Description — hidden on mobile */}
              <span className="hidden md:block font-display font-semibold text-[32px] leading-[36px] tracking-[-1px] text-muted-foreground text-right whitespace-nowrap">
                {description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}