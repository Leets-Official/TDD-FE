export interface PartyListItem {
  id: number;
  foodCategoryId: number;
  title: string;
  description: string;
  minParticipants: number;
  maxParticipants: number;
  currentParticipants: number;
  dormitory: string;
  orderExpectedAt: string;
  status: string;
  createdAt: string;
}
