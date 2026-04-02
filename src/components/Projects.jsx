import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';

const projects = [
    {
        title: 'Video Summarizer Application',
        desc: 'A performance-focused application that processes and merges video content to generate a concise summarized output.',
        tech: ['React Native', 'Video Processing', 'Performance Optimization', 'Asynchronous Logic'],
        gradient: 'from-blue-500 to-cyan-400',
        color: '#3b82f6',
        icon: '🎬',
        bullets: [
            'Merges multiple videos into a summarized output',
            'Optimized handling of large video files',
            'Progress-aware UI during processing'
        ],
        contribution: 'Designed and implemented the complete video processing flow with a focus on performance and user feedback.'
    },
    {
        title: 'Student Utility App',
        desc: 'A comprehensive Android helper application providing scheduling, notes management, and access to academic resources.',
        tech: ['Android', 'Java', 'Firebase'],
        gradient: 'from-purple-500 to-pink-500',
        color: '#a855f7',
        icon: '📚',
        bullets: [
            'Student-focused scheduling and task management',
            'Notes organization and academic resource access',
            'Firebase-backed data synchronization'
        ],
        contribution: 'Developed the Android application with a focus on usability, data reliability, and smooth navigation.'
    },
    {
        title: 'Step & Water Tracker App',
        desc: 'A mobile fitness tracking app focused on daily step visualization and water intake monitoring.',
        tech: ['React Native', 'Expo', 'Charts', 'Local Storage'],
        gradient: 'from-emerald-400 to-teal-500',
        color: '#10b981',
        icon: '🏃',
        bullets: [
            'Real-time step tracking with visual charts',
            'Daily water intake logging and progress tracking',
            'Clean UI with performance-aware data rendering'
        ],
        contribution: 'Designed and developed the complete mobile interface and data flow.'
    },
    {
        title: 'AI Chatbot Application',
        desc: 'An intelligent chatbot designed to provide fast, context-aware responses with a clean and responsive user interface.',
        tech: ['React / React Native', 'API Integration', 'State Management', 'UI Animations'],
        gradient: 'from-orange-500 to-red-500',
        color: '#f97316',
        icon: '🤖',
        bullets: [
            'Real-time conversational chat interface',
            'Context-aware response handling',
            'Smooth UI interactions with performance focus'
        ],
        contribution: 'Built the complete chat interface and integrated conversational logic with a focus on user experience.'
    }
];

