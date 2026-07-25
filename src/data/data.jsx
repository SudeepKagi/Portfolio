import React from "react";
import { IconHome, IconBrandGithub, IconBrush, IconBriefcase2, IconBrandLinkedin, IconMail, IconPencil, IconSchool } from "@tabler/icons-react";

export const data = {
  name: "Sudeep Kagi",
  fullName: "Sudeep Shankaranand Kagi",
  nickname: "Sudeep",
  tagline: "A Full Stack Engineer who likes building things.",
  location: "Bengaluru, India",
  email: "sudeepskagi@gmail.com",
  phone: "+91 9535030675",
  github: "https://github.com/SudeepKagi",
  linkedin: "https://www.linkedin.com/in/sudeep-kagi-b87657324/",

  experience: [
    {
      image: "/logo/logo.svg",
      company: "ProctorNet",
      role: "Lead Full-Stack Architect",
      date: "2025",
      description: "Architected a full-stack, multi-role online exam proctoring platform with a 3-tier microservice design (React frontend, Express backend, Python Flask AI service). Implemented WireGuard VPN exam isolation and real-time violation streaming.",
      location: "Bengaluru, IN",
      skills: ["React.js", "Node.js", "Express.js", "Socket.io", "Prisma", "PostgreSQL", "Cloudinary", "Python Flask"],
      href: "https://github.com/SudeepKagi",
    },
    {
      image: "/logo/logo.svg",
      company: "PushDoc",
      role: "Creator & Engineer",
      date: "2025",
      description: "Built a webhook-driven documentation automation SaaS triggered on git push. Runs AST-level code analysis and auto-commits structured READMEs in under 10s with multi-provider LLM failover (Gemini Pro, Flash, Groq).",
      location: "Bengaluru, IN",
      skills: ["React.js", "Node.js", "Express.js", "MongoDB", "GitHub OAuth", "LLM APIs"],
      href: "https://push-doc.vercel.app/",
    },
    {
      image: "/logo/logo.svg",
      company: "NagrikSetu",
      role: "Full-Stack Developer — Hackathon Winner",
      date: "Utkarsh 2026",
      description: "Built an AI-powered civic grievance portal at a 24-hour national hackathon (Runner-Up at Utkarsh 2026). Features automated complaint classification, Haversine geo-clustering, and hourly risk-scoring escalation engines.",
      location: "Davanagere, IN",
      skills: ["React.js", "Node.js", "Firebase", "Leaflet.js", "REST APIs"],
      href: "https://ub-1089.vercel.app/",
    },
    {
      image: "/logo/logo.svg",
      company: "National Cadet Corps (NCC)",
      role: "Senior Cadet — DDG Commendation",
      date: "2023 - 2025",
      description: "Awarded DDG Commendation for exceptional leadership, discipline, and service. Organized technical and social initiatives across camps.",
      location: "Bengaluru, IN",
      skills: ["Leadership", "Team Building", "Operations", "Crisis Management"],
    },
  ],

  education: [
    {
      image: "/logo/logo.svg",
      company: "Nitte Meenakshi Institute of Technology (NMIT)",
      role: "B.E. in Electronics and Communication Engineering",
      date: "2023 - 2027",
      description: "CGPA: 7.54 / 10 · 7th Semester. Core CS & ECE subjects including Data Structures, Algorithms, Operating Systems, Computer Networks, and DBMS.",
      location: "Bengaluru, KA",
      skills: ["Java", "JavaScript", "SQL", "React", "Node.js", "DSA", "DBMS"],
      href: "https://www.nmit.ac.in",
    },
    {
      image: "/logo/logo.svg",
      company: "Konnur Science PU College",
      role: "Pre-University (PCMB)",
      date: "2021 - 2023",
      description: "Physics, Chemistry, Mathematics, Biology.",
      location: "Bengaluru, KA",
      skills: ["Mathematics", "Physics", "Chemistry"],
    },
  ],

  projects: [
    {
      title: "ProctorNet | Forensic-Grade Proctoring System",
      href: "https://github.com/SudeepKagi",
      dates: "2025",
      active: true,
      type: "Microservice Web Platform",
      technologies: ["React.js", "Node.js", "Express.js", "Socket.io", "Prisma", "PostgreSQL", "Python Flask"],
      description: "Multi-role exam proctoring platform with WireGuard VPN network isolation, 10-point security checks, and real-time Socket.io violation streaming to invigilators.",
      thumbnail: "/website_screenshot.png",
    },
    {
      title: "PushDoc | AI-Powered Documentation Engine",
      href: "https://push-doc.vercel.app/",
      dates: "2025",
      active: true,
      type: "Developer SaaS",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "GitHub OAuth", "Gemini API", "Groq"],
      description: "Git push webhook engine that analyzes code diffs via AST parsing and auto-commits markdown documentation with multi-LLM failover strategy.",
      thumbnail: "/website_screenshot.png",
    },
    {
      title: "NagrikSetu | Civic Grievance Portal",
      href: "https://ub-1089.vercel.app/",
      dates: "2025",
      active: true,
      type: "National Hackathon Winner",
      technologies: ["React.js", "Node.js", "Firebase", "Leaflet.js", "Nodemailer"],
      description: "AI-classified complaint routing system with Haversine-based geo-clustering heatmaps and automated officer escalation risk scoring.",
      thumbnail: "/website_screenshot.png",
    },
    {
      title: "TypeCraft | Real-time Multiplayer Typing",
      href: "https://type-craft-lyart.vercel.app/",
      dates: "2025",
      active: true,
      type: "Web Application",
      technologies: ["React.js", "Node.js", "Socket.io", "Express.js", "TailwindCSS"],
      description: "Futuristic multiplayer typing arena with instant room creation, live WPM streaming, and precision analytics.",
      thumbnail: "/website_screenshot.png",
    },
    {
      title: "Stayora | Luxury Homestay Rentals",
      href: "https://stayora-tawny.vercel.app/",
      dates: "2025",
      active: true,
      type: "Web Application",
      technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "Cloudinary"],
      description: "Property booking platform with location search, category browsing, image upload, and seamless booking experience.",
      thumbnail: "/website_screenshot.png",
    },
  ],

  contact: [
    {
      href: "mailto:sudeepskagi@gmail.com",
      label: "Email",
      icon: <IconMail className="h-5 w-5" />,
      aria: "Email",
    },
    {
      href: "https://www.linkedin.com/in/sudeep-kagi-b87657324/",
      label: "LinkedIn",
      icon: <IconBrandLinkedin className="h-5 w-5" />,
      aria: "LinkedIn",
    },
    {
      href: "https://github.com/SudeepKagi",
      label: "GitHub",
      icon: <IconBrandGithub className="h-5 w-5" />,
      aria: "GitHub",
    },
  ],

  nav: [
    {
      name: "Home",
      link: "hero",
      icon: <IconHome className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 transition-colors duration-100" />,
    },
    {
      name: "Projects",
      link: "projects",
      icon: <IconBrush className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 transition-colors duration-100" />
    },
    {
      name: "Experience",
      link: "experience",
      icon: <IconBriefcase2 className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 transition-colors duration-100" />,
    },
  ],

  favoriteLanguage: [
    {
      name: "React",
      icon: "react",
      themeDependent: false,
    }
  ],

  scratchGifs: [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3YXJld3JyYXo1Z3d1Nnh1ZzFxbXU3ZzV5N3JiamNsa3ByMHBvam1vaiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/eOjuCYIGqXSqfBy0MX/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aGh0YmFybmt1d3d4ZGY0c2lyMDhmcTlnMTBkanozNGxuangydjluaSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/AEDD6xjlOxNMgFsUmA/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWdnMDcycTF1ejAyNm1yamVuMTZpZTcxd3UwemhxbzcweGVsMDl5aSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/LqgrTA39s77U8JKhJd/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTY3c293N2VhdDFsMmFkdG85MGpjcnRrd2xybHUwZnI2dGdwdnpzYSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/xYPdnwsRPZDhCxXvOi/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3YXZjdjljYzM0NzhoOHNjajZldDQ2ZzU5YTF5MTExOXQxbGdpdjAxZSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/20JY76TfKAhR20SfJu/giphy.gif",
  ],

  tools: [
    { name: "React", icon: "react", themeDependent: false },
    { name: "NodeJS", icon: "nodejs", themeDependent: false },
    { name: "Javascript", icon: "javascript", themeDependent: false },
    { name: "Typescript", icon: "typescript", themeDependent: false },
    { name: "Express", icon: "express", themeDependent: false },
    { name: "Python", icon: "python", themeDependent: false },
    { name: "C++", icon: "cpp", themeDependent: false },
    { name: "HTML", icon: "html", themeDependent: false },
    { name: "CSS", icon: "css", themeDependent: false },
    { name: "TailwindCSS", icon: "tailwind", themeDependent: false },
    { name: "MongoDB", icon: "mongodb", themeDependent: false },
    { name: "SQL", icon: "sql", themeDependent: false },
    { name: "Git", icon: "git", themeDependent: false },
    { name: "Github", icon: "github", themeDependent: true },
    { name: "VSCode", icon: "vscode", themeDependent: false },
  ],
};
