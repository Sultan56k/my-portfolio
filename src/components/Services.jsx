import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';

const services = [
    {
        title: 'Web Development',
        description: 'Building responsive, performant web applications with React, Next.js, and modern frontend tools.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        color: '#6366f1',
        features: ['Single Page Apps', 'Responsive Design', 'Performance Optimized', 'SEO Friendly'],
    },
    {
        title: 'Mobile Development',
        description: 'Cross-platform mobile apps with React Native and Expo that feel truly native on both platforms.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
        ),
        color: '#a855f7',
        features: ['Cross-Platform', 'Native Feel', 'Push Notifications', 'Offline Support'],
    },
    {
        title: 'UI/UX Design',
        description: 'Clean, intuitive interfaces with smooth animations and micro-interactions that delight users.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
            </svg>
        ),
        color: '#22d3ee',
        features: ['Modern Interfaces', 'Micro-Animations', 'User Research', 'Prototyping'],
    },
    {
        title: 'API Integration',
        description: 'Seamless integration with RESTful APIs, third-party services, and backend systems.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
            </svg>
        ),
        color: '#f97316',
        features: ['REST APIs', 'Real-time Data', 'Authentication', 'Error Handling'],
    },
];

function ServiceCard({ service, index, isInView }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouse = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setTilt({ x: (y - 0.5) * -8, y: (x - 0.5) * 8 });
    }, []);

    const handleLeave = useCallback(() => {
        setTilt({ x: 0, y: 0 });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.2s ease-out',
            }}
            className="card-base card-inner-glow group relative overflow-hidden"
        >
            {/* Top accent */}
            <div
                className="absolute top-0 left-0 w-full h-[2px] opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
            />

            {/* Hover glow */}
            <div
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: service.color }}
            />

            <div className="card-content relative z-10">
                {/* Icon */}
                <motion.div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110"
                    style={{
                        backgroundColor: `${service.color}10`,
                        borderColor: `${service.color}25`,
                        border: '1px solid',
                        color: service.color,
                    }}
                    whileHover={{ rotate: 5 }}
                >
                    {service.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-white transition-colors">
                    {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#aeb0be] leading-relaxed">
                    {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {service.features.map((feature, i) => (
                        <span
                            key={i}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-300"
                            style={{
                                backgroundColor: `${service.color}06`,
                                borderColor: `${service.color}15`,
                                color: '#aeb0be',
                            }}
                        >
                            {feature}
                        </span>
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
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#6366f1]/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-[100px] -z-10" />

            <div className="section-container">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="section-header"
                >
                    <span className="section-subtitle">What I Offer</span>
                    <h2 className="type-h2 text-white">Services</h2>
                    <div className="section-divider mt-2" />
                    <p className="section-description text-center mt-4">
                        Specialized in delivering end-to-end digital solutions.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <ServiceCard key={i} service={service} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
