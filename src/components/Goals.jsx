import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Goals() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section-wrapper bg-[#0b0b0f]">
            <div className="section-container">

                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="section-header"
                >
                    <span className="section-subtitle">Future Goals</span>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="max-w-3xl mx-auto"
                >
                    <div className="relative">
                        {/* Glow backing */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#22d3ee] rounded-2xl blur-lg opacity-20 transform scale-95" />

                        <div className="card-base relative bg-[#13131a] border-[#2a2a3a]">
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <span className="text-6xl text-[#6366f1] opacity-50 font-serif leading-none">"</span>
                                <div>
                                    <p className="text-lg text-[#d4d4dc] font-medium leading-relaxed mb-4">
                                        My goal is to transition into a professional Software Engineering role where I can contribute to meaningful products, learn from experienced mentors, and solve complex real-world problems.
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-[2px] w-8 bg-[#6366f1]" />
                                        <span className="text-sm font-bold text-white tracking-wide">MUHAMMAD SULTAN</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
