import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
    {
        role: "Web & Mobile Developer",
        company: "Weblocks",
        period: "2024 - Present",
        desc: "Developing production-level applications. Collaborating with cross-functional teams to deliver high-quality software solutions.",
        tags: ["React", "React Native", "Teamwork"],
        highlights: [
            "Built and shipped multiple client-facing web applications",
            "Collaborated in agile sprints with designers and backend teams",
            "Optimized app performance and load times significantly"
        ]
    }
];

export default function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="experience" className="section-wrapper relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#6366f1]/5 rounded-full blur-[80px] -z-10" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#a855f7]/5 rounded-full blur-[80px] -z-10" />

            <div className="section-container">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="section-header"
                >
                    <span className="section-subtitle">Work Experience</span>
                    <h2 className="type-h2 text-white">Where I've Worked</h2>
                    <div className="section-divider mt-2" />
                </motion.div>

                {/* Timeline */}
                <div className="max-w-3xl mx-auto w-full">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="relative pl-8 md:pl-0"
                        >
                            {/* Desktop Layout */}
                            <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start">
                                <div className="text-right py-4">
                                    <motion.span
                                        className="inline-flex items-center gap-2 tag border-[#6366f1]/30 text-[#6366f1] bg-[#6366f1]/5"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
                                        {exp.period}
                                    </motion.span>
                                </div>

                                <div className="relative flex flex-col items-center h-full min-h-[150px]">
                                    <motion.div
                                        className="w-4 h-4 rounded-full bg-[#6366f1] ring-4 ring-[#6366f1]/20 z-10 mt-6"
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
                                    />
                                    <motion.div
                                        className="w-[2px] bg-gradient-to-b from-[#6366f1] to-transparent flex-grow -mt-1"
                                        initial={{ scaleY: 0 }}
                                        animate={isInView ? { scaleY: 1 } : {}}
                                        transition={{ delay: 0.6, duration: 0.8 }}
                                        style={{ transformOrigin: 'top' }}
                                    />
                                </div>

                                <motion.div
                                    className="card-base card-glow card-inner-glow border-l-4 border-l-[#6366f1]"
                                    whileHover={{ x: 4 }}
                                >
                                    <div className="card-content gap-3">
                                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                        <p className="text-[#6366f1] font-semibold text-sm">{exp.company}</p>
                                        <p className="text-[#9898a8] text-sm leading-relaxed">{exp.desc}</p>
                                        {exp.highlights && (
                                            <ul className="space-y-2 mt-2">
                                                {exp.highlights.map((h, i) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                        transition={{ delay: 0.5 + i * 0.1 }}
                                                        className="flex items-start gap-2 text-sm text-[#aeb0be]"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] mt-1.5 shrink-0" />
                                                        {h}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        )}
                                        <div className="flex flex-wrap gap-2 mt-2 pt-3 border-t border-[#2a2a3a]">
                                            {exp.tags.map(t => (
                                                <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-[#71717a] px-2 py-1 bg-[#1a1a24] rounded">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Mobile Layout */}
                            <div className="md:hidden relative border-l-2 border-[#6366f1]/30 pl-6 pb-12 last:pb-0">
                                <motion.div
                                    className="absolute left-[-6px] top-6 w-3 h-3 rounded-full bg-[#6366f1] ring-2 ring-[#6366f1]/20"
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : {}}
                                    transition={{ delay: 0.3, type: 'spring' }}
                                />
                                <div className="card-base card-glow card-inner-glow">
                                    <div className="card-content gap-2">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                                            <span className="text-xs font-medium text-[#6366f1] bg-[#6366f1]/10 px-2 py-1 rounded flex items-center gap-1">
                                                <span className="w-1 h-1 rounded-full bg-[#6366f1] animate-pulse" />
                                                {exp.period}
                                            </span>
                                        </div>
                                        <p className="text-[#a1a1aa] text-sm font-semibold mb-2">{exp.company}</p>
                                        <p className="text-[#9898a8] text-sm leading-relaxed">{exp.desc}</p>
                                        {exp.highlights && (
                                            <ul className="space-y-2 mt-2">
                                                {exp.highlights.map((h, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-[#aeb0be]">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] mt-1.5 shrink-0" />
                                                        {h}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
