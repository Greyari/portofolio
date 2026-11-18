"use client";

import { useEffect, useRef } from "react";

interface InteractiveWaveDividerProps {
  fillColor?: string;
  topColor?: string;
  strokeColor?: string;
  height?: number;
  flip?: boolean;
  className?: string;
}

export default function InteractiveWaveDivider({
  fillColor = "#f59e0b",
  topColor = "#fafaf9",
  strokeColor = "rgba(28, 25, 23, 0.12)",
  height = 72,
  flip = false,
  className = "",
}: InteractiveWaveDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!container || !path || !svg) return;

    let W = container.clientWidth || window.innerWidth;
    const F = height;

    svg.setAttribute("viewBox", `0 0 ${W} ${F}`);

    // Discretization parameters (exact createdbywilliam.co.za model)
    let N = Math.round(Math.min(72, Math.max(24, W / 22)));
    let S = W / N;

    let u = new Float32Array(N + 1);
    let v = new Float32Array(N + 1);
    let was = new Float32Array(N + 1);

    const base = F * 0.44;
    const amp = Math.min(10, F * 0.12);
    const len = W / (W < 768 ? 1.15 : 1.85);

    const rest = (x: number) => base + Math.sin((x / len) * Math.PI * 2 + 0.8) * amp;

    const resize = () => {
      if (!container || !svg) return;
      W = container.clientWidth || window.innerWidth;
      svg.setAttribute("viewBox", `0 0 ${W} ${F}`);
      N = Math.round(Math.min(72, Math.max(24, W / 22)));
      S = W / N;
      u = new Float32Array(N + 1);
      v = new Float32Array(N + 1);
      was = new Float32Array(N + 1);
      draw(1);
    };

    window.addEventListener("resize", resize, { passive: true });

    // Pointer velocity tracking
    const mouse = {
      x: -9999,
      y: -9999,
      vx: 0,
      vy: 0,
      lastX: -9999,
      lastY: -9999,
      lastTime: performance.now(),
    };

    let awake = true;
    let isIntersecting = true;
    let rafId = 0;

    const poke = (x: number, imp: number) => {
      const f = x / S;
      const minI = Math.max(0, Math.floor(f - 6));
      const maxI = Math.min(N, Math.ceil(f + 6));
      for (let i = minI; i <= maxI; i++) {
        v[i] += imp * Math.exp(-((i - f) ** 2) / 4.2);
      }
      awake = true;
      if (!rafId && isIntersecting) {
        prevTime = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const now = performance.now();
      const dt = Math.max(8, now - mouse.lastTime) / 1000;
      mouse.lastTime = now;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (mouse.lastX !== -9999) {
        mouse.vx = (x - mouse.lastX) / dt;
        mouse.vy = (y - mouse.lastY) / dt;
      }
      mouse.lastX = x;
      mouse.lastY = y;

      // Active zone check (within 32px of wave surface or inside height)
      if (x >= 0 && x <= W && y >= -32 && y <= F + 32) {
        const vyClamped = Math.max(-550, Math.min(550, mouse.vy));
        const vxClamped = Math.min(650, Math.abs(mouse.vx));
        const imp = vyClamped * 0.14 + vxClamped * 0.06;
        if (Math.abs(imp) > 0.3) {
          poke(x, imp);
        }
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Scroll ripple trigger
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const dy = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      const k = Math.max(-60, Math.min(60, dy * 1.5));
      if (Math.abs(k) > 1.2) {
        const center = W * 0.5;
        poke(center, k * 0.35);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Quadratic Bézier Spline draw
    const draw = (interp: number) => {
      if (!path) return;
      const getY = (i: number) => {
        const val = rest(i * S) + was[i] + (u[i] - was[i]) * interp;
        return flip ? F - val : val;
      };

      let d = `M -2 ${getY(0).toFixed(1)} `;
      for (let i = 1; i < N; i++) {
        const midX = (i + 0.5) * S;
        const midY = (getY(i) + getY(i + 1)) * 0.5;
        d += `Q ${(i * S).toFixed(1)} ${getY(i).toFixed(1)}, ${midX.toFixed(1)} ${midY.toFixed(1)} `;
      }
      const endY = getY(N).toFixed(1);
      const bottomY = flip ? -2 : F + 2;
      d += `L ${(W + 2).toFixed(1)} ${endY} V ${bottomY} H -2 Z`;

      path.setAttribute("d", d);
    };

    // Physics step (Ultra-soft, silky fluid feel matching createdbywilliam.co.za)
    const DT = 1 / 120;
    const FK = 22;
    const FD = 3.8;
    const cap = F * 0.45;

    let prevTime = performance.now();
    let acc = 0;

    const loop = (now: number) => {
      if (!awake || !isIntersecting) {
        rafId = 0;
        return;
      }

      const frameDt = Math.min((now - prevTime) / 1000, 0.05);
      prevTime = now;
      acc += frameDt;

      const T = (720 / S) ** 2;

      let steps = 0;
      while (acc >= DT && steps < 5) {
        was.set(u);

        for (let i = 0; i <= N; i++) {
          const l = u[i > 0 ? i - 1 : 1];
          const r = u[i < N ? i + 1 : N - 1];
          const accel = T * (l + r - 2 * u[i]) - FK * u[i] - FD * v[i];
          v[i] += accel * DT;
          u[i] = Math.max(-cap, Math.min(cap, u[i] + v[i] * DT));
        }

        acc -= DT;
        steps++;
      }

      const fInterp = Math.min(1, Math.max(0, acc / DT));
      draw(fInterp);

      // Check auto-sleep
      let maxU = 0;
      let maxV = 0;
      for (let i = 0; i <= N; i++) {
        const absU = Math.abs(u[i]);
        const absV = Math.abs(v[i]);
        if (absU > maxU) maxU = absU;
        if (absV > maxV) maxV = absV;
      }

      if (maxU < 0.035 && maxV < 0.6) {
        u.fill(0);
        v.fill(0);
        was.fill(0);
        draw(1);
        awake = false;
        rafId = 0;
        return;
      }

      rafId = requestAnimationFrame(loop);
    };

    // Pause physics when out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && awake && !rafId) {
          prevTime = performance.now();
          rafId = requestAnimationFrame(loop);
        } else if (!isIntersecting && rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Initial draw
    draw(1);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [height, flip]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none pointer-events-auto ${className}`}
      style={{ height: `${height}px`, backgroundColor: topColor }}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full block overflow-visible"
      >
        {/* Background fills the entire top area matching the section above, eliminating any white gap */}
        <rect width="100%" height="100%" fill={topColor} />
        <path
          ref={pathRef}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
