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
  leftPercent: string; // Matches Two26 horizontal stagger along the path
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
    leftPercent: "md:left-[54%] lg:left-[58%]",
    tilt: -5,
    iconType: "backend",
  },
  {
    id: "02",
    word1: "FRONTEND",
    word2: "& NEXT.JS",
    desc: "Mengubah desain menjadi pengalaman web interaktif yang terasa mulus, responsif, dan mudah dinavigasi.",
    leftPercent: "md:left-[32%] lg:left-[28%] xl:left-[25%]",
    tilt: -5,
    iconType: "frontend",
  },
  {
    id: "03",
    word1: "MOBILE",
    word2: "APPS",
    desc: "Aplikasi lintas platform dengan Flutter yang tampil tajam dan berjalan cepat di Android maupun iOS.",
    leftPercent: "md:left-[40%] lg:left-[44%]",
    tilt: -5,
    iconType: "mobile",
  },
  {
    id: "04",
    word1: "VISION",
    word2: "& AI",
    desc: "Integrasi model YOLOv8 & Groq AI untuk deteksi objek kamera real-time dan automasi cerdas.",
    leftPercent: "md:left-[54%] lg:left-[60%]",
    tilt: -5,
    iconType: "ai",
  },
  {
    id: "05",
    word1: "IOT &",
    word2: "HARDWARE",
    desc: "Menghubungkan kode dengan dunia fisik lewat Raspberry Pi, ESP32, sensor RFID, dan perangkat pintar.",
    leftPercent: "md:left-[30%] lg:left-[27%] xl:left-[25%]",
    tilt: -5,
    iconType: "iot",
  },
  {
    id: "06",
    word1: "CLOUD &",
    word2: "DEVOPS",
    desc: "Setup deployment yang stabil di Linux Lubuntu, Railway, Cloudflare, dan Vercel beserta optimasi MySQL.",
    leftPercent: "md:left-[46%] lg:left-[50%]",
    tilt: -5,
    iconType: "database",
  },
  {
    id: "07",
    word1: "SYSTEM",
    word2: "ARCHITECTURE",
    desc: "Menjaga seluruh bagian sistem bergerak selaras, dari rancangan database hingga detail interaksi terkecil.",
    leftPercent: "md:left-[32%] lg:left-[29%] xl:left-[26%]",
    tilt: -5,
    iconType: "architecture",
  },
];

