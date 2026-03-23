"use client";

import { useState, useCallback } from "react";
import { IdleState } from "@/components/idle-state";
import { TimerRing, type TimerStatus } from "@/components/timer-ring";
import { Controls } from "@/components/controls";

export default function AppPage() {
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [elapsed, setElapsed] = useState(0);

  const handleStart = useCallback(() => {
    setStatus("running");
    setElapsed(0);
  }, []);

  const handlePause = useCallback(() => {
    setStatus((s) => (s === "running" ? "paused" : "running"));
  }, []);

  const handleStop = useCallback(() => {
    setStatus("idle");
    setElapsed(0);
  }, []);

  const handleRestart = useCallback(() => {
    setElapsed(0);
    setStatus("running");
  }, []);

  if (status === "idle") {
    return <IdleState onStart={handleStart} />;
  }

  return (
    <div className="flex flex-col items-center">
      <TimerRing
        status={status}
        elapsed={elapsed}
        onElapsedChange={setElapsed}
      />
      <Controls
        status={status}
        onPause={handlePause}
        onStop={handleStop}
        onRestart={handleRestart}
      />
    </div>
  );
}
