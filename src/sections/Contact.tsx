import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_ITEMS = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'raghulgms@gmail.com',
    href: 'mailto:raghulgms@gmail.com',
    accent: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
  },
  {
    Icon: Phone,
    label: 'Phone',
    value: '+91 9150131009',
    href: 'tel:+919150131009',
    accent: '#22d3ee',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  },
  {
    Icon: MapPin,
    label: 'Location',
    value: 'T. Nagar, Chennai – 600017',
    href: null,
    accent: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
  },
];

const SOCIAL_LINKS = [
  {
    Icon: Github,
    label: 'GitHub',
    sub: 'raghulcpro',
    href: 'https://github.com/raghulcpro',
    accent: '#f1f5f9',
    gradient: 'linear-gradient(135deg, #94a3b8 0%, #f8fafc 100%)',
  },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    sub: 'raghulvenkatesan',
    href: 'https://linkedin.com/in/raghulvenkatesan-2ab12a263',
    accent: '#0a66c2',
    gradient: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
  },
  {
    Icon: Mail,
    label: 'Email',
    sub: 'raghulgms@gmail.com',
    href: 'mailto:raghulgms@gmail.com',
    accent: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
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
        gsap.from(Array.from(headingRef.current.children), {
          opacity: 0, y: 28, stagger: 0.1, duration: 0.7, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: headingRef.current, start: 'top 90%', once: true },
        });
      }
      if (cardsRef.current) {
        gsap.from(Array.from(cardsRef.current.children), {
          opacity: 0, y: 32, stagger: 0.09, duration: 0.65, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 88%', once: true },
        });
      }
      if (socialsRef.current) {
        gsap.from(Array.from(socialsRef.current.children), {
          opacity: 0, y: 24, stagger: 0.08, duration: 0.55, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: socialsRef.current, start: 'top 92%', once: true },
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
        background: 'var(--bg-base)',
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(99,102,241,0.09) 0%, transparent 65%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(34,211,238,0.05) 0%, transparent 55%)',
      }} />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <p className="eyebrow mb-4">Let's Connect</p>
          <h2 className="section-heading mb-4">
            Let's build{' '}
            <span className="text-gradient">something</span>.
          </h2>
          <p className="font-body" style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 440, margin: '0 auto' }}>
            Open to entry-level Software Developer roles in Chennai and remote.
            Drop me a message — I respond within 24 hours.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8"
        >
          {CONTACT_ITEMS.map(({ Icon, label, value, href, accent, gradient }) => {
            const Wrapper = href ? 'a' : 'div';
            return (
              <Wrapper
                key={label}
                {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group relative flex flex-col cursor-pointer"
                style={{ perspective: '1000px', textDecoration: 'none' }}
              >
                {/* Ambient Glow behind the card */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]"
                  style={{
                    background: gradient,
                    filter: 'blur(20px)',
                    transform: 'translateZ(-1px)',
                  }}
                />

                {/* Main Card Wrapper */}
                <div
                  className="relative flex-1 flex flex-col rounded-[24px] transition-all duration-500"
                  style={{
                    padding: '2px', // Border thickness
                    background: gradient,
                  }}
                  onMouseEnter={(e: any) => {
                    if (href) e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  }}
                  onMouseLeave={(e: any) => {
                    if (href) e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  {/* Inner Card Content */}
                  <div
                    className="relative flex-1 flex flex-col items-center text-center p-6 rounded-[22px] overflow-hidden"
                    style={{
                      background: 'var(--bg-card)',
                      backdropFilter: 'blur(20px)',
                      backgroundColor: 'rgba(11, 14, 25, 0.95)',
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

                    {/* Icon */}
                    <div className="relative mb-4 z-10">
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 blur-xl opacity-30 mix-blend-screen transition-opacity duration-500 group-hover:opacity-60"
                        style={{ background: accent }}
                      />
                      <div
                        className="relative flex items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                        style={{
                          width: 46, height: 46,
                          background: `rgba(255,255,255,0.04)`,
                          border: `1px solid rgba(255,255,255,0.1)`,
                          boxShadow: `inset 0 2px 10px rgba(255,255,255,0.05)`,
                        }}
                      >
                        <Icon size={20} style={{ color: '#fff' }} strokeWidth={2} />
                      </div>
                    </div>

                    <span
                      className="font-mono font-semibold block mb-1.5 relative z-10"
                      style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, opacity: 0.9 }}
                    >
                      {label}
                    </span>
                    <span
                      className="font-body font-medium relative z-10"
                      style={{ fontSize: 13.5, color: 'var(--text-primary)', lineHeight: 1.4 }}
                    >
                      {value}
                    </span>
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>

        {/* Social Links */}
        <div
          ref={socialsRef}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-10"
        >
          {SOCIAL_LINKS.map(({ Icon, label, sub, href, accent, gradient }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col cursor-pointer flex-1 sm:flex-none"
              style={{ perspective: '1000px', textDecoration: 'none', minWidth: 220 }}
            >
              {/* Ambient Glow behind the card */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[20px]"
                style={{
                  background: gradient,
                  filter: 'blur(16px)',
                  transform: 'translateZ(-1px)',
                }}
              />

              {/* Main Card Wrapper */}
              <div
                className="relative flex-1 flex flex-col rounded-[20px] transition-all duration-500"
                style={{
                  padding: '2px', // Border thickness
                  background: gradient,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {/* Inner Card Content */}
                <div
                  className="relative flex-1 flex items-center gap-3 p-3 px-4 rounded-[18px] overflow-hidden"
                  style={{
                    background: 'var(--bg-card)',
                    backdropFilter: 'blur(20px)',
                    backgroundColor: 'rgba(11, 14, 25, 0.95)',
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

                  <div className="relative z-10 flex items-center justify-center rounded-xl flex-shrink-0"
                       style={{ width: 40, height: 40, background: `rgba(255,255,255,0.05)`, border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Icon size={18} style={{ color: '#fff' }} />
                  </div>
                  <div className="flex-1 min-w-0 relative z-10">
                    <span className="font-display font-bold block" style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                      {label}
                    </span>
                    <span className="font-body block truncate" style={{ fontSize: 12, color: accent, opacity: 0.9 }}>
                      {sub}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10"
                    style={{ color: '#fff', flexShrink: 0 }}
                  />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="mailto:raghulgms@gmail.com"
            className="btn-primary flex items-center gap-2"
            style={{ textDecoration: 'none' }}
          >
            <Send size={15} />
            Send a Message
          </a>
        </div>
      </div>
    </section>
  );
}
