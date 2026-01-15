"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center p-16 bg-white border-8 border-black shadow-[20px_20px_0_0_#FF66C4]">
        <h1 className="text-5xl font-black italic uppercase">Signal Sent.</h1>
        <p className="font-bold mt-4">CHECK YOUR INBOX.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 p-8 md:p-12 rounded-[3rem] border-4 border-white shadow-[12px_12px_0px_0px_#FF66C4]">
      <input name="name" required placeholder="NAME" className="w-full p-5 border-4 border-black font-black uppercase shadow-[6px_6px_0px_0px_#A78BFA] outline-none" />
      <input name="email" type="email" required placeholder="EMAIL" className="w-full p-5 border-4 border-black font-black uppercase shadow-[6px_6px_0px_0px_#FF66C4] outline-none" />
      <textarea name="message" required placeholder="MESSAGE" className="w-full p-5 border-4 border-black font-black uppercase h-40 shadow-[6px_6px_0px_0px_#FFFF00] outline-none" />
      <button disabled={loading} className="w-full bg-white text-black p-6 font-black uppercase italic text-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:bg-pink-500 hover:text-white transition-all">
        {loading ? "TRANSMITTING..." : "Send"}
      </button>
    </form>
  );
}