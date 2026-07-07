const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

/** Relativ tid på svenska, t.ex. "2 dagar sedan". */
export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();

  if (diff < MINUTE) return "nyss";
  if (diff < HOUR) {
    const m = Math.floor(diff / MINUTE);
    return `${m} min sedan`;
  }
  if (diff < DAY) {
    const h = Math.floor(diff / HOUR);
    return h === 1 ? "1 timme sedan" : `${h} timmar sedan`;
  }
  if (diff < WEEK) {
    const d = Math.floor(diff / DAY);
    return d === 1 ? "1 dag sedan" : `${d} dagar sedan`;
  }
  if (diff < MONTH) {
    const w = Math.floor(diff / WEEK);
    return w === 1 ? "1 vecka sedan" : `${w} veckor sedan`;
  }
  if (diff < YEAR) {
    const mo = Math.floor(diff / MONTH);
    return mo === 1 ? "1 månad sedan" : `${mo} månader sedan`;
  }
  const y = Math.floor(diff / YEAR);
  return y === 1 ? "1 år sedan" : `${y} år sedan`;
}
