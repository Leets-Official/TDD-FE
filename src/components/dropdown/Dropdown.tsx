import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";

import { type VariantProps } from "@/utils/cn";

import ChevronDownIcon from "@/assets/icons/ChevronDownIcon.svg?react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

import { dropdownVariants } from "./Dropdown.variants";

export interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

type DropdownVariant = NonNullable<
  VariantProps<typeof dropdownVariants>["variant"]
>;

// 옵션 한 줄의 실제 렌더링 높이(px). Dropdown.variants.ts의 option 슬롯 패딩 + text-body-1
// line-height로부터 나오는 값이라, 그쪽 스타일이 바뀌면 여기도 같이 맞춰야 합니다.
const OPTION_ROW_HEIGHT: Record<DropdownVariant, number> = {
  select: 56, // py-l(16px*2) + line-height-l(24px)
  filter: 48, // py-s(12px*2) + line-height-l(24px)
};

const DEFAULT_VISIBLE_OPTIONS = 4;

interface DropdownSharedProps
  extends
    Omit<ComponentPropsWithRef<"div">, "onChange" | "defaultValue" | "value">,
    Pick<VariantProps<typeof dropdownVariants>, "variant"> {
  options: DropdownOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  /** 스크롤 없이 한 번에 보여줄 옵션 개수. 기본값 4, 나머지는 스크롤로 노출됩니다. */
  visibleOptions?: number;
}

interface SingleDropdownProps extends DropdownSharedProps {
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

interface MultipleDropdownProps extends DropdownSharedProps {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

export type DropdownProps = SingleDropdownProps | MultipleDropdownProps;

export function Dropdown({
  options,
  label,
  placeholder = "선택하세요",
  variant = "select",
  disabled,
  multiple,
  value,
  defaultValue,
  onChange,
  className,
  visibleOptions = DEFAULT_VISIBLE_OPTIONS,
  ...props
}: DropdownProps) {
  const id = useId();
  const triggerId = `${id}-trigger`;
  const listboxId = `${id}-listbox`;

  const [open, setOpen] = useState(false);
  const [uncontrolled, setUncontrolled] = useState<string | string[]>(
    () => defaultValue ?? (multiple ? [] : "")
  );

  const [isControlled] = useState(() => value !== undefined);
  const currentValue = isControlled ? value : uncontrolled;

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const pendingFocusIndexRef = useRef<number | null>(null);

  // 옵션 패널은 document.body에 포탈로 렌더링합니다. 가로 스크롤 필터 목록처럼
  // overflow가 걸린 조상 안에 트리거가 있으면, 패널이 absolute로 그 조상에 갇혀
  // 잘려버리기 때문입니다 (CSS 스펙상 overflow-x가 visible이 아니면 overflow-y도
  // 강제로 clip되어, 조상에 overflow-y-visible을 줘도 소용이 없습니다).
  const [panelPosition, setPanelPosition] = useState<{
    top: number;
    left: number;
    width?: number;
  } | null>(null);

  useOutsideClick([rootRef, panelRef], () => setOpen(false), open);

  useLayoutEffect(() => {
    if (!open) return;

    function updatePosition() {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPanelPosition({
        top: rect.bottom,
        left: rect.left,
        width: variant === "select" ? rect.width : undefined,
      });
    }

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, variant]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        rootRef.current?.contains(document.activeElement)
      ) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open && pendingFocusIndexRef.current !== null) {
      optionRefs.current[pendingFocusIndexRef.current]?.focus();
      pendingFocusIndexRef.current = null;
    }
  }, [open]);

  function commit(next: string | string[]) {
    if (!isControlled) setUncontrolled(next);

    if (multiple) {
      (onChange as ((value: string[]) => void) | undefined)?.(next as string[]);
    } else {
      (onChange as ((value: string) => void) | undefined)?.(next as string);
    }
  }

  function handleSelect(option: DropdownOption) {
    if (option.disabled) return;

    if (multiple) {
      const selected = Array.isArray(currentValue) ? currentValue : [];
      const next = selected.includes(option.value)
        ? selected.filter((selectedValue) => selectedValue !== option.value)
        : [...selected, option.value];
      commit(next);
    } else {
      commit(option.value);
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  function handleTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    if (options.length === 0) return;

    event.preventDefault();
    const nextIndex = event.key === "ArrowDown" ? 0 : options.length - 1;

    if (open) {
      optionRefs.current[nextIndex]?.focus();
    } else {
      pendingFocusIndexRef.current = nextIndex;
      setOpen(true);
    }
  }

  function handleOptionKeyDown(
    event: ReactKeyboardEvent<HTMLLIElement>,
    option: DropdownOption,
    index: number
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;

      let nextIndex = index;
      for (let i = index + delta; i >= 0 && i < options.length; i += delta) {
        if (!options[i].disabled) {
          nextIndex = i;
          break;
        }
      }
      optionRefs.current[nextIndex]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const delta = event.key === "Home" ? 1 : -1;
      const start = event.key === "Home" ? 0 : options.length - 1;

      let targetIndex = -1;
      for (let i = start; i >= 0 && i < options.length; i += delta) {
        if (!options[i].disabled) {
          targetIndex = i;
          break;
        }
      }
      if (targetIndex !== -1) optionRefs.current[targetIndex]?.focus();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect(option);
    }
  }

  const selectedValues = multiple
    ? Array.isArray(currentValue)
      ? currentValue
      : []
    : typeof currentValue === "string" && currentValue
      ? [currentValue]
      : [];

  const triggerLabel = (() => {
    if (variant === "filter") return label ?? "필터";

    if (multiple) {
      if (selectedValues.length === 0) return placeholder;
      const firstLabel =
        options.find((option) => option.value === selectedValues[0])?.label ??
        placeholder;
      return selectedValues.length > 1
        ? `${firstLabel} 외 ${selectedValues.length - 1}개`
        : firstLabel;
    }

    return (
      options.find((option) => option.value === currentValue)?.label ??
      placeholder
    );
  })();

  const styles = dropdownVariants({
    variant,
    open,
    filled: selectedValues.length > 0,
  });

  return (
    <div ref={rootRef} className={styles.root({ className })} {...props}>
      {label && variant === "select" && (
        <label htmlFor={triggerId} className={styles.label()}>
          {label}
        </label>
      )}
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        className={styles.trigger()}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className={styles.triggerText()}>{triggerLabel}</span>
        <ChevronDownIcon />
      </button>
      {open &&
        panelPosition &&
        createPortal(
          <ul
            ref={panelRef}
            id={listboxId}
            role="listbox"
            aria-multiselectable={multiple || undefined}
            className={styles.panel()}
            style={{
              position: "fixed",
              top: panelPosition.top,
              left: panelPosition.left,
              width: panelPosition.width,
              maxHeight: OPTION_ROW_HEIGHT[variant] * visibleOptions,
            }}
          >
            {options.map((option, index) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <li
                  key={option.value}
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled || undefined}
                  data-selected={isSelected}
                  data-disabled={option.disabled}
                  tabIndex={-1}
                  className={styles.option()}
                  onClick={() => handleSelect(option)}
                  onKeyDown={(event) =>
                    handleOptionKeyDown(event, option, index)
                  }
                >
                  {option.label}
                </li>
              );
            })}
          </ul>,
          document.body
        )}
    </div>
  );
}
