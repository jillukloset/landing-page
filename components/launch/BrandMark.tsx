interface BrandMarkProps {
  className?: string;
}

/** The Jillu Kloset wordmark. Server component — static, no interactivity. */
export default function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <span
      className={`font-display text-xl tracking-tight sm:text-2xl ${className}`}
    >
      JILLU KLOSET
    </span>
  );
}
