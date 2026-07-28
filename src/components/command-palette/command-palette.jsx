import React, { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import {
  IconSearch,
  IconHome,
  IconLayoutDashboard,
  IconBrush,
  IconBriefcase2,
  IconMail,
  IconCheck,
  IconCopy,
  IconSun,
  IconMoon,
  IconBrandGithub,
  IconBrandLinkedin,
  IconUser,
} from "@tabler/icons-react";
import { useTheme } from "@/hooks/useTheme";
import { data } from "@/data/data";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const run = useCallback((fn) => {
    setOpen(false);
    requestAnimationFrame(fn);
  }, []);

  const goToSection = useCallback((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}`, "_blank");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [resolvedTheme]);

  if (!open) return null;

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-[6000] bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="fixed left-1/2 top-12 sm:top-[12%] z-[6001] flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 flex-col max-h-[calc(100svh-4rem)] animate-in fade-in zoom-in-95 duration-150"
      >
        <Command
          label="Command palette"
          className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 shadow-2xl backdrop-blur-xl text-foreground"
        >
          <div className="flex shrink-0 items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 px-4 py-1">
            <IconSearch className="h-4 w-4 text-muted-foreground" />
            <Command.Input
              placeholder="Type a command or search sections & projects..."
              className="flex-1 bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex items-center rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              esc
            </kbd>
          </div>

          <Command.List className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 max-h-[60vh]">
            <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Group heading="Navigation">
              <Item
                icon={<IconHome className="h-4 w-4 text-primary" />}
                label="Home"
                sublabel="Go to top section"
                onSelect={() => run(() => goToSection("hero"))}
              />
              <Item
                icon={<IconLayoutDashboard className="h-4 w-4 text-indigo-400" />}
                label="Dashboard"
                sublabel="View stats, tools & location"
                onSelect={() => run(() => goToSection("dashboard"))}
              />
              <Item
                icon={<IconUser className="h-4 w-4 text-emerald-400" />}
                label="About Me"
                sublabel="Read background & bio"
                onSelect={() => run(() => goToSection("about"))}
              />
              <Item
                icon={<IconBrush className="h-4 w-4 text-amber-400" />}
                label="Projects"
                sublabel="Explore portfolio projects"
                onSelect={() => run(() => goToSection("projects"))}
              />
              <Item
                icon={<IconBriefcase2 className="h-4 w-4 text-cyan-400" />}
                label="Experience & Education"
                sublabel="View work & degree history"
                onSelect={() => run(() => goToSection("experience"))}
              />
              <Item
                icon={<IconMail className="h-4 w-4 text-pink-400" />}
                label="Contact"
                sublabel="Send an email or message"
                onSelect={() => run(() => goToSection("contact"))}
              />
            </Group>

            <Group heading="Projects">
              {data.projects.map((proj) => (
                <Item
                  key={proj.title}
                  icon={<IconBrush className="h-4 w-4 text-primary" />}
                  label={proj.title}
                  sublabel={proj.technologies.slice(0, 3).join(", ")}
                  onSelect={() =>
                    run(() => window.open(proj.href, "_blank", "noopener,noreferrer"))
                  }
                />
              ))}
            </Group>

            <Group heading="Quick Actions">
              <Item
                icon={
                  copied ? (
                    <IconCheck className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <IconCopy className="h-4 w-4" />
                  )
                }
                label={copied ? "Copied Email!" : "Copy Email Address"}
                sublabel={data.email}
                onSelect={copyEmail}
              />
              <Item
                icon={
                  resolvedTheme === "dark" ? (
                    <IconSun className="h-4 w-4 text-amber-400" />
                  ) : (
                    <IconMoon className="h-4 w-4 text-indigo-400" />
                  )
                }
                label={`Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode`}
                onSelect={() => run(toggleTheme)}
              />
            </Group>

            <Group heading="Social & Links">
              <Item
                icon={<IconBrandGithub className="h-4 w-4" />}
                label="GitHub Profile"
                sublabel="github.com/SudeepKagi"
                onSelect={() =>
                  run(() =>
                    window.open(data.github, "_blank", "noopener,noreferrer")
                  )
                }
              />
              <Item
                icon={<IconBrandLinkedin className="h-4 w-4" />}
                label="LinkedIn Profile"
                sublabel="linkedin.com/in/sudeep-kagi-b87657324"
                onSelect={() =>
                  run(() =>
                    window.open(data.linkedin, "_blank", "noopener,noreferrer")
                  )
                }
              />
              <Item
                icon={<IconMail className="h-4 w-4" />}
                label="Compose Email"
                sublabel={data.email}
                onSelect={() =>
                  run(() =>
                    window.open(
                      `https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  )
                }
              />
            </Group>
          </Command.List>
        </Command>
      </div>
    </>
  );
}

function Group({ heading, children }) {
  return (
    <Command.Group
      heading={heading}
      className="mb-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/80"
    >
      {children}
    </Command.Group>
  );
}

function Item({ icon, label, sublabel, onSelect }) {
  return (
    <Command.Item
      value={`${label} ${sublabel || ""}`.trim()}
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-foreground/90 data-[selected=true]:bg-zinc-100 dark:data-[selected=true]:bg-zinc-900 transition-colors"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-muted-foreground">
        {icon}
      </span>
      <span className="flex-1 truncate font-medium">{label}</span>
      {sublabel && (
        <span className="hidden sm:inline truncate text-xs text-muted-foreground">
          {sublabel}
        </span>
      )}
    </Command.Item>
  );
}
