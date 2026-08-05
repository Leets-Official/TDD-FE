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
  VERIFY_FAILED: "학교 이메일 인증에 실패하였습니다!",
} as const;
