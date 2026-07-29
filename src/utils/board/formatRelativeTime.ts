// 서버에서 시간대 표기 없이 UTC 시각을 내려주는 경우를 위해 명시적으로 UTC로 파싱
const HAS_TIMEZONE = /Z$|[+-]\d{2}:?\d{2}$/;

function parseUtcDate(dateStr: string) {
  return new Date(HAS_TIMEZONE.test(dateStr) ? dateStr : `${dateStr}Z`);
}

// ISO 문자열을 "방금 전"/"N분 전"/"N시간 전"/"N일 전"으로 포맷
export function formatRelativeTime(dateStr: string) {
  const time = parseUtcDate(dateStr).getTime();
  if (Number.isNaN(time)) return "";

  const diffMinutes = Math.floor((Date.now() - time) / (1000 * 60));
  if (diffMinutes < 1) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 전`;
}
