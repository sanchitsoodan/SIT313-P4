import React from 'react';
import Banner from '../components/Banner';
import About from '../components/About';
import Projects from '../components/Projects';
import FeaturedContent from '../components/FeaturedContent';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <div className="home-page">
      <Banner />
      <About />
      <Projects />
      <FeaturedContent />
      <Gallery />
      <Contact />
    </div>
  );
}
