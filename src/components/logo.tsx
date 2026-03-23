import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      target="_blank"
      rel="noopener noreferrer"
      className="block size-8 rounded-xl bg-brand-800 shrink-0"
      aria-label="Hot Mic home"
    />
  );
}
