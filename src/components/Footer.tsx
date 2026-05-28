'use client';

import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-[var(--forest-light)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p
              className={`text-xl tracking-wider mb-1${siteConfig.uppercase ? ' uppercase' : ''}`}
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {siteConfig.primaryName}
            </p>
            <p
              className="text-sm tracking-widest text-[var(--gold)] mb-2"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {siteConfig.subName}
            </p>
            <p className="text-sm text-[var(--foreground-muted)]">
              {t.footer.tagline}
            </p>
          </div>

          <div className="text-center md:text-right text-sm text-[var(--foreground-muted)]">
            <p className="mb-1">
              © {currentYear} {siteConfig.primaryName} — {siteConfig.subName}. {t.footer.rights}
            </p>
            <p>{t.footer.drink}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
