import type { ProfilesItem } from "@/components/profiles/Profiles";

import type { FoodCategory } from "@/components/card/categoryIcons";

export interface OrderDetail {
  id: string;
  category: FoodCategory;
  title: string;
  description: string;
  location: string;
  deadline: number;
  minCount: number;
  maxCount: number;
  host: ProfilesItem;
  participants: ProfilesItem[];
  isCancelled?: boolean;
}
