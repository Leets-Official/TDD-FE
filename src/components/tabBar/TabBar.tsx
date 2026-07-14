import {
  useRef,
  useState,
  type ComponentPropsWithRef,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { tabBarVariants } from "./TabBar.variants";

export interface TabItem {
  label: string;
  value: string;
}

export interface TabBarProps extends Omit<
  ComponentPropsWithRef<"div">,
  "onChange" | "defaultValue" | "onBlur"
> {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function TabBar({
  tabs,
  value,
  defaultValue,
  onChange,
  className,
  ...props
}: TabBarProps) {
  const [uncontrolled, setUncontrolled] = useState(
    () => defaultValue ?? tabs[0]?.value ?? ""
  );

  const [isControlled] = useState(() => value !== undefined);

  // tabs가 늦게 채워지거나 선택된 탭이 제거되면 uncontrolled 값이 목록에 없을 수 있어 첫 탭으로 보정
  const uncontrolledValue = tabs.some((tab) => tab.value === uncontrolled)
    ? uncontrolled
    : (tabs[0]?.value ?? "");
  const currentValue = isControlled ? value : uncontrolledValue;

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  function commit(next: string) {
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
  }

  function handleKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    let nextIndex: number;

    if (tabs.length === 0) return;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    tabRefs.current[nextIndex]?.focus();
  }

  function handleBlur(event: ReactFocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFocusedIndex(null);
    }
  }

  const styles = tabBarVariants();

  const selectedIndex = tabs.findIndex((tab) => tab.value === currentValue);
  const tabbableIndex =
    focusedIndex ?? (selectedIndex === -1 ? 0 : selectedIndex);

  return (
    <div
      role="tablist"
      className={styles.root({ className })}
      {...props}
      onBlur={handleBlur}
    >
      {tabs.map((tab, index) => {
        const isSelected = tab.value === currentValue;
        return (
          <button
            key={tab.value}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isSelected}
            data-selected={isSelected}
            tabIndex={index === tabbableIndex ? 0 : -1}
            className={styles.tab()}
            onClick={() => commit(tab.value)}
            onFocus={() => setFocusedIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span className={styles.label()}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
