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
