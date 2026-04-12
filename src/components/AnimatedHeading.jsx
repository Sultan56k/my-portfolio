import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/*
 * Cinematic section heading.
 * - Eyebrow kicker with animated dot + growing line
 * - Big title split into words; each word rises from a mask
 * - Optional gradient underline, optional description
 *
 * Responsive: all sizing comes from `.mega-heading` (clamp-based)
 * and `.section-header` (flex column, centered). Text wraps naturally.
 */
export default function AnimatedHeading({
    eyebrow,
    title,
    description,
    underline = true,
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    const words = title.split(' ');

    return (
        <div ref={ref} className="section-header">
            {eyebrow && (
                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 sm:gap-3 flex-wrap justify-center"
                >
                    <span
                        className="inline-block w-5 sm:w-6 h-[2px] rounded-full"
                        style={{ background: 'linear-gradient(90deg, transparent, var(--accent))' }}
                    />
                    <span className="section-subtitle !mb-0">{eyebrow}</span>
                    <motion.span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ background: 'var(--accent)' }}
                        animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>
            )}

            <h2 className={`mega-heading text-white ${underline ? 'heading-underline' : ''}`}>
                {words.map((w, wi) => (
                    <span key={wi} className="mega-word">
                        <motion.span
                            initial={{ y: '105%', opacity: 0 }}
                            animate={inView ? { y: 0, opacity: 1 } : {}}
                            transition={{
                                delay: 0.2 + wi * 0.08,
                                duration: 0.75,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="inline-block"
                        >
                            {w}
                            {wi < words.length - 1 && <span>&nbsp;</span>}
                        </motion.span>
                    </span>
                ))}
            </h2>

            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.45, duration: 0.6 }}
                    className="section-description mt-1 px-4"
                >
                    {description}
                </motion.p>
            )}
        </div>
    );
}
