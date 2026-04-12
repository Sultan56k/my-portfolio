import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/*
 * 3D phone mockup — signature hero piece for a mobile-dev portfolio.
 * Auto-cycles a set of "app screens". Real screenshots later: replace the
 * SLIDES array with image paths (e.g. { image: '/phone/1.png', title: ... }).
 */

const SLIDES = [
    {
        title: 'Step Tracker',
        subtitle: 'Daily Health',
        metric: '8,420',
        unit: 'steps',
        from: 'var(--accent)',
        to: 'var(--accent-3)',
        icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 22v-7l6-4.5L4 6V2" /><path d="M20 2v4l-6 4.5L20 15v7" />
            </svg>
        ),
    },
    {
        title: 'AI Chatbot',
        subtitle: 'Smart replies',
        metric: '1.2k',
        unit: 'msgs / day',
        from: 'var(--accent-2)',
        to: 'var(--accent)',
        icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="9" cy="11" r="1" /><circle cx="15" cy="11" r="1" />
            </svg>
        ),
    },
    {
        title: 'Attendance',
        subtitle: 'Team Check-in',
        metric: '98%',
        unit: 'this week',
        from: 'var(--accent-3)',
        to: 'var(--accent-2)',
        icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                <polyline points="8 14 11 17 16 12" />
            </svg>
        ),
    },
];

export default function PhoneMockup() {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIdx((i) => (i + 1) % SLIDES.length);
        }, 3200);
        return () => clearInterval(id);
    }, []);

    const slide = SLIDES[idx];

    return (
        <motion.div
            className="phone-wrap hidden xl:block"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="phone">
                <div className="phone-screen">
                    <div className="phone-notch" />
                    <div className="phone-reflection" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="phone-slide"
                            style={{
                                background: `linear-gradient(160deg, ${slide.from}, transparent 65%), radial-gradient(ellipse at 80% 10%, ${slide.to}44, transparent 60%), #0a0a0f`,
                            }}
                        >
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-xl"
                                style={{
                                    background: `linear-gradient(135deg, ${slide.from}, ${slide.to})`,
                                    boxShadow: `0 14px 30px -10px ${slide.from}`,
                                }}
                            >
                                {slide.icon}
                            </div>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-1">
                                {slide.subtitle}
                            </p>
                            <h4 className="text-white font-bold text-lg mb-6">
                                {slide.title}
                            </h4>
                            <div className="text-center">
                                <p className="text-white font-extrabold text-4xl leading-none stat-ticker">
                                    {slide.metric}
                                </p>
                                <p className="text-white/50 text-[11px] uppercase tracking-[0.2em] mt-1">
                                    {slide.unit}
                                </p>
                            </div>
                            <div className="absolute left-6 right-6 bottom-6 flex items-center justify-between">
                                <div className="flex gap-1.5">
                                    {SLIDES.map((_, i) => (
                                        <span
                                            key={i}
                                            className="h-1 rounded-full transition-all duration-500"
                                            style={{
                                                width: i === idx ? 18 : 6,
                                                background:
                                                    i === idx
                                                        ? 'rgba(255,255,255,0.95)'
                                                        : 'rgba(255,255,255,0.25)',
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-white/60">
                                    <span>Live</span>
                                    <span
                                        className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
