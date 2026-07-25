import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { data } from '../data/data';
import '../styles/Hero.css';

const TypeWriter = ({ texts }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setDisplayText(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTextIndex((i) => (i + 1) % texts.length);
          setCharIndex(0);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <span className="typewriter-text">
      {displayText}
      <span className="cursor">|</span>
    </span>
  );
};

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const roles = [
    'Full Stack Developer',
    'React Engineer',
    'API Architect',
    'Open Source Contributor',
    'Problem Solver',
  ];

  return (
    <section id="hero" className="hero-section">
      {/* Glow orbs */}
      <div className="hero-glow glow-1" />
      <div className="hero-glow glow-2" />

      <div className={`hero-content ${mounted ? 'mounted' : ''}`}>
        {/* Avatar */}
        <div className="avatar-wrapper">
          <div className="avatar-ring" />
          <img
            src="/photo.jpg"
            alt="Sudeep Kagi"
            className="avatar-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.querySelector('.avatar-fallback').style.display = 'flex';
            }}
          />
          <div className="avatar-fallback" style={{ display: 'none' }}>
            <span>SK</span>
          </div>
        </div>

        {/* Status badge */}
        <div className="status-badge">
          <span className="status-dot" />
          <span>{data.availableText}</span>
        </div>

        {/* Name */}
        <h1 className="hero-name">
          Hi. I'm <span className="name-highlight">{data.nickname}</span>
        </h1>

        {/* Tagline */}
        <p className="hero-tagline">
          A <TypeWriter texts={roles} /> who loves creating.
        </p>

        {/* Description */}
        <p className="hero-bio">{data.bio}</p>

        {/* Social icons + CTA */}
        <div className="hero-actions">
          <a href={`mailto:${data.email}`} className="social-icon-btn" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
          <a href={data.linkedin} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href={data.github} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>

          <ScrollLink
            to="projects"
            smooth={true}
            duration={600}
            offset={-80}
            className="cta-btn"
          >
            View my work
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </ScrollLink>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
