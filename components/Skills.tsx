"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── DecryptedText (React Bits) ───────────────────────────────────────────────
function DecryptedText({
  text,
  className = "",
  speed = 50,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState(text);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          setRevealed(true);
          let iteration = 0;
          const total = text.length;
          const interval = setInterval(() => {
            setDisplayed(
              text
                .split("")
                .map((char, i) => {
                  if (char === " ") return " ";
                  if (i < iteration) return char;
                  return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("")
            );
            iteration += 0.5;
            if (iteration >= total) clearInterval(interval);
          }, speed);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [text, revealed, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {displayed}
    </span>
  );
}

// ─── CountUp ─────────────────────────────────────────────────────────────────
function CountUp({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
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
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const skillGroups = [
  {
    label: "Backend",
    icon: "⚙️",
    skills: ["Laravel", "PHP", "REST API", ".NET", "C#", "Python"],
  },
  {
    label: "Frontend & Mobile",
    icon: "🖥️",
    skills: ["Flutter", "Next.js", "Alpine.js", "Blade", "TypeScript", "HTML/CSS"],
  },
  {
    label: "Database",
    icon: "🗄️",
    skills: ["MySQL", "SQL Server", "Firebase", "SQLite"],
  },
  {
    label: "DevOps & Deploy",
    icon: "🚀",
    skills: ["Railway", "Cloudflare", "Cloudinary", "Vercel", "Linux", "Lubuntu"],
  },
  {
    label: "IoT & AI",
    icon: "🤖",
    skills: ["Raspberry Pi", "YOLO", "ESP32", "Arduino"],
  },
  {
    label: "Tools",
    icon: "🛠️",
    skills: ["Git", "Postman", "Figma", "Canva", "VS Code"],
  },
];

const stats = [
  { value: 3, suffix: "+", label: "Tahun Pengalaman" },
  { value: 12, suffix: "+", label: "Project Selesai" },
  { value: 12, suffix: "+", label: "Klien Puas" },
  { value: 1, suffix: "x", label: "Magang Industri" },
];

// ─── Skill Badge ──────────────────────────────────────────────────────────────
function SkillBadge({ name, index }: { name: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.8, y: 10 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        delay: index * 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
        },
      }
    );
  }, [index]);

  return (
    <span
      ref={ref}
      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono 
        bg-stone-50 text-stone-700 border border-stone-200 
        hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700
        transition-all duration-200 cursor-default opacity-0"
    >
      {name}
    </span>
  );
}

// ─── Skill Group Card ─────────────────────────────────────────────────────────
function SkillGroupCard({
  group,
  index,
}: {
  group: (typeof skillGroups)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl border border-stone-200 p-6 
        hover:border-amber-200 hover:shadow-md transition-all duration-300 opacity-0"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{group.icon}</span>
        <span
          className="text-xs font-mono tracking-widest uppercase text-stone-400"
        >
          {group.label}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill, i) => (
          <SkillBadge key={skill} name={skill} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

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
      id="skills"
      ref={sectionRef}
      className="relative px-6 md:px-16 lg:px-28 py-28 bg-white overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

      {/* Heading */}
      <div ref={headingRef} className="max-w-4xl mx-auto mb-16 opacity-0">
        <p className="font-mono text-xs tracking-widest uppercase text-amber-600 mb-3">
          — Kemampuan
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          <DecryptedText text="Skills &" speed={40} />
          <br />
          <span className="text-stone-400">
            <DecryptedText text="Tech Stack" speed={40} />
          </span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center p-6 rounded-2xl bg-stone-50 border border-stone-100 
                hover:border-amber-200 transition-colors duration-200"
            >
              <p
                className="text-3xl md:text-4xl font-bold text-stone-900 mb-1"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                <CountUp end={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs text-stone-500 font-mono">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillGroups.map((group, i) => (
            <SkillGroupCard key={group.label} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}