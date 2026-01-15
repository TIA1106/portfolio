"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <nav className="fixed top-4 md:top-6 inset-x-0 z-[100] flex justify-center px-4">
      {/* --- UNIFIED CONTAINER --- */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-fit md:max-w-4xl bg-black/40 backdrop-blur-md border-2 md:border-4 border-black/80 px-4 md:px-8 py-2 md:py-3 rounded-full flex items-center justify-between md:justify-center gap-4 md:gap-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_#000]"
      >
        {/* Mobile Logo/Indicator */}
        <Link href="/" className="md:hidden text-white font-black italic uppercase text-[10px] tracking-tighter">
          TIA<span className="text-funky-pink">.</span>
        </Link>

        {/* DESKTOP LINKS (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-white font-bold italic uppercase hover:text-funky-pink transition-colors text-xs lg:text-sm tracking-widest"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-3 w-[1px] bg-white/20" />
          <Link 
            href="/contact" 
            className="bg-pink-500 px-4 py-1.5 rounded-full text-white font-black italic uppercase text-xs lg:text-sm hover:bg-white hover:text-black transition-all border border-black"
          >
            Contact
          </Link>
        </div>

        {/* MOBILE TRIGGER (Hidden on Desktop) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-1"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>

      {/* --- MOBILE DRAWER (Slide Down) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 inset-x-4 md:hidden bg-black border-4 border-black p-6 rounded-[2rem] shadow-[8px_8px_0px_0px_#FF66C4] flex flex-col gap-6 z-[110]"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black italic uppercase text-white border-b border-white/5 pb-2"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="bg-yellow-400 text-black p-4 font-black italic uppercase text-center rounded-xl border-4 border-black"
            >
              Contact Me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}