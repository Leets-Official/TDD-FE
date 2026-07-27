import { useCallback, useEffect, useRef, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

/**
 * 브라우저가 쏘는 beforeinstallprompt를 잡아뒀다가 원하는 시점에 네이티브 설치 프롬프트를 띄웁니다.
 * iOS Safari 등 이 이벤트를 지원하지 않는 환경에서는 canInstall이 항상 false입니다.
 */
export function usePwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const isPromptingRef = useRef(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptToInstall = useCallback(async () => {
    if (!deferredPrompt || isPromptingRef.current) return null;

    isPromptingRef.current = true;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      return outcome;
    } finally {
      isPromptingRef.current = false;
    }
  }, [deferredPrompt]);

  return {
    canInstall: deferredPrompt !== null,
    promptToInstall,
  };
}
