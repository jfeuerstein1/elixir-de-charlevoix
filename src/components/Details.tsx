'use client';

import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from './ScrollReveal';

export default function Details() {
  const { t } = useLanguage();

  const details = [
    { label: t.details.abv, value: t.details.abvValue },
    { label: t.details.size, value: t.details.sizeValue },
    { label: t.details.availability, value: t.details.availabilityValue },
    { label: t.details.price, value: t.details.priceValue },
  ];

  return (
    <section id="details" className="py-24 md:py-32 px-6 bg-[var(--background-alt)]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-20 tracking-wide"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t.details.title}
          </h2>
        </ScrollReveal>

        <div className="grid gap-8">
          {details.map((detail, index) => (
            <ScrollReveal key={detail.label} delay={index * 100}>
              <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-[var(--forest-light)]">
                <span
                  className="text-lg text-[var(--gold)] mb-2 md:mb-0"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {detail.label}
                </span>
                <span className="text-lg text-[var(--foreground-muted)]">
                  {detail.value}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
