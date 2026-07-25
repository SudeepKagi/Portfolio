import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedLogo } from "@/components/ui/logo-animation";
import { IconBrandGithub, IconStar, IconSearch, IconSun, IconMoon } from "@tabler/icons-react";

export const Navbar = ({
  navItems,
  className,
}) => {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollY.getPrevious();
      const direction = previous !== undefined ? current - previous : 0;

      if (current < 50) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleNavClick = (link) => {
    const section = document.getElementById(link);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex sm:max-w-5xl w-full justify-self-center backdrop-blur-lg fixed top-0 sm:top-4 inset-x-0 mx-auto md:rounded-lg bg-background/20 z-[5000] pr-4 pl-6 py-4 items-center justify-between border border-border/40",
            className
          )}
        >
          <div className="flex items-center mr-4 sm:mr-16 cursor-pointer" onClick={handleLogoClick}>
            {mounted && (
              <AnimatedLogo
                theme="dark"
                className="w-6 h-6 sm:w-7 sm:h-7"
                onClick={handleLogoClick}
              />
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-6 ml-auto mr-0 sm:mr-4">
            {navItems.map((navItem, idx) => (
              <button
                key={`link=${idx}`}
                onClick={() => handleNavClick(navItem.link)}
                className={cn(
                  "relative font-semibold text-muted-foreground items-center flex space-x-1 hover:text-white transition-colors duration-300"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block text-sm">{navItem.name}</span>
              </button>
            ))}
            <span
              aria-hidden
              className="h-5 w-px self-center bg-zinc-700/60"
            />
            <a
              href="https://github.com/SudeepKagi/Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star this site on GitHub"
              className="group inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/40 hover:bg-background/70 hover:border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <IconBrandGithub className="h-3.5 w-3.5" />
              <span className="flex items-center gap-0.5 tabular-nums">
                <IconStar className="h-3 w-3 transition-colors group-hover:text-amber-400 group-hover:animate-spin-grow" />
                12
              </span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
