import type { ReactNode } from "react";

type Mark = "arrow" | "circle" | "underline" | "star" | "dot" | "none";
type Tone = "ink" | "cream" | "electric" | "acid" | "pink" | "orange";

interface EditorialLabelProps {
  children: ReactNode;
  mark?: Mark;
  tone?: Tone;
  className?: string;
}

const TONE_CLASSES: Record<Tone, string> = {
  ink: "text-ink",
  cream: "text-cream",
  electric: "text-electric",
  acid: "text-acid",
  pink: "text-pink",
  orange: "text-orange",
};

/**
 * Small fashion-magazine-style annotation: a tiny uppercase, tracked label
 * with an optional decorative mark. Purely typographic and decorative —
 * hidden from assistive tech so it doesn't clutter the page's reading order.
 */
export default function EditorialLabel({
  children,
  mark = "none",
  tone = "ink",
  className = "",
}: EditorialLabelProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex select-none items-center gap-1.5 whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-xs ${TONE_CLASSES[tone]} ${className}`}
    >
      {mark === "arrow" && <span aria-hidden="true">↗</span>}
      {mark === "star" && <span aria-hidden="true">✦</span>}
      {mark === "dot" && <span aria-hidden="true">●</span>}
      {mark === "circle" ? (
        <span className="rounded-full border border-current px-2 py-0.5">
          {children}
        </span>
      ) : mark === "underline" ? (
        <span className="border-b border-current pb-0.5">{children}</span>
      ) : (
        <span>{children}</span>
      )}
    </span>
  );
}
