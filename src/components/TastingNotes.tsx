'use client';

import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from './ScrollReveal';

export default function TastingNotes() {
  const { t } = useLanguage();

  const notes = [
    { title: t.tasting.visual, text: t.tasting.visualText },
    { title: t.tasting.nose, text: t.tasting.noseText },
    { title: t.tasting.palate, text: t.tasting.palateText + ' ' + t.tasting.texture },
    { title: t.tasting.finish, text: t.tasting.finishText },
  ];

  return (
    <section id="tasting" className="py-24 md:py-32 px-6 bg-[var(--background-alt)]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-20 tracking-wide"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t.tasting.title}
          </h2>
        </ScrollReveal>

        <div className="grid gap-12 md:gap-16">
          {notes.map((note, index) => (
            <ScrollReveal key={note.title} delay={index * 100}>
              <div className="border-l-2 border-[var(--gold)] pl-8">
                <h3
                  className="text-xl md:text-2xl font-light mb-4 text-[var(--cream)]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {note.title}
                </h3>
                <p className="text-lg leading-relaxed text-[var(--foreground-muted)]">
                  {note.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
