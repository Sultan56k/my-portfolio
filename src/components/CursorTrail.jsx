import { useEffect, useRef } from 'react';

/*
 * Glowing cursor trail — a chain of dots that lag behind the real cursor.
 * Desktop only. Uses direct DOM writes inside a rAF loop to avoid the
 * per-frame React reconciliation cost.
 */

const TRAIL_LENGTH = 14;

export default function CursorTrail() {
    const dotsRef = useRef([]);
    const targetRef = useRef({ x: -100, y: -100 });

    useEffect(() => {
        const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isTouch || prefersReduced) return;

        const onMove = (e) => {
            targetRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', onMove, { passive: true });

        // Seed each dot at the current target.
        const positions = Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }));

        let rafId;
        const loop = () => {
            let prev = targetRef.current;
            for (let i = 0; i < TRAIL_LENGTH; i++) {
                const dot = dotsRef.current[i];
                if (!dot) continue;
                const pos = positions[i];
                pos.x += (prev.x - pos.x) * (0.28 - i * 0.012);
                pos.y += (prev.y - pos.y) * (0.28 - i * 0.012);
                dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
                prev = pos;
            }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <>
            {Array.from({ length: TRAIL_LENGTH }).map((_, i) => {
                const progress = i / TRAIL_LENGTH;
                const size = Math.max(4, 14 - i);
                const opacity = Math.max(0.05, 0.7 - progress * 0.65);
                return (
                    <div
                        key={i}
                        ref={(el) => (dotsRef.current[i] = el)}
                        className="cursor-dot"
                        style={{
                            width: size,
                            height: size,
                            opacity,
                            background: i < TRAIL_LENGTH / 2
                                ? 'radial-gradient(closest-side, var(--accent), transparent)'
                                : 'radial-gradient(closest-side, var(--accent-2), transparent)',
                            filter: i < 3 ? 'blur(0px)' : `blur(${i * 0.4}px)`,
                        }}
                    />
                );
            })}
        </>
    );
}
