'use client';

import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from './ScrollReveal';

export default function Serving() {
  const { t } = useLanguage();

  return (
    <section id="serving" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-20 tracking-wide"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t.serving.title}
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <ScrollReveal delay={100} className="h-full">
            <div className="bg-[var(--forest-medium)] p-8 md:p-12 h-full">
              <h3
                className="text-2xl md:text-3xl font-light mb-6 text-[var(--gold)]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {t.serving.cocktails}
              </h3>
              <p className="text-lg leading-relaxed text-[var(--foreground-muted)]">
                {t.serving.cocktailsText}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="h-full">
            <div className="bg-[var(--forest-medium)] p-8 md:p-12 h-full">
              <h3
                className="text-2xl md:text-3xl font-light mb-6 text-[var(--gold)]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {t.serving.digestif}
              </h3>
              <p className="text-lg leading-relaxed text-[var(--foreground-muted)]">
                {t.serving.digestifText}
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#contact"
            className="btn-shimmer inline-block px-10 py-4 bg-[var(--gold)] text-[var(--forest-dark)] hover:bg-transparent hover:text-[var(--gold)] border border-[var(--gold)] transition-all duration-300 tracking-widest text-sm uppercase"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {t.serving.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
