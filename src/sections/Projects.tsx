import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── Project SVG Icons ──────────────────────────────────────
const PowerBIIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
    {/* Stacked bar chart — Power BI style */}
    <rect x="8" y="28" width="10" height="20" rx="2" fill={color} opacity="0.4" />
    <rect x="23" y="18" width="10" height="30" rx="2" fill={color} opacity="0.65" />
    <rect x="38" y="8" width="10" height="40" rx="2" fill={color} opacity="1" />
    {/* Trend line */}
    <polyline points="13,26 28,16 43,6" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55" />
    <circle cx="13" cy="26" r="2.5" fill={color} opacity="0.6" />
    <circle cx="28" cy="16" r="2.5" fill={color} opacity="0.75" />
    <circle cx="43" cy="6" r="2.5" fill={color} />
  </svg>
);

const FlutterIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
    {/* Flutter logo — two chevrons */}
    <polygon points="10,28 28,10 37,10 19,28" fill={color} opacity="0.5" />
    <polygon points="19,28 37,10 46,10 37,19 28,28" fill={color} opacity="0.85" />
    <polygon points="19,28 28,37 37,28 28,19" fill={color} opacity="0.4" />
    <polygon points="28,37 37,46 46,46 37,37 28,28" fill={color} />
    <polygon points="28,37 19,46 28,46 37,46" fill={color} opacity="0.6" />
  </svg>
);

const AndroidIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
    {/* Android robot */}
    {/* Antennae */}
    <line x1="19" y1="16" x2="14" y2="10" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <line x1="37" y1="16" x2="42" y2="10" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <circle cx="14" cy="10" r="2" fill={color} opacity="0.7" />
    <circle cx="42" cy="10" r="2" fill={color} opacity="0.7" />
    {/* Head */}
    <rect x="14" y="16" width="28" height="16" rx="14" fill={color} opacity="0.85" />
    {/* Eyes */}
    <circle cx="22" cy="24" r="2.5" fill="white" opacity="0.9" />
    <circle cx="34" cy="24" r="2.5" fill="white" opacity="0.9" />
    {/* Body */}
    <rect x="10" y="34" width="36" height="16" rx="4" fill={color} opacity="0.65" />
    {/* Arms */}
    <rect x="4" y="34" width="5" height="12" rx="2.5" fill={color} opacity="0.5" />
    <rect x="47" y="34" width="5" height="12" rx="2.5" fill={color} opacity="0.5" />
    {/* Legs */}
    <rect x="16" y="50" width="8" height="4" rx="2" fill={color} opacity="0.5" />
    <rect x="32" y="50" width="8" height="4" rx="2" fill={color} opacity="0.5" />
  </svg>
);

const InvestIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
    {/* Candlestick chart */}
    <line x1="14" y1="10" x2="14" y2="46" stroke={color} strokeWidth="1.5" opacity="0.3" />
    <rect x="10" y="20" width="8" height="16" rx="1.5" fill={color} opacity="0.45" />
    <line x1="26" y1="8" x2="26" y2="48" stroke={color} strokeWidth="1.5" opacity="0.3" />
    <rect x="22" y="14" width="8" height="22" rx="1.5" fill={color} opacity="0.75" />
    <line x1="38" y1="12" x2="38" y2="44" stroke={color} strokeWidth="1.5" opacity="0.3" />
    <rect x="34" y="18" width="8" height="14" rx="1.5" fill={color} opacity="1" />
    {/* Upward arrow */}
    <polyline points="8,38 20,26 32,30 48,14" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
    <polygon points="48,14 42,14 48,20" fill={color} opacity="0.6" />
  </svg>
);

type ProjectIcon = ({ color }: { color: string }) => JSX.Element;
const PROJECT_ICONS: ProjectIcon[] = [PowerBIIcon, FlutterIcon, AndroidIcon, InvestIcon];

