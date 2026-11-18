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

/**
 * Interactive Wave Divider with Spring Physics
 * Directly replicating the natural, subtle, realistic wave divider from createdbywilliam.co.za
 * Gentle amplitude, soft water-tension spring physics, responsive to direct cursor hover.
 */
export default function InteractiveWaveDivider({
  fillColor = "#f59e0b",
  topColor = "#fafaf9",
  strokeColor = "rgba(28, 25, 23, 0.12)",
  height = 68,
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

    // Discretization matching createdbywilliam.co.za:
    // N between 24 and 72 nodes spaced ~22px
    let N = Math.round(Math.min(72, Math.max(24, W / 22)));
    let S = W / N;

    let u = new Float32Array(N + 1);
    let v = new Float32Array(N + 1);
    let was = new Float32Array(N + 1);

    // Subtle natural rest curve (realistic, not excessive)
    let base = F * 0.46;
    let amp = Math.min(11, F * 0.15);
    let len = W / (W < 760 ? 1.15 : 1.8);

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
      base = F * 0.46;
      amp = Math.min(11, F * 0.15);
      len = W / (W < 760 ? 1.15 : 1.8);
      draw(1);
    };

    window.addEventListener("resize", resize, { passive: true });

    // Pointer velocity tracking restricted strictly to container bounds
    const bat = {
      x: -9999,
      y: -9999,
      vx: 0,
      vy: 0,
      t: performance.now(),
    };

    let awake = false;
    let isIntersecting = false;
    let rafId = 0;

    // Gentle poke with gaussian spread around impulse point
    const poke = (x: number, imp: number) => {
      const f = x / S;
      const minI = Math.max(0, Math.floor(f - 5));
      const maxI = Math.min(N, Math.ceil(f + 5));
      for (let i = minI; i <= maxI; i++) {
        v[i] += imp * Math.exp(-((i - f) ** 2) / 3.2);
      }
      awake = true;
      if (!rafId && isIntersecting) {
        prevTime = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };

    // Hover interaction: ONLY triggers when cursor passes directly over the wave divider
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const now = performance.now();
      const dt = Math.max(0.005, (now - bat.t) / 1000);

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (bat.x !== -9999) {
        bat.vx = (x - bat.x) / dt;
        bat.vy = (y - bat.y) / dt;
      }
      bat.x = x;
      bat.y = y;
      bat.t = now;

      // Realistic trigger: only when cursor is close to the actual wave surface
      if (x >= 0 && x <= W) {
        const surfY = rest(x);
        const dist = Math.abs(y - surfY);
        if (dist < 28) {
          const vyClamped = Math.max(-360, Math.min(360, bat.vy));
          const vxClamped = Math.min(420, Math.abs(bat.vx));
          const imp = vyClamped * 0.11 + vxClamped * 0.045;
          if (Math.abs(imp) > 0.4) {
            poke(x, imp);
          }
        }
      }
    };

    const onPointerLeave = () => {
      bat.x = -9999;
      bat.y = -9999;
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    // Quadratic Bézier Spline draw matching createdbywilliam.co.za
    let lastD = "";
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

      if (d !== lastD) {
        path.setAttribute("d", d);
        lastD = d;
      }
    };

    // Physics step with William Sham's exact constants (FK = 26, FD = 3.4)
    const DT = 1 / 120;
    const FK = 26;
    const FD = 3.4;
    const cap = F * 0.38;

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

      if (maxU < 0.03 && maxV < 0.5) {
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

    // Pause physics when out of viewport; perform one gentle welcoming wave when scrolled into view
    let hasWokenOnce = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          if (!hasWokenOnce) {
            hasWokenOnce = true;
            poke(W * 0.5, 9);
          }
          if (awake && !rafId) {
            prevTime = performance.now();
            rafId = requestAnimationFrame(loop);
          }
        } else if (!isIntersecting && rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Initial draw
    draw(1);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
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
        className="absolute inset-0 w-full h-full block overflow-visible pointer-events-none"
      >
        {/* Background fills top area matching section above (zero gaps) */}
        <rect width="100%" height="100%" fill={topColor} />
        {/* Organic wave path with crisp separating stroke */}
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
