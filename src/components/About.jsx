import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="section-wrapper bg-[#0b0b0f]">
            <div className="section-container">

                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="section-header"
                >
                    <span className="section-subtitle">About Me</span>
                    <p className="section-description text-center">
                        Bridging the gap between conceptual design and technical implementation.
                    </p>
                </motion.div>

                {/* Content */}
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4 text-[#d4d4dc] text-base leading-relaxed">
                            <p>
                                I am a final-year Computer Science student and a passionate developer specializing in the <strong className="text-white">React ecosystem</strong>. My journey started with a curiosity for how things work on the web, which quickly evolved into a career building professional applications.
                            </p>
                            <p>
                                At <strong className="text-white">Weblocks</strong>, I gained valuable industry experience working on complex projects, where I learned the importance of clean architecture, performance optimization, and team collaboration.
                            </p>
                            <p>
                                I don't just write code; I build solutions that users enjoy interacting with.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {['Clean Code', 'Performance', 'UI/UX Design', 'Problem Solving'].map((tag, i) => (
                                <span key={i} className="tag">{tag}</span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-2 gap-4 md:gap-6"
                    >
                        <div className="card-base card-glow bg-[#13131a] text-center justify-center py-8">
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-[#6366f1] mb-1">1+</span>
                            <span className="text-xs font-semibold text-[#9898a8] uppercase tracking-wider">Years Exp</span>
                        </div>
                        <div className="card-base card-glow bg-[#13131a] text-center justify-center py-8">
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-[#22d3ee] mb-1">10+</span>
                            <span className="text-xs font-semibold text-[#9898a8] uppercase tracking-wider">Projects</span>
                        </div>
                        <div className="card-base card-glow bg-[#13131a] text-center justify-center py-8">
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-[#a855f7] mb-1">CS</span>
                            <span className="text-xs font-semibold text-[#9898a8] uppercase tracking-wider">Major</span>
                        </div>
                        <div className="card-base card-glow bg-[#13131a] text-center justify-center py-8">
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-[#6366f1] mb-1">100%</span>
                            <span className="text-xs font-semibold text-[#9898a8] uppercase tracking-wider">Commited</span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
