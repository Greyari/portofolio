"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const greetRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        greetRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 40, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
          "-=0.3"
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
          "-=0.4"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          badgesRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-28 py-24 overflow-hidden"
    >
      {/* Background dot grid */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }}
      />
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-stone-50 via-white to-amber-50/60" />

      {/* Decorative circle */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-amber-100/40 blur-3xl -z-10" />

      <div className="max-w-4xl w-full">
        {/* Greeting tag */}
        <span
          ref={greetRef}
          className="inline-block font-mono text-xs tracking-widest uppercase text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-6 opacity-0"
        >
          👋 Available for work
        </span>

        {/* Name */}
        <h1
          ref={nameRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-stone-900 leading-none tracking-tight mb-4 opacity-0"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Grey Ari
          <br />
          <span className="text-stone-400">Daniel S.</span>
        </h1>

        {/* Divider line */}
        <div
          ref={lineRef}
          className="h-px w-full max-w-sm bg-gradient-to-r from-amber-400 to-transparent mb-6 opacity-0"
          style={{ opacity: 1 }}
        />

        {/* Description */}
        <p
          ref={descRef}
          className="text-lg md:text-xl text-stone-600 max-w-xl leading-relaxed mb-6 opacity-0"
          style={{ fontFamily: "'Instrument Sans', 'DM Sans', sans-serif" }}
        >
          Full-stack Developer — saya suka membangun produk yang bermanfaat,
          dari backend yang solid sampai UI yang terasa <em>smooth</em>.
        </p>

        {/* Tech badges */}
        <div
          ref={badgesRef}
          className="flex flex-wrap gap-2 mb-10 opacity-0"
        >
          {["Laravel", "Next.js", "React", "TypeScript", "MySQL"].map((t) => (
            <span
              key={t}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-stone-200 bg-white text-stone-600 shadow-sm hover:border-amber-300 hover:text-amber-700 transition-colors duration-200"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
          <a
            href="#experience"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-amber-500 transition-colors duration-300 shadow-md"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            Lihat Pengalaman
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 text-stone-700 text-sm font-medium hover:border-stone-900 transition-colors duration-200"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            Hubungi Saya
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <span
          className="text-xs text-stone-400 tracking-widest uppercase"
          style={{ fontFamily: "monospace" }}
        >
          scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-stone-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}