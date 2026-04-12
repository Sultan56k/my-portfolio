import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

/*
 * Magnetic hover button: tracks mouse within the element and pulls
 * the button slightly towards the cursor. Used across hero CTAs,
 * contact buttons, footer banner, etc.
 *
 * Accepts either an anchor (`href`) or renders a <button> if no href.
 */
export default function MagneticButton({
    children,
    className = '',
    href,
    as,
    strength = 0.18,
    ...props
}) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouse = useCallback(
        (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * strength;
            const y = (e.clientY - rect.top - rect.height / 2) * strength;
            setOffset({ x, y });
        },
        [strength]
    );

    const handleLeave = useCallback(() => {
        setOffset({ x: 0, y: 0 });
    }, []);

    const Component = as ?? (href ? motion.a : motion.button);

    return (
        <Component
            href={href}
            className={className}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            animate={{ x: offset.x, y: offset.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            {...props}
        >
            {children}
        </Component>
    );
}
