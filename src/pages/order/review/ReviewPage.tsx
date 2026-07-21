import { useNavigate } from "react-router";

import { PageHeader } from "@/components/header/PageHeader";
import { PageShell } from "@/layouts/PageShell";

export default function ReviewPage() {
  const navigate = useNavigate();

  return (
    <PageShell
      header={
        <PageHeader
          title="매너 평가"
          onBack={() => {
            navigate(-1);
          }}
        />
      }
    >
      <div className="flex flex-col gap-4 p-4"></div>
    </PageShell>
  );
}
