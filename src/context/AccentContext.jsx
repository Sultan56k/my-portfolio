import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

/*
 * Runtime accent-color switcher.
 * Updates CSS custom properties on :root so every component that references
 * `var(--accent)` / `var(--accent-2)` / `var(--accent-glow)` re-themes instantly.
 * User choice persists in localStorage.
 */

export const ACCENT_PRESETS = [
    {
        id: 'red',
        name: 'Red',
        accent: '#ef4444',
        accent2: '#f43f5e',
        accent3: '#f97316',
    },
    {
        id: 'indigo',
        name: 'Indigo',
        accent: '#6366f1',
        accent2: '#a855f7',
        accent3: '#22d3ee',
    },
    {
        id: 'cyan',
        name: 'Cyan',
        accent: '#22d3ee',
        accent2: '#06b6d4',
        accent3: '#6366f1',
    },
    {
        id: 'purple',
        name: 'Purple',
        accent: '#a855f7',
        accent2: '#ec4899',
        accent3: '#6366f1',
    },
    {
        id: 'emerald',
        name: 'Emerald',
        accent: '#10b981',
        accent2: '#14b8a6',
        accent3: '#22d3ee',
    },
    {
        id: 'rose',
        name: 'Rose',
        accent: '#f43f5e',
        accent2: '#ec4899',
        accent3: '#a855f7',
    },
];

const STORAGE_KEY = 'portfolio-accent';

function hexToRgb(hex) {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}

function applyPreset(preset) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.style.setProperty('--accent', preset.accent);
    root.style.setProperty('--accent-2', preset.accent2);
    root.style.setProperty('--accent-3', preset.accent3);
    root.style.setProperty('--accent-rgb', hexToRgb(preset.accent));
    root.style.setProperty('--accent-2-rgb', hexToRgb(preset.accent2));
    root.style.setProperty('--accent-3-rgb', hexToRgb(preset.accent3));
    root.style.setProperty('--accent-glow', `${preset.accent}40`);
}

const AccentContext = createContext(null);

export function AccentProvider({ children }) {
    const [accentId, setAccentId] = useState(() => {
        if (typeof window === 'undefined') return 'red';
        return localStorage.getItem(STORAGE_KEY) || 'red';
    });

    const preset = useMemo(
        () => ACCENT_PRESETS.find((p) => p.id === accentId) ?? ACCENT_PRESETS[0],
        [accentId]
    );

    useEffect(() => {
        applyPreset(preset);
        try {
            localStorage.setItem(STORAGE_KEY, preset.id);
        } catch {
            // Ignore storage errors (private-mode, quota).
        }
    }, [preset]);

    const setAccent = useCallback((id) => {
        setAccentId(id);
    }, []);

    const value = useMemo(
        () => ({ accent: preset, setAccent, presets: ACCENT_PRESETS }),
        [preset, setAccent]
    );

    return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>;
}

export function useAccent() {
    const ctx = useContext(AccentContext);
    if (!ctx) throw new Error('useAccent must be used inside AccentProvider');
    return ctx;
}
