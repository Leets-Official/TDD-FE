import { useState } from "react";

import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";

import {
  NOTIFICATION_ITEMS,
  type NotificationKey,
} from "./NotificationPage.constants";
import { SwitchRow } from "./components/SwitchRow";

export function NotificationPage() {
  // TODO: 알림 설정 조회 API 연동 (초깃값 대체)
  const [settings, setSettings] = useState<Record<NotificationKey, boolean>>({
    party: true,
    chat: true,
    board: true,
  });

  // 완료 버튼이 없는 화면이라 토글 즉시 저장합니다.
  const handleChange = (key: NotificationKey) => (checked: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: checked }));
    // TODO: 알림 설정 저장 API 연동
  };

  return (
    <PageShell header={<BackHeader title="알림" />}>
      <div className="mx-5 mt-4 flex flex-col">
        {NOTIFICATION_ITEMS.map(({ key, title }) => (
          <SwitchRow
            key={key}
            title={title}
            checked={settings[key]}
            onChange={handleChange(key)}
          />
        ))}
      </div>
    </PageShell>
  );
}
