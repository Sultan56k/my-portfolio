import { useState, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import ParticleField from './components/ParticleField';
import CustomCursor from './components/CustomCursor';
import CursorTrail from './components/CursorTrail';
import BackToTop from './components/BackToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Footer from './components/Footer';
import AccentSwitcher from './components/AccentSwitcher';
import ShortcutHints from './components/ShortcutHints';
import MarqueeBand from './components/MarqueeBand';
import SectionDivider from './components/SectionDivider';
import { AccentProvider } from './context/AccentContext';
import { ToastProvider } from './context/ToastContext';
import useLenis from './hooks/useLenis';

const Experience = lazy(() => import('./components/Experience'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Goals = lazy(() => import('./components/Goals'));
const Contact = lazy(() => import('./components/Contact'));

function SectionFallback() {
    return <div className="h-40" aria-hidden="true" />;
}

function Site() {
    useLenis();

    return (
        <div className="noise-bg min-h-screen relative">
            {/* Persistent decorative background layers */}
            <div className="app-aurora" aria-hidden="true" />
            <div className="app-grid-bg" aria-hidden="true" />

            <ScrollProgress />
            <ParticleField />
            <CustomCursor />
            <CursorTrail />
            <Navbar />

            <main className="relative z-10">
                <Hero />
                <TechMarquee />
                <SectionDivider />
                <About />
                <MarqueeBand
                    items={[
                        'Design → Build → Ship',
                        'React · React Native · Node',
                        'Available for Collaboration',
                        'Mobile-first · Performance · Clean Code',
                    ]}
                    accentIndex={1}
                />
                <Services />
                <SectionDivider />
                <Skills />
                <Suspense fallback={<SectionFallback />}>
                    <Experience />
                </Suspense>
                <MarqueeBand
                    items={[
                        'Crafting Digital Experiences',
                        'Pixel-perfect UI',
                        'Animated Interfaces',
                        'Production-grade apps',
                    ]}
                    accentIndex={2}
                />
                <Suspense fallback={<SectionFallback />}>
                    <Testimonials />
                </Suspense>
                <SectionDivider />
                <Suspense fallback={<SectionFallback />}>
                    <Projects />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <Education />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <Goals />
                </Suspense>
                <MarqueeBand
                    items={[
                        "Let's Work Together",
                        'Full-Stack Mobile Developer',
                        'Based in Pakistan',
                        "Say Hi",
                    ]}
                    accentIndex={0}
                />
                <Suspense fallback={<SectionFallback />}>
                    <Contact />
                </Suspense>
            </main>

            <Footer />
            <BackToTop />
            <AccentSwitcher />
            <ShortcutHints />
        </div>
    );
}

function App() {
    const [loaded, setLoaded] = useState(false);

    return (
        <AccentProvider>
            <ToastProvider>
                <Preloader onComplete={() => setLoaded(true)} />
                {loaded && <Site />}
                <Analytics />
            </ToastProvider>
        </AccentProvider>
    );
}

export default App;
