import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const WORDS = [
  "CURIOUS",
  "CREATIVE",
  "CONSISTENT",
  "RAGHUL VENKATESAN"
];

const SWEEP_GRADIENT = `linear-gradient(90deg, 
  transparent 0%, transparent 25%, 
  #ff0099 35%, #ff4f04 45%, #ffa600 55%, 
  #0056ff 65%, #ffffff 75%, #ffffff 100%
)`;

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      // Reset all words
      gsap.set(wordsRef.current, { 
        opacity: 0, 
        backgroundPosition: '0% 0%', 
        filter: 'blur(8px)' 
      });

      WORDS.forEach((_, i) => {
        const isLast = i === WORDS.length - 1;
        
        // Ensure the current word is visible before animating its background
        tl.set(wordsRef.current[i], { opacity: 1 });

        // The sweep animation: moves background from 0% (transparent) to 100% (white)
        tl.to(wordsRef.current[i], {
          backgroundPosition: '100% 0%',
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
        });

        if (!isLast) {
          // Fade out the current word quickly
          tl.to(wordsRef.current[i], {
            opacity: 0,
            duration: 0.15,
            ease: 'power2.inOut',
          }, '+=0.2'); // Hold for 0.2s after it fully becomes white
        } else {
          // Last word
          tl.to(wordsRef.current[i], {
            scale: 1.1,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.inOut',
          }, '+=0.6'); // Hold longer
        }
      });

      // Slide background up to reveal app
      tl.to(containerRef.current, { 
        yPercent: -100, 
        duration: 0.8, 
        ease: 'power4.inOut' 
      }, '<0.1');

    }, containerRef);
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
      style={{ background: '#0b0e19' }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {WORDS.map((word, i) => {
          const isLast = i === WORDS.length - 1;
          return (
            <div
              key={word}
              ref={el => wordsRef.current[i] = el}
              className="absolute"
              style={{
                fontFamily: isLast ? '"Syne", sans-serif' : '"Inter", sans-serif',
                fontWeight: isLast ? 800 : 700,
                fontSize: isLast ? 'clamp(32px, 6vw, 64px)' : 'clamp(28px, 5vw, 56px)',
                letterSpacing: isLast ? '-0.02em' : '-0.01em',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                willChange: 'background-position, opacity, filter',
                backgroundImage: SWEEP_GRADIENT,
                backgroundSize: '400% 100%',
                backgroundRepeat: 'no-repeat',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              {word}
            </div>
          );
        })}
      </div>
    </div>
  );
}
