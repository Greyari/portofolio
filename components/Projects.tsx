"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectModal, { ProjectData } from "@/components/ProjectModal";

gsap.registerPlugin(ScrollTrigger);

export interface ExtendedProjectData extends ProjectData {
  id: string;
  image?: string; // Kosong dulu sekarang, siap diisi path foto kapan saja (misal: "/projects/parking.jpg")
  brushColor: string;
}

const projects: ExtendedProjectData[] = [
  {
    id: "01",
    title: "Parking Smart Batam",
    desc: "Sistem pemantauan parkir dan lalu lintas real-time berbasis AI dan IoT. Mengintegrasikan model YOLO untuk deteksi ketersediaan slot parkir melalui perangkat IoT, dilengkapi dashboard, autentikasi, statistik, dan modul monitoring real-time.",
    detailedDesc:
      "Sistem cerdas end-to-end yang memadukan computer vision YOLOv8 pada hardware Raspberry Pi dengan web dashboard Laravel. Sistem membaca frame video dari kamera pengawas, mendeteksi polygon koordinat parkir, dan menyajikan status ketersediaan secara real-time kepada pengendara.",
    challenge:
      "Deteksi akurat slot parkir di bawah berbagai kondisi pencahayaan dan optimasi framerate video feed pada perangkat edge computing dengan resource terbatas.",
    solution:
      "Pipeline preprocessing frame gambar, model YOLO yang di-quantize untuk efisiensi CPU edge, tunneling aman via Railway, dan WebSocket/polling untuk visualisasi slot real-time.",
    tags: ["Laravel", "YOLOv8", "IoT", "Raspberry Pi", "MySQL"],
    period: "Feb — Jul 2025",
    type: "Akademik",
    featured: true,
    brushColor: "#f59e0b",
    github: "https://github.com/Greyari",
  },
  {
    id: "02",
    title: "HR Information System",
    desc: "Backend HRIS cross-platform (Mobile & Web) menggunakan Laravel. Menangani manajemen karyawan, absensi, dan penggajian. Deploy ke server internal Linux/Lubuntu. Bagian dari program magang di PT Kreatif System Indonesia.",
    detailedDesc:
      "Solusi HRIS enterprise yang menghubungkan aplikasi mobile Flutter untuk absensi presensi pegawai dengan portal web admin Laravel untuk payroll dan rekapitulasi data. Dijalankan pada server intranet Linux mandiri dengan keamanan jaringan terisolasi.",
    challenge:
      "Sinkronisasi data absensi karyawan lapangan secara real-time serta kalkulasi otomatis rumus payroll yang kompleks sesuai regulasi perusahaan.",
    solution:
      "Arsitektur RESTful API stateless dengan token authentication, database trigger & background queuing untuk perhitungan gaji, serta script deployment otomatis di server Lubuntu.",
    tags: ["Laravel", "Flutter", "MySQL", "Linux / Lubuntu", "REST API"],
    period: "2025 — 2026",
    type: "Magang",
    featured: true,
    brushColor: "#1c1917",
    github: "https://github.com/Greyari",
  },
  {
    id: "03",
    title: "POS & PC Builder System",
    desc: "Sistem POS dan inventory full-stack dengan simulasi rakit PC, logika kompatibilitas komponen otomatis, dan integrasi Midtrans payment gateway. Deploy di Railway dengan Cloudinary sebagai storage.",
    detailedDesc:
      "Platform e-commerce dan point of sale khusus retail komputer dengan fitur unik: algoritma verifikasi soket CPU, motherboard, dan TDP daya secara real-time saat pengguna merakit PC custom, terintegrasi pembayaran digital Midtrans.",
    challenge:
      "Menangani matriks kompatibilitas antar puluhan jenis soket prosesor, form-factor casing, dan batas daya PSU tanpa membebani performa browser.",
    solution:
      "Struktur database relational terindeks, middleware validasi spesifikasi komponen dinamis di backend Laravel, dan integrasi webhook Midtrans yang aman.",
    tags: ["Laravel", "MySQL", "Midtrans", "Railway", "Cloudinary"],
    period: "2025",
    type: "Freelance",
    featured: true,
    brushColor: "#d97706",
    github: "https://github.com/Greyari",
  },
  {
    id: "04",
    title: "Corporate Web & Groq AI",
    desc: "Website perusahaan dengan Next.js dan integrasi chatbot berbasis Groq AI dengan latency ultra-rendah untuk otomatisasi customer support 24/7. Deploy ke Vercel.",
    detailedDesc:
      "Implementasi antarmuka corporate masa kini yang mengintegrasikan LLM inference dari Groq AI untuk melayani pertanyaan klien secara instan dengan prompt grounding profil perusahaan.",
    challenge:
      "Memastikan respon chatbot cepat tanpa jeda yang mengganggu pengunjung dan menjaga konsistensi tone respon AI.",
    solution:
      "Server-side streaming API route di Next.js dengan Groq SDK berkecepatan tinggi serta caching respon statis di edge network Vercel.",
    tags: ["Next.js", "TypeScript", "Groq AI", "Vercel"],
    period: "2025",
    type: "Magang",
    featured: true,
    brushColor: "#292524",
    github: "https://github.com/Greyari",
  },
  {
    id: "05",
    title: "Abnormality Management App",
    desc: "Sistem pelaporan abnormalitas lini produksi berbasis .NET dan SQL Server dengan multi-role workflow, approval bertingkat, dan dashboard real-time.",
    detailedDesc:
      "Aplikasi industri manufaktur untuk memitigasi downtime pabrik dengan alur eskalasi insiden mulai dari operator lapangan, supervisor, hingga plant manager.",
    challenge:
      "Integritas flow approval yang ketat, audit log setiap interaksi, dan performa query laporan agregasi pada database SQL Server yang padat transaksi.",
    solution:
      "Arsitektur .NET C# berorientasi domain, repository pattern, dan dashboard reporting interaktif.",
    tags: [".NET", "C#", "SQL Server", "Enterprise"],
    period: "2025",
    type: "Freelance",
    featured: true,
    brushColor: "#f59e0b",
    github: "https://github.com/Greyari",
  },
  {
    id: "06",
    title: "Smart Inventory with RFID",
    desc: "Sistem inventaris web terhubung perangkat keras pembaca RFID untuk pelacakan item, alur peminjaman, dan manajemen data aset terintegrasi.",
    detailedDesc:
      "Penggabungan sensor hardware RFID RC522 dengan backend web Laravel untuk pencatatan otomatis serah-terima alat inventaris tanpa input manual serial number.",
    challenge:
      "Komunikasi serial antara microcontroller RFID reader dan web server lokal dengan penanganan collision tag.",
    solution:
      "Serial port bridge listener yang mem-forward UID tag ke Laravel API endpoint secara real-time.",
    tags: ["Laravel", "RFID", "MySQL", "IoT"],
    period: "Aug — Dec 2024",
    type: "Akademik",
    featured: true,
    brushColor: "#1c1917",
    github: "https://github.com/Greyari",
  },
  {
    id: "07",
    title: "Customer Loyalty System",
    desc: "Backend loyalty engine menggunakan Laravel dengan sistem tier-based ranking otomatis yang memproses riwayat transaksi untuk meningkatkan retensi pelanggan.",
    tags: ["Laravel", "MySQL", "Queue Workers"],
    period: "2025",
    type: "Magang",
    brushColor: "#d97706",
    github: "https://github.com/Greyari",
  },
  {
    id: "08",
    title: "Parking Enhancement & Brevo",
    desc: "Pengembangan lanjutan sistem parkir cerdas: notifikasi email via Brevo, deteksi polygon dari kamera, tunneling Raspberry Pi, deploy Railway.",
    tags: ["Laravel", "YOLO", "Brevo", "Raspberry Pi", "Railway"],
    period: "2025",
    type: "Freelance",
    brushColor: "#292524",
    github: "https://github.com/Greyari",
  },
  {
    id: "09",
    title: "Room & Equipment Borrowing",
    desc: "Sistem peminjaman ruangan dan barang untuk ormawa kampus berbasis web dengan alur reservasi lengkap dan pencegahan bentrok jadwal.",
    tags: ["Laravel", "MySQL", "PDF Generator"],
    period: "2025",
    type: "Freelance",
    brushColor: "#f59e0b",
    github: "https://github.com/Greyari",
  },
  {
    id: "10",
    title: "Smartphone E-Commerce System",
    desc: "Platform penjualan smartphone berbasis web full-stack sebagai Team Lead. Menangani seluruh sisi admin, kontrol akses, pembayaran, dan shopping cart.",
    tags: ["Laravel", "MySQL", "Bootstrap", "Figma"],
    period: "Jan — Jun 2024",
    type: "Akademik",
    brushColor: "#1c1917",
    github: "https://github.com/Greyari",
  },
  {
    id: "11",
    title: "Hospital Internship & Attendance UI",
    desc: "Desain wireframe dan UI/UX untuk sistem manajemen magang dan absensi di lingkungan rumah sakit menggunakan Figma.",
    tags: ["Figma", "UI/UX", "Design System"],
    period: "2025",
    type: "Freelance",
    brushColor: "#d97706",
    github: "https://github.com/Greyari",
  },
  {
    id: "12",
    title: "Computer Device Sales App",
    desc: "Merancang arsitektur sistem dan memetakan proses bisnis via use case & flowchart. Mengembangkan autentikasi, detail produk, dan shopping cart.",
    tags: ["PHP", "MySQL", "Bootstrap"],
    period: "Aug — Dec 2023",
    type: "Akademik",
    brushColor: "#292524",
    github: "https://github.com/Greyari",
  },
];

// ─── Single Two26-Style Portrait Project Card ──────────────────────────────────
function ProjectCard({
  project,
  index,
  onOpenModal,
}: {
  project: ExtendedProjectData;
  index: number;
  onOpenModal: (p: ExtendedProjectData) => void;
}) {
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const brushPathRef = useRef<SVGPathElement>(null);
  const pathLengthRef = useRef<number>(2400);
  const [hovered, setHovered] = useState(false);

  // 3D Perspective + Clip-Mask Entrance on Scroll (Two26 Studio style)
  useEffect(() => {
    const el = cardWrapRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 65,
        rotateX: 16,
        rotateY: -10,
        rotateZ: -3,
        scale: 0.92,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        duration: 0.85,
        delay: (index % 3) * 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
      }
    );
  }, [index]);

  // Initialize SVG brush path strictly hidden so it NEVER appears colored before hover
  useEffect(() => {
    const path = brushPathRef.current;
    if (!path) return;
    const len = path.getTotalLength() || 2400;
    pathLengthRef.current = len;
    gsap.set(path, {
      strokeDasharray: len,
      strokeDashoffset: len,
      strokeWidth: 0,
      opacity: 0,
    });
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    const path = brushPathRef.current;
    if (!path) return;
    gsap.killTweensOf(path);
    gsap.to(path, {
      opacity: 1,
      strokeDashoffset: 0,
      strokeWidth: 860,
      duration: 0.95, // Soft & smooth fill in (+0.2s per request)
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    const path = brushPathRef.current;
    if (!path) return;
    const len = pathLengthRef.current;
    gsap.killTweensOf(path);
    gsap.to(path, {
      strokeDashoffset: len,
      strokeWidth: 0,
      opacity: 0,
      duration: 0.8, // Soft & smooth wipe out (+0.2s per request)
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={cardWrapRef}
      style={{ perspective: "1200px" }}
      className="group flex flex-col cursor-pointer select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenModal(project)}
    >
      {/* Tall Portrait Image Container (`.project-card-img-wrapper` in Two26) */}
      <div className="relative w-full aspect-[4/5] rounded-[30px] overflow-hidden border-2 border-stone-900 bg-stone-100 shadow-[6px_6px_0_0_#1c1917] transition-all duration-300">
        {/* LAYER 1: Dual Photo Placeholder Canvas (2 Foto: Slot Desktop + Slot Mobile) */}
        <div className="absolute inset-0 bg-stone-50 flex flex-col justify-between p-6">
          {/* Subtle architectural blueprint grid */}
          <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />

          {/* Top Bar of Placeholder */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-stone-700 bg-white px-3 py-1 rounded-full border border-stone-300 shadow-2xs">
              PROJECT /{project.id}
            </span>
            <span className="font-mono text-[11px] text-stone-500 font-semibold">
              2 PHOTO SLOTS
            </span>
          </div>

          {/* Center Dual Photo Slots (Slot 1 Desktop + Slot 2 Mobile Overlapping) */}
          <div className="relative z-10 my-auto w-full flex items-center justify-center py-2">
            {/* Slot 1: Desktop Screen Frame */}
            <div className="relative w-[78%] aspect-[16/10] rounded-xl border-2 border-dashed border-stone-400 bg-white shadow-md overflow-hidden flex flex-col group-hover:scale-[0.98] transition-transform duration-300">
              {/* Browser bar */}
              <div className="h-5 bg-stone-100 border-b border-stone-200 px-2 flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                <span className="ml-auto font-mono text-[8px] text-stone-500 font-bold">
                  Desktop Preview (1/2)
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-2 text-center bg-stone-50/70">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6 text-amber-600 mb-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-mono text-[9px] uppercase tracking-wider text-stone-700 font-bold">
                  Foto 1: Main System / UI
                </span>
              </div>
            </div>

            {/* Slot 2: Mobile / Detail Preview (Tilted & Overlapping in front) */}
            <div className="absolute -bottom-2 right-1 sm:right-3 w-[36%] aspect-[9/16] rounded-xl border-2 border-dashed border-amber-600 bg-amber-50/95 shadow-xl overflow-hidden flex flex-col rotate-3 group-hover:rotate-0 transition-all duration-300">
              <div className="h-4 bg-amber-200/80 border-b border-amber-300 flex items-center justify-center shrink-0">
                <span className="w-6 h-1 rounded-full bg-stone-400" />
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-1.5 text-center">
                <span className="font-mono text-[8px] uppercase tracking-wider text-amber-900 font-extrabold leading-tight">
                  Foto 2: Mobile / Detail
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Tech Pills inside Placeholder */}
          <div className="relative z-10 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white text-stone-700 border border-stone-300 font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* LAYER 2: Two26 Studio SVG Brush-Stroke Wipe Layer on Hover */}
        <svg
          viewBox="0 0 400 500"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          fill="none"
        >
          <path
            ref={brushPathRef}
            d="M -60 60 C 120 -20, 280 140, 460 80 C 310 220, 90 200, -60 320 C 140 380, 310 290, 460 440"
            stroke={project.brushColor}
            strokeWidth="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0 }}
          />
        </svg>

        {/* LAYER 3: Solid Non-Transparent Hover Reveal Card */}
        <div
          style={{
            backgroundColor: project.brushColor,
          }}
          className={`absolute inset-0 z-30 p-7 flex flex-col justify-between transition-all duration-300 ease-out ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          } ${project.brushColor === "#f59e0b" || project.brushColor === "#d97706" ? "text-stone-950" : "text-white"}`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-stone-950 text-amber-400 font-bold border border-white/20">
              {project.type}
            </span>
            <span className="font-mono text-xs font-semibold opacity-90">{project.period}</span>
          </div>

          <div className="my-auto">
            <p className="font-mono text-[11px] uppercase tracking-widest opacity-80 mb-2 font-bold">
              System Overview
            </p>
            <h4 className="font-display text-2xl font-bold leading-snug mb-3">
              {project.title}
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed opacity-95 line-clamp-4">
              {project.desc}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-current/20">
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              Buka Case Study
            </span>
            <span className="w-8 h-8 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center font-bold shadow-sm">
              ↗
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer (`.project-detail` in Two26 Studio) */}
      <div className="pt-4 px-1 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Circular Project Monogram Badge */}
          <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
            {project.id}
          </div>

          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold text-stone-900 truncate group-hover:text-amber-600 transition-colors">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-amber-600 font-medium">
              {project.type} • {project.tags.slice(0, 2).join(" & ")}
            </p>
          </div>
        </div>

        {/* Circular Diagonal Arrow Button (`.projects-arrow`) */}
        <div className="w-10 h-10 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-stone-900 group-hover:text-amber-400 group-hover:rotate-45 transition-all duration-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.3} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Main Selected Works Component ────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>("Semua");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ExtendedProjectData | null>(null);

  const categories = ["Semua", "Magang", "Akademik", "Freelance"];
  const filteredByCategory =
    filter === "Semua" ? projects : projects.filter((p) => p.type === filter);
  const visibleProjects =
    showAll || filter !== "Semua" ? filteredByCategory : filteredByCategory.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
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
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-4 sm:px-8 md:px-14 lg:px-20 py-28 bg-white overflow-hidden"
    >
      {/* Header (Two26 Studio "FEATURED PROJECTS" + "SELECTED WORKS") */}
      <div ref={headingRef} className="max-w-6xl mx-auto mb-16 text-center opacity-0">
        <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-amber-600 mb-3">
          <span>✦</span>
          <span>Featured Projects</span>
        </div>

        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-stone-900 uppercase tracking-tight leading-[0.95] mb-8">
          Selected
          <br />
          <span className="text-amber-500">Works</span>
        </h2>

        {/* Filter Tabs */}
        <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-full bg-stone-100 border border-stone-200/80">
          {categories.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  active
                    ? "bg-stone-900 text-amber-400 font-bold shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column Portrait Grid (`.projects-list` in Two26 Studio) */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12">
          {visibleProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>

        {/* Two26 Studio Bottom CTA Block ("WE COULD KEEP GOING...") */}
        <div className="mt-24 pt-16 border-t border-stone-200/80 text-center relative max-w-4xl mx-auto">
          <div className="relative inline-block mb-10 px-4">
            {/* Tilted Pill Badges Overlapping the Big Text */}
            <span className="hidden sm:inline-block absolute -top-5 left-[8%] -rotate-6 px-3.5 py-1 rounded-full bg-stone-900 text-white font-mono text-xs font-bold shadow-md z-10">
              The plot thickens
            </span>
            <span className="hidden sm:inline-block absolute top-[45%] -right-12 md:-right-20 rotate-6 px-3.5 py-1 rounded-full bg-stone-900 text-amber-400 font-mono text-xs font-bold shadow-md z-10">
              12+ Systems Built
            </span>
            <span className="hidden sm:inline-block absolute -bottom-4 left-[28%] -rotate-3 px-3.5 py-1 rounded-full bg-stone-900 text-white font-mono text-xs font-bold shadow-md z-10">
              Production ready
            </span>

            <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-amber-500 uppercase leading-[1.02] tracking-tight">
              We could keep going,
              <br />
              <span className="text-stone-900">
                {showAll
                  ? "and more are in my GitHub."
                  : `there are ${projects.length} projects in total.`}
              </span>
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {filter === "Semua" && (
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-all shadow-md group"
              >
                <span>
                  {showAll
                    ? "Tampilkan 6 Featured Saja"
                    : `Lihat Semua Project (${projects.length})`}
                </span>
                <span className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center group-hover:rotate-45 transition-transform">
                  ↗
                </span>
              </button>
            )}

            <a
              href="https://github.com/Greyari"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 bg-white text-stone-800 text-sm font-medium hover:border-amber-400 hover:text-amber-600 transition-all"
            >
              <span>GitHub Archive (@Greyari)</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
