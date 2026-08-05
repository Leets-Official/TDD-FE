import { useEffect, useState } from "react";

// 넘겨준 시각들이 지날 때만 갱신되는 현재 시각 — 매초 tick 대신 써서 결과가 같은 리렌더를 없앤다
export function useNowAt(times: (number | null | undefined)[]): number {
  const [now, setNow] = useState(() => Date.now());

  const nextTime = times.reduce<number | null>((earliest, time) => {
    if (time === null || time === undefined || time <= now) return earliest;

    return earliest === null || time < earliest ? time : earliest;
  }, null);

  useEffect(() => {
    if (nextTime === null) return;

    // 정확히 그 시각에 깨면 now > time이 아직 거짓이라 다음 타이머가 안 걸린다
    const timeoutId = setTimeout(
      () => setNow(Date.now()),
      Math.max(0, nextTime - Date.now()) + 1
    );

    return () => clearTimeout(timeoutId);
  }, [nextTime]);

  return now;
}
