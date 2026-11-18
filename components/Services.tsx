"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TWO26_EXACT_PATH =
  "M1601 15C1241.24 56.6913 1025.14 308.977 1139.71 377.393C1191.45 408.29 1240.74 339.444 1181.39 282.059C1075.45 179.627 937.582 215.243 741.458 298.287C701.638 315.147 622.383 350.59 552.298 410.201C487.298 465.486 487.725 549.018 534.765 563.77C581.804 578.523 632.714 579.634 681.058 587.392C729.731 595.202 767.011 617.17 797.836 657.756C833.766 705.065 838.864 772.034 862.127 825.767C890.491 891.283 966.341 911.2 1033.5 915.638C1130.56 922.052 1195.74 891.215 1286.16 899.069C1347.7 904.414 1457.75 932.208 1466.92 1059.42C1477.81 1210.68 1340.4 1252.99 1221.76 1286.05C1118.2 1314.91 997.775 1397.54 862.127 1334.5C757.468 1285.86 666.411 1293.34 650.401 1384.21C634.391 1475.07 710.968 1532.13 837.283 1542.81C963.598 1553.5 1146.44 1534.93 1181.39 1676C1226.53 1858.21 954.075 1839.5 797.836 1839.5C661.891 1839.5 422.283 1807.72 385.5 1700C340.427 1568 635.939 1584.37 465.5 1917C414.516 2016.5 310 2165.31 15 2165.31";

interface ServiceItem {
  id: string;
  word1: string;
  word2: string;
  desc: string;
  leftPercent: string; // Calibrated safe bounds across mobile, tablet, laptop, and desktop
  tilt: number;
  iconType:
    | "backend"
    | "frontend"
    | "mobile"
    | "ai"
    | "iot"
    | "database"
    | "architecture";
}

const serviceItems: ServiceItem[] = [
  {
    id: "01",
    word1: "BACKEND",
    word2: "ENGINEERING",
    desc: "Membangun fondasi server Laravel & .NET yang tangguh, cepat, dan siap menangani logika bisnis kompleks.",
    leftPercent: "md:left-[64%] lg:left-[67%] xl:left-[70%]",
    tilt: -4,
    iconType: "backend",
  },
  {
    id: "02",
    word1: "FRONTEND",
    word2: "& NEXT.JS",
    desc: "Mengubah desain menjadi pengalaman web interaktif yang terasa mulus, responsif, dan mudah dinavigasi.",
    leftPercent: "md:left-[36%] lg:left-[34%] xl:left-[32.5%]",
    tilt: -4,
    iconType: "frontend",
  },
  {
    id: "03",
    word1: "MOBILE",
    word2: "APPS",
    desc: "Aplikasi lintas platform dengan Flutter yang tampil tajam dan berjalan cepat di Android maupun iOS.",
    leftPercent: "md:left-[52%] lg:left-[53%] xl:left-[54%]",
    tilt: -4,
    iconType: "mobile",
  },
  {
    id: "04",
    word1: "VISION",
    word2: "& AI",
    desc: "Integrasi model YOLOv8 & Groq AI untuk deteksi objek kamera real-time dan automasi cerdas.",
    leftPercent: "md:left-[66%] lg:left-[70%] xl:left-[73%]",
    tilt: -4,
    iconType: "ai",
  },
  {
    id: "05",
    word1: "IOT &",
    word2: "HARDWARE",
    desc: "Menghubungkan kode dengan dunia fisik lewat Raspberry Pi, ESP32, sensor RFID, dan perangkat pintar.",
    leftPercent: "md:left-[48%] lg:left-[47%]",
    tilt: -4,
    iconType: "iot",
  },
  {
    id: "06",
    word1: "CLOUD &",
    word2: "DEVOPS",
    desc: "Setup deployment yang stabil di Linux Lubuntu, Railway, Cloudflare, dan Vercel beserta optimasi MySQL.",
    leftPercent: "md:left-[34%] lg:left-[30%] xl:left-[27%]",
    tilt: -4,
    iconType: "database",
  },
  {
    id: "07",
    word1: "SYSTEM",
    word2: "ARCHITECTURE",
    desc: "Menjaga seluruh bagian sistem bergerak selaras, dari rancangan database hingga detail interaksi terkecil.",
    leftPercent: "md:left-[32%] lg:left-[27%] xl:left-[23%]",
    tilt: -4,
    iconType: "architecture",
  },
];

