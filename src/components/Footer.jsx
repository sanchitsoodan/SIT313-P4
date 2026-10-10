import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email) return;
    setMessage(`✓ Thank you for subscribing to DEV@Deakin Daily Insider, ${email}!`);
    setEmail('');
  };

  return (
    <footer id="newsletter" className="site-footer">
      {/* Newsletter Sign-Up Section (Matching Tasksheet Page 3 Wireframe) */}
      <section className="newsletter-bar">
        <div className="newsletter-bar-inner">
          <span className="newsletter-title">SIGN UP FOR OUR DAILY INSIDER</span>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        {message && <div className="newsletter-status">{message}</div>}
      </section>

      {/* Footer Main Content Columns (Explore, Support, Stay Connected) */}
      <div className="footer-columns-wrapper">
        <div className="footer-columns">
          <div className="footer-col">
            <h3>Explore</h3>
            <a href="#about">Home</a>
            <a href="#articles">Questions</a>
            <a href="#articles">Articles</a>
            <a href="#tutorials">Tutorials</a>
          </div>

          <div className="footer-col">
            <h3>Support</h3>
            <a href="#newsletter">FAQs</a>
            <a href="#newsletter">Help</a>
            <a href="#contact">Contact Us</a>
          </div>

          <div className="footer-col">
            <h3>Stay connected</h3>
            <div className="social-icons">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/sanchit-soodan-ab62b2283"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar (DEV@Deakin 2026, Privacy Policy, Terms, Code of Conduct) */}
      <div className="footer-bottom-wrapper">
        <div className="footer-bottom">
          <div className="footer-branding">DEV@Deakin 2026</div>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms</a>
            <a href="#conduct">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
