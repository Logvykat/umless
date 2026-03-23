import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-xl p-md">
      <div className="flex flex-col items-center gap-md text-center">
        <div className="size-12 rounded-xl bg-brand-800" />
        <h1 className="text-5xl font-semibold tracking-[-1.5px] leading-[48px]">
          Hot Mic
        </h1>
        <p className="text-lg text-secondary-foreground max-w-md leading-[27px]">
          A free, browser-based speech practice tool. Time your talks, hit your
          marks, and get better at speaking.
        </p>
      </div>
      <Link
        href="/app"
        className="flex items-center gap-sm bg-primary text-primary-foreground px-2xl py-lg rounded-full shadow-lg text-base font-medium hover:bg-primary/90 transition-colors"
      >
        Open Speech Analyzer
      </Link>
    </div>
  );
}
