import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import AnimatedHeading from './AnimatedHeading';
import { testimonials } from '../data/testimonials';

/*
 * Testimonials carousel.
 * - Auto-advances every 5s; pauses on hover / focus / drag.
 * - Drag-to-swipe via framer-motion drag (threshold 80px).
 * - Prev / Next arrows + pagination dots (all functional).
 * - Keyboard: when carousel has focus, ← / → navigate.
 */

const AUTO_DELAY = 5000;
const SWIPE_THRESHOLD = 80;

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [paused, setPaused] = useState(false);

    const count = testimonials.length;

    const go = useCallback(
        (nextIdx) => {
            setDirection(nextIdx > index ? 1 : -1);
            setIndex(((nextIdx % count) + count) % count);
        },
        [index, count]
    );

    const next = useCallback(() => go(index + 1), [go, index]);
    const prev = useCallback(() => go(index - 1), [go, index]);

    useEffect(() => {
        if (paused || count < 2) return;
        const id = setInterval(() => {
            setDirection(1);
            setIndex((i) => (i + 1) % count);
        }, AUTO_DELAY);
        return () => clearInterval(id);
    }, [paused, count]);

    const onKeyDown = (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            next();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prev();
        }
    };

    const current = testimonials[index];

    const variants = {
        enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
        center: { opacity: 1, x: 0 },
        exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
    };

    return (
        <section className="section-wrapper relative overflow-hidden">
            <div
                className="absolute top-1/3 left-0 w-80 h-80 rounded-full blur-[100px] -z-10"
                style={{ background: 'rgba(var(--accent-rgb), 0.06)' }}
            />
            <div
                className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full blur-[100px] -z-10"
                style={{ background: 'rgba(var(--accent-2-rgb), 0.06)' }}
            />

            <div className="section-container">
                <div ref={ref}>
                    <AnimatedHeading
                        eyebrow="Testimonials"
                        title="What People Say"
                        description="Feedback from the teammates and clients I've worked with."
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl mx-auto w-full"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                    onKeyDown={onKeyDown}
                    tabIndex={0}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Testimonials"
                >
                    <div className="relative">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={index}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragStart={() => setPaused(true)}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x < -SWIPE_THRESHOLD) next();
                                    else if (info.offset.x > SWIPE_THRESHOLD) prev();
                                }}
                                className="testimonial-card cursor-grab active:cursor-grabbing select-none"
                                style={{
                                    '--accent-rgb-override': current.accent,
                                }}
                            >
                                <span className="testimonial-quote-mark">&ldquo;</span>
                                <p className="relative text-base md:text-lg leading-relaxed text-[#e2e2e8] italic">
                                    {current.quote}
                                </p>
                                <div className="relative mt-6 flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                                        style={{
                                            background: `linear-gradient(135deg, ${current.accent}, ${current.accent}aa)`,
                                        }}
                                    >
                                        {current.author
                                            .split(' ')
                                            .map((n) => n[0])
                                            .slice(0, 2)
                                            .join('')}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white leading-tight">
                                            {current.author}
                                        </p>
                                        <p className="text-xs text-[#9898a8] mt-0.5">
                                            {current.role} · {current.company}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Prev / Next — desktop only; mobile uses swipe + dots */}
                        {count > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={prev}
                                    className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white items-center justify-center backdrop-blur-sm"
                                    aria-label="Previous testimonial"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={next}
                                    className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white items-center justify-center backdrop-blur-sm"
                                    aria-label="Next testimonial"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M9 6l6 6-6 6" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Pagination dots */}
                    {count > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-6" role="tablist">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => go(i)}
                                    role="tab"
                                    aria-selected={i === index}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                    className="h-2 rounded-full transition-all duration-300"
                                    style={{
                                        width: i === index ? 24 : 8,
                                        background:
                                            i === index
                                                ? 'linear-gradient(90deg, var(--accent), var(--accent-2))'
                                                : 'rgba(255,255,255,0.15)',
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
