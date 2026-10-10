import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="site-layout-wrapper">
      <Navigation />
      <main className="site-main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
