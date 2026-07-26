import React, { useState } from "react";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export function ModeToggle() {
  const [isToggling, setIsToggling] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const handleToggle = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    setIsToggling(true);
    setTimeout(() => setIsToggling(false), 500);

    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="flex relative items-center mr-2 sm:mr-4">
      {/* Sun Icon for Light Mode */}
      <IconSun
        onClick={handleToggle}
        className={`cursor-pointer h-5 w-5 text-zinc-500 dark:text-zinc-300 hidden dark:hidden hover:text-zinc-950 transition-transform duration-500 ${
          isToggling ? "animate-spin-grow" : ""
        }`}
        aria-label="Switch to Light Mode"
      />

      {/* Moon Icon for Dark Mode */}
      <IconMoonStars
        onClick={handleToggle}
        className={`cursor-pointer h-5 w-5 text-zinc-300 hover:text-zinc-50 transition-transform duration-500 ${
          isToggling ? "animate-spin-grow" : ""
        }`}
        aria-label="Switch to Dark Mode"
      />
    </div>
  );
}
