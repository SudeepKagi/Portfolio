import React, { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";

export function CommandPaletteButton() {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPod|iPad/i.test(navigator.userAgent));
  }, []);

  const open = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open command palette"
      className="inline-flex items-center gap-2 rounded-md border-none bg-zinc-900/50 hover:bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-400 hover:text-white transition-colors"
    >
      <IconSearch className="h-3.5 w-3.5 text-zinc-400" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border-none bg-zinc-950/80 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
        <span className="text-[11px] leading-none">{isMac ? "⌘" : "Ctrl"}</span>
        K
      </kbd>
    </button>
  );
}
