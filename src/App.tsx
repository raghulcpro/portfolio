import { useState, useEffect, useCallback } from 'react';
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
  const [isLightMode, setIsLightMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light') return true;
    if (stored === 'dark') return false;
    return false; // Default to dark
  });
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);

  // Theme toggle
  const toggleTheme = useCallback(() => {
    setIsLightMode((prev) => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'light' : 'dark');
      return next;
    });
  }, []);

  // Apply theme class to body
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  }, [isLightMode]);

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
          isLightMode={isLightMode}
          toggleTheme={toggleTheme}
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
