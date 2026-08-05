// 백엔드 UTC 시간 문자열을 Date 객체로 변환하는 함수
function parseServerTime(createdAt: string) {
  const hasTimezone = /[Zz]$|[+-]\d{2}:?\d{2}$/.test(createdAt);
  return new Date(hasTimezone ? createdAt : `${createdAt}Z`);
}

export function formatChatTime(createdAt: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(parseServerTime(createdAt));
}
