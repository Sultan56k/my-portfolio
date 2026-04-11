import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

/*
 * IMAGE SETUP — themed stock images are loaded from Unsplash CDN.
 * To use your own screenshots, replace each `coverImage` / `images` entry
 * with a local path like `/projects/<slug>/cover.jpg` and place the file
 * in `public/projects/<slug>/`. If an image fails to load, the card
 * automatically shows the project's gradient + camera icon fallback.
 */

// Unsplash CDN helpers — same photo served at card (4:3) and modal (16:9) ratios.
const unsplash = (id, w = 800, h = 600) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
const card = (id) => unsplash(id, 800, 600);   // 4:3 thumbnail
const wide = (id) => unsplash(id, 1200, 675);  // 16:9 modal hero

const projects = [
    {
        title: 'Video Summarizer',
        slug: 'video-summarizer',
        coverImage: card('1574717024653-61fd2cf4d44d'),
        images: [wide('1574717024653-61fd2cf4d44d')],
        description:
            'A performance-focused application that processes and merges multiple video files to generate a concise summarized output. Built with React Native, it handles large video assets asynchronously with a progress-aware UI that keeps users informed throughout processing. The app prioritizes smooth playback and efficient memory usage.',
        tech: ['React Native', 'Video Processing', 'Async Logic', 'Performance Optimization'],
        gradient: 'from-blue-500 to-cyan-400',
        color: '#3b82f6',
    },
    {
        title: 'Student Utility App',
        slug: 'student-utility',
        coverImage: card('1481627834876-b7833e8f5570'),
        images: [wide('1481627834876-b7833e8f5570')],
        description:
            'A comprehensive Android helper application providing scheduling, notes management, and access to academic resources. Backed by Firebase for real-time data synchronization, it offers students a reliable hub for organizing their academic life — from managing timetables to storing lecture notes and sharing resources.',
        tech: ['Android', 'Java', 'Firebase', 'Material Design'],
        gradient: 'from-purple-500 to-pink-500',
        color: '#a855f7',
    },
    {
        title: 'Step & Water Tracker',
        slug: 'step-water-tracker',
        coverImage: card('1571019613454-1cb2f99b2d8b'),
        images: [wide('1571019613454-1cb2f99b2d8b')],
        description:
            'A mobile fitness tracking app focused on daily step visualization and water intake monitoring. Built with React Native and Expo, it features interactive charts, daily goal tracking, and persistent local storage. The clean, minimal UI makes logging habits effortless while keeping performance smooth on all devices.',
        tech: ['React Native', 'Expo', 'Charts', 'Local Storage'],
        gradient: 'from-emerald-400 to-teal-500',
        color: '#10b981',
    },
    {
        title: 'AI Chatbot',
        slug: 'ai-chatbot',
        coverImage: card('1620712943543-bcc4688e7485'),
        images: [wide('1620712943543-bcc4688e7485')],
        description:
            'An intelligent chatbot designed to provide fast, context-aware responses with a clean and responsive user interface. Integrates with an AI API for real-time conversational logic, featuring smooth UI animations and efficient state management. Designed for both mobile and web with a consistent cross-platform experience.',
        tech: ['React Native', 'API Integration', 'State Management', 'UI Animations'],
        gradient: 'from-orange-500 to-red-500',
        color: '#f97316',
    },
    {
        title: 'Attendance Tracker',
        slug: 'attendance-tracker',
        coverImage: card('1506784983877-45594efa4cbe'),
        images: [wide('1506784983877-45594efa4cbe')],
        description:
            'A streamlined attendance management app designed to replace manual roll-call workflows for classrooms and teams. Features one-tap check-in, date-based filtering, and detailed reports with CSV export for administrators. Built with React Native and Firebase, it offers real-time synchronization across devices and a clean, role-aware dashboard that minimizes friction for both students and supervisors.',
        tech: ['React Native', 'Firebase', 'Real-time Sync', 'CSV Export'],
        gradient: 'from-yellow-400 to-orange-500',
        color: '#f59e0b',
    },
    {
        title: 'Family Album',
        slug: 'family-album',
        coverImage: card('1511895426328-dc8714191300'),
        images: [wide('1511895426328-dc8714191300')],
        description:
            'A private, cloud-backed photo album built to help families preserve and share memories in one secure space. Supports multi-album organization, shared access with trusted members, high-resolution uploads, and offline viewing via local caching. Developed with React Native and Firebase Storage, the app prioritizes smooth gallery navigation, efficient thumbnail loading, and a warm, photo-first UI.',
        tech: ['React Native', 'Firebase Storage', 'Image Caching', 'Cloud Sync'],
        gradient: 'from-pink-500 to-rose-500',
        color: '#ec4899',
    },
    {
        title: 'Neuro Nation',
        slug: 'neuro-nation',
        coverImage: card('1559757148-5c350d0d3c56'),
        images: [wide('1559757148-5c350d0d3c56')],
        description:
            'A cognitive training app offering a curated set of brain games across memory, logic, and focus categories. Features daily challenges, streak-based progress tracking, and adaptive difficulty that scales with the user\'s performance. Built with React Native, it leverages fluid animations and local persistence to deliver a polished, distraction-free training experience that keeps users coming back.',
        tech: ['React Native', 'Animations', 'Local Storage', 'Gamification'],
        gradient: 'from-indigo-500 to-purple-600',
        color: '#6366f1',
    },
    {
        title: 'Child Learning',
        slug: 'child-learning',
        coverImage: card('1503676260728-1c00da094a0b'),
        images: [wide('1503676260728-1c00da094a0b')],
        description:
            'An interactive learning app for young children covering alphabets, numbers, shapes, and phonetic exercises. Uses engaging animations, voice prompts, and reward-based progression to keep kids motivated while they learn. Developed with React Native, it emphasizes a safe, ad-free environment and a colorful, tap-friendly interface designed specifically for small hands and short attention spans.',
        tech: ['React Native', 'Audio & Visuals', 'Gamification', 'Kid-Friendly UI'],
        gradient: 'from-teal-400 to-cyan-500',
        color: '#14b8a6',
    },
];

