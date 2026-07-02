import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import MagneticButton from './MagneticButton';
import PhoneMockup from './PhoneMockup';
import { scrollToTarget } from '../hooks/useLenis';

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

/* Splits text into per-word, per-character motion spans that stagger in. */
function SplitText({ text, className, delay = 0, stagger = 0.03 }) {
    const words = text.split(' ');
    let charIndex = 0;

    return (
        <span className={className} aria-label={text}>
            {words.map((word, wi) => (
                <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
                    {word.split('').map((ch, ci) => {
                        const i = charIndex++;
                        return (
                            <motion.span
                                key={ci}
                                className="char-reveal"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: delay + i * stagger,
                                    duration: 0.6,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                {ch}
                            </motion.span>
                        );
                    })}
                    {wi < words.length - 1 && <span>&nbsp;</span>}
                </span>
            ))}
        </span>
    );
}

export default function Hero() {
    const reduceMotion = useReducedMotion();
    const developmentTypes = [
        'React web apps',
        'React Native apps',
        'clean, fast UI',
        'user-centered design',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const { displayed: typedName, done: nameDone } = useTypewriter('Muhammad Sultan', 70, 600);
    const spotRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % developmentTypes.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [developmentTypes.length]);

    // Cursor spotlight — track mouse and update CSS vars on the container.
    useEffect(() => {
        if (reduceMotion) return;
        const el = spotRef.current;
        if (!el) return;
        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            el.style.setProperty('--spot-x', `${x}%`);
            el.style.setProperty('--spot-y', `${y}%`);
        };
        el.addEventListener('mousemove', onMove);
        return () => el.removeEventListener('mousemove', onMove);
    }, [reduceMotion]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    };

    const handleScrollDown = (e) => {
        e.preventDefault();
        scrollToTarget('about');
    };

    const handleView = (e) => {
        e.preventDefault();
        scrollToTarget('projects');
    };

    return (
        <section
            ref={spotRef}
            className="hero-spot-wrap section-wrapper min-h-screen flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-20 relative overflow-hidden"
        >
            {/* Cursor-spotlight grid (desktop only — masked to cursor) */}
            <div className="hero-grid" aria-hidden="true" />

            {/* Single soft ambient glow — one calm light source, not three competing blobs. */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[620px] h-[620px] rounded-full blur-[130px]"
                    style={{ background: 'rgba(var(--accent-rgb), 0.14)' }}
                    animate={{ opacity: [0.55, 0.8, 0.55] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            {/* Phone mockup (desktop) */}
            <div className="absolute right-6 lg:right-10 xl:right-24 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <PhoneMockup />
            </div>

            <motion.div
                className="section-container text-center gap-6 md:gap-8 relative z-10 xl:pr-[380px]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col items-center gap-5 md:gap-6">
                    {/* Top tag */}
                    <motion.div variants={itemVariants}>
                        <motion.div
                            className="px-5 py-2 rounded-full border border-[#2a2a3a] bg-[#1a1a24]/50 backdrop-blur-sm inline-flex items-center gap-2"
                            whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
                        >
                            <span
                                className="w-2 h-2 rounded-full animate-pulse"
                                style={{ background: 'var(--accent-3)' }}
                            />
                            <span className="text-sm font-medium text-[#c4c4cc] tracking-wide">
                                Web &amp; Mobile App Developer
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Headline — split-reveal greeting + typewriter name */}
                    <motion.div variants={itemVariants} className="max-w-4xl mx-auto space-y-4 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight px-2">
                            <SplitText text="Hi, I'm" delay={0.1} />{' '}
                            <span className="gradient-text animate-gradient relative">
                                {typedName}
                                {!nameDone && (
                                    <span
                                        className="animate-blink ml-0.5"
                                        style={{ color: 'var(--accent)' }}
                                    >|</span>
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
                                <span
                                    className="absolute -bottom-1 left-0 w-full h-[2px]"
                                    style={{ background: 'linear-gradient(to right, var(--accent), transparent)' }}
                                />
                            </span>
                            {' & '}
                            <span className="text-white font-medium relative inline-block">
                                React Native
                                <span
                                    className="absolute -bottom-1 left-0 w-full h-[2px]"
                                    style={{ background: 'linear-gradient(to right, var(--accent-2), transparent)' }}
                                />
                            </span>
                            .
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-[#9898a8] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto px-2">
                            Computer Science graduate with professional experience in building performant, user-centric applications.
                        </motion.p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto"
                    >
                        <MagneticButton
                            href="#projects"
                            onClick={handleView}
                            className="btn-primary gap-2"
                        >
                            <span>View Work</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M3 8h10M9 4l4 4-4 4" />
                            </svg>
                        </MagneticButton>
                        <MagneticButton
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="btn-secondary gap-2"
                        >
                            <span>Resume</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M4 12l8-8M4 4h8v8" />
                            </svg>
                        </MagneticButton>
                    </motion.div>

                    {/* Focus rotator — one calm line, subordinate to the name. */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 flex items-center justify-center gap-2.5 text-sm sm:text-base text-[#8a8a99]"
                    >
                        <span className="tracking-wide">Focused on</span>
                        <span className="relative inline-flex h-6 sm:h-7 min-w-[190px] sm:min-w-[230px] items-center justify-start overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -16 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute left-0 whitespace-nowrap font-semibold text-white"
                                >
                                    {developmentTypes[currentIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Clickable scroll indicator */}
            <motion.button
                type="button"
                onClick={handleScrollDown}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                aria-label="Scroll to About section"
            >
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#71717a]">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="w-5 h-8 rounded-full border-2 border-[#2a2a3a] flex items-start justify-center p-1">
                        <motion.div
                            className="w-1 h-2 rounded-full"
                            style={{ background: 'var(--accent)' }}
                            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>
            </motion.button>
        </section>
    );
}
