"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Editorial Boutique Splash Screen & Preloader
 * Clean, high-end studio aesthetic:
 * - Architectural metadata header
 * - Mask-reveal editorial typography ("GREY ARI.")
 * - Precision monospace percentage counter (00% -> 100%) with hairline progress track
 * - Dual-layer luxury curtain reveal (Stone-950 -> Amber slipstream -> Hero reveal)
 */
export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const stoneCurtainRef = useRef<HTMLDivElement>(null);
  const amberCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Lock scroll during splash screen presentation
    document.body.style.overflow = "hidden";

    const countObj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setVisible(false);
      },
    });

    // Initial states: title words hidden beneath overflow mask
    gsap.set([title1Ref.current, title2Ref.current], {
      yPercent: 120,
      opacity: 0,
    });
    gsap.set(progressBarRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });

    // 1. Entrance: Editorial title smoothly slides up through the mask
    tl.to([title1Ref.current, title2Ref.current], {
      yPercent: 0,
      opacity: 1,
      duration: 0.65,
      stagger: 0.08,
      ease: "power3.out",
      delay: 0.1,
    })
      // 2. Precision Counter & Progress Bar: 0% -> 100% count-up
      .to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: 0.95,
          ease: "power2.inOut",
        },
        "-=0.4"
      )
      .to(
        countObj,
        {
          val: 100,
          duration: 0.95,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              const num = Math.round(countObj.val);
              counterRef.current.textContent = String(num).padStart(2, "0");
            }
          },
        },
        "<"
      )
      // Status update at 100%
      .call(() => {
        if (statusRef.current) {
          statusRef.current.textContent = "SYSTEM READY";
          statusRef.current.className = "text-amber-400 font-bold tracking-wider";
        }
      })
      // Brief pause at 100% (120ms)
      .to({}, { duration: 0.12 })
      // 3. Graceful lift of center text
      .to(contentRef.current, {
        y: -28,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      })
      // 4. Staggered Dual-Curtain Upward Sweep (Stone -> Amber slipstream -> Reveal Hero)
      .to(
        stoneCurtainRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "-=0.1"
      )
      .to(
        amberCurtainRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "-=0.68"
      );

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
    >
      {/* Background Amber Curtain (Reveals as secondary trailing slipstream) */}
      <div
        ref={amberCurtainRef}
        className="absolute inset-0 w-full h-full bg-amber-500 pointer-events-auto"
      />

      {/* Main Stone Obsidian Curtain */}
      <div
        ref={stoneCurtainRef}
        className="absolute inset-0 w-full h-full bg-stone-950 text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 pointer-events-auto"
      >
        {/* Top Architectural Metadata */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs tracking-[0.2em] text-stone-400 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-stone-200 font-semibold">Grey Ari Daniel</span>
          </div>
          <div className="hidden sm:block text-stone-500">
            PORTFOLIO • 2026
          </div>
          <div className="text-stone-400">BATAM, ID • UTC+7</div>
        </div>

        {/* Center Editorial Title & Subtitle */}
        <div
          ref={contentRef}
          className="my-auto text-center flex flex-col items-center px-4"
        >
          <div className="overflow-hidden py-1">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white uppercase leading-none">
              <span ref={title1Ref} className="inline-block">
                GREY ARI
              </span>
              <span className="text-amber-500">.</span>
            </h1>
          </div>

          <div className="overflow-hidden mt-3 sm:mt-4">
            <p
              ref={title2Ref}
              className="font-mono text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] text-stone-400 uppercase font-medium"
            >
              Full-Stack &amp; System Architecture
            </p>
          </div>
        </div>

        {/* Bottom Progress & Metrics Bar */}
        <div className="w-full max-w-xl mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between font-mono text-xs sm:text-sm tracking-wider">
            <span
              ref={statusRef}
              className="text-stone-400 transition-colors duration-200 text-[11px] sm:text-xs tracking-widest"
            >
              INITIALIZING...
            </span>
            <div className="flex items-baseline gap-0.5 text-amber-400 font-bold tabular-nums">
              <span ref={counterRef} className="text-xl sm:text-2xl font-mono">
                00
              </span>
              <span className="text-xs text-amber-500/80 font-mono">%</span>
            </div>
          </div>

          {/* Minimal Precision Hairline Progress Track */}
          <div className="w-full h-[2px] bg-stone-800 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
