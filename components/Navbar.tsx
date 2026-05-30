"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const isScrolled = useRef(false);

  // ── Scroll: progress + GSAP morph ────────────────────────────────────────
  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);

      if (scrollY > 40 && !isScrolled.current) {
        isScrolled.current = true;
        // Aktifkan blur + glass saat scroll
        pill.style.backdropFilter = "blur(14px)";
        (pill.style as any).webkitBackdropFilter = "blur(14px)";
        gsap.to(pill, {
          backgroundColor: "rgba(255,255,255,0.82)",
          boxShadow: "0 1px 24px 0 rgba(0,0,0,0.07)",
          borderColor: "rgba(214,211,208,0.55)",
          duration: 0.45,
          ease: "power2.out",
        });
      } else if (scrollY <= 40 && isScrolled.current) {
        isScrolled.current = false;
        gsap.to(pill, {
          backgroundColor: "rgba(255,255,255,0)",
          boxShadow: "0 0px 0px 0 rgba(0,0,0,0)",
          borderColor: "rgba(214,211,208,0)",
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => {
            // Matikan blur setelah animasi selesai
            pill.style.backdropFilter = "none";
            pill.style.webkitBackdropFilter = "none";
          },
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section ────────────────────────────────────────────────────────
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Entrance animation ────────────────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -72, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", delay: 0.4, clearProps: "opacity" }
    );
  }, []);

  // ── Close menu on resize ──────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-amber-400 origin-left"
          style={{
            width: `${progress}%`,
            transition: "width 0.1s linear",
            boxShadow: "0 0 8px rgba(251,191,36,0.5)",
          }}
        />
      </div>

      {/* Navbar */}
      <nav
        ref={navRef}
        className="fixed top-2 left-0 right-0 z-50 px-4 md:px-8"
        style={{ opacity: 0 }}
      >
        <div
          ref={pillRef}
          className="max-w-5xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl border"
          style={{
            // Awal: transparan, tanpa blur sama sekali
            backgroundColor: "rgba(255,255,255,0)",
            boxShadow: "0 0px 0px 0 rgba(0,0,0,0)",
            borderColor: "rgba(214,211,208,0)",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
          }}
        >
          {/* Brand */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <span
              className="text-stone-900 font-bold text-sm tracking-tight group-hover:text-amber-500 transition-colors duration-200"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Grey Ari
            </span>
            <span className="hidden sm:inline text-stone-300 text-xs font-mono">/</span>
            <span className="hidden sm:inline text-stone-400 text-xs font-mono">dev</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <NavLink key={link.href} href={link.href} isActive={activeSection === id}>
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl
                bg-stone-900 text-white text-xs font-medium
                hover:bg-amber-500 transition-colors duration-200 shadow-sm"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              Hire Me
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-stone-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-5 bg-stone-700 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-5 bg-stone-700 rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-stone-700 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`md:hidden mx-auto max-w-5xl mt-2 overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div
            className="rounded-2xl shadow-lg p-3 flex flex-col gap-1 border border-stone-200/60"
            style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
          >
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive ? "bg-amber-50 text-stone-900 border border-amber-200" : "text-stone-600 hover:bg-stone-50"}`}
                  style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="h-px bg-stone-100 my-1" />
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-center bg-stone-900 text-white hover:bg-amber-500 transition-colors duration-200"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              Hire Me →
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

// ── NavLink with GSAP hover ───────────────────────────────────────────────────
function NavLink({ href, isActive, children }: { href: string; isActive: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={ref}
      href={href}
      onMouseEnter={() => { if (!isActive) gsap.to(ref.current, { y: -2, duration: 0.2, ease: "power2.out" }); }}
      onMouseLeave={() => gsap.to(ref.current, { y: 0, duration: 0.25, ease: "power2.inOut" })}
      className={`relative inline-block px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200
        ${isActive ? "text-stone-900" : "text-stone-500 hover:text-stone-800"}`}
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      {isActive && <span className="absolute inset-0 rounded-xl bg-amber-50 border border-amber-200" />}
      <span className="relative">{children}</span>
    </a>
  );
}