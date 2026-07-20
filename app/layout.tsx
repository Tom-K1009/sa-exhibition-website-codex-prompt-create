import type { Metadata } from "next";
import { Instrument_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://sa-exhibition-2026.netlify.app/"
  ),
  title: "SA Exhibition 2026 | Digital Hollywood University",
  description:
    "SA Exhibition 2026 is a premium student showcase from Digital Hollywood University featuring English storytelling through film, music video, and digital media.",
  keywords: [
    "SA Exhibition 2026",
    "Digital Hollywood University",
    "student exhibition",
    "music video",
    "short film",
    "English class"
  ],
  openGraph: {
    title: "SA Exhibition 2026",
    description:
      "Discover Creativity. Share Stories. Experience Inspiration.",
    type: "website",
    images: [
      "https://sa-exhibition-2026.netlify.app/hero-skyline.png"
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
