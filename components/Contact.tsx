"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/greyari",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/greyari",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:grey@example.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative px-6 md:px-16 lg:px-28 pt-28 pb-16 bg-stone-900 overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl" />

      <div ref={contentRef} className="max-w-4xl mx-auto opacity-0">
        {/* Main CTA */}
        <div className="mb-16">
          <p
            className="font-mono text-xs tracking-widest uppercase text-amber-400 mb-4"
          >
            — Let&apos;s Build Together
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Punya ide
            <br />
            <span className="text-amber-400">yang menarik?</span>
          </h2>
          <p
            className="text-stone-400 text-lg max-w-xl leading-relaxed mb-8"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            Saya selalu terbuka untuk kolaborasi, project freelance, atau
            sekadar ngobrol soal teknologi. Jangan ragu untuk reach out! 👋
          </p>

          <a
            href="mailto:grey@example.com"
            className="inline-flex items-center gap-3 px-7 py-4 bg-amber-400 text-stone-900 rounded-full font-semibold text-sm hover:bg-amber-300 transition-colors duration-200 shadow-lg hover:shadow-amber-400/25"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Kirim Pesan
          </a>
        </div>

        {/* Divider */}
        <div className="h-px bg-stone-800 mb-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <p
              className="text-white font-bold text-lg mb-1"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Grey Ari Daniel S.
            </p>
            <p
              className="text-stone-500 text-xs font-mono"
            >
              Full-stack Developer · Batam, Indonesia
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:border-amber-400 hover:text-amber-400 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p
          className="text-stone-600 text-xs font-mono mt-8 text-center"
        >
          © {new Date().getFullYear()} Grey Ari Daniel Simatupang. Built with
          Next.js & ☕
        </p>
      </div>
    </section>
  );
}