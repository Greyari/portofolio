"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Category = "magang" | "freelance" | "akademik";

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
  magang: [
    {
      title: "Software Developer Intern",
      org: "PT Kreatif System Indonesia",
      period: "Aug 2025 — Mar 2026",
      location: "Batam, Indonesia",
      description:
        "Menjalani magang sebagai backend developer dengan fokus pada pengembangan sistem HR, integrasi AI, dan deployment ke server internal perusahaan berbasis Linux/Lubuntu.",
      tags: ["Laravel", "Next.js", "Groq AI", "Linux", "Vercel", "MySQL"],
      projects: [
        {
          name: "HR Information System",
          desc: "Membangun full backend HRIS cross-platform (Mobile & Web) menggunakan Laravel. Menangani manajemen karyawan, absensi, dan penggajian. Bertanggung jawab atas deployment end-to-end ke server internal Linux/Lubuntu perusahaan.",
        },
        {
          name: "Corporate Website & AI Integration",
          desc: "Membangun backend dan sebagian UI menggunakan Next.js. Mengintegrasikan Groq AI-powered chatbot untuk otomatisasi customer support. Deployed ke Vercel.",
        },
        {
          name: "Customer Loyalty System",
          desc: "Merancang backend loyalty engine menggunakan Laravel dengan sistem tier-based ranking otomatis yang memproses riwayat transaksi untuk meningkatkan retensi dan frekuensi pembelian pengguna.",
        },
      ],
    },
  ],
  freelance: [
    {
      title: "Freelance Full Stack Developer",
      org: "Various Clients",
      period: "2024 — Sekarang",
      location: "Remote",
      description:
        "Mengerjakan berbagai project freelance mulai dari sistem web berbasis IoT/AI, aplikasi manajemen, hingga desain UI/UX untuk klien dari berbagai industri.",
      tags: ["Laravel", "YOLO", "Raspberry Pi", ".NET", "SQL Server", "Railway", "Cloudinary", "Figma"],
      projects: [
        {
          name: "Parking Management System (IoT & AI)",
          desc: "Mengembangkan dan meningkatkan sistem parkir cerdas. Menambahkan notifikasi email via Brevo, integrasi deteksi polygon langsung dari kamera di panel admin. Dibangun dengan Laravel, YOLO, Raspberry Pi dengan tunneling, deploy di Railway. Storage via Cloudinary.",
        },
        {
          name: "POS & Inventory System",
          desc: "Membangun sistem POS dan inventory full-stack menggunakan Laravel dan MySQL. Fitur meliputi simulasi rakit PC dengan logika kompatibilitas komponen otomatis dan integrasi Midtrans payment gateway. Deploy di Railway, storage via Cloudinary.",
        },
        {
          name: "Abnormality Management Web App",
          desc: "Membangun sistem pelaporan dan penyelesaian abnormalitas berbasis web untuk lini produksi manufaktur menggunakan .NET dan SQL Server. Fitur multi-role reporting flow (lapor → verifikasi → selesaikan oleh PIC) dan dashboard real-time.",
        },
        {
          name: "Room & Equipment Borrowing System",
          desc: "Mengembangkan sistem manajemen peminjaman ruangan dan barang berbasis web untuk ormawa kampus menggunakan Laravel dan MySQL.",
        },
        {
          name: "Internship & Attendance Management UI",
          desc: "Mendesain wireframe dan UI/UX untuk sistem manajemen magang dan absensi di lingkungan rumah sakit menggunakan Figma.",
        },
      ],
    },
  ],
  akademik: [
    {
      title: "Full Stack Developer",
      org: "Parking Smart Batam",
      period: "Feb 2025 — Jul 2025",
      location: "Politeknik Negeri Batam",
      description:
        "Merancang dan membangun sistem pemantauan parkir dan lalu lintas real-time berbasis AI dan IoT menggunakan Laravel dengan model YOLO untuk deteksi ketersediaan slot parkir.",
      tags: ["Laravel", "YOLO", "IoT", "Raspberry Pi", "Figma", "MySQL"],
      projects: [
        {
          name: "Real-time Parking Detection",
          desc: "Mengintegrasikan model YOLO via API untuk mendeteksi ketersediaan slot parkir dan kondisi lalu lintas secara real-time melalui perangkat IoT.",
        },
        {
          name: "Full-stack Web Platform",
          desc: "Mengembangkan end-to-end fitur: landing page, dashboard, autentikasi dengan verifikasi email, statistik, dan modul monitoring AI/IoT real-time.",
        },
      ],
    },
    {
      title: "Backend Developer",
      org: "Smart Inventory System with RFID",
      period: "Aug 2024 — Dec 2024",
      location: "Politeknik Negeri Batam",
      description:
        "Memimpin pengembangan backend sistem inventaris berbasis web dengan pelacakan item menggunakan RFID. Merancang arsitektur database dan memastikan konsistensi desain UI/UX.",
      tags: ["Laravel", "RFID", "MySQL", "Figma"],
      projects: [
        {
          name: "RFID Tracking Integration",
          desc: "Mengintegrasikan fitur scanning RFID untuk pelacakan item ke dalam sistem web, mencakup autentikasi, alur peminjaman, dan manajemen data item.",
        },
      ],
    },
    {
      title: "Full Stack Developer — Team Lead",
      org: "Web Based Smartphone Sales System",
      period: "Jan 2024 — Jun 2024",
      location: "Politeknik Negeri Batam",
      description:
        "Memimpin tim dalam pengembangan platform penjualan smartphone berbasis web full-stack. Menangani seluruh sisi admin mulai dari manajemen data, kontrol akses, hingga fitur pembayaran.",
      tags: ["Laravel", "MySQL", "Bootstrap", "Figma"],
      projects: [
        {
          name: "Admin Panel & Payment",
          desc: "Mengembangkan full frontend dan backend untuk seluruh halaman admin termasuk manajemen data, kontrol akses, UI/UX, fitur pembayaran, dan shopping cart dari awal.",
        },
      ],
    },
    {
      title: "Full Stack Developer",
      org: "Computer Device Sales Service Application",
      period: "Aug 2023 — Dec 2023",
      location: "Politeknik Negeri Batam",
      description:
        "Merancang arsitektur sistem secara keseluruhan dan memetakan proses bisnis melalui use case dan flowchart sebagai fondasi alur pengembangan tim.",
      tags: ["PHP", "MySQL", "Bootstrap"],
      projects: [
        {
          name: "Core Features Development",
          desc: "Mengembangkan frontend dan backend untuk fitur utama: autentikasi, detail produk, dan shopping cart.",
        },
      ],
    },
  ],
};

const tabs: { key: Category; label: string; emoji: string }[] = [
  { key: "magang", label: "Magang", emoji: "💼" },
  { key: "freelance", label: "Freelance", emoji: "🚀" },
  { key: "akademik", label: "Akademik", emoji: "🎓" },
];

export default function Experience() {
  const [active, setActive] = useState<Category>("magang");
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
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50" />

      <div ref={headingRef} className="max-w-4xl mx-auto mb-16 opacity-0">
        <p className="font-mono text-xs tracking-widest uppercase text-amber-600 mb-3">
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
        <div ref={contentRef} className="space-y-6">
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
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      className="relative bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
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
            <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full whitespace-nowrap">
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
              <span className={`transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}>
                ▶
              </span>
              {expanded ? "Sembunyikan" : "Lihat"} Project ({item.projects.length})
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