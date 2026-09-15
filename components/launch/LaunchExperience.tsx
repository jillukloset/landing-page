import BrandMark from "./BrandMark";
import Countdown from "./Countdown";
import EditorialLabel from "./EditorialLabel";
import FashionCollage from "./FashionCollage";
import FashionImage from "./FashionImage";
import JoinDrop from "./JoinDrop";

/**
 * The full launch page composition: header, campaign typography, the live
 * countdown, the fashion collage and the single CTA — assembled as one
 * editorial grid. Stays a server component; only Countdown and JoinDrop
 * ship client JS.
 */
export default function LaunchExperience() {
  return (
    <main className="relative w-full bg-cream lg:h-dvh lg:overflow-hidden">
      {/* Background layer: flat, hard-edged colour geometry — no gradients, no blur. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-16 -top-16 h-48 w-48 rotate-12 bg-yellow/25 sm:h-64 sm:w-64 lg:h-72 lg:w-72" />
        <div className="absolute -left-24 bottom-0 h-56 w-56 -rotate-6 bg-pink/15 sm:h-72 sm:w-72 lg:h-96 lg:w-96" />
      </div>

      {/* Midground layer: the desktop fashion collage. Mobile gets local accents instead. */}
      <FashionCollage />

      {/* Foreground layer: all typography, the countdown and the CTA. */}
      <div className="relative z-20 mx-auto flex min-h-dvh w-full max-w-[1920px] flex-col px-5 pb-8 pt-5 sm:px-8 sm:pt-6 lg:grid lg:h-full lg:min-h-0 lg:grid-cols-12 lg:grid-rows-6 lg:gap-x-4 lg:px-12 lg:py-7">
        {/* Header */}
        <header className="motion-safe:animate-rise flex items-start justify-between gap-4 lg:col-span-12 lg:row-start-1">
          <div className="flex flex-col gap-1.5">
            <BrandMark />
            <EditorialLabel mark="dot" tone="electric">
              Closet Drop 001
            </EditorialLabel>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <a
              href="https://www.instagram.com/jillukloset?stkn=emt4aHI5Y2tndWVs"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:text-electric focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:text-sm"
            >
              Instagram
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
            <div className="hidden sm:block">
              <EditorialLabel tone="ink">Est. 2026</EditorialLabel>
            </div>
          </div>
        </header>

        {/* Headline: PRE-LOVED. / RE-LOVED. */}
        <div className="motion-safe:animate-rise relative mt-10 [animation-delay:120ms] lg:col-start-1 lg:col-span-6 lg:row-start-2 lg:row-span-2 lg:mt-0 lg:self-start">
          <FashionImage
            src="/images/fashion-11.jpg"
            alt="Garment stitching and graphic detail"
            variant="detail"
            frame="rounded"
            className="-right-2 -top-4 h-20 w-16 rotate-3 lg:hidden"
          />
          <h1 className="font-display leading-[0.85] text-[clamp(2.75rem,10vw,5.75rem)] uppercase">
            <span className="text-outline block">Pre-Loved.</span>
            <span className="block text-electric">Re-Loved.</span>
          </h1>
        </div>

        {/* Eyebrow + the countdown itself */}
        <div className="motion-safe:animate-rise relative mt-12 [animation-delay:220ms] lg:col-start-7 lg:col-span-6 lg:row-start-2 lg:row-span-4 lg:mt-0 lg:self-start lg:justify-self-end lg:pt-6">
          {/* offset colour block behind the numeral, an "offset layer" for the 12 — sized
              off the same clamp scale as the numeral itself so it never blows out at
              in-between (tablet) viewport widths the way a parent-relative % would. */}
          <div
            aria-hidden="true"
            className="absolute -left-2 top-8 -z-10 h-[clamp(6.5rem,24vw,17.5rem)] w-[clamp(10rem,34vw,26rem)] bg-acid/70 lg:-right-3 lg:left-auto lg:right-[4%]"
          />
          <div className="absolute -top-6 right-0 hidden rotate-3 lg:block">
            <EditorialLabel mark="circle" tone="ink">
              1 of 1
            </EditorialLabel>
          </div>

          <p className="font-sans text-sm font-bold uppercase tracking-[0.3em] text-ink/70 sm:text-base">
            The Closet Opens In
          </p>

          <div className="relative mt-2">
            <FashionImage
              src="/images/fashion-03.jpg"
              alt="Denim texture detail"
              variant="detail"
              frame="circle"
              className="-bottom-3 -left-3 h-16 w-16 -z-10 lg:hidden"
            />
            <Countdown />
          </div>
        </div>

        {/* Tagline */}
        <div className="motion-safe:animate-rise relative mt-12 [animation-delay:320ms] lg:col-start-1 lg:col-span-5 lg:row-start-5 lg:mt-0 lg:self-end">
          <p className="max-w-sm font-sans text-lg font-semibold uppercase leading-snug tracking-tight sm:text-xl">
            Your next favourite fit has already been loved.
          </p>
          <EditorialLabel mark="underline" tone="ink" className="mt-3">
            Found / Loved / Passed On
          </EditorialLabel>
        </div>

        {/* CTA */}
        <div className="motion-safe:animate-rise relative mt-8 flex flex-col items-start gap-3 pb-2 [animation-delay:420ms] lg:col-start-1 lg:col-span-4 lg:row-start-6 lg:mt-0 lg:pb-0">
          <FashionImage
            src="/images/fashion-08.jpg"
            alt="Contemporary feminine fashion styling"
            variant="portrait"
            className="-right-4 -top-16 -z-10 h-28 w-20 rotate-2 lg:hidden"
          />
          <JoinDrop />
          <EditorialLabel mark="star" tone="orange">
            Wear It. Love It. Pass It On.
          </EditorialLabel>
        </div>
      </div>
    </main>
  );
}
