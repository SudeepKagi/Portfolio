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
import { useTheme } from "@/hooks/useTheme";

export const Navbar = ({
  navItems,
  className,
}) => {
  const { resolvedTheme } = useTheme();
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
            "flex max-w-5xl w-full justify-self-center fixed top-0 sm:top-4 inset-x-0 mx-auto md:rounded-lg bg-white/40 dark:bg-zinc-950/20 backdrop-blur-lg border-none z-[5000] px-4 py-3 sm:py-4 items-center justify-between shadow-sm dark:shadow-none",
            className
          )}
        >
          {/* Logo on the left */}
          <div className="flex items-center cursor-pointer shrink-0" onClick={handleLogoClick}>
            {mounted && (
              <AnimatedLogo
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                className="w-6 h-6 sm:w-7 sm:h-7"
                onClick={handleLogoClick}
              />
            )}
          </div>

          {/* All five nav items centered */}
          <div className="flex items-center gap-2.5 sm:gap-6 mx-auto">
            {navItems.map((navItem, idx) => (
              <button
                key={`link=${idx}`}
                onClick={() => handleNavClick(navItem.link)}
                className={cn(
                  "relative font-semibold text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white items-center flex space-x-1.5 transition-colors duration-300 text-xs sm:text-sm px-1 sm:px-2 py-1 rounded-md"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block">{navItem.name}</span>
              </button>
            ))}
          </div>

          {/* Utilities on the right */}
          <div className="flex items-center gap-2 shrink-0">
            <CommandPaletteButton />
            <ModeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

