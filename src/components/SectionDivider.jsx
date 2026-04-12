import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/*
 * Animated SVG section divider.
 * Path length draws on scroll-in, gradient colors follow the active accent.
 * Purely decorative — `aria-hidden` so assistive tech skips it.
 */
export default function SectionDivider({ variant = 'wave' }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    const d =
        variant === 'line'
            ? 'M 0 30 Q 300 30 600 30 T 1200 30'
            : 'M 0 40 C 200 0, 400 80, 600 40 S 1000 0, 1200 40';

    return (
        <div
            ref={ref}
            className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-6 lg:py-8"
            aria-hidden="true"
        >
            <svg
                viewBox="0 0 1200 60"
                preserveAspectRatio="none"
                className="section-divider-svg"
            >
                <defs>
                    <linearGradient id="divider-accent" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
                        <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path
                    d={d}
                    stroke="url(#divider-accent)"
                    strokeWidth="1.5"
                    fill="none"
                    style={{ pathLength }}
                />
            </svg>
        </div>
    );
}
