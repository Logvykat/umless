import { GraduationCap, Mic } from "lucide-react";

interface IdleStateProps {
  onStart: () => void;
}

export function IdleState({ onStart }: IdleStateProps) {
  return (
    <div className="flex flex-col items-center gap-3xl">
      {/* Text + Icon */}
      <div className="flex flex-col items-center gap-xl">
        <div className="flex items-center justify-center size-16 rounded-lg bg-secondary p-xs mb-xs">
          <GraduationCap className="size-8 text-foreground" />
        </div>
        <div className="flex flex-col items-center gap-md text-center">
          <h3 className="text-2xl font-semibold tracking-[-1px] leading-[28.8px] text-black">
            Ready to practice?
          </h3>
          <p className="text-lg font-normal leading-[27px] text-secondary-foreground max-w-[352px]">
            Take a deep breath. When you&apos;re ready, press the button below
            to begin your recording session.
          </p>
        </div>
      </div>

      {/* Start recording button */}
      <button
        onClick={onStart}
        className="flex items-center gap-sm bg-primary text-primary-foreground pl-xl pr-2xl py-lg rounded-full shadow-lg cursor-pointer hover-ring-primary"
      >
        <Mic className="size-8" />
        <span className="text-xl font-semibold leading-6">
          Start recording
        </span>
      </button>
    </div>
  );
}
