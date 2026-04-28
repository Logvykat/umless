import { Gauge, MessageSquare, PauseCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Gauge,
    title: "Speaking pace",
    description:
      "Are you rushing? Dragging? See your words-per-minute against benchmarks.",
  },
  {
    icon: MessageSquare,
    title: "Filler words",
    description:
      "Every um, uh, like, you know — counted, timestamped, unavoidable.",
  },
  {
    icon: PauseCircle,
    title: "Pauses",
    description:
      "Silence isn't empty. See where you paused, and whether it landed.",
  },
];

const PILLS = ["No signup", "English only", "Free", "Private"];

export function Features() {
  return (
    <section className="py-12 px-6 bg-background">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="font-display font-semibold text-[32px] leading-none tracking-[-1px] text-center mb-12 md:text-[48px]">
          The honest playback
        </h2>

        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card key={title} variant="feature">
              {/* Icon container — white rounded square, soft shadow */}
              <div className="size-12 rounded-[40px] bg-white flex items-center justify-center shrink-0 shadow-sm-soft">
                <Icon className="size-6 text-foreground" strokeWidth={1.5} />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-display font-semibold text-[32px] leading-[36px] tracking-[-1px] text-foreground">
                  {title}
                </h3>
                <p className="text-[18px] leading-[27px] text-foreground/80">
                  {description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Pill row — static for Stage 1; Stage 2 turns this into an infinite loop */}
        <div className="flex items-center gap-4 overflow-x-auto pb-1 hide-scrollbar">
          {[...PILLS, ...PILLS, ...PILLS].map((pill, i) => (
            <Badge key={i} variant="outline" size="2xl" className="shrink-0">
              {pill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
