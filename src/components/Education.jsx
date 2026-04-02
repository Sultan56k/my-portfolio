import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Education() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const subjects = ['Software Engineering', 'System Design', 'Data Structures'];

    return (
        <section id="education" className="section-wrapper relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#6366f1]/5 rounded-full blur-[100px] -z-10" />

            <div className="section-container">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="section-header"
                >
                    <span className="section-subtitle">Education</span>
                    <h2 className="type-h2 text-white">Academic Background</h2>
                    <div className="section-divider mt-2" />
                </motion.div>

                {/* Centered Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl mx-auto w-full"
                >
                    <div className="relative group">
                        <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#22d3ee] rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            style={{ backgroundSize: '200% 200%' }}
                        />

                        <div className="card-base card-inner-glow relative text-center p-8 md:p-12">
                            <motion.div
                                className="w-20 h-20 mx-auto bg-[#6366f1]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#6366f1]/20"
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
                                </svg>
                            </motion.div>

                            <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Computer Science</h3>
                            <motion.p
                                className="text-[#6366f1] font-semibold text-lg mb-6 inline-flex items-center gap-2"
                                whileHover={{ scale: 1.02 }}
                            >
                                <span className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse" />
                                Final Year Student
                            </motion.p>

                            <div className="flex flex-wrap gap-3 justify-center">
                                {subjects.map((subject, i) => (
                                    <motion.span
                                        key={i}
                                        className="tag"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                    >
                                        {subject}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
