"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Lanyard from "./reactbits/Lanyard";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftContentRef.current?.children ? Array.from(leftContentRef.current.children) : [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-28 pt-20"
      style={{ overflow: 'hidden' }}  
    >
      {/* Background dot grid */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }}
      />

      {/* Lanyard wrapper — overflow VISIBLE agar kartu bisa keluar dari kolom kanan */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 2, pointerEvents: 'none' }}
      >
        <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={true} />
        </div>
      </div>


      {/* ✅ Grid hanya untuk teks, z-index di atas canvas */}
      <div
        className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10 lg:mt-0"
        style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}  
      >
        {/* KOLOM KIRI: Teks */}
        <div
          ref={leftContentRef}
          className="max-w-xl order-2 lg:order-1"
          style={{ pointerEvents: 'auto' }}
        >
          
          <span className="inline-block font-mono text-xs tracking-widest uppercase text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-6 opacity-0">
            👋 Available for work
          </span>

          <h1
            className="font-display text-5xl md:text-7xl font-bold text-stone-900 leading-none tracking-tight mb-4 opacity-0"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Grey Ari
            <br />
            <span className="text-stone-400">Daniel S.</span>
          </h1>

          <div className="h-px w-full max-w-sm bg-gradient-to-r from-amber-400 to-transparent mb-6 opacity-0" />

          <p
            className="text-lg md:text-xl text-stone-600 leading-relaxed mb-6 opacity-0"
            style={{ fontFamily: "'Instrument Sans', 'DM Sans', sans-serif" }}
          >
            Full-stack Developer — saya suka membangun produk yang bermanfaat,
            dari backend yang solid sampai UI yang terasa <em>smooth</em>.
          </p>

          <div className="flex flex-wrap gap-2 mb-10 opacity-0">
            {["Laravel", "Next.js", "React", "TypeScript", "MySQL"].map((t) => (
              <span
                key={t}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-stone-200 bg-white text-stone-600 shadow-sm"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 opacity-0">
            <a
              href="#experience"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-amber-500 transition-colors duration-300 shadow-md"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              Lihat Pengalaman
            </a>
          </div>
        </div>

        {/* ✅ Kolom kanan: kosong, space visual saja */}
        <div className="hidden lg:block order-1 lg:order-2" />
      </div>
    </section>
  );
}