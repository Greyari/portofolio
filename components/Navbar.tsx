"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Beranda", href: "#overview" },
  { label: "About", href: "#about" },
  { label: "Selected Works", href: "#projects" },
  { label: "My Thing", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const roles = [
  "dev",
  "full-stack",
  "ai engineer",
  "system architect",
  "next.js artisan",
  "iot builder",
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // ── Typewriter (Typing In & Out) State ────────────────────────────────────
  const [typewriterText, setTypewriterText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const isScrolled = useRef(false);
  const blurProxy = useRef({ blur: 0 });

  // ── Smooth Typewriter Effect for Brand Role ──────────────────────────────
  useEffect(() => {
    const currentRole = roles[roleIdx];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && typewriterText === currentRole) {
      // Pause at full word before backspacing out
      timeout = setTimeout(() => setIsDeleting(true), 1600);
    } else if (isDeleting && typewriterText === "") {
      // Finished backspacing: switch to next role after slight pause
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }, 300);
    } else {
      // Typing in (85ms) or deleting out (42ms)
      const speed = isDeleting ? 42 : 85;
      timeout = setTimeout(() => {
        setTypewriterText((prev) =>
          isDeleting
            ? currentRole.slice(0, prev.length - 1)
            : currentRole.slice(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, roleIdx]);

  // ── Scroll Progress & Smooth Glass Morph In/Out ──────────────────────────
  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;

    const applyGlassState = (scrolled: boolean) => {
      gsap.killTweensOf(pill);
      gsap.killTweensOf(blurProxy.current);

      if (scrolled) {
        gsap.to(blurProxy.current, {
          blur: 16,
          duration: 0.55,
          ease: "power3.out",
          onUpdate: () => {
            const b = `blur(${blurProxy.current.blur.toFixed(1)}px)`;
            pill.style.backdropFilter = b;
            pill.style.setProperty("-webkit-backdrop-filter", b);
          },
        });
        gsap.to(pill, {
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          boxShadow: "0 10px 30px -5px rgba(28, 25, 23, 0.07)",
          borderColor: "rgba(231, 229, 228, 0.88)",
          paddingTop: "10px",
          paddingBottom: "10px",
          duration: 0.55,
          ease: "power3.out",
        });
      } else {
        gsap.to(blurProxy.current, {
          blur: 0,
          duration: 0.5,
          ease: "power3.inOut",
          onUpdate: () => {
            const b =
              blurProxy.current.blur > 0.2
                ? `blur(${blurProxy.current.blur.toFixed(1)}px)`
                : "none";
            pill.style.backdropFilter = b;
            pill.style.setProperty("-webkit-backdrop-filter", b);
          },
        });
        gsap.to(pill, {
          backgroundColor: "rgba(255, 255, 255, 0)",
          boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0)",
          borderColor: "rgba(231, 229, 228, 0)",
          paddingTop: "14px",
          paddingBottom: "14px",
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);

      // Top area auto-highlights "Beranda"
      if (scrollY < 240) {
        setActiveSection("overview");
      }

      if (scrollY > 40 && !isScrolled.current) {
        isScrolled.current = true;
        applyGlassState(true);
      } else if (scrollY <= 40 && isScrolled.current) {
        isScrolled.current = false;
        applyGlassState(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section detection ──────────────────────────────────────────────
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && window.scrollY >= 240) {
            setActiveSection(id);
          }
        },
        { threshold: 0.22 }
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
      { y: -60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power4.out",
        delay: 0.3,
        clearProps: "opacity",
      }
    );
  }, []);

  // ── Close menu on resize ──────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Smooth Scroll Handler (Coordinates with Lenis) ────────────────────────
  const scrollToHref = (href: string) => {
    setMenuOpen(false);
    const lenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (
            target: number | HTMLElement | string,
            opts?: { duration?: number; offset?: number }
          ) => void;
        };
      }
    ).__lenis;

    if (href === "#overview" || href === "#") {
      setActiveSection("overview");
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.1 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const targetEl = document.querySelector(href) as HTMLElement | null;
    if (targetEl) {
      const id = href.replace("#", "");
      setActiveSection(id);
      if (lenis) {
        lenis.scrollTo(targetEl, { duration: 1.1, offset: -24 });
      } else {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 origin-left"
          style={{
            width: `${progress}%`,
            transition: "width 0.1s linear",
            boxShadow: "0 0 10px rgba(245,158,11,0.6)",
          }}
        />
      </div>

      {/* Main Floating Navbar */}
      <nav
        ref={navRef}
        aria-label="Main Navigation"
        className="fixed top-3 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8"
        style={{ opacity: 0 }}
      >
        <div
          ref={pillRef}
          className="max-w-6xl mx-auto flex items-center justify-between px-5 rounded-full border"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0)",
            boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0)",
            borderColor: "rgba(231, 229, 228, 0)",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            paddingTop: "14px",
            paddingBottom: "14px",
          }}
        >
          {/* Studio Brand Identity with Fixed-Width Typewriter to Protect Navbar Links */}
          <a
            href="#overview"
            className="flex items-center gap-1.5 sm:gap-2 group py-1 shrink-0 w-[185px] sm:w-[245px]"
            onClick={(e) => {
              e.preventDefault();
              scrollToHref("#overview");
            }}
          >
            <span className="text-stone-900 font-display font-bold text-sm sm:text-base tracking-tight group-hover:text-amber-600 transition-colors duration-200 shrink-0">
              Grey Ari
            </span>
            <span className="text-stone-300 font-mono text-xs shrink-0">
              /
            </span>
            <div className="flex items-center font-mono text-[9px] sm:text-[11px] font-semibold tracking-wider uppercase text-amber-800 bg-amber-50/90 border border-amber-300/80 px-1.5 sm:px-2 py-0.5 rounded-full shadow-2xs whitespace-nowrap min-w-0 max-w-[105px] sm:max-w-[145px]">
              <span className="truncate">{typewriterText}</span>
              <span className="inline-block w-[1.5px] h-3 bg-amber-600 ml-0.5 animate-pulse shrink-0" />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <NavLink
                  key={link.href}
                  href={link.href}
                  isActive={activeSection === id}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHref(link.href);
                  }}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToHref("#contact");
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full
                bg-stone-900 text-white text-xs font-medium tracking-wide
                hover:bg-amber-500 hover:text-stone-950 transition-all duration-200 shadow-sm"
            >
              <span>Hire Me</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </a>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`w-5 h-0.5 bg-stone-800 transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-stone-800 transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-stone-800 transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-5 shadow-xl space-y-2">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHref(link.href);
                  }}
                  className={`block px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-amber-50 text-amber-700 font-semibold"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 border-t border-stone-100">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHref("#contact");
                }}
                className="block w-full text-center py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold tracking-wide hover:bg-amber-500 hover:text-stone-950 transition-colors"
              >
                Hire Me ↗
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// ── NavLink with GSAP hover ───────────────────────────────────────────────────
function NavLink({
  href,
  isActive,
  onClick,
  children,
}: {
  href: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseEnter={() => {
        if (!isActive)
          gsap.to(ref.current, { y: -1.5, duration: 0.2, ease: "power2.out" });
      }}
      onMouseLeave={() =>
        gsap.to(ref.current, { y: 0, duration: 0.25, ease: "power2.inOut" })
      }
      className={`relative inline-block px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-200 ${
        isActive
          ? "text-stone-900 font-semibold"
          : "text-stone-600 hover:text-stone-900"
      }`}
    >
      {isActive && (
        <span className="absolute inset-0 rounded-full bg-amber-50 border border-amber-200/80 -z-10 shadow-2xs" />
      )}
      <span className="relative">{children}</span>
    </a>
  );
}
