import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, CalendarDays, MapPin, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BULLETS = [
  'Developed a cross-platform mobile application using Flutter with a responsive UI for Android and iOS.',
  'Implemented core features including user authentication, navigation flows, and dynamic content loading.',
  'Debugged critical issues and optimized application performance through improved state management.',
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
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
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0, y: 40, scale: 0.97, duration: 0.75, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: cardRef.current, start: 'top 88%', once: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--bg-mid)',
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 65%)',
      }} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="eyebrow mb-4">Experience</p>
          <h2 className="section-heading">Where I've Worked</h2>
        </div>

        {/* Single experience card */}
        <div className="flex justify-center">
          <div ref={cardRef} className="group relative flex flex-col cursor-default" style={{ maxWidth: 780, width: '100%', perspective: '1000px' }}>
            {/* Ambient Glow behind the card */}
            <div
              className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[32px]"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
                filter: 'blur(28px)',
                transform: 'translateZ(-1px)',
              }}
            />

            {/* Main Card Wrapper */}
            <div
              className="relative flex-1 flex flex-col rounded-[32px] transition-all duration-500"
              style={{
                padding: '2px', // Border thickness
                background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              {/* Inner Card Content */}
              <div
                className="relative flex-1 flex flex-col p-8 lg:p-10 rounded-[30px] overflow-hidden"
                style={{
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Subtle noise overlay */}
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

                {/* Company badge row */}
                <div className="flex flex-wrap items-center gap-3 mb-6 relative z-10">
                  <div
                    className="flex items-center gap-2 rounded-full px-4 py-2"
                    style={{
                      background: 'rgba(99,102,241,0.15)',
                      border: '1px solid rgba(99,102,241,0.3)',
                    }}
                  >
                    <Briefcase size={13} style={{ color: '#818cf8' }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: '#818cf8' }}>
                      Samsel
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 rounded-full px-3 py-2"
                    style={{
                      background: 'rgba(34,211,238,0.15)',
                      border: '1px solid rgba(34,211,238,0.3)',
                    }}
                  >
                    <CalendarDays size={12} style={{ color: '#22d3ee' }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, fontWeight: 500, color: '#22d3ee', letterSpacing: '0.04em' }}>
                      2026
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 rounded-full px-3 py-2"
                    style={{
                      background: 'rgba(16,185,129,0.15)',
                      border: '1px solid rgba(16,185,129,0.3)',
                    }}
                  >
                    <MapPin size={12} style={{ color: '#34d399' }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11.5, fontWeight: 500, color: '#34d399' }}>
                      Internship
                    </span>
                  </div>
                </div>

                {/* Role title */}
                <h3
                  className="font-display font-bold mb-7 relative z-10"
                  style={{ fontSize: 26, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
                >
                  Flutter App Developer{' '}
                  <span className="text-gradient">Intern</span>
                </h3>

                {/* Bullets */}
                <ul className="space-y-4 relative z-10">
                  {BULLETS.map((bullet, i) => (
                    <li key={i} className="flex gap-4 items-start group">
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-lg mt-[2px]"
                        style={{
                          width: 26, height: 26,
                          background: 'rgba(99,102,241,0.15)',
                          border: '1px solid rgba(99,102,241,0.3)',
                        }}
                      >
                        <Zap size={12} style={{ color: '#818cf8' }} />
                      </div>
                      <p
                        className="font-body"
                        style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)' }}
                      >
                        {bullet}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Skills used */}
                <div className="mt-8 pt-6 flex flex-wrap gap-2 relative z-10" style={{ borderTop: '1px solid var(--border-glass)' }}>
                  {['Flutter', 'Dart', 'Firebase', 'State Management', 'REST APIs'].map(skill => (
                    <span
                      key={skill}
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        padding: '4px 12px',
                        borderRadius: 8,
                        color: 'var(--text-primary)',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-glass)',
                        letterSpacing: '0.03em',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `rgba(99,102,241,0.3)`;
                        e.currentTarget.style.borderColor = `rgba(99,102,241,0.6)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--bg-surface)';
                        e.currentTarget.style.borderColor = 'var(--border-glass)';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
