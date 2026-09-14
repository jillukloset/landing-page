# Jillu Kloset — Launch Site

**PRE-LOVED. RE-LOVED.**

A single-viewport launch page for Jillu Kloset, a Gen-Z fashion resale
marketplace. Built with Next.js (App Router), React, TypeScript and
Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Rescheduling the launch

The countdown is driven by a single timestamp in [lib/countdown.ts](lib/countdown.ts):

```ts
export const LAUNCH_DATE = new Date("2026-09-26T00:00:00+05:30");
```

Change that date to reschedule the drop — everything else (days/hours/
minutes/seconds, the "closet is open" state) is derived from it.

## Replacing the photography

Placeholder images live in `public/images/fashion-01.jpg` through
`fashion-12.jpg` (see [components/launch/FashionCollage.tsx](components/launch/FashionCollage.tsx)
for what each slot represents — full look, street style, portrait, detail
crops, etc.). Drop in real photography at the same filenames and the
collage layout will pick it up as-is; adjust `variant`/`frame`/`className`
per slot if a new image's crop or orientation calls for it.

## Architecture

```text
app/
  layout.tsx        — fonts, metadata, viewport
  page.tsx           — renders LaunchExperience (server component)
  globals.css         — Tailwind theme tokens, grain texture, keyframes
  icon.tsx / opengraph-image.tsx — generated favicon + OG image

components/launch/
  LaunchExperience.tsx — composes the whole page (server)
  Countdown.tsx         — the live timer (client — the only piece that ticks)
  BrandMark.tsx          — wordmark (server)
  FashionCollage.tsx      — desktop collage layout (server)
  FashionImage.tsx         — reusable image-slot component (server)
  EditorialLabel.tsx        — small magazine-style annotations (server)
  JoinDrop.tsx                — CTA + email-capture dialog (client)

lib/
  countdown.ts — pure date-math, no UI
```

Only `Countdown.tsx` and `JoinDrop.tsx` ship client JavaScript; everything
else renders on the server.

## Wiring up the email capture

`JoinDrop.tsx` currently shows a success state locally without sending
anywhere — swap the `handleSubmit` placeholder for a real API route or
email-service call before launch.
