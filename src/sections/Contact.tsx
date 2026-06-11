import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_ITEMS = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'raghulgms@gmail.com',
    href: 'mailto:raghulgms@gmail.com',
    accent: '#6366f1',
  },
  {
    Icon: Phone,
    label: 'Phone',
    value: '+91 9150131009',
    href: 'tel:+919150131009',
    accent: '#22d3ee',
  },
  {
    Icon: MapPin,
    label: 'Location',
    value: 'T. Nagar, Chennai – 600017',
    href: null,
    accent: '#8b5cf6',
  },
];

const SOCIAL_LINKS = [
  {
    Icon: Github,
    label: 'GitHub',
    sub: 'raghulcpro',
    href: 'https://github.com/raghulcpro',
    accent: '#f1f5f9',
    bg: 'rgba(241,245,249,0.07)',
    border: 'rgba(241,245,249,0.14)',
  },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    sub: 'raghulvenkatesan',
    href: 'https://linkedin.com/in/raghulvenkatesan-2ab12a263',
    accent: '#0a66c2',
    bg: 'rgba(10,102,194,0.10)',
    border: 'rgba(10,102,194,0.22)',
  },
  {
    Icon: Mail,
    label: 'Email',
    sub: 'raghulgms@gmail.com',
    href: 'mailto:raghulgms@gmail.com',
    accent: '#6366f1',
    bg: 'rgba(99,102,241,0.10)',
    border: 'rgba(99,102,241,0.22)',
  },
];

export default function Contact() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const socialsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        Array.from(headingRef.current.children).forEach(el => {
          gsap.from(el, {
            opacity: 0, y: 24, duration: 0.6, ease: 'power3.out', clearProps: 'all',
            scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          });
        });
      }
      if (cardsRef.current) {
        Array.from(cardsRef.current.children).forEach(el => {
          gsap.from(el, {
            opacity: 0, y: 28, duration: 0.6, ease: 'power3.out', clearProps: 'all',
            scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          });
        });
      }
      if (socialsRef.current) {
        Array.from(socialsRef.current.children).forEach(el => {
          gsap.from(el, {
            opacity: 0, y: 20, duration: 0.5, ease: 'power3.out', clearProps: 'all',
            scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'linear-gradient(180deg, var(--bg-mid) 0%, var(--bg-base) 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
      />

      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Heading ── */}
        <div ref={headingRef} className="text-center mb-12">
          <p className="eyebrow mb-4">Let's Connect</p>
          <h2 className="section-heading mb-4">
            Let's build{' '}
            <span className="text-gradient">something</span>.
          </h2>
          <p
            className="font-body"
            style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7 }}
          >
            Open to entry-level Software Developer roles in Chennai and remote.
            <br />Drop me a message — I respond within 24 hours.
          </p>
        </div>

        {/* ── Contact Info Cards ── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          {CONTACT_ITEMS.map(({ Icon, label, value, href, accent }) => {
            const Wrapper = href ? 'a' : 'div';
            return (
              <Wrapper
                key={label}
                {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex flex-col items-center text-center p-5 rounded-2xl transition-all duration-300"
                style={{
                  background: `${accent}08`,
                  border: `1px solid ${accent}20`,
                  textDecoration: 'none',
                  cursor: href ? 'pointer' : 'default',
                }}
                onMouseEnter={href ? (e: any) => {
                  e.currentTarget.style.borderColor = `${accent}45`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 16px 36px ${accent}14`;
                } : undefined}
                onMouseLeave={href ? (e: any) => {
                  e.currentTarget.style.borderColor = `${accent}20`;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                } : undefined}
              >
                <div
                  className="flex items-center justify-center rounded-xl mb-3"
                  style={{
                    width: 44,
                    height: 44,
                    background: `${accent}18`,
                    border: `1px solid ${accent}30`,
                  }}
                >
                  <Icon size={18} style={{ color: accent }} />
                </div>
                <span
                  className="font-mono font-semibold block mb-1"
                  style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, opacity: 0.8 }}
                >
                  {label}
                </span>
                <span
                  className="font-body font-medium"
                  style={{ fontSize: 13.5, color: 'var(--text-primary)', lineHeight: 1.4 }}
                >
                  {value}
                </span>
              </Wrapper>
            );
          })}
        </div>

        {/* ── Social Links ── */}
        <div
          ref={socialsRef}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
        >
          {SOCIAL_LINKS.map(({ Icon, label, sub, href, accent, bg, border }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl transition-all duration-300 flex-1 sm:flex-none"
              style={{
                padding: '14px 22px',
                background: bg,
                border: `1px solid ${border}`,
                textDecoration: 'none',
                minWidth: 190,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-3px)';
                el.style.boxShadow = `0 12px 28px ${accent}22`;
                el.style.borderColor = `${accent}50`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
                el.style.borderColor = border;
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ width: 38, height: 38, background: `${accent}18` }}
              >
                <Icon size={17} style={{ color: accent }} />
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className="font-display font-bold block"
                  style={{ fontSize: 13.5, color: 'var(--text-primary)' }}
                >
                  {label}
                </span>
                <span
                  className="font-body block truncate"
                  style={{ fontSize: 11.5, color: 'var(--text-muted)' }}
                >
                  {sub}
                </span>
              </div>
              <ArrowUpRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
