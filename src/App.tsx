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

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

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
      {/* Loading Screen */}
      {loading && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-500"
          style={{
            background: 'var(--bg-base)',
            opacity: loading ? 1 : 0,
            pointerEvents: loading ? 'auto' : 'none',
          }}
        >
        <div className="flex flex-col items-center gap-4">
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(99,102,241,0.45)',
              animation: 'pulse-glow 1.4s ease-in-out infinite',
            }}
          >
            <span
              style={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                fontSize: 22,
                color: '#fff',
                letterSpacing: '-0.04em',
              }}
            >
              RV
            </span>
          </div>
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 13,
              color: 'var(--text-muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Loading…
          </p>
        </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      >
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
