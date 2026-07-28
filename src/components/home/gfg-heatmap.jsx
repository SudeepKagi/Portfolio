import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState, useMemo } from "react";
import { useGFG } from "@/hooks/useGFG";

const gfgLevelColors = {
  NONE: "bg-zinc-100 dark:bg-neutral-800/50",
  LOW: "bg-emerald-200 dark:bg-emerald-900/60",
  MEDIUM: "bg-emerald-400 dark:bg-emerald-700/80",
  HIGH: "bg-emerald-500 dark:bg-emerald-500",
  MAX: "bg-emerald-600 dark:bg-emerald-400",
};

export function GFGHeatmap({ profileHandle = "sudeep327s" }) {
  const { data: gfgState, isLoading } = useGFG(profileHandle);
  const [revealedIndices, setRevealedIndices] = useState(new Set());

  const placeholderData = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      date: new Date(Date.now() - (34 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      count: 0,
      level: "NONE",
    }));
  }, []);

  const displaySubmissions = isLoading || !gfgState?.submissions ? placeholderData : gfgState.submissions;

  // Group into 5 columns (weeks) of 7 days (rows), matching GitHub/GFG layout
  const weeks = useMemo(() => {
    const list = [];
    for (let i = 0; i < displaySubmissions.length; i += 7) {
      list.push(displaySubmissions.slice(i, i + 7));
    }
    return list;
  }, [displaySubmissions]);

  useEffect(() => {
    if (!isLoading && gfgState?.submissions) {
      setRevealedIndices(new Set());
      const indices = Array.from({ length: gfgState.submissions.length }, (_, i) => i);
      const delay = 15;
      indices.forEach((index, sequence) => {
        setTimeout(() => {
          setRevealedIndices((prev) => new Set(prev).add(index));
        }, sequence * delay);
      });
    }
  }, [isLoading, gfgState]);

  const formatDate = (dateString) => {
    const date = new Date(dateString + "T12:00:00Z");
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  };

  let flatIndex = 0;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex gap-1.5 sm:gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1.5 sm:gap-1">
              {week.map((day) => {
                const currentIndex = flatIndex++;
                const isRevealed = isLoading || revealedIndices.has(currentIndex);
                const displayLevel = isRevealed ? day.level : "NONE";

                return (
                  <Tooltip key={day.date}>
                    <TooltipTrigger asChild>
                      <a
                        href={`https://www.geeksforgeeks.org/profile/${profileHandle}?tab=activity`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View GeeksforGeeks activity profile"
                        className={`
                          block w-3.5 h-3.5 sm:w-3 sm:h-3 rounded-[2px]
                          ${gfgLevelColors[displayLevel]}
                          transition-all duration-300
                          hover:scale-125
                          cursor-pointer
                        `}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <div className="text-xs">
                        <div className="font-semibold text-emerald-400">
                          {day.count} {day.count === 1 ? "problem solved" : "problems solved"}
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
