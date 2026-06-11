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
    year: '2022 – 2024',
    accent: '#6366f1',
  },
  {
    degree: 'B.Com',
    field: 'Bachelor of Commerce',
    institution: 'Agurchand Manmull Jain College',
    score: 'CGPA 8.7',
    year: '2019 – 2022',
    accent: '#22d3ee',
  },
  {
    degree: 'HSC',
    field: 'Higher Secondary Certificate',
    institution: 'Sri Ahobila Math Oriental Hr. Sec.',
    score: 'Score 9.1',
    year: '2019',
    accent: '#8b5cf6',
  },
  {
    degree: 'SSLC',
    field: 'Secondary School',
    institution: 'Sri Tarachand Galada Jain School',
    score: 'CGPA 7.89',
    year: '2017',
    accent: '#f59e0b',
  },
];

export default function Education() {
  const sectionRef  = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const nodes = timelineRef.current?.querySelectorAll('.timeline-node');
      const items = timelineRef.current?.querySelectorAll('.timeline-item');

      if (nodes) {
        nodes.forEach(node => {
          gsap.from(node, {
            scale: 0, duration: 0.45, ease: 'back.out(2)', clearProps: 'all',
            scrollTrigger: { trigger: node, start: 'top 95%', once: true },
          });
        });
      }
      if (items) {
        items.forEach(item => {
          gsap.from(item, {
            opacity: 0, x: 20, duration: 0.6, ease: 'power3.out', clearProps: 'all',
            scrollTrigger: { trigger: item, start: 'top 95%', once: true },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--bg-base)',
      }}
    >
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">Background</p>
          <h2 className="section-heading">Education</h2>
        </div>

        {/* Timeline */}
        <div
          ref={timelineRef}
          className="relative"
          style={{ maxWidth: 680, margin: '0 auto' }}
        >
          {/* Vertical line */}
          <div
            className="absolute top-3 bottom-3"
            style={{
              left: 22,
              width: 2,
              background: 'linear-gradient(180deg, var(--accent-indigo), var(--accent-cyan), transparent)',
              borderRadius: 1,
            }}
          />

          <div className="space-y-10">
            {EDUCATION.map((edu, i) => (
              <div key={i} className="relative flex items-start gap-7">
                {/* Node */}
                <div
                  className="timeline-node relative z-10 flex-shrink-0 flex items-center justify-center rounded-full"
                  style={{
                    width: 46,
                    height: 46,
                    background: `${edu.accent}18`,
                    border: `2px solid ${edu.accent}55`,
                    boxShadow: `0 0 16px ${edu.accent}25`,
                  }}
                >
                  <GraduationCap size={18} style={{ color: edu.accent }} />
                </div>

                {/* Card */}
                <div
                  className="timeline-item group glass-card flex-1 p-6 cursor-default"
                  style={{ borderColor: `${edu.accent}20` }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.borderColor = `${edu.accent}45`;
                    el.style.transform = 'translateX(4px)';
                    el.style.boxShadow = `0 12px 32px ${edu.accent}14`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.borderColor = `${edu.accent}20`;
                    el.style.transform = 'translateX(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div>
                      <span
                        className="font-display font-bold"
                        style={{ fontSize: 20, color: 'var(--text-primary)' }}
                      >
                        {edu.degree}
                      </span>
                      <span
                        className="font-body ml-2"
                        style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}
                      >
                        — {edu.field}
                      </span>
                    </div>
                    <span
                      className="font-mono font-medium rounded-full flex-shrink-0"
                      style={{
                        fontSize: 11,
                        padding: '3px 10px',
                        color: edu.accent,
                        background: `${edu.accent}14`,
                        border: `1px solid ${edu.accent}28`,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {edu.year}
                    </span>
                  </div>

                  {/* Institution */}
                  <p
                    className="font-body mb-3"
                    style={{ fontSize: 14, color: 'var(--text-secondary)' }}
                  >
                    {edu.institution}
                  </p>

                  {/* Score badge */}
                  <span
                    className="font-mono font-semibold"
                    style={{ fontSize: 13, color: edu.accent }}
                  >
                    {edu.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
