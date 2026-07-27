import { useNavigate } from "react-router";

import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";

import { DormitoryVerificationCard } from "./components/DormitoryVerificationCard";
import { MenuRow } from "./components/MenuRow";
import { ProfileCard } from "./components/ProfileCard";
import { RestrictionCard } from "./components/RestrictionCard";
import { mockMyPageSuspended } from "./MyPage.mock";

export function MyPage() {
  const navigate = useNavigate();
  const profile = mockMyPageSuspended;

  return (
    <PageShell header={<BackHeader title="마이 페이지" />}>
      <div className="mt-4.5 flex flex-col gap-6 px-5">
        <ProfileCard
          nickname={profile.nickname}
          profileImageUrl={profile.profileImageUrl ?? undefined}
          dormitory={profile.dormitory ?? "기숙사를 설정해주세요"}
          mannerTemperature={profile.mannerTemperature}
        />
        {profile.status === "SUSPENDED" && (
          <RestrictionCard
            noShowApprovedCount={profile.noShowApprovedCount}
            suspendedUntil={profile.suspendedUntil ?? ""}
          />
        )}
        <DormitoryVerificationCard
          status={profile.dormStatus}
          verifiedUntil={profile.dormVerifiedUntil}
          onClick={() => {
            navigate(PATH.MYPAGE_DORMITORY);
          }}
        />
        <div className="flex flex-col">
          <MenuRow
            title="정산 계좌 등록/관리"
            onClick={() => navigate(PATH.MYPAGE_ACCOUNT)}
          />
          <MenuRow
            title="알림"
            onClick={() => navigate(PATH.MYPAGE_NOTIFICATIONS)}
          />
          <MenuRow
            title="계정 관리"
            onClick={() => navigate(PATH.MYPAGE_SETTINGS)}
          />
          <MenuRow
            title="문의하기"
            onClick={() => navigate(PATH.MYPAGE_INQUIRY)}
          />
        </div>
      </div>
    </PageShell>
  );
}
