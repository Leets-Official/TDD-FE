import { useNavigate } from "react-router";

import { PageHeader } from "@/components/header/PageHeader";
import { PageShell } from "@/layouts/PageShell";

export default function BoardDetailPage() {
  const navigate = useNavigate();

  return (
    <PageShell header={<PageHeader title="" onBack={() => navigate(-1)} />}>
      <div className="px-5 py-6" />
    </PageShell>
  );
}
