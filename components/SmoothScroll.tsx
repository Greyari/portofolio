"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    // Initialize standard Lenis smooth scrolling (same engine Two26 Studio uses)
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis directly from GSAP ticker for 120fps lockstep
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Disable GSAP lag smoothing to prevent scroll jumps
    gsap.ticker.lagSmoothing(0);

    // Seamless anchor link handling
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest("a[href^='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      if (href === "#" || href === "#overview") {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.1 });
        return;
      }

      const targetEl = document.querySelector(href) as HTMLElement | null;
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, { duration: 1.1, offset: -24 });
      }
    };

    document.addEventListener("click", onAnchorClick);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return null;
}
