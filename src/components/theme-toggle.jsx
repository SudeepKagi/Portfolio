import React, { useState } from "react";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useTheme } from "@/hooks/useTheme";

export function ModeToggle() {
  const { resolvedTheme } = useTheme();
  const [isToggling, setIsToggling] = useState(false);

  const setTheme = (nextTheme) => {
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleToggle = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";

    const spinIcon = () => {
      setIsToggling(true);
      setTimeout(() => setIsToggling(false), 500);
    };

    if (typeof document.startViewTransition !== "function") {
      setTheme(next);
      spinIcon();
      return;
    }

    const transition = document.startViewTransition(() => setTheme(next));
    transition.finished.then(spinIcon).catch(() => spinIcon());
  };

  return (
    <div className="flex relative items-center mr-2 sm:mr-4">
      {/* Sun Icon for Light Mode */}
      <IconSun
        onClick={handleToggle}
        className={`cursor-pointer h-5 w-5 text-zinc-500 dark:text-zinc-300 dark:hidden hover:text-zinc-950 transition-transform duration-500 ${
          isToggling ? "animate-spin-grow" : ""
        }`}
        aria-label="Switch to Dark Mode"
      />

      {/* Moon Icon for Dark Mode */}
      <IconMoonStars
        onClick={handleToggle}
        className={`cursor-pointer h-5 w-5 text-zinc-500 dark:text-zinc-300 hidden dark:block hover:text-zinc-50 transition-transform duration-500 ${
          isToggling ? "animate-spin-grow" : ""
        }`}
        aria-label="Switch to Light Mode"
      />
    </div>
  );
}

