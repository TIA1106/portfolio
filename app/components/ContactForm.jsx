"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fallbackUsed, setFallbackUsed] = useState(false);

  const openComposeFallback = ({ name, email, message }) => {
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=tiasukhnannip@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    
    const formData = new FormData(e.target);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSent(true);
      } else {
        if (data?.code === "CONTACT_CFG_MISSING") {
          openComposeFallback(payload);
          setFallbackUsed(true);
          setSent(true);
          return;
        }
        const suffix = data?.code ? ` (${data.code})` : "";
        setErrorMsg((data.error || "Unable to send message right now. Please try again.") + suffix);
      }
    } catch {
      setErrorMsg("Network error while sending. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center p-16 bg-white border-8 border-black shadow-[20px_20px_0_0_#FF66C4]">
        <h1 className="text-5xl font-black italic uppercase">Signal Sent.</h1>
        <p className="font-bold mt-4">{fallbackUsed ? "MAIL COMPOSE OPENED." : "CHECK YOUR INBOX."}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 p-8 md:p-12 rounded-[3rem] border-4 border-white shadow-[12px_12px_0px_0px_#FF66C4]">
      <input name="name" required placeholder="NAME" className="w-full p-5 border-4 border-black font-black uppercase shadow-[6px_6px_0px_0px_#A78BFA] outline-none" />
      <input name="email" type="email" required placeholder="EMAIL" className="w-full p-5 border-4 border-black font-black uppercase shadow-[6px_6px_0px_0px_#FF66C4] outline-none" />
      <textarea name="message" required placeholder="MESSAGE" className="w-full p-5 border-4 border-black font-black uppercase h-40 shadow-[6px_6px_0px_0px_#FFFF00] outline-none" />
      {errorMsg && (
        <p className="text-red-400 text-xs font-bold uppercase tracking-[0.15em]">
          {errorMsg}
        </p>
      )}
      <button disabled={loading} className="w-full bg-white text-black p-6 font-black uppercase italic text-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:bg-pink-500 hover:text-white transition-all">
        {loading ? "TRANSMITTING..." : "Send"}
      </button>
    </form>
  );
}