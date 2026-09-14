"use client";

import { useEffect, useState } from "react";
import {
  describeTimeRemaining,
  getTimeRemaining,
  type TimeRemaining,
} from "@/lib/countdown";

const ZERO: TimeRemaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isComplete: false,
};

/** A single digit that slides/fades in whenever its value changes. */
function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.58em] overflow-hidden align-top sm:w-[0.6em]">
      <span
        key={value}
        className="motion-safe:animate-digit-in absolute inset-0 flex items-center justify-center"
      >
        {value}
      </span>
    </span>
  );
}

/** Zero-padded digit group rendered as individually animated digits. */
function DigitGroup({
  value,
  minDigits = 2,
}: {
  value: number;
  minDigits?: number;
}) {
  const digits = Math.max(0, value).toString().padStart(minDigits, "0").split("");
  return (
    <span className="tabular-nums inline-flex">
      {digits.map((digit, index) => (
        <Digit key={index} value={digit} />
      ))}
    </span>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-[clamp(1.75rem,4.5vw,3.25rem)] leading-none text-ink">
        <DigitGroup value={value} />
      </span>
      <span className="mt-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/55 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

/**
 * The live launch timer — the campaign's central visual object. Renders a
 * deterministic zero-state on the server and on first client paint (kept
 * invisible via opacity) so hydration never mismatches, then reveals the
 * real, ticking values once mounted.
 */
export default function Countdown() {
  const [time, setTime] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const tick = () => setTime(getTimeRemaining(new Date()));
    // Populate on the next tick (not synchronously in the effect body) so the
    // very first render still matches the server-rendered zero-state exactly.
    const immediateId = setTimeout(tick, 0);
    const intervalId = setInterval(tick, 1000);
    return () => {
      clearTimeout(immediateId);
      clearInterval(intervalId);
    };
  }, []);

  const display = time ?? ZERO;
  const mounted = time !== null;

  return (
    <div
      role="timer"
      aria-label={describeTimeRemaining(display)}
      className="flex flex-col items-start"
    >
      {display.isComplete ? (
        <div className="motion-safe:animate-rise">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-electric">
            Closet Drop 001
          </p>
          <h2 className="font-display text-[clamp(3rem,9vw,6.5rem)] uppercase leading-[0.88]">
            It&apos;s Open
          </h2>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className={`transition-opacity duration-700 ease-out ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-start">
            <span className="font-display text-[clamp(5.5rem,20vw,27rem)] leading-[0.76] text-ink">
              <DigitGroup value={display.days} />
            </span>
            <span className="-mt-1 font-sans text-base font-bold uppercase tracking-[0.4em] text-ink sm:text-lg md:text-xl">
              Days
            </span>
          </div>

          <div className="mt-5 flex items-center gap-3 sm:mt-7 sm:gap-5">
            <TimeUnit value={display.hours} label="Hours" />
            <span className="font-display text-[clamp(1.25rem,2.5vw,2rem)] text-ink/35">
              :
            </span>
            <TimeUnit value={display.minutes} label="Minutes" />
            <span className="font-display text-[clamp(1.25rem,2.5vw,2rem)] text-ink/35">
              :
            </span>
            <TimeUnit value={display.seconds} label="Seconds" />
          </div>
        </div>
      )}
    </div>
  );
}
