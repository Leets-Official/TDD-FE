import type { ModalProps } from "@/components/modal/Modal";

type GuardModalProps = Omit<
  ModalProps,
  "isOpen" | "onClose" | "onOutlineClick" | "onPrimaryClick"
>;

export const DORM_VERIFICATION_MODAL_PROPS: GuardModalProps = {
  title: "배달팟을 만들거나 참여하려면 \n 기숙사 인증이 필요해요",
  description: "같은 기숙사생들과 안전하게 \n 배달팟을 이용할 수 있어요",
  outlineLabel: "다음에 할게요",
  primaryLabel: "인증하러 가기",
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
