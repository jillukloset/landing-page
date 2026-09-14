import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://jillukloset.com";
const TITLE = "Jillu Kloset — Pre-Loved. Re-Loved.";
const DESCRIPTION =
  "Jillu Kloset is a Gen-Z fashion resale marketplace. The closet opens in 12 days — join the drop for first access to pre-loved, re-loved fashion.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Jillu Kloset",
    "pre-loved fashion",
    "Gen-Z fashion",
    "fashion resale",
    "second-hand fashion",
    "re-loved fashion",
  ],
  applicationName: "Jillu Kloset",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Jillu Kloset",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f1e8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full bg-cream font-sans text-ink antialiased">
        {children}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
