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
    gradient: 'linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)',
    delay: 0.1,
  },
  {
    title: 'Design',
    description:
      'Every pixel matters. I craft beautiful, intuitive interfaces with Figma and implement them pixel-perfect in code.',
    icon: Palette,
    gradient: 'linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)',
    delay: 0.2,
  },
  {
    title: 'Analytics',
    description:
      'Data tells stories. I transform complex datasets into actionable insights with Power BI and interactive dashboards.',
    icon: Zap,
    gradient: 'linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)',
    delay: 0.3,
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
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
      className="relative min-h-screen bg-[#050816] flex flex-col items-center justify-center p-6 md:p-12 font-sans overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16 md:mb-20">
          <p className="text-accent-purple mb-3 text-sm font-semibold uppercase tracking-widest">
            Featured Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-2xl mx-auto">
            What I Specialize In
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Three pillars of my expertise that drive every project
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-6 w-full max-w-[936px] mx-auto">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              gradient={feature.gradient}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}