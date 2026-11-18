"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT_WORDS = [
  "I",
  "believe",
  "great",
  "engineering",
  "needs",
  "focus.",
  "That’s",
  "why",
  "I",
  "keep",
  "my",
  "architecture",
  "clean",
  "and",
  "my",
  "involvement",
  "high,",
  "so",
  "every",
  "system",
  "gets",
  "my",
  "full",
  "attention.",
  "I",
  "build",
  "digital",
  "products",
  "from",
  "scratch",
  "or",
  "make",
  "them",
  "faster",
  "&",
  "smarter.",
];

// Multi-stop RGB color interpolation:
// Unrevealed (#d6d3d1) -> Oranye Sedikit Gelap (#d97706) -> Oranye Terang (#fbbf24)
// -> Oranye Gelap (#b45309) -> Hitam (#1c1917)
const COLOR_STOPS: [number, [number, number, number]][] = [
  [0.0, [214, 211, 209]], // #d6d3d1 (belum ke-scroll)
  [0.2, [217, 119, 6]],   // #d97706 (oranye sedikit gelap)
  [0.48, [251, 191, 36]], // #fbbf24 (oranye/amber terang)
  [0.76, [180, 83, 9]],   // #b45309 (oranye terang -> oranye gelap)
  [1.0, [28, 25, 23]],    // #1c1917 (hitam)
];

