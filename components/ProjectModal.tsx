"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export interface ProjectData {
  title: string;
  desc: string;
  detailedDesc?: string;
  challenge?: string;
  solution?: string;
  tags: string[];
  period: string;
  type: "Akademik" | "Magang" | "Freelance";
  featured?: boolean;
  link?: string;
  github?: string;
  size?: "large" | "medium" | "small";
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    // Prevent body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // Animate modal entry
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" }
    );
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
    );

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-stone-200/90 shadow-2xl p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          aria-label="Tutup modal"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            {project.type}
          </span>
          <span className="font-mono text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
            {project.period}
          </span>
          {project.featured && (
            <span className="font-mono text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Featured Case Study
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mb-4 leading-tight">
          {project.title}
        </h3>

        {/* Main Overview */}
        <p className="text-stone-600 text-base leading-relaxed mb-6">
          {project.detailedDesc || project.desc}
        </p>

        {/* Challenge & Solution if available */}
        {(project.challenge || project.solution) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {project.challenge && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
                <span className="font-mono text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Tantangan / Challenge
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            )}
            {project.solution && (
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                <span className="font-mono text-xs font-semibold text-amber-700 uppercase tracking-wider block mb-1">
                  Solusi & Arsitektur
                </span>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-8 border-t border-stone-100 pt-5">
          <span className="font-mono text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-3">
            Teknologi & Tools
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono bg-stone-100 text-stone-800 border border-stone-200/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions / Links */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-100">
          <a
            href={project.link || project.github || "https://github.com/Greyari"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-amber-500 hover:text-stone-950 transition-colors"
          >
            <span>Kunjungi Repositori / GitHub</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-full border border-stone-200 text-stone-600 text-xs font-medium hover:bg-stone-50 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
