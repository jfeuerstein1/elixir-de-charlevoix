'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
      {/* Background image with Ken Burns animation */}
      <div
        className="absolute inset-0 animate-ken-burns"
        style={{
          backgroundImage: 'url(/hero-misty-mountains.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(15, 26, 20, 0.7) 0%,
            rgba(15, 26, 20, 0.3) 30%,
            transparent 50%,
            rgba(15, 26, 20, 0.3) 70%,
            rgba(15, 26, 20, 0.9) 100%
          )`
        }}
      />

      <div className="text-center relative z-10">
        <div className="mb-8 animate-fade-in-up">
          <span
            className="inline-block px-4 py-2 text-xs md:text-sm tracking-[0.3em] uppercase border border-[var(--gold)] text-[var(--gold)]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Coming Soon
          </span>
        </div>
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-light tracking-wider mb-4 animate-fade-in-up delay-100"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Élixir
        </h1>
        <p
          className="text-2xl md:text-3xl lg:text-4xl tracking-widest text-[var(--gold)] mb-12 animate-fade-in-up delay-300"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          de Charlevoix
        </p>
        <p
          className="text-lg md:text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-400"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {t.hero.tagline}
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#story"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors animate-fade-in delay-500"
      >
        <span className="text-sm tracking-widest">{t.hero.scroll}</span>
        <div className="w-px h-12 bg-current opacity-50" />
      </a>
    </section>
  );
}
