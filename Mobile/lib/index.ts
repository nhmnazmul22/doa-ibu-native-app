// Convert Milliseconds to a formatted time string
export function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const format = (num: number) => String(num).padStart(2, "0");
  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}