function sampleWaveColor(t: number): string {
  if (t <= 0) return "rgb(214, 211, 209)";
  if (t >= 1) return "rgb(28, 25, 23)";

  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const [t0, c0] = COLOR_STOPS[i];
    const [t1, c1] = COLOR_STOPS[i + 1];
    if (t >= t0 && t <= t1) {
      const localT = (t - t0) / (t1 - t0);
      // Smoothstep for extra silky color blending
      const s = localT * localT * (3 - 2 * localT);
      const r = Math.round(c0[0] + (c1[0] - c0[0]) * s);
      const g = Math.round(c0[1] + (c1[1] - c0[1]) * s);
      const b = Math.round(c0[2] + (c1[2] - c0[2]) * s);
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  return "rgb(28, 25, 23)";
}

export default function AboutScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const pill1Ref = useRef<HTMLDivElement>(null);
  const pill2Ref = useRef<HTMLDivElement>(null);
  const pill3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = charsRef.current.filter(Boolean) as HTMLSpanElement[];
      if (!chars.length || !pinWrapRef.current) return;

      // Sebelum di-scroll: semua huruf (termasuk huruf "I" pertama) 100% warna dasar tanpa kuning
      gsap.set(chars, {
        color: "rgb(214, 211, 209)",
        y: 0,
        scale: 1,
      });

      gsap.set([pill1Ref.current, pill2Ref.current, pill3Ref.current], {
        opacity: 0,
        scale: 0.5,
        y: 16,
      });

      const total = chars.length;
      const waveWidth = 22; // Lebar gelombang gradasi agar pembagian warna & skala halus dan rapi

      let p1Active = false;
      let p2Active = false;
      let p3Active = false;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=185%",
        pin: pinWrapRef.current,
        scrub: 0.45,
        onUpdate: (self) => {
          const p = self.progress;

          // Saat p === 0, head berada di -2 sehingga huruf pertama (idx=0) belum terkena gelombang warna sama sekali
          const waveHead = -2 + p * (total + waveWidth + 4);

          chars.forEach((ch, idx) => {
            const dist = waveHead - idx;
            if (dist <= 0) {
              ch.style.color = "rgb(214, 211, 209)";
              ch.style.transform = "translate3d(0px, 0px, 0px) scale(1)";
            } else if (dist < waveWidth) {
              const t = dist / waveWidth; // 0.0 -> 1.0
              // Cosine bell curve untuk besar-kecil huruf yang sangat smooth
              const bell = 0.5 * (1 - Math.cos(2 * Math.PI * t));
              const yOffset = (-3.5 * bell).toFixed(2);
              const scaleVal = (1 + 0.055 * bell).toFixed(3);

              ch.style.color = sampleWaveColor(t);
              ch.style.transform = `translate3d(0px, ${yOffset}px, 0px) scale(${scaleVal})`;
            } else {
              ch.style.color = "rgb(28, 25, 23)";
              ch.style.transform = "translate3d(0px, 0px, 0px) scale(1)";
            }
          });

          // Pop-up Pill 1 ("Clean Code Obsessed" — muncul pas teks kalimat 1 sudah hitam beberapa kata: p > 0.38)
          const showP1 = p > 0.38;
          if (showP1 !== p1Active && pill1Ref.current) {
            p1Active = showP1;
            gsap.to(pill1Ref.current, {
              opacity: showP1 ? 1 : 0,
              scale: showP1 ? 1 : 0.4,
              y: showP1 ? 0 : 20,
              rotate: showP1 ? -6 : -14,
              duration: 0.48,
              ease: "back.out(2)",
              overwrite: "auto",
            });
          }

          // Pop-up Pill 2 ("Nerding Out on Backend & AI" — muncul pas teks tengah sudah hitam: p > 0.68)
          const showP2 = p > 0.68;
          if (showP2 !== p2Active && pill2Ref.current) {
            p2Active = showP2;
            gsap.to(pill2Ref.current, {
              opacity: showP2 ? 1 : 0,
              scale: showP2 ? 1 : 0.4,
              y: showP2 ? 0 : 20,
              rotate: showP2 ? 5 : 14,
              duration: 0.48,
              ease: "back.out(2)",
              overwrite: "auto",
            });
          }

          // Pop-up Pill 3 ("Allergic to Slow Queries" — muncul di akhir setelah teks bawah hitam: p > 0.90)
          const showP3 = p > 0.90;
          if (showP3 !== p3Active && pill3Ref.current) {
            p3Active = showP3;
            gsap.to(pill3Ref.current, {
              opacity: showP3 ? 1 : 0,
              scale: showP3 ? 1 : 0.4,
              y: showP3 ? 0 : 20,
              rotate: showP3 ? -4 : 10,
              duration: 0.48,
              ease: "back.out(2)",
              overwrite: "auto",
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let charCounter = 0;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-stone-50/70 border-b border-stone-200/80 overflow-hidden"
    >
      <div
        ref={pinWrapRef}
        className="min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 md:px-20 py-24 relative"
      >
        {/* Background subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-amber-100/35 rounded-full blur-3xl pointer-events-none" />

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-amber-600 mb-12 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 shadow-2xs">
          <span>✦</span>
          <span>A Bit About Me</span>
        </div>

        {/* Main Statement Paragraph with Tactile Overlapping Floating Pills */}
        <div className="relative max-w-5xl mx-auto text-center py-6">
          {/* Pill 1: Muncul menimpa baris atas setelah kata-kata awal sudah berwarna hitam */}
          <div
            ref={pill1Ref}
            className="pointer-events-none hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider shadow-2xl border-2 border-stone-900 absolute top-[12%] left-[16%] lg:left-[20%] z-20"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Clean Code Obsessed</span>
          </div>

          {/* Pill 2: Muncul menimpa baris tengah setelah teksnya sudah berwarna hitam */}
          <div
            ref={pill2Ref}
            className="pointer-events-none hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-stone-900 text-amber-400 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xl border-2 border-amber-400 absolute top-[44%] right-[4%] lg:right-[10%] xl:right-[15%] z-20"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            <span>Nerding Out on Backend &amp; AI</span>
          </div>

          {/* Pill 3: Muncul menimpa baris bawah setelah kata-kata penutup sudah hitam */}
          <div
            ref={pill3Ref}
            className="pointer-events-none hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider shadow-2xl border-2 border-stone-900 absolute bottom-[8%] left-[28%] lg:left-[32%] z-20"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>Allergic to Slow Queries</span>
          </div>

          {/* Split-Character Text */}
          <p className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-bold leading-[1.2] tracking-tight select-none">
            {STATEMENT_WORDS.map((word, wIdx) => {
              const chars = word.split("");
              return (
                <span
                  key={wIdx}
                  className="inline-block whitespace-nowrap mr-[0.26em]"
                >
                  {chars.map((c, cIdx) => {
                    const idx = charCounter++;
                    return (
                      <span
                        key={cIdx}
                        ref={(el) => {
                          charsRef.current[idx] = el;
                        }}
                        style={{ color: "rgb(214, 211, 209)" }}
                        className="inline-block will-change-transform"
                      >
                        {c}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </p>
        </div>

        {/* Mobile Pills Row */}
        <div className="flex md:hidden flex-wrap justify-center gap-2 mt-8">
          <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-mono text-[11px] font-bold uppercase -rotate-2">
            ⚡ Clean Code Obsessed
          </span>
          <span className="px-3 py-1 rounded-full bg-stone-900 text-amber-400 font-mono text-[11px] font-bold uppercase rotate-2">
            🛠️ Backend &amp; AI
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[11px] font-bold uppercase -rotate-1">
            🚀 Allergic to Slow Queries
          </span>
        </div>
      </div>
    </section>
  );
}
