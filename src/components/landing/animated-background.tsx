"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const COLORS = ["#1e40af", "#2563eb", "#3b82f6", "#60a5fa"];

function getLayout(width: number, height: number) {
  const isMobile = width < 768;
  const area = width * height;

  const particleCount = isMobile
    ? Math.min(48, Math.max(32, Math.round(area / 11000)))
    : Math.min(80, Math.max(56, Math.round(area / 10000)));

  const linkDistance = isMobile ? 115 : 150;
  const lineOpacity = isMobile ? 0.15 : 0.2;
  const fadeAlpha = 0.1;
  const speed = isMobile ? 0.4 : 0.5;

  return { particleCount, linkDistance, lineOpacity, fadeAlpha, speed, isMobile };
}

function createParticles(
  width: number,
  height: number,
  count: number,
  speed: number
): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
  }));
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let animating = false;
    let particles: Particle[] = [];
    let layout = getLayout(window.innerWidth, window.innerHeight);
    let canvasWidth = 0;
    let canvasHeight = 0;

    const drawFrame = (moveParticles: boolean) => {
      const { linkDistance, lineOpacity, fadeAlpha } = layout;

      ctx.fillStyle = moveParticles
        ? `rgba(10, 10, 15, ${fadeAlpha})`
        : "rgba(10, 10, 15, 1)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      particles.forEach((particle, index) => {
        if (moveParticles) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > canvasWidth) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvasHeight) particle.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex++) {
          const other = particles[otherIndex]!;
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance < linkDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / linkDistance) * lineOpacity;
            ctx.stroke();
          }
        }
      });

      ctx.globalAlpha = 1;
    };

    const stopAnimation = () => {
      animating = false;
      cancelAnimationFrame(animationId);
    };

    const startAnimation = () => {
      if (animating) return;
      animating = true;

      const loop = () => {
        drawFrame(true);
        animationId = requestAnimationFrame(loop);
      };

      loop();
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      canvasWidth = width;
      canvasHeight = height;
      layout = getLayout(width, height);
      particles = createParticles(width, height, layout.particleCount, layout.speed);

      if (layout.isMobile) {
        stopAnimation();
        drawFrame(false);
      } else {
        startAnimation();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      stopAnimation();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full max-w-none"
      style={{
        background: "linear-gradient(135deg, #0c0c14 0%, #121220 50%, #0c0c14 100%)",
      }}
    />
  );
}
