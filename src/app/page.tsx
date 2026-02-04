'use client';

import { useState } from 'react';
import AgeGate from '@/components/AgeGate';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Ingredients from '@/components/Ingredients';
import TastingNotes from '@/components/TastingNotes';
import Serving from '@/components/Serving';
import Details from '@/components/Details';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <>
      <AgeGate onVerified={() => setIsVerified(true)} />

      <div className={isVerified ? 'opacity-100' : 'opacity-0 pointer-events-none'}>
        <Navigation />
        <main>
          <Hero />
          <Story />
          <Ingredients />
          <TastingNotes />
          <Serving />
          <Details />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
