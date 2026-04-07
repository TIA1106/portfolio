"use client";

import { useState } from "react";

const links = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tia-sukhnanni-a4bb28308",
    className:
      "bg-[#0A66C2] text-white border-2 border-black px-3 py-1.5 font-black uppercase text-[10px] md:text-xs shadow-[2px_2px_0px_0px_#000] hover:scale-105 transition-transform text-center",
  },
  {
    name: "GitHub",
    href: "https://github.com/TIA1106",
    className:
      "bg-white text-black border-2 border-black px-3 py-1.5 font-black uppercase text-[10px] md:text-xs shadow-[2px_2px_0px_0px_#000] hover:scale-105 transition-transform text-center",
  },
  {
    name: "Email Me",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=tiasukhnannis@gmail.com",
    className:
      "bg-black text-yellow-300 border-2 border-black px-3 py-1.5 font-black uppercase text-[10px] md:text-xs shadow-[2px_2px_0px_0px_#000] hover:scale-105 transition-transform text-center",
  },
];

export default function StickyLinks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-3 bottom-4 md:bottom-auto md:top-20 md:right-6 z-50">
      <div className="hidden md:block bg-yellow-300 border-2 md:border-4 border-black rounded-xl p-2 md:p-3 shadow-[6px_6px_0px_0px_#FF66C4]">
        <div className="flex flex-col gap-2 w-40 md:w-44">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={link.className}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <div className="md:hidden flex flex-col items-end gap-2">
        {isOpen && (
          <div className="bg-yellow-300 border-2 border-black rounded-xl p-2 shadow-[5px_5px_0px_0px_#FF66C4] w-36">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link.className}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-yellow-300 text-black border-2 border-black rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_#FF66C4]"
          aria-expanded={isOpen}
          aria-label="Toggle quick links"
        >
          {isOpen ? "Close Links" : "Quick Links"}
        </button>
      </div>
    </div>
  );
}