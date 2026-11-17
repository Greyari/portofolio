"use client";

import React from "react";

interface StackItem {
  name: string;
  color: string;
  icon: React.ReactNode;
}

const stackItems: StackItem[] = [
  {
    name: "Laravel",
    color: "#FF2D20",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L4 7.5v9L12 21l8-4.5v-9L12 3zm0 9l8-4.5M12 12v9m0-9L4 7.5" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    color: "#171717",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.89 14.82l-6.64-8.57v6.75H8.8V8h1.68l5.55 7.18A8.03 8.03 0 0016.89 16.82zM15.2 13.5h-1.45V8h1.45v5.5z" />
      </svg>
    ),
  },
  {
    name: "Flutter",
    color: "#02569B",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M14.314 2L4.5 11.814l3.028 3.028L20.37 2h-6.056zm.014 9.057L9.085 16.3l5.243 5.7h6.057l-5.257-5.7 5.257-5.243h-6.057z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M3 3h18v18H3V3zm10.7 9.1v1.4h-1.8V19h-1.6v-5.5H8.5v-1.4h5.2zm5.1 3.8c0 1.2-.9 2.1-2.5 2.1-1.1 0-1.9-.4-2.3-.9l.9-1.1c.3.4.8.6 1.4.6.6 0 .9-.2.9-.6 0-.4-.3-.6-1.1-.9-1.2-.4-1.9-.9-1.9-2 0-1.1.9-1.9 2.3-1.9.9 0 1.6.3 2.1.7l-.8 1.1c-.4-.3-.8-.5-1.3-.5-.5 0-.8.2-.8.5 0 .4.3.5 1.1.8 1.3.5 2 1 2 2.1z" />
      </svg>
    ),
  },
  {
    name: "PHP",
    color: "#777BB4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} className="w-5 h-5">
        <ellipse cx="12" cy="12" rx="10" ry="6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 14l1-4h1.5a1.2 1.2 0 010 2.4H7.5M14.5 14l1-4H17a1.2 1.2 0 010 2.4h-2M11 10l-1 4m2.5-4l-1 4m-1.2-2h2" />
      </svg>
    ),
  },
  {
    name: ".NET & C#",
    color: "#512BD4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path strokeLinecap="round" d="M8 15a3 3 0 010-6m5 1.5h4m-4 3h4M14.5 9v6m2.5-6v6" />
      </svg>
    ),
  },
  {
    name: "Python",
    color: "#3776AB",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4 0-4 2-4 3.5V9h4v1H6.5C4.5 10 3 11.5 3 14s1.5 4 3.5 4H8v-2.5C8 14 9 13 10.5 13h3c1.2 0 2.5-.8 2.5-2.5v-4C16 4.5 15 3 12 3zm0 18c4 0 4-2 4-3.5V15h-4v-1h5.5c2 0 3.5-1.5 3.5-4s-1.5-4-3.5-4H16v2.5c0 1.5-1 2.5-2.5 2.5h-3C9.3 11 8 11.8 8 13.5v4C8 19.5 9 21 12 21z" />
      </svg>
    ),
  },
  {
    name: "YOLOv8 AI",
    color: "#f59e0b",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m-4 12h2a2 2 0 002-2v-2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: "Raspberry Pi",
    color: "#C51A4A",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} className="w-5 h-5">
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path strokeLinecap="round" d="M9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3" />
      </svg>
    ),
  },
  {
    name: "MySQL",
    color: "#00758F",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} className="w-5 h-5">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    color: "#06B6D4",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z" />
      </svg>
    ),
  },
  {
    name: "Railway",
    color: "#0B0D0E",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 15h16M4 11h14l-3-5H7l-3 5zm2 4l-2 4m14-4l2 4" />
      </svg>
    ),
  },
  {
    name: "Cloudflare",
    color: "#F38020",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 19H7a4 4 0 01-.5-7.97A6 6 0 0118 10a4.5 4.5 0 01-.5 9z" />
      </svg>
    ),
  },
  {
    name: "Linux Server",
    color: "#FCC624",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} className="w-5 h-5">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 9l3 3-3 3m5 0h4" />
      </svg>
    ),
  },
  {
    name: "Git & GitHub",
    color: "#F05032",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} className="w-5 h-5">
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <path strokeLinecap="round" d="M6 8.5v7M18 8.5c0 4-3 5.5-12 5.5" />
      </svg>
    ),
  },
];

export default function Ticker() {
  return (
    <div className="relative w-full border-y border-stone-200/80 bg-stone-50/80 overflow-hidden py-4 select-none">
      {/* Subtle left & right fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-stone-50 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-stone-50 to-transparent z-10" />

      <div className="flex w-max items-center animate-marquee pause-hover">
        {[0, 1].map((trackIdx) => (
          <div
            key={trackIdx}
            aria-hidden={trackIdx === 1}
            className="flex items-center gap-4 shrink-0 pr-4"
          >
            {stackItems.map((item, idx) => (
              <div
                key={`${trackIdx}-${idx}`}
                className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-stone-200/90 hover:border-amber-400 shadow-2xs transition-all duration-200"
              >
                <span
                  style={{ color: item.color }}
                  className="transition-transform duration-200 group-hover:scale-110"
                >
                  {item.icon}
                </span>
                <span className="font-mono text-xs font-semibold tracking-wide text-stone-800 group-hover:text-amber-600 transition-colors">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
