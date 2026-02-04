'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#story', label: t.nav.story },
    { href: '#ingredients', label: t.nav.ingredients },
    { href: '#tasting', label: t.nav.tasting },
    { href: '#serving', label: t.nav.serving },
    { href: '#details', label: t.nav.details },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--forest-dark)]/95 backdrop-blur-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="text-xl tracking-wider hover:text-[var(--gold)] transition-colors"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Élixir <span className="text-[var(--gold)]">de Charlevoix</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm tracking-wider text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="text-sm tracking-wider text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors ml-4 border border-[var(--forest-light)] px-3 py-1"
          >
            {language === 'en' ? 'FR' : 'EN'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-[var(--foreground)] transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-[var(--foreground)] transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-[var(--foreground)] transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[var(--forest-dark)]/98 backdrop-blur-sm transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg tracking-wider text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="text-lg tracking-wider text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors text-left"
          >
            {language === 'en' ? 'Français' : 'English'}
          </button>
        </div>
      </div>
    </nav>
  );
}
