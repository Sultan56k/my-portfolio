import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const contactLinks = [
    {
        label: 'Email',
        value: '244msultan@gmail.com',
        href: 'mailto:244msultan@gmail.com',
        color: '#6366f1',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
        ),
    },
    {
        label: 'Phone',
        value: '+92 307 8873362',
        href: 'tel:+923078873362',
        color: '#22d3ee',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        value: 'Sultan Kamran',
        href: 'https://www.linkedin.com/in/sultan-kamran-17817b285/',
        color: '#0077b5',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        value: 'Sultan56k',
        href: 'https://github.com/Sultan56k',
        color: '#ffffff',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
    },
];

function FormInput({ label, type = 'text', placeholder, isTextarea }) {
    const [focused, setFocused] = useState(false);
    const Component = isTextarea ? 'textarea' : 'input';

    return (
        <div className="space-y-2">
            <label className="text-xs font-bold text-[#9898a8] uppercase tracking-wider block">
                {label}
            </label>
            <div className={`relative rounded-lg transition-all duration-300 ${focused ? 'ring-2 ring-[#6366f1]/20' : ''}`}>
                <Component
                    type={type}
                    placeholder={placeholder}
                    rows={isTextarea ? 5 : undefined}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`w-full bg-[#13131a] border border-[#2a2a3a] rounded-lg px-4 py-3.5 text-white placeholder-[#52525b] focus:border-[#6366f1] focus:outline-none transition-all duration-300 ${isTextarea ? 'resize-none' : ''}`}
                />
            </div>
        </div>
    );
}

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 3000);
    };

    return (
        <section id="contact" className="section-wrapper relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#6366f1]/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#22d3ee]/5 rounded-full blur-[100px] -z-10" />

            <div className="section-container">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="section-header"
                >
                    <span className="section-subtitle">Contact Me</span>
                    <h2 className="type-h2 text-white">Let's Connect</h2>
                    <div className="section-divider mt-2" />
                    <p className="section-description text-center mt-4">
                        Have a project or opportunity? I'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto w-full">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="card-base card-inner-glow"
                    >
                        <form className="flex flex-col gap-4 sm:gap-6" onSubmit={handleSubmit}>
                            <FormInput label="Name" placeholder="Your Name" />
                            <FormInput label="Email" type="email" placeholder="john@example.com" />
                            <FormInput label="Message" placeholder="How can I help you?" isTextarea />

                            <motion.button
                                type="submit"
                                className="btn-primary mt-2 w-full gap-2"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {formSubmitted ? (
                                    <>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Message Sent!
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="card-base card-inner-glow flex-grow">
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-5 sm:mb-8">Contact Information</h3>
                            <div className="flex flex-col gap-3 sm:gap-4">
                                {contactLinks.map((link, i) => (
                                    <motion.a
                                        key={i}
                                        href={link.href}
                                        target={link.href.startsWith('http') ? '_blank' : undefined}
                                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        whileHover={{ x: 4 }}
                                        className="flex items-center gap-3 sm:gap-5 p-3 sm:p-4 rounded-xl bg-[#1a1a24] border border-[#2a2a3a] transition-all duration-300 group"
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = `${link.color}50`;
                                            e.currentTarget.style.backgroundColor = `${link.color}08`;
                                            const icon = e.currentTarget.querySelector('.contact-icon');
                                            if (icon) icon.style.backgroundColor = link.color;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#2a2a3a';
                                            e.currentTarget.style.backgroundColor = '#1a1a24';
                                            const icon = e.currentTarget.querySelector('.contact-icon');
                                            if (icon) icon.style.backgroundColor = '#2a2a3a';
                                        }}
                                    >
                                        <div
                                            className="contact-icon w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#2a2a3a] flex items-center justify-center transition-all duration-300 text-[#9898a8] group-hover:text-white shrink-0"
                                        >
                                            {link.icon}
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-xs text-[#9898a8] font-bold uppercase tracking-wider mb-0.5">{link.label}</p>
                                            <p className="text-white font-medium text-sm md:text-base break-all">{link.value}</p>
                                        </div>
                                        <div className="text-[#9898a8] group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                <path d="M3 8h10M9 4l4 4-4 4" />
                                            </svg>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Availability Badge */}
                        <motion.div
                            className="p-4 sm:p-5 rounded-xl border border-[#22d3ee]/30 bg-[#22d3ee]/5 flex items-center gap-3 sm:gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.8 }}
                            whileHover={{ scale: 1.01, borderColor: 'rgba(34, 211, 238, 0.5)' }}
                        >
                            <div className="relative">
                                <div className="w-3 h-3 bg-[#22d3ee] rounded-full" />
                                <div className="absolute inset-0 w-3 h-3 bg-[#22d3ee] rounded-full animate-ping" />
                            </div>
                            <div>
                                <p className="text-[#22d3ee] font-semibold text-xs sm:text-sm">Available for new opportunities</p>
                                <p className="text-[#22d3ee]/60 text-[10px] sm:text-xs mt-0.5">Open to full-time & freelance projects</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
