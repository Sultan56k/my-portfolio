import { useState } from 'react'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import ParticleField from './components/ParticleField'
import CustomCursor from './components/CustomCursor'
import BackToTop from './components/BackToTop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Goals from './components/Goals'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
    const [loaded, setLoaded] = useState(false)

    return (
        <>
            <Preloader onComplete={() => setLoaded(true)} />
            {loaded && (
                <div className="noise-bg min-h-screen relative">
                    <ScrollProgress />
                    <ParticleField />
                    <CustomCursor />
                    <Navbar />
                    <main className="relative z-10">
                        <Hero />
                        <TechMarquee />
                        <About />
                        <Services />
                        <Skills />
                        <Experience />
                        <Projects />
                        <Education />
                        <Goals />
                        <Contact />
                    </main>
                    <Footer />
                    <BackToTop />
                </div>
            )}
        </>
    )
}

export default App
