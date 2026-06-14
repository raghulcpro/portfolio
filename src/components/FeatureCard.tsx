import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  color: string;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  gradient,
  color,
}: FeatureCardProps) {
  return (
    <div
      className="group relative flex flex-col w-full h-full mx-auto"
      style={{
        perspective: '1000px',
      }}
    >
      {/* Ambient Glow behind the card */}
      <div
        className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[36px]"
        style={{
          background: gradient,
          filter: 'blur(32px)',
          transform: 'translateZ(-1px)',
        }}
      />

      {/* Main Card Wrapper (Provides the gradient border) */}
      <div
        className="relative flex-1 flex flex-col rounded-[36px] transition-all duration-500"
        style={{
          padding: '3px', // Border thickness
          background: gradient,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
        }}
      >
        {/* Inner Card Content */}
        <div
          className="relative flex-1 flex flex-col p-8 lg:p-10 rounded-[33px] overflow-hidden"
          style={{
            background: 'var(--bg-card)', // Ties into the new design system
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Subtle noise/grid overlay inside the card for texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }} />

          {/* Top highlight for 3D feel */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px] opacity-40"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)`,
            }}
          />

          {/* Icon Area */}
          <div className="mb-8 relative z-10">
            {/* Icon Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 blur-xl opacity-30 mix-blend-screen transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: color }}
            />
            <div 
              className="relative flex items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
              style={{
                width: 56, height: 56,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-glass)',
                boxShadow: 'none',
              }}
            >
              <Icon size={26} style={{ color: 'var(--text-primary)' }} strokeWidth={2} />
            </div>
          </div>

          {/* Text Content */}
          <div className="mt-auto relative z-10">
            <h3
              className="font-display font-bold mb-4 tracking-tight"
              style={{ fontSize: 24, color: 'var(--text-primary)' }}
            >
              {title}
            </h3>
            <p
              className="font-body"
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
