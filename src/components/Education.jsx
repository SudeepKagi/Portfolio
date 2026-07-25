import React from 'react';
import { data } from '../data/data';
import '../styles/Education.css';

const Education = () => {
  return (
    <section id="education" className="education-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">Education & Achievements</span>
          <h2 className="section-title">The journey so far</h2>
          <p className="section-desc">
            Building strong foundations — from school to national hackathon stages.
          </p>
        </div>

        <div className="edu-layout">
          {/* Education Timeline */}
          <div className="edu-column">
            <h3 className="edu-col-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              Education
            </h3>
            <div className="edu-timeline">
              {data.education.map((edu, i) => (
                <div key={i} className="edu-item" style={{ '--color': edu.color, '--delay': `${i * 0.15}s` }}>
                  <div className="edu-dot" style={{ background: edu.color, boxShadow: `0 0 12px ${edu.color}88` }}>
                    <span>{edu.icon}</span>
                  </div>
                  <div className="edu-connector" />
                  <div className="edu-card">
                    <div className="edu-card-top">
                      <div>
                        <h4 className="edu-institution">{edu.institution}</h4>
                        <p className="edu-degree">{edu.degree}</p>
                      </div>
                      <div className="edu-date-location">
                        <span className="edu-date">{edu.date}</span>
                        <span className="edu-location">
                          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                          {edu.location}
                        </span>
                      </div>
                    </div>
                    <span className="edu-detail">{edu.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="edu-column">
            <h3 className="edu-col-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
              Achievements
            </h3>
            <div className="achievements-grid">
              {data.achievements.map((ach, i) => (
                <div key={i} className="achievement-card" style={{ '--color': ach.color, '--delay': `${i * 0.1}s` }}>
                  <div className="ach-icon-wrap" style={{ background: `${ach.color}18`, border: `1px solid ${ach.color}33` }}>
                    <span className="ach-icon">{ach.icon}</span>
                  </div>
                  <div className="ach-content">
                    <h4 className="ach-title">{ach.title}</h4>
                    <p className="ach-subtitle">{ach.subtitle}</p>
                    <p className="ach-org">{ach.org}</p>
                    <p className="ach-desc">{ach.desc}</p>
                  </div>
                  <div className="ach-glow" style={{ background: `radial-gradient(circle at 0% 50%, ${ach.color}18, transparent 60%)` }} />
                </div>
              ))}
            </div>

            {/* Skills quick view */}
            <div className="skills-quick">
              <h3 className="edu-col-title" style={{ marginTop: '2rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                Technical Skills
              </h3>
              <div className="skills-categories">
                {Object.entries(data.skills).map(([cat, items]) => (
                  <div key={cat} className="skill-cat">
                    <span className="skill-cat-name">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                    <div className="skill-tags">
                      {items.map((skill) => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
