import { useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun, Download } from 'lucide-react';

interface NavbarProps {
  isLightMode: boolean;
  toggleTheme: () => void;
  activeSection: string;
}

const NAV_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar({ isLightMode, toggleTheme, activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [hoveredLink, setHoveredLink]       = useState<string | null>(null);
  const [pillStyle, setPillStyle]           = useState({ left: 0, width: 0, opacity: 0 });
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hover pill tracking
  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const container = navLinksRef.current;
    if (!container) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();
    setPillStyle({ left: rect.left - parentRect.left, width: rect.width, opacity: 1 });
  };

  const handleNavLeave = () => {
    setPillStyle(prev => ({ ...prev, opacity: 0 }));
    setHoveredLink(null);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ─── Main Nav Bar ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ height: 'var(--nav-height)' }}
      >
        {/* Background layer */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: scrolled
              ? isLightMode
                ? 'rgba(248,249,252,0.88)'
                : 'rgba(5,8,22,0.82)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none',
            borderBottom: scrolled ? '1px solid var(--border-glass)' : '1px solid transparent',
          }}
        />

        {/* Content */}
        <div
          className="relative flex items-center justify-between h-full"
          style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--section-pad-x)' }}
        >

          {/* ── Logo ── */}
          <a
            href="#home"
            onClick={scrollToTop}
            className="flex items-center gap-2.5 group"
            style={{ textDecoration: 'none' }}
          >
            {/* Logo mark */}
            <div
              className="relative flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105"
              style={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
                boxShadow: '0 4px 16px rgba(99,102,241,0.45)',
              }}
            >
              <span
                style={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 800,
                  fontSize: 15,
                  color: '#fff',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                RV
              </span>
              {/* Shine effect */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%)',
                }}
              />
            </div>
            {/* Name text */}
            <span
              className="hidden sm:block font-display font-bold tracking-tight transition-all duration-300"
              style={{
                fontSize: 16,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Raghul<span style={{ color: 'var(--accent-indigo)' }}>.</span>
            </span>
          </a>

          {/* ── Desktop Nav Links ── */}
          <div
            ref={navLinksRef}
            className="hidden md:flex items-center relative"
            style={{ gap: 2 }}
            onMouseLeave={handleNavLeave}
          >
            {/* Hover pill */}
            <span
              className="absolute top-1/2 -translate-y-1/2 rounded-lg pointer-events-none transition-all duration-200"
              style={{
                left: pillStyle.left,
                width: pillStyle.width,
                height: 32,
                background: 'rgba(99,102,241,0.10)',
                opacity: pillStyle.opacity,
              }}
            />

            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={(e) => { setHoveredLink(link.href); handleLinkHover(e); }}
                  className="relative flex items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    padding: '6px 14px',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 13.5,
                    fontWeight: isActive ? 600 : 450,
                    color: isActive
                      ? 'var(--accent-indigo)'
                      : hoveredLink === link.href
                      ? 'var(--text-primary)'
                      : 'var(--text-secondary)',
                    textDecoration: 'none',
                    letterSpacing: '0.005em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {link.label}
                  {/* Active dot indicator */}
                  {isActive && (
                    <span
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full"
                      style={{
                        width: 4,
                        height: 4,
                        background: 'var(--grad-primary)',
                        boxShadow: '0 0 6px rgba(99,102,241,0.8)',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2.5">

            {/* Available badge — desktop only */}
            <div
              className="hidden lg:flex items-center gap-1.5 rounded-full mr-1"
              style={{
                padding: '5px 12px',
                background: 'rgba(16,185,129,0.10)',
                border: '1px solid rgba(16,185,129,0.22)',
              }}
            >
              <span
                className="rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  background: '#10b981',
                  boxShadow: '0 0 6px #10b981',
                  animation: 'pulse-glow 2s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: '#10b981',
                  letterSpacing: '0.02em',
                }}
              >
                Open to work
              </span>
            </div>

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              download
              className="hidden md:flex items-center gap-1.5 transition-all duration-250"
              style={{
                padding: '8px 16px',
                fontFamily: '"Inter", sans-serif',
                fontSize: 13,
                fontWeight: 600,
                color: '#fff',
                background: 'var(--grad-primary)',
                borderRadius: 10,
                textDecoration: 'none',
                boxShadow: '0 3px 14px rgba(99,102,241,0.35)',
                transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 8px 24px rgba(99,102,241,0.50)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 3px 14px rgba(99,102,241,0.35)';
              }}
            >
              <Download size={13} strokeWidth={2.5} />
              Resume
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center rounded-xl transition-all duration-200"
              style={{
                width: 36,
                height: 36,
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-glass)',
                background: 'var(--bg-surface-glass)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)';
                (e.currentTarget as HTMLElement).style.color = 'var(--accent-indigo)';
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.08) rotate(15deg)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-glass)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                (e.currentTarget as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
              }}
              aria-label="Toggle theme"
            >
              {isLightMode
                ? <Moon size={15} strokeWidth={2} />
                : <Sun size={15} strokeWidth={2} />
              }
            </button>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex items-center justify-center rounded-xl transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{
                width: 36,
                height: 36,
                color: 'var(--text-primary)',
                border: '1px solid var(--border-glass)',
                background: 'var(--bg-surface-glass)',
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Bottom gradient line when scrolled */}
        {scrolled && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, var(--accent-indigo), var(--accent-cyan), transparent)' }}
          />
        )}
      </nav>

      {/* ─── Mobile Full-Screen Menu ─── */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center transition-all duration-400"
        style={{
          background: 'rgba(5,8,22,0.97)',
          backdropFilter: 'blur(32px)',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-16px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {/* Logo in mobile menu */}
        <div
          className="flex items-center justify-center rounded-2xl mb-10"
          style={{
            width: 56,
            height: 56,
            background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
            boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
          }}
        >
          <span style={{ fontFamily: '"Syne",sans-serif', fontWeight: 800, fontSize: 22, color: '#fff' }}>RV</span>
        </div>

        {/* Nav links */}
        <div className="flex flex-col items-center gap-2 mb-10">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-display font-bold tracking-tight transition-all duration-200 px-8 py-3 rounded-2xl"
                style={{
                  fontSize: 24,
                  color: isActive ? '#fff' : 'rgba(241,245,249,0.55)',
                  background: isActive ? 'linear-gradient(135deg,rgba(99,102,241,0.20),rgba(34,211,238,0.12))' : 'transparent',
                  border: isActive ? '1px solid rgba(99,102,241,0.28)' : '1px solid transparent',
                  animationDelay: `${i * 0.05}s`,
                  transition: 'all 0.2s ease',
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Bottom actions */}
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2"
            style={{
              padding: '12px 24px',
              fontFamily: '"Inter",sans-serif',
              fontSize: 14,
              fontWeight: 600,
              color: '#fff',
              background: 'var(--grad-primary)',
              borderRadius: 12,
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
            }}
          >
            <Download size={15} />
            Resume
          </a>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-xl"
            style={{
              width: 44,
              height: 44,
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-surface-glass)',
            }}
            aria-label="Toggle theme"
          >
            {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        {/* Available to work badge */}
        <div
          className="flex items-center gap-1.5 rounded-full mt-6"
          style={{
            padding: '6px 14px',
            background: 'rgba(16,185,129,0.12)',
            border: '1px solid rgba(16,185,129,0.25)',
          }}
        >
          <span className="rounded-full" style={{ width: 6, height: 6, background: '#10b981' }} />
          <span style={{ fontFamily: '"Inter",sans-serif', fontSize: 12, fontWeight: 500, color: '#10b981' }}>
            Open to work
          </span>
        </div>
      </div>
    </>
  );
}
