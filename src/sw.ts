/// <reference lib="webworker" />
import { clientsClaim } from "workbox-core";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

import type { PushPayload } from "@/types/notification/notification";

declare const self: ServiceWorkerGlobalScope;

// registerType: "autoUpdate"라 새 SW가 대기 없이 바로 넘겨받습니다
self.skipWaiting();
clientsClaim();

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

// 서버가 JSON을 안 보내면 본문 전체를 메시지로 씁니다
function parsePayload(data: PushMessageData | null): PushPayload {
  if (!data) return {};

  try {
    return data.json() as PushPayload;
  } catch {
    return { body: data.text() };
  }
}

self.addEventListener("push", (event) => {
  const { title, body, category, url } = parsePayload(event.data);
  const notificationTitle = title ?? "TDD";
  const notificationBody = body ?? "";
  const targetUrl = url ?? "/";

  event.waitUntil(
    Promise.all([
      self.registration.showNotification(notificationTitle, {
        body: notificationBody,
        icon: "/pwa-192x192.png",
        badge: "/pwa-64x64.png",
        data: { url: targetUrl, category },
      }),
      // 앱이 이미 열려있는 탭에는 인앱 토스트로도 보여줄 수 있도록 함께 전달
      self.clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          clientList.forEach((client) =>
            client.postMessage({
              type: "push-notification",
              title: notificationTitle,
              body: notificationBody,
              url: targetUrl,
              category,
            })
          );
        }),
    ])
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const { url = "/" } = (event.notification.data ?? {}) as { url?: string };
  const targetUrl = new URL(url, self.location.origin).href;

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(async (clientList) => {
        // 이미 그 화면을 보고 있으면 새로고침 없이 탭만 띄웁니다
        const opened = clientList.find((client) => client.url === targetUrl);
        if (opened) return opened.focus();

        // 다른 화면이라도 열려 있으면 새 탭 대신 그 탭을 옮깁니다
        const [client] = clientList;
        if (!client) return self.clients.openWindow(targetUrl);

        // 이 SW가 제어하지 않는 탭은 navigate가 거부되므로 새 탭으로 엽니다
        try {
          await client.navigate(targetUrl);
        } catch {
          return self.clients.openWindow(targetUrl);
        }

        return client.focus();
      })
  );
});
