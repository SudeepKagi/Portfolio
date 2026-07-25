import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function SpotlightGlow({
  color = "rgba(255, 255, 255, 0.12)",
  size = 300,
  className,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const handleMove = (e) => {
      const rect = parent.getBoundingClientRect();
      el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
    };

    parent.addEventListener("pointermove", handleMove);
    return () => parent.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100",
        className
      )}
      style={{
        background: `radial-gradient(${size}px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${color}, transparent 70%)`,
      }}
    />
  );
}
