import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, CalendarDays } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BULLETS = [
  'Developed a cross-platform mobile application using Flutter with a responsive UI for Android and iOS.',
  'Implemented core features including user authentication, navigation flows, and dynamic content loading.',
  'Debugged critical issues and optimized application performance through improved state management.',
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const dotRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (dotRef.current) {
        gsap.from(dotRef.current, {
          scale: 0, duration: 0.5, ease: 'back.out(2)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        });
      }
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0, x: -40, duration: 0.75, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative"
      style={{ padding: 'var(--section-pad-y) var(--section-pad-x)', background: 'var(--bg-base)' }}
    >
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">Experience</p>
          <h2 className="section-heading">Where I've Worked</h2>
        </div>

        {/* Timeline */}
        <div className="flex justify-center">
          <div className="relative" style={{ maxWidth: 720, width: '100%' }}>
            {/* Vertical line */}
            <div
              className="absolute left-5 top-3 bottom-3 hidden sm:block"
              style={{ width: 2, background: 'var(--timeline-line)', borderRadius: 1 }}
            />

            <div className="relative flex gap-8 sm:pl-14">
              {/* Dot */}
              <div
                ref={dotRef}
                className="absolute left-[14px] top-7 hidden sm:block z-10"
                style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: 'var(--grad-primary)',
                  boxShadow: '0 0 14px var(--glow-indigo)',
                }}
              />

              {/* Card */}
              <div ref={cardRef} className="glass-card w-full p-8">
                {/* Role */}
                <h3
                  className="font-display font-bold mb-2"
                  style={{ fontSize: 22, color: 'var(--text-primary)' }}
                >
                  Flutter App Developer Intern
                </h3>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={13} style={{ color: 'var(--accent-indigo)' }} />
                    <span
                      className="font-body font-semibold"
                      style={{ fontSize: 14, color: 'var(--accent-indigo)' }}
                    >
                      Samsel
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarDays size={13} style={{ color: 'var(--text-muted)' }} />
                    <span className="font-body" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                      2024
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-3.5">
                  {BULLETS.map((bullet, i) => (
                    <li key={i} className="flex gap-3.5 items-start">
                      <span
                        className="flex-shrink-0 mt-[7px] rounded-full"
                        style={{ width: 6, height: 6, background: 'var(--grad-primary)' }}
                      />
                      <p
                        className="font-body"
                        style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-secondary)' }}
                      >
                        {bullet}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
