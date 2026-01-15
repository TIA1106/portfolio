"use client";
import React, { useEffect, useRef } from "react";

export const StarCursor = () => {
  const canvasRef = useRef(null);
  // We use a Ref for particles to avoid React re-render lag
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0, moved: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    const shapes = ["★", "✿", "✧", "✨"];
    const colors = ["#FF66C4", "#FFD700", "#A78BFA", "#FFFFFF"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.moved = true;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();

    const createParticle = () => {
      return {
        x: mouse.current.x,
        y: mouse.current.y,
        size: Math.random() * 15 + 8,
        char: shapes[Math.floor(Math.random() * shapes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        life: 1.0,
        rotation: Math.random() * 360,
      };
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only add a particle if the mouse actually moved (saves CPU!)
      if (mouse.current.moved) {
        particles.current.push(createParticle());
        mouse.current.moved = false;
      }

      // High-performance loop
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02; // Fades out smoothly
        p.rotation += 2;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          i--;
          continue;
        }

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.font = `${p.size}px serif`;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillText(p.char, -p.size / 2, p.size / 2);
        ctx.restore();
      }

      requestAnimationFrame(update);
    };

    const animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ backfaceVisibility: "hidden" }}
    />
  );
};

export default StarCursor;