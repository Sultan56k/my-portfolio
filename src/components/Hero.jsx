import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

function useTypewriter(text, speed = 60, delay = 0) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        setDisplayed('');
        setDone(false);
        let i = 0;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (i < text.length) {
                    setDisplayed(text.slice(0, i + 1));
                    i++;
                } else {
                    setDone(true);
                    clearInterval(interval);
                }
            }, speed);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, speed, delay]);

    return { displayed, done };
}

function MagneticButton({ children, className, ...props }) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouse = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
        setOffset({ x, y });
    }, []);

    const handleLeave = useCallback(() => {
        setOffset({ x: 0, y: 0 });
    }, []);

    return (
        <motion.a
            className={className}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            animate={{ x: offset.x, y: offset.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            {...props}
        >
            {children}
        </motion.a>
    );
}

function FloatingCodeBlock() {
    const codeLines = [
        { text: 'const', color: '#c678dd' },
        { text: ' developer', color: '#e5c07b' },
        { text: ' = {', color: '#abb2bf' },
    ];
    const codeBody = [
        { indent: '  ', key: 'name', color: '#e06c75', value: '"Muhammad Sultan"', valColor: '#98c379' },
        { indent: '  ', key: 'role', color: '#e06c75', value: '"Full Stack Dev"', valColor: '#98c379' },
        { indent: '  ', key: 'passion', color: '#e06c75', value: '"Building UIs"', valColor: '#98c379' },
        { indent: '  ', key: 'coffee', color: '#e06c75', value: 'true', valColor: '#d19a66' },
    ];

    return (
        <motion.div
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 hidden lg:block"
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: -5 }}
            transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div
                className="relative"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                {/* Glow behind */}
                <div className="absolute -inset-4 bg-[#6366f1]/10 rounded-2xl blur-xl" />

                <div className="relative bg-[#0d1117] border border-[#2a2a3a] rounded-xl p-5 font-mono text-sm shadow-2xl shadow-black/40 w-[280px]">
                    {/* Window dots */}
                    <div className="flex gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>

                    {/* Code */}
                    <div className="space-y-1 text-[13px] leading-relaxed">
                        <div>
                            {codeLines.map((part, i) => (
                                <span key={i} style={{ color: part.color }}>{part.text}</span>
                            ))}
                        </div>
                        {codeBody.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2 + i * 0.2 }}
                            >
                                <span className="text-[#abb2bf]">{line.indent}</span>
                                <span style={{ color: line.color }}>{line.key}</span>
                                <span className="text-[#abb2bf]">: </span>
                                <span style={{ color: line.valColor }}>{line.value}</span>
                                <span className="text-[#abb2bf]">,</span>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3 }}
                        >
                            <span className="text-[#abb2bf]">{'};'}</span>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function FloatingBadges() {
    const badges = [
        { text: 'React', x: -60, y: -40, delay: 1.8, color: '#61DAFB' },
        { text: 'Mobile', x: 60, y: 30, delay: 2.1, color: '#a855f7' },
        { text: 'UI/UX', x: -70, y: 50, delay: 2.4, color: '#22d3ee' },
    ];

    return (
        <div className="absolute inset-0 pointer-events-none hidden md:block">
            {badges.map((badge, i) => (
                <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 0.6,
                        scale: 1,
                        x: badge.x + '%',
                        y: badge.y + '%',
                    }}
                    transition={{ delay: badge.delay, duration: 0.6, type: 'spring' }}
                >
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm"
                        style={{
                            backgroundColor: `${badge.color}10`,
                            borderColor: `${badge.color}30`,
                            color: badge.color,
                        }}
                    >
                        {badge.text}
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
}

export default function Hero() {
    const developmentTypes = [
        'Full Stack Development',
        'Frontend Development',
        'Backend Development',
        'Mobile Development'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const { displayed: typedName, done: nameDone } = useTypewriter('Muhammad Sultan', 70, 600);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % developmentTypes.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [developmentTypes.length]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="section-wrapper min-h-screen flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-20 relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6366f1]/15 rounded-full blur-[120px] animate-morph"
                    animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#22d3ee]/10 rounded-full blur-[120px] animate-morph"
                    animate={{ x: [0, -30, 20, 0], y: [0, 25, -15, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#a855f7]/8 rounded-full blur-[100px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            {/* Floating Badges */}
            <FloatingBadges />

            {/* Floating Code Block */}
            <FloatingCodeBlock />

            <motion.div
                className="section-container text-center gap-6 md:gap-8 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col items-center gap-5 md:gap-6">
                    {/* Top tag */}
                    <motion.div variants={itemVariants}>
                        <motion.div
                            className="px-5 py-2 rounded-full border border-[#2a2a3a] bg-[#1a1a24]/50 backdrop-blur-sm inline-flex items-center gap-2"
                            whileHover={{ scale: 1.05, borderColor: '#6366f1' }}
                        >
                            <span className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse" />
                            <span className="text-sm font-medium text-[#c4c4cc] tracking-wide">
                                Web & Mobile App Developer
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Main Headline with Typewriter */}
                    <motion.div variants={itemVariants} className="max-w-4xl mx-auto space-y-4 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight px-2">
                            Hi, I'm{' '}
                            <span className="gradient-text animate-gradient relative">
                                {typedName}
                                {!nameDone && (
                                    <span className="animate-blink ml-0.5 text-[#6366f1]">|</span>
                                )}
                            </span>
                        </h1>
                        <motion.h2
                            variants={itemVariants}
                            className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-[#d4d4dc] leading-relaxed px-2"
                        >
                            Crafting scalable digital experiences with{' '}
                            <span className="text-white font-medium relative inline-block">
                                React
                                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#6366f1] to-transparent" />
                            </span>
                            {' & '}
                            <span className="text-white font-medium relative inline-block">
                                React Native
                                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#a855f7] to-transparent" />
                            </span>
                            .
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-[#9898a8] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto px-2">
                            Computer Science student with professional experience in building performant, user-centric applications.
                        </motion.p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto"
                    >
                        <MagneticButton href="#projects" className="btn-primary gap-2">
                            <span>View Work</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M3 8h10M9 4l4 4-4 4" />
                            </svg>
                        </MagneticButton>
                        <MagneticButton href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary gap-2">
                            <span>Resume</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M4 12l8-8M4 4h8v8" />
                            </svg>
                        </MagneticButton>
                    </motion.div>

                    {/* Trusted By / Social Proof mini-bar */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-3 sm:gap-6 mt-6 sm:mt-8 opacity-50"
                    >
                        <div className="h-[1px] w-6 sm:w-12 bg-[#2a2a3a]" />
                        <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-[#71717a] tracking-wide uppercase">
                            <span>React</span>
                            <span className="w-1 h-1 rounded-full bg-[#2a2a3a]" />
                            <span>React Native</span>
                            <span className="w-1 h-1 rounded-full bg-[#2a2a3a]" />
                            <span>TypeScript</span>
                        </div>
                        <div className="h-[1px] w-6 sm:w-12 bg-[#2a2a3a]" />
                    </motion.div>

                    {/* Animated Development Type Text */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-12 md:mt-16 lg:mt-20"
                    >
                        <p className="text-xs tracking-[0.2em] uppercase text-[#71717a] mb-4">What I Do</p>
                        <div className="relative h-12 sm:h-16 md:h-20 lg:h-24 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 30, filter: 'blur(12px)', scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                                    exit={{ opacity: 0, y: -30, filter: 'blur(12px)', scale: 0.95 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold gradient-text text-center absolute whitespace-nowrap"
                                >
                                    {developmentTypes[currentIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Enhanced Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#71717a]">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="w-5 h-8 rounded-full border-2 border-[#2a2a3a] flex items-start justify-center p-1">
                        <motion.div
                            className="w-1 h-2 rounded-full bg-[#6366f1]"
                            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
