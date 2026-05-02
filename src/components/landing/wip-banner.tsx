"use client";

import { Link } from "@/components/ui/link";
import { Badge } from "@/components/ui/badge";

const KITCHEN_URL = "https://your-substack-url.substack.com";

export function WipBanner() {
  return (
    <div className="w-full bg-foreground px-4 py-2 flex items-center justify-center gap-1 text-sm text-primary-foreground">
       <Badge
          variant="secondary"
          className="h-4.5 rounded-md px-1 font-bold mr-1 pt-0.6"
        >
         WIP
        </Badge>
      <span>Still cooking — recording isn&apos;t ready yet.</span>
      <Link className="text-sm px-1" href={KITCHEN_URL} external variant="nav">
        The kitchen
      </Link>
    </div>
  );
}