import { useEffect, useState } from "react";

const DEFAULT_URGENT_THRESHOLD_MS = 60 * 1000;

interface UseCountdownOptions {
  urgentThresholdMs?: number;
}

interface UseCountdownResult {
  remainingMs: number;
  timeLabel: string;
  isUrgent: boolean;
  isExpired: boolean;
}

function formatRemaining(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function useCountdown(
  deadline: number,
  { urgentThresholdMs = DEFAULT_URGENT_THRESHOLD_MS }: UseCountdownOptions = {}
): UseCountdownResult {
  const [remainingMs, setRemainingMs] = useState(() => deadline - Date.now());

  useEffect(() => {
    const sync = () => setRemainingMs(deadline - Date.now());
    sync();

    const intervalId = setInterval(() => {
      const remaining = deadline - Date.now();
      setRemainingMs(remaining);
      if (remaining <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [deadline]);

  return {
    remainingMs,
    timeLabel: formatRemaining(remainingMs),
    isUrgent: remainingMs > 0 && remainingMs <= urgentThresholdMs,
    isExpired: remainingMs <= 0,
  };
}
