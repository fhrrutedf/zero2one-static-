'use client';

import { LanguageProvider } from '@/components/LanguageProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Results from '@/components/Results';
import WhyUs from '@/components/WhyUs';
import Stats from '@/components/Stats';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="saudi-bg-wrapper">
          {/* Saudi landmarks fixed background image */}
          <div className="saudi-bg-image" aria-hidden="true" />
          {/* All page content */}
          <div className="saudi-bg-content min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Hero />
              <About />
              <Services />
              <Portfolio />
              <Results />
              <WhyUs />
              <Stats />
              <Contact />
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
