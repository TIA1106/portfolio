"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ExternalLink, Sparkles, BrainCircuit, Layers, Cpu, TrendingUp, Music, Database, Code2, Workflow, HeartPulse } from "lucide-react";

const ColorBlock = ({ color, title, icon: Icon }) => (
  <div className={`w-full h-full ${color} bg-noise flex flex-col items-center justify-center relative overflow-hidden group`}>
    <div className="absolute top-[-50%] left-[-20%] w-[200%] h-[200%] bg-gradient-to-br from-white/10 to-transparent rotate-12 pointer-events-none group-hover:rotate-45 transition-transform duration-700"></div>
    {Icon && <Icon size={48} className="text-white/20 mb-2 group-hover:scale-110 transition-transform" />}
    <h3 className="text-xl md:text-2xl font-black text-white/20 uppercase tracking-[0.2em] text-center px-4 select-none italic">
      {title.split(" ")[0]}
    </h3>
  </div>
);

export default function ExpandableCardDemo({ limit }) {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") setActive(null);
    }
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const displayCards = limit ? cards.slice(0, limit) : cards;

  return (
    <div className="py-10">
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 h-full w-full z-[4000] backdrop-blur-2xl"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[5000] p-4 pt-12 md:pt-40">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[650px] h-full md:h-fit md:max-h-[85%] flex flex-col bg-zinc-950 border border-white/10 sm:rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <div className="w-full h-56 lg:h-72 overflow-hidden relative">
                  {active.src ? (
                    <img src={active.src} alt={active.title} className="w-full h-full object-cover object-top" />
                  ) : (
                    <ColorBlock color={active.color} title={active.title} icon={active.icon} />
                  )}
                  <button
                    className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-white hover:text-black text-white p-2 rounded-full backdrop-blur-md transition-all"
                    onClick={() => setActive(null)}
                  >
                    <CloseIcon />
                  </button>
                </div>
              </motion.div>

              <div className="overflow-auto bg-zinc-950 flex-1 custom-scrollbar">
                <div className="flex flex-col md:flex-row justify-between items-start p-6 md:p-8 gap-4">
                  <div className="space-y-1">
                    <motion.h3 layoutId={`title-${active.title}-${id}`} className="font-black text-2xl md:text-3xl text-white tracking-tighter italic uppercase">
                      {active.title}
                    </motion.h3>
                    <motion.p layoutId={`description-${active.description}-${id}`} className="text-funky-pink font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
                      {active.description}
                    </motion.p>
                  </div>
                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="flex items-center justify-center w-full md:w-auto gap-2 px-6 py-3 text-xs rounded-full font-black bg-white text-black hover:bg-funky-pink hover:text-white transition-all tracking-widest"
                  >
                    VIEW PROJECT <ExternalLink size={14} />
                  </motion.a>
                </div>

                <div className="px-6 md:px-8 pb-10 text-zinc-400 leading-relaxed text-sm md:text-base">
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    {active.content()}
                    <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
                      {active.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-md text-white/50 font-mono tracking-tighter uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-funky-pink font-black text-[10px] tracking-[0.5em] uppercase mb-4">Portfolio Index</span>
          <h2 className="text-white text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
            Technical <span className="text-zinc-700">Lore</span>
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCards.map((card) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-zinc-900/30 border border-white/5 rounded-[2.5rem] cursor-pointer transition-all hover:border-funky-pink/50 hover:bg-zinc-900/60 p-6 flex flex-col h-full overflow-hidden relative shadow-xl"
            >
              <motion.div layoutId={`image-${card.title}-${id}`} className="mb-6">
                <div className="h-44 w-full rounded-3xl overflow-hidden shadow-inner">
                  {card.src ? (
                    <img src={card.src} alt={card.title} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <ColorBlock color={card.color} title={card.title} icon={card.icon} />
                  )}
                </div>
              </motion.div>

              <div className="flex flex-col flex-1 px-2">
                <motion.h3 layoutId={`title-${card.title}-${id}`} className="font-black text-white text-2xl tracking-tight mb-1 uppercase italic">
                  {card.title}
                </motion.h3>
                <motion.p layoutId={`description-${card.description}-${id}`} className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                  {card.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </ul>
      </div>
    </div>
  );
}

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6l-12 12" /><path d="M6 6l12 12" />
  </svg>
);

const cards = [
  {
    title: "Kisan Saathi",
    description: "AI-Powered Farmer Companion App",
    icon: Sparkles,
    color: "bg-zinc-800",
    src: "/kisan-saathi.svg",
    tags: ["Flutter", "Node.js", "Express", "PostgreSQL", "Prisma", "TFLite", "Gemini/Groq"],
    ctaLink: "https://github.com/NamNam9252/Farmer",
    content: () => (
      <p><strong>Group project.</strong> <strong>My contribution:</strong> delivered key full-stack modules in this voice-first agri-tech app, including the <strong>Mandi Bhav frontend revision</strong> with dynamic crop/state/district filters optimized for low-literacy farmer usability. Built RESTful Express.js routes for disease records, market data, and user management, and implemented the crop-diagnosis flow combining on-device <strong>TFLite inference</strong> with cloud AI (Gemini/Groq) for treatment guidance from a single crop image.</p>
    ),
  },
  {
    title: "CarePlus",
    description: "Full-Stack Healthcare Platform",
    icon: HeartPulse,
    color: "bg-emerald-950",
    src: "/careplus.png",
    tags: ["Backend Architecture", "Next.js API Routes", "Appwrite Auth", "Healthcare"],
    ctaLink: "https://careplus-tau.vercel.app",
    content: () => (
      <p><strong>My contribution:</strong> architected and built the complete backend for CarePlus, including RESTful APIs, database schema design, and core server logic using Next.js API routes with Appwrite. Implemented backend flows for doctor appointment booking, real-time queue updates, virtual consultation scheduling, and <strong>role-based authentication</strong> for secure access control.</p>
    ),
  },
  {
    title: "TiaSumé",
    description: "AI-Enhanced Resume Builder",
    icon: Database,
    color: "bg-rose-950",
    src: "/tiasume.png",
    tags: ["React", "Node.js", "MongoDB", "AI-Enhanced"],
    ctaLink: "https://tiasume.vercel.app",
    content: () => (
      <p>Built an <strong>AI-enhanced resume builder</strong> using React, Node.js, and MongoDB, supporting both manual resume creation and AI-assisted content enhancement. Designed the system to operate independently of AI, ensuring <strong>reliable functionality</strong> with graceful fallback when AI services are unavailable. Deployed on Vercel with secure data storage.</p>
    ),
  },
  {
    title: "BOLI AI Language Tutor",
    description: "HackJKLU 1st Runner-Up Build",
    icon: BrainCircuit,
    color: "bg-violet-950",
    tags: ["Next.js", "TypeScript", "NVIDIA NIM", "Adaptive Learning"],
    ctaLink: "https://github.com/TIA1106/HackJKLU",
    content: () => (
      <p>Developed an <strong>AI conversational language tutor</strong> with adaptive quizzes, flashcards, and progress analytics during a 24-hour hackathon build. Engineered real-time tutoring responses using Next.js, TypeScript, and NVIDIA NIM inference, helping secure <strong>1st Runner-Up</strong> among 66+ teams at HackJKLU Pre-Hackathon 2026.</p>
    ),
  },
  {
    title: "MoodJournal",
    description: "Sentiment Analysis / Mistral AI",
    icon: BrainCircuit,
    color: "bg-indigo-950",
    tags: ["Mistral AI", "LangChain", "MERN", "Sentiment Logic"],
    ctaLink: "https://github.com/TIA1106/moodjournal",
    content: () => (
      <p>A mental wellness system utilizing <strong>Mistral AI via OpenRouter</strong>. Developed during a 15-day AI sprint, it features an intelligent chatbot therapist and a recommendation engine that suggests music based on real-time sentiment analysis of journal entries.</p>
    ),
  },
  {
    title: "TiaPrompt",
    description: "Secure MERN AI Architecture",
    icon: Layers,
    color: "bg-purple-950",
    tags: ["Node.js", "Express", "Cookie-Auth", "Mistral AI"],
    ctaLink: "https://github.com/TIA1106/TiaPrompt",
    content: () => (
      <p>An enterprise-ready AI chatbot platform focusing on <strong>HTTP-only cookie-based authentication</strong>. Connects securely to the Mistral AI API, providing a persistent and protected environment for technical inquiry and user-agent interaction.</p>
    ),
  },
  {
    title: "Agentic Assistant",
    description: "Domain-Specific AI Agent",
    icon: Workflow,
    color: "bg-blue-950",
    tags: ["Python", "Prompt Engineering", "JSON Persistence", "Streamlit"],
    ctaLink: "https://github.com/TIA1106/tia-agentic-ai-assistant",
    content: () => (
      <p>An autonomous learning agent engineered for domain-specific mastery. Implements <strong>dynamic system prompt injection</strong> to pivot between DSA and Full-Stack development modes, with session-level JSON log persistence.</p>
    ),
  },
  {
    title: "Productivity Engine",
    description: "Predictive RF Workflow",
    icon: TrendingUp,
    color: "bg-orange-900",
    tags: ["Scikit-Learn", "Random Forest", "EDA", "Regression"],
    ctaLink: "https://github.com/TIA1106/mood-productivity-engine",
    content: () => (
      <p>An end-to-end ML workflow modeling the correlation between psychological factors and work output. Utilizing a <strong>Random Forest Regressor</strong>, the engine achieved a significant reduction in MAE (~2.3) compared to linear baselines.</p>
    ),
  },
  {
    title: "Hit Song Predictor",
    description: "99% Accuracy Classifier",
    icon: Music,
    color: "bg-emerald-950",
    tags: ["Machine Learning", "Binary Classification", "StandardScaler"],
    ctaLink: "https://github.com/TIA1106/spotify-hit-classifier",
    content: () => (
      <p>A high-precision predictive model for acoustic market analysis. Trained on Spotify audio features, this <strong>Random Forest Classifier</strong> achieves 99% accuracy in predicting song success, validated against multiple ML baselines.</p>
    ),
  },
  {
    title: "House Predictor",
    description: "Market Regression Analysis",
    icon: Cpu,
    color: "bg-red-950",
    tags: ["Linear Regression", "Polynomial Features", "Matplotlib"],
    ctaLink: "https://github.com/TIA1106/california-house-price-predictor",
    content: () => (
      <p>A quantitative analysis of California real estate markets. Developed using <strong>Polynomial Regression</strong> to model demographic impacts on property valuation, deployed via an interactive Streamlit dashboard for real-time inference.</p>
    ),
  },
  {
    title: "Customer Segment",
    description: "Unsupervised Market Clusters",
    icon: Code2,
    color: "bg-amber-950",
    tags: ["KMeans", "PCA", "Cluster Analysis", "Visualization"],
    ctaLink: "https://github.com/TIA1106/mall-customer-segmentation",
    content: () => (
      <p>A market intelligence project applying <strong>Principal Component Analysis (PCA)</strong> and KMeans clustering. Identifies distinct consumer personas based on high-dimensional shopping data, optimized via elbow-method validation.</p>
    ),
  },
];