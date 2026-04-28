import { NavBar } from "@/components/nav-bar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col p-[8px]">
      <div className="flex flex-1 flex-col bg-background rounded-3xl">
        <NavBar />
        <main className="flex flex-1 flex-col items-center justify-center">
          {children}
        </main>
      </div>
    </div>
  );
}
