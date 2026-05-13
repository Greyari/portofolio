import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grey Ari Daniel Simatupang — Full-Stack Developer",
  description:
    "Portfolio pribadi Grey Ari Daniel Simatupang. Full-stack developer spesialis Laravel, Next.js, dan React.",
  keywords: ["portfolio", "full-stack developer", "Laravel", "Next.js", "React", "Batam"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DM Serif Display — untuk heading besar */}
        {/* Instrument Sans — untuk body teks yang terasa premium */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-stone-900">
        {children}
      </body>
    </html>
  );
}