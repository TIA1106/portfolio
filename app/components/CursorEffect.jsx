"use client";
import React, { useEffect, useRef } from "react";

export default function CursorEffect() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    class Particle {
      constructor(x, y) {
        this.x = x; this.y = y;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        this.opacity = 1;
      }
      update() { this.x += this.speedX; this.y += this.speedY; this.opacity -= 0.02; }
      draw() {
        ctx.fillStyle = this.color; ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(this.x + this.size * Math.cos((i * 4 * Math.PI) / 5), this.y + this.size * Math.sin((i * 4 * Math.PI) / 5));
        }
        ctx.closePath(); ctx.fill();
      }
    }
    const handleMouseMove = (e) => { for (let i = 0; i < 3; i++) particles.push(new Particle(e.clientX, e.clientY)); };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(); particles[i].draw();
        if (particles[i].opacity <= 0) { particles.splice(i, 1); i--; }
      }
      requestAnimationFrame(animate);
    };
    window.addEventListener("resize", resize); window.addEventListener("mousemove", handleMouseMove);
    resize(); animate();
    return () => { window.removeEventListener("resize", resize); window.removeEventListener("mousemove", handleMouseMove); };
  }, []);
  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />
      <style jsx global>{`
        * { cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='%23FF71B7'><path d='M12 2L14.5 9H22L16 13.5L18.5 21L12 17L5.5 21L8 13.5L2 9H9.5L12 2Z'/></svg>") 12 12, auto !important; }
      `}</style>
    </>
  );
}