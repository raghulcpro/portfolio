import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const SOCIALS = [
  { Icon: Github,   href: 'https://github.com/raghulcpro',                      label: 'GitHub' },
  { Icon: Linkedin, href: 'https://linkedin.com/in/raghulvenkatesan-2ab12a263', label: 'LinkedIn' },
  { Icon: Mail,     href: 'mailto:raghulgms@gmail.com',                          label: 'Email' },
];

const NAV_QUICK = [
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Contact',  href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <footer
      style={{
        background: 'var(--bg-base)',
        borderTop: '1px solid var(--border-glass)',
      }}
    >
      {/* Main footer content */}
      <div
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '40px var(--section-pad-x) 28px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{
                  width: 38, height: 38,
                  background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                  boxShadow: '0 4px 16px rgba(99,102,241,0.40)',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontFamily: '"Syne",sans-serif', fontWeight: 800, fontSize: 13, color: '#fff', letterSpacing: '-0.03em' }}>
                  RV
                </span>
              </div>
              <span style={{ fontFamily: '"Syne",sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Raghul Venkatesan
              </span>
            </div>
            <p className="font-body" style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 260 }}>
              MCA postgraduate turning data into insights and ideas into mobile apps.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>
              Quick Links
            </p>
            <ul className="space-y-2.5">
              {NAV_QUICK.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-body transition-colors duration-200 text-left"
                    style={{ fontSize: 13.5, color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-indigo)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>
              Connect
            </p>
            <div className="flex flex-col gap-2.5">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-all duration-200 group"
                  style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-indigo)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                >
                  <div
                    className="flex items-center justify-center rounded-lg transition-all duration-200 group-hover:border-indigo-500"
                    style={{
                      width: 30, height: 30,
                      border: '1px solid var(--border-glass)',
                      background: 'var(--bg-surface)',
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  <span className="font-body" style={{ fontSize: 13.5 }}>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border-glass)', marginBottom: 20 }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body flex items-center gap-1" style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
            © 2026 Raghul Venkatesan · Built with React & GSAP
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 font-body font-medium transition-all duration-200 rounded-xl"
            style={{
              fontSize: 12.5,
              color: 'var(--text-muted)',
              padding: '7px 14px',
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-surface)',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = 'var(--accent-indigo)';
              el.style.borderColor = 'rgba(99,102,241,0.35)';
              el.style.transform = 'translateY(-2px)';
              el.style.background = 'rgba(99,102,241,0.06)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = 'var(--text-muted)';
              el.style.borderColor = 'var(--border-glass)';
              el.style.transform = 'translateY(0)';
              el.style.background = 'var(--bg-surface)';
            }}
          >
            Back to top
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
