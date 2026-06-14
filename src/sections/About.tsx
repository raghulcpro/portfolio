import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BarChart3, Layers, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 'MCA',    label: 'CGPA 7.8',         Icon: GraduationCap, color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' },
  { value: '₹1.2M+', label: 'Sales Analyzed',   Icon: BarChart3,     color: '#22d3ee', gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' },
  { value: '5',      label: 'Certifications',    Icon: Layers,        color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' },
  { value: '4+',     label: 'Projects Shipped',  Icon: Rocket,        color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #f43f5e 100%)' },
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
        gsap.from(Array.from(leftEls), {
          opacity: 0, y: 40, stagger: 0.12, duration: 0.75, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: leftColRef.current, start: 'top 88%', once: true },
        });
      }
      const chips = rightColRef.current?.querySelectorAll('.stat-chip');
      if (chips) {
        gsap.from(Array.from(chips), {
          opacity: 0, y: 28, scale: 0.9, stagger: 0.1, duration: 0.65, ease: 'back.out(1.4)', clearProps: 'all',
          scrollTrigger: { trigger: rightColRef.current, start: 'top 88%', once: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--bg-base)',
      }}
    >
      {/* Ambient left glow */}
      <div className="absolute pointer-events-none" style={{
        width: 700, height: 700,
        top: '50%', left: '-200px',
        transform: 'translateY(-50%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)',
        filter: 'blur(60px)',
      }} />
      {/* Ambient right glow */}
      <div className="absolute pointer-events-none" style={{
        width: 500, height: 500,
        top: '10%', right: '-100px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 65%)',
        filter: 'blur(60px)',
      }} />

      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-center"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        {/* Left — Text */}
        <div ref={leftColRef}>
          <p className="eyebrow mb-5 animate-item">About Me</p>
          <h2 className="section-heading mb-7 animate-item">
            Turning{' '}
            <span className="text-gradient">data</span>{' '}
            into decisions,<br />
            ideas into{' '}
            <span className="text-gradient">apps</span>.
          </h2>
          <p
            className="font-body animate-item mb-8"
            style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: 520 }}
          >
            I'm a motivated MCA postgraduate based in Chennai with hands-on skills across
            Python, Java, SQL, and Power BI. I love the full arc of a problem — modeling
            data into dashboards that reveal real business insight, and building user-friendly
            mobile apps with Flutter. Currently seeking an entry-level Software Developer role
            where I can apply these skills and grow fast.
          </p>

          {/* Open to work tag */}
          <div className="animate-item flex items-center gap-2.5" style={{ display: 'inline-flex' }}>
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.22)',
              }}
            >
              <span
                className="rounded-full"
                style={{
                  width: 7, height: 7,
                  background: '#10b981',
                  boxShadow: '0 0 8px #10b981',
                  animation: 'pulse-glow 2s ease-in-out infinite',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, fontWeight: 600, color: '#10b981', letterSpacing: '0.02em' }}>
                Open to work · Chennai & Remote
              </span>
            </div>
          </div>
        </div>

        {/* Right — Stats Bento */}
        <div ref={rightColRef} className="grid grid-cols-2 gap-4 lg:gap-5">
          {STATS.map((stat, i) => {
            const Icon = stat.Icon;
            return (
              <div
                key={i}
                className="stat-chip group relative flex flex-col cursor-default"
                style={{ perspective: '1000px' }}
              >
                {/* Ambient Glow behind the card */}
                <div
                  className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]"
                  style={{
                    background: stat.gradient,
                    filter: 'blur(24px)',
                    transform: 'translateZ(-1px)',
                  }}
                />

                {/* Main Card Wrapper (Provides the gradient border) */}
                <div
                  className="relative flex-1 flex flex-col rounded-[24px] transition-all duration-500"
                  style={{
                    padding: '2px', // Border thickness
                    background: stat.gradient,
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
                    className="relative flex-1 flex flex-col p-6 items-center text-center rounded-[22px] overflow-hidden"
                    style={{
                      background: 'var(--bg-card)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Subtle noise/grid overlay inside the card */}
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
                        style={{ background: stat.color }}
                      />
                      <div
                        className="relative flex items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                        style={{
                          width: 44, height: 44,
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-glass)',
                          boxShadow: 'none',
                        }}
                      >
                        <Icon size={20} style={{ color: 'var(--text-primary)' }} strokeWidth={2} />
                      </div>
                    </div>

                    {/* Value */}
                    <span
                      className="font-display font-bold block mb-1 relative z-10"
                      style={{ fontSize: 26, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}
                    >
                      {stat.value}
                    </span>

                    {/* Label */}
                    <span
                      className="font-body block relative z-10"
                      style={{ fontSize: 12, color: stat.color, letterSpacing: '0.03em', marginTop: 4, fontWeight: 500 }}
                    >
                      {stat.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
