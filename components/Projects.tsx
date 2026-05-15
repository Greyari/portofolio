"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── MagneticButton (React Bits) ──────────────────────────────────────────────
function MagneticButton({
  children,
  className = "",
  href,
  strength = 0.3,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0)";
    }
  };

  const commonProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: `inline-flex items-center gap-2 transition-transform duration-300 ease-out ${className}`,
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} {...commonProps}>
      {children}
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Project {
  title: string;
  desc: string;
  tags: string[];
  period: string;
  type: string;
  featured?: boolean;
  link?: string;
  size: "large" | "medium" | "small";
}

const projects: Project[] = [
  {
    title: "Parking Smart Batam",
    desc: "Sistem manajemen parkir cerdas berbasis web dengan monitoring real-time, laporan otomatis, dan dashboard admin. Dibangun untuk efisiensi operasional area parkir komersial di Batam.",
    tags: ["Laravel", "MySQL", "Bootstrap", "Chart.js"],
    period: "2024",
    type: "Akademik",
    featured: true,
    size: "large",
  },
  {
    title: "HR Pro",
    desc: "Aplikasi HR management terintegrasi — mengelola data karyawan, absensi, dan penggajian dalam satu platform.",
    tags: ["Laravel", "MySQL", "Tailwind"],
    period: "2023",
    type: "Akademik",
    size: "medium",
  },
  {
    title: "POS Ariska",
    desc: "Point-of-Sale system untuk kasir retail dengan fitur manajemen stok dan laporan penjualan harian.",
    tags: ["PHP", "MySQL", "Bootstrap"],
    period: "2023",
    type: "Magang",
    size: "medium",
  },
  {
    title: "Company Profile Sites",
    desc: "Landing pages responsif dan SEO-friendly untuk berbagai klien bisnis.",
    tags: ["Next.js", "Tailwind", "Framer"],
    period: "2022—kini",
    type: "Freelance",
    size: "small",
  },
  {
    title: "Custom Management Systems",
    desc: "Aplikasi web custom untuk kebutuhan spesifik klien — inventori, CMS, dan sistem laporan.",
    tags: ["Laravel", "React", "REST API"],
    period: "2022—kini",
    type: "Freelance",
    size: "small",
  },
];

const typeColors: Record<string, string> = {
  Akademik: "bg-blue-50 text-blue-700 border-blue-100",
  Magang: "bg-amber-50 text-amber-700 border-amber-100",
  Freelance: "bg-stone-100 text-stone-600 border-stone-200",
};

// ─── Bento Card ───────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
        },
      }
    );
  }, [index]);

  const isLarge = project.size === "large";
  const isMedium = project.size === "medium";

  return (
    <div
      ref={cardRef}
      className={`
        relative bg-white rounded-2xl border border-stone-200 
        hover:border-amber-300 hover:shadow-lg
        transition-all duration-300 overflow-hidden group opacity-0
        ${isLarge ? "md:col-span-2 md:row-span-2" : ""}
        ${isMedium ? "md:col-span-1 md:row-span-2" : ""}
      `}
    >
      {/* Accent bar top */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r 
        ${isLarge ? "from-amber-400 via-amber-300 to-transparent" : "from-stone-300 to-transparent"}
        group-hover:from-amber-400 transition-all duration-300`}
      />

      <div className={`p-6 ${isLarge ? "md:p-8" : ""} h-full flex flex-col`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <span
            className={`text-xs font-mono px-2.5 py-1 rounded-full border ${typeColors[project.type]}`}
          >
            {project.type}
          </span>
          <span className="text-xs font-mono text-stone-400">{project.period}</span>
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-stone-900 mb-2 leading-tight
            ${isLarge ? "text-2xl md:text-3xl" : "text-lg"}`}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className={`text-stone-500 leading-relaxed flex-1
            ${isLarge ? "text-base" : "text-sm"}`}
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {project.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-stone-50 text-stone-500 border border-stone-100 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA for large card */}
        {isLarge && (
          <div className="mt-6">
            <MagneticButton
              className="px-5 py-2.5 rounded-full bg-stone-900 text-white text-sm font-medium 
                hover:bg-amber-500 transition-colors duration-300 shadow-sm"
              href={project.link ?? "#"}
            >
              <span style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Lihat Project
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </MagneticButton>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>("Semua");

  const categories = ["Semua", "Akademik", "Magang", "Freelance"];

  const filtered =
    filter === "Semua" ? projects : projects.filter((p) => p.type === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-6 md:px-16 lg:px-28 py-28 bg-stone-50 overflow-hidden"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-40" />

      {/* Heading */}
      <div ref={headingRef} className="max-w-5xl mx-auto mb-12 opacity-0">
        <p className="font-mono text-xs tracking-widest uppercase text-amber-600 mb-3">
          — Karya
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Projects
            <br />
            <span className="text-stone-400">yang Pernah Dibangun</span>
          </h2>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <MagneticButton
                key={cat}
                strength={0.2}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200
                  ${
                    filter === cat
                      ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                      : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
                  }`}
              >
                <span style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {cat}
                </span>
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[200px] gap-4">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p
            className="text-stone-400 text-sm mb-4"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            Lihat semua project dan kontribusi open source di GitHub
          </p>
          <MagneticButton
            href="https://github.com/greyari"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-200 
              bg-white text-stone-700 text-sm font-medium hover:border-amber-400 
              hover:text-amber-600 transition-colors duration-300 shadow-sm"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              GitHub Profile
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}