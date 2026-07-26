import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-toggle";
import { AnimatedLogo } from "@/components/ui/logo-animation";
import { CommandPaletteButton } from "@/components/command-palette/command-palette-button";
import { IconBrandGithub, IconStar } from "@tabler/icons-react";

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
            "flex max-w-5xl w-full justify-self-center fixed top-0 sm:top-4 inset-x-0 mx-auto md:rounded-lg bg-zinc-950/25 sm:bg-zinc-950/20 backdrop-blur-lg border-none z-[5000] px-4 py-3 sm:py-4 items-center justify-between",
            className
          )}
        >
          {/* Logo on the left */}
          <div className="flex items-center mr-4 sm:mr-16 cursor-pointer" onClick={handleLogoClick}>
            {mounted && (
              <AnimatedLogo
                theme="dark"
                className="w-6 h-6 sm:w-7 sm:h-7"
                onClick={handleLogoClick}
              />
            )}
          </div>

          {/* Links in the center */}
          <div className="flex items-center gap-3 sm:gap-6 ml-auto mr-0 sm:mr-4">
            {navItems.map((navItem, idx) => (
              <button
                key={`link=${idx}`}
                onClick={() => handleNavClick(navItem.link)}
                className={cn(
                  "relative font-semibold text-zinc-400 hover:text-white items-center flex space-x-1 transition-colors duration-300"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block text-sm">{navItem.name}</span>
              </button>
            ))}
            <span
              aria-hidden
              className="h-5 w-px self-center bg-zinc-800"
            />
            <a
              href="https://github.com/SudeepKagi/Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star this site on GitHub (9 stars)"
              className="group inline-flex items-center gap-1.5 rounded-md border-none bg-zinc-900/50 hover:bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <IconBrandGithub className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white" />
              <span className="flex items-center gap-0.5 tabular-nums">
                <IconStar className="h-3 w-3 transition-colors group-hover:text-amber-400 group-hover:animate-spin-grow" />
                9
              </span>
            </a>
            <CommandPaletteButton />
            <ModeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
