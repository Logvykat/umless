"use client";

import { Pause, Play, Square, RotateCcw } from "lucide-react";
import type { TimerStatus } from "./timer-ring";

interface ControlsProps {
  status: TimerStatus;
  onPause: () => void;
  onStop: () => void;
  onRestart: () => void;
}

export function Controls({ status, onPause, onStop, onRestart }: ControlsProps) {
  return (
    <div className="flex items-center gap-md">
      {/* Pause / Resume — small pill */}
      <button
        onClick={onPause}
        className="flex items-center justify-center size-12 rounded-full bg-secondary cursor-pointer hover-ring-secondary"
        aria-label={status === "paused" ? "Resume" : "Pause"}
      >
        {status === "paused" ? (
          <Play className="size-6 text-foreground" />
        ) : (
          <Pause className="size-6 text-foreground" />
        )}
      </button>

      {/* Stop — large circle */}
      <button
        onClick={onStop}
        className="flex items-center justify-center size-24 rounded-full bg-primary shadow-lg cursor-pointer hover-ring-primary"
        aria-label="Stop"
      >
        <Square className="size-8 text-primary-foreground" />
      </button>

      {/* Restart — small pill */}
      <button
        onClick={onRestart}
        className="flex items-center justify-center size-12 rounded-full bg-secondary cursor-pointer hover-ring-secondary"
        aria-label="Restart"
      >
        <RotateCcw className="size-6 text-foreground" />
      </button>
    </div>
  );
}
