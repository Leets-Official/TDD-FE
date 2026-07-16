import { PageHeader } from "@/components/header/PageHeader";
import { PageShell } from "@/layouts/PageShell";
import { useNavigate } from "react-router";

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <PageShell
      header={
        <PageHeader
          title="회원가입"
          onBack={() => {
            navigate(-1);
          }}
        />
      }
    >
      <p className="p-4 text-body-1 text-text-1">회원가입</p>
    </PageShell>
  );
}
