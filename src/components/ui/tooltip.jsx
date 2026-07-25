import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function TooltipProvider({ children }) {
  return <>{children}</>;
}

export function Tooltip({ children, open: controlledOpen, delayDuration = 0 }) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setUncontrolledOpen(true)}
      onMouseLeave={() => setUncontrolledOpen(false)}
    >
      {React.Children.map(children, (child) => {
        if (!child) return null;
        if (child.type === TooltipTrigger) {
          return child;
        }
        if (child.type === TooltipContent) {
          return isOpen ? child : null;
        }
        return child;
      })}
    </div>
  );
}

export function TooltipTrigger({ children, asChild, ...props }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, props);
  }
  return <div {...props}>{children}</div>;
}

export function TooltipContent({ children, className, side = "top" }) {
  return (
    <div
      className={cn(
        "absolute z-50 px-2.5 py-1 text-xs font-medium text-white bg-zinc-900 border border-zinc-700/80 rounded-md shadow-lg whitespace-nowrap pointer-events-none transition-all duration-150",
        side === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
        side === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
        className
      )}
    >
      {children}
    </div>
  );
}
