import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

const NAVBAR_HEIGHT = 80;

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                setScrolled(window.scrollY > 50);

                const sections = navLinks.map(l => l.href.slice(1));
                let current = '';
                const viewportMiddle = window.innerHeight / 3;

                for (const id of sections) {
                    const el = document.getElementById(id);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top <= viewportMiddle && rect.bottom > NAVBAR_HEIGHT) {
                            current = id;
                        }
                    }
                }
                setActiveSection(current);
                ticking = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleNavClick = useCallback((e, href) => {
        e.preventDefault();
        setIsOpen(false);
        // Restore body scroll immediately before scrolling,
        // otherwise scrollTo is blocked by overflow:hidden
        document.body.style.overflow = '';
        const target = document.getElementById(href.slice(1));
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-[#0b0b0f]/80 backdrop-blur-xl border-b border-[#2a2a3a]/50 shadow-lg shadow-black/10'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <motion.a
                        href="#"
                        className="text-xl lg:text-2xl font-bold gradient-text relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        MS
                        <motion.span
                            className="absolute -inset-2 bg-[#6366f1]/10 rounded-lg -z-10"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                        />
                    </motion.a>

                    <div className="hidden md:flex items-center gap-5 lg:gap-7">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                className={`relative px-2 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                                    activeSection === link.href.slice(1)
                                        ? 'text-white'
                                        : 'text-[#a1a1aa] hover:text-white'
                                }`}
                                whileHover={{ y: -1 }}
                            >
                                {link.name}
                                {activeSection === link.href.slice(1) && (
                                    <motion.span
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-white/[0.06] border border-white/10 rounded-lg -z-10"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.a>
                        ))}
                        <motion.a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, '#contact')}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="btn-primary text-sm ml-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Hire Me
                        </motion.a>
                    </div>

                    <motion.button
                        className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5"
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.9 }}
                        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isOpen}
                    >
                        <div className="flex flex-col gap-1.5">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-white block transition-all origin-center"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                className="w-6 h-0.5 bg-white block"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-white block transition-all origin-center"
                            />
                        </div>
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
                            style={{ zIndex: 40 }}
                        />
                        {/* Slide-in panel from right */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                            className="fixed top-0 right-0 h-full w-[min(75vw,300px)] bg-[#0b0b0f] border-l border-[#2a2a3a]/50 md:hidden overflow-y-auto"
                            style={{ zIndex: 50 }}
                        >
                            {/* Close button */}
                            <div className="flex items-center justify-between px-5 h-16 border-b border-[#2a2a3a]/30">
                                <span className="text-lg font-bold gradient-text">MS</span>
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5"
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Close navigation menu"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </motion.button>
                            </div>

                            <div className="flex flex-col px-5 py-6 gap-1">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className={`block py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                                            activeSection === link.href.slice(1)
                                                ? 'text-white bg-[#6366f1]/15 border-l-2 border-[#6366f1]'
                                                : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                                <motion.a
                                    href="#contact"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                                    onClick={(e) => handleNavClick(e, '#contact')}
                                    className="btn-primary block mt-6 text-center text-sm py-3"
                                >
                                    Hire Me
                                </motion.a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
