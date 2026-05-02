"use client";

import { Link } from "@/components/ui/link";

const KITCHEN_URL = "https://your-substack-url.substack.com";

export function WipBanner() {
  return (
    <div className="w-full bg-foreground px-4 py-2 flex items-center justify-center gap-1 text-sm text-primary-foreground">
      <span>Still cooking — recording isn&apos;t ready yet.</span>
      <Link className="text-sm px-1" href={KITCHEN_URL} external variant="nav">
        The kitchen
      </Link>
    </div>
  );
}