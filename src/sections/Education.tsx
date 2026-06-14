import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EDUCATION = [
  {
    degree: 'MCA',
    field: 'Master of Computer Applications',
    institution: 'D.D.G.D. Vaishnav College',
    score: 'CGPA 7.8',
    year: '2024 – 2026',
    accent: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
  },
  {
    degree: 'B.Com',
    field: 'Bachelor of Commerce',
    institution: 'Agurchand Manmull Jain College',
    score: 'CGPA 8.7',
    year: '2020 – 2023',
    accent: '#22d3ee',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  },
  {
    degree: 'HSC',
    field: 'Higher Secondary Certificate',
    institution: 'Sri Ahobila Math Oriental Hr. Sec.',
    score: 'Score 9.1',
    year: '2020',
    accent: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
  },
  {
    degree: 'SSLC',
    field: 'Secondary School',
    institution: 'Sri Tarachand Galada Jain School',
    score: 'CGPA 7.89',
    year: '2018',
    accent: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #f43f5e 100%)',
  },
];

export default function Education() {
  const sectionRef  = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(Array.from(headerRef.current.children), {
          opacity: 0, y: 24, stagger: 0.1, duration: 0.7, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: headerRef.current, start: 'top 90%', once: true },
        });
      }
      const nodes = timelineRef.current?.querySelectorAll('.timeline-node');
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      if (nodes) {
        gsap.from(Array.from(nodes), {
          scale: 0, stagger: 0.1, duration: 0.5, ease: 'back.out(2)', clearProps: 'all',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 88%', once: true },
        });
      }
      if (items) {
        gsap.from(Array.from(items), {
          opacity: 0, x: 30, stagger: 0.1, duration: 0.65, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 88%', once: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--bg-mid)',
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 65%)',
      }} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="eyebrow mb-4">Background</p>
          <h2 className="section-heading">Education</h2>
        </div>

        {/* Timeline */}
        <div
          ref={timelineRef}
          className="relative"
          style={{ maxWidth: 720, margin: '0 auto' }}
        >
          {/* Vertical line */}
          <div
            className="absolute top-5 bottom-5"
            style={{
              left: 22,
              width: 2,
              background: 'linear-gradient(180deg, #6366f1 0%, #22d3ee 40%, #8b5cf6 70%, transparent 100%)',
              borderRadius: 2,
              opacity: 0.35,
            }}
          />

          <div className="space-y-6">
            {EDUCATION.map((edu, i) => (
              <div key={i} className="relative flex items-start gap-7">
                {/* Node */}
                <div
                  className="timeline-node relative z-20 flex-shrink-0 flex items-center justify-center rounded-full"
                  style={{
                    width: 46, height: 46,
                    background: `${edu.accent}14`,
                    border: `2px solid ${edu.accent}45`,
                    boxShadow: `0 0 20px ${edu.accent}20`,
                  }}
                >
                  <GraduationCap size={17} style={{ color: edu.accent }} />
                </div>

                {/* Card Wrapper */}
                <div className="timeline-item group relative flex-1 flex flex-col cursor-default" style={{ perspective: '1000px' }}>
                  {/* Ambient Glow behind the card */}
                  <div
                    className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]"
                    style={{
                      background: edu.gradient,
                      filter: 'blur(20px)',
                      transform: 'translateZ(-1px)',
                    }}
                  />

                  {/* Main Card Wrapper */}
                  <div
                    className="relative flex-1 flex flex-col rounded-[24px] transition-all duration-500"
                    style={{
                      padding: '2px', // Border thickness
                      background: edu.gradient,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(6px) scale(1.01)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0) scale(1)';
                    }}
                  >
                    {/* Inner Card Content */}
                    <div
                      className="relative flex-1 flex flex-col p-5 sm:p-6 rounded-[22px] overflow-hidden"
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

                      {/* Left accent bar inside */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-[4px]"
                        style={{ background: edu.accent }}
                      />

                      <div className="pl-3 relative z-10">
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <span
                              className="font-display font-bold"
                              style={{ fontSize: 19, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                            >
                              {edu.degree}
                            </span>
                            <span
                              className="font-body ml-2"
                              style={{ fontSize: 13.5, color: edu.accent, fontWeight: 500 }}
                            >
                              — {edu.field}
                            </span>
                          </div>
                          <span
                            className="font-mono font-medium rounded-full flex-shrink-0"
                            style={{
                              fontSize: 10.5,
                              padding: '3px 10px',
                              color: 'var(--text-primary)',
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--border-glass)',
                              letterSpacing: '0.03em',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {edu.year}
                          </span>
                        </div>

                        {/* Institution */}
                        <p className="font-body mb-3" style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                          {edu.institution}
                        </p>

                        {/* Score */}
                        <span
                          className="font-mono font-semibold"
                          style={{ 
                            fontSize: 12.5, 
                            color: edu.accent,
                            background: `${edu.accent}15`,
                            padding: '4px 10px',
                            borderRadius: '6px',
                            display: 'inline-block',
                          }}
                        >
                          {edu.score}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
