import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { scrollToTarget } from '../hooks/useLenis';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggle = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', toggle);
        return () => window.removeEventListener('scroll', toggle);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => scrollToTarget('top')}
                    className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg border border-white/10 cursor-pointer"
                    style={{
                        background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                        boxShadow: '0 10px 30px rgba(var(--accent-rgb), 0.35)',
                    }}
                    aria-label="Back to top"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 16V4M10 4L4 10M10 4L16 10" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
