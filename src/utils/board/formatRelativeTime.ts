// ISO 문자열을 "방금 전"/"N분 전"/"N시간 전"/"N일 전"으로 포맷
export function formatRelativeTime(dateStr: string) {
  const time = new Date(dateStr).getTime();
  if (Number.isNaN(time)) return "";

  const diffMinutes = Math.floor((Date.now() - time) / (1000 * 60));
  if (diffMinutes < 1) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 전`;
}
