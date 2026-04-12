import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import AnimatedHeading from './AnimatedHeading';
import { useToast } from '../context/ToastContext';

/*
 * CONTACT FORM SETUP — EmailJS
 * ---------------------------------------------------------------
 * 1. Sign up free at https://www.emailjs.com/
 * 2. Add an Email Service (Gmail is easiest — connect 244msultan@gmail.com)
 * 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{message}}
 * 4. Copy your Service ID, Template ID, and Public Key from the dashboard
 * 5. Create a `.env` file at the project root (already in .gitignore) with:
 *      VITE_EMAILJS_SERVICE_ID=xxx
 *      VITE_EMAILJS_TEMPLATE_ID=xxx
 *      VITE_EMAILJS_PUBLIC_KEY=xxx
 * 6. Restart `npm run dev` — Vite only reads env vars at startup.
 * See .env.example for a template.
 */

const contactLinks = [
    {
        label: 'Email',
        value: '244msultan@gmail.com',
        href: 'mailto:244msultan@gmail.com',
        copyable: true,
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
        copyable: true,
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

function FormInput({ label, type = 'text', placeholder, isTextarea, name, value, onChange, required, disabled }) {
    const [focused, setFocused] = useState(false);
    const Component = isTextarea ? 'textarea' : 'input';

    return (
        <div className="space-y-2">
            <label htmlFor={name} className="text-xs font-bold text-[#9898a8] uppercase tracking-wider block">
                {label}
            </label>
            <div className={`relative rounded-lg transition-all duration-300 ${focused ? 'ring-2' : ''}`}
                style={focused ? { '--tw-ring-color': 'rgba(var(--accent-rgb), 0.2)', boxShadow: '0 0 0 2px rgba(var(--accent-rgb), 0.2)' } : undefined}
            >
                <Component
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    placeholder={placeholder}
                    rows={isTextarea ? 5 : undefined}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`w-full bg-[#13131a] border border-[#2a2a3a] rounded-lg px-4 py-3.5 text-white placeholder-[#52525b] focus:outline-none transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${isTextarea ? 'resize-none' : ''}`}
                    style={focused ? { borderColor: 'var(--accent)' } : undefined}
                />
            </div>
        </div>
    );
}

function CopyButton({ value, label }) {
    const [copied, setCopied] = useState(false);
    const toast = useToast();

    const handleCopy = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            toast.show(`${label} copied to clipboard`, { type: 'success', duration: 2500 });
            setTimeout(() => setCopied(false), 1600);
        } catch {
            toast.show("Couldn't copy — please copy manually", { type: 'error' });
        }
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="icon-btn"
            aria-label={`Copy ${label}`}
        >
            {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
            )}
        </button>
    );
}

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');
    const toast = useToast();

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === 'sending') return;

        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            toast.show('Please fill in all fields before sending.', { type: 'error' });
            return;
        }

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            toast.show(
                'Email service is not configured yet. Please email me directly at 244msultan@gmail.com.',
                { type: 'error', duration: 6000 }
            );
            return;
        }

        setStatus('sending');
        try {
            await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: form.name,
                    from_email: form.email,
                    message: form.message,
                    reply_to: form.email,
                },
                { publicKey }
            );
            setStatus('success');
            toast.show("Message sent — I'll get back to you soon.", { type: 'success' });
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            console.error('EmailJS send failed:', err);
            setStatus('idle');
            toast.show('Something went wrong. Please try again or email me directly.', {
                type: 'error',
                duration: 5000,
            });
        }
    };

    return (
        <section id="contact" className="section-wrapper relative overflow-hidden">
            <div
                className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-[100px] -z-10"
                style={{ background: 'rgba(var(--accent-rgb), 0.05)' }}
            />
            <div
                className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[100px] -z-10"
                style={{ background: 'rgba(var(--accent-3-rgb), 0.05)' }}
            />

            <div className="section-container">
                <div ref={ref}>
                    <AnimatedHeading
                        eyebrow="Contact Me"
                        title="Let's Connect"
                        description="Have a project or opportunity? I'd love to hear from you."
                    />
                </div>

                <div className="grid lg:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="card-base card-inner-glow"
                    >
                        <form className="flex flex-col gap-4 sm:gap-6" onSubmit={handleSubmit} noValidate>
                            <FormInput
                                label="Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                disabled={status === 'sending'}
                            />
                            <FormInput
                                label="Email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                                disabled={status === 'sending'}
                            />
                            <FormInput
                                label="Message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="How can I help you?"
                                isTextarea
                                required
                                disabled={status === 'sending'}
                            />

                            <motion.button
                                type="submit"
                                disabled={status === 'sending' || status === 'success'}
                                className="btn-primary mt-2 w-full gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
                                whileHover={status === 'idle' ? { scale: 1.01 } : {}}
                                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                            >
                                {status === 'sending' && (
                                    <>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-spin">
                                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                        </svg>
                                        Sending...
                                    </>
                                )}
                                {status === 'success' && (
                                    <>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Message Sent!
                                    </>
                                )}
                                {status === 'idle' && (
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
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        whileHover={{ x: 4 }}
                                        className="flex items-center gap-3 sm:gap-5 p-3 sm:p-4 rounded-xl bg-[#1a1a24] border border-[#2a2a3a] transition-all duration-300 group"
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = `${link.color}50`;
                                            e.currentTarget.style.backgroundColor = `${link.color}08`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#2a2a3a';
                                            e.currentTarget.style.backgroundColor = '#1a1a24';
                                        }}
                                    >
                                        <a
                                            href={link.href}
                                            target={link.href.startsWith('http') ? '_blank' : undefined}
                                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0"
                                            aria-label={`${link.label}: ${link.value}`}
                                        >
                                            <div
                                                className="contact-icon w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#2a2a3a] flex items-center justify-center transition-all duration-300 text-[#9898a8] group-hover:text-white shrink-0"
                                            >
                                                {link.icon}
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="text-xs text-[#9898a8] font-bold uppercase tracking-wider mb-0.5">{link.label}</p>
                                                <p className="text-white font-medium text-sm md:text-base break-all">{link.value}</p>
                                            </div>
                                        </a>
                                        <div className="flex items-center gap-1 shrink-0">
                                            {link.copyable && <CopyButton value={link.value} label={link.label} />}
                                            <a
                                                href={link.href}
                                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                className="text-[#9898a8] group-hover:text-white transition-all duration-300 group-hover:translate-x-1"
                                                aria-hidden="true"
                                                tabIndex={-1}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                    <path d="M3 8h10M9 4l4 4-4 4" />
                                                </svg>
                                            </a>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            className="p-4 sm:p-5 rounded-xl flex items-center gap-3 sm:gap-4"
                            style={{
                                borderColor: 'rgba(var(--accent-3-rgb), 0.3)',
                                background: 'rgba(var(--accent-3-rgb), 0.05)',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.8 }}
                            whileHover={{ scale: 1.01 }}
                        >
                            <div className="relative">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ background: 'var(--accent-3)' }}
                                />
                                <div
                                    className="absolute inset-0 w-3 h-3 rounded-full animate-ping"
                                    style={{ background: 'var(--accent-3)' }}
                                />
                            </div>
                            <div>
                                <p
                                    className="font-semibold text-xs sm:text-sm"
                                    style={{ color: 'var(--accent-3)' }}
                                >
                                    Available for new opportunities
                                </p>
                                <p
                                    className="text-[10px] sm:text-xs mt-0.5"
                                    style={{ color: 'rgba(var(--accent-3-rgb), 0.65)' }}
                                >
                                    Open to full-time &amp; freelance projects
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
