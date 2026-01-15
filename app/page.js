"use client";
import React, { useState, useEffect } from "react";
import { SparklesCore } from "./components/ui/sparkles";
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import { motion } from "framer-motion";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <main className="min-h-screen bg-black" />;

  return (
    <main className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-start pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <SparklesCore id="homeSparkles" particleColor="#FF66C4" particleDensity={100} speed={2} className="w-full h-full opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(236,72,153,0.4)_0%,_transparent_70%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-7xl mx-auto">
        {/* AVATAR: Scaled for mobile */}
        <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: -3 }} className="relative mb-10 md:mb-14">
          <div className="absolute -inset-6 md:-inset-10 bg-funky-pink/50 rounded-full blur-3xl animate-pulse" />
          <img 
            src="/hero-avatar.png" 
            className="relative w-48 h-48 md:w-80 md:h-80 rounded-full border-[6px] md:border-[8px] border-white shadow-[10px_10px_0px_0px_#FF66C4] md:shadow-[15px_15px_0px_0px_#FF66C4]" 
            alt="Hero" 
          />
          <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-yellow-400 border-2 md:border-4 border-black px-4 md:px-6 py-1 md:py-2 rotate-6 shadow-[4px_4px_0px_0px_#000] font-black italic uppercase text-sm md:text-lg">
            Hi, I'm Tia!
          </div>
        </motion.div>

        {/* HERO TEXT: Using fluid scaling */}
        <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-black text-white italic uppercase tracking-tighter leading-[0.85] mb-8 drop-shadow-[0_10px_30px_rgba(255,102,196,0.6)]">
          BUILD<span className="text-transparent" style={{ WebkitTextStroke: '2px #FF66C4' }}>.ING</span>
        </h1>

        {/* TAGLINE: Responsive border and padding */}
        <div className="bg-white border-2 md:border-4 border-black px-4 md:px-8 py-2 md:py-3 shadow-[6px_6px_0px_0px_#A78BFA] md:shadow-[8px_8px_0px_0px_#A78BFA] -rotate-1 mb-10 md:mb-12 max-w-[90vw] md:max-w-none">
          <TextGenerateEffect 
            words="I TURN COFFEE AND LATE NIGHTS INTO COOL APPS" 
            className="text-[10px] sm:text-sm md:text-xl font-black uppercase tracking-widest text-black"
          />
        </div>

        <p className="max-w-md md:max-w-xl text-zinc-400 font-bold mb-10 leading-relaxed uppercase italic text-[10px] md:text-sm px-4">
          A B.Tech student at JKLU who’s obsessed with how AI can actually help people, 
          not just look cool on a GitHub readme.
        </p>

        {/* BUTTONS: Stack on small mobile, row on larger screens */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto px-6">
          <a href="/projects" className="bg-pink-500 text-white border-2 md:border-4 border-black px-6 md:px-10 py-3 md:py-4 font-black uppercase italic text-lg md:text-xl shadow-[4px_4px_0px_0px_#000] hover:scale-105 transition-transform text-center">
            The Stuff I Built
          </a>
          <a href="/about" className="bg-white text-black border-2 md:border-4 border-black px-6 md:px-10 py-3 md:py-4 font-black uppercase italic text-lg md:text-xl shadow-[4px_4px_0px_0px_#FF66C4] hover:scale-105 transition-transform text-center">
            The Human Behind It
          </a>
        </div>
      </div>
    </main>
  );
}