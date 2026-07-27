import { useNavigate } from "react-router";

import { useModal } from "@/hooks/useModal";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";

import { MenuRow } from "../components/MenuRow";

export function SettingsPage() {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const handleLogout = () => {
    openModal({
      props: {
        title: "로그아웃 하시겠습니까?",
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        // TODO: 로그아웃 로직 연결
        navigate(PATH.LOGIN, { replace: true });
      },
    });
  };

  return (
    <PageShell header={<BackHeader title="계정관리" />}>
      <div className="flex w-full flex-col gap-4 px-5">
        <h1 className="text-title-2 text-black">로그아웃/회원관리</h1>
        <div className="flex flex-col">
          <MenuRow
            title="비밀번호 재설정"
            onClick={() => navigate(PATH.MYPAGE_PASSWORD)}
          />
          <MenuRow title="로그아웃" onClick={handleLogout} />
          <MenuRow
            title="계정 탈퇴"
            className="text-error"
            onClick={() => navigate(PATH.MYPAGE_WITHDRAW)}
          />
        </div>
      </div>
    </PageShell>
  );
}
