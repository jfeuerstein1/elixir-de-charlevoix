'use client';

import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from './ScrollReveal';

export default function Ingredients() {
  const { t } = useLanguage();

  return (
    <section id="ingredients" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-20 tracking-wide"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t.ingredients.title}
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <ScrollReveal delay={100}>
            <div>
              <h3
                className="text-2xl md:text-3xl font-light mb-6 text-[var(--gold)]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {t.ingredients.ingredientsTitle}
              </h3>
              <p className="text-lg leading-relaxed text-[var(--foreground-muted)]">
                {t.ingredients.ingredientsText}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div>
              <h3
                className="text-2xl md:text-3xl font-light mb-6 text-[var(--gold)]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {t.ingredients.productionTitle}
              </h3>
              <p className="text-lg leading-relaxed text-[var(--foreground-muted)]">
                {t.ingredients.productionText}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
