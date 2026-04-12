import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import AnimatedHeading from './AnimatedHeading';

function AnimatedCounter({ target, suffix = '', duration = 2 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    useEffect(() => {
        if (!isInView) return;
        if (typeof target !== 'number') return;
        const controls = animate(0, target, {
            duration,
            ease: 'easeOut',
            onUpdate: (v) => setCount(Math.round(v)),
        });
        return () => controls.stop();
    }, [isInView, target, duration]);

    if (typeof target !== 'number') {
        return <span ref={ref}>{target}</span>;
    }

    return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
    { value: 1, suffix: '+', label: 'Years Exp', gradient: 'from-white to-[#6366f1]' },
    { value: 10, suffix: '+', label: 'Projects', gradient: 'from-white to-[#22d3ee]' },
    { value: 'CS', suffix: '', label: 'Major', gradient: 'from-white to-[#a855f7]' },
    { value: 100, suffix: '%', label: 'Committed', gradient: 'from-white to-[#6366f1]' },
];

const tags = ['Clean Code', 'Performance', 'UI/UX Design', 'Problem Solving'];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section id="about" className="section-wrapper bg-[#0b0b0f] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#6366f1]/5 rounded-full blur-[100px] -z-10" />

            <div className="section-container">
                <div ref={ref}>
                    <AnimatedHeading
                        eyebrow="About Me"
                        title="Who I Am"
                        description="Bridging the gap between conceptual design and technical implementation."
                    />
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
                    {/* Text Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        className="space-y-6"
                    >
                        <motion.div variants={itemVariants} className="space-y-4 text-[#d4d4dc] text-base leading-relaxed">
                            <p>
                                I am a Computer Science graduate and a passionate developer specializing in the <strong className="text-white">React ecosystem</strong>. My journey started with a curiosity for how things work on the web, which quickly evolved into a career building professional applications.
                            </p>
                            <p>
                                At <strong className="text-white">Weblocks</strong>, I gained valuable industry experience working on complex projects, where I learned the importance of clean architecture, performance optimization, and team collaboration.
                            </p>
                            <p>
                                I don't just write code; I build solutions that users enjoy interacting with.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
                            {tags.map((tag, i) => (
                                <motion.span
                                    key={i}
                                    className="tag"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        className="grid grid-cols-2 gap-4 md:gap-6"
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                className="card-base card-glow card-inner-glow shine bg-[#13131a] text-center justify-center py-8 group relative"
                                whileHover={{ scale: 1.04, rotateZ: (i % 2 ? 0.6 : -0.6) }}
                            >
                                <span
                                    className="block text-4xl font-black mb-1 stat-ticker"
                                >
                                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                </span>
                                <span className="text-xs font-semibold text-[#9898a8] uppercase tracking-wider group-hover:text-[#c4c4cc] transition-colors">
                                    {stat.label}
                                </span>
                                <div
                                    className="absolute inset-x-8 -bottom-px h-[1px] opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{
                                        background:
                                            'linear-gradient(90deg, transparent, var(--accent), transparent)',
                                    }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
