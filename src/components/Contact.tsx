'use client';

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto">
        {status === 'success' ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="mb-8">
              <svg
                className="w-16 h-16 mx-auto text-[var(--gold)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p
              className="text-2xl md:text-3xl font-light text-[var(--gold)] mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {t.contact.successTitle}
            </p>
            <p className="text-[var(--gold)]">
              {t.contact.successMessage}
            </p>
          </div>
        ) : (
          <>
          <ScrollReveal>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-6 tracking-wide"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {t.contact.title}
            </h2>
            <p className="text-center text-[var(--foreground-muted)] mb-16">
              {t.contact.subtitle}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm tracking-wider text-[var(--foreground-muted)] mb-2"
                >
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--forest-light)] py-3 text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm tracking-wider text-[var(--foreground-muted)] mb-2"
                >
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--forest-light)] py-3 text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm tracking-wider text-[var(--foreground-muted)] mb-2"
                >
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-[var(--forest-light)] py-3 text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full md:w-auto px-12 py-4 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--forest-dark)] transition-all duration-300 tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? t.contact.sending : t.contact.send}
                </button>
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-center">{t.contact.error}</p>
              )}
            </form>
          </ScrollReveal>
          </>
        )}
      </div>
    </section>
  );
}
