import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/*
 * Lightweight toast system — one queue, auto-dismiss, manual dismiss.
 * Types: 'success' | 'error' | 'info'. Default duration 3.5s.
 */

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const dismiss = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const show = useCallback(
        (message, { type = 'info', duration = 3500 } = {}) => {
            const id = ++toastId;
            setToasts((prev) => [...prev, { id, message, type }]);
            if (duration > 0) {
                setTimeout(() => dismiss(id), duration);
            }
            return id;
        },
        [dismiss]
    );

    const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastViewport toasts={toasts} onDismiss={dismiss} />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside ToastProvider');
    return ctx;
}

function ToastViewport({ toasts, onDismiss }) {
    return (
        <div
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-[min(92vw,360px)] pointer-events-none"
            role="region"
            aria-label="Notifications"
        >
            <AnimatePresence initial={false}>
                {toasts.map((t) => (
                    <motion.div
                        key={t.id}
                        layout
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className={`pointer-events-auto flex items-start gap-3 p-3 pr-2 rounded-xl border backdrop-blur-xl shadow-lg shadow-black/30 ${typeClass(t.type)}`}
                        role="status"
                    >
                        <span className="shrink-0 mt-0.5">{typeIcon(t.type)}</span>
                        <p className="text-sm text-white/95 flex-1 leading-snug">{t.message}</p>
                        <button
                            onClick={() => onDismiss(t.id)}
                            className="shrink-0 w-7 h-7 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                            aria-label="Dismiss notification"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

function typeClass(type) {
    switch (type) {
        case 'success':
            return 'bg-emerald-500/15 border-emerald-400/40';
        case 'error':
            return 'bg-rose-500/15 border-rose-400/40';
        default:
            return 'bg-[#13131a]/90 border-[var(--accent,#6366f1)]/40';
    }
}

function typeIcon(type) {
    const stroke = { strokeLinecap: 'round', strokeLinejoin: 'round' };
    if (type === 'success') {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" {...stroke}>
                <polyline points="20 6 9 17 4 12" />
            </svg>
        );
    }
    if (type === 'error') {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth="2" {...stroke}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
        );
    }
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent, #6366f1)" strokeWidth="2" {...stroke}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
    );
}
