import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useAccent } from '../context/AccentContext';

/*
 * Floating accent-color switcher (bottom-left on desktop, mirror of BackToTop).
 * Click the palette icon → dot picker expands; choose → accent updates globally.
 */
export default function AccentSwitcher() {
    const { accent, setAccent, presets } = useAccent();
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        const onEsc = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('mousedown', onClickOutside);
        document.addEventListener('keydown', onEsc);
        return () => {
            document.removeEventListener('mousedown', onClickOutside);
            document.removeEventListener('keydown', onEsc);
        };
    }, [open]);

    return (
        <div
            ref={containerRef}
            className="fixed bottom-5 left-5 sm:bottom-8 sm:left-8 z-50 flex items-center gap-2"
        >
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, x: -10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-3 px-3 py-2 rounded-full bg-[#0b0b0f]/90 border border-[#2a2a3a] backdrop-blur-xl shadow-lg shadow-black/40"
                        role="radiogroup"
                        aria-label="Accent color"
                    >
                        {presets.map((p) => (
                            <button
                                key={p.id}
                                type="button"
                                onClick={() => {
                                    setAccent(p.id);
                                }}
                                className={`accent-swatch ${p.id === accent.id ? 'is-active' : ''}`}
                                style={{ background: p.accent, color: p.accent }}
                                aria-label={`${p.name} accent`}
                                aria-checked={p.id === accent.id}
                                role="radio"
                                title={p.name}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                type="button"
                onClick={() => setOpen((v) => !v)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-white/10 shadow-lg"
                style={{
                    background:
                        'linear-gradient(135deg, var(--accent), var(--accent-2))',
                    boxShadow: '0 10px 30px rgba(var(--accent-rgb), 0.35)',
                }}
                aria-label={open ? 'Close accent picker' : 'Open accent picker'}
                aria-expanded={open}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="13.5" cy="6.5" r=".5" fill="white" />
                    <circle cx="17.5" cy="10.5" r=".5" fill="white" />
                    <circle cx="8.5" cy="7.5" r=".5" fill="white" />
                    <circle cx="6.5" cy="12.5" r=".5" fill="white" />
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.51-4.5-9-10-9z" />
                </svg>
            </motion.button>
        </div>
    );
}
