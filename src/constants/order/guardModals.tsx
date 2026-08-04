import type { ModalProps } from "@/components/modal/Modal";
import type { DormVerificationStatus } from "@/types/user/dormVerification";

type GuardModalProps = Omit<
  ModalProps,
  "isOpen" | "onClose" | "onOutlineClick" | "onPrimaryClick"
>;

// 인증 상태를 못 읽은 것뿐이라 미인증으로 단정하지 않고 재시도를 안내합니다
export const ME_FETCH_FAILED_MODAL_PROPS: GuardModalProps = {
  title: "정보를 불러오지 못했어요",
  description: "잠시 후 다시 시도해주세요",
  outlineLabel: "닫기",
  primaryLabel: "다시 시도",
};

// primaryLabel이 있는 상태만 기숙사 인증 페이지로 보냅니다 (PENDING은 사용자가 할 일이 없어 확인만)
export const DORM_VERIFICATION_MODAL_PROPS: Record<
  Exclude<DormVerificationStatus, "APPROVED">,
  GuardModalProps
> = {
  NOT_SUBMITTED: {
    title: "배달팟을 만들거나 참여하려면 \n 기숙사 인증이 필요해요",
    description: "같은 기숙사생들과 안전하게 \n 배달팟을 이용할 수 있어요",
    outlineLabel: "다음에 할게요",
    primaryLabel: "인증하러 가기",
  },
  PENDING: {
    title: "기숙사 인증을 확인하고 있어요",
    description: "인증이 완료되면 배달팟을 \n 만들고 참여할 수 있어요",
    outlineLabel: "확인했어요",
  },
  REJECTED: {
    title: "기숙사 인증이 반려되었어요",
    description: "인증 서류를 다시 제출하면 \n 배달팟을 이용할 수 있어요",
    outlineLabel: "다음에 할게요",
    primaryLabel: "다시 인증하기",
  },
  EXPIRED: {
    title: "기숙사 인증이 만료되었어요",
    description: "다시 인증하면 배달팟을 \n 계속 이용할 수 있어요",
    outlineLabel: "다음에 할게요",
    primaryLabel: "다시 인증하기",
  },
};

export const NOSHOW_RESTRICTION_MODAL_PROPS: GuardModalProps = {
  title:
    "학우님은 약속 노쇼(No-show) 신고가 \n 3회 누적되어 현재 트뜨 서비스 이용이 \n 정지된 상태입니다.",
  description: (
    <ul className="list-disc space-y-1 pl-5">
      <li>
        제한 기간: [정지 시작일] ~ <br />
        [정지 종료일 YYYY-MM-DD]
      </li>
      <li>
        제한 항목: 배달 팟 개설 및 실시간 매칭 참여 <br />
        제한 (게시판 조회만 가능)
      </li>
    </ul>
  ),
  caption:
    "클린하고 신뢰할 수 있는 기숙사 공유 문화를 위해 약속 시간을 준수해 주세요.\n관련 문의는 [고객센터/운영진]으로 접수 바랍니다.",
  outlineLabel: "확인하였습니다",
};

export const ACCOUNT_UNREGISTERED_MODAL_PROPS: GuardModalProps = {
  title: "배달팟을 만들려면 \n 계좌번호 입력이 필요해요",
  description: "계좌번호를 등록하면 원활한 정산을 할 수 있어요",
  outlineLabel: "다음에 할게요",
  primaryLabel: "계좌등록 하기",
};
