import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Goals from './components/Goals'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
    return (
        <div className="noise-bg min-h-screen">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Education />
                <Goals />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}

export default App
