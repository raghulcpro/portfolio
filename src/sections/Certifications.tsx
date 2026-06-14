import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BadgeCheck, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CourseraIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 52 52" fill="none" width="28" height="28">
    <circle cx="26" cy="26" r="24" fill={color} opacity="0.15" />
    <text x="26" y="34" textAnchor="middle" fontFamily="'Syne',sans-serif" fontWeight="800" fontSize="22" fill={color}>C</text>
    <circle cx="26" cy="26" r="24" stroke={color} strokeWidth="2" fill="none" opacity="0.35" />
  </svg>
);

const PythonIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
    <path d="M14 2C9.6 2 7 4 7 7v3h7v1H5C2.8 11 1 13 1 16s1.8 5 4 5h2v-3.5C7 15 9 13 12 13h8c2.2 0 4-1.8 4-4V7c0-3-2.6-5-10-5zm-2 3.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill={color} opacity="0.75" />
    <path d="M14 26c4.4 0 7-2 7-5v-3h-7v-1h9c2.2 0 4-2 4-5s-1.8-5-4-5h-2v3.5C21 13 19 15 16 15H8c-2.2 0-4 1.8-4 4v3c0 3 2.6 5 10 5zm2-3.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill={color} />
  </svg>
);

const JavaIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
    <path d="M10 20s-1.5.9 1 1.2c3 .4 4.5.3 7.8-.3 0 0 .9.5 2 1C14 24 5.5 21.6 10 20z" fill={color} opacity="0.7" />
    <path d="M9 17.5s-1.6 1.2 1.8 1.4c3.9.3 7-.1 9.5-.9 0 0 .6.6 1.6 1C14 21.3 4.5 19.8 9 17.5z" fill={color} opacity="0.8" />
    <path d="M15.7 12.5c1.7 2-1.5 3.7-1.5 3.7s4.3-2.2 2.3-5c-1.8-2.6-3.2-3.9 4.4-8.3 0 0-12 3-5.2 9.6z" fill={color} />
    <path d="M10.7 14.3s-7 1.7-2.5 2.3c2 .3 5.8.2 9.4-.1 3-.3 6-.8 6-.8s-1 .5-1.8.9C17 18.1 7 17.8 4.8 17c-2-1 5.9-2.7 5.9-2.7z" fill={color} opacity="0.9" />
    <path d="M17 3s4 4-3.8 10c-6.2 4.9-1.4 7.7 0 10.9-3.6-3.3-6.3-6.1-4.5-8.8C11.3 11.2 18.7 9.4 17 3z" fill={color} opacity="0.85" />
  </svg>
);

const FigmaIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
    <rect x="6" y="2" width="7" height="7" rx="3.5" fill={color} opacity="0.5" />
    <rect x="15" y="2" width="7" height="7" rx="3.5" fill={color} opacity="0.8" />
    <rect x="6" y="10.5" width="7" height="7" rx="3.5" fill={color} />
    <circle cx="18.5" cy="14" r="3.5" fill={color} opacity="0.7" />
    <rect x="6" y="19" width="7" height="7" rx="3.5" fill={color} opacity="0.6" />
  </svg>
);

const BlockchainIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
    <polygon points="14,2 22,6.5 22,15.5 14,20 6,15.5 6,6.5" stroke={color} strokeWidth="1.5" fill={`${color}20`} />
    <polygon points="14,8 18,10.5 18,15.5 14,18 10,15.5 10,10.5" stroke={color} strokeWidth="1.5" fill={`${color}35`} />
    <circle cx="14" cy="14" r="2.5" fill={color} />
  </svg>
);

type CertIcon = typeof CourseraIcon;
const CERT_ICONS: CertIcon[] = [CourseraIcon, PythonIcon, JavaIcon, FigmaIcon, BlockchainIcon];

