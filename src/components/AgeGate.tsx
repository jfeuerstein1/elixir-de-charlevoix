'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface AgeGateProps {
  onVerified: () => void;
}

export default function AgeGate({ onVerified }: AgeGateProps) {
  const { t, language, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem('age-verified');
    if (verified === 'true') {
      setIsVisible(false);
      onVerified();
    }
  }, [onVerified]);

  const handleYes = () => {
    localStorage.setItem('age-verified', 'true');
    setIsVisible(false);
    onVerified();
  };

  const handleNo = () => {
    window.location.href = 'https://www.responsibility.org/';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--forest-dark)]">
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
          className="text-sm text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors"
        >
          {language === 'en' ? 'FR' : 'EN'}
        </button>
      </div>

      <div className="text-center px-6 max-w-md animate-fade-in">
        <h1
          className="text-5xl md:text-6xl font-light tracking-wider mb-2"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Élixir
        </h1>
        <p
          className="text-lg tracking-widest text-[var(--gold)] mb-12"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          de Charlevoix
        </p>

        <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          {t.ageGate.title}
        </h2>
        <p className="text-[var(--foreground-muted)] mb-8">
          {t.ageGate.question}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleYes}
            className="px-8 py-3 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--forest-dark)] transition-all duration-300 tracking-wider text-sm"
          >
            {t.ageGate.yes}
          </button>
          <button
            onClick={handleNo}
            className="px-8 py-3 border border-[var(--foreground-muted)] text-[var(--foreground-muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)] transition-all duration-300 tracking-wider text-sm"
          >
            {t.ageGate.no}
          </button>
        </div>

        <p className="text-xs text-[var(--foreground-muted)] max-w-sm mx-auto">
          {t.ageGate.disclaimer}
        </p>
      </div>
    </div>
  );
}
