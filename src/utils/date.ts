const MS_PER_DAY = 1000 * 60 * 60 * 24;

const HAS_TIMEZONE = /[Zz]$|[+-]\d{2}:?\d{2}$/;

// 서버가 시간대 표기 없이 UTC 시각을 내려주는 경우가 있어 명시적으로 UTC로 파싱
export function parseUtcDate(dateStr: string) {
  return new Date(HAS_TIMEZONE.test(dateStr) ? dateStr : `${dateStr}Z`);
}

//지금부터 주어진 날짜까지 남은 일수

export function daysUntil(dateStr?: string | null) {
  if (!dateStr) return 0;
  const time = parseUtcDate(dateStr).getTime();
  if (Number.isNaN(time)) return 0;
  const diff = time - Date.now();
  return Math.max(0, Math.ceil(diff / MS_PER_DAY));
}

// ISO 문자열을 "YYYY-MM-DD"로 포맷
export function formatYmd(dateStr?: string | null) {
  if (!dateStr) return "";
  const d = parseUtcDate(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