const CERTIFICATIONS = [
  { title: 'Advanced Data Analytics',         provider: 'Coursera',              category: 'Data Science', accent: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', year: '2025' },
  { title: 'Data Analytics using Python',     provider: 'NPTEL',                 category: 'Programming',  accent: '#22d3ee', gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', year: '2024' },
  { title: 'Core Java & Full-Stack Development', provider: 'Inlustr',             category: 'Development',  accent: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', year: '2026' },
  { title: 'UI/UX Design',                    provider: 'TVS Training & Services',category: 'Design',       accent: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #f43f5e 100%)', year: '2025' },
  { title: 'Basics in Blockchain',            provider: 'Great Learning',         category: 'Web3',         accent: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)', year: '2024' },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgesRef  = useRef<HTMLDivElement>(null);
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
      const badges = badgesRef.current?.querySelectorAll('.cert-badge');
      if (badges) {
        gsap.from(Array.from(badges), {
          opacity: 0, y: 32, scale: 0.95, stagger: 0.08, duration: 0.65, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: badgesRef.current, start: 'top 88%', once: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--bg-base)',
      }}
    >
      {/* Ambient glows */}
      <div className="absolute pointer-events-none" style={{
        width: 500, height: 500, top: -100, left: -150,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)',
        filter: 'blur(50px)',
      }} />
      <div className="absolute pointer-events-none" style={{
        width: 400, height: 400, bottom: -80, right: -100,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 65%)',
        filter: 'blur(50px)',
      }} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="eyebrow mb-4">Credentials</p>
          <h2 className="section-heading mb-4">Certifications</h2>
          <p className="font-body mx-auto" style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 400, lineHeight: 1.7 }}>
            Verified credentials from globally recognised platforms.
          </p>
        </div>

        {/* Cert Cards */}
        <div
          ref={badgesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={i}
              className="cert-badge group relative flex flex-col cursor-default"
              style={{ perspective: '1000px' }}
            >
              {/* Ambient Glow behind the card */}
              <div
                className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]"
                style={{
                  background: cert.gradient,
                  filter: 'blur(20px)',
                  transform: 'translateZ(-1px)',
                }}
              />

              {/* Main Card Wrapper */}
              <div
                className="relative flex-1 flex flex-col rounded-[24px] transition-all duration-500"
                style={{
                  padding: '2px', // Border thickness
                  background: cert.gradient,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {/* Inner Card Content */}
                <div
                  className="relative flex-1 flex flex-col p-6 rounded-[22px] overflow-hidden"
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

                  {/* Top row: icon + year */}
                  <div className="flex items-start justify-between mb-5 relative z-10">
                    <div className="relative">
                      {/* Icon Glow */}
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 blur-xl opacity-30 mix-blend-screen transition-opacity duration-500 group-hover:opacity-60"
                        style={{ background: cert.accent }}
                      />
                      <div
                        className="relative flex items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                        style={{
                          width: 48, height: 48,
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-glass)',
                          boxShadow: 'none',
                        }}
                      >
                        {(() => { const Icon = CERT_ICONS[i]; return <Icon color={cert.accent} />; })()}
                      </div>
                    </div>
                    
                    <span
                      className="font-mono font-medium rounded-full"
                      style={{
                        fontSize: 10.5,
                        padding: '3px 10px',
                        color: cert.accent,
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-glass)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {cert.year}
                    </span>
                  </div>

                  {/* Category */}
                  <span
                    className="font-mono inline-block mb-2 relative z-10"
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: cert.accent,
                      opacity: 0.9,
                    }}
                  >
                    {cert.category}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-display font-bold mb-4 leading-snug relative z-10 flex-1"
                    style={{ fontSize: 16, color: 'var(--text-primary)' }}
                  >
                    {cert.title}
                  </h3>

                  {/* Provider row */}
                  <div
                    className="flex items-center justify-between pt-4 relative z-10"
                    style={{ borderTop: '1px solid var(--border-glass)' }}
                  >
                    <div className="flex items-center gap-2">
                      <BadgeCheck size={14} style={{ color: cert.accent, flexShrink: 0 }} />
                      <span className="font-body" style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontWeight: 500 }}>
                        {cert.provider}
                      </span>
                    </div>
                    <ExternalLink
                      size={13}
                      className="opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                      style={{ color: cert.accent }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Summary card */}
          <div
            className="cert-badge group relative flex flex-col cursor-default"
            style={{ perspective: '1000px', gridColumn: '1 / -1', '@media (min-width: 640px)': { gridColumn: 'span 2' }, '@media (min-width: 1024px)': { gridColumn: 'auto' } } as any}
          >
            <div
              className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
                filter: 'blur(20px)',
                transform: 'translateZ(-1px)',
              }}
            />
            <div
              className="relative flex-1 flex flex-col rounded-[24px] transition-all duration-500"
              style={{
                padding: '2px', // Border thickness
                background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}
            >
              <div
                className="relative flex-1 flex flex-col p-6 items-center justify-center text-center rounded-[22px] overflow-hidden"
                style={{
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(20px)',
                  minHeight: 210,
                }}
              >
                <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                  backgroundSize: '16px 16px',
                }} />
                
                <span
                  className="font-display font-bold block mb-2 relative z-10"
                  style={{
                    fontSize: 72, lineHeight: 1,
                    background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  5
                </span>
                <span className="font-display font-bold block mb-2 relative z-10" style={{ fontSize: 16, color: 'var(--text-primary)' }}>
                  Certifications Earned
                </span>
                <span className="font-body relative z-10" style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 160, lineHeight: 1.6 }}>
                  Across Data, Dev, Design & Web3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
