import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/*
 * Global smooth-scroll hook.
 * - Respects prefers-reduced-motion (skips Lenis if user prefers less motion).
 * - Exposes the Lenis instance via `window.__lenis` so `scrollTo` works
 *   from components (e.g. Navbar, BackToTop, ShortcutHints) without
 *   drilling a ref through the tree.
 */
export default function useLenis() {
    const lenisRef = useRef(null);

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const lenis = new Lenis({
            duration: 0.9,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 1.1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;
        window.__lenis = lenis;

        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            if (window.__lenis === lenis) delete window.__lenis;
            lenisRef.current = null;
        };
    }, []);

    return lenisRef;
}

/* Smooth-scroll helper that prefers Lenis when available, falls back to native. */
export function scrollToTarget(target, offset = -80) {
    const lenis = typeof window !== 'undefined' ? window.__lenis : null;
    if (target === 'top' || target === 0) {
        if (lenis) lenis.scrollTo(0, { offset: 0 });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const el = typeof target === 'string' ? document.getElementById(target) : target;
    if (!el) return;
    if (lenis) {
        lenis.scrollTo(el, { offset });
    } else {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}
