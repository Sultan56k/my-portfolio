import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { scrollToTarget } from '../hooks/useLenis';
import { useAccent } from '../context/AccentContext';

/*
 * Keyboard shortcuts overlay.
 * Triggered by `?`. Actions also fire directly when pressed anywhere
 * (unless the user is typing in an input / textarea / contenteditable).
 */

const SHORTCUTS = [
    { key: 'H', label: 'Home', target: 'top' },
    { key: 'A', label: 'About', target: 'about' },
    { key: 'S', label: 'Skills', target: 'skills' },
    { key: 'P', label: 'Projects', target: 'projects' },
    { key: 'C', label: 'Contact', target: 'contact' },
    { key: 'T', label: 'Cycle accent', target: 'theme' },
    { key: '?', label: 'Toggle this panel', target: 'help' },
    { key: 'Esc', label: 'Close overlays', target: 'esc' },
];

function isTypingContext(el) {
    if (!el) return false;
    const tag = el.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
    if (el.isContentEditable) return true;
    return false;
}

export default function ShortcutHints() {
    const [open, setOpen] = useState(false);
    const { presets, accent, setAccent } = useAccent();

    useEffect(() => {
        const cycleAccent = () => {
            const idx = presets.findIndex((p) => p.id === accent.id);
            const next = presets[(idx + 1) % presets.length];
            setAccent(next.id);
        };

        const onKey = (e) => {
            if (isTypingContext(document.activeElement)) return;
            const meta = e.ctrlKey || e.metaKey || e.altKey;
            if (meta) return;

            if (e.key === '?' || (e.shiftKey && e.key === '/')) {
                e.preventDefault();
                setOpen((v) => !v);
                return;
            }
            if (e.key === 'Escape') {
                setOpen(false);
                return;
            }

            const k = e.key.toLowerCase();
            if (k === 'h') { scrollToTarget('top'); setOpen(false); }
            else if (k === 'a') { scrollToTarget('about'); setOpen(false); }
            else if (k === 's') { scrollToTarget('skills'); setOpen(false); }
            else if (k === 'p') { scrollToTarget('projects'); setOpen(false); }
            else if (k === 'c') { scrollToTarget('contact'); setOpen(false); }
            else if (k === 't') { cycleAccent(); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [presets, accent.id, setAccent]);

    return (
        <>
            {/* Persistent small hint button (desktop only) */}
            <motion.button
                type="button"
                onClick={() => setOpen((v) => !v)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="shortcut-hint-pill hidden md:flex fixed bottom-5 right-20 sm:bottom-8 sm:right-24 z-40 items-center gap-2 px-3 py-1.5 rounded-full bg-[#0b0b0f]/80 border border-[#2a2a3a] backdrop-blur-md text-xs text-[#aeb0be] hover:text-white"
                aria-label="Show keyboard shortcuts"
            >
                <span className="kbd">?</span>
                <span>shortcuts</span>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[80] flex items-center justify-center p-4"
                    >
                        <div
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.97 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-md rounded-2xl border border-[#2a2a3a] bg-[#13131a] p-6 shadow-2xl shadow-black/50"
                            role="dialog"
                            aria-label="Keyboard shortcuts"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-lg font-bold text-white">Keyboard Shortcuts</h3>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="w-8 h-8 rounded-md text-white/60 hover:text-white hover:bg-white/10 flex items-center justify-center"
                                    aria-label="Close"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <ul className="flex flex-col gap-2">
                                {SHORTCUTS.map((s) => (
                                    <li
                                        key={s.key}
                                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/[0.03]"
                                    >
                                        <span className="text-sm text-[#d4d4dc]">{s.label}</span>
                                        <span className="kbd">{s.key}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
