import type { FoodCategory } from "@/components/card/categoryIcons";

// 배달팟 목록 조회 API
export interface PartyListItem {
  partyId: number;
  title: string;
  category: FoodCategory;
  currentParticipants: number;
  minParticipants: number;
  maxParticipants: number;
  status: string;
  orderExpectedAt: string;
  dormitory: string;
}

// 배달팟 목록 조회 API 쿼리 파라미터
export interface PartyListParams {
  categoryId?: number;
  dormitory?: string;
}

// 내 배달팟 목록 조회 API 쿼리 파라미터
export interface MyPartyListParams {
  status?: "ALL" | "ONGOING" | "COMPLETED";
  categoryId?: number;
  dormitoryId?: number;
  orderExpectedFrom?: string;
  orderExpectedTo?: string;
}

// 배달팟 상세 조회 API
export interface PartyDetail {
  id: number;
  creatorId: number;
  leaderNickname: string;
  leaderProfileImage: string | null;
  leaderMannerTemperature: number;
  dormitory: string | null;
  foodCategoryId: number;
  title: string;
  description: string;
  minParticipants: number;
  maxParticipants: number;
  orderExpectedAt: string;
  status: string;
  createdAt: string;
}

// 배달팟 생성 API 요청 바디
export interface CreatePartyRequest {
  foodCategoryId: number;
  title: string;
  description: string;
  minParticipants: number;
  maxParticipants: number;
  orderExpectedAt: string;
  dormitory: string;
}

// 배달팟 생성 API 응답
export interface PartyCreateResult {
  id: number;
  foodCategoryId: number;
  dormitory: string;
  title: string;
  description: string;
  minParticipants: number;
  maxParticipants: number;
  orderExpectedAt: string;
  status: string;
  createdAt: string;
}

// 배달팟 참여자 목록 API
export interface Participant {
  userId: number;
  nickname: string;
  profileImage: string | null;
  role: string;
  mannerTemperature: number;
}

export interface PartyParticipants {
  partyId: number;
  participants: Participant[];
}

// 배달팟 취소(모집 취소) API 응답
export interface PartyCancelResult {
  partyId: number;
}

// 배달팟 참여 API 응답
export interface PartyJoinResult {
  partyId: number;
  currentParticipants: number;
  maxParticipants: number;
}

// 배달팟 참여 취소 API 응답
export interface PartyLeaveResult {
  partyId: number;
  currentParticipants: number;
  maxParticipants: number;
}

// 배달팟 모집 마감 API 응답
export interface PartyCloseResult {
  partyId: number;
  status: string;
}
