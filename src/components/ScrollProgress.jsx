import { motion, useScroll, useSpring } from 'framer-motion';

/*
 * Framer Motion's useScroll reads window scroll directly — which Lenis
 * updates in lockstep via native scroll events — so no manual wiring
 * is required. The spring just smooths any micro-jitter.
 */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))',
            }}
        />
    );
}
