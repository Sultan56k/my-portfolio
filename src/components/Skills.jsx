import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';

const skillCategories = [
    {
        title: 'Frontend Development',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        color: '#6366f1',
        skills: [
            { name: 'React', level: 90 },
            { name: 'JavaScript (ES6+)', level: 88 },
            { name: 'TypeScript', level: 75 },
            { name: 'HTML5 & CSS3', level: 92 },
            { name: 'Tailwind CSS', level: 90 },
            { name: 'Framer Motion', level: 80 },
        ]
    },
    {
        title: 'Mobile Development',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
        ),
        color: '#a855f7',
        skills: [
            { name: 'React Native', level: 88 },
            { name: 'Expo', level: 85 },
            { name: 'Android Studio', level: 70 },
            { name: 'iOS', level: 65 },
            { name: 'Native Modules', level: 60 },
            { name: 'Mobile UI/UX', level: 82 },
        ]
    },
    {
        title: 'Backend & Tools',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        color: '#22d3ee',
        skills: [
            { name: 'Node.js', level: 65 },
            { name: 'Git & GitHub', level: 88 },
            { name: 'REST APIs', level: 82 },
            { name: 'VS Code', level: 95 },
            { name: 'Figma', level: 70 },
            { name: 'Vercel', level: 80 },
        ]
    }
];

function TiltCard({ children, className }) {
    const [transform, setTransform] = useState('');

    const handleMouse = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (y - 0.5) * -8;
        const rotateY = (x - 0.5) * 8;
        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    }, []);

    const handleLeave = useCallback(() => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    }, []);

    return (
        <div
            className={className}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ transform, transition: 'transform 0.2s ease-out' }}
        >
            {children}
        </div>
    );
}

function SkillBar({ name, level, color, delay }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-30px' });

    return (
        <div ref={ref} className="group">
            <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-[#d4d4dc] group-hover:text-white transition-colors">{name}</span>
                <motion.span
                    className="text-xs font-bold text-[#9898a8]"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: delay + 0.5 }}
                >
                    {level}%
                </motion.span>
            </div>
            <div className="h-1.5 bg-[#1a1a24] rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
                    initial={{ width: '0%' }}
                    animate={isInView ? { width: `${level}%` } : {}}
                    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
        </div>
    );
}

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="skills" className="section-wrapper bg-[#0b0b0f] relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-[100px] -z-10" />

            <div className="section-container">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="section-header"
                >
                    <span className="section-subtitle">Technical Skills</span>
                    <h2 className="type-h2 text-white">My Toolkit</h2>
                    <div className="section-divider mt-2" />
                    <p className="section-description text-center mt-4">
                        Technologies and tools I use to build robust applications.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <TiltCard className="card-base card-glow card-inner-glow h-full">
                                <div className="card-content">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div
                                            className="p-3 rounded-xl border transition-colors duration-300"
                                            style={{
                                                backgroundColor: `${category.color}10`,
                                                borderColor: `${category.color}30`,
                                            }}
                                        >
                                            {category.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{category.title}</h3>
                                    </div>

                                    <div className="flex flex-col gap-4 mt-2">
                                        {category.skills.map((skill, idx) => (
                                            <SkillBar
                                                key={idx}
                                                name={skill.name}
                                                level={skill.level}
                                                color={category.color}
                                                delay={index * 0.15 + idx * 0.08}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
