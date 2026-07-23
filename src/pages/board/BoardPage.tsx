import { useNavigate } from "react-router";

import { PageHeader } from "@/components/header/PageHeader";
import { PageShell } from "@/layouts/PageShell";

export default function BoardPage() {
  const navigate = useNavigate();

  return (
    <PageShell
      header={<PageHeader title="게시판" onBack={() => navigate(-1)} />}
    >
      <div className="px-5 py-6" />
    </PageShell>
  );
}
