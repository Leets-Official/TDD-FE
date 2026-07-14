import {
  useRef,
  useState,
  type ComponentPropsWithRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { sliderVariants } from "./Slider.variants";

export interface SliderProps extends Omit<
  ComponentPropsWithRef<"div">,
  "onChange" | "defaultValue"
> {
  min: number;
  max: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  showLabels?: boolean;
}

const THUMB_ARIA_LABELS = ["최솟값", "최댓값"] as const;

export function Slider({
  min,
  max,
  value,
  defaultValue,
  onChange,
  showLabels = true,
  className,
  ...props
}: SliderProps) {
  const [uncontrolled, setUncontrolled] = useState<[number, number]>(
    () => defaultValue ?? [min, max]
  );
  const [isControlled] = useState(() => value !== undefined);

  const currentValue =
    isControlled && value !== undefined ? value : uncontrolled;
  const [lo, hi] = currentValue;

  const trackRef = useRef<HTMLDivElement>(null);

  if (max <= min) {
    // 개발 환경에서만 경고 메시지를 출력
    if (import.meta.env.DEV) {
      console.error(`Slider: max(${max})는 min(${min})보다 커야 합니다.`);
    }
    return null;
  }

  function commit(next: [number, number]) {
    if (next[0] === lo && next[1] === hi) return;
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
  }

  function snapToMark(raw: number) {
    const snapped = Math.round(raw);
    return Math.min(max, Math.max(min, snapped));
  }

  function valueFromPointer(clientX: number) {
    const track = trackRef.current;
    if (!track) return null;
    const rect = track.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return snapToMark(min + ratio * (max - min));
  }

  function moveThumb(index: number, next: number) {
    if (index === 0) {
      commit([Math.min(next, hi), hi]);
    } else {
      commit([lo, Math.max(next, lo)]);
    }
  }

  function handleThumbPointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleThumbPointerMove(
    event: ReactPointerEvent<HTMLButtonElement>,
    index: number
  ) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const next = valueFromPointer(event.clientX);
    if (next !== null) moveThumb(index, next);
  }

  function handleTrackPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const next = valueFromPointer(event.clientX);
    if (next === null) return;

    const index =
      next < lo
        ? 0
        : next > hi
          ? 1
          : Math.abs(next - lo) <= Math.abs(next - hi)
            ? 0
            : 1;
    moveThumb(index, next);
  }

  function handleThumbKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    const current = index === 0 ? lo : hi;
    let next: number;

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      next = current + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      next = current - 1;
    } else if (event.key === "Home") {
      next = min;
    } else if (event.key === "End") {
      next = max;
    } else {
      return;
    }

    event.preventDefault();
    moveThumb(index, snapToMark(next));
  }

  const segmentCount = Math.max(1, max - min);
  const marks = Array.from({ length: segmentCount + 1 }, (_, i) => min + i);
  const toPercent = (v: number) => ((v - min) / (max - min)) * 100;

  const styles = sliderVariants();

  return (
    <div className={styles.root({ className })} {...props}>
      <div
        ref={trackRef}
        className={styles.track()}
        onPointerDown={handleTrackPointerDown}
      >
        {Array.from({ length: segmentCount }, (_, i) => {
          const segmentStart = min + i;
          const segmentEnd = segmentStart + 1;
          return (
            <div
              key={segmentStart}
              className={styles.segment({
                active: lo <= segmentStart && segmentEnd <= hi,
              })}
            />
          );
        })}
        {[lo, hi].map((thumbValue, index) => (
          <button
            key={index}
            type="button"
            role="slider"
            aria-label={THUMB_ARIA_LABELS[index]}
            aria-valuemin={index === 0 ? min : lo}
            aria-valuemax={index === 0 ? hi : max}
            aria-valuenow={thumbValue}
            className={styles.thumb()}
            style={{
              left: `${toPercent(thumbValue)}%`,
              // 두 썸이 오른쪽 끝에 겹치면 아래쪽(최솟값) 썸을 위로 올려 잡을 수 있게 함
              zIndex: index === 0 && lo === max ? 1 : undefined,
            }}
            onPointerDown={handleThumbPointerDown}
            onPointerMove={(event) => handleThumbPointerMove(event, index)}
            onKeyDown={(event) => handleThumbKeyDown(event, index)}
          />
        ))}
      </div>
      {showLabels && (
        <div className={styles.labels()}>
          {marks.map((mark) => (
            <span
              key={mark}
              className={styles.label()}
              style={{ left: `${toPercent(mark)}%` }}
            >
              {mark}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