// ─── Thumbnail Card ────────────────────────────────────────────────────────────

function ProjectThumbnail({ project, index, isInView, onOpen }) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: {
                delay: index * 0.08,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="project-thumbnail group cursor-pointer"
            onClick={() => onOpen(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
            aria-label={`View ${project.title} details`}
        >
            {/* Aspect-ratio container */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
                {/* Gradient placeholder (always visible as background) */}
                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${project.gradient}`}
                    style={{ opacity: imgLoaded && !imgError ? 0 : 1, transition: 'opacity 0.4s' }}
                >
                    <svg
                        className="w-10 h-10 text-white/40 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-6 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
                    </svg>
                    <span className="text-white/30 text-xs">No image yet</span>
                </div>

                {/* Actual cover image */}
                {!imgError && (
                    <img
                        src={project.coverImage}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.4s, transform 0.5s' }}
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgError(true)}
                    />
                )}

                {/* Bottom title scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Hover overlay */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `${project.color}20` }}
                />

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <p className="text-white font-semibold text-sm leading-tight drop-shadow-sm truncate">
                        {project.title}
                    </p>
                </div>

                {/* Colored top border line */}
                <div
                    className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                    style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                />
            </div>
        </motion.div>
    );
}

// ─── Project Modal ─────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }) {
    const [activeImage, setActiveImage] = useState(project.images[0]);
    const [imgErrors, setImgErrors] = useState({});

    // Close on Escape key
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    // Prevent body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const handleImgError = useCallback((src) => {
        setImgErrors((prev) => ({ ...prev, [src]: true }));
    }, []);

    const validImages = project.images.filter((img) => !imgErrors[img]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/75 backdrop-blur-md"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Modal panel */}
            <motion.div
                className="project-modal-panel relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl z-10"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white/70 hover:text-white"
                    aria-label="Close modal"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* ── Image Gallery ── */}
                <div className="p-5 pb-3">
                    {/* Main image */}
                    <div
                        className="relative w-full rounded-xl overflow-hidden mb-3"
                        style={{ aspectRatio: '16/9' }}
                    >
                        {/* Gradient fallback */}
                        <div
                            className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${project.gradient}`}
                            style={{ opacity: imgErrors[activeImage] ? 1 : 0, transition: 'opacity 0.3s' }}
                        >
                            <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            </svg>
                        </div>
                        {!imgErrors[activeImage] && (
                            <img
                                key={activeImage}
                                src={activeImage}
                                alt={`${project.title} screenshot`}
                                className="w-full h-full object-cover"
                                onError={() => handleImgError(activeImage)}
                            />
                        )}
                    </div>

                    {/* Thumbnail strip */}
                    {project.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-1 project-modal-thumbs">
                            {project.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`project-modal-thumb flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeImage === img ? 'border-current opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
                                    style={{ borderColor: activeImage === img ? project.color : 'transparent' }}
                                    aria-label={`View image ${idx + 1}`}
                                >
                                    <div
                                        className={`w-full h-full bg-gradient-to-br ${project.gradient}`}
                                        style={{ opacity: imgErrors[img] ? 1 : 0, position: 'absolute' }}
                                    />
                                    {!imgErrors[img] && (
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={() => handleImgError(img)}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Project Details ── */}
                <div className="px-5 pb-6">
                    {/* Accent line */}
                    <div
                        className="h-[2px] w-12 rounded-full mb-4"
                        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                    />

                    <h2 className="text-xl font-bold text-white mb-3">{project.title}</h2>

                    <p className="text-sm leading-relaxed text-[var(--color-text-muted)] mb-5">
                        {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, idx) => (
                            <span
                                key={idx}
                                className="text-xs px-3 py-1.5 rounded-lg border"
                                style={{
                                    backgroundColor: `${project.color}10`,
                                    borderColor: `${project.color}25`,
                                    color: 'var(--color-text-secondary)',
                                }}
                            >
                                #{t}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Projects Section ──────────────────────────────────────────────────────────

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const [selectedProject, setSelectedProject] = useState(null);

    const handleOpen = useCallback((project) => {
        setSelectedProject(project);
    }, []);

    const handleClose = useCallback(() => {
        setSelectedProject(null);
    }, []);

    return (
        <section id="projects" className="section-wrapper relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#22d3ee]/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#a855f7]/5 rounded-full blur-[100px] -z-10" />

            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="section-header"
                >
                    <span className="section-subtitle">Featured Work</span>
                    <h2 className="type-h2 text-[var(--color-text-primary)]">Recent Projects</h2>
                    <div className="section-divider mt-2" />
                    <p className="section-description type-body mt-4">
                        A selection of projects that showcase my development capabilities. Click any project to view details.
                    </p>
                </motion.div>

                {/* 4-column grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {projects.map((p, i) => (
                        <ProjectThumbnail
                            key={p.slug}
                            project={p}
                            index={i}
                            isInView={isInView}
                            onOpen={handleOpen}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        key={selectedProject.slug}
                        project={selectedProject}
                        onClose={handleClose}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
