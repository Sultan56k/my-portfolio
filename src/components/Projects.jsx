import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import AnimatedHeading from './AnimatedHeading';
import { projects, categories } from '../data/projects';

/*
 * Projects section
 * - Category filter chips (All / Mobile / Web / AI)
 * - Click card → modal with image gallery
 * - Keyboard in modal: ← / → cycles projects, Esc closes
 * - Click hero image → fullscreen lightbox
 */

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
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpen(project);
                }
            }}
            aria-label={`View ${project.title} details`}
        >
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
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

                {!imgError && (
                    <img
                        src={project.coverImage}
                        alt={project.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.4s, transform 0.5s' }}
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgError(true)}
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `${project.color}20` }}
                />

                {/* Category chip */}
                <div className="absolute top-2 right-2">
                    <span
                        className="text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white/80 border border-white/10"
                    >
                        {project.category}
                    </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <p className="text-white font-semibold text-sm leading-tight drop-shadow-sm truncate">
                        {project.title}
                    </p>
                </div>

                <div
                    className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                    style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                />
            </div>
        </motion.div>
    );
}

// ─── Lightbox (fullscreen image) ───────────────────────────────────────────────

function Lightbox({ src, alt, onClose }) {
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return (
        <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.img
                key={src}
                src={src}
                alt={alt}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-[95vw] max-h-[92vh] object-contain rounded-lg shadow-2xl"
            />
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                aria-label="Close image"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </motion.div>
    );
}

// ─── Project Modal ─────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose, onPrev, onNext, total, currentIndex }) {
    const [activeImage, setActiveImage] = useState(project.images[0]);
    const [imgErrors, setImgErrors] = useState({});
    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {
        setActiveImage(project.images[0]);
        setImgErrors({});
    }, [project]);

    useEffect(() => {
        const handler = (e) => {
            if (lightboxOpen) return;
            if (e.key === 'Escape') onClose();
            else if (e.key === 'ArrowRight') onNext();
            else if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose, onNext, onPrev, lightboxOpen]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const handleImgError = useCallback((src) => {
        setImgErrors((prev) => ({ ...prev, [src]: true }));
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            <motion.div
                className="absolute inset-0 bg-black/75 backdrop-blur-md"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Prev / Next arrows (desktop) */}
            {total > 1 && (
                <>
                    <button
                        onClick={onPrev}
                        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors"
                        aria-label="Previous project"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        onClick={onNext}
                        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors"
                        aria-label="Next project"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M9 6l6 6-6 6" />
                        </svg>
                    </button>
                </>
            )}

            <motion.div
                key={project.slug}
                className="project-modal-panel relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl z-10"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white/70 hover:text-white"
                    aria-label="Close modal"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-5 pb-3">
                    <div
                        className="relative w-full rounded-xl overflow-hidden mb-3 cursor-zoom-in group"
                        style={{ aspectRatio: '16/9' }}
                        onClick={() => !imgErrors[activeImage] && setLightboxOpen(true)}
                    >
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
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={() => handleImgError(activeImage)}
                            />
                        )}
                        {!imgErrors[activeImage] && (
                            <div className="absolute bottom-3 right-3 text-[10px] font-semibold tracking-wide uppercase px-2 py-1 rounded-md bg-black/60 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    <line x1="11" y1="8" x2="11" y2="14" />
                                    <line x1="8" y1="11" x2="14" y2="11" />
                                </svg>
                                Click to expand
                            </div>
                        )}
                    </div>

                    {project.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-1 project-modal-thumbs">
                            {project.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`project-modal-thumb flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeImage === img ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
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

                <div className="px-5 pb-6">
                    <div
                        className="h-[2px] w-12 rounded-full mb-4"
                        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                    />

                    <div className="flex items-start justify-between gap-4 mb-3">
                        <h2 className="text-xl font-bold text-white">{project.title}</h2>
                        {total > 1 && (
                            <span className="text-xs text-white/40 font-mono shrink-0 mt-1">
                                {currentIndex + 1} / {total}
                            </span>
                        )}
                    </div>

                    <p className="text-sm leading-relaxed text-[var(--color-text-muted)] mb-5">
                        {project.description}
                    </p>

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

                    <p className="text-[11px] text-white/30 mt-6 hidden md:flex items-center gap-2 justify-center">
                        <span className="kbd">←</span>
                        <span className="kbd">→</span>
                        <span>navigate</span>
                        <span className="kbd">Esc</span>
                        <span>close</span>
                    </p>
                </div>

                <AnimatePresence>
                    {lightboxOpen && !imgErrors[activeImage] && (
                        <Lightbox
                            src={activeImage}
                            alt={project.title}
                            onClose={() => setLightboxOpen(false)}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

// ─── Projects Section ──────────────────────────────────────────────────────────

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = useMemo(
        () =>
            activeCategory === 'All'
                ? projects
                : projects.filter((p) => p.category === activeCategory),
        [activeCategory]
    );

    const selectedProject = selectedIndex !== null ? filtered[selectedIndex] : null;

    const handleOpen = useCallback(
        (project) => {
            const idx = filtered.findIndex((p) => p.slug === project.slug);
            setSelectedIndex(idx >= 0 ? idx : 0);
        },
        [filtered]
    );

    const handleClose = useCallback(() => setSelectedIndex(null), []);

    const handleNext = useCallback(() => {
        setSelectedIndex((i) => (i === null ? 0 : (i + 1) % filtered.length));
    }, [filtered.length]);

    const handlePrev = useCallback(() => {
        setSelectedIndex((i) =>
            i === null ? 0 : (i - 1 + filtered.length) % filtered.length
        );
    }, [filtered.length]);

    return (
        <section id="projects" className="section-wrapper relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
            <div
                className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-[120px] -z-10"
                style={{ background: 'rgba(var(--accent-3-rgb), 0.06)' }}
            />
            <div
                className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-[100px] -z-10"
                style={{ background: 'rgba(var(--accent-2-rgb), 0.06)' }}
            />

            <div className="section-container">
                <div ref={ref}>
                    <AnimatedHeading
                        eyebrow="Featured Work"
                        title="Recent Projects"
                        description="A selection of projects that showcase my development capabilities. Click any project to view details."
                    />
                </div>

                {/* Category filter chips */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-2"
                    role="tablist"
                    aria-label="Filter projects by category"
                >
                    {categories.map((cat) => {
                        const active = cat === activeCategory;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                role="tab"
                                aria-selected={active}
                                className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-colors duration-200 ${
                                    active ? 'text-white' : 'text-[#9898a8] hover:text-white'
                                }`}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="projectFilterPill"
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            background:
                                                'linear-gradient(135deg, var(--accent), var(--accent-2))',
                                        }}
                                        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        );
                    })}
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((p, i) => (
                            <ProjectThumbnail
                                key={p.slug}
                                project={p}
                                index={i}
                                isInView={isInView}
                                onOpen={handleOpen}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <p className="text-center text-[#9898a8] text-sm">
                        No projects in this category yet.
                    </p>
                )}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        key={selectedProject.slug}
                        project={selectedProject}
                        currentIndex={selectedIndex}
                        total={filtered.length}
                        onClose={handleClose}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
