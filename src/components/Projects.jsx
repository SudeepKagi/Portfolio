import React, { useState } from 'react';
import { data } from '../data/data';
import '../styles/Projects.css';

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`project-card ${hovered ? 'hovered' : ''}`}
      style={{ '--accent': project.color, '--delay': `${index * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card header with emoji and type */}
      <div className="project-header">
        <div className="project-emoji-badge" style={{ background: `${project.color}22`, border: `1px solid ${project.color}44` }}>
          <span className="project-emoji">{project.emoji}</span>
        </div>
        <div className="project-meta">
          <span className="project-type">{project.type}</span>
          <span className="project-date">{project.dates}</span>
        </div>
        <div className="project-links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="project-link-btn live" title="Live Demo">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
              Live
            </a>
          )}
          <a href={project.href} target="_blank" rel="noreferrer" className="project-link-btn github" title="Source Code">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Code
          </a>
        </div>
      </div>

      {/* Accent line */}
      <div className="project-accent-line" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      {/* Title & description */}
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-desc">{project.description}</p>

        {/* Highlights */}
        <ul className="project-highlights">
          {project.highlights.map((h, i) => (
            <li key={i} className="highlight-item">
              <span className="highlight-dot" style={{ background: project.color }} />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      <div className="project-footer">
        <div className="tech-tags">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag" style={{ '--accent': project.color }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Glow overlay on hover */}
      <div
        className="project-glow"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}22 0%, transparent 70%)` }}
      />
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">Projects</span>
          <h2 className="section-title">Things I've built</h2>
          <p className="section-desc">
            From AI-powered tools to real-time systems — every project solves a real problem.
          </p>
        </div>

        <div className="projects-grid">
          {data.projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <div className="projects-footer">
          <a href={data.github} target="_blank" rel="noreferrer" className="view-all-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
