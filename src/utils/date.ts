const MS_PER_DAY = 1000 * 60 * 60 * 24;

//지금부터 주어진 날짜까지 남은 일수

export function daysUntil(dateStr?: string | null) {
  if (!dateStr) return 0;
  const time = new Date(dateStr).getTime();
  if (Number.isNaN(time)) return 0;
  const diff = time - Date.now();
  return Math.max(0, Math.ceil(diff / MS_PER_DAY));
}

// ISO 문자열을 "YYYY-MM-DD"로 포맷
export function formatYmd(dateStr?: string | null) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
