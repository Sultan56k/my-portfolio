import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import AnimatedHeading from './AnimatedHeading';
import { services } from '../data/services';

const SERVICE_ICONS = {
    web: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    ),
    mobile: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
    ),
    design: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
        </svg>
    ),
    api: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
        </svg>
    ),
};

function ServiceCard({ service, index, isInView }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [mouse, setMouse] = useState({ x: 50, y: 50 });
    const cardRef = useRef(null);

    const handleMouse = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xp = (e.clientX - rect.left) / rect.width;
        const yp = (e.clientY - rect.top) / rect.height;
        setTilt({ x: (yp - 0.5) * -10, y: (xp - 0.5) * 10 });
        setMouse({ x: xp * 100, y: yp * 100 });
    }, []);

    const handleLeave = useCallback(() => {
        setTilt({ x: 0, y: 0 });
    }, []);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.25s ease-out',
                '--mx': `${mouse.x}%`,
                '--my': `${mouse.y}%`,
            }}
            className="card-base card-inner-glow shine group relative overflow-hidden"
        >
            {/* Gradient border (conditional opacity on hover) */}
            <div
                className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    padding: '1px',
                    background: `radial-gradient(400px circle at var(--mx) var(--my), ${service.color}99, transparent 60%)`,
                    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    maskComposite: 'exclude',
                }}
            />

            {/* Top accent bar */}
            <div
                className="absolute top-0 left-0 w-full h-[2px] opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
            />

            {/* Hover glow blob that follows cursor */}
            <div
                className="absolute rounded-full blur-[80px] opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                style={{
                    width: 260,
                    height: 260,
                    left: 'calc(var(--mx) - 130px)',
                    top: 'calc(var(--my) - 130px)',
                    backgroundColor: service.color,
                }}
            />

            <div className="card-content relative z-10">
                {/* Icon with orbit ring */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-2">
                    <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-dashed"
                        style={{ borderColor: `${service.color}40` }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                        className="absolute inset-2 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        style={{
                            backgroundColor: `${service.color}15`,
                            border: '1px solid',
                            borderColor: `${service.color}35`,
                            color: service.color,
                        }}
                        whileHover={{ rotate: 8 }}
                    >
                        {SERVICE_ICONS[service.iconKey] ?? null}
                    </motion.div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-white transition-colors">
                    {service.title}
                </h3>

                <p className="text-sm text-[#aeb0be] leading-relaxed">
                    {service.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {service.features.map((feature, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 6 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-300"
                            style={{
                                backgroundColor: `${service.color}06`,
                                borderColor: `${service.color}25`,
                                color: '#aeb0be',
                            }}
                            whileHover={{
                                backgroundColor: `${service.color}18`,
                                color: '#fff',
                                y: -2,
                            }}
                        >
                            {feature}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function Services() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="services" className="section-wrapper relative overflow-hidden">
            <div
                className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-[100px] -z-10"
                style={{ background: 'rgba(var(--accent-rgb), 0.06)' }}
            />
            <div
                className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[100px] -z-10"
                style={{ background: 'rgba(var(--accent-2-rgb), 0.06)' }}
            />

            <div className="section-container">
                <div ref={ref}>
                    <AnimatedHeading
                        eyebrow="What I Offer"
                        title="Services"
                        description="Specialized in delivering end-to-end digital solutions."
                    />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <ServiceCard key={service.title} service={service} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
