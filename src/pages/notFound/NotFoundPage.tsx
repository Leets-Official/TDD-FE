import { Button } from "@/components/button/Button";
import { useGoBack } from "@/hooks/useGoBack";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";
import { useNavigate } from "react-router";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <PageShell>
      <div className="flex h-full flex-col items-center justify-center gap-14 px-5">
        <div className="flex flex-col items-center gap-4">
          <h1 className="title-2 text-[96px] leading-[1.25] font-bold text-primary">
            404
          </h1>
          <h2 className="title-2 text-text-2">
            죄송합니다. 현재 페이지를 찾을 수 없어요.
          </h2>
          <p className="body-1 text-center text-text-4">
            주소가 잘못 입력되었거나, <br />
            주소가 변경 또는 삭제되어 찾을 수 없습니다
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="medium"
            onClick={() => navigate(PATH.HOME)}
          >
            홈으로
          </Button>
          <Button size="medium" onClick={useGoBack()}>
            이전으로
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
