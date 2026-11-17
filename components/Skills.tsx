"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GitHubGraph from "@/components/GitHubGraph";

gsap.registerPlugin(ScrollTrigger);

// ─── CountUp ─────────────────────────────────────────────────────────────────
function CountUp({
  end,
  suffix = "",
  duration = 1800,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setCount(0);
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count === null ? "0" : `${count}${suffix}`}</span>;
}

interface TechSpotlight {
  name: string;
  domain: "Backend & API" | "Frontend & Mobile" | "AI & IoT Edge" | "Database & DevOps";
  role: string;
  level: string;
  percent: number;
  usage: string;
  tags: string[];
  accent: string;
}

const techSpotlights: TechSpotlight[] = [
  {
    name: "Laravel & PHP",
    domain: "Backend & API",
    role: "Primary Backend Framework",
    level: "Core Specialist",
    percent: 96,
    usage:
      "Arsitektur REST API, HRIS multi-platform, sistem POS rakit PC, loyalty engine, dan dashboard Smart Parking.",
    tags: ["REST API", "Queue Workers", "Eloquent ORM", "Auth & RBAC"],
    accent: "#FF2D20",
  },
  {
    name: "Next.js & TypeScript",
    domain: "Frontend & Mobile",
    role: "Modern Web & Full-Stack",
    level: "Production Ready",
    percent: 90,
    usage:
      "Website corporate interaktif, integrasi streaming chatbot Groq AI, animasi GSAP, dan optimasi SEO/SSR.",
    tags: ["App Router", "React", "Tailwind CSS", "GSAP"],
    accent: "#171717",
  },
  {
    name: "Flutter & Dart",
    domain: "Frontend & Mobile",
    role: "Cross-Platform Mobile",
    level: "Production Ready",
    percent: 86,
    usage:
      "Aplikasi mobile HRIS presensi karyawan & sinkronisasi data real-time dengan backend Laravel.",
    tags: ["Android & iOS", "State Management", "REST Integration"],
    accent: "#02569B",
  },
  {
    name: ".NET & C#",
    domain: "Backend & API",
    role: "Enterprise Industrial Web",
    level: "Advanced",
    percent: 84,
    usage:
      "Sistem pelaporan abnormalitas lini produksi manufaktur dengan multi-role approval dan analitik SQL Server.",
    tags: [".NET Core", "C#", "MVC Architecture", "Enterprise"],
    accent: "#512BD4",
  },
  {
    name: "YOLOv8 & Python",
    domain: "AI & IoT Edge",
    role: "Computer Vision & AI",
    level: "Edge AI Specialist",
    percent: 88,
    usage:
      "Deteksi ketersediaan slot parkir real-time dari kamera menggunakan polygon detection dan OpenCV.",
    tags: ["YOLOv8", "OpenCV", "Python", "Groq AI"],
    accent: "#f59e0b",
  },
  {
    name: "Raspberry Pi, ESP32 & RFID",
    domain: "AI & IoT Edge",
    role: "Embedded & IoT Systems",
    level: "Hardware Integration",
    percent: 88,
    usage:
      "Edge computing untuk kamera parkir pintar, tunneling jaringan lapangan, dan pelacakan inventaris RFID.",
    tags: ["Raspberry Pi", "RFID", "ESP32", "Arduino"],
    accent: "#C51A4A",
  },
  {
    name: "MySQL & SQL Server",
    domain: "Database & DevOps",
    role: "Relational Database Design",
    level: "Core Specialist",
    percent: 94,
    usage:
      "Perancangan skema 3NF, indexing query transaksi tinggi, locking reservasi, dan integrasi Firebase/SQLite.",
    tags: ["MySQL", "SQL Server", "Firebase", "SQLite"],
    accent: "#00758F",
  },
  {
    name: "Linux, Railway & Cloud",
    domain: "Database & DevOps",
    role: "Deployment & Server Ops",
    level: "Production Ops",
    percent: 89,
    usage:
      "Administrasi server internal Linux/Lubuntu, cloud deployment di Railway & Vercel, CDN Cloudflare, serta Cloudinary.",
    tags: ["Linux / Lubuntu", "Railway", "Cloudflare", "Vercel"],
    accent: "#d97706",
  },
];

const ecosystemTools = [
  { name: "Git & GitHub", cat: "Version Control" },
  { name: "Midtrans Gateway", cat: "Payment API" },
  { name: "Brevo Email API", cat: "Notification" },
  { name: "Cloudinary", cat: "Media CDN" },
  { name: "Postman", cat: "API Testing" },
  { name: "Figma", cat: "UI/UX Design" },
  { name: "Alpine.js", cat: "Reactive UI" },
  { name: "Laravel Blade", cat: "Templating" },
  { name: "Bootstrap", cat: "CSS Framework" },
  { name: "VS Code", cat: "IDE" },
];

