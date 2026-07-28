import { useState, useEffect } from "react";

export function useTheme() {
  const [resolvedTheme, setResolvedTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "dark";
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setResolvedTheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return { theme: resolvedTheme, resolvedTheme };
}
