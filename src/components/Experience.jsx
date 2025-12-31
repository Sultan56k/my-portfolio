import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
    {
        role: "Web & Mobile Developer",
        company: "Weblocks",
        period: "2024 - Present",
        desc: "Developing production-level applications. Collaborating with cross-functional teams to deliver high-quality software solutions.",
        tags: ["React", "React Native", "Teamwork"]
    }
];

export default function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="experience" className="section-wrapper relative">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#6366f1]/5 rounded-full blur-[80px] -z-10" />

            <div className="section-container">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="section-header"
                >
                    <span className="section-subtitle">Work Experience</span>
                </motion.div>

                {/* Timeline wrapper to center it */}
                <div className="max-w-3xl mx-auto w-full">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            className="relative pl-8 md:pl-0"
                        >
                            {/* Desktop: Grid layout for timeline */}
                            <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start">
                                {/* Left: Date */}
                                <div className="text-right py-4">
                                    <span className="tag border-[#6366f1]/30 text-[#6366f1] bg-[#6366f1]/5">
                                        {exp.period}
                                    </span>
                                </div>

                                {/* Center: Line & Dot */}
                                <div className="relative flex flex-col items-center h-full min-h-[150px]">
                                    <div className="w-3 h-3 rounded-full bg-[#6366f1] ring-4 ring-[#6366f1]/20 z-10 mt-6" />
                                    <div className="w-[1px] bg-[#2a2a3a] flex-grow -mt-3" />
                                </div>

                                {/* Right: Card */}
                                <div className="card-base card-glow border-l-4 border-l-[#6366f1]">
                                    <div className="card-content gap-2">
                                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                        <p className="text-[#6366f1] font-medium text-sm mb-2">{exp.company}</p>
                                        <p className="text-[#9898a8] text-sm leading-relaxed mb-3">
                                            {exp.desc}
                                        </p>
                                        <div className="flex gap-2">
                                            {exp.tags.map(t => (
                                                <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-[#71717a]">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile: Simple Vertical Layout */}
                            <div className="md:hidden relative border-l border-[#2a2a3a] pl-6 pb-12 last:pb-0">
                                <div className="absolute left-[-5px] top-6 w-2.5 h-2.5 rounded-full bg-[#6366f1]" />
                                <div className="card-base card-glow">
                                    <div className="card-content gap-2">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                                            <span className="text-xs font-medium text-[#6366f1] bg-[#6366f1]/10 px-2 py-1 rounded">{exp.period}</span>
                                        </div>
                                        <p className="text-[#a1a1aa] text-sm mb-2">{exp.company}</p>
                                        <p className="text-[#9898a8] text-sm leading-relaxed">
                                            {exp.desc}
                                        </p>
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
