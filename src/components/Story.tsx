'use client';

import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from './ScrollReveal';

export default function Story() {
  const { t } = useLanguage();

  return (
    <section id="story" className="py-24 md:py-32 px-6 bg-[var(--background-alt)]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-16 tracking-wide"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t.story.title}
          </h2>
        </ScrollReveal>

        <div className="space-y-8 text-lg leading-relaxed text-[var(--foreground-muted)]">
          <ScrollReveal delay={100}>
            <p>{t.story.p1}</p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p>{t.story.p2}</p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p>{t.story.p3}</p>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <p>{t.story.p4}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={500}>
          <div className="mt-16 flex justify-center">
            <div className="w-24 h-px bg-[var(--gold)] opacity-50" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
