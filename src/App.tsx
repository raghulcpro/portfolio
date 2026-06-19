import { useState, useEffect } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Features from './sections/Features';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import SplashScreen from './components/SplashScreen';

const SECTIONS = ['home', 'about', 'features', 'skills', 'experience', 'projects', 'education', 'contact'];

function App() {

  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);



  // Active section tracking with IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <>
      {loading && <SplashScreen onComplete={() => setLoading(false)} />}

      {/* Main Content */}
      <div className="relative">
        <Navbar
          activeSection={activeSection}
        />

        <main>
          <Hero />
          <About />
          <Features />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Education />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
