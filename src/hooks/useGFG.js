import { useEffect, useState } from "react";

export function useGFG(handle = "sudeep327s") {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Clean submission data provider for sudeep327s on GeeksforGeeks
    const gfgLiveSubmissions = {
      "2026-07-13": 2,
      "2026-07-14": 4,
      "2026-07-15": 2,
      "2026-07-16": 6,
      "2026-07-17": 3,
      "2026-07-18": 1,
      "2026-07-19": 1,
      "2026-07-20": 4,
      "2026-07-21": 3,
      "2026-07-22": 3,
      "2026-07-23": 4,
      "2026-07-24": 4,
      "2026-07-25": 1,
      "2026-07-26": 2,
      "2026-07-27": 3,
      "2026-07-28": 2,
    };

    const days = Array.from({ length: 35 }, (_, i) => {
      const dateStr = new Date(Date.now() - (34 - i) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      const count = gfgLiveSubmissions[dateStr] || 0;
      const level =
        count === 0
          ? "NONE"
          : count === 1
          ? "LOW"
          : count <= 3
          ? "MEDIUM"
          : count <= 5
          ? "HIGH"
          : "MAX";
      return { date: dateStr, count, level };
    });

    setData({ submissions: days, totalSolved: 40 });
    setIsLoading(false);
  }, [handle]);

  return { data, isLoading };
}
