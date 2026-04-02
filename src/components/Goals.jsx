import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Goals() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section-wrapper bg-[#0b0b0f] relative overflow-hidden">
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-[100px] -z-10" />

            <div className="section-container">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="section-header"
                >
                    <span className="section-subtitle">Future Goals</span>
                    <h2 className="type-h2 text-white">My Vision</h2>
                    <div className="section-divider mt-2" />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="relative group">
                        <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#22d3ee] rounded-2xl blur-lg opacity-15 group-hover:opacity-25 transition-opacity duration-500"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{ duration: 6, repeat: Infinity }}
                            style={{ backgroundSize: '200% 200%' }}
                        />

                        <div className="card-base card-inner-glow relative bg-[#13131a] border-[#2a2a3a]">
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <motion.div
                                    className="flex-shrink-0"
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <div className="w-14 h-14 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="#6366f1" opacity="0.7">
                                            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                                        </svg>
                                    </div>
                                </motion.div>

                                <div>
                                    <p className="text-lg text-[#d4d4dc] font-medium leading-relaxed mb-5">
                                        My goal is to transition into a professional Software Engineering role where I can contribute to meaningful products, learn from experienced mentors, and solve complex real-world problems.
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-[2px] w-10 bg-gradient-to-r from-[#6366f1] to-[#a855f7]" />
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
