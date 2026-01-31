"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const skills = [
    "React", "Next.js", "Node.js", "Python", "MongoDB",
    "Tailwind", "JavaScript", "TypeScript", "Framer Motion",
    "Mistral AI", "Git", "SQL", "AWS", "Docker", "Machine Learning",
    "Three.js", "Figma", "Redux", "PostgreSQL", "Prisma"
];

const FallingSkills = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden mt-10 md:mt-20 border-t border-white/10 bg-black">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />

            {skills.map((skill, i) => {
                const randomX = Math.random() * 95; // Avoid edge overflow
                const randomDuration = 5 + Math.random() * 8; // Faster fall for shorter height
                const randomDelay = Math.random() * 10;
                const randomRotate = Math.random() * 360;

                // Randomly choose between the two styles seen in the image
                // Style 1: Dark pill with border
                // Style 2: White pill with pink shadow (pop style)
                const isPopStyle = Math.random() > 0.5;

                return (
                    <motion.div
                        key={i}
                        initial={{ y: -50, x: `${randomX}vw`, rotate: randomRotate, opacity: 0 }}
                        animate={{
                            y: ["0vh", "60vh"],
                            opacity: [0, 1, 1, 0],
                            rotate: [randomRotate, randomRotate + 45]
                        }}
                        transition={{
                            duration: randomDuration,
                            repeat: Infinity,
                            delay: randomDelay,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                        className={`absolute px-4 py-2 md:px-6 md:py-3 rounded-full font-black uppercase tracking-wider text-xs md:text-sm whitespace-nowrap select-none border-2
                  ${isPopStyle
                                ? "bg-white text-black border-black shadow-[4px_4px_0px_0px_#FF66C4]"
                                : "bg-zinc-900/80 text-white border-zinc-700 shadow-lg backdrop-blur-sm"
                            }`}
                    >
                        {skill}
                    </motion.div>
                )
            })}

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <h2 className="text-5xl md:text-9xl font-black text-white/5 uppercase italic tracking-tighter">
                    SKILLSET
                </h2>
            </div>
        </div>
    );
};

export default FallingSkills;