const PROJECTS = [
  {
    title: 'Blinkit Sales Analytics Dashboard',
    role: 'Data Analytics · Power BI',
    accentColor: '#22d3ee',
    problem: 'Retail sales data was fragmented across multiple sources with no unified view.',
    built: 'An interactive Power BI dashboard tracking ₹1.20M in sales across 8,500+ products with dynamic DAX-powered slicers for real-time drill-down.',
    result: 'Uncovered that Supermarket Type 1 drives 65% of total revenue, producing actionable insight for inventory and expansion strategy.',
    tags: ['Power BI', 'DAX', 'Data Modeling', 'KPI Design'],
    github: 'https://github.com/raghulcpro',
    hasLiveDemo: true,
  },
  {
    title: 'Marketing Management System — Samsel',
    role: 'Mobile · Flutter, Firebase',
    accentColor: '#8b5cf6',
    problem: 'Field sales team lacked a unified tool to manage territories and track performance.',
    built: 'A cross-platform field-sales management app using Flutter and Firebase with live GPS location tracking for field agents.',
    result: 'Enabled real-time territory coverage monitoring and streamlined sales operations.',
    tags: ['Flutter', 'Firebase', 'Real-time GPS'],
    github: 'https://github.com/raghulcpro',
    hasLiveDemo: false,
  },
  {
    title: 'Online Book Rental Application',
    role: 'Mobile · Java, Android',
    accentColor: '#6366f1',
    problem: 'No easy way for students to browse, rent, and manage book rentals locally.',
    built: 'An Android app for browsing, renting, and managing books with a complete rental workflow.',
    result: 'Simplified the book rental process with listing, duration selection, and return management.',
    tags: ['Java', 'Android', 'XML'],
    github: 'https://github.com/raghulcpro',
    hasLiveDemo: false,
  },
  {
    title: 'Micro-Investment Platform',
    role: 'UI/UX Design · Figma',
    accentColor: '#f59e0b',
    problem: 'First-time investors find existing platforms overwhelming and complex.',
    built: 'An intuitive Figma prototype for stock and crypto micro-investments with simplified onboarding.',
    result: 'Designed a user-friendly entry point for investors with no financial background.',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
    github: 'https://github.com/raghulcpro',
    hasLiveDemo: false,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0, y: 36, scale: 0.98, duration: 0.7, ease: 'power3.out', clearProps: 'all',
            scrollTrigger: { trigger: card, start: 'top 95%', once: true },
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'linear-gradient(180deg, var(--bg-mid) 0%, var(--bg-base) 100%)',
      }}
    >
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">Portfolio</p>
          <h2 className="section-heading">Featured Projects</h2>
        </div>

        {/* Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <article
              key={i}
              className="project-card group overflow-hidden"
              style={{
                background: 'var(--bg-surface-glass)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: `1px solid rgba(${hexToRgb(project.accentColor)}, 0.14)`,
                borderRadius: 'var(--radius-lg)',
                transition: 'all 0.35s cubic-bezier(0.34, 1.3, 0.64, 1)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-6px)';
                el.style.borderColor = `rgba(${hexToRgb(project.accentColor)}, 0.40)`;
                el.style.boxShadow = `0 20px 48px rgba(${hexToRgb(project.accentColor)}, 0.12)`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.borderColor = `rgba(${hexToRgb(project.accentColor)}, 0.14)`;
                el.style.boxShadow = 'none';
              }}
            >
              {/* SVG Icon Header */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  height: 120,
                  background: `linear-gradient(135deg, ${project.accentColor}18 0%, ${project.accentColor}06 100%)`,
                  borderBottom: `1px solid ${project.accentColor}22`,
                }}
              >
                <div
                  className="transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
                  aria-hidden="true"
                  style={{ filter: `drop-shadow(0 4px 12px ${project.accentColor}40)` }}
                >
                  {(() => { const Icon = PROJECT_ICONS[i]; return <Icon color={project.accentColor} />; })()}
                </div>
                {/* Top-right role badge */}
                <span
                  className="absolute top-3 right-3 font-mono text-[10px] font-medium px-2 py-1 rounded-full"
                  style={{
                    background: `${project.accentColor}18`,
                    color: project.accentColor,
                    border: `1px solid ${project.accentColor}30`,
                    letterSpacing: '0.04em',
                  }}
                >
                  {project.role}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3
                  className="font-display font-bold mb-4"
                  style={{ fontSize: 18, color: 'var(--text-primary)', lineHeight: 1.3 }}
                >
                  {project.title}
                </h3>

                {/* Problem / Built / Result */}
                <div className="space-y-2.5 mb-5">
                  {[
                    { label: 'Problem', text: project.problem, color: 'var(--text-secondary)' },
                    { label: 'Built',   text: project.built,   color: 'var(--text-secondary)' },
                    { label: 'Result',  text: project.result,  color: project.accentColor },
                  ].map(({ label, text, color }) => (
                    <p key={label} style={{ fontSize: 13.5, lineHeight: 1.65, color }}>
                      <span
                        className="font-mono font-medium mr-1.5"
                        style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em' }}
                      >
                        {label.toUpperCase()}
                      </span>
                      {text}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        color: project.accentColor,
                        background: `${project.accentColor}12`,
                        border: `1px solid ${project.accentColor}25`,
                        padding: '3px 10px',
                        borderRadius: 6,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-5 pt-1 border-t" style={{ borderColor: 'var(--border-glass)' }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body font-semibold flex items-center gap-1.5 transition-all duration-200 mt-4"
                    style={{ fontSize: 13, color: project.accentColor }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.gap = '8px')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.gap = '6px')}
                  >
                    <Github size={14} />
                    GitHub
                    <ExternalLink size={12} />
                  </a>
                  {project.hasLiveDemo && (
                    <a
                      href="#"
                      className="font-body font-semibold flex items-center gap-1.5 transition-colors duration-200 mt-4"
                      style={{ fontSize: 13, color: 'var(--text-muted)' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
                    >
                      Live Demo
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper: hex to rgb string for rgba()
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}
