"use client";

import { TopBar } from "@/components/landing/top-bar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Closer } from "@/components/landing/closer";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  // Placeholder — will be wired to the recording state machine in a later session
  const handleRecord = () => console.log("start recording clicked");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex flex-col flex-1">
        <Hero onRecord={handleRecord} />
        <Features />
        <HowItWorks />
        <Closer onRecord={handleRecord} />
      </main>
      <Footer />
    </div>
  );
}
