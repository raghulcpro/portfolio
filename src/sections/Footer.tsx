import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const SOCIALS = [
  { Icon: Github,   href: 'https://github.com/raghulcpro',                       label: 'GitHub' },
  { Icon: Linkedin, href: 'https://linkedin.com/in/raghulvenkatesan-2ab12a263',  label: 'LinkedIn' },
  { Icon: Mail,     href: 'mailto:raghulgms@gmail.com',                           label: 'Email' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{ borderTop: '1px solid var(--border-glass)', background: 'var(--bg-base)' }}>
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-5 py-7 px-6"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}
      >
        {/* Logo + copyright */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 28,
              height: 28,
              background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: '"Syne",sans-serif', fontWeight: 800, fontSize: 11, color: '#fff' }}>
              RV
            </span>
          </div>
          <p
            className="font-body"
            style={{ fontSize: 12.5, color: 'var(--text-muted)' }}
          >
            © 2026 Raghul Venkatesan · Built with React & GSAP
          </p>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center rounded-lg transition-all duration-200"
              style={{
                width: 32,
                height: 32,
                color: 'var(--text-muted)',
                border: '1px solid var(--border-glass)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = 'var(--accent-indigo)';
                el.style.borderColor = 'var(--border-hover)';
                el.style.transform = 'translateY(-2px)';
                el.style.background = 'rgba(99,102,241,0.10)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = 'var(--text-muted)';
                el.style.borderColor = 'var(--border-glass)';
                el.style.transform = 'translateY(0)';
                el.style.background = 'transparent';
              }}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 font-body font-medium transition-all duration-200 rounded-lg"
          style={{
            fontSize: 12.5,
            color: 'var(--text-muted)',
            padding: '6px 12px',
            border: '1px solid var(--border-glass)',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = 'var(--accent-indigo)';
            el.style.borderColor = 'var(--border-hover)';
            el.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = 'var(--text-muted)';
            el.style.borderColor = 'var(--border-glass)';
            el.style.transform = 'translateY(0)';
          }}
        >
          Back to top
          <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
