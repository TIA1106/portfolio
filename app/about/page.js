"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileDown, Terminal, BarChart3, Moon, Zap, Coffee, Sparkles } from "lucide-react";

export default function AboutPage() {
  const fullStack = ["Next.js", "React", "Node.js", "MongoDB", "Tailwind", "Express"];
  const aiData = ["Python", "Mistral AI", "Scikit-Learn", "Pandas", "SQL", "Matplotlib"];

  return (
    <main className="min-h-screen bg-black text-zinc-300 relative pt-24 md:pt-32 pb-20 px-4 md:px-10 overflow-x-hidden selection:bg-funky-pink/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-funky-pink/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-indigo-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* LEFT: THE PROFILE STICKER */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-32">
            <motion.div initial={{ opacity: 0, rotate: -3 }} animate={{ opacity: 1, rotate: 0 }} className="relative group max-w-sm mx-auto lg:max-w-none">
              <div className="absolute -inset-2 bg-white rounded-[2.5rem] rotate-2 z-0" />
              <div className="relative border-[6px] md:border-[8px] border-black shadow-[10px_10px_0px_0px_#FF66C4] md:shadow-[15px_15px_0px_0px_#FF66C4] rounded-[2rem] overflow-hidden bg-zinc-900 z-10">
                <img src="/about-avatar.png" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700" alt="Tia" />
              </div>
            </motion.div>
            
            <a 
              href="/resume.pdf" 
              download="Tia_Sukhnanni_Resume.pdf"
              className="mt-8 md:mt-12 w-full flex items-center justify-center gap-4 bg-yellow-400 text-black py-4 md:py-5 border-4 border-black font-black uppercase italic text-xl md:text-2xl shadow-[6px_6px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
            >
              <FileDown size={24} /> Grab My CV
            </a>

            <div className="mt-6 md:mt-8 p-4 bg-zinc-900/80 border-2 border-white/5 rounded-2xl flex items-center gap-4 shadow-xl">
               <div className="p-2 bg-funky-pink/20 rounded-lg"><Zap className="text-funky-pink" size={18} /></div>
               <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white italic">8.82 CGPA // JKLU Jaipur</p>
            </div>
          </div>

          {/* RIGHT: THE CONTENT */}
          <div className="w-full lg:w-3/5 space-y-8 md:space-y-10 mt-10 lg:mt-0">
            <header>
              <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-[0.8] mb-6">
                THE <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #FF66C4' }}>HUMAN.</span>
              </h1>
            </header>

            <div className="space-y-6">
              {/* BOX 1: FULL STACK */}
              <div className="p-6 md:p-8 bg-zinc-900/40 border-2 border-white/10 rounded-[2rem] hover:border-funky-pink/30 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <Terminal className="text-funky-pink group-hover:rotate-12 transition-transform" size={24} />
                  <h3 className="text-white font-black uppercase italic text-lg md:text-xl tracking-tight">Full-Stack Builds</h3>
                </div>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-400">
                  I build stuff using the <strong>MERN stack</strong> and <strong>Next.js</strong>. Projects like <strong>TiaType Pro</strong> and <strong>TiaPrompt</strong> are where I learned to handle the logic of real apps. I’m just a student who gets a kick out of seeing code work after a long night of debugging.
                </p>
              </div>

              {/* BOX 2: DATA & IBM */}
              <div className="p-6 md:p-8 bg-zinc-900/40 border-2 border-white/10 rounded-[2rem] hover:border-indigo-400/30 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <BarChart3 className="text-indigo-400 group-hover:scale-110 transition-transform" size={24} />
                  <h3 className="text-white font-black uppercase italic text-lg md:text-xl tracking-tight">Data & AI</h3>
                </div>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-400">
                  Through the <strong>IBM Data Science Professional</strong> track, I learned to look for patterns in messy data. I’ve applied this to <strong>Spotify Hit Predictions</strong> and <strong>Mall Customer Clustering</strong>. In <strong>MoodJournal</strong>, I used Mistral AI to see if code could interpret human feelings.
                </p>
              </div>

              {/* BOX 3: TAROT & OFF-SCREEN */}
              <div className="p-6 md:p-8 bg-white border-4 border-black shadow-[6px_6px_0px_0px_#A78BFA] md:shadow-[10px_10px_0px_0px_#A78BFA] rounded-[2rem] relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4 text-black">
                  <Moon size={24} />
                  <h3 className="font-black uppercase italic text-lg md:text-xl tracking-tight text-black">Pattern Seeking</h3>
                </div>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold italic">
                  When I'm not coding, I'm grabbing coffee or reading <strong>Tarot cards</strong>. I honestly think reading cards is a lot like debugging code where you’re just looking for the logic and the 'why' in a sea of patterns.
                </p>
                <Sparkles className="absolute -right-4 -bottom-4 text-black/10 w-20 h-20 md:w-24 md:h-24" />
              </div>
            </div>

            {/* THE SKILLS SECTION */}
            <div className="pt-6 md:pt-10 space-y-6 md:space-y-8">
              <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 italic">Skills</h4>
              
              <div className="flex flex-wrap gap-2 md:gap-4">
                {fullStack.map((tech) => (
                  <div key={tech} className="bg-zinc-900 border-2 border-white/10 px-4 md:px-5 py-2 rounded-xl rotate-[-2deg] hover:rotate-0 transition-transform cursor-default">
                    <p className="text-white font-black text-[9px] md:text-[11px] uppercase tracking-widest">{tech}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 md:gap-4">
                {aiData.map((tech) => (
                  <div key={tech} className="bg-white border-[3px] md:border-4 border-black px-4 md:px-5 py-2 rounded-xl rotate-[2deg] hover:rotate-0 transition-transform shadow-[4px_4px_0px_0px_#FF66C4] cursor-default">
                    <p className="text-black font-black text-[9px] md:text-[11px] uppercase tracking-widest">{tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}