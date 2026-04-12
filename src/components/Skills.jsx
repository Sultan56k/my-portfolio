import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import AnimatedHeading from './AnimatedHeading';
import { skillCategories } from '../data/skills';

/* Icons for each skill category — kept in the component so the
   data file stays free of JSX. */
const CATEGORY_ICONS = {
    frontend: (color) => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
    ),
    mobile: (color) => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
    ),
    backend: (color) => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    ),
};

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

/* Radial progress ring — one SVG circle with strokeDasharray animation.
   Shows the category's aggregate average skill level. */
function RadialRing({ progress, color, size = 56 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-30px' });
    const stroke = 4;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <svg ref={ref} width={size} height={size} className="shrink-0" aria-hidden="true">
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#2a2a3a"
                strokeWidth={stroke}
                fill="none"
            />
            <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={stroke}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={isInView ? { strokeDashoffset: circumference * (1 - progress / 100) } : {}}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="11"
                fontWeight="700"
                fill="#ffffff"
            >
                {progress}%
            </text>
        </svg>
    );
}

function SkillBar({ name, level, note, color, delay }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-30px' });
    const [hovered, setHovered] = useState(false);

    return (
        <div
            ref={ref}
            className="group relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            tabIndex={note ? 0 : undefined}
        >
            <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-[#d4d4dc] group-hover:text-white transition-colors">
                    {name}
                </span>
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

            {note && hovered && (
                <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 right-0 -top-9 z-10 px-3 py-1.5 rounded-md bg-[#0b0b0f] border text-xs text-[#d4d4dc] shadow-lg shadow-black/40 pointer-events-none"
                    style={{ borderColor: `${color}40` }}
                    role="tooltip"
                >
                    {note}
                </motion.div>
            )}
        </div>
    );
}

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="skills" className="section-wrapper bg-[#0b0b0f] relative overflow-hidden">
            <div
                className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[100px] -z-10"
                style={{ background: 'rgba(var(--accent-2-rgb), 0.06)' }}
            />

            <div className="section-container">
                <div ref={ref}>
                    <AnimatedHeading
                        eyebrow="Technical Skills"
                        title="My Toolkit"
                        description="Technologies and tools I use to build robust applications."
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {skillCategories.map((category, index) => {
                        const avg = Math.round(
                            category.skills.reduce((sum, s) => sum + s.level, 0) / category.skills.length
                        );
                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <TiltCard className="card-base card-glow card-inner-glow shine h-full">
                                    <div className="card-content">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div
                                                className="p-3 rounded-xl border transition-colors duration-300"
                                                style={{
                                                    backgroundColor: `${category.color}10`,
                                                    borderColor: `${category.color}30`,
                                                }}
                                            >
                                                {CATEGORY_ICONS[category.iconKey]?.(category.color) ?? null}
                                            </div>
                                            <h3 className="text-lg font-bold text-white flex-1">
                                                {category.title}
                                            </h3>
                                            <RadialRing progress={avg} color={category.color} />
                                        </div>

                                        <div className="flex flex-col gap-4 mt-2">
                                            {category.skills.map((skill, idx) => (
                                                <SkillBar
                                                    key={skill.name}
                                                    name={skill.name}
                                                    level={skill.level}
                                                    note={skill.note}
                                                    color={category.color}
                                                    delay={index * 0.15 + idx * 0.08}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
