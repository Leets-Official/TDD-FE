import { useNavigate } from "react-router";

import { PageHeader } from "@/components/header/PageHeader";
import { PageShell } from "@/layouts/PageShell";

export default function ChatPage() {
  const navigate = useNavigate();

  return (
    <PageShell
      header={
        <PageHeader
          title="채팅방"
          onBack={() => {
            navigate(-1);
          }}
        />
      }
    >
      <div className="flex flex-col gap-xxl px-5 pt-6 pb-6">채팅방</div>
    </PageShell>
  );
}
