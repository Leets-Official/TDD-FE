import type { PodItem } from "@/pages/home/pods.mock";

export interface PodFilters {
  dorm: string;
  menu: string;
  /** 몇 분 이내에 주문 예정인 배달팟만 볼지. 빈 문자열이면 전체. */
  orderTimeMinutes: string;
}

export function filterPods(pods: PodItem[], filters: PodFilters): PodItem[] {
  return pods.filter((pod) => {
    if (filters.dorm && pod.location !== filters.dorm) return false;
    if (filters.menu && pod.category !== filters.menu) return false;

    if (filters.orderTimeMinutes) {
      const remainingMinutes = (pod.deadline - Date.now()) / (60 * 1000);
      if (remainingMinutes > Number(filters.orderTimeMinutes)) return false;
    }

    return true;
  });
}
