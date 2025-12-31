import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
    {
        title: 'Frontend Development',
        icon: '💻',
        skills: ['React', 'JavaScript (ES6+)', 'TypeScript', 'HTML5 & CSS3', 'Tailwind CSS', 'Framer Motion']
    },
    {
        title: 'Mobile Development',
        icon: '📱',
        skills: ['React Native', 'Expo', 'Android Studio', 'iOS', 'Native Modules', 'Mobile UI/UX']
    },
    {
        title: 'Backend & Tools',
        icon: '🛠️',
        skills: ['Node.js Basics', 'Git & GitHub', 'REST APIs', 'VS Code', 'Figma', 'Vercel']
    }
];

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="skills" className="section-wrapper bg-[#0b0b0f]">
            <div className="section-container">

                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="section-header"
                >
                    <span className="section-subtitle">Technical Skills</span>
                    <p className="section-description text-center">
                        My technical toolkit for building robust applications.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1 }}
                            className="card-base card-glow"
                        >
                            <div className="card-content">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-3xl bg-[#1a1a24] p-3 rounded-lg border border-[#2a2a3a]">{category.icon}</span>
                                    <h3 className="text-lg font-bold text-white">{category.title}</h3>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {category.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 text-xs font-medium bg-[#1a1a24] text-[#d4d4dc] border border-[#2a2a3a] rounded-md hover:border-[#6366f1] hover:text-white transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
