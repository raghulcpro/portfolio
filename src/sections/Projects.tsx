import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PowerBIIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
    <path d="M14 2h4.5a1.5 1.5 0 0 1 1.5 1.5v17a1.5 1.5 0 0 1-1.5 1.5H14V2z" fill={color} />
    <path d="M9 8h4.5a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5H9V8z" fill={color} opacity="0.75" />
    <path d="M4 13h4.5a1.5 1.5 0 0 1 1.5 1.5v5.5a1.5 1.5 0 0 1-1.5 1.5H4v-8.5z" fill={color} opacity="0.5" />
  </svg>
);

const FlutterIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 56 56" fill="none" width="52" height="52">
    <polygon points="10,28 28,10 37,10 19,28" fill={color} opacity="0.45" />
    <polygon points="19,28 37,10 46,10 37,19 28,28" fill={color} opacity="85" />
    <polygon points="19,28 28,37 37,28 28,19" fill={color} opacity="0.38" />
    <polygon points="28,37 37,46 46,46 37,37 28,28" fill={color} />
    <polygon points="28,37 19,46 28,46 37,46" fill={color} opacity="0.55" />
  </svg>
);

const AndroidIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 56 56" fill="none" width="52" height="52">
    <line x1="19" y1="16" x2="14" y2="10" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <line x1="37" y1="16" x2="42" y2="10" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <circle cx="14" cy="10" r="2" fill={color} opacity="0.7" />
    <circle cx="42" cy="10" r="2" fill={color} opacity="0.7" />
    <rect x="14" y="16" width="28" height="16" rx="14" fill={color} opacity="0.85" />
    <circle cx="22" cy="24" r="2.5" fill="white" opacity="0.9" />
    <circle cx="34" cy="24" r="2.5" fill="white" opacity="0.9" />
    <rect x="10" y="34" width="36" height="16" rx="4" fill={color} opacity="0.6" />
    <rect x="4" y="34" width="5" height="12" rx="2.5" fill={color} opacity="0.45" />
    <rect x="47" y="34" width="5" height="12" rx="2.5" fill={color} opacity="0.45" />
  </svg>
);

const InvestIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 56 56" fill="none" width="52" height="52">
    <line x1="14" y1="10" x2="14" y2="46" stroke={color} strokeWidth="1.5" opacity="0.25" />
    <rect x="10" y="20" width="8" height="16" rx="1.5" fill={color} opacity="0.40" />
    <line x1="26" y1="8" x2="26" y2="48" stroke={color} strokeWidth="1.5" opacity="0.25" />
    <rect x="22" y="14" width="8" height="22" rx="1.5" fill={color} opacity="0.70" />
    <line x1="38" y1="12" x2="38" y2="44" stroke={color} strokeWidth="1.5" opacity="0.25" />
    <rect x="34" y="18" width="8" height="14" rx="1.5" fill={color} opacity="1" />
    <polyline points="8,38 20,26 32,30 48,14" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
    <polygon points="48,14 42,14 48,20" fill={color} opacity="0.6" />
  </svg>
);

type ProjectIcon = ({ color }: { color: string }) => React.ReactElement;
const PROJECT_ICONS: ProjectIcon[] = [PowerBIIcon, FlutterIcon, AndroidIcon, InvestIcon];

const PROJECTS = [
  {
    title: 'Blinkit Sales Analytics Dashboard',
    role: 'Data Analytics · Power BI',
    accentColor: '#22d3ee',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    tagline: 'Real-time retail intelligence at a glance',
    problem: 'Retail sales data was fragmented across multiple sources with no unified view.',
    built: 'Interactive Power BI dashboard tracking ₹1.20M in sales across 8,500+ products with dynamic DAX-powered slicers.',
    result: 'Uncovered that Supermarket Type 1 drives 65% of total revenue, producing actionable insight for inventory.',
    tags: ['Power BI', 'DAX', 'Data Modeling', 'KPI Design'],
    github: 'https://github.com/raghulcpro',
    hasLiveDemo: true,
  },
  {
    title: 'Marketing Management System — Samsel',
    role: 'Mobile · Flutter, Firebase',
    accentColor: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    tagline: 'Field sales ops, unified in one app',
    problem: 'Field sales team lacked a unified tool to manage territories and track performance.',
    built: 'Cross-platform field-sales app using Flutter & Firebase with live GPS location tracking for field agents.',
    result: 'Enabled real-time territory coverage monitoring and streamlined sales operations.',
    tags: ['Flutter', 'Firebase', 'Real-time GPS'],
    github: 'https://github.com/raghulcpro',
    hasLiveDemo: false,
  },
  {
    title: 'Online Book Rental Application',
    role: 'Mobile · Java, Android',
    accentColor: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    tagline: 'Books on demand, anytime',
    problem: 'No easy way for students to browse, rent, and manage book rentals locally.',
    built: 'Android app for browsing, renting, and managing books with a complete rental workflow.',
    result: 'Simplified the rental process with listing, duration selection, and return management.',
    tags: ['Java', 'Android', 'XML'],
    github: 'https://github.com/raghulcpro',
    hasLiveDemo: false,
  },
  {
    title: 'Micro-Investment Platform',
    role: 'UI/UX Design · Figma',
    accentColor: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #f43f5e 100%)',
    tagline: 'Investing made approachable for everyone',
    problem: 'First-time investors find existing platforms overwhelming and complex.',
    built: 'Intuitive Figma prototype for stock and crypto micro-investments with simplified onboarding.',
    result: 'Designed a user-friendly entry point for investors with no financial background.',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
    github: 'https://github.com/raghulcpro',
    hasLiveDemo: false,
  },
];

export default function Projects() {
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
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.from(Array.from(cards), {
          opacity: 0, y: 40, scale: 0.97, stagger: 0.1, duration: 0.75, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', once: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--bg-mid)',
      }}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 65%)',
      }} />

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="eyebrow mb-4">Portfolio</p>
          <h2 className="section-heading mb-4">Featured Projects</h2>
          <p className="font-body mx-auto" style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 440, lineHeight: 1.7 }}>
            Things I've built — from data dashboards to mobile apps.
          </p>
        </div>

        {/* Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS.map((project, i) => (
            <article
              key={i}
              className="project-card group relative flex flex-col cursor-default"
              style={{ perspective: '1000px' }}
            >
              {/* Ambient Glow behind the card */}
              <div
                className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[32px]"
                style={{
                  background: project.gradient,
                  filter: 'blur(28px)',
                  transform: 'translateZ(-1px)',
                }}
              />

              {/* Main Card Wrapper (Provides the gradient border) */}
              <div
                className="relative flex-1 flex flex-col rounded-[32px] transition-all duration-500"
                style={{
                  padding: '2px', // Border thickness
                  background: project.gradient,
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
                  className="relative flex-1 flex flex-col p-6 sm:p-8 rounded-[30px] overflow-hidden"
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

                  {/* Icon & Role header */}
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="relative">
                      {/* Icon Glow */}
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 blur-xl opacity-30 mix-blend-screen transition-opacity duration-500 group-hover:opacity-60"
                        style={{ background: project.accentColor }}
                      />
                      <div 
                        className="relative flex items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                        style={{
                          width: 56, height: 56,
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-glass)',
                          boxShadow: 'none',
                        }}
                      >
                        {(() => { const Icon = PROJECT_ICONS[i]; return <Icon color={project.accentColor} />; })()}
                      </div>
                    </div>
                    
                    {/* Role badge */}
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 10,
                        padding: '4px 10px',
                        borderRadius: 20,
                        color: project.accentColor,
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-glass)',
                        letterSpacing: '0.04em',
                        fontWeight: 600,
                      }}
                    >
                      {project.role}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="relative z-10 mb-6">
                    <h3
                      className="font-display font-bold mb-2"
                      style={{ fontSize: 22, color: 'var(--text-primary)', lineHeight: 1.3 }}
                    >
                      {project.title}
                    </h3>
                    <p className="font-body" style={{ fontSize: 13, color: project.accentColor, fontStyle: 'italic', opacity: 0.9 }}>
                      {project.tagline}
                    </p>
                  </div>

                  {/* Problem / Built / Result */}
                  <div className="space-y-4 mb-8 relative z-10 flex-1">
                    {[
                      { label: 'Problem', text: project.problem, color: 'var(--text-secondary)' },
                      { label: 'Built',   text: project.built,   color: 'var(--text-secondary)' },
                      { label: 'Result',  text: project.result,  color: 'var(--text-primary)' },
                    ].map(({ label, text, color }) => (
                      <p key={label} style={{ fontSize: 14, lineHeight: 1.65, color }}>
                        <span
                          className="font-mono font-semibold mr-1.5"
                          style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                        >
                          {label} ·{' '}
                        </span>
                        {text}
                      </p>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="font-mono"
                        style={{
                          fontSize: 11,
                          color: 'var(--text-primary)',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-glass)',
                          padding: '4px 12px',
                          borderRadius: 8,
                          letterSpacing: '0.03em',
                          fontWeight: 500,
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${project.accentColor}30`;
                          e.currentTarget.style.borderColor = `${project.accentColor}60`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--bg-surface)';
                          e.currentTarget.style.borderColor = 'var(--border-glass)';
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div
                    className="flex items-center gap-5 pt-5 relative z-10"
                    style={{ borderTop: '1px solid var(--border-glass)' }}
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-body font-semibold transition-all duration-200 group/link"
                      style={{ fontSize: 13, color: project.accentColor, textDecoration: 'none' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.75'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                    >
                      <Github size={16} />
                      View on GitHub
                      <ArrowUpRight size={14} />
                    </a>
                    {project.hasLiveDemo && (
                      <a
                        href="#"
                        className="flex items-center gap-2 font-body font-medium transition-colors duration-200"
                        style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
                      >
                        Live Demo
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
