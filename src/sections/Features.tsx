import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Palette, Zap } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: 'Development',
    description:
      'I build responsive web applications with React, Vite, and modern tools. Clean code and performance-first architecture.',
    icon: Monitor,
    gradient: 'linear-gradient(135deg, #FF3D77 0%, #FF9D3C 100%)',
    color: '#FF3D77',
  },
  {
    title: 'Design',
    description:
      'Every pixel matters. I craft beautiful, intuitive interfaces with Figma and implement them pixel-perfect in code.',
    icon: Palette,
    gradient: 'linear-gradient(135deg, #7DD3FC 0%, #06B6D4 100%)',
    color: '#06B6D4',
  },
  {
    title: 'Analytics',
    description:
      'Data tells stories. I transform complex datasets into actionable insights with Power BI and interactive dashboards.',
    icon: Zap,
    gradient: 'linear-gradient(135deg, #4361EE 0%, #F72585 100%)',
    color: '#4361EE',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(Array.from(headingRef.current.children), {
          opacity: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 90%',
            once: true,
          },
        });
      }
      
      if (cardsRef.current) {
        gsap.from(Array.from(cardsRef.current.children), {
          opacity: 0,
          y: 40,
          scale: 0.95,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--bg-mid)', // Ensure alternating background
      }}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 15% 10%, rgba(255,61,119,0.06) 0%, transparent 45%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 85% 90%, rgba(0,198,255,0.06) 0%, transparent 45%)',
      }} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16 md:mb-20">
          <p className="eyebrow mb-4">Featured Work</p>
          <h2 className="section-heading mb-4">What I Specialize In</h2>
          <p className="font-body mx-auto" style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 440, lineHeight: 1.7 }}>
            Three pillars of my expertise that drive every project.
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 w-full max-w-[1040px] mx-auto">
          {FEATURES.map((feature, index) => (
            <div key={index} className="feature-card-wrapper h-[320px] sm:h-[340px]">
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                gradient={feature.gradient}
                color={feature.color}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}