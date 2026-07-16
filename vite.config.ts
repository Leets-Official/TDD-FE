import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      includeAssets: ["**/*"],
      manifest: {
        name: "TDD",
        short_name: "TDD",
        description: "기숙사생을 위한 배달 공유 서비스 플랫폼",
        lang: "ko",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#ff610d",
        background_color: "#ffffff",
        icons: [
          // TODO: 임시 아이콘 (favicon.svg 기반) — 정식 로고 나오면 재생성
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
