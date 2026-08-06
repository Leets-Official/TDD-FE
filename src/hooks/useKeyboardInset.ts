import { useEffect } from "react";

// 포커스돼도 소프트 키보드가 안 뜨는 input 타입
const NON_KEYBOARD_INPUT_TYPES = new Set([
  "button",
  "checkbox",
  "color",
  "file",
  "radio",
  "range",
  "reset",
  "submit",
]);

function isKeyboardTarget(element: Element | null) {
  if (!(element instanceof HTMLElement)) return false;
  if (element.isContentEditable) return true;
  if (element instanceof HTMLTextAreaElement) return true;
  if (element instanceof HTMLInputElement) {
    return !NON_KEYBOARD_INPUT_TYPES.has(element.type);
  }

  return false;
}

const KEYBOARD_THRESHOLD = 80;

// 실제로 보이는 viewport 높이를 앱 높이로 사용합니다.
// dvh와 키보드 높이를 조합하면 브라우저에 따라 키보드 높이가 두 번 빠질 수 있습니다.
export function useKeyboardInset() {
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const update = () => {
      const viewportGap = Math.max(0, window.innerHeight - viewport.height);
      const isKeyboardOpen =
        isKeyboardTarget(document.activeElement) &&
        viewportGap > KEYBOARD_THRESHOLD;

      document.documentElement.style.setProperty(
        "--app-viewport-height",
        `${viewport.height}px`
      );
      document.documentElement.style.setProperty(
        "--app-safe-area-bottom",
        isKeyboardOpen ? "0px" : "env(safe-area-inset-bottom)"
      );
    };

    let focusFrame = 0;
    const updateAfterFocusChange = () => {
      cancelAnimationFrame(focusFrame);
      focusFrame = requestAnimationFrame(update);
    };

    update();
    viewport.addEventListener("resize", update);
    window.addEventListener("focusin", updateAfterFocusChange);
    window.addEventListener("focusout", updateAfterFocusChange);

    return () => {
      cancelAnimationFrame(focusFrame);
      viewport.removeEventListener("resize", update);
      window.removeEventListener("focusin", updateAfterFocusChange);
      window.removeEventListener("focusout", updateAfterFocusChange);
      document.documentElement.style.removeProperty("--app-viewport-height");
      document.documentElement.style.removeProperty("--app-safe-area-bottom");
    };
  }, []);
}
