import FashionImage from "./FashionImage";

interface CollageSlot {
  src: string;
  alt: string;
  variant: "hero" | "portrait" | "landscape" | "detail" | "editorial";
  frame?: "sharp" | "rounded" | "circle" | "torn";
  caption?: string;
  motion?: "none" | "drift" | "drift-slow";
  priority?: boolean;
  className: string;
}

// Desktop editorial collage — an asymmetric wall of fragments surrounding
// the countdown rather than a grid. Hidden below lg; mobile gets its own,
// much lighter set of accents authored directly in LaunchExperience.
//
// Layout is zoned deliberately: the left column and the wide centre gap
// carry the large/medium fragments, while the strip behind the numeral
// (roughly x 68–100%, y 15–72%) is kept clear so the countdown stays the
// most legible thing on the page. The bottom-right, below the timer, is
// free space reclaimed for a supporting cluster.
const SLOTS: CollageSlot[] = [
  // Hero (large, 3)
  {
    src: "/images/fashion-01.jpg",
    alt: "Full outfit look — complete head-to-toe styling",
    variant: "hero",
    caption: "01 / FULL LOOK",
    priority: true,
    className: "left-[2%] top-[11%] h-[38vh] w-[15vw] -rotate-2",
  },
  {
    src: "/images/fashion-04.jpg",
    alt: "Fashion portrait, strong expressive styling",
    variant: "hero",
    caption: "04 / PORTRAIT",
    priority: true,
    className: "left-[38%] top-[15%] h-[42vh] w-[15vw] rotate-1",
  },
  {
    src: "/images/fashion-07.jpg",
    alt: "Masculine streetwear look, oversized silhouette",
    variant: "hero",
    frame: "torn",
    caption: "07 / STREET",
    className: "left-[31%] top-[56%] h-[24vh] w-[13vw] -rotate-1",
  },

  // Supporting (medium, 6)
  {
    src: "/images/fashion-02.jpg",
    alt: "Candid street style photograph",
    variant: "landscape",
    motion: "drift",
    className: "left-[19%] top-[3%] h-[14vh] w-[15vw] rotate-2",
  },
  {
    src: "/images/fashion-05.jpg",
    alt: "Group photograph, contrasting styles",
    variant: "landscape",
    motion: "drift-slow",
    className: "right-[19%] bottom-[9%] h-[15vh] w-[16vw] -rotate-2",
  },
  {
    src: "/images/fashion-06.jpg",
    alt: "Vintage thrift-inspired styling",
    variant: "portrait",
    className: "left-0 top-[51%] h-[16vh] w-[11vw] rotate-3",
  },
  {
    src: "/images/fashion-08.jpg",
    alt: "Contemporary feminine fashion styling",
    variant: "portrait",
    className: "right-[1%] bottom-[2%] h-[20vh] w-[11vw] -rotate-2",
  },
  {
    src: "/images/fashion-09.jpg",
    alt: "Androgynous, gender-neutral fashion styling",
    variant: "portrait",
    frame: "rounded",
    className: "right-[15%] bottom-[3%] h-[21vh] w-[11vw] rotate-2",
  },
  {
    src: "/images/fashion-12.jpg",
    alt: "Experimental, visually unusual fashion frame",
    variant: "landscape",
    frame: "torn",
    motion: "drift",
    className: "left-[58%] top-[3%] h-[9vh] w-[10vw] -rotate-3",
  },

  // Detail (small, 3)
  {
    src: "/images/fashion-03.jpg",
    alt: "Denim texture detail",
    variant: "detail",
    frame: "circle",
    className: "left-[35%] top-[69%] h-[6vw] w-[6vw]",
  },
  {
    src: "/images/fashion-10.jpg",
    alt: "Accessory detail — bag and jewellery",
    variant: "detail",
    className: "left-[45%] bottom-[13%] h-[6vw] w-[6vw] -rotate-2",
  },
  {
    src: "/images/fashion-11.jpg",
    alt: "Garment stitching and graphic detail",
    variant: "detail",
    frame: "rounded",
    className: "left-[60%] top-[16%] h-[6vw] w-[6vw] rotate-2",
  },
];

export default function FashionCollage() {
  return (
    <div
      className="pointer-events-none absolute inset-0 hidden lg:block"
      aria-hidden="true"
    >
      {SLOTS.map((slot) => (
        <FashionImage key={slot.src} {...slot} />
      ))}
    </div>
  );
}
