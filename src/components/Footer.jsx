import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/Sultan56k',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/sultan-kamran-17817b285/',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        name: 'Email',
        href: 'mailto:244msultan@gmail.com',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
        ),
    },
];

const footerLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const ctaRef = useRef(null);
    const isInView = useInView(ctaRef, { once: true, margin: '-50px' });

    return (
        <footer className="relative">
            {/* CTA Banner */}
            <div className="py-10 sm:py-16 md:py-24 px-4 sm:px-8 lg:px-12" ref={ctaRef}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative overflow-hidden rounded-2xl max-w-[1200px] mx-auto"
                >
                    {/* Solid background + gradient overlay */}
                    <div className="absolute inset-0 bg-[#13131a] rounded-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/15 via-transparent to-[#a855f7]/15 rounded-2xl" />
                    <div className="absolute inset-0 border border-[#2a2a3a]/70 rounded-2xl" />

                    {/* Animated orbs */}
                    <motion.div
                        className="absolute -top-16 left-1/4 w-64 h-64 bg-[#6366f1]/10 rounded-full blur-[80px]"
                        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute -bottom-16 right-1/4 w-64 h-64 bg-[#a855f7]/10 rounded-full blur-[80px]"
                        animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />

                    {/* Content */}
                    <div className="relative z-10 p-6 sm:p-8 md:p-14 lg:p-20 text-center">
                        <motion.p
                            className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-[#6366f1] mb-3 sm:mb-5"
                            initial={{ opacity: 0, y: 15 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 }}
                        >
                            Ready to collaborate?
                        </motion.p>

                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-5 leading-tight tracking-tight"
                            style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                        >
                            Let's Build Something{' '}
                            <span className="gradient-text">Amazing</span>
                        </motion.h2>

                        <motion.p
                            className="text-[#aeb0be] text-sm sm:text-base md:text-lg mb-6 sm:mb-10 max-w-md mx-auto leading-relaxed px-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 }}
                        >
                            Have a project idea? I'm always excited to collaborate on meaningful work.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 }}
                        >
                            <a href="#contact" className="btn-primary gap-2">
                                Start a Conversation
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M3 8h10M9 4l4 4-4 4" />
                                </svg>
                            </a>
                            <a href="mailto:244msultan@gmail.com" className="btn-secondary gap-2">
                                Email Me
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Footer Content */}
            <div className="border-t border-[#2a2a3a]/50">
                <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#6366f1]/30 to-transparent" />

                <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
                    <div className="flex flex-col md:grid md:grid-cols-3 gap-6 sm:gap-8 items-center">
                        {/* Left: Logo & tagline */}
                        <div className="text-center md:text-left">
                            <motion.a
                                href="#"
                                className="text-2xl font-bold gradient-text inline-block"
                                whileHover={{ scale: 1.05 }}
                            >
                                MS
                            </motion.a>
                            <p className="text-[#71717a] text-sm mt-2">
                                Building digital experiences.
                            </p>
                        </div>

                        {/* Center: Nav links */}
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                            {footerLinks.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href}
                                    className="text-[#9898a8] hover:text-white transition-colors text-xs sm:text-sm font-medium"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Right: Social icons */}
                        <div className="flex justify-center md:justify-end gap-3">
                            {socialLinks.map((link, i) => (
                                <motion.a
                                    key={i}
                                    href={link.href}
                                    target={link.href.startsWith('http') ? '_blank' : undefined}
                                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="w-10 h-10 rounded-lg bg-[#1a1a24] border border-[#2a2a3a] flex items-center justify-center text-[#9898a8] hover:text-white hover:border-[#6366f1] hover:bg-[#6366f1]/10 transition-all duration-300"
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={link.name}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-[#2a2a3a]/50 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-[#52525b] text-xs">
                            &copy; {currentYear} Muhammad Sultan. All rights reserved.
                        </p>
                        <p className="text-[#52525b] text-xs">
                            Built with React, Tailwind CSS & Framer Motion
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
