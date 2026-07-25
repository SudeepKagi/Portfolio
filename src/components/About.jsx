import React, { useRef, useEffect } from 'react';
import { data } from '../data/data';
import '../styles/About.css';

// Animated globe using canvas
const Globe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;

    let angle = 0;
    let animId;

    // Dots on globe surface
    const dots = [];
    for (let lat = -80; lat <= 80; lat += 12) {
      for (let lon = -180; lon < 180; lon += 12) {
        const latR = (lat * Math.PI) / 180;
        const lonR = (lon * Math.PI) / 180;
        dots.push({ lat: latR, lon: lonR });
      }
    }

    // Bengaluru coords
    const blr = { lat: (12.97 * Math.PI) / 180, lon: (77.59 * Math.PI) / 180 };

    const project = (lat, lon, rotY, r) => {
      const x = r * Math.cos(lat) * Math.sin(lon + rotY);
      const y = r * Math.sin(lat);
      const z = r * Math.cos(lat) * Math.cos(lon + rotY);
      return { x, y, z };
    };

    const draw = () => {
      ctx.clearRect(0, 0, 200, 200);
      const cx = 100, cy = 100, r = 80;

      // Globe outline
      const grad = ctx.createRadialGradient(90, 90, 10, 100, 100, 85);
      grad.addColorStop(0, 'rgba(99, 102, 241, 0.12)');
      grad.addColorStop(1, 'rgba(99, 102, 241, 0.02)');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Dots
      dots.forEach(({ lat, lon }) => {
        const p = project(lat, lon, angle, r);
        if (p.z > 0) {
          const sx = cx + p.x;
          const sy = cy - p.y;
          const alpha = 0.15 + 0.5 * (p.z / r);
          ctx.beginPath();
          ctx.arc(sx, sy, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.fill();
        }
      });

      // Bengaluru pin
      const pin = project(blr.lat, blr.lon, angle, r);
      if (pin.z > 0) {
        const sx = cx + pin.x;
        const sy = cy - pin.y;
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#6366f1';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Pulse ring
        const pulseR = 8 + 4 * Math.abs(Math.sin(Date.now() / 400));
        ctx.beginPath();
        ctx.arc(sx, sy, pulseR, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      angle += 0.006;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

// GitHub-style heatmap (simulated)
const ActivityHeatmap = () => {
  const weeks = 24;
  const days = 7;
  const cells = Array.from({ length: weeks * days }, (_, i) => ({
    level: Math.floor(Math.pow(Math.random(), 2) * 5),
  }));

  const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

  return (
    <div className="heatmap-grid">
      {cells.map((cell, i) => (
        <div
          key={i}
          className="heatmap-cell"
          style={{ background: colors[cell.level] }}
          title={`${cell.level * 3} contributions`}
        />
      ))}
    </div>
  );
};

// Tool icons row
const ToolsMarquee = () => {
  const tools = data.tools;
  return (
    <div className="tools-marquee-wrapper">
      <div className="tools-marquee">
        {[...tools, ...tools].map((tool, i) => (
          <div key={i} className="tool-chip">
            <img
              src={tool.icon}
              alt={tool.name}
              className={`tool-icon ${tool.invert ? 'tool-invert' : ''}`}
              onError={(e) => (e.target.style.display = 'none')}
            />
            <span>{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">About</span>
          <h2 className="section-title">A little about me</h2>
        </div>

        <div className="bento-grid">
          {/* Location card */}
          <div className="bento-card bento-location">
            <div className="card-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Bengaluru, Karnataka
            </div>
            <div className="globe-container">
              <Globe />
            </div>
          </div>

          {/* Stats cards */}
          <div className="bento-card bento-stat">
            <div className="stat-icon">🚀</div>
            <div className="stat-value">{data.stats.projects}</div>
            <div className="stat-label">Live Projects</div>
          </div>

          <div className="bento-card bento-stat">
            <div className="stat-icon">☕</div>
            <div className="stat-value">{data.stats.cups}</div>
            <div className="stat-label">Coffees Drank</div>
          </div>

          {/* GitHub activity */}
          <div className="bento-card bento-activity">
            <div className="card-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub Activity
            </div>
            <ActivityHeatmap />
            <div className="heatmap-legend">
              <span>Less</span>
              {['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'].map((c) => (
                <div key={c} className="legend-cell" style={{ background: c }} />
              ))}
              <span>More</span>
            </div>
          </div>

          {/* Stat - Hackathons */}
          <div className="bento-card bento-stat">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">{data.stats.hackathons}</div>
            <div className="stat-label">Hackathons</div>
          </div>

          {/* Fav tool */}
          <div className="bento-card bento-fav-tool">
            <div className="card-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              Fav Stack
            </div>
            <div className="fav-tool-logo">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="fav-icon spin-slow" />
              <span>React + Node</span>
            </div>
          </div>

          {/* Connect */}
          <div className="bento-card bento-connect">
            <div className="card-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              Connect
            </div>
            <div className="connect-links">
              <a href={`mailto:${data.email}`} className="connect-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Email
              </a>
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="connect-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a href={data.github} target="_blank" rel="noreferrer" className="connect-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Tools marquee */}
          <div className="bento-card bento-tools">
            <div className="card-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              Tech Stack
            </div>
            <ToolsMarquee />
          </div>

          {/* Fun fact */}
          <div className="bento-card bento-funfact">
            <div className="card-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              NCC Cadet & Hackathon Runner-Up
            </div>
            <p className="funfact-text">
              🎖️ DDG Commendation from NCC. 🏆 Runner-Up at a national-level hackathon with <strong>NagrikSetu</strong>. I bring discipline from NCC and creativity from hackathons into every project.
            </p>
          </div>

          {/* Lines of code */}
          <div className="bento-card bento-stat">
            <div className="stat-icon">💻</div>
            <div className="stat-value">{data.stats.linesOfCode}</div>
            <div className="stat-label">Lines Written</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
