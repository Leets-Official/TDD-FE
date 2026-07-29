// 서버가 에러 메시지를 안 내려줄 때 노출할 기본 문구
export const API_ERROR_MESSAGE = {
  DEFAULT: "요청에 실패했어요. 잠시 후 다시 시도해주세요",
  LOGIN: "로그인에 실패했어요. 잠시 후 다시 시도해주세요",
  BOARD_CREATE: "게시글 작성에 실패했어요. 잠시 후 다시 시도해주세요",
  BOARD_COMMENT_CREATE: "댓글 등록에 실패했어요. 잠시 후 다시 시도해주세요",
} as const;
