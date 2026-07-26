import React, { useEffect, useRef, useState } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { HeroConstellation } from "@/components/ui/hero-constellation";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ShimmerBorder } from "@/components/ui/shimmer-border";
import { IconArrowRight } from "@tabler/icons-react";
import {
  AnimatedName,
  HOLD_MS,
  INITIAL_REVEAL_MS,
  SWAP_REVEAL_MS,
} from "@/components/ui/animated-name";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { data } from "@/data/data";

export default function Hero() {
  const [wiggleIcon, setWiggleIcon] = useState(null);
  const [phase, setPhase] = useState("initial");
  const [suffix, setSuffix] = useState("deep");

  useEffect(() => {
    let timer;
    if (phase === "initial") {
      timer = setTimeout(() => setPhase("hold"), INITIAL_REVEAL_MS);
    } else if (phase === "hold") {
      timer = setTimeout(() => setPhase("exit"), HOLD_MS);
    } else if (phase === "enter") {
      timer = setTimeout(() => setPhase("hold"), SWAP_REVEAL_MS);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [phase]);

  const handleExitComplete = () => {
    setSuffix((s) => (s === "deep" ? "peed" : "deep"));
    setPhase("enter");
  };

  const handleIconClick = (iconName) => {
    setWiggleIcon(iconName);
    setTimeout(() => setWiggleIcon(null), 600);
  };

  const handleShimmerButtonClick = () => {
    handleIconClick("email");
  };

  const ctaRef = useRef(null);
  const handleCtaMove = (e) => {
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="pt-32 pb-16 sm:pt-56 relative flex items-center justify-center overflow-hidden">
      <HeroConstellation desktopDots={300} mobileDots={75} />
      <TooltipProvider>
        <BlurFade delay={0.005} inView>
          <div className="relative flex-col space-y-1">
            <div className="relative flex flex-col items-center justify-center">
              <BackgroundGradient className="z-50 h-24 w-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                <img
                  src="/photo.jpg"
                  alt="Profile Picture"
                  className="absolute rounded-full transition-all duration-500 ease-in-out opacity-100 group-hover:opacity-0 w-full h-full object-cover grayscale contrast-100"
                />
                <img
                  src="/photo.jpg"
                  alt="Profile Picture Hover"
                  className="absolute rounded-full transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 w-full h-full object-cover saturate-105 contrast-100"
                />
              </BackgroundGradient>
              <ShimmerButton onClick={handleShimmerButtonClick} className="z-50 mt-8">
                <div className="z-50 relative flex items-center justify-center">
                  <div
                    className="absolute h-1.5 w-1.5 rounded-full border-1 border-green-600/80 bg-green-500 animate-ping mr-2"
                  ></div>
                  <div
                    className="relative h-1 w-1 rounded-full border-1 border-green-600/80 bg-green-500 animate-pulse mr-2"
                  ></div>
                </div>
                <span className="whitespace-pre-wrap text-center font-semibold leading-none text-zinc-300 dark:text-zinc-300 text-xs sm:text-sm py-0.5">
                  Available
                </span>
              </ShimmerButton>
            </div>
            <div className="w-full space-y-6">
              <BlurFade delay={0.005 * 1} inView>
                <p className="z-50 subpixel-antialiased leading-[1.8] text-5xl sm:text-7xl font-bold text-center whitespace-nowrap">
                  <span className="inline-block pb-2 bg-gradient-to-b from-zinc-200 dark:from-zinc-50 to-zinc-950 dark:to-zinc-300 bg-clip-text text-transparent">
                    Hi. I&#39;m{" "}
                    <AnimatedName
                      phase={phase}
                      suffix={suffix}
                      onExitComplete={handleExitComplete}
                      className="font-script font-normal text-[1.05em] leading-none align-baseline"
                    />
                  </span>
                </p>
                <p className="text-base subpixel-antialiased tracking-tight font-medium sm:text-2xl text-center text-secondary-foreground">
                  A Full Stack Engineer who likes{" "}
                  <span className="font-script font-normal text-[1.05em] leading-none align-baseline text-secondary-foreground">
                    building things
                  </span>
                  .
                </p>
              </BlurFade>
              <BlurFade delay={0.005 * 2} direction="down" inView>
                <div className="z-50 flex flex-row items-center justify-center gap-5">
                  <ContactIcons wiggleIcon={wiggleIcon} handleIconClick={handleIconClick} />
                  <span className="h-5 w-px bg-zinc-300/60 dark:bg-zinc-700/60" aria-hidden />
                  <a
                    ref={ctaRef}
                    onMouseMove={handleCtaMove}
                    href="#projects"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-zinc-300/60 dark:border-zinc-700/60 bg-background/40 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:text-foreground"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-full text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                      style={{
                        background:
                          "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), currentColor, transparent 60%)",
                      }}
                    />
                    <span className="relative">View my work</span>
                    <IconArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    <ShimmerBorder />
                  </a>
                </div>
              </BlurFade>
            </div>
          </div>
        </BlurFade>
      </TooltipProvider>
    </div>
  );
}

const iconClass = (label, wiggleIcon) =>
  `text-secondary-foreground ${
    wiggleIcon === label.toLowerCase()
      ? "animate-wiggle scale-150 transition-transform duration-200"
      : ""
  } hover:scale-130 hover:animate-wiggle transition-transform duration-300`;

function ContactIcons({
  wiggleIcon,
  handleIconClick,
}) {
  return (
    <div className="flex flex-row items-center justify-center space-x-6">
      {data.contact.map((link) => (
        <Tooltip key={link.label}>
          <TooltipTrigger asChild>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.aria}
              onClick={() => handleIconClick(link.label.toLowerCase())}
            >
              {React.cloneElement(link.icon, {
                className: iconClass(link.label, wiggleIcon),
              })}
            </a>
          </TooltipTrigger>
          <TooltipContent side="bottom">{link.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
