import React, { useState, useRef, useEffect } from "react";
import { IconSend, IconBrandGithub, IconStar, IconRss } from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";
import { AnimatedLogo } from "@/components/ui/logo-animation";
import { data } from "@/data/data";

export const Footer = () => {
  const [sent, setSent] = useState(false);
  const waveRef = useRef(null);
  const waveInView = useInView(waveRef, { amount: 0.5 });
  const [waveKey, setWaveKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (waveInView) setWaveKey((k) => k + 1);
  }, [waveInView]);

  const handleSendClick = () => {
    if (sent) return;
    setSent(true);
    window.setTimeout(() => setSent(false), 1300);
  };

  const handleNavClick = (link) => {
    const section = document.getElementById(link);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative w-full bg-background text-secondary-foreground overflow-hidden">
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col px-4 pt-20 sm:pt-28">
        <div className="flex flex-col items-center justify-center mb-16 sm:mb-24">
          <h2 className="mx-16 sm:mx-none text-center text-pretty text-3xl sm:text-4xl font-bold mb-8">
            Say{" "}
            <span className="font-script font-normal text-[1.05em] leading-none align-baseline">
              hello
            </span>
            .{" "}
            <span ref={waveRef} className="inline-block">
              <span
                key={waveKey}
                className="inline-block origin-bottom-right animate-wiggle hover:animate-wiggle"
              >
                👋
              </span>
            </span>
          </h2>
          <a
            href={`mailto:${data.email}`}
            onClick={handleSendClick}
            className="group inline-block active:scale-95 transition-transform duration-150"
          >
            <div className="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] font-medium text-white shadow-lg transition-all duration-300 hover:shadow-indigo-500/25">
              <div className="flex items-center gap-2 rounded-[10px] bg-zinc-950 px-6 py-3 transition-all duration-300 group-hover:bg-opacity-80">
                <motion.span
                  aria-hidden
                  className="inline-flex will-change-transform"
                  animate={
                    sent
                      ? {
                          x: [0, 24, 90, 0, 0],
                          y: [0, -38, -64, 30, 0],
                          rotate: [0, 25, 45, 0, 0],
                          opacity: [1, 1, 0, 0, 1],
                        }
                      : { x: 0, y: 0, rotate: 0, opacity: 1 }
                  }
                  transition={{
                    duration: sent ? 1.2 : 0.45,
                    ease: "easeOut",
                  }}
                >
                  <IconSend className="h-5 w-5 transition-transform duration-200 group-hover:-rotate-12 group-hover:-translate-y-0.5" />
                </motion.span>
                <p className="tracking-tight text-base font-semibold">Contact Me</p>
              </div>
            </div>
          </a>
          <a
            href="https://github.com/SudeepKagi/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <IconBrandGithub className="h-4 w-4" />
            <span>This site is open source: star it on GitHub</span>
            <IconStar className="h-3.5 w-3.5 transition-colors group-hover:text-amber-400 group-hover:animate-spin-grow" />
            <span className="tabular-nums font-medium">12</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 border-t border-border/50 pt-10 pb-8">
          <div className="col-span-2 sm:col-span-1 flex flex-col items-start gap-3">
            {mounted && (
              <AnimatedLogo
                theme="dark"
                className="w-8 h-8"
                onClick={handleLogoClick}
              />
            )}
            <p className="text-sm font-semibold tracking-tight text-primary">
              {data.name}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Full Stack Engineer & ECE Student at NMIT Bengaluru, building production-grade web applications.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
              Navigate
            </h3>
            <ul className="flex flex-col gap-2">
              {data.nav.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.link)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
              Connect
            </h3>
            <ul className="flex flex-col gap-2">
              {data.contact.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={item.aria}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center border-t border-border/50 pt-6 pb-6">
          <p className="text-xs text-muted-foreground leading-none">
            &copy; {new Date().getFullYear()} Sudeep Kagi. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground leading-none">
            Built with ❤️ using React, Vite and Tailwind
          </p>
        </div>
      </div>
      <img
        src="/layout/background-ellipse3.svg"
        alt=""
        className="absolute bottom-0 blur-md left-1/2 transform -translate-x-1/2 translate-y-3/5 w-auto z-0 pointer-events-none select-none max-w-5xl opacity-40"
      />
    </footer>
  );
};
