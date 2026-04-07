export default function StickyLinks() {
  return (
    <div className="fixed top-20 right-3 md:right-6 z-50">
      <div className="bg-yellow-300 border-2 md:border-4 border-black rounded-xl p-2 md:p-3 shadow-[6px_6px_0px_0px_#FF66C4]">
        <div className="flex flex-col gap-2 w-40 md:w-44">
          <a
            href="https://www.linkedin.com/in/tia-sukhnanni-a4bb28308"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0A66C2] text-white border-2 border-black px-3 py-1.5 font-black uppercase text-[10px] md:text-xs shadow-[2px_2px_0px_0px_#000] hover:scale-105 transition-transform text-center"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/TIA1106"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black border-2 border-black px-3 py-1.5 font-black uppercase text-[10px] md:text-xs shadow-[2px_2px_0px_0px_#000] hover:scale-105 transition-transform text-center"
          >
            GitHub
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=tiasukhnannis@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-yellow-300 border-2 border-black px-3 py-1.5 font-black uppercase text-[10px] md:text-xs shadow-[2px_2px_0px_0px_#000] hover:scale-105 transition-transform text-center"
          >
            Email Me
          </a>
        </div>
      </div>
    </div>
  );
}