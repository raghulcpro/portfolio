import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2, Terminal, BarChart3, Database,
  Smartphone, Flame, Figma, Layers, GitBranch, Github,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: 'Programming',
    icons: [Code2, Terminal],
    skills: ['Python', 'Java', 'SQL'],
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    color: '#6366f1',
  },
  {
    title: 'Data & BI',
    icons: [BarChart3, Database],
    skills: ['Power BI', 'Tableau', 'DAX', 'KPI Design', 'Slicers'],
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    color: '#06b6d4',
  },
  {
    title: 'Mobile',
    icons: [Smartphone, Flame],
    skills: ['Flutter', 'Firebase'],
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    color: '#8b5cf6',
  },
  {
    title: 'Design',
    icons: [Figma, Layers],
    skills: ['Figma', 'Prototyping'],
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #f43f5e 100%)',
    color: '#f59e0b',
  },
  {
    title: 'Tools',
    icons: [GitBranch, Github],
    skills: ['Git', 'GitHub'],
    gradient: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
    color: '#10b981',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(Array.from(headerRef.current.children), {
          opacity: 0, y: 24, stagger: 0.1, duration: 0.7, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: headerRef.current, start: 'top 90%', once: true },
        });
      }
      if (cardsRef.current) {
        gsap.from(Array.from(cardsRef.current.children), {
          opacity: 0, y: 40, scale: 0.95, stagger: 0.1, duration: 0.8, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', once: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--bg-base)',
      }}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 65%)',
      }} />

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="eyebrow mb-4">Expertise</p>
          <h2 className="section-heading mb-4">Skills & Technologies</h2>
          <p className="font-body mx-auto" style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 440, lineHeight: 1.7 }}>
            Tools and technologies I use to build data products and mobile applications.
          </p>
        </div>

        {/* Bento Grid */}
        <div 
          ref={cardsRef} 
          className="flex flex-wrap justify-center gap-6"
        >
          {SKILL_CATEGORIES.map((cat, i) => (
            <div
              key={i}
              className="group relative flex flex-col cursor-default"
              style={{
                width: '100%',
                maxWidth: '340px',
                flex: '1 1 300px',
                perspective: '1000px',
              }}
            >
              {/* Ambient Glow behind the card */}
              <div
                className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[32px]"
                style={{
                  background: cat.gradient,
                  filter: 'blur(28px)',
                  transform: 'translateZ(-1px)',
                }}
              />

              {/* Main Card Wrapper (Provides the gradient border) */}
              <div
                className="relative flex-1 flex flex-col rounded-[32px] transition-all duration-500"
                style={{
                  padding: '2px', // Border thickness
                  background: cat.gradient,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {/* Inner Card Content */}
                <div
                  className="relative flex-1 flex flex-col p-7 sm:p-8 rounded-[30px] overflow-hidden"
                  style={{
                    background: 'var(--bg-card)',
                    backdropFilter: 'blur(20px)',
                    backgroundColor: 'rgba(11, 14, 25, 0.95)',
                  }}
                >
                  {/* Subtle noise/grid overlay inside the card */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: '16px 16px',
                  }} />

                  {/* Top highlight for 3D feel */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px] opacity-40"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)`,
                    }}
                  />

                  {/* Icons row with Glow */}
                  <div className="mb-6 relative z-10">
                    <div
                      className="absolute top-1/2 left-0 -translate-y-1/2 w-20 h-16 blur-xl opacity-20 mix-blend-screen transition-opacity duration-500 group-hover:opacity-50"
                      style={{ background: cat.color }}
                    />
                    <div className="flex items-center gap-3 relative">
                      {cat.icons.map((Icon, j) => (
                        <div
                          key={j}
                          className="flex items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                          style={{
                            width: 48, height: 48,
                            background: `rgba(255,255,255,0.04)`,
                            border: `1px solid rgba(255,255,255,0.1)`,
                            boxShadow: `inset 0 2px 10px rgba(255,255,255,0.05)`,
                          }}
                        >
                          <Icon size={22} style={{ color: '#fff' }} strokeWidth={2} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h4
                    className="font-display font-bold mb-5 relative z-10"
                    style={{ fontSize: 20, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                  >
                    {cat.title}
                  </h4>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                    {cat.skills.map((skill, j) => (
                      <span
                        key={j}
                        style={{
                          fontSize: 12,
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                          color: '#fff',
                          background: `rgba(255,255,255,0.05)`,
                          border: `1px solid rgba(255,255,255,0.1)`,
                          padding: '5px 12px',
                          borderRadius: 20,
                          letterSpacing: '0.01em',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${cat.color}30`;
                          e.currentTarget.style.borderColor = `${cat.color}60`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `rgba(255,255,255,0.05)`;
                          e.currentTarget.style.borderColor = `rgba(255,255,255,0.1)`;
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
