import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import AnimatedHeading from './AnimatedHeading';
import { projects, categories } from '../data/projects';

// ─── Category badge color map ──────────────────────────────────────────────────
const CATEGORY_COLORS = {
    Mobile: { bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.35)', text: '#a5b4fc' },
    Web:    { bg: 'rgba(34,211,238,0.12)', border: 'rgba(34,211,238,0.30)', text: '#67e8f9' },
    AI:     { bg: 'rgba(168,85,247,0.13)', border: 'rgba(168,85,247,0.30)', text: '#d8b4fe' },
    All:    { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', text: '#e2e2e8' },
};

// ─── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index, isInView, onOpen }) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);
    const catColor = CATEGORY_COLORS[project.category] || CATEGORY_COLORS.All;

    const cardVariants = {
        hidden: { opacity: 0, y: 36, scale: 0.96 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { delay: index * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <motion.article
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="project-card-v2 group cursor-pointer flex flex-col h-full"
            onClick={() => onOpen(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(project); }
            }}
            aria-label={`View ${project.title} details`}
        >
            {/* ── Image zone ── */}
            <div className="relative w-full overflow-hidden rounded-t-2xl" style={{ aspectRatio: '16/10' }}>
                {/* Gradient fallback */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-opacity duration-500`}
                    style={{ opacity: imgLoaded && !imgError ? 0 : 1 }}
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center"
                            style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(8px)' }}
                        >
                            <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                            </svg>
                        </div>
                        <span className="text-white/40 text-xs font-medium tracking-wide">Preview unavailable</span>
                    </div>
                </div>

                {/* Real image */}
                {!imgError && (
                    <img
                        src={project.coverImage}
                        alt={project.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                        style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.45s, transform 0.7s' }}
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgError(true)}
                    />
                )}

                {/* Bottom scrim for text legibility */}
                <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(13,13,20,0.9) 0%, transparent 100%)' }} />

                {/* Hover color wash */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: `${project.color}18` }}
                />

                {/* Top accent line */}
                <div
                    className="absolute top-0 left-0 h-[2.5px] w-0 group-hover:w-full transition-all duration-500 ease-out z-10 rounded-tr-full"
                    style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}44)` }}
                />

                {/* Category badge */}
                <div className="absolute top-3 left-3 z-10">
                    <span
                        className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg"
                        style={{ background: catColor.bg, border: `1px solid ${catColor.border}`, color: catColor.text }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: catColor.text, boxShadow: `0 0 6px ${catColor.text}` }}
                        />
                        {project.category}
                    </span>
                </div>

                {/* View arrow on hover */}
                <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                        style={{ background: project.color, boxShadow: `0 4px 16px ${project.color}60` }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* ── Content zone ── */}
            <div
                className="flex flex-col flex-1 px-5 py-4 rounded-b-2xl border-x border-b border-white/[0.06] group-hover:border-white/[0.12] transition-colors duration-300"
                style={{ background: 'linear-gradient(to bottom, rgba(16,16,24,0.95), rgba(13,13,20,0.98))' }}
            >
                {/* Title */}
                <h3
                    className="text-sm sm:text-[15px] font-semibold text-white leading-snug line-clamp-2 mb-2.5"
                    title={project.title}
                >
                    {project.title}
                </h3>

                {/* Description snippet */}
                <p className="text-xs leading-relaxed text-white/45 line-clamp-2 mb-3.5 flex-1">
                    {project.description}
                </p>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech.slice(0, 3).map((t, i) => (
                        <span
                            key={i}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md border whitespace-nowrap"
                            style={{
                                background: `${project.color}0d`,
                                borderColor: `${project.color}22`,
                                color: 'rgba(200,200,220,0.7)',
                            }}
                        >
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md border border-white/10 text-white/30 whitespace-nowrap">
                            +{project.tech.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

// ─── Lightbox ──────────────────────────────────────────────────────────────────
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
                className="relative max-w-[95vw] max-h-[92vh] object-contain rounded-xl shadow-2xl"
            />
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
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
    const catColor = CATEGORY_COLORS[project.category] || CATEGORY_COLORS.All;

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
        // Lock scroll — stop Lenis (overrides body overflow) and native scroll
        const lenis = window.__lenis;
        if (lenis) lenis.stop();
        document.body.style.overflow = 'hidden';
        document.body.classList.add('project-modal-open');
        return () => {
            if (lenis) lenis.start();
            document.body.style.overflow = '';
            document.body.classList.remove('project-modal-open');
        };
    }, []);

    const handleImgError = useCallback((src) => {
        setImgErrors((prev) => ({ ...prev, [src]: true }));
    }, []);

    const imgIndex = project.images.indexOf(activeImage);
    const goPrevImg = useCallback(() => {
        const i = (imgIndex - 1 + project.images.length) % project.images.length;
        setActiveImage(project.images[i]);
    }, [imgIndex, project.images]);
    const goNextImg = useCallback(() => {
        const i = (imgIndex + 1) % project.images.length;
        setActiveImage(project.images[i]);
    }, [imgIndex, project.images]);

    return createPortal(
        <motion.div
            className="fixed inset-0 z-[9999] flex md:items-center md:justify-center md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Desktop side arrows */}
            {total > 1 && (
                <>
                    <button
                        onClick={onPrev}
                        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors border border-white/10"
                        aria-label="Previous project"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        onClick={onNext}
                        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors border border-white/10"
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
                className="project-modal-panel relative w-full md:max-w-4xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto md:rounded-2xl z-10"
                initial={{ opacity: 0, y: 48, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Sticky header */}
                <div
                    className="sticky top-0 z-30 flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b border-white/[0.07]"
                    style={{ background: 'rgba(12,12,18,0.97)', backdropFilter: 'blur(24px)' }}
                >
                    <div className="flex items-center gap-3 min-w-0">
                        {total > 1 && (
                            <span className="text-xs font-mono tracking-wider text-white/40 shrink-0">
                                <span style={{ color: project.color }}>{currentIndex + 1}</span>
                                <span className="mx-1 text-white/20">/</span>
                                {total}
                            </span>
                        )}
                        <span
                            className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg shrink-0"
                            style={{ background: catColor.bg, border: `1px solid ${catColor.border}`, color: catColor.text }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: catColor.text }} />
                            {project.category}
                        </span>
                        <span className="text-white/40 text-xs truncate hidden sm:block">{project.title}</span>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-red-500/15 hover:border-red-500/40 text-white/50 hover:text-red-300 transition-all duration-200"
                        aria-label="Close"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4" strokeLinecap="round">
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Two-column layout */}
                <div className="flex flex-col md:flex-row md:gap-0">
                    {/* LEFT: image viewer */}
                    <div
                        className="md:w-[52%] md:sticky md:top-[53px] md:self-start md:max-h-[calc(90vh-53px)] md:overflow-y-auto"
                        style={{ background: 'rgba(8,8,14,1)' }}
                    >
                        {/* Image viewer — nav buttons are inside so they inherit the same stacking context */}
                        <div className="relative w-full" style={{ background: `${project.color}08` }}>
                            {/* The swipeable image */}
                            <motion.div
                                className="w-full select-none cursor-zoom-in"
                                onClick={() => !imgErrors[activeImage] && setLightboxOpen(true)}
                                drag={project.images.length > 1 ? 'x' : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.15}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x < -50) goNextImg();
                                    else if (info.offset.x > 50) goPrevImg();
                                }}
                            >
                                {!imgErrors[activeImage] ? (
                                    <img
                                        key={activeImage}
                                        src={activeImage}
                                        alt={`${project.title} screenshot`}
                                        className="w-full h-auto block pointer-events-none"
                                        draggable={false}
                                        onError={() => handleImgError(activeImage)}
                                    />
                                ) : (
                                    <div className={`w-full aspect-[9/16] flex items-center justify-center bg-gradient-to-br ${project.gradient}`}>
                                        <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
                                        </svg>
                                    </div>
                                )}
                            </motion.div>

                            {/* Image navigation — shown on mobile only (desktop uses thumbnail strip below) */}
                            {project.images.length > 1 && (
                                <>
                                    {/* Counter badge — top left */}
                                    <div
                                        className="md:hidden absolute top-3 left-3 z-40 text-[11px] font-bold text-white px-2.5 py-1 rounded-lg pointer-events-none"
                                        style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.18)' }}
                                    >
                                        {imgIndex + 1} / {project.images.length}
                                    </div>

                                    {/* Prev button — floats over left edge of image */}
                                    <button
                                        className="md:hidden absolute left-3 bottom-14 z-40 w-12 h-12 rounded-full flex items-center justify-center"
                                        style={{
                                            background: project.color,
                                            boxShadow: `0 0 0 3px rgba(255,255,255,0.25), 0 6px 24px ${project.color}cc`,
                                            color: '#fff',
                                        }}
                                        onClick={goPrevImg}
                                        aria-label="Previous image"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 18l-6-6 6-6" />
                                        </svg>
                                    </button>

                                    {/* Next button — floats over right edge of image */}
                                    <button
                                        className="md:hidden absolute right-3 bottom-14 z-40 w-12 h-12 rounded-full flex items-center justify-center"
                                        style={{
                                            background: project.color,
                                            boxShadow: `0 0 0 3px rgba(255,255,255,0.25), 0 6px 24px ${project.color}cc`,
                                            color: '#fff',
                                        }}
                                        onClick={goNextImg}
                                        aria-label="Next image"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 6l6 6-6 6" />
                                        </svg>
                                    </button>

                                    {/* Dot indicators — bottom center */}
                                    <div
                                        className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2 px-3 py-1.5 rounded-full pointer-events-none"
                                        style={{ background: 'rgba(0,0,0,0.65)' }}
                                    >
                                        {project.images.map((img, idx) => (
                                            <span
                                                key={idx}
                                                className="rounded-full transition-all duration-300"
                                                style={{
                                                    width: activeImage === img ? '18px' : '6px',
                                                    height: '6px',
                                                    background: activeImage === img ? project.color : 'rgba(255,255,255,0.4)',
                                                }}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Thumbnail strip */}
                        {project.images.length > 1 && (
                            <div className="hidden md:flex gap-2 p-3 overflow-x-auto project-modal-thumbs border-t border-white/5">
                                {project.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className="project-modal-thumb flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-200"
                                        style={{
                                            outline: activeImage === img ? `2px solid ${project.color}` : '2px solid transparent',
                                            outlineOffset: '2px',
                                            opacity: activeImage === img ? 1 : 0.45,
                                        }}
                                        aria-label={`View image ${idx + 1}`}
                                    >
                                        {!imgErrors[img] && (
                                            <img src={img} alt="" className="w-full h-full object-cover" onError={() => handleImgError(img)} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: info panel */}
                    <div
                        className="md:w-[48%] flex flex-col border-t md:border-t-0 md:border-l border-white/[0.06] px-5 sm:px-6 py-6 md:overflow-y-auto"
                    >
                        {/* Accent bar */}
                        <div
                            className="h-[2px] w-10 rounded-full mb-5"
                            style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                        />

                        <h2 className="text-lg sm:text-xl font-bold text-white leading-snug mb-3 break-words">
                            {project.title}
                        </h2>

                        <p className="text-sm leading-relaxed text-[var(--color-text-muted)] mb-6">
                            {project.description}
                        </p>

                        {/* Tech stack */}
                        <div className="mb-6">
                            <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-2.5">Tech Stack</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-3 py-1.5 rounded-lg border whitespace-nowrap font-medium"
                                        style={{
                                            backgroundColor: `${project.color}0e`,
                                            borderColor: `${project.color}28`,
                                            color: 'var(--color-text-secondary)',
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Keyboard hint */}
                        <p className="text-[11px] text-white/30 hidden md:flex items-center gap-2 mt-auto pt-4 border-t border-white/[0.06]">
                            <span className="kbd">←</span><span className="kbd">→</span>
                            <span>navigate projects</span>
                            <span className="kbd ml-2">Esc</span>
                            <span>close</span>
                        </p>
                    </div>
                </div>

                {/* Mobile bottom nav */}
                {total > 1 && (
                    <div
                        className="md:hidden sticky bottom-0 z-30 flex items-center gap-2 px-4 py-3 border-t border-white/[0.07]"
                        style={{ background: 'rgba(12,12,18,0.97)', backdropFilter: 'blur(24px)' }}
                    >
                        <button
                            onClick={onPrev}
                            className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 text-white/80 transition-all text-sm font-semibold"
                            aria-label="Previous project"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                            Prev
                        </button>
                        <button
                            onClick={onNext}
                            className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl active:scale-[0.98] text-white transition-all text-sm font-semibold"
                            style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)` }}
                            aria-label="Next project"
                        >
                            Next
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M9 6l6 6-6 6" />
                            </svg>
                        </button>
                    </div>
                )}

                <AnimatePresence>
                    {lightboxOpen && !imgErrors[activeImage] && (
                        <Lightbox src={activeImage} alt={project.title} onClose={() => setLightboxOpen(false)} />
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>,
        document.body
    );
}

// ─── Projects Section ──────────────────────────────────────────────────────────
export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = useMemo(
        () => activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory),
        [activeCategory]
    );

    const selectedProject = selectedIndex !== null ? filtered[selectedIndex] : null;

    const handleOpen = useCallback((project) => {
        const idx = filtered.findIndex((p) => p.slug === project.slug);
        setSelectedIndex(idx >= 0 ? idx : 0);
    }, [filtered]);

    const handleClose = useCallback(() => setSelectedIndex(null), []);
    const handleNext = useCallback(() => setSelectedIndex((i) => (i === null ? 0 : (i + 1) % filtered.length)), [filtered.length]);
    const handlePrev = useCallback(() => setSelectedIndex((i) => i === null ? 0 : (i - 1 + filtered.length) % filtered.length), [filtered.length]);

    return (
        <section id="projects" className="section-wrapper relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
            {/* Background glows */}
            <div className="absolute top-1/4 right-0 w-[28rem] h-[28rem] rounded-full blur-[130px] -z-10"
                style={{ background: 'rgba(var(--accent-3-rgb), 0.055)' }} />
            <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-[110px] -z-10"
                style={{ background: 'rgba(var(--accent-2-rgb), 0.055)' }} />

            <div className="section-container">
                <div ref={ref}>
                    <AnimatedHeading
                        eyebrow="Featured Work"
                        title="Recent Projects"
                        description="A selection of projects that showcase my development capabilities. Click any card to view full details."
                    />
                </div>

                {/* Filter chips */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-2 sm:gap-2.5"
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
                                className={`relative inline-flex items-center justify-center min-w-[80px] h-9 px-5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors duration-200 border ${
                                    active
                                        ? 'text-white border-transparent'
                                        : 'text-white/45 hover:text-white/80 border-white/[0.08] hover:border-white/20 bg-white/[0.025]'
                                }`}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="projectFilterPill"
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                                            boxShadow: '0 4px 18px rgba(var(--accent-rgb), 0.35)',
                                        }}
                                        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 leading-none">{cat}</span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* Project grid — 1 col mobile, 2 col tablet, 3 col desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-2">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((p, i) => (
                            <ProjectCard
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
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-white/35 text-sm py-8"
                    >
                        No projects in this category yet.
                    </motion.p>
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
