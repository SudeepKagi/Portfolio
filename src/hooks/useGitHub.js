import { useEffect, useState } from "react";

const CACHE_KEY = "github_contributions_live_v2";
const CACHE_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes cache for fast reloads

export function useGitHub(username = "SudeepKagi") {
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem(`${CACHE_KEY}_${username}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS && parsed.data?.contributions?.length) {
          return parsed.data;
        }
      }
    } catch {
      // Ignore localStorage errors
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(!data);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchLiveContributions() {
      // 1. Try Primary Live API (jogruber)
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        if (!res.ok) throw new Error(`Primary API error ${res.status}`);
        const json = await res.json();
        if (!json.contributions?.length) throw new Error("Empty contributions list from primary API");

        const flatDays = json.contributions.map((d) => ({
          date: d.date,
          count: d.count ?? 0,
          level: d.level ?? 0,
        }));

        // Last 63 days (9 weeks of 7 days = last 2 months)
        const last63Days = flatDays.slice(-63);
        const liveData = {
          contributions: last63Days,
          totalContributions: json.total?.lastYear ?? json.total?.[new Date().getFullYear()] ?? 0,
        };

        if (isMounted) {
          setData(liveData);
          setIsLoading(false);
          try {
            localStorage.setItem(
              `${CACHE_KEY}_${username}`,
              JSON.stringify({ timestamp: Date.now(), data: liveData })
            );
          } catch {}
        }
        return;
      } catch (primaryErr) {
        console.warn("Primary GitHub API failed, attempting secondary API:", primaryErr.message);
      }

      // 2. Try Secondary Live API (rschristian)
      try {
        const res = await fetch(`https://gh-calendar.rschristian.dev/user/${username}`);
        if (!res.ok) throw new Error(`Secondary API error ${res.status}`);
        const json = await res.json();
        if (!json.contributions?.length) throw new Error("Empty contributions list from secondary API");

        const flatDays = json.contributions.flat().map((d) => ({
          date: d.date,
          count: d.count ?? 0,
          level: Number(d.intensity) || 0,
        }));

        // Last 63 days (9 weeks of 7 days = last 2 months)
        const last63Days = flatDays.slice(-63);
        const liveData = {
          contributions: last63Days,
          totalContributions: json.total ?? 0,
        };

        if (isMounted) {
          setData(liveData);
          setIsLoading(false);
          try {
            localStorage.setItem(
              `${CACHE_KEY}_${username}`,
              JSON.stringify({ timestamp: Date.now(), data: liveData })
            );
          } catch {}
        }
        return;
      } catch (secondaryErr) {
        console.error("Secondary GitHub API also failed:", secondaryErr.message);
        if (isMounted) {
          setError("Failed to fetch live GitHub contributions");
          setIsLoading(false);
        }
      }
    }

    fetchLiveContributions();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { data, isLoading, error };
}
