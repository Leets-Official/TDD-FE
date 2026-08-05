import { useEffect } from "react";

// iOS는 키보드가 올라와도 dvh가 줄지 않아, 키보드가 가리는 높이를 직접 재서 --keyboard-inset에 반영합니다
export function useKeyboardInset() {
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    // offsetTop(페이지 팬 오프셋)은 제외합니다. 포함하면 사용자가 팬할 때 inset이 같이 변해 레이아웃이 흔들립니다
    const update = () => {
      const inset = Math.max(0, window.innerHeight - viewport.height);
      document.documentElement.style.setProperty(
        "--keyboard-inset",
        `${inset}px`
      );
    };

    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);

    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
      document.documentElement.style.removeProperty("--keyboard-inset");
    };
  }, []);
}
