"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface CalendarData {
  totalContributions: number;
  weeks: Week[];
  profile?: {
    publicRepos?: number;
    followers?: number;
    avatarUrl?: string;
    bio?: string;
  } | null;
}

function getColor(count: number): string {
  if (count === 0) return "bg-stone-100 border-stone-200/70";
  if (count <= 2) return "bg-amber-200 border-amber-300";
  if (count <= 5) return "bg-amber-300 border-amber-400";
  if (count <= 9) return "bg-amber-400 border-amber-500";
  return "bg-amber-500 border-amber-600";
}

function formatIndoDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return dateStr;
  }
}

export default function GitHubGraph() {
  const [data, setData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);
  const [displayedDay, setDisplayedDay] = useState<ContributionDay | null>(null);

  const drawerRef = useRef<HTMLDivElement>(null);
  const innerCardRef = useRef<HTMLDivElement>(null);

  const handleSelectDay = (day: ContributionDay) => {
    if (selectedDay?.date === day.date) {
      setSelectedDay(null);
    } else {
      setDisplayedDay(day);
      setSelectedDay(day);
    }
  };

  // ── Butter-Smooth GSAP Drawer Animation for Selected Contribution Day ────
  useEffect(() => {
    const el = drawerRef.current;
    const card = innerCardRef.current;
    if (!el || !card) return;

    if (selectedDay) {
      gsap.killTweensOf([el, card]);
      gsap.to(el, {
        height: "auto",
        marginTop: 16,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.fromTo(
        card,
        { opacity: 0, y: -12, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out", delay: 0.05 }
      );
    } else {
      gsap.killTweensOf([el, card]);
      gsap.to(card, {
        opacity: 0,
        y: -8,
        scale: 0.98,
        duration: 0.22,
        ease: "power2.in",
      });
      gsap.to(el, {
        height: 0,
        marginTop: 0,
        duration: 0.38,
        ease: "power3.inOut",
        delay: 0.06,
      });
    }
  }, [selectedDay]);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => {
        if (d && !d.error && d.weeks && d.weeks.length > 0) {
          setData(d);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full h-56 rounded-3xl border border-stone-200 bg-white p-8 animate-pulse flex flex-col justify-between">
        <div className="h-6 w-56 bg-stone-100 rounded-lg" />
        <div className="h-24 w-full bg-stone-50 rounded-xl" />
        <div className="h-4 w-40 bg-stone-100 rounded" />
      </div>
    );
  }

  if (!data) return null;

  const weeks = data.weeks.slice(-52);

  // Compute live statistics from @Greyari's real data
  let activeDays = 0;
  let maxDay: ContributionDay = { contributionCount: 0, date: "-" };
  weeks.forEach((w) =>
    w.contributionDays.forEach((d) => {
      if (d.contributionCount > 0) activeDays++;
      if (d.contributionCount > maxDay.contributionCount) maxDay = d;
    })
  );

  const months: { label: string; col: number }[] = [];
  weeks.forEach((week, i) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const d = new Date(firstDay.date);
    if (d.getDate() <= 7) {
      months.push({
        label: d.toLocaleString("id-ID", { month: "short" }),
        col: i,
      });
    }
  });

  return (
    <div className="relative rounded-3xl border-2 border-stone-900 bg-white p-6 sm:p-8 shadow-[6px_6px_0_0_#1c1917] transition-all duration-300">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Greyari"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center hover:bg-amber-500 hover:text-stone-950 transition-colors shrink-0 shadow-sm"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                GitHub Live Activity
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 font-mono text-[10px] font-bold uppercase text-amber-800">
                ✦ Real-Time @Greyari
              </span>
            </div>
            <p className="text-xs font-mono text-stone-500 mt-0.5">
              Sinkronisasi otomatis dari github.com/Greyari • 52 Minggu Terakhir
            </p>
          </div>
        </div>

        {/* Live Telemetry Mini-Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          <div className="px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <span className="block font-display text-xl sm:text-2xl font-bold text-stone-900 leading-none">
              {data.totalContributions.toLocaleString()}
            </span>
            <span className="font-mono text-[10px] uppercase text-stone-500">
              Total Commits
            </span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <span className="block font-display text-xl sm:text-2xl font-bold text-amber-600 leading-none">
              {activeDays}
            </span>
            <span className="font-mono text-[10px] uppercase text-stone-500">
              Active Days
            </span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <span className="block font-display text-xl sm:text-2xl font-bold text-stone-900 leading-none">
              {maxDay.contributionCount}
            </span>
            <span className="font-mono text-[10px] uppercase text-stone-500">
              Peak / Day
            </span>
          </div>
        </div>
      </div>

      {/* Contribution Calendar Scrollable Grid (Scroll-friendly, without Lenis freeze) */}
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="min-w-max">
          {/* Month labels */}
          <div className="flex gap-1.5 mb-2 pl-0">
            {weeks.map((_, i) => {
              const month = months.find((m) => m.col === i);
              return (
                <div key={i} className="w-3.5 flex-shrink-0">
                  {month ? (
                    <span className="text-[10px] font-mono font-semibold text-stone-400 whitespace-nowrap">
                      {month.label}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Grid of days */}
          <div className="flex gap-1.5">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1.5">
                {week.contributionDays.map((day, di) => {
                  const isSelected = selectedDay?.date === day.date;
                  return (
                    <button
                      key={di}
                      type="button"
                      aria-label={`${day.contributionCount} kontribusi pada ${day.date}`}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      onClick={() => handleSelectDay(day)}
                      className={`w-3.5 h-3.5 rounded-[4px] border ${getColor(
                        day.contributionCount
                      )} transition-all duration-150 hover:scale-135 hover:z-10 cursor-pointer ${
                        isSelected
                          ? "ring-2 ring-stone-950 scale-125 z-20 shadow-md"
                          : ""
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Interactive Click Details Drawer (GSAP Butter-Smooth Height, Fade & Slide) */}
          <div
            ref={drawerRef}
            className="w-full overflow-hidden"
            style={{ height: 0, marginTop: 0 }}
          >
            {displayedDay && (
              <div
                ref={innerCardRef}
                className="p-4 rounded-2xl bg-amber-50 border-2 border-stone-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm will-change-transform"
                style={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-500 text-stone-950 font-display font-extrabold text-lg flex items-center justify-center shrink-0 border-2 border-stone-900 shadow-xs">
                    {displayedDay.contributionCount}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-stone-900 text-sm sm:text-base">
                      {formatIndoDate(displayedDay.date)}
                    </h4>
                    <p className="font-mono text-xs text-amber-900">
                      {displayedDay.contributionCount > 0
                        ? `${displayedDay.contributionCount} commit / kontribusi tercatat di GitHub @Greyari`
                        : "Tidak ada commit publik pada tanggal ini."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://github.com/Greyari?tab=overview&from=${displayedDay.date}&to=${displayedDay.date}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-stone-950 transition-colors shadow-xs"
                  >
                    <span>Buka di GitHub</span>
                    <span className="text-amber-400">↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedDay(null)}
                    className="px-3.5 py-2 rounded-full bg-white text-stone-700 border border-stone-300 font-mono text-xs font-bold hover:bg-stone-100 hover:text-stone-950 transition-colors cursor-pointer"
                  >
                    Tutup ×
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer of Card: Interactive Hover Status & Legend */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-stone-100">
            <div className="font-mono text-xs text-stone-600">
              {hoveredDay ? (
                <span>
                  <strong className="text-stone-900">
                    {hoveredDay.contributionCount} contributions
                  </strong>{" "}
                  pada tanggal{" "}
                  <span className="text-amber-700 font-semibold">
                    {hoveredDay.date}
                  </span>{" "}
                  <span className="text-stone-400 text-[11px]">
                    (Klik untuk info lengkap)
                  </span>
                </span>
              ) : (
                <span>
                  Arahkan atau klik kotak untuk melihat detail kontribusi harian{" "}
                  <a
                    href="https://github.com/Greyari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 font-bold hover:underline ml-1"
                  >
                    @Greyari ↗
                  </a>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 justify-end">
              <span className="text-[10px] font-mono text-stone-400">Less</span>
              {[
                "bg-stone-100",
                "bg-amber-200",
                "bg-amber-300",
                "bg-amber-400",
                "bg-amber-500",
              ].map((c, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-[3px] ${c} border border-stone-200/80`}
                />
              ))}
              <span className="text-[10px] font-mono text-stone-400">More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
