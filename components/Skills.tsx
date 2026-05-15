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

// ─── CountUp (React Bits) ─────────────────────────────────────────────────────
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

// ─── AnimatedList (React Bits) ────────────────────────────────────────────────
function AnimatedList({
  children,
  className = "",
  delay = 80,
}: {
  children: React.ReactNode[];
  className?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState<boolean[]>(
    new Array(children.length).fill(false)
  );
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          children.forEach((_, i) => {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * delay);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [children.length, delay]);

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: visible[i] ? 1 : 0,
            transform: visible[i] ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const skillGroups = [
  {
    label: "Frontend",
    color: "amber",
    skills: [
      { name: "Next.js", level: 90 },
      { name: "React", level: 88 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 92 },
    ],
  },
  {
    label: "Backend",
    color: "stone",
    skills: [
      { name: "Laravel", level: 90 },
      { name: "PHP", level: 85 },
      { name: "Node.js", level: 72 },
      { name: "REST API", level: 88 },
    ],
  },
  {
    label: "Database & Tools",
    color: "amber",
    skills: [
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 70 },
      { name: "Git / GitHub", level: 88 },
      { name: "Docker", level: 60 },
    ],
  },
];

const stats = [
  { value: 3, suffix: "+", label: "Tahun Pengalaman" },
  { value: 15, suffix: "+", label: "Project Selesai" },
  { value: 8, suffix: "+", label: "Klien Puas" },
  { value: 2, suffix: "x", label: "Magang Industri" },
];

// ─── Component ────────────────────────────────────────────────────────────────
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
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

      {/* Heading */}
      <div ref={headingRef} className="max-w-4xl mx-auto mb-20 opacity-0">
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

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Stats CountUp */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center p-6 rounded-2xl bg-stone-50 border border-stone-100"
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

        {/* Skill bars per group */}
        {skillGroups.map((group) => (
          <div key={group.label}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-stone-100" />
              <span className="font-mono text-xs tracking-widest uppercase text-stone-400">
                {group.label}
              </span>
              <div className="h-px flex-1 bg-stone-100" />
            </div>

            <AnimatedList
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              delay={100}
            >
              {group.skills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </AnimatedList>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const filled = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          if (filled.current) {
            filled.current.style.width = `${level}%`;
          }
        }
      },
      { threshold: 0.5 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={barRef} className="group">
      <div className="flex justify-between items-center mb-2">
        <span
          className="text-sm font-medium text-stone-700"
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {name}
        </span>
        <span className="font-mono text-xs text-stone-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
        <div
          ref={filled}
          className="h-full bg-amber-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}