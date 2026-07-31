// 서버가 에러 메시지를 안 내려줄 때 노출할 기본 문구
export const API_ERROR_MESSAGE = {
  DEFAULT: "요청에 실패했어요. 잠시 후 다시 시도해주세요",
  LOGIN: "로그인에 실패했어요. 잠시 후 다시 시도해주세요",
  ORDER_LIST: "배달팟 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요",
  ORDER_DETAIL: "배달팟 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요",
  ORDER_PARTICIPANTS:
    "참여자 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요",
  ORDER_CANCEL: "배달팟 취소에 실패했어요. 잠시 후 다시 시도해주세요",
} as const;
