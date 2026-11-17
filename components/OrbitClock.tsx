"use client";

import { useEffect, useRef, useState } from "react";

interface LineSpring {
  bend: number;
  vel: number;
  birthTime: number;
}

export default function OrbitClock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const secRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [hm, setHm] = useState<{ h: string; m: string }>({ h: "00", m: "00" });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // 60 spring states for the 60 seconds
    const springs: LineSpring[] = Array.from({ length: 60 }, () => ({
      bend: 0,
      vel: 0,
      birthTime: 0,
    }));

    let lastSec = -1;
    let lastMin = -1;
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, lastX: -9999, lastY: -9999 };

    const onMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (mouse.lastX !== -9999) {
        mouse.vx = x - mouse.lastX;
        mouse.vy = y - mouse.lastY;
      }
      mouse.x = x;
      mouse.y = y;
      mouse.lastX = x;
      mouse.lastY = y;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let rafId = 0;
    let prevTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - prevTime) / 1000, 0.05);
      prevTime = now;

      // Get Batam time (Asia/Jakarta, UTC+7)
      const dateNow = new Date();
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).formatToParts(dateNow);

      const hStr = parts.find((p) => p.type === "hour")?.value ?? "00";
      const mStr = parts.find((p) => p.type === "minute")?.value ?? "00";
      const sNum = parseInt(parts.find((p) => p.type === "second")?.value ?? "0", 10);

      const curMin = parseInt(mStr, 10);
      if (curMin !== lastMin) {
        lastMin = curMin;
        setHm({ h: hStr, m: mStr });
      }

      // Trigger pluck when a new second enters
      if (sNum !== lastSec) {
        if (lastSec !== -1 && springs[sNum]) {
          springs[sNum].birthTime = now;
          springs[sNum].vel += 165;
        } else {
          // Initial mount: set birth times in the past for already-elapsed seconds
          for (let i = 0; i <= sNum; i++) {
            springs[i].birthTime = now - 1000;
          }
        }
        lastSec = sNum;
      }

      ctx.clearRect(0, 0, width, height);

      // Center of the OrbitClock
      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.41;
      const innerR = Math.max(76, maxR * 0.32);

      // Pulse wave traveling outward along radial lines (quynh.moe effect)
      const pulsePhase = ((now * 0.00055) % 1);

      for (let i = 0; i < 60; i++) {
        const el = secRefs.current[i];
        const isVisible = i <= sNum;

        if (!isVisible) {
          if (el) el.style.opacity = "0";
          continue;
        }

        const sp = springs[i];
        const age = Math.max(0, (now - sp.birthTime) / 1000);

        // Starting at 180 deg (9 o'clock / left) and progressing clockwise (6 deg per second)
        const angleDeg = 180 - i * 6;
        const angleRad = (angleDeg * Math.PI) / 180;
        const cosA = Math.cos(angleRad);
        const sinA = Math.sin(angleRad);

        // Drop-in animation for newly spawned second (0..0.45s)
        const dropProgress = Math.min(age / 0.45, 1);
        const easeOutQuart = 1 - Math.pow(1 - dropProgress, 4);
        const currentR = maxR * (1.22 - 0.22 * easeOutQuart);

        const endX = cx + cosA * (currentR - 18);
        const endY = cy - sinA * (currentR - 18);
        const startX = cx + cosA * innerR;
        const startY = cy - sinA * innerR;

        // Midpoint & perpendicular normal for quadraticCurveTo bend
        const midX = (startX + endX) * 0.5;
        const midY = (startY + endY) * 0.5;
        const nx = sinA;
        const ny = cosA;

        // Mouse proximity spring force
        const dx = mouse.x - midX;
        const dy = mouse.y - midY;
        const dist = Math.hypot(dx, dy);
        const mouseRadius = 210;
        if (dist < mouseRadius && ( Math.abs(mouse.vx) > 0.1 || Math.abs(mouse.vy) > 0.1 )) {
          const factor = 1 - dist / mouseRadius;
          const perpForce = (mouse.vx * nx + mouse.vy * ny) * factor * 14;
          sp.vel += perpForce;
        }

        // Ambient sine wind
        const wind = Math.sin(now * 0.0018 + i * 0.32) * 5.5;
        const targetBend = wind;

        // Spring integration
        const stiffness = 120;
        const damping = 11;
        const force = -stiffness * (sp.bend - targetBend) - damping * sp.vel;
        sp.vel += force * dt;
        sp.bend += sp.vel * dt;
        sp.bend = Math.max(-52, Math.min(52, sp.bend));

        const ctrlX = midX + nx * sp.bend;
        const ctrlY = midY + ny * sp.bend;

        const alphaFade = Math.min(age / 0.15, 1);
        const isNewest = i === sNum && age < 0.85;

        // Draw curved radial line
        const grad = ctx.createLinearGradient(startX, startY, endX, endY);
        const baseAlpha = 0.22 * alphaFade;
        const pulseAlpha = (isNewest ? 0.65 : 0.42) * alphaFade;
        const pStart = Math.max(0, pulsePhase - 0.22);
        const pEnd = Math.min(1, pulsePhase + 0.22);

        const strokeRgb = isNewest ? "245, 158, 11" : "120, 113, 108";
        grad.addColorStop(0, `rgba(${strokeRgb}, ${baseAlpha * 0.4})`);
        grad.addColorStop(pStart, `rgba(${strokeRgb}, ${baseAlpha})`);
        grad.addColorStop(pulsePhase, `rgba(245, 158, 11, ${pulseAlpha})`);
        grad.addColorStop(pEnd, `rgba(${strokeRgb}, ${baseAlpha})`);
        grad.addColorStop(1, `rgba(${strokeRgb}, ${baseAlpha * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = isNewest ? 1.25 : 0.75;
        ctx.lineCap = "round";
        ctx.stroke();

        // Position the orbiting second label (`00`..`59`)
        if (el) {
          const tx = cx + cosA * currentR;
          const ty = cy - sinA * currentR;
          el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) translate(-50%, -50%)`;
          el.style.opacity = alphaFade.toFixed(2);
          el.style.color =
            age < 0.38 ? "#f59e0b" : "rgba(87, 83, 78, 0.55)";
          el.style.fontWeight = age < 0.38 ? "700" : "400";
        }
      }

      mouse.vx *= 0.8;
      mouse.vy *= 0.8;

      if (isVisible) {
        rafId = requestAnimationFrame(render);
      }
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          prevTime = performance.now();
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    rafId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
    >
      {/* Radial Lines Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Center HH : MM Display (quynh.moe `.orbit-center`) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
        <div className="font-sans text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight text-stone-900 leading-none whitespace-nowrap flex items-center">
          <span>{hm.h}</span>
          <span className="mx-1.5 -translate-y-[0.06em] text-amber-500">:</span>
          <span>{hm.m}</span>
        </div>
        <span className="mt-2 font-mono text-[10px] tracking-[0.25em] uppercase text-stone-500 font-bold">
          BATAM • UTC+7
        </span>
      </div>

      {/* 60 Orbiting Second Numbers (`00`..`59`) */}
      {Array.from({ length: 60 }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            secRefs.current[i] = el;
          }}
          className="absolute left-0 top-0 font-mono text-[10px] sm:text-[11px] leading-none tabular-nums pointer-events-none will-change-transform"
          style={{ opacity: 0 }}
        >
          {String(i).padStart(2, "0")}
        </span>
      ))}
    </div>
  );
}
