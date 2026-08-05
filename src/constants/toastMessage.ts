// 배달팟 흐름에서 노출하는 토스트 (서버 에러 fallback은 errorMessage/order.ts)
export const ORDER_TOAST_MESSAGE = {
  CREATE_SUCCESS: "배달팟이 성공적으로 만들어졌어요!",
  JOIN_SUCCESS: "배달팟 참여 신청이 완료되었습니다!",
  REVIEW_SUCCESS: "매너 평가가 등록되었어요",
  ACCOUNT_LOAD_FAILED: "계좌 정보를 불러오지 못했어요",
  ACCOUNT_COPY_SUCCESS: "계좌번호가 복사되었습니다",
  ACCOUNT_COPY_FAILED: "계좌번호 복사에 실패했습니다",
  MESSAGE_SEND_FAILED: "연결이 원활하지 않아 메시지를 보내지 못했어요",
} as const;

export const BOARD_TOAST_MESSAGE = {
  CREATE_SUCCESS: "게시글이 성공적으로 작성되었어요!",
} as const;

// 서버 응답이 아니라 브라우저 상태 때문에 막히는 경우
export const PUSH_TOAST_MESSAGE = {
  UNSUPPORTED: "이 브라우저에서는 알림을 사용할 수 없어요",
  PERMISSION_NEEDED: "알림을 켜려면 권한 허용이 필요해요",
} as const;

export const PROFILE_IMAGE_TOAST_MESSAGE = {
  UNSUPPORTED_TYPE: "JPG, PNG, WEBP 형식의 이미지만 올릴 수 있어요",
} as const;

// 서버 메시지 대신 항상 이 문구로 노출하는 토스트
export const EMAIL_VERIFY_TOAST_MESSAGE = {
  SEND_SUCCESS: "인증코드를 전송하였습니다!",
  SEND_FAILED:
    "학교 이메일 인증에 실패하였습니다!\n다시 시도해주세요(5분 내 3회 재시도 가능)",
  VERIFY_SUCCESS: "학교 이메일 인증이 완료되었습니다!",
  VERIFY_FAILED: "학교 이메일 인증에 실패하였습니다!",
} as const;
