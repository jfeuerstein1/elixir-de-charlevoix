'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-[var(--forest-light)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p
              className="text-xl tracking-wider mb-2"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Élixir <span className="text-[var(--gold)]">de Charlevoix</span>
            </p>
            <p className="text-sm text-[var(--foreground-muted)]">
              {t.footer.tagline}
            </p>
          </div>

          <div className="text-center md:text-right text-sm text-[var(--foreground-muted)]">
            <p className="mb-1">
              © {currentYear} Élixir de Charlevoix. {t.footer.rights}
            </p>
            <p>{t.footer.drink}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
