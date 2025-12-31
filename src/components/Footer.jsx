import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 border-t border-[#2a2a3a]">
            <div className="section-container">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#9898a8] text-sm"
                    >
                        © {currentYear} Muhammad Sultan. All rights reserved.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-6"
                    >
                        <a
                            href="https://github.com/muhammadsultan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#9898a8] hover:text-white transition-colors text-sm font-medium"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/muhammadsultan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#9898a8] hover:text-white transition-colors text-sm font-medium"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="mailto:muhammadsultan@example.com"
                            className="text-[#9898a8] hover:text-white transition-colors text-sm font-medium"
                        >
                            Email
                        </a>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-[#6a6a7a] text-xs mt-4"
                >
                    Built with React, Tailwind CSS & Framer Motion
                </motion.p>
            </div>
        </footer>
    );
}
