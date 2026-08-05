// 서버가 에러 메시지를 안 내려줄 때 노출할 기본 문구
export const API_ERROR_MESSAGE = {
  DEFAULT: "요청에 실패했어요. 잠시 후 다시 시도해주세요",
  LOGIN: "로그인에 실패했어요. 잠시 후 다시 시도해주세요",
  ORDER_LIST: "배달팟 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요",
  MY_ORDER_LIST:
    "내 배달팟 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요",
  ORDER_CREATE: "배달팟 생성에 실패했어요. 잠시 후 다시 시도해주세요",
  ORDER_DETAIL: "배달팟 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요",
  ORDER_PARTICIPANTS:
    "참여자 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요",
  ORDER_CANCEL: "배달팟 취소에 실패했어요. 잠시 후 다시 시도해주세요",
  ORDER_JOIN: "배달팟 참여에 실패했어요. 잠시 후 다시 시도해주세요",
  ORDER_LEAVE: "배달팟 참여 취소에 실패했어요. 잠시 후 다시 시도해주세요",
  ORDER_CLOSE: "배달팟 모집 마감에 실패했어요. 잠시 후 다시 시도해주세요",
  ORDER_COMPLETE: "주문 완료 처리에 실패했어요. 잠시 후 다시 시도해주세요",
  REVIEW_TARGETS:
    "평가 대상 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요",
  REVIEW_CREATE: "매너 평가 등록에 실패했어요. 잠시 후 다시 시도해주세요",
  DELIVERY_COMPLETE: "배달 완료 처리에 실패했어요. 잠시 후 다시 시도해주세요",
  SETTLEMENT_REQUEST: "정산 요청에 실패했어요. 잠시 후 다시 시도해주세요",
  SETTLEMENT_COMPLETE: "정산 완료 처리에 실패했어요. 잠시 후 다시 시도해주세요",
  SIGNUP: "회원가입에 실패했어요. 잠시 후 다시 시도해주세요",
  PASSWORD_RESET: "비밀번호 재설정에 실패했어요. 잠시 후 다시 시도해주세요",
  BOARD_CREATE: "게시글 작성에 실패했어요. 잠시 후 다시 시도해주세요",
  BOARD_COMMENT_CREATE: "댓글 등록에 실패했어요. 잠시 후 다시 시도해주세요",
  PROFILE_UPDATE: "프로필 수정에 실패했어요. 잠시 후 다시 시도해주세요",
  DORM_VERIFICATION: "기숙사 인증 제출에 실패했어요. 잠시 후 다시 시도해주세요",
  ACCOUNT_SAVE: "계좌 저장에 실패했어요. 잠시 후 다시 시도해주세요",
  PASSWORD_CHANGE: "비밀번호 변경에 실패했어요. 잠시 후 다시 시도해주세요",
  WITHDRAW: "회원탈퇴에 실패했어요. 잠시 후 다시 시도해주세요",
  PUSH_SETTING: "알림 설정 변경에 실패했어요. 잠시 후 다시 시도해주세요",
} as const;

// 서버 응답이 아니라 브라우저 상태 때문에 막히는 경우
export const PUSH_TOAST_MESSAGE = {
  UNSUPPORTED: "이 브라우저에서는 알림을 사용할 수 없어요",
  PERMISSION_NEEDED: "알림을 켜려면 권한 허용이 필요해요",
} as const;

// 한 번 차단하면 코드로 다시 물을 수 없어 직접 켜도록 안내합니다
export const PUSH_PERMISSION_GUIDE = {
  TITLE: "알림이 차단되어 있어요",
  DESCRIPTION: "설정에서 알림을 허용해주세요",
} as const;

export const PROFILE_IMAGE_TOAST_MESSAGE = {
  UNSUPPORTED_TYPE: "JPG, PNG, WEBP 형식의 이미지만 올릴 수 있어요",
} as const;

// 서버 메시지 대신 항상 이 문구로 노출하는 토스트
export const EMAIL_VERIFY_TOAST_MESSAGE = {
  SEND_SUCCESS: "인증코드를 전송하였습니다!",
  SEND_FAILED:
    "학교 이메일 인증에 실패하였습니다!\n다시 시도해주세요(5분 내 3회 재시도 가능)",
  VERIFY_FAILED: "학교 이메일 인증에 실패하였습니다!",
} as const;
