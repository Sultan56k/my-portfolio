import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
    {
        title: 'Video Summarizer Application',
        desc: 'A performance-focused application that processes and merges video content to generate a concise summarized output.',
        tech: ['React Native', 'Video Processing', 'Performance Optimization', 'Asynchronous Logic'],
        gradient: 'from-blue-500 to-cyan-400',
        bullets: [
            'Merges multiple videos into a summarized output',
            'Optimized handling of large video files',
            'Progress-aware UI during processing'
        ],
        contribution: 'Designed and implemented the complete video processing flow with a focus on performance and user feedback.'
    },
    {
        title: 'Student Utility App',
        desc: 'A comprehensive Android helper application providing scheduling, notes management, and access to academic resources.',
        tech: ['Android', 'Java', 'Firebase'],
        gradient: 'from-purple-500 to-pink-500',
        bullets: [
            'Student-focused scheduling and task management',
            'Notes organization and academic resource access',
            'Firebase-backed data synchronization'
        ],
        contribution: 'Developed the Android application with a focus on usability, data reliability, and smooth navigation.'
    },
    {
        title: 'Step & Water Tracker App',
        desc: 'A mobile fitness tracking app focused on daily step visualization and water intake monitoring.',
        tech: ['React Native', 'Expo', 'Charts', 'Local Storage'],
        gradient: 'from-emerald-400 to-teal-500',
        bullets: [
            'Real-time step tracking with visual charts',
            'Daily water intake logging and progress tracking',
            'Clean UI with performance-aware data rendering'
        ],
        contribution: 'Designed and developed the complete mobile interface and data flow.'
    },
    {
        title: 'AI Chatbot Application',
        desc: 'An intelligent chatbot designed to provide fast, context-aware responses with a clean and responsive user interface.',
        tech: ['React / React Native', 'API Integration', 'State Management', 'UI Animations'],
        gradient: 'from-orange-500 to-red-500',
        bullets: [
            'Real-time conversational chat interface',
            'Context-aware response handling',
            'Smooth UI interactions with performance focus'
        ],
        contribution: 'Built the complete chat interface and integrated conversational logic with a focus on user experience.'
    }
];

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="projects" className="section-wrapper" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
            <div className="section-container">

                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="section-header"
                >
                    <span className="section-subtitle">Featured Work</span>
                    <h2 className="type-h2 text-[var(--color-text-primary)]">
                        Recent Projects
                    </h2>
                    <p className="section-description type-body">
                        A selection of projects that showcase my development capabilities.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {projects.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1 }}
                            className="card-base card-glow group relative overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${p.gradient}`} />

                            <div className="card-content justify-between h-full">
                                <div>
                                    <h3 className="type-h3 mb-4 group-hover:text-[var(--color-accent-indigo)] transition-colors min-h-[3.5rem] flex items-center">
                                        {p.title}
                                    </h3>
                                    <p className="type-body mb-6 text-[var(--color-text-muted)]">
                                        {p.desc}
                                    </p>

                                    {p.bullets && (
                                        <ul className="mb-6 space-y-2">
                                            {p.bullets.map((bullet, idx) => (
                                                <li key={idx} className="flex items-start type-small text-[var(--color-text-muted)]">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-indigo)] mt-1.5 mr-2 shrink-0" />
                                                    <span className="leading-relaxed">{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {p.contribution && (
                                        <div className="mb-6">
                                            <p className="type-small italic text-[var(--color-text-secondary)]">
                                                {p.contribution}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-[var(--color-border-subtle)] flex flex-wrap gap-2">
                                    {p.tech.map((t, idx) => (
                                        <span key={idx} className="type-caption px-3 py-1.5 rounded-md bg-[var(--color-bg-card-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)]">
                                            #{t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
