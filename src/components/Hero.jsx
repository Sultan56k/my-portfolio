import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Hero() {
    const developmentTypes = [
        'Full Stack Development',
        'Frontend Development',
        'Backend Development',
        'Mobile Development'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % developmentTypes.length);
        }, 2000); // Change every 2 seconds

        return () => clearInterval(interval);
    }, [developmentTypes.length]);
    return (
        <section className="section-wrapper min-h-screen flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-20">
            {/* Background gradient mesh */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6366f1]/20 rounded-full blur-[120px] opacity-60" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#22d3ee]/15 rounded-full blur-[120px] opacity-60" />
            </div>

            <div className="section-container text-center gap-6 md:gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex flex-col items-center gap-5 md:gap-6"
                >
                    {/* Top tag */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="px-4 py-1.5 rounded-full border border-[#2a2a3a] bg-[#1a1a24]/50 backdrop-blur-sm"
                    >
                        <span className="text-sm font-medium text-[#c4c4cc] tracking-wide">
                            Web & Mobile App Developer
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.div className="max-w-4xl mx-auto space-y-4 text-center">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                            Hi, I'm <span className="gradient-text">Muhammad Sultan</span>
                        </h1>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-normal text-[#d4d4dc] leading-relaxed break-normal">
                            Crafting scalable digital experiences with <span className="text-white font-medium">React</span>&nbsp;& <span className="text-white font-medium">React Native</span>.
                        </h2>
                        <p className="text-[#9898a8] text-base leading-relaxed break-normal">
                            Computer Science student with professional experience in building performant, user-centric applications.
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
                    >
                        <a href="#projects" className="btn-primary">
                            View Work
                        </a>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            Resume
                        </a>
                    </motion.div>

                    {/* Animated Development Type Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                        className="mt-16 md:mt-20 lg:mt-24"
                    >
                        <div className="relative h-16 md:h-20 lg:h-24 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold gradient-text text-center"
                                >
                                    {developmentTypes[currentIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#6366f1] to-transparent" />
            </motion.div>
        </section>
    );
}
