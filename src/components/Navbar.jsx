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

        const handleClickOutside = (e) => {
            if (!e.target.closest('nav')) setIsOpen(false);
        };

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleNavClick = useCallback((e, href) => {
        e.preventDefault();
        setIsOpen(false);
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
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-[1]"
                            style={{ top: '64px' }}
                        />
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="md:hidden bg-[#0b0b0f]/98 backdrop-blur-xl border-t border-[#2a2a3a]/50 relative z-[2] max-h-[calc(100vh-64px)] overflow-y-auto"
                        >
                            <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full py-4">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className={`block py-3 transition-colors duration-300 font-medium ${
                                            activeSection === link.href.slice(1)
                                                ? 'text-white pl-4 border-l-2 border-[#6366f1]'
                                                : 'text-[#a1a1aa] hover:text-white hover:pl-2'
                                        }`}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                                <motion.a
                                    href="#contact"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.35 }}
                                    onClick={(e) => handleNavClick(e, '#contact')}
                                    className="btn-primary inline-block mt-4 text-center w-full"
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
