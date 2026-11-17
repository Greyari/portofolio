"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import OrbitClock from "@/components/OrbitClock";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const clockWrapRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftContentRef.current) {
        gsap.fromTo(
          Array.from(leftContentRef.current.children),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.25,
          }
        );
      }
      if (clockWrapRef.current) {
        gsap.fromTo(
          clockWrapRef.current,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            delay: 0.45,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("tupang1017@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="overview"
      ref={containerRef}
      className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24 pt-24 pb-16 overflow-hidden bg-stone-50/40"
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none opacity-30 bg-grid-subtle"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 45%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 45%, transparent 82%)",
        }}
      />

      {/* Subtle Warm Atmospheric Glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-stone-200/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Content Grid */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column: Editorial Information */}
        <div
          ref={leftContentRef}
          className="lg:col-span-7 max-w-2xl order-2 lg:order-1"
        >
          {/* Status & Location Pill (Tanpa titik hijau) */}
          <div className="flex flex-wrap items-center gap-2 mb-6 opacity-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-200/90 bg-amber-50/90 text-stone-800 text-xs font-mono shadow-xs">
              <span className="font-semibold text-amber-900">
                Available for Work
              </span>
              <span className="text-amber-500 font-serif">✦</span>
              <span className="text-stone-600">Batam, ID</span>
            </div>
          </div>

          {/* Large Boutique Heading */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-stone-900 leading-[0.96] tracking-tight mb-5 opacity-0">
            Grey Ari
            <br />
            <span className="text-stone-400 font-normal">Daniel S.</span>
          </h1>

          {/* Subtitle / Role */}
          <div className="flex items-center gap-3 mb-6 opacity-0">
            <span className="h-0.5 w-10 bg-amber-400 rounded-full" />
            <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-stone-700 font-semibold">
              Full-Stack Developer &amp; AI / IoT Engineer
            </p>
          </div>

          {/* Narrative Statement */}
          <p className="text-stone-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mb-7 opacity-0">
            Full-stack Developer &amp; backend specialist yang membangun sistem
            digital dari nol — mulai dari arsitektur server tangguh, integrasi
            AI &amp; IoT, hingga antarmuka modern yang terasa <em>smooth</em>{" "}
            dan presisi.
          </p>

          {/* Key Tech Badges */}
          <div className="flex flex-wrap gap-2 mb-9 opacity-0">
            {[
              "Laravel",
              "Next.js",
              "Flutter",
              ".NET",
              "MySQL",
              "YOLO AI",
              "Raspberry Pi",
            ].map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium px-3.5 py-1.5 rounded-full border border-stone-200 bg-white/95 text-stone-700 hover:border-amber-400 hover:bg-amber-50 transition-colors shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 opacity-0">
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-amber-500 hover:text-stone-950 transition-all duration-300 shadow-md hover:shadow-amber-200"
            >
              <span>Lihat Selected Works</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-stone-200 bg-white/95 text-stone-700 text-sm font-medium hover:border-amber-400 hover:text-amber-700 transition-all duration-300 shadow-xs cursor-pointer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4 text-stone-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>{copied ? "Email Tersalin! ✓" : "Salin Email"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Quynh.moe-Inspired Floating OrbitClock */}
        <div
          ref={clockWrapRef}
          className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2 w-full select-none"
        >
          <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[430px] aspect-square flex items-center justify-center">
            <OrbitClock />
          </div>
        </div>
      </div>
    </section>
  );
}
