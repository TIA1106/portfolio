"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { SparklesCore } from "./ui/sparkles";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-funky-dark pt-36">
      
      {/* Background & Sparkles */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image 
            src="/hero-avatar.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-20 blur-sm" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-funky-dark via-funky-dark/80 to-transparent"></div>
      </div>

      <div className="w-full absolute inset-0 h-screen z-10">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FF66C4"
        />
      </div>

      {/* Main Content */}
      <div className="z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
        
        <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-48 h-48 md:w-64 md:h-64 mb-8 rounded-full border-4 border-funky-pink shadow-[0_0_50px_rgba(255,102,196,0.6)] overflow-hidden bg-funky-card"
        >
             <Image 
                src="/hero-avatar.png" 
                alt="Tia" 
                fill 
                className="object-cover"
             />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold text-white tracking-tight mb-4 drop-shadow-lg"
        >
          Tia <span className="text-funky-pink">Sukhnanni</span>
        </motion.h1>

        <div className="max-w-2xl mb-8">
            <TextGenerateEffect
                words="Building the future with AI, ML & Web Dev."
                className="text-xl md:text-3xl text-funky-lavender font-medium"
            />
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex gap-6"
        >
             <a href="https://github.com/TIA1106" target="_blank" className="px-8 py-3 rounded-full bg-black border border-funky-lavender text-white font-bold hover:bg-funky-lavender hover:text-black transition-all shadow-[0_0_20px_rgba(167,139,250,0.4)]">
                Github
             </a>
             <a href="/projects" className="px-8 py-3 rounded-full bg-funky-pink text-white font-bold hover:bg-funky-pink/80 transition-all shadow-[0_0_20px_rgba(255,102,196,0.4)]">
                Projects
             </a>
        </motion.div>
      </div>
    </section>
  );
}