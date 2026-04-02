import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Only show on non-touch devices
        const isTouchDevice = 'ontouchstart' in window;
        if (isTouchDevice) return;

        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Track hoverable elements
        const addHoverListeners = () => {
            const hoverables = document.querySelectorAll('a, button, .card-glow, .card-base, .tag, .btn-primary, .btn-secondary, input, textarea');
            hoverables.forEach(el => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
            });
        };

        // Initial + observe DOM changes
        addHoverListeners();
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            observer.disconnect();
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 56 : 36,
                        height: isHovering ? 56 : 36,
                        opacity: isClicking ? 0.6 : 0.4,
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="rounded-full border border-white/40"
                    style={{
                        background: isHovering
                            ? 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)'
                            : 'transparent',
                    }}
                />
            </motion.div>

            {/* Inner dot */}
            <motion.div
                className="fixed top-0 left-0 z-[9999] pointer-events-none"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        width: isClicking ? 6 : 8,
                        height: isClicking ? 6 : 8,
                        scale: isHovering ? 0 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                    className="rounded-full bg-white"
                />
            </motion.div>
        </>
    );
}