function ProjectCard({ project, index, isInView }) {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
    const rotateY = useSpring(0, { stiffness: 200, damping: 20 });
    const glowX = useSpring(50, { stiffness: 200, damping: 30 });
    const glowY = useSpring(50, { stiffness: 200, damping: 30 });

    const handleMouse = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
        rotateX.set((y - 0.5) * -8);
        rotateY.set((x - 0.5) * 8);
        glowX.set(x * 100);
        glowY.set(y * 100);
    }, [mouseX, mouseY, rotateX, rotateY, glowX, glowY]);

    const handleLeave = useCallback(() => {
        rotateX.set(0);
        rotateY.set(0);
        glowX.set(50);
        glowY.set(50);
        setIsHovered(false);
    }, [rotateX, rotateY, glowX, glowY]);

    useEffect(() => {
        const unsubX = glowX.on('change', (v) => {
            if (cardRef.current) cardRef.current.style.setProperty('--glow-x', `${v}%`);
        });
        const unsubY = glowY.on('change', (v) => {
            if (cardRef.current) cardRef.current.style.setProperty('--glow-y', `${v}%`);
        });
        return () => { unsubX(); unsubY(); };
    }, [glowX, glowY]);

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: {
                delay: index * 0.15,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
            }
        }
    };

    const bulletVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1, x: 0,
            transition: { delay: index * 0.15 + i * 0.1 + 0.4, duration: 0.5, ease: 'easeOut' }
        })
    };

    const tagVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1, scale: 1,
            transition: { delay: index * 0.15 + i * 0.06 + 0.6, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
        })
    };

    return (
        <motion.div
            ref={cardRef}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            onMouseMove={handleMouse}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleLeave}
            style={{ perspective: 1000 }}
            className="project-card-wrapper"
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                className="project-card group relative overflow-hidden rounded-2xl"
            >
                {/* Animated gradient border */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-[1]"
                    style={{
                        padding: '1px',
                        background: `linear-gradient(135deg, ${project.color}, transparent 60%)`,
                    }}
                />

                {/* Mouse-following glow */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                    style={{
                        background: `radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${project.color}15, transparent 40%)`,
                    }}
                />

                {/* Shimmer sweep on hover */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    <motion.div
                        className="absolute inset-0"
                        initial={{ x: '-100%' }}
                        animate={isHovered ? { x: '200%' } : { x: '-100%' }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                            width: '50%',
                        }}
                    />
                </div>

                {/* Top gradient line + glow */}
                <motion.div
                    className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r ${project.gradient}`}
                    initial={{ width: '0%' }}
                    animate={isInView ? (isHovered ? { width: '100%' } : { width: '30%' }) : { width: '0%' }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.div
                    className={`absolute top-0 left-0 h-[6px] bg-gradient-to-r ${project.gradient} blur-sm`}
                    initial={{ width: '0%', opacity: 0 }}
                    animate={isHovered ? { width: '100%', opacity: 0.6 } : { width: '0%', opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />

                <div className="card-content justify-between h-full relative z-10 p-6 sm:p-7 lg:p-8">
                    <div>
                        {/* Header: Icon + Project number */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold text-[#3a3a4a] tracking-wider uppercase">
                                Project 0{index + 1}
                            </span>
                            <motion.span
                                className="text-2xl"
                                animate={isHovered ? {
                                    scale: [1, 1.2, 1],
                                    rotate: [0, -10, 10, 0],
                                } : { scale: 1, rotate: 0 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                            >
                                {project.icon}
                            </motion.span>
                        </div>

                        {/* Title with animated accent dot */}
                        <h3 className="type-h3 mb-3 group-hover:text-white transition-colors duration-300 flex items-center gap-3">
                            <motion.span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: project.color }}
                                animate={isHovered ? {
                                    scale: [1, 1.5, 1],
                                    boxShadow: [
                                        `0 0 0px ${project.color}`,
                                        `0 0 12px ${project.color}`,
                                        `0 0 4px ${project.color}`,
                                    ]
                                } : { scale: 1, boxShadow: `0 0 0px ${project.color}` }}
                                transition={{ duration: 0.6, ease: 'easeInOut' }}
                            />
                            <span>{project.title}</span>
                        </h3>

                        {/* Description */}
                        <p className="type-body mb-5 text-[var(--color-text-muted)] leading-relaxed">
                            {project.desc}
                        </p>

                        {/* Animated bullet points */}
                        {project.bullets && (
                            <ul className="mb-5 space-y-3">
                                {project.bullets.map((bullet, idx) => (
                                    <motion.li
                                        key={idx}
                                        custom={idx}
                                        variants={bulletVariants}
                                        initial="hidden"
                                        animate={isInView ? 'visible' : 'hidden'}
                                        className="flex items-start type-small text-[var(--color-text-muted)] group/bullet"
                                    >
                                        <motion.span
                                            className="w-1.5 h-1.5 rounded-full mt-1.5 mr-3 shrink-0"
                                            style={{ backgroundColor: project.color }}
                                            whileHover={{ scale: 2 }}
                                        />
                                        <span className="leading-relaxed group-hover/bullet:text-[var(--color-text-secondary)] transition-colors duration-200">
                                            {bullet}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        )}

                        {/* Contribution quote */}
                        {project.contribution && (
                            <motion.div
                                className="mb-5 pl-4 border-l-2 relative"
                                style={{ borderColor: `${project.color}40` }}
                                whileHover={{ borderColor: project.color }}
                            >
                                <p className="type-small italic text-[var(--color-text-secondary)]">
                                    {project.contribution}
                                </p>
                            </motion.div>
                        )}
                    </div>

                    {/* Tech tags with staggered pop-in */}
                    <div className="pt-4 border-t border-[var(--color-border-subtle)]/50 flex flex-wrap gap-2">
                        {project.tech.map((t, idx) => (
                            <motion.span
                                key={idx}
                                custom={idx}
                                variants={tagVariants}
                                initial="hidden"
                                animate={isInView ? 'visible' : 'hidden'}
                                whileHover={{
                                    scale: 1.08,
                                    borderColor: project.color,
                                    color: '#fff',
                                    backgroundColor: `${project.color}18`,
                                }}
                                className="type-caption px-3 py-1.5 rounded-lg border transition-all duration-300 cursor-default"
                                style={{
                                    backgroundColor: `${project.color}08`,
                                    borderColor: `${project.color}20`,
                                    color: 'var(--color-text-secondary)',
                                }}
                            >
                                #{t}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="projects" className="section-wrapper relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#22d3ee]/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#a855f7]/5 rounded-full blur-[100px] -z-10" />

            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="section-header"
                >
                    <span className="section-subtitle">Featured Work</span>
                    <h2 className="type-h2 text-[var(--color-text-primary)]">
                        Recent Projects
                    </h2>
                    <div className="section-divider mt-2" />
                    <p className="section-description type-body mt-4">
                        A selection of projects that showcase my development capabilities.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {projects.map((p, i) => (
                        <ProjectCard key={i} project={p} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