const stats = [
  { value: 3, suffix: "+", label: "Tahun Pengalaman", sub: "Full-Stack & IoT" },
  { value: 12, suffix: "+", label: "Project Selesai", sub: "Produksi & Akademik" },
  { value: 990, suffix: "+", label: "GitHub Commits", sub: "12 Bulan Terakhir" },
  { value: 1, suffix: "x", label: "Magang Industri", sub: "PT Kreatif System Indonesia" },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeDomain, setActiveDomain] = useState<string>("Semua");

  const domains = [
    "Semua",
    "Backend & API",
    "Frontend & Mobile",
    "AI & IoT Edge",
    "Database & DevOps",
  ];

  const filteredTech =
    activeDomain === "Semua"
      ? techSpotlights
      : techSpotlights.filter((t) => t.domain === activeDomain);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative px-4 sm:px-8 md:px-14 lg:px-20 py-28 bg-white overflow-hidden border-t border-stone-200/80"
    >
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-35 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="mb-14 opacity-0">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-stone-900 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-amber-600 mb-3">
                <span>✦</span>
                <span>Engineering Arsenal</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-bold text-stone-900 uppercase tracking-tight leading-[0.95]">
                Skills &amp;
                <br />
                <span className="text-amber-500">Technical Stack</span>
              </h2>
            </div>

            {/* Domain Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {domains.map((dom) => {
                const isAct = activeDomain === dom;
                return (
                  <button
                    key={dom}
                    onClick={() => setActiveDomain(dom)}
                    className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider border-2 transition-all cursor-pointer ${
                      isAct
                        ? "bg-stone-900 text-amber-400 border-stone-900 shadow-[3px_3px_0_0_#f59e0b]"
                        : "bg-white text-stone-700 border-stone-300 hover:border-stone-900"
                    }`}
                  >
                    {dom}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4 Key Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
          {stats.map((s, idx) => (
            <div
              key={s.label}
              className={`p-6 rounded-3xl border-2 border-stone-900 transition-transform duration-300 hover:-translate-y-1 ${
                idx === 2
                  ? "bg-amber-400 text-stone-950 shadow-[5px_5px_0_0_#1c1917]"
                  : "bg-stone-50 text-stone-900 shadow-[5px_5px_0_0_#f59e0b]"
              }`}
            >
              <p className="font-display text-4xl sm:text-5xl font-bold leading-none mb-2">
                <CountUp end={s.value} suffix={s.suffix} />
              </p>
              <p className="font-display text-base font-bold leading-snug">
                {s.label}
              </p>
              <p
                className={`font-mono text-[11px] mt-0.5 ${
                  idx === 2 ? "text-stone-900/80 font-semibold" : "text-stone-500"
                }`}
              >
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Tech Spotlight Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {filteredTech.map((tech) => (
            <div
              key={tech.name}
              className="group relative rounded-3xl border-2 border-stone-200 hover:border-stone-900 bg-white p-6 sm:p-7 transition-all duration-300 hover:shadow-[6px_6px_0_0_#f59e0b] flex flex-col justify-between"
            >
              <div>
                {/* Top Meta Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                    {tech.domain}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    {tech.level}
                  </span>
                </div>

                {/* Title & Role */}
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <h3 className="font-display text-2xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                    {tech.name}
                  </h3>
                  <span className="font-mono text-xs font-bold text-stone-400">
                    {tech.percent}%
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden mb-4 border border-stone-200/60">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-700"
                    style={{ width: `${tech.percent}%` }}
                  />
                </div>

                {/* Real Production Usage Description */}
                <p className="text-stone-600 text-sm leading-relaxed mb-5">
                  {tech.usage}
                </p>
              </div>

              {/* Capability Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-stone-100">
                {tech.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-stone-50 text-stone-700 border border-stone-200/80 group-hover:border-amber-300 group-hover:bg-amber-50/50 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Supporting Ecosystem & Integrations Bar */}
        <div className="rounded-3xl border border-stone-200 bg-stone-50/80 p-6 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <h3 className="font-display text-xl font-bold text-stone-900">
              Supporting Ecosystem, APIs &amp; Workflow Tools
            </h3>
            <span className="font-mono text-xs text-stone-500">
              3rd-Party Integrations &amp; Daily Drivers
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {ecosystemTools.map((tool) => (
              <div
                key={tool.name}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-stone-200/90 hover:border-amber-400 transition-colors shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-mono text-xs font-semibold text-stone-800">
                  {tool.name}
                </span>
                <span className="font-mono text-[10px] text-stone-400 border-l border-stone-200 pl-2">
                  {tool.cat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Synced @Greyari GitHub Contribution Activity */}
        <GitHubGraph />
      </div>
    </section>
  );
}
