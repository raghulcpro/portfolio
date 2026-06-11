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
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
  },
  {
    title: 'Data & BI',
    icons: [BarChart3, Database],
    skills: ['Power BI', 'Tableau', 'DAX', 'KPI Design', 'Slicers'],
    color: '#22d3ee',
    bg: 'rgba(34,211,238,0.08)',
  },
  {
    title: 'Mobile',
    icons: [Smartphone, Flame],
    skills: ['Flutter', 'Firebase'],
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
  },
  {
    title: 'Design',
    icons: [Figma, Layers],
    skills: ['Figma', 'Prototyping'],
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
  },
  {
    title: 'Tools',
    icons: [GitBranch, Github],
    skills: ['Git', 'GitHub'],
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0, y: 28, scale: 0.97, duration: 0.6, ease: 'power3.out', clearProps: 'all',
            scrollTrigger: { trigger: card, start: 'top 95%', once: true },
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="grainy-mesh-wrapper">
      <div className="grainy-mesh" />
      <div className="gooey-orb" />

      <section
        id="skills"
        ref={sectionRef}
        className="relative"
        style={{ padding: 'var(--section-pad-y) var(--section-pad-x)', zIndex: 1 }}
      >
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          {/* Header */}
          <div className="text-center mb-14">
            <p className="eyebrow mb-4">Expertise</p>
            <h2 className="section-heading">Skills & Technologies</h2>
          </div>

          {/* Cards Grid */}
          <div
            ref={cardsRef}
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5"
          >
            {SKILL_CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className="skill-card glass-card p-6 flex flex-col"
                style={{ background: cat.bg, borderColor: `${cat.color}22` }}
              >
                {/* Icons row */}
                <div className="flex items-center gap-2.5 mb-4">
                  {cat.icons.map((Icon, j) => (
                    <Icon key={j} size={17} style={{ color: cat.color }} />
                  ))}
                </div>

                {/* Title */}
                <h4
                  className="font-display font-bold mb-4"
                  style={{ fontSize: 15, color: 'var(--text-primary)' }}
                >
                  {cat.title}
                </h4>

                {/* Pills */}
                <div className="flex flex-wrap -m-0.5 mt-auto">
                  {cat.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="skill-pill"
                      style={{
                        color: cat.color,
                        background: `${cat.color}15`,
                        borderColor: `${cat.color}30`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
