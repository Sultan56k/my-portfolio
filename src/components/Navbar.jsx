import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-[#0b0b0f]/90 backdrop-blur-md border-b border-[#2a2a3a]'
                    : 'bg-transparent'
                }`}
        >
            <div className="section-container">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <motion.a
                        href="#"
                        className="text-xl lg:text-2xl font-bold gradient-text"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        MS
                    </motion.a>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-[#a1a1aa] hover:text-white transition-colors duration-300 text-sm font-medium"
                                whileHover={{ y: -2 }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.a
                            href="#contact"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="btn-primary text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Hire Me
                        </motion.a>
                    </div>

                    <motion.button
                        className="md:hidden relative w-10 h-10 flex items-center justify-center"
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className="flex flex-col gap-1.5">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-white block transition-all"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-6 h-0.5 bg-white block"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-white block transition-all"
                            />
                        </div>
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-[#13131a] border-t border-[#2a2a3a]"
                    >
                        <div className="section-container py-4">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-3 text-[#a1a1aa] hover:text-white transition-colors duration-300 font-medium"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#contact"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 }}
                                onClick={() => setIsOpen(false)}
                                className="btn-primary inline-block mt-4 text-center w-full"
                            >
                                Hire Me
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
