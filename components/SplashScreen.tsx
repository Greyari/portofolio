"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const sigPath1Ref = useRef<SVGPathElement>(null);
  const sigPath2Ref = useRef<SVGPathElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const curtainStoneRef = useRef<SVGPathElement>(null);
  const curtainAmberRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const sig1 = sigPath1Ref.current;
    const sig2 = sigPath2Ref.current;
    const curtainStone = curtainStoneRef.current;
    const curtainAmber = curtainAmberRef.current;
    const badge = badgeRef.current;

    if (!sig1 || !sig2 || !curtainStone || !curtainAmber) return;

    const len1 = sig1.getTotalLength();
    const len2 = sig2.getTotalLength();
    const curtainLen1 = curtainStone.getTotalLength();
    const curtainLen2 = curtainAmber.getTotalLength();

    gsap.set(sig1, { strokeDasharray: len1, strokeDashoffset: len1 });
    gsap.set(sig2, { strokeDasharray: len2, strokeDashoffset: len2 });
    gsap.set(curtainStone, { strokeDasharray: curtainLen1, strokeDashoffset: 0 });
    gsap.set(curtainAmber, { strokeDasharray: curtainLen2, strokeDashoffset: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
      },
    });

    // 1. Draw center signature cursive stroke (Two26 style)
    tl.to(sig1, {
      strokeDashoffset: 0,
      duration: 1.05,
      ease: "power2.inOut",
    })
      .to(
        sig2,
        {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.45"
      )
      .fromTo(
        badge,
        { opacity: 0, y: 12, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
        "-=0.5"
      )
      // 2. Fade out center logo & badge before diagonal brush wipe
      .to(
        [sig1, sig2, badge],
        {
          opacity: 0,
          scale: 0.96,
          duration: 0.3,
          ease: "power2.in",
        },
        "+=0.2"
      )
      // 3. Two-tone diagonal mega-brush curtain wipe (Stone -> Amber -> Reveal Hero)
      .to(
        curtainStone,
        {
          strokeDashoffset: -curtainLen1,
          duration: 0.75,
          ease: "power3.inOut",
        },
        "-=0.1"
      )
      .to(
        curtainAmber,
        {
          strokeDashoffset: curtainLen2,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "-=0.58"
      );

    return () => {
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      aria-hidden="true"
      className="fixed inset-0 z-[99999] w-full h-[100dvh] flex items-center justify-center overflow-hidden pointer-events-auto select-none"
    >
      {/* Background Two-Tone Diagonal Brush Curtain Wipe (Two26 Studio style) */}
      <svg
        viewBox="0 0 1500 1093"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        fill="none"
      >
        {/* Bottom-layer Amber Mega Brush */}
        <path
          ref={curtainAmberRef}
          d="M1680 -120 C 1150 280, 620 650, -180 1220"
          stroke="#f59e0b"
          strokeWidth="3000"
          strokeLinecap="round"
        />
        {/* Top-layer Warm Cream/Stone Mega Brush */}
        <path
          ref={curtainStoneRef}
          d="M-180 -120 C 420 350, 980 720, 1680 1220"
          stroke="#fafaf9"
          strokeWidth="3000"
          strokeLinecap="round"
        />
      </svg>

      {/* Center Continuous Hand-Drawn Cursive Signature ("Grey26" / Grey Ari loop) */}
      <div className="relative z-[2] flex flex-col items-center justify-center px-6">
        <svg
          viewBox="0 0 920 360"
          className="w-[310px] sm:w-[520px] md:w-[680px] h-auto overflow-visible"
          fill="none"
        >
          {/* Continuous expressive hand-drawn signature loop */}
          <path
            ref={sigPath1Ref}
            d="M 190 95 C 95 75, 55 165, 115 225 C 165 270, 245 230, 250 165 C 252 140, 235 280, 195 315 C 155 345, 115 310, 165 265 C 235 205, 305 155, 330 215 C 345 160, 385 155, 410 185 C 445 185, 485 155, 465 135 C 440 115, 405 165, 435 210 C 465 245, 525 210, 545 155 C 555 215, 595 225, 625 155 C 635 225, 610 315, 565 325 C 525 335, 515 285, 585 245 C 665 200, 745 145, 815 115"
            stroke="#f59e0b"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Secondary accent underline & dev bracket */}
          <path
            ref={sigPath2Ref}
            d="M 240 285 C 390 255, 610 235, 835 245 M 785 85 L 845 115 L 795 160"
            stroke="#1c1917"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Boutique Studio Tag */}
        <div
          ref={badgeRef}
          className="mt-2 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-stone-900 text-amber-400 font-mono text-xs tracking-widest uppercase shadow-lg opacity-0"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Grey Ari • Full-Stack &amp; AI Studio</span>
        </div>
      </div>
    </div>
  );
}
