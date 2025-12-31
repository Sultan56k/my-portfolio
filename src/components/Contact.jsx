import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="contact" className="section-wrapper relative">
            <div className="section-container">

                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="section-header"
                >
                    <span className="section-subtitle">Contact Me</span>
                    <p className="section-description text-center">
                        Have a project or opportunity? Let's connect.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto w-full">

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        className="card-base"
                    >
                        <form className="flex flex-col gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#9898a8] uppercase tracking-wider block">Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Your Name" 
                                    className="w-full bg-[#13131a] border border-[#2a2a3a] rounded-lg px-4 py-3.5 text-white placeholder-[#52525b] focus:border-[#6366f1] focus:outline-none transition-all duration-200" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#9898a8] uppercase tracking-wider block">Email</label>
                                <input 
                                    type="email" 
                                    placeholder="john@example.com" 
                                    className="w-full bg-[#13131a] border border-[#2a2a3a] rounded-lg px-4 py-3.5 text-white placeholder-[#52525b] focus:border-[#6366f1] focus:outline-none transition-all duration-200" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#9898a8] uppercase tracking-wider block">Message</label>
                                <textarea 
                                    rows="5" 
                                    placeholder="How can I help you?" 
                                    className="w-full bg-[#13131a] border border-[#2a2a3a] rounded-lg px-4 py-3.5 text-white placeholder-[#52525b] focus:border-[#6366f1] focus:outline-none transition-all duration-200 resize-none" 
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-primary mt-2 w-full">
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        className="flex flex-col gap-6"
                    >
                        {/* Contact Info Card */}
                        <div className="card-base flex-grow">
                            <h3 className="text-xl font-bold text-white mb-8">Contact Information</h3>

                            <div className="flex flex-col gap-6">
                                <a
                                    href="mailto:244msultan@gmail.com"
                                    className="flex items-center gap-5 p-4 rounded-xl bg-[#1a1a24] border border-[#2a2a3a] hover:border-[#6366f1] hover:bg-[#6366f1]/5 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-[#2a2a3a] flex items-center justify-center group-hover:bg-[#6366f1] text-2xl transition-colors">
                                        ✉️
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-xs text-[#9898a8] font-bold uppercase tracking-wider mb-0.5">Email</p>
                                        <p className="text-white font-medium text-sm md:text-base break-all">244msultan@gmail.com</p>
                                    </div>
                                    <div className="text-[#9898a8] group-hover:text-white transition-colors">
                                        →
                                    </div>
                                </a>

                                <a
                                    href="tel:+923078873362"
                                    className="flex items-center gap-5 p-4 rounded-xl bg-[#1a1a24] border border-[#2a2a3a] hover:border-[#6366f1] hover:bg-[#6366f1]/5 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-[#2a2a3a] flex items-center justify-center group-hover:bg-[#6366f1] text-2xl transition-colors">
                                        📞
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-xs text-[#9898a8] font-bold uppercase tracking-wider mb-0.5">Phone</p>
                                        <p className="text-white font-medium text-sm md:text-base">+92 307 8873362</p>
                                    </div>
                                    <div className="text-[#9898a8] group-hover:text-white transition-colors">
                                        →
                                    </div>
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/sultan-kamran-17817b285/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-5 p-4 rounded-xl bg-[#1a1a24] border border-[#2a2a3a] hover:border-[#0077b5] hover:bg-[#0077b5]/5 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-[#2a2a3a] flex items-center justify-center group-hover:bg-[#0077b5] text-2xl transition-colors">
                                        💼
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-xs text-[#9898a8] font-bold uppercase tracking-wider mb-0.5">LinkedIn</p>
                                        <p className="text-white font-medium text-sm md:text-base">Sultan Kamran</p>
                                    </div>
                                    <div className="text-[#9898a8] group-hover:text-white transition-colors">
                                        →
                                    </div>
                                </a>

                                <a
                                    href="https://github.com/Sultan56k"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-5 p-4 rounded-xl bg-[#1a1a24] border border-[#2a2a3a] hover:border-white hover:bg-white/5 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-[#2a2a3a] flex items-center justify-center group-hover:bg-white group-hover:text-black text-2xl transition-colors">
                                        🐙
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-xs text-[#9898a8] font-bold uppercase tracking-wider mb-0.5">GitHub</p>
                                        <p className="text-white font-medium text-sm md:text-base">Sultan56k</p>
                                    </div>
                                    <div className="text-[#9898a8] group-hover:text-white transition-colors">
                                        →
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Availability Badge */}
                        <div className="p-6 rounded-xl border border-[#22d3ee]/30 bg-[#22d3ee]/5 flex items-center gap-4">
                            <div className="relative">
                                <div className="w-3 h-3 bg-[#22d3ee] rounded-full" />
                                <div className="absolute inset-0 w-3 h-3 bg-[#22d3ee] rounded-full animate-ping" />
                            </div>
                            <p className="text-[#22d3ee] font-medium text-sm">Available for new opportunities</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
