import { HomeHeader } from "@/components/header/HomeHeader";
import { PageShell } from "@/layouts/PageShell";

export default function HomePage() {
  return (
    <PageShell header={<HomeHeader />}>
      <p className="p-4 text-body-1 text-text-1">홈</p>
    </PageShell>
  );
}
