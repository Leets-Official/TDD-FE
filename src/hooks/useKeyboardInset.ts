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

// iOS는 키보드가 올라와도 dvh가 줄지 않아, 키보드가 가리는 높이를 직접 재서 --keyboard-inset에 반영합니다
export function useKeyboardInset() {
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    // offsetTop(페이지 팬 오프셋)은 제외합니다. 포함하면 사용자가 팬할 때 inset이 같이 변해 레이아웃이 흔들립니다
    const update = () => {
      // iOS는 스크롤 중 주소창·툴바를 접었다 펴는데 두 높이가 같은 프레임에 갱신되지 않아,
      // 키보드가 없어도 0이 아닌 값이 잡힙니다. 입력 포커스가 없으면 키보드도 없으므로 0으로 고정합니다
      const inset = isKeyboardTarget(document.activeElement)
        ? Math.max(0, window.innerHeight - viewport.height)
        : 0;

      document.documentElement.style.setProperty(
        "--keyboard-inset",
        `${inset}px`
      );
    };

    update();
    // scroll은 구독하지 않습니다 — offsetTop을 안 쓰므로 값이 바뀔 일이 없고, 크롬이 흔들리는 순간에만 재계산돼 떨림을 만듭니다
    viewport.addEventListener("resize", update);
    window.addEventListener("focusin", update);
    window.addEventListener("focusout", update);

    return () => {
      viewport.removeEventListener("resize", update);
      window.removeEventListener("focusin", update);
      window.removeEventListener("focusout", update);
      document.documentElement.style.removeProperty("--keyboard-inset");
    };
  }, []);
}
