"use client";

import { useEffect, useState } from "react";

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
}

function getColor(count: number): string {
  if (count === 0) return "bg-stone-100 border-stone-200";
  if (count <= 3) return "bg-amber-200 border-amber-300";
  if (count <= 6) return "bg-amber-300 border-amber-400";
  if (count <= 9) return "bg-amber-400 border-amber-500";
  return "bg-amber-500 border-amber-600";
}

export default function GitHubGraph() {
  const [data, setData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(true);
        else setData(d);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full h-32 rounded-2xl bg-stone-100 animate-pulse" />
    );
  }

  if (error || !data) return null;

  // Ambil 52 minggu terakhir
  const weeks = data.weeks.slice(-52);

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
    <div className="rounded-2xl border border-stone-200 bg-white p-6 hover:border-amber-200 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-stone-600">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
            GitHub Activity
          </span>
        </div>
        <span
          className="text-sm font-semibold text-stone-900"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          {data.totalContributions.toLocaleString()} contributions
        </span>
      </div>

      {/* Graph */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Month labels */}
          <div className="flex gap-1 mb-1 pl-0">
            {weeks.map((_, i) => {
              const month = months.find((m) => m.col === i);
              return (
                <div key={i} className="w-3 flex-shrink-0">
                  {month ? (
                    <span className="text-[9px] font-mono text-stone-400 whitespace-nowrap">
                      {month.label}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.contributionDays.map((day, di) => (
                  <div
                    key={di}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                    className={`w-3 h-3 rounded-sm border ${getColor(day.contributionCount)} 
                      transition-all duration-150 hover:scale-125 cursor-default`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1.5 mt-3 justify-end">
            <span className="text-[10px] font-mono text-stone-400">Less</span>
            {["bg-stone-100", "bg-amber-200", "bg-amber-300", "bg-amber-400", "bg-amber-500"].map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${c} border border-stone-200`} />
            ))}
            <span className="text-[10px] font-mono text-stone-400">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}