import React from "react";
import { cn } from "@/lib/utils";

export const ShimmerButton = React.forwardRef(
  (
    {
      shimmerColor = "#ffffff",
      shimmerDuration = "4.5s",
      borderRadius = "200px",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={{
          "--speed": shimmerDuration,
          "--radius": borderRadius,
          "--shine-color": shimmerColor,
        }}
        className={cn(
          "group relative z-50 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap",
          "border border-black/10 bg-zinc-200/60 px-2 py-1 text-zinc-700",
          "dark:border-white/10 dark:bg-background dark:text-zinc-300",
          "[border-radius:var(--radius)]",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}

        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3",
            "animate-button-shine opacity-50 dark:opacity-40",
            "[background:linear-gradient(to_right,transparent,var(--shine-color),transparent)]",
          )}
        />

        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 [border-radius:var(--radius)]",
            "shadow-[inset_0_-8px_10px_#ffffff1f] transition-shadow duration-300 ease-in-out",
            "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
            "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]",
          )}
        />
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";
