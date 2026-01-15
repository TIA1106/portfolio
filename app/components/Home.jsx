"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative">
      {/* Video Background with Mask */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99790-large.mp4" type="video/mp4" />
      </video>

      <div className="w-full absolute inset-0 h-screen">
        {/* Aceternity Sparkles Fallback/Overlay */}
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black/50" />
      </div>

      <h1 className="md:text-9xl text-7xl font-black text-center text-white relative z-20 tracking-tighter uppercase">
        TIA <br /> <span className="text-pink-500 italic">SUKHNANNI</span>
      </h1>
      
      <div className="w-[40rem] h-40 relative">
        {/* Core Glow effect */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-px w-1/4" />
      </div>

      <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.5em] z-20 -mt-10">
        Data Science // Full Stack // 2026
      </p>
    </section>
  );
}