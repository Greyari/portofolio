"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Playful Per-Character Jitter Link (Two26 `.footer-link` mechanic) ───────
function JitterLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMouseEnter = () => {
    charsRef.current.forEach((el, i) => {
      if (!el) return;
      const rot = (i % 2 === 0 ? 1 : -1) * (3 + (i % 4) * 1.5);
      gsap.to(el, {
        y: -2.5,
        rotate: rot,
        scale: 1.08,
        duration: 0.22,
        ease: "back.out(2)",
      });
    });
  };

  const handleMouseLeave = () => {
    charsRef.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    });
  };

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center gap-1.5 font-sans text-lg sm:text-xl font-semibold text-stone-950 hover:text-white transition-colors py-0.5"
    >
      <span className="inline-block">
        {label.split("").map((ch, idx) => (
          <span
            key={idx}
            ref={(el) => {
              charsRef.current[idx] = el;
            }}
            className="inline-block will-change-transform"
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
      {external && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.3}
          className="w-3.5 h-3.5 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 17L17 7M17 7H7M17 7v10"
          />
        </svg>
      )}
    </a>
  );
}

interface ControlPoint {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function Contact() {
  const footerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rope1Ref = useRef<SVGPathElement>(null);
  const rope2Ref = useRef<SVGPathElement>(null);
  const rope3Ref = useRef<SVGPathElement>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // ── Edge-to-Edge Elastic Squish / Jelly Rope Physics Simulation ────────────
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Control points for 3 corner-to-corner looping ropes (in 1440x900 viewBox space)
    const pts: ControlPoint[] = [
      // Rope 1: Top-Left Corner (0,0) -> looping across -> Bottom-Right Corner (1440, 900)
      { baseX: 340, baseY: 160, x: 340, y: 160, vx: 0, vy: 0 },
      { baseX: 520, baseY: 640, x: 520, y: 640, vx: 0, vy: 0 },
      { baseX: 980, baseY: 220, x: 980, y: 220, vx: 0, vy: 0 },
      { baseX: 1180, baseY: 720, x: 1180, y: 720, vx: 0, vy: 0 },
      // Rope 2: Top-Right Corner (1440,0) -> looping across -> Bottom-Left Corner (0, 900)
      { baseX: 1120, baseY: 140, x: 1120, y: 140, vx: 0, vy: 0 },
      { baseX: 820, baseY: 580, x: 820, y: 580, vx: 0, vy: 0 },
      { baseX: 420, baseY: 260, x: 420, y: 260, vx: 0, vy: 0 },
      { baseX: 240, baseY: 740, x: 240, y: 740, vx: 0, vy: 0 },
      // Rope 3: Left Edge (0, 460) -> Right Edge (1440, 420)
      { baseX: 460, baseY: 380, x: 460, y: 380, vx: 0, vy: 0 },
      { baseX: 980, baseY: 540, x: 980, y: 540, vx: 0, vy: 0 },
    ];

    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, lastX: -9999, lastY: -9999 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      // Map client coordinates to 1440x900 SVG coordinate space
      const mx = ((e.clientX - rect.left) / rect.width) * 1440;
      const my = ((e.clientY - rect.top) / rect.height) * 900;
      if (mouse.lastX !== -9999) {
        mouse.vx = mx - mouse.lastX;
        mouse.vy = my - mouse.lastY;
      }
      mouse.x = mx;
      mouse.y = my;
      mouse.lastX = mx;
      mouse.lastY = my;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let rafId = 0;
    let prev = performance.now();

    const animateRopes = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.04);
      prev = now;

      // Underdamped spring constants for wobbly "squish jelly" elasticity!
      const stiffness = 95;
      const damping = 5.2;
      const radius = 340;

      pts.forEach((p, i) => {
        // Continuous organic jelly breathing wave
        const waveX = Math.sin(now * 0.0022 + i * 1.1) * 26;
        const waveY = Math.cos(now * 0.0019 + i * 0.9) * 26;
        const targetX = p.baseX + waveX;
        const targetY = p.baseY + waveY;

        // Mouse squish/pluck impulse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < radius) {
          const factor = Math.pow(1 - dist / radius, 1.5);
          p.vx += mouse.vx * factor * 9.5;
          p.vy += mouse.vy * factor * 9.5;
        }

        // Spring-damper integration
        const fx = -stiffness * (p.x - targetX) - damping * p.vx;
        const fy = -stiffness * (p.y - targetY) - damping * p.vy;
        p.vx += fx * dt;
        p.vy += fy * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      });

      mouse.vx *= 0.82;
      mouse.vy *= 0.82;

      // Build smooth SVG Bezier paths anchored flush into the 4 screen corners
      if (rope1Ref.current) {
        const [p0, p1, p2, p3] = pts;
        const mid1X = (p0.x + p1.x) * 0.5;
        const mid1Y = (p0.y + p1.y) * 0.5;
        const mid2X = (p1.x + p2.x) * 0.5;
        const mid2Y = (p1.y + p2.y) * 0.5;
        const mid3X = (p2.x + p3.x) * 0.5;
        const mid3Y = (p2.y + p3.y) * 0.5;
        rope1Ref.current.setAttribute(
          "d",
          `M -40 -40 Q ${p0.x.toFixed(1)} ${p0.y.toFixed(1)}, ${mid1X.toFixed(1)} ${mid1Y.toFixed(1)} T ${mid2X.toFixed(1)} ${mid2Y.toFixed(1)} T ${mid3X.toFixed(1)} ${mid3Y.toFixed(1)} Q ${p3.x.toFixed(1)} ${p3.y.toFixed(1)}, 1480 940`
        );
      }

      if (rope2Ref.current) {
        const p4 = pts[4];
        const p5 = pts[5];
        const p6 = pts[6];
        const p7 = pts[7];
        const m1X = (p4.x + p5.x) * 0.5;
        const m1Y = (p4.y + p5.y) * 0.5;
        const m2X = (p5.x + p6.x) * 0.5;
        const m2Y = (p5.y + p6.y) * 0.5;
        const m3X = (p6.x + p7.x) * 0.5;
        const m3Y = (p6.y + p7.y) * 0.5;
        rope2Ref.current.setAttribute(
          "d",
          `M 1480 -40 Q ${p4.x.toFixed(1)} ${p4.y.toFixed(1)}, ${m1X.toFixed(1)} ${m1Y.toFixed(1)} T ${m2X.toFixed(1)} ${m2Y.toFixed(1)} T ${m3X.toFixed(1)} ${m3Y.toFixed(1)} Q ${p7.x.toFixed(1)} ${p7.y.toFixed(1)}, -40 940`
        );
      }

      if (rope3Ref.current) {
        const p8 = pts[8];
        const p9 = pts[9];
        rope3Ref.current.setAttribute(
          "d",
          `M -40 480 C ${p8.x.toFixed(1)} ${p8.y.toFixed(1)}, ${p9.x.toFixed(1)} ${p9.y.toFixed(1)}, 1480 420`
        );
      }

      if (isVisible) {
        rafId = requestAnimationFrame(animateRopes);
      }
    };

    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          prev = performance.now();
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(animateRopes);
        } else {
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(footer);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // ── Scroll Entrance Animations ───────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 88%",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("tupang1017@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <>
      <footer
        id="contact"
        ref={footerRef}
        className="relative w-full pt-24 pb-4 bg-amber-500 text-stone-950 overflow-hidden select-none"
      >
        {/* Full-Bleed Corner-to-Corner Interactive Jelly Ropes SVG (`.footer-texture`) */}
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          fill="none"
        >
          <path
            ref={rope1Ref}
            stroke="#d97706"
            strokeOpacity="0.45"
            strokeWidth="22"
            strokeLinecap="round"
          />
          <path
            ref={rope2Ref}
            stroke="#b45309"
            strokeOpacity="0.28"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            ref={rope3Ref}
            stroke="#fef3c7"
            strokeOpacity="0.32"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>

        {/* Top Content Container */}
        <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-10 md:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-950/15">
            {/* Left Column (`.footer-top-left` in Two26 Studio) */}
            <div
              ref={headingRef}
              className="lg:col-span-7 flex flex-col items-start"
            >
              <h2 className="font-sans text-4xl sm:text-6xl md:text-[68px] font-bold text-[#fafaf9] leading-[1.02] tracking-tight mb-8 max-w-xl">
                Okay, that&apos;s enough
                <br />
                website for today.
              </h2>

              {/* Let's Talk CTA Pill + Copy Email */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  onClick={() => setOverlayOpen(true)}
                  className="group inline-flex items-center gap-4 pl-7 pr-2.5 py-2.5 rounded-full bg-stone-950 text-[#fafaf9] font-sans text-base sm:text-lg font-semibold tracking-tight hover:bg-stone-900 transition-all shadow-lg cursor-pointer"
                >
                  <span>Let&apos;s Talk</span>
                  <span className="w-10 h-10 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center group-hover:rotate-45 transition-transform">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.4}
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M17 7H7M17 7v10"
                      />
                    </svg>
                  </span>
                </button>

                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#fafaf9]/90 hover:bg-white text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  <span>{copied ? "Email Copied! ✓" : "Copy Email"}</span>
                </button>
              </div>

              {/* Direct Email Link */}
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-stone-950/65 font-semibold mb-1">
                  Email directly
                </p>
                <a
                  href="mailto:tupang1017@gmail.com"
                  className="font-sans text-xl sm:text-2xl font-bold text-stone-950 hover:text-white transition-colors"
                >
                  tupang1017@gmail.com
                </a>
              </div>
            </div>

            {/* Right Column (`.footer-top-right` in Two26 Studio) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-10">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-stone-950/60 mb-3">
                    Main Menu
                  </p>
                  <ul className="flex flex-col gap-1">
                    <li>
                      <JitterLink href="#overview" label="Overview" />
                    </li>
                    <li>
                      <JitterLink href="#about" label="About Me" />
                    </li>
                    <li>
                      <JitterLink href="#projects" label="Selected Works" />
                    </li>
                    <li>
                      <JitterLink href="#services" label="My Thing" />
                    </li>
                    <li>
                      <JitterLink href="#skills" label="Tech Stack" />
                    </li>
                    <li>
                      <JitterLink href="#faq" label="FAQ" />
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-stone-950/60 mb-3">
                    Socials
                  </p>
                  <ul className="flex flex-col gap-1">
                    <li>
                      <JitterLink
                        href="https://github.com/Greyari"
                        label="GitHub"
                        external
                      />
                    </li>
                    <li>
                      <JitterLink
                        href="https://www.linkedin.com/in/grey-ari-daniel-a27649368"
                        label="LinkedIn"
                        external
                      />
                    </li>
                    <li>
                      <JitterLink
                        href="mailto:tupang1017@gmail.com"
                        label="Email"
                        external
                      />
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Right Meta Row (`.footer-top-right-btm`) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-6 border-t border-stone-950/15 font-sans text-sm font-medium text-stone-950">
                <span>Handmade by human. Well, digitally.</span>
                <span className="font-semibold">Batam, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Bottom Section: Copyright (`.footer-btm`) */}
          <div className="pt-8 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-4 font-sans text-xs font-semibold text-stone-950/75">
              <span>
                © Copyright {new Date().getFullYear()} — Grey Ari Daniel
                Simatupang
              </span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Two26 Studio Full-Screen "LET'S TALK" Contact Overlay Modal */}
      {overlayOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-amber-500 text-stone-950 flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between max-w-6xl w-full mx-auto">
            <span className="font-display font-bold text-xl text-stone-950">
              Grey Ari • Studio
            </span>
            <button
              onClick={() => setOverlayOpen(false)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-stone-950 font-mono text-xs font-bold uppercase tracking-wider border-2 border-stone-950 shadow-md hover:bg-stone-950 hover:text-white transition-colors cursor-pointer"
            >
              <span>× Close</span>
            </button>
          </div>

          {/* Center Content */}
          <div className="max-w-6xl w-full mx-auto my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="inline-block font-mono text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-stone-950 text-amber-400 mb-4">
                Available for Freelance &amp; Full-Time
              </span>
              <h3 className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold text-[#fafaf9] uppercase leading-[0.96] tracking-tight mb-4">
                Want to start a new project?
              </h3>
              <p className="font-display text-2xl sm:text-3xl text-stone-950 italic mb-8">
                or just say hello &amp; talk tech!
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="font-mono text-xs uppercase font-bold text-stone-900/70">
                    Direct Email
                  </p>
                  <a
                    href="mailto:tupang1017@gmail.com"
                    className="font-sans text-2xl sm:text-4xl font-bold text-stone-950 hover:text-white underline decoration-2 underline-offset-4 transition-colors"
                  >
                    tupang1017@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:tupang1017@gmail.com"
                  className="px-6 py-3 rounded-full bg-stone-950 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors"
                >
                  Send Email ↗
                </a>
                <button
                  onClick={copyEmail}
                  className="px-6 py-3 rounded-full bg-white text-stone-950 border-2 border-stone-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  {copied ? "Email Copied! ✓" : "Copy Address"}
                </button>
                <a
                  href="https://github.com/Greyari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-white/80 text-stone-950 border-2 border-stone-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/grey-ari-daniel-a27649368"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-white/80 text-stone-950 border-2 border-stone-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>

            {/* Illustrated Card with Smiley */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 sm:w-80 -rotate-6 hover:rotate-0 transition-transform duration-500">
                <div className="rounded-3xl bg-white border-4 border-stone-950 p-7 shadow-[10px_12px_0_0_#1c1917] text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-400 border-3 border-stone-950 flex items-center justify-center text-3xl font-bold">
                    ☺
                  </div>
                  <p className="font-sans text-3xl font-extrabold text-stone-950 uppercase leading-none mb-2">
                    LET&apos;S TALK
                  </p>
                  <p className="font-mono text-xs text-stone-500 mb-4">
                    GREY ARI DANIEL S. • FULL-STACK DEV
                  </p>
                  <div className="h-px bg-stone-200 my-3" />
                  <p className="font-mono text-[11px] text-amber-700 font-bold">
                    ⚡ Fast response • Batam, ID
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="max-w-6xl w-full mx-auto flex justify-between font-mono text-xs font-bold text-stone-950/75">
            <span>Batam, Kepulauan Riau — Indonesia</span>
            <span>WIB (UTC+7)</span>
          </div>
        </div>
      )}
    </>
  );
}
