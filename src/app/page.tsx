"use client";

import { WipBanner } from "@/components/landing/wip-banner";
import { TopBar } from "@/components/landing/top-bar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Closer } from "@/components/landing/closer";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  const handleRecord = () => console.log("start recording clicked");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <WipBanner />
      <TopBar />
      <main className="flex flex-col flex-1">
        <Hero onRecord={handleRecord} />
        <Features />
        <HowItWorks />
        <Closer onRecord={handleRecord} />
      </main>
      <Footer />
      {/* Sticky blur panel */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-24 pointer-events-none z-50"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(24px)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))",
          background: "transparent"
        }}
      />
    </div>
  );
}