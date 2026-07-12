import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithRef,
} from "react";

import { type VariantProps } from "../../utils/cn";

import ChevronDownIcon from "../../assets/icons/ChevronDownIcon.svg?react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

import { dropdownVariants } from "./Dropdown.variants";

export interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface DropdownSharedProps
  extends
    Omit<ComponentPropsWithRef<"div">, "onChange" | "defaultValue" | "value">,
    Pick<VariantProps<typeof dropdownVariants>, "variant"> {
  options: DropdownOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
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
  ...props
}: DropdownProps) {
  const id = useId();
  const triggerId = `${id}-trigger`;
  const listboxId = `${id}-listbox`;

  const [open, setOpen] = useState(false);
  const [uncontrolled, setUncontrolled] = useState<string | string[]>(
    () => defaultValue ?? (multiple ? [] : "")
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolled;

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(rootRef, () => setOpen(false), open);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
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
      >
        <span className={styles.triggerText()}>{triggerLabel}</span>
        <ChevronDownIcon />
      </button>
      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-multiselectable={multiple || undefined}
          className={styles.panel()}
        >
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled || undefined}
                data-selected={isSelected}
                data-disabled={option.disabled}
                tabIndex={-1}
                className={styles.option()}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
