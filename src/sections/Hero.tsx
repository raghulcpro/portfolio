import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import gsap from 'gsap';

const ROTATING_TEXTS = [
  'Software Developer',
  'Data Analytics',
  'Flutter Developer',
  'Power BI & DAX',
];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex]     = useState(0);
  const [isDeleting, setIsDeleting]   = useState(false);
  const [isPaused, setIsPaused]       = useState(false);

  const heroRef      = useRef<HTMLDivElement>(null);
  const eyebrowRef   = useRef<HTMLParagraphElement>(null);
  const nameRef      = useRef<HTMLHeadingElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const valueRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const socialRef    = useRef<HTMLDivElement>(null);

  // Typewriter
  useEffect(() => {
    const currentText = ROTATING_TEXTS[textIndex];
    const typeSpeed = isDeleting ? 28 : 55;
    const pauseTime = 2400;

    if (isPaused) {
      const t = setTimeout(() => setIsPaused(false), pauseTime);
      return () => clearTimeout(t);
    }
    if (!isDeleting && displayText === currentText) { setIsPaused(true); return; }
    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTextIndex(p => (p + 1) % ROTATING_TEXTS.length);
      return;
    }
    const t = setTimeout(() => {
      setDisplayText(prev =>
        isDeleting ? prev.slice(0, -1) : currentText.slice(0, prev.length + 1)
      );
    }, typeSpeed);
    return () => clearTimeout(t);
  }, [displayText, textIndex, isDeleting, isPaused]);

  useEffect(() => {
    if (!isPaused) return;
    const t = setTimeout(() => setIsDeleting(true), 2400);
    return () => clearTimeout(t);
  }, [isPaused]);

  // GSAP entrance
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      [eyebrowRef, nameRef, typewriterRef, valueRef, ctaRef, socialRef].forEach(r => {
        if (r.current) r.current.style.opacity = '1';
      });
      return;
    }
    const tl = gsap.timeline();
    tl.to(eyebrowRef.current,    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.4 })
      .to(nameRef.current,       { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
      .to(typewriterRef.current, { opacity: 0.95, duration: 0.5 }, '-=0.3')
      .to(valueRef.current,      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .to(ctaRef.current,        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
      .to(socialRef.current,     { opacity: 1, duration: 0.4 }, '-=0.1');
    return () => { tl.kill(); };
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* 3D Background (Spline) */}
      <div className="absolute inset-0">
        <iframe
          src="https://my.spline.design/r4xbot-1ri1UPqPXA0TuC60RMxUQZW3/"
          title="3D Bot"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          allow="autoplay"
        />
        {/* Gradient overlay for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'var(--bg-base)',
            opacity: 0.6,
          }}
        />
        {/* Connect Button over Spline */}
        <button
          onClick={() => scrollTo('#contact')}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 24,
            zIndex: 15,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 22px',
            background: 'var(--grad-primary)',
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
            boxShadow: '0 6px 24px rgba(99,102,241,0.40)',
            fontFamily: '"Inter", sans-serif',
            fontSize: 14,
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '0.02em',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(99,102,241,0.55)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(99,102,241,0.40)';
          }}
          aria-label="Go to contact section"
        >
          Connect
          <Mail size={16} />
        </button>
      </div>

      {/* Content Card */}
      <div
        className="relative z-20 flex flex-col items-center text-center rounded-3xl"
        style={{
          maxWidth: 780,
          width: '100%',
          padding: 'clamp(40px, 6vw, 64px) clamp(28px, 6vw, 64px)',
          marginTop: 'var(--nav-height)',
          backgroundColor: 'var(--bg-surface-glass)',
          backdropFilter: 'blur(28px) saturate(140%)',
          WebkitBackdropFilter: 'blur(28px) saturate(140%)',
          border: '1px solid var(--border-glass)',
          boxShadow: 'var(--shadow-hero), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="eyebrow mb-5"
          style={{ opacity: 0, transform: 'translateY(18px)' }}
        >
          MCA Postgraduate · Chennai, India
        </p>

        {/* Name */}
        <h1
          ref={nameRef}
          className="font-display mb-5"
          style={{
            fontSize: 'clamp(44px, 8vw, 84px)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            opacity: 0,
            transform: 'translateY(28px)',
          }}
        >
          Raghul{' '}
          <span className="text-gradient">Venkatesan</span>
        </h1>

        {/* Typewriter */}
        <div className="mb-6 flex items-center justify-center gap-1" style={{ minHeight: '2rem' }}>
          <span
            ref={typewriterRef}
            className="font-mono"
            style={{
              fontSize: 'clamp(16px, 2.2vw, 22px)',
              fontWeight: 500,
              color: 'var(--accent-cyan)',
              opacity: 0,
              letterSpacing: '0.01em',
            }}
          >
            {displayText}
          </span>
          <span
            className="cursor-blink inline-block"
            style={{ width: 2, height: '1.15em', backgroundColor: 'var(--accent-cyan)', marginLeft: 2 }}
          />
        </div>

        {/* Value Proposition */}
        <p
          ref={valueRef}
          className="font-body mb-8"
          style={{
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            maxWidth: 520,
            opacity: 0,
            transform: 'translateY(14px)',
          }}
        >
          I build data analytics dashboards and cross-platform mobile apps — turning messy data and rough ideas into clean, usable products.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center gap-3 mb-8"
          style={{ opacity: 0, transform: 'translateY(14px)' }}
        >
          <button onClick={() => scrollTo('#projects')} className="btn-primary">
            View My Work
          </button>
          <button onClick={() => scrollTo('#contact')} className="btn-secondary">
            Get in Touch
          </button>
        </div>

        {/* Social Icons */}
        <div ref={socialRef} className="flex items-center gap-5" style={{ opacity: 0 }}>
          {[
            { href: 'https://github.com/raghulcpro', Icon: Github, label: 'GitHub' },
            { href: 'https://linkedin.com/in/raghulvenkatesan-2ab12a263', Icon: Linkedin, label: 'LinkedIn' },
            { href: 'mailto:raghulgms@gmail.com', Icon: Mail, label: 'Email' },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="transition-all duration-200"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--accent-indigo)';
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.15) translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                (e.currentTarget as HTMLElement).style.transform = 'scale(1) translateY(0)';
              }}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ opacity: 0.45, animation: 'fadeInUp 1s ease 1.8s forwards' }}
      >
        <ArrowDown size={16} style={{ color: 'var(--text-muted)', animation: 'orbFloat 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}
