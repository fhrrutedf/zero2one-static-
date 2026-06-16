'use client';

import { LanguageProvider } from '@/components/LanguageProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Results from '@/components/Results';
import WhyUs from '@/components/WhyUs';
import Stats from '@/components/Stats';
import Contact from '@/components/Contact';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="saudi-bg-wrapper">
          {/* Saudi landmarks background image - using img tag for max browser compatibility */}
          <img
            src="/images/saudi-landmarks-bg.jpg"
            alt=""
            aria-hidden="true"
            className="saudi-bg-image"
            fetchPriority="high"
          />
          {/* All page content */}
          <div className="saudi-bg-content min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Hero />
              <About />
              <Services />
              <Results />
              <WhyUs />
              <Stats />
              <Contact />
              <Certifications />
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
