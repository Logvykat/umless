import { Moon, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export function TopBar() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:py-[32px] border-b border-border"
      style={{
        backgroundColor: "var(--color-nav-bg)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
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
