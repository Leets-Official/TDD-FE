import { useNavigate } from "react-router";

import { PageHeader } from "@/components/header/PageHeader";
import { PageShell } from "@/layouts/PageShell";

export default function BoardCreatePage() {
  const navigate = useNavigate();

  return (
    <PageShell
      header={<PageHeader title="글쓰기" onBack={() => navigate(-1)} />}
    >
      <div className="px-5 py-6" />
    </PageShell>
  );
}
