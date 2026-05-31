"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── MagneticButton ───────────────────────────────────────────────────────────
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
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
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
    desc: "Sistem pemantauan parkir dan lalu lintas real-time berbasis AI dan IoT. Mengintegrasikan model YOLO untuk deteksi ketersediaan slot parkir melalui perangkat IoT, dilengkapi dashboard, autentikasi, statistik, dan modul monitoring real-time.",
    tags: ["Laravel", "YOLO", "IoT", "Raspberry Pi", "MySQL"],
    period: "Feb — Jul 2025",
    type: "Akademik",
    featured: true,
    size: "large",
  },
  {
    title: "HR Information System",
    desc: "Backend HRIS cross-platform (Mobile & Web) menggunakan Laravel. Menangani manajemen karyawan, absensi, dan penggajian. Deploy ke server internal Linux/Lubuntu. Bagian dari program magang di PT Kreatif System Indonesia.",
    tags: ["Laravel", "Flutter", "MySQL", "Linux"],
    period: "2025 — 2026",
    type: "Magang",
    size: "medium",
  },
  {
    title: "POS & Inventory System",
    desc: "Sistem POS dan inventory full-stack dengan simulasi rakit PC, logika kompatibilitas komponen otomatis, dan integrasi Midtrans payment gateway. Deploy di Railway dengan Cloudinary sebagai storage.",
    tags: ["Laravel", "MySQL", "Midtrans", "Railway", "Cloudinary"],
    period: "2025",
    type: "Freelance",
    size: "medium",
  },
  {
    title: "Corporate Website & Groq AI",
    desc: "Website perusahaan dengan Next.js dan integrasi chatbot berbasis Groq AI untuk otomatisasi customer support. Deploy ke Vercel.",
    tags: ["Next.js", "Groq AI", "Vercel"],
    period: "2025",
    type: "Magang",
    size: "small",
  },
  {
    title: "Abnormality Management Web App",
    desc: "Sistem pelaporan abnormalitas lini produksi berbasis .NET dan SQL Server dengan multi-role flow dan dashboard real-time.",
    tags: [".NET", "C#", "SQL Server"],
    period: "2025",
    type: "Freelance",
    size: "small",
  },
  {
    title: "Customer Loyalty System",
    desc: "Backend loyalty engine menggunakan Laravel dengan sistem tier-based ranking otomatis yang memproses riwayat transaksi untuk meningkatkan retensi dan frekuensi pembelian pengguna.",
    tags: ["Laravel", "MySQL"],
    period: "2025",
    type: "Magang",
    size: "small",
  },
  {
    title: "Smart Inventory with RFID",
    desc: "Sistem inventaris web dengan pelacakan item RFID, alur peminjaman, dan manajemen data terintegrasi.",
    tags: ["Laravel", "RFID", "MySQL"],
    period: "Aug — Dec 2024",
    type: "Akademik",
    size: "small",
  },
  {
    title: "Parking Enhancement (Freelance)",
    desc: "Pengembangan lanjutan sistem parkir cerdas: notifikasi email via Brevo, deteksi polygon dari kamera, tunneling Raspberry Pi, deploy Railway.",
    tags: ["Laravel", "YOLO", "Brevo", "Raspberry Pi", "Railway"],
    period: "2025",
    type: "Freelance",
    size: "small",
  },
  {
    title: "Room & Equipment Borrowing",
    desc: "Sistem peminjaman ruangan dan barang untuk ormawa kampus berbasis web dengan alur reservasi lengkap.",
    tags: ["Laravel", "MySQL"],
    period: "2025",
    type: "Freelance",
    size: "small",
  },
  {
    title: "Web Based Smartphone Sales System",
    desc: "Platform penjualan smartphone berbasis web full-stack sebagai Team Lead. Menangani seluruh sisi admin: manajemen data, kontrol akses, fitur pembayaran, dan shopping cart dari awal.",
    tags: ["Laravel", "MySQL", "Bootstrap", "Figma"],
    period: "Jan — Jun 2024",
    type: "Akademik",
    size: "small",
  },
  {
    title: "Internship & Attendance Management UI",
    desc: "Desain wireframe dan UI/UX untuk sistem manajemen magang dan absensi di lingkungan rumah sakit menggunakan Figma.",
    tags: ["Figma", "UI/UX"],
    period: "2025",
    type: "Freelance",
    size: "small",
  },
  {
    title: "Computer Device Sales Service App",
    desc: "Merancang arsitektur sistem dan memetakan proses bisnis via use case & flowchart. Mengembangkan fitur utama: autentikasi, detail produk, dan shopping cart.",
    tags: ["PHP", "MySQL", "Bootstrap"],
    period: "Aug — Dec 2023",
    type: "Akademik",
    size: "small",
  },
];

const typeColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Akademik: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100", dot: "bg-blue-400" },
  Magang: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100", dot: "bg-amber-400" },
  Freelance: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100", dot: "bg-emerald-400" },
};

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const colors = typeColors[project.type];

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        },
      }
    );
  }, [index]);

  const isLarge = project.size === "large";
  const isMedium = project.size === "medium";

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative bg-white rounded-3xl border overflow-hidden group opacity-0
        transition-all duration-500
        ${hovered ? "border-amber-300 shadow-xl shadow-amber-100/60 -translate-y-1" : "border-stone-200 shadow-sm"}
        ${isLarge ? "md:col-span-2 md:row-span-2" : ""}
        ${isMedium ? "md:col-span-1 md:row-span-2" : ""}
      `}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-500
        ${isLarge
          ? "bg-gradient-to-r from-amber-400 via-amber-300 to-transparent"
          : hovered
          ? "bg-gradient-to-r from-amber-400 to-transparent"
          : "bg-gradient-to-r from-stone-200 to-transparent"
        }`}
      />

      {/* Subtle background glow on hover */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none
        bg-gradient-to-br from-amber-50/40 to-transparent
        ${hovered ? "opacity-100" : "opacity-0"}`}
      />

      <div className={`relative p-6 ${isLarge ? "md:p-10" : ""} h-full flex flex-col`}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
            <span
              className={`text-xs font-mono px-2.5 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
            >
              {project.type}
            </span>
          </div>
          <span className="text-xs font-mono text-stone-400 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-100">
            {project.period}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-stone-900 mb-3 leading-tight group-hover:text-amber-600 transition-colors duration-300
          ${isLarge ? "text-2xl md:text-3xl" : isMedium ? "text-xl" : "text-lg"}`}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          {project.title}
        </h3>

        {/* Divider */}
        <div className={`h-px bg-gradient-to-r from-stone-200 to-transparent mb-3 transition-all duration-300 ${hovered ? "from-amber-200" : ""}`} />

        {/* Description */}
        <p
          className={`text-stone-500 leading-relaxed flex-1 ${isLarge ? "text-base" : "text-sm"}`}
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {project.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2.5 py-1 rounded-full font-mono transition-all duration-200
              ${hovered
                ? "bg-amber-50 text-amber-700 border border-amber-100"
                : "bg-stone-50 text-stone-500 border border-stone-100"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA for large card */}
        {isLarge && (
          <div className="mt-8">
            <MagneticButton
              className="px-6 py-3 rounded-full bg-stone-900 text-white text-sm font-medium 
                hover:bg-amber-500 transition-colors duration-300 shadow-md hover:shadow-amber-200"
              href={project.link ?? "https://github.com/Greyari"}
            >
              <span style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Lihat Project</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
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
  const filtered = filter === "Semua" ? projects : projects.filter((p) => p.type === filter);

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
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const counts = {
    Semua: projects.length,
    Akademik: projects.filter((p) => p.type === "Akademik").length,
    Magang: projects.filter((p) => p.type === "Magang").length,
    Freelance: projects.filter((p) => p.type === "Freelance").length,
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-6 md:px-16 lg:px-28 py-28 bg-stone-50 overflow-hidden"
    >
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-40" />

      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-stone-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Heading */}
      <div ref={headingRef} className="max-w-5xl mx-auto mb-12 opacity-0">
        <p className="font-mono text-xs tracking-widest uppercase text-amber-600 mb-3">— Karya</p>
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
                  ${filter === cat
                    ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                    : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
                  }`}
              >
                <span style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {cat}
                </span>
                <span
                  className={`text-xs rounded-full px-1.5 py-0.5 font-mono
                  ${filter === cat ? "bg-white/20 text-white" : "bg-stone-100 text-stone-400"}`}
                >
                  {counts[cat as keyof typeof counts]}
                </span>
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[200px] gap-4">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-16 text-center">
          <p className="text-stone-400 text-sm mb-4" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Lihat semua project dan kontribusi di GitHub
          </p>
          <MagneticButton
            href="https://github.com/Greyari"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-200 
              bg-white text-stone-700 text-sm font-medium hover:border-amber-400 
              hover:text-amber-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span style={{ fontFamily: "'Instrument Sans', sans-serif" }}>GitHub Profile</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}