"use client";
import React, { useState, useEffect } from "react";
import ExpandableCardDemo from "../components/ExpandableCardDemo";
import { SparklesCore } from "../components/ui/sparkles";
import { motion } from "framer-motion";
import { Coffee, Moon, ArrowDownRight } from "lucide-react";

export default function ProjectsPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <main className="min-h-screen bg-black relative pt-24 md:pt-48 pb-20 px-4 md:px-10 overflow-x-hidden selection:bg-funky-pink">
      
      {/* 1. THE FLOATING CHAOS (Responsive Scale) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.img 
          src="/work-avatar.png" 
          animate={{ x: [-5, 15, -5], y: [0, 20, 0], rotate: [-8, 8, -8] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[-10%] md:left-[-2%] w-32 md:w-80 opacity-10 md:opacity-20 border-4 border-white shadow-[6px_6px_0_0_#FF66C4] md:shadow-[10px_10px_0_0_#FF66C4] rounded-[2rem]"
        />
        
        <motion.img 
          src="/work-avatar.png" 
          animate={{ x: [5, -15, 5], y: [0, -20, 0], rotate: [8, -8, 8] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-[-10%] md:right-[-2%] w-40 md:w-96 opacity-10 md:opacity-20 border-4 border-white shadow-[-6px_6px_0_0_#A78BFA] md:shadow-[-10px_10px_0_0_#A78BFA] rounded-[3rem] grayscale"
        />

        <SparklesCore id="projectsSparkles" particleColor="#FF66C4" particleDensity={30} className="w-full h-full opacity-20" />
      </div>

      {/* 2. THE CONTENT LAYER */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        <header className="mb-12 md:mb-20">
          {/* Headline: Fluid sizing from 5xl (mobile) to 13rem (desktop) */}
          <h1 className="text-5xl sm:text-7xl md:text-[13rem] font-black text-white italic uppercase tracking-tighter leading-[0.8] md:leading-[0.7] mb-8">
            THE <br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #FF66C4' }}>LAB.</span>
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="bg-white text-black px-6 md:px-8 py-2 md:py-3 font-black -rotate-1 border-[3px] md:border-4 border-black shadow-[4px_4px_0_0_#FF66C4] md:shadow-[6px_6px_0_0_#FF66C4] uppercase text-xs md:text-xl flex items-center gap-2 md:gap-3">
              Personal Builds <ArrowDownRight size={20} className="md:w-6 md:h-6" />
            </div>
            <p className="text-zinc-600 font-black uppercase text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] italic">
              // Student @ JKLU // 2026
            </p>
          </div>
        </header>

        {/* 3. PROJECTS GRID */}
        <div className="relative z-50 mb-20 md:mb-32">
           <ExpandableCardDemo />
        </div>

        {/* 4. THE "MINIMAL" TEASER */}
        <div className="flex justify-center md:justify-end pr-0 md:pr-20">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="bg-yellow-400 text-black p-6 md:p-12 border-[3px] md:border-4 border-black shadow-[6px_6px_0_0_#fff] md:shadow-[10px_10px_0_0_#fff] rotate-3 max-w-[260px] md:max-w-xs"
          >
            <h3 className="font-black italic uppercase text-2xl md:text-3xl leading-none mb-2">Wait...</h3>
            <p className="font-bold uppercase text-[8px] md:text-[10px] tracking-widest leading-tight">
              More brewing in the background. The lab never actually closes.
            </p>
          </motion.div>
        </div>

        {/* 5. VIBE CHECK FOOTER */}
        <footer className="mt-24 md:mt-40 pt-8 md:pt-10 border-t border-white/5 flex justify-between items-center gap-4">
           <div className="flex gap-6 md:gap-8 text-zinc-700">
              <Coffee size={18} className="hover:text-white transition-colors cursor-pointer" />
              <Moon size={18} className="hover:text-yellow-400 transition-colors cursor-pointer" />
           </div>
           
           <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-zinc-800 text-right">
             TIA SUKHNANNI
           </p>
        </footer>

      </div>
    </main>
  );
}