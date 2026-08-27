import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState, useMemo } from "react";

const levelColors = {
  0: "bg-zinc-100 dark:bg-neutral-800/50",
  1: "bg-green-200 dark:bg-green-900/70",
  2: "bg-green-400 dark:bg-green-700/80",
  3: "bg-green-600 dark:bg-green-500/90",
  4: "bg-green-700 dark:bg-green-400",
  NONE: "bg-zinc-100 dark:bg-neutral-800/50",
  FIRST_QUARTILE: "bg-green-200 dark:bg-green-900/70",
  SECOND_QUARTILE: "bg-green-400 dark:bg-green-700/80",
  THIRD_QUARTILE: "bg-green-600 dark:bg-green-500/90",
  FOURTH_QUARTILE: "bg-green-700 dark:bg-green-400",
};

export function GitHubHeatmap({ contributions = [], isLoading = false }) {
  const [revealedIndices, setRevealedIndices] = useState(new Set());

  const placeholderData = useMemo(() => {
    return Array.from({ length: 63 }, (_, i) => ({
      date: new Date(Date.now() - (62 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      count: 0,
      level: 0,
    }));
  }, []);

  const displayContributions = isLoading || !contributions.length ? placeholderData : contributions;

  const weeks = useMemo(() => {
    const list = [];
    for (let i = 0; i < displayContributions.length; i += 7) {
      list.push(displayContributions.slice(i, i + 7));
    }
    return list;
  }, [displayContributions]);

  useEffect(() => {
    if (!isLoading && contributions.length > 0) {
      setRevealedIndices(new Set());
      const delay = 15;
      contributions.forEach((_, index) => {
        setTimeout(() => {
          setRevealedIndices((prev) => new Set(prev).add(index));
        }, index * delay);
      });
    }
  }, [isLoading, contributions]);

  const formatDate = (dateString) => {
    const date = new Date(dateString + "T12:00:00Z");
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  };

  let flatIndex = 0;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex gap-1.5 sm:gap-1.5">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1.5 sm:gap-1.5">
              {week.map((day) => {
                const currentIndex = flatIndex++;
                const isRevealed = isLoading || revealedIndices.has(currentIndex);
                const displayLevel = isRevealed ? (day.level ?? 0) : 0;

                return (
                  <Tooltip key={day.date}>
                    <TooltipTrigger asChild>
                      <a
                        href="https://github.com/SudeepKagi"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View GitHub profile"
                        className={`
                          block w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 rounded-[2px]
                          ${levelColors[displayLevel] || levelColors[0]}
                          transition-all duration-300
                          hover:scale-125
                          cursor-pointer
                        `}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <div className="text-xs">
                        <div className="font-semibold">
                          {day.count} {day.count === 1 ? "contribution" : "contributions"}
                        </div>
                        <div className="text-muted-foreground">{formatDate(day.date)}</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
