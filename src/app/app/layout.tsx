import { NavBar } from "@/components/nav-bar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-[8px] p-[8px]">
      <NavBar />
      <main className="flex flex-1 flex-col items-center justify-center bg-background rounded-b-3xl">
        {children}
      </main>
    </div>
  );
}