// ─── Looping Animated 3D/Isometric Developer Icons (Like Two26 Lottie SVGs) ──
function AnimatedDevIcon({ type }: { type: ServiceItem["iconType"] }) {
  switch (type) {
    case "backend":
      return (
        <svg viewBox="0 0 88 88" className="w-20 h-20 overflow-visible">
          <g>
            {/* 3D Isometric Cube Server */}
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
        <svg viewBox="0 0 88 88" className="w-20 h-20 overflow-visible">
          {/* 3D Browser Window + Animated Cursor */}
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
        <svg viewBox="0 0 88 88" className="w-20 h-20 overflow-visible">
          <g>
            <rect x="28" y="12" width="40" height="66" rx="9" fill="#1c1917" transform="rotate(-7 48 45)" />
            <rect
              x="22"
              y="8"
              width="40"
              height="66"
              rx="9"
              fill="#fbbf24"
              stroke="#1c1917"
              strokeWidth="3"
              transform="rotate(-7 42 41)"
            />
            <rect
              x="27"
              y="16"
              width="30"
              height="48"
              rx="5"
              fill="#ffffff"
              stroke="#1c1917"
              strokeWidth="2.5"
              transform="rotate(-7 42 41)"
            />
            <circle cx="42" cy="40" r="8" fill="#f59e0b" stroke="#1c1917" strokeWidth="2.5" />
          </g>
        </svg>
      );
    case "ai":
      return (
        <svg viewBox="0 0 88 88" className="w-20 h-20 overflow-visible">
          <rect x="16" y="18" width="60" height="52" rx="11" fill="#1c1917" />
          <rect x="10" y="12" width="60" height="52" rx="11" fill="#fef3c7" stroke="#1c1917" strokeWidth="3" />
          <path
            d="M 20 26 L 20 20 L 26 20 M 54 20 L 60 20 L 60 26 M 20 50 L 20 56 L 26 56 M 54 56 L 60 56 L 60 50"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx="40"
            cy="38"
            r="12"
            fill="#f59e0b"
            stroke="#1c1917"
            strokeWidth="3"
          />
          <circle cx="40" cy="38" r="5" fill="#1c1917" />
          <circle cx="43" cy="35" r="2" fill="#ffffff" />
        </svg>
      );
    case "iot":
      return (
        <svg viewBox="0 0 88 88" className="w-20 h-20 overflow-visible">
          <rect x="22" y="22" width="48" height="48" rx="9" fill="#1c1917" />
          <rect x="16" y="16" width="48" height="48" rx="9" fill="#f59e0b" stroke="#1c1917" strokeWidth="3" />
          <rect x="27" y="27" width="26" height="26" rx="4" fill="#1c1917" stroke="#ffffff" strokeWidth="2" />
          <path
            d="M 28 8 V 16 M 40 8 V 16 M 52 8 V 16 M 28 64 V 72 M 40 64 V 72 M 52 64 V 72 M 8 28 H 16 M 8 40 H 16 M 8 52 H 16 M 64 28 H 72 M 64 40 H 72 M 64 52 H 72"
            stroke="#1c1917"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="40" cy="40" r="4.5" fill="#34d399" />
        </svg>
      );
    case "database":
      return (
        <svg viewBox="0 0 88 88" className="w-20 h-20 overflow-visible">
          <g>
            <path
              d="M 18 24 C 18 15, 70 15, 70 24 V 66 C 70 75, 18 75, 18 66 Z"
              fill="#f59e0b"
              stroke="#1c1917"
              strokeWidth="3"
            />
            <ellipse cx="44" cy="24" rx="26" ry="9" fill="#fde68a" stroke="#1c1917" strokeWidth="3" />
            <path d="M 18 39 C 18 48, 70 48, 70 39" fill="none" stroke="#1c1917" strokeWidth="3" />
            <path d="M 18 53 C 18 62, 70 62, 70 53" fill="none" stroke="#1c1917" strokeWidth="3" />
          </g>
        </svg>
      );
    case "architecture":
      return (
        <svg viewBox="0 0 88 88" className="w-20 h-20 overflow-visible">
          <g className="origin-center">
            <circle cx="44" cy="44" r="24" fill="#fde68a" stroke="#1c1917" strokeWidth="3" strokeDasharray="8 6" />
          </g>
          <polygon
            points="44,18 68,58 20,58"
            fill="#f59e0b"
            stroke="#1c1917"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="44" cy="46" r="6" fill="#1c1917" />
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
      // 1. Scrub Two26 Studio's exact winding S-Curve path IN LOCKSTEP with viewport center
      // (Tidak bergerak duluan sebelum layar benar-benar men-scroll masuk ke area garis!)
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
            start: "top 46%", // Baru mulai jalan ketika ujung kanan atas masuk ke tengah layar!
            end: "bottom 52%",
            scrub: 0.45,
          },
        });
      }

      // 2. Two26 `.service-block` Animation:
      // `.service-svg` expands from width 0 -> 92px -> 88px with scale overshoot (pushing the 2 words apart!)
      // `.service-block-para-wrapper` pops in with scale overshoot & rotate(-5deg)
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
            start: "top 58%", // Tepat saat ujung garis menyentuh baris service ini
            toggleActions: "play none none reverse",
          },
        });

        if (iconBox) {
          tl.to(iconBox, {
            width: 88,
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
      {/* Section Header ("OUR SERVICES" + "THIS IS MY THING") */}
      <div className="max-w-6xl mx-auto px-4 text-center mb-16 relative z-20">
        <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-amber-600 mb-3">
          <span>✦</span>
          <span>My Services &amp; Expertise</span>
        </div>
        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-stone-900 uppercase tracking-tight leading-[0.95]">
          This Is
          <br />
          <span className="text-amber-500">My Thing</span>
        </h2>
      </div>

      {/* Full-Width Winding Path Container (Flush Edge-to-Edge From Right Corner to Left Corner!) */}
      <div
        ref={pathContainerRef}
        className="relative w-full min-h-[1680px] md:min-h-[1950px] overflow-hidden"
      >
        {/* `.blockhole-start`: Flush at Top-Right Corner */}
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

        {/* `.services-path-svg` & `.services-path-svg-dark`: Exact Two26 Studio S-Curve with Loops */}
        <svg
          viewBox="0 0 1616 2187"
          preserveAspectRatio="none"
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0"
          fill="none"
        >
          {/* Base Pale Track (`.services-path-svg`) */}
          <path
            d={TWO26_EXACT_PATH}
            stroke="#f5ebe6"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Scroll-Scrubbed Active Amber Track (`.services-path-svg-dark`) */}
          <path
            ref={activePathRef}
            d={TWO26_EXACT_PATH}
            stroke="#f59e0b"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* `.blackhole-end`: Flush at Bottom-Left Corner */}
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

        {/* 7 Staggered Service Rows (`.services-layers` > `.service-layer` > `.service-block`) */}
        <div className="relative z-20 flex flex-col justify-between min-h-[1680px] md:min-h-[1950px] py-20 px-4 md:px-0">
          {serviceItems.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                rowRefs.current[idx] = el;
              }}
              className="relative w-full flex items-center"
            >
              <div
                className={`relative flex flex-col items-center mx-auto md:mx-0 ${item.leftPercent} md:-translate-x-1/2 max-w-[92vw] px-2`}
              >
                {/* Two Uppercase Words Flanking the Expanding `.service-svg` */}
                <div className="flex items-center justify-center whitespace-nowrap">
                  <span className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-amber-500 uppercase tracking-tight leading-none drop-shadow-[0_2px_0_#1c1917]">
                    {item.word1}
                  </span>

                  {/* `.service-svg`: Expands from width 0 -> 88px on scroll, splitting the words apart! */}
                  <div
                    ref={(el) => {
                      iconBoxesRef.current[idx] = el;
                    }}
                    className="inline-flex items-center justify-center overflow-hidden shrink-0 mx-1"
                    style={{ width: 0, opacity: 0 }}
                  >
                    <AnimatedDevIcon type={item.iconType} />
                  </div>

                  <span className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 uppercase tracking-tight leading-none pl-2">
                    {item.word2}
                  </span>
                </div>

                {/* `.service-block-para-wrapper`: Tilted Cream/Amber Pop-Up Pill Card Below */}
                <div
                  ref={(el) => {
                    popCardsRef.current[idx] = el;
                  }}
                  className="mt-3 max-w-xs sm:max-w-sm rounded-2xl bg-amber-50/95 backdrop-blur-xs border-2 border-amber-500 px-5 py-3.5 shadow-lg text-center"
                  style={{ opacity: 0 }}
                >
                  <p className="text-amber-950 text-xs sm:text-sm font-medium leading-snug">
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
