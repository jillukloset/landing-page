import Image from "next/image";

export type FashionImageVariant =
  | "hero"
  | "portrait"
  | "landscape"
  | "detail"
  | "editorial";

type Frame = "sharp" | "rounded" | "circle" | "torn";
type Motion = "none" | "drift" | "drift-slow";

interface FashionImageProps {
  src: string;
  alt: string;
  variant: FashionImageVariant;
  frame?: Frame;
  caption?: string;
  motion?: Motion;
  priority?: boolean;
  sizes?: string;
  /** Positioning + sizing utilities, supplied by the parent collage layout. */
  className?: string;
}

const FRAME_CLASSES: Record<Frame, string> = {
  sharp: "border border-ink/15",
  rounded: "rounded-[28px] border border-ink/15",
  circle: "rounded-full border border-ink/15",
  torn: "border border-ink/15 [clip-path:polygon(2%_0%,98%_1%,100%_97%,3%_100%)]",
};

const VARIANT_SHADOW: Record<FashionImageVariant, string> = {
  hero: "shadow-[6px_8px_0_0_rgba(17,17,17,0.9)]",
  portrait: "shadow-[4px_6px_0_0_rgba(17,17,17,0.85)]",
  landscape: "shadow-[4px_6px_0_0_rgba(17,17,17,0.85)]",
  detail: "shadow-[3px_4px_0_0_rgba(17,17,17,0.8)]",
  editorial: "shadow-none ring-1 ring-ink/10",
};

const MOTION_CLASSES: Record<Motion, string> = {
  none: "",
  drift: "motion-safe:animate-drift",
  "drift-slow": "motion-safe:animate-drift-slow",
};

/**
 * A single fashion photograph placed as an editorial collage fragment.
 * The parent (FashionCollage) owns position and size via `className`;
 * this component owns the frame treatment, caption sticker and subtle
 * motion.
 */
export default function FashionImage({
  src,
  alt,
  variant,
  frame = "sharp",
  caption,
  motion = "none",
  priority = false,
  sizes = "(min-width: 1024px) 22vw, 40vw",
  className = "",
}: FashionImageProps) {
  return (
    <figure
      className={`group pointer-events-none absolute overflow-hidden bg-ink/5 transition-transform duration-500 ease-out ${FRAME_CLASSES[frame]} ${VARIANT_SHADOW[variant]} ${MOTION_CLASSES[motion]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
      />
      {caption && (
        <figcaption className="absolute bottom-2 left-2 bg-ink px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-cream">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
