"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Category = "kuliah" | "magang" | "freelance";

interface ExperienceItem {
  title: string;
  org: string;
  period: string;
  location?: string;
  description: string;
  tags: string[];
  projects?: { name: string; desc: string }[];
}

const data: Record<Category, ExperienceItem[]> = {
  kuliah: [
    {
      title: "Mahasiswa Informatika",
      org: "Politeknik Negeri Batam",
      period: "2021 — Sekarang",
      location: "Batam, Indonesia",
      description:
        "Mendalami rekayasa perangkat lunak, basis data, dan pengembangan web. Aktif terlibat dalam proyek akademik berbasis teknologi.",
      tags: ["Web Dev", "Database", "Software Engineering"],
      projects: [
        {
          name: "Parking Smart Batam",
          desc: "Sistem manajemen parkir cerdas berbasis web dengan fitur monitoring real-time dan laporan otomatis.",
        },
        {
          name: "HR Pro",
          desc: "Aplikasi HR management untuk mengelola data karyawan, absensi, dan penggajian secara terintegrasi.",
        },
      ],
    },
  ],
  magang: [
    {
      title: "Web Developer Intern",
      org: "PT. Ariska Group",
      period: "2023",
      location: "Batam, Indonesia",
      description:
        "Mengembangkan fitur-fitur baru untuk aplikasi internal perusahaan dan melakukan pemeliharaan sistem yang sudah berjalan.",
      tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
      projects: [
        {
          name: "POS Ariska",
          desc: "Point-of-Sale system untuk kasir retail — fitur manajemen stok, transaksi, dan laporan penjualan harian.",
        },
      ],
    },
  ],
  freelance: [
    {
      title: "Freelance Full-Stack Developer",
      org: "Independent",
      period: "2022 — Sekarang",
      location: "Remote",
      description:
        "Membangun solusi digital untuk klien dari berbagai industri — mulai dari landing page, sistem manajemen, hingga REST API.",
      tags: ["Next.js", "React", "Laravel", "REST API", "Tailwind"],
      projects: [
        {
          name: "Company Profile & Landing Pages",
          desc: "Desain dan development website presentasi bisnis yang responsif dan SEO-friendly.",
        },
        {
          name: "Custom Management Systems",
          desc: "Aplikasi web custom untuk kebutuhan spesifik klien, termasuk inventori dan manajemen konten.",
        },
      ],
    },
  ],
};

const tabs: { key: Category; label: string; emoji: string }[] = [
  { key: "kuliah", label: "Kuliah", emoji: "🎓" },
  { key: "magang", label: "Magang", emoji: "💼" },
  { key: "freelance", label: "Freelance", emoji: "🚀" },
];

export default function Experience() {
  const [active, setActive] = useState<Category>("kuliah");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [active]);

  const items = data[active];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative px-6 md:px-16 lg:px-28 py-28 bg-stone-50 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50" />

      <div ref={headingRef} className="max-w-4xl mx-auto mb-16 opacity-0">
        <p
          className="font-mono text-xs tracking-widest uppercase text-amber-600 mb-3"
        >
          — Perjalanan
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Pengalaman
          <br />
          <span className="text-stone-400">& Karya</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Tab switcher */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                active === tab.key
                  ? "bg-stone-900 text-white shadow-md"
                  : "bg-white border border-stone-200 text-stone-600 hover:border-stone-400"
              }`}
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              <span>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef}>
          {items.map((item, idx) => (
            <ExperienceCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className="relative bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-amber-200 rounded-l-2xl" />

      <div className="p-6 md:p-8 pl-8 md:pl-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3
              className="text-xl font-semibold text-stone-900 mb-0.5"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              {item.title}
            </h3>
            <p
              className="text-amber-600 font-medium text-sm"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              {item.org}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span
              className="text-xs font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full whitespace-nowrap"
            >
              {item.period}
            </span>
            {item.location && (
              <p className="text-xs text-stone-400 mt-1 font-mono">
                📍 {item.location}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <p
          className="text-stone-600 text-sm leading-relaxed mb-4"
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 font-medium"
              style={{ fontFamily: "monospace" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Projects */}
        {item.projects && item.projects.length > 0 && (
          <div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors mb-3"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              <span
                className={`transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
              >
                ▶
              </span>
              {expanded ? "Sembunyikan" : "Lihat"} Proyek (
              {item.projects.length})
            </button>

            {expanded && (
              <div className="grid gap-3 md:grid-cols-2">
                {item.projects.map((proj) => (
                  <div
                    key={proj.name}
                    className="bg-stone-50 rounded-xl p-4 border border-stone-100 hover:border-amber-200 transition-colors duration-200"
                  >
                    <p
                      className="font-semibold text-stone-800 text-sm mb-1"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {proj.name}
                    </p>
                    <p
                      className="text-xs text-stone-500 leading-relaxed"
                      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                    >
                      {proj.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}