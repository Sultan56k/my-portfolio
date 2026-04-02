import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsVisible(false);
                        onComplete?.();
                    }, 400);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 80);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[100] bg-[#0b0b0f] flex flex-col items-center justify-center gap-8"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#22d3ee] rounded-2xl blur-xl opacity-50 animate-pulse" />
                        <div className="relative w-20 h-20 bg-[#13131a] border border-[#2a2a3a] rounded-2xl flex items-center justify-center">
                            <span className="text-3xl font-bold gradient-text">MS</span>
                        </div>
                    </motion.div>

                    <div className="w-48 h-[2px] bg-[#2a2a3a] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#22d3ee] rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xs text-[#9898a8] tracking-[0.3em] uppercase"
                    >
                        Loading
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
