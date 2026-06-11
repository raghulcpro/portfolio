import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 'MCA',  label: 'CGPA 7.8',         icon: '🎓' },
  { value: '₹1.2M+', label: 'Sales Analyzed', icon: '📊' },
  { value: '5',    label: 'Certifications',    icon: '🏅' },
  { value: '4+',   label: 'Projects Shipped',  icon: '🚀' },
];

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const leftColRef  = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const leftEls = leftColRef.current?.querySelectorAll('.animate-item');
      if (leftEls) {
        leftEls.forEach(el => {
          gsap.from(el, {
            opacity: 0, y: 36, duration: 0.7, ease: 'power3.out', clearProps: 'all',
            scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          });
        });
      }
      const chips = rightColRef.current?.querySelectorAll('.stat-chip');
      if (chips) {
        chips.forEach(chip => {
          gsap.from(chip, {
            opacity: 0, y: 24, scale: 0.96, duration: 0.6, ease: 'power3.out', clearProps: 'all',
            scrollTrigger: { trigger: chip, start: 'top 95%', once: true },
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative"
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--bg-base)',
      }}
    >
      {/* Subtle left accent bar */}
      <div
        className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-full hidden lg:block"
        style={{ background: 'var(--grad-primary)', opacity: 0.5 }}
      />

      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14 lg:gap-20 items-start"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}
      >
        {/* Left — Text */}
        <div ref={leftColRef}>
          <p className="eyebrow mb-4 animate-item">About Me</p>
          <h2 className="section-heading mb-6 animate-item">
            Turning{' '}
            <span className="text-gradient">data</span>{' '}
            into decisions,<br />
            ideas into{' '}
            <span className="text-gradient">apps</span>.
          </h2>
          <p
            className="font-body animate-item"
            style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: 540 }}
          >
            I'm a motivated MCA postgraduate based in Chennai with hands-on skills across
            Python, Java, SQL, and Power BI. I love the full arc of a problem — modeling
            data into dashboards that reveal real business insight, and building user-friendly
            mobile apps with Flutter. Currently seeking an entry-level Software Developer role
            where I can apply these skills and grow fast.
          </p>
        </div>

        {/* Right — Stats */}
        <div ref={rightColRef} className="grid grid-cols-2 gap-4">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="stat-chip glass-card flex flex-col items-center justify-center text-center p-6"
            >
              <span className="text-2xl mb-2 select-none">{stat.icon}</span>
              <span
                className="font-display font-bold text-2xl"
                style={{ color: 'var(--accent-indigo)' }}
              >
                {stat.value}
              </span>
              <span
                className="font-body mt-1"
                style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.03em' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
