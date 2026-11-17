import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DM_Serif_Display, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Grey Ari Daniel Simatupang — Full-Stack Engineer & System Architect",
  description:
    "Boutique Company Profile & Portfolio of Grey Ari Daniel Simatupang. Full-stack developer & engineer specializing in Laravel, Next.js, Flutter, AI/IoT, and high-performance digital systems.",
  keywords: [
    "Grey Ari Daniel Simatupang",
    "Full-Stack Developer",
    "Boutique Portfolio",
    "Company Profile",
    "Laravel Specialist",
    "Next.js Developer",
    "React",
    "Flutter",
    "IoT YOLO",
    "Batam",
    "Indonesia",
  ],
  authors: [{ name: "Grey Ari Daniel Simatupang" }],
  openGraph: {
    title: "Grey Ari Daniel Simatupang — Full-Stack Engineer & System Architect",
    description:
      "Engineering robust backend architectures, modern web interfaces, and AI/IoT solutions.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={cn(
        "scroll-smooth",
        dmSerifDisplay.variable,
        instrumentSans.variable,
        jetBrainsMono.variable
      )}
    >
      <body className="antialiased bg-white text-stone-900 selection:bg-amber-200 selection:text-stone-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
