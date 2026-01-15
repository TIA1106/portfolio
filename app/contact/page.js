"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import dynamic from 'next/dynamic';

const SparklesCore = dynamic(
  () => import('../components/ui/sparkles').then((mod) => mod.SparklesCore),
  { ssr: false }
);

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-black relative pt-32 md:pt-40 pb-20 px-4 md:px-6 overflow-hidden selection:bg-funky-pink">
      
      {/* Subtle Background */}
      {mounted && (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-20">
          <SparklesCore
            id="tsparticlescontact"
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={40}
            className="w-full h-full"
            particleColor="#FF66C4"
          />
        </div>
      )}

      {/* Decorative Gradient Glow - Adjusted for mobile scale */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] bg-purple-600/10 blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-16"
        >
          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
              Currently Available
            </span>
          </div>

          {/* Responsive Header: Scales from 4xl on mobile to 8xl on desktop */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none px-2">
            START A <br className="md:hidden" /> <span className="text-funky-pink">CONVERSATION</span>
          </h1>
          
          <p className="max-w-xs md:max-w-xl mx-auto text-zinc-400 font-medium mt-6 uppercase text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] px-4">
            Inquiries regarding AI Research, Full-Stack Development, or general collaborations.
          </p>
        </motion.div>

        {/* The Form Container */}
        <div className="relative w-full max-w-2xl mx-auto">
          {/* Decorative corner accents - scale down for mobile */}
          <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-funky-pink" />
          <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-purple-500" />
          
          {/* Added a bit of padding to ensure the form stays within mobile bounds */}
          <div className="px-2 md:px-0">
            <ContactForm />
          </div>
        </div>

        {/* Professional Footer Detail */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-[9px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-[0.5em]">
            TIA SUKHNANNI
          </p>
        </motion.div>
      </div>
    </main>
  );
}