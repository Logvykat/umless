import { Share2 } from "lucide-react";
import { Logo } from "./logo";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between px-xl py-lg">
      <Logo />
      <button className="flex items-center gap-xs px-xl py-sm rounded-full border border-border-3 bg-white/10 shadow-xs text-foreground text-base font-medium cursor-pointer">
        Share
        <Share2 className="size-4" />
      </button>
    </nav>
  );
}