// ─── Looping Animated 3D/Isometric Developer Icons ──
function AnimatedDevIcon({ type }: { type: ServiceItem["iconType"] }) {
  switch (type) {
    case "backend":
      return (
        <svg viewBox="0 0 88 88" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 overflow-visible">
          <g>
            <polygon
              points="44,10 78,26 44,42 10,26"
              fill="#fde68a"
              stroke="#1c1917"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <polygon
              points="10,26 44,42 44,78 10,62"
              fill="#f59e0b"
              stroke="#1c1917"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <polygon
              points="78,26 44,42 44,78 78,62"
              fill="#1c1917"
              stroke="#1c1917"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <circle cx="56" cy="48" r="3.5" fill="#fbbf24" />
            <circle cx="66" cy="43" r="3" fill="#34d399" />
            <line x1="18" y1="42" x2="38" y2="52" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" />
            <line x1="18" y1="53" x2="38" y2="63" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );
    case "frontend":
      return (
        <svg viewBox="0 0 88 88" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 overflow-visible">
          <rect x="14" y="20" width="64" height="48" rx="9" fill="#1c1917" />
          <rect x="8" y="14" width="64" height="48" rx="9" fill="#fffbeb" stroke="#1c1917" strokeWidth="3" />
          <line x1="8" y1="26" x2="72" y2="26" stroke="#1c1917" strokeWidth="3" />
          <circle cx="17" cy="20" r="2.5" fill="#f59e0b" />
          <circle cx="25" cy="20" r="2.5" fill="#1c1917" />
          <path
            d="M 26 38 L 19 44 L 26 50 M 44 38 L 51 44 L 44 50 M 38 36 L 32 52"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <g>
            <polygon
              points="56,46 78,54 66,60 72,72 65,75 59,63 52,70"
              fill="#f59e0b"
              stroke="#1c1917"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );
    case "mobile":
      return (
        <svg viewBox="0 0 88 88" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 overflow-visible">
          <rect
            x="24"
            y="12"
            width="40"
            height="64"
            rx="10"
            fill="#1c1917"
            transform="rotate(-6 44 44)"
          />
          <rect
            x="22"
            y="10"
            width="40"
            height="64"
            rx="10"
            fill="#f59e0b"
            stroke="#1c1917"
            strokeWidth="3"
            transform="rotate(-6 44 44)"
          />
          <rect
            x="26"
            y="18"
            width="32"
            height="46"
            rx="5"
            fill="#1c1917"
            transform="rotate(-6 44 44)"
          />
          <path
            d="M 32 28 L 44 40 L 37 47 L 33 43"
            fill="#38bdf8"
            transform="rotate(-6 44 44)"
          />
          <path
            d="M 44 40 L 51 33 L 44 26"
            fill="#0284c7"
            transform="rotate(-6 44 44)"
          />
          <circle cx="44" cy="68" r="2.5" fill="#fde68a" transform="rotate(-6 44 44)" />
        </svg>
      );
    case "ai":
      return (
        <svg viewBox="0 0 88 88" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 overflow-visible">
          <polygon
            points="44,8 76,26 76,62 44,80 12,62 12,26"
            fill="#fef3c7"
            stroke="#1c1917"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="44" cy="44" r="14" fill="#1c1917" />
          <circle cx="44" cy="44" r="8" fill="#f59e0b" />
          <circle cx="41" cy="41" r="3" fill="#ffffff" />
          <path d="M 30 30 L 22 22 M 58 30 L 66 22 M 30 58 L 22 66 M 58 58 L 66 66" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "iot":
      return (
        <svg viewBox="0 0 88 88" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 overflow-visible">
          <g>
            <rect x="20" y="24" width="48" height="40" rx="8" fill="#047857" stroke="#1c1917" strokeWidth="3" />
            <rect x="32" y="32" width="24" height="24" rx="4" fill="#1c1917" />
            <circle cx="44" cy="44" r="4" fill="#34d399" />
            <line x1="28" y1="16" x2="28" y2="24" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <line x1="44" y1="14" x2="44" y2="24" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <line x1="60" y1="16" x2="60" y2="24" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <line x1="28" y1="64" x2="28" y2="72" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <line x1="44" y1="64" x2="44" y2="74" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <line x1="60" y1="64" x2="60" y2="72" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );
    case "database":
      return (
        <svg viewBox="0 0 88 88" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 overflow-visible">
          <g>
            <path
              d="M 22 24 C 22 17 66 17 66 24 L 66 64 C 66 71 22 71 22 64 Z"
              fill="#f59e0b"
              stroke="#1c1917"
              strokeWidth="3"
            />
            <ellipse cx="44" cy="24" rx="22" ry="7" fill="#fde68a" stroke="#1c1917" strokeWidth="3" />
            <path d="M 22 37 C 22 44 66 44 66 37" fill="none" stroke="#1c1917" strokeWidth="3" />
            <path d="M 22 51 C 22 58 66 58 66 51" fill="none" stroke="#1c1917" strokeWidth="3" />
            <circle cx="56" cy="58" r="2.5" fill="#1c1917" />
          </g>
        </svg>
      );
    case "architecture":
      return (
        <svg viewBox="0 0 88 88" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 overflow-visible">
          <g>
            <polygon
              points="44,12 74,30 44,48 14,30"
              fill="#fbbf24"
              stroke="#1c1917"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <polygon
              points="44,28 74,46 44,64 14,46"
              fill="#f59e0b"
              stroke="#1c1917"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <polygon
              points="44,44 74,62 44,80 14,62"
              fill="#1c1917"
              stroke="#1c1917"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <line x1="44" y1="12" x2="44" y2="76" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="3 3" />
          </g>
        </svg>
      );
  }
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathContainerRef = useRef<HTMLDivElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconBoxesRef = useRef<(HTMLDivElement | null)[]>([]);
  const popCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scrub Two26 Studio winding S-Curve path in lockstep with scroll
      const path = activePathRef.current;
      if (path && pathContainerRef.current) {
        const len = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: pathContainerRef.current,
            start: "top 46%",
            end: "bottom 52%",
            scrub: 0.45,
          },
        });
      }

      // 2. Responsive icon expansion & popCard entrance
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const isLaptop = window.innerWidth >= 1024 && window.innerWidth < 1280;
      const targetIconWidth = isMobile ? 46 : isTablet ? 56 : isLaptop ? 66 : 80;

      serviceItems.forEach((item, idx) => {
        const row = rowRefs.current[idx];
        const iconBox = iconBoxesRef.current[idx];
        const popCard = popCardsRef.current[idx];
        if (!row) return;

        if (iconBox) {
          gsap.set(iconBox, {
            width: 0,
            opacity: 0,
            scale: 0,
          });
        }

        if (popCard) {
          gsap.set(popCard, {
            opacity: 0,
            scale: 0,
            rotate: 0,
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 58%",
            toggleActions: "play none none reverse",
          },
        });

        if (iconBox) {
          tl.to(iconBox, {
            width: targetIconWidth,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: "back.out(2.2)",
          });
        }

        if (popCard) {
          tl.to(
            popCard,
            {
              opacity: 1,
              scale: 1,
              rotate: item.tilt,
              duration: 0.6,
              ease: "back.out(2.1)",
            },
            "-=0.45"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-28 bg-stone-50 border-t border-stone-200/80 overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-4 text-center mb-16 relative z-20">
        <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-amber-600 mb-3">
          <span>✦</span>
          <span>My Services &amp; Expertise</span>
        </div>
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-stone-900 uppercase tracking-tight leading-[0.95]">
          This Is
          <br />
          <span className="text-amber-500">My Thing</span>
        </h2>
      </div>

      {/* Full-Width Winding Path Container (Flush Edge-to-Edge) */}
      <div
        ref={pathContainerRef}
        className="relative w-full min-h-[1600px] md:min-h-[1950px] overflow-hidden"
      >
        {/* Top-Right Start Portal */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-0 right-0 z-10 w-9 h-11 translate-x-1"
        >
          <svg viewBox="0 0 33 38" className="w-full h-full fill-none">
            <ellipse
              cx="16.5"
              cy="19"
              rx="14"
              ry="17"
              transform="rotate(-18 16.5 19)"
              fill="#1c1917"
              stroke="#f59e0b"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Exact Two26 Studio S-Curve SVG */}
        <svg
          viewBox="0 0 1616 2187"
          preserveAspectRatio="none"
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0"
          fill="none"
        >
          <path
            d={TWO26_EXACT_PATH}
            stroke="#f5ebe6"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            ref={activePathRef}
            d={TWO26_EXACT_PATH}
            stroke="#f59e0b"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Bottom-Left End Portal */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute bottom-0 left-0 z-10 w-9 h-11 -translate-x-1"
        >
          <svg viewBox="0 0 33 38" className="w-full h-full fill-none">
            <ellipse
              cx="16.5"
              cy="19"
              rx="14"
              ry="17"
              transform="rotate(18 16.5 19)"
              fill="#1c1917"
              stroke="#f59e0b"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* 7 Staggered Service Rows with Fluid Clamp Typography (Guaranteed 0 Viewport Clipping) */}
        <div className="relative z-20 flex flex-col justify-between min-h-[1600px] md:min-h-[1950px] py-16 md:py-20 px-3 md:px-0">
          {serviceItems.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                rowRefs.current[idx] = el;
              }}
              className="relative w-full flex items-center justify-center min-h-[140px]"
            >
              <div
                className={`relative flex flex-col items-center mx-auto md:mx-0 md:absolute ${item.leftPercent} md:-translate-x-1/2 max-w-[94vw] md:max-w-none`}
              >
                {/* Two Uppercase Words Flanking Center Icon */}
                <div className="relative flex items-center justify-center max-w-full">
                  <span className="font-display text-[clamp(1.15rem,2.15vw,2.95rem)] font-bold text-amber-500 uppercase tracking-tight leading-none drop-shadow-[0_2px_0_#1c1917] whitespace-nowrap text-right pr-1 sm:pr-2">
                    {item.word1}
                  </span>

                  {/* `.service-svg`: Expands responsively on the line */}
                  <div
                    ref={(el) => {
                      iconBoxesRef.current[idx] = el;
                    }}
                    className="inline-flex items-center justify-center overflow-hidden shrink-0 mx-0.5 sm:mx-1"
                    style={{ width: 0, opacity: 0 }}
                  >
                    <AnimatedDevIcon type={item.iconType} />
                  </div>

                  <span className="font-display text-[clamp(1.15rem,2.15vw,2.95rem)] font-bold text-stone-900 uppercase tracking-tight leading-none whitespace-nowrap text-left pl-1 sm:pl-2">
                    {item.word2}
                  </span>
                </div>

                {/* Wrapped, Responsive Speech Bubble (Never Overflows Viewport) */}
                <div
                  ref={(el) => {
                    popCardsRef.current[idx] = el;
                  }}
                  className="mt-2.5 max-w-[240px] sm:max-w-[280px] md:max-w-[310px] rounded-2xl bg-amber-50/95 backdrop-blur-xs border-2 border-amber-500 px-4 py-2.5 sm:px-5 sm:py-3 shadow-md text-center"
                  style={{ opacity: 0 }}
                >
                  <p className="text-amber-950 text-[11px] sm:text-xs font-medium leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
