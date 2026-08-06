import axios from "axios";

import { authInstance } from "@/api/instance";
import type { UploadImageContentType } from "@/constants/imageUpload";
import type { ApiResponse } from "@/types/api";
import type {
  ChatImagePresignResponse,
  ChatMessage,
  ChatMessageHistoryParams,
  ChatRoomInfo,
} from "@/types/order/chat";

// 메시지 내역 조회 API
export const getChatMessages = async (
  partyId: number,
  params?: ChatMessageHistoryParams
) => {
  const { data } = await authInstance.get<ApiResponse<ChatMessage[]>>(
    `/parties/${partyId}/chat/messages`,
    { params }
  );

  return data.data;
};

// 채팅방 정보 조회 API
export const getChatRoomInfo = async (partyId: number) => {
  const { data } = await authInstance.get<ApiResponse<ChatRoomInfo>>(
    `/parties/${partyId}/chat`
  );

  return data.data;
};

// 채팅 이미지 업로드 1단계 API(업로드 URL 발급)
const presignChatImage = async (
  partyId: number,
  contentType: UploadImageContentType
) => {
  const { data } = await authInstance.post<
    ApiResponse<ChatImagePresignResponse>
  >(`/parties/${partyId}/chat/images/presign`, { contentType });

  return data.data;
};

// 채팅 이미지 업로드 2단계 API(업로드 확정)
const confirmChatImage = async (partyId: number, key: string) => {
  await authInstance.post<ApiResponse<string>>(
    `/parties/${partyId}/chat/images/confirm`,
    { key }
  );
};

// presign → S3 직접 업로드 → confirm 순서로 채팅 이미지를 업로드하고,
// 소켓 전송(IMAGE 메시지)에 사용할 key를 반환한다
export const uploadChatImage = async (
  partyId: number,
  file: File,
  contentType: UploadImageContentType
) => {
  const { key, uploadUrl } = await presignChatImage(partyId, contentType);

  await axios.put(uploadUrl, file, {
    headers: { "Content-Type": contentType },
  });
  await confirmChatImage(partyId, key);

  return key;
};
