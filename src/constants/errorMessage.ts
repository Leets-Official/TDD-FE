// 서버가 에러 메시지를 안 내려줄 때 노출할 기본 문구
export const API_ERROR_MESSAGE = {
  DEFAULT: "요청에 실패했어요. 잠시 후 다시 시도해주세요",
  LOGIN: "로그인에 실패했어요. 잠시 후 다시 시도해주세요",
  SIGNUP: "회원가입에 실패했어요. 잠시 후 다시 시도해주세요",
  PASSWORD_RESET: "비밀번호 재설정에 실패했어요. 잠시 후 다시 시도해주세요",
} as const;

// 서버 메시지 대신 항상 이 문구로 노출하는 토스트
export const EMAIL_VERIFY_TOAST_MESSAGE = {
  SEND_FAILED:
    "학교 이메일 인증에 실패하였습니다!\n다시 시도해주세요(5분내 3회 재시도 가능)",
  VERIFY_FAILED: "학교 이메일 인증에 실패하였습니다!",
} as const;
