import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";

import { SwitchRow } from "./components/SwitchRow";
import { usePushToggle } from "./hooks/usePushToggle";

export function NotificationPage() {
  const { pushEnabled, handleChange } = usePushToggle();

  return (
    <PageShell header={<BackHeader title="알림" />}>
      <div className="mx-5 mt-4 flex flex-col">
        <SwitchRow
          title="알림 받기"
          checked={pushEnabled}
          onChange={handleChange}
        />
      </div>
    </PageShell>
  );
}
