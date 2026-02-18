import * as React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import DetailedFeatures from '../components/DetailedFeatures';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <DetailedFeatures />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
