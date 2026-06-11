import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BadgeCheck, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── SVG Icons ──────────────────────────────────────────────
const CourseraIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 52 52" fill="none" width="28" height="28">
    <circle cx="26" cy="26" r="24" fill={color} opacity="0.15" />
    <text x="26" y="34" textAnchor="middle" fontFamily="'Syne',sans-serif" fontWeight="800" fontSize="22" fill={color}>C</text>
    <circle cx="26" cy="26" r="24" stroke={color} strokeWidth="2" fill="none" opacity="0.4" />
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
    <path d="M22.1 22.2s1.2 1-1.3 1.7c-4.6 1.4-19 1.8-23.1.1-1.4-.6.8-1.5 1.7-1.7.8-.2 1.3-.1 1.3-.1-1.5-1-10 2.1-4.3 3 15.6 2.5 28.4-1.1 25.7-3z" fill={color} opacity="0.6" />
    <path d="M10.7 14.3s-7 1.7-2.5 2.3c2 .3 5.8.2 9.4-.1 3-.3 6-.8 6-.8s-1 .5-1.8.9C17 18.1 7 17.8 4.8 17c-2-1 5.9-2.7 5.9-2.7z" fill={color} opacity="0.9" />
    <path d="M19.7 18.7c4.5-2.3 2.4-4.6 1-4.3-.4.1-.5.2-.5.2s.1-.2.4-.3c3-1.1 5.3 3.2-1 4.8 0 0 .1-.1.1-.4z" fill={color} />
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
    <line x1="14" y1="2" x2="14" y2="8" stroke={color} strokeWidth="1.5" />
    <line x1="14" y1="18" x2="14" y2="20" stroke={color} strokeWidth="1.5" />
    <line x1="22" y1="6.5" x2="18" y2="10.5" stroke={color} strokeWidth="1" opacity="0.6" />
    <line x1="6" y1="6.5" x2="10" y2="10.5" stroke={color} strokeWidth="1" opacity="0.6" />
    <line x1="22" y1="15.5" x2="18" y2="15.5" stroke={color} strokeWidth="1" opacity="0.6" />
    <line x1="6" y1="15.5" x2="10" y2="15.5" stroke={color} strokeWidth="1" opacity="0.6" />
  </svg>
);

type CertIcon = typeof CourseraIcon;
const CERT_ICONS: CertIcon[] = [CourseraIcon, PythonIcon, JavaIcon, FigmaIcon, BlockchainIcon];

const CERTIFICATIONS = [
  {
    title: 'Advanced Data Analytics',
    provider: 'Coursera',
    category: 'Data Science',
    accent: '#6366f1',
    bg: 'rgba(99,102,241,0.07)',
    year: '2024',
  },
  {
    title: 'Data Analytics using Python',
    provider: 'NPTEL',
    category: 'Programming',
    accent: '#22d3ee',
    bg: 'rgba(34,211,238,0.07)',
    year: '2024',
  },
  {
    title: 'Core Java & Full-Stack Development',
    provider: 'Inlustr',
    category: 'Development',
    accent: '#8b5cf6',
    bg: 'rgba(139,92,246,0.07)',
    year: '2023',
  },
  {
    title: 'UI/UX Design',
    provider: 'TVS Training & Services',
    category: 'Design',
    accent: '#f59e0b',
    bg: 'rgba(245,158,11,0.07)',
    year: '2023',
  },
  {
    title: 'Basics in Blockchain',
    provider: 'Great Learning',
    category: 'Web3',
    accent: '#10b981',
    bg: 'rgba(16,185,129,0.07)',
    year: '2023',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgesRef  = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0, y: 20, duration: 0.6, ease: 'power3.out', stagger: 0.1, clearProps: 'all',
          scrollTrigger: { trigger: headerRef.current, start: 'top 92%', once: true },
        });
      }
      // Each card individually triggered by its own position
      const badges = badgesRef.current?.querySelectorAll('.cert-badge');
      if (badges) {
        badges.forEach((badge) => {
          gsap.from(badge, {
            opacity: 0, y: 28, scale: 0.97, duration: 0.6, ease: 'power3.out', clearProps: 'all',
            scrollTrigger: { trigger: badge, start: 'top 95%', once: true },
          });
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
        background: 'linear-gradient(180deg, var(--bg-base) 0%, var(--bg-mid) 100%)',
      }}
    >
      {/* Decorative background blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400, height: 400,
          top: -80, left: -120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 300, height: 300,
          bottom: -60, right: -80,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Section Header ── */}
        <div ref={headerRef} className="text-center mb-14">
          <p className="eyebrow mb-4">Credentials</p>
          <h2 className="section-heading mb-3">Certifications</h2>
          <p
            className="font-body mx-auto"
            style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 420 }}
          >
            Verified credentials from globally recognised platforms
          </p>
        </div>

        {/* ── Cert Cards ── */}
        <div
          ref={badgesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={i}
              className="cert-badge group relative overflow-hidden rounded-2xl cursor-default"
              style={{
                background: cert.bg,
                border: `1px solid ${cert.accent}22`,
                transition: 'all 0.32s cubic-bezier(0.34,1.3,0.64,1)',
                backdropFilter: 'blur(12px)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-6px)';
                el.style.borderColor = `${cert.accent}55`;
                el.style.boxShadow = `0 20px 44px ${cert.accent}18, 0 0 0 1px ${cert.accent}18`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.borderColor = `${cert.accent}22`;
                el.style.boxShadow = 'none';
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: `linear-gradient(90deg, ${cert.accent}, ${cert.accent}55)` }}
              />

              {/* Shine sweep on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${cert.accent}08 0%, transparent 60%)`,
                }}
              />

              <div className="p-6 pt-7">
                {/* Top row: icon + year */}
                <div className="flex items-start justify-between mb-4">
                  {/* SVG Icon */}
                  <div
                    className="flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      width: 52,
                      height: 52,
                      background: `${cert.accent}18`,
                      border: `1px solid ${cert.accent}30`,
                    }}
                  >
                    {(() => { const Icon = CERT_ICONS[i]; return <Icon color={cert.accent} />; })()}
                  </div>

                  {/* Year badge */}
                  <span
                    className="font-mono font-medium rounded-full"
                    style={{
                      fontSize: 11,
                      padding: '3px 10px',
                      color: cert.accent,
                      background: `${cert.accent}14`,
                      border: `1px solid ${cert.accent}25`,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {cert.year}
                  </span>
                </div>

                {/* Category pill */}
                <span
                  className="font-mono inline-block mb-2"
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: cert.accent,
                    opacity: 0.8,
                  }}
                >
                  {cert.category}
                </span>

                {/* Title */}
                <h3
                  className="font-display font-bold mb-2 leading-snug"
                  style={{ fontSize: 16, color: 'var(--text-primary)' }}
                >
                  {cert.title}
                </h3>

                {/* Provider row */}
                <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: `1px solid ${cert.accent}15` }}>
                  <div className="flex items-center gap-2">
                    <BadgeCheck
                      size={15}
                      style={{ color: cert.accent, flexShrink: 0 }}
                    />
                    <span
                      className="font-body font-medium"
                      style={{ fontSize: 13, color: 'var(--text-secondary)' }}
                    >
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
          ))}

          {/* ── Summary card ── */}
          <div
            className="cert-badge relative overflow-hidden rounded-2xl flex flex-col items-center justify-center text-center p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(34,211,238,0.06) 100%)',
              border: '1px solid rgba(99,102,241,0.20)',
              minHeight: 200,
            }}
          >
            {/* Big number */}
            <span
              className="font-display font-bold block mb-1"
              style={{
                fontSize: 64,
                lineHeight: 1,
                background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              5
            </span>
            <span
              className="font-display font-bold block mb-2"
              style={{ fontSize: 15, color: 'var(--text-primary)' }}
            >
              Certifications Earned
            </span>
            <span
              className="font-body"
              style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 180, lineHeight: 1.6 }}
            >
              Across Data, Dev, Design & Web3
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
