import { useState, useEffect } from "react";

export function useSubscriptionCountdown(
  startDateStr: string,
  endDateStr: string
) {
  type TimeLeft = { days: number; hours: number; minutes: number; seconds: number } | null;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(null);
  const [progress, setProgress] = useState(0); // from 0 to 1

  useEffect(() => {
    if (!startDateStr || !endDateStr) return;

    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    const update = () => {
      const now = new Date();
      const total = end.getTime() - start.getTime();
      const remaining = end.getTime() - now.getTime();

      if (remaining <= 0) {
        setTimeLeft(null);
        setProgress(1);
        return;
      }

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remaining / (1000 * 60)) % 60);
      const seconds = Math.floor((remaining / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
      setProgress(1 - remaining / total);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startDateStr, endDateStr]);

  return { timeLeft, progress };
}
