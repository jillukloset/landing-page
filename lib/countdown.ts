/**
 * Countdown utilities for the Jillu Kloset launch experience.
 *
 * The launch timestamp is the single source of truth for "days remaining" —
 * update LAUNCH_DATE to reschedule the drop. All calculations are derived
 * from it at render/tick time, never hardcoded.
 */

/** Jillu Kloset opens. Asia/Kolkata (+05:30). */
export const LAUNCH_DATE = new Date("2026-09-28T00:00:00+05:30");

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** true once `now` has reached or passed the launch date. */
  isComplete: boolean;
}

const SECOND_MS = 1000;
const MINUTE_MS = SECOND_MS * 60;
const HOUR_MS = MINUTE_MS * 60;
const DAY_MS = HOUR_MS * 24;

/**
 * Derives days/hours/minutes/seconds remaining until `target` from `now`.
 * Values are clamped at zero and never go negative; once the target has
 * passed, isComplete flips to true and every unit reads zero.
 */
export function getTimeRemaining(
  now: Date,
  target: Date = LAUNCH_DATE
): TimeRemaining {
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  return {
    days: Math.floor(diff / DAY_MS),
    hours: Math.floor((diff % DAY_MS) / HOUR_MS),
    minutes: Math.floor((diff % HOUR_MS) / MINUTE_MS),
    seconds: Math.floor((diff % MINUTE_MS) / SECOND_MS),
    isComplete: false,
  };
}

/** Zero-pads a non-negative integer to at least two digits. */
export function pad(value: number): string {
  return Math.max(0, value).toString().padStart(2, "0");
}

/** Human-readable summary for assistive tech (e.g. "12 days, 4 hours, 36 minutes, 18 seconds"). */
export function describeTimeRemaining(time: TimeRemaining): string {
  if (time.isComplete) return "The closet is open";
  return `${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds until launch`;
}
