import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Education() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="education" className="section-wrapper relative">
            <div className="section-container">

                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="section-header"
                >
                    <span className="section-subtitle">Education</span>
                </motion.div>

                {/* Centered Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    className="max-w-2xl mx-auto w-full"
                >
                    <div className="card-base card-glow text-center p-8 md:p-12">
                        <div className="w-16 h-16 mx-auto bg-[#6366f1]/10 rounded-2xl flex items-center justify-center text-3xl mb-6">
                            🎓
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Computer Science</h3>
                        <p className="text-[#6366f1] font-medium text-lg mb-6">Final Year Student</p>

                        <div className="flex flex-wrap gap-3 justify-center">
                            <span className="tag">Software Engineering</span>
                            <span className="tag">System Design</span>
                            <span className="tag">Data Structures</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
