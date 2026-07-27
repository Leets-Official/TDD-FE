import { useEffect, useState } from "react";

import { Card } from "@/components/card/Card";
import { Dropdown } from "@/components/dropdown/Dropdown";

import {
  DORM_OPTIONS,
  MENU_OPTIONS,
  ORDER_TIME_OPTIONS,
} from "@/constants/home/filterOptions";
import { filterPods } from "@/utils/home/filterPods";

import { CreatePodFab } from "./CreatePodFab";
import { PodEmptyState } from "./PodEmptyState";
import type { PodItem } from "../pods.mock";

export interface PodListSectionProps {
  pods: PodItem[];
  onCreateClick: () => void;
  onCardClick: (pod: PodItem) => void;
}

export function PodListSection({
  pods,
  onCreateClick,
  onCardClick,
}: PodListSectionProps) {
  const [dorm, setDorm] = useState("");
  const [menu, setMenu] = useState("");
  const [orderTimeMinutes, setOrderTimeMinutes] = useState("");
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const activePods = pods.filter((pod) => pod.deadline > now);
  const filteredPods = filterPods(activePods, { dorm, menu, orderTimeMinutes });

  return (
    <div className="relative flex flex-col">
      <div className="flex items-center gap-3.25 px-xxl py-s">
        <Dropdown
          variant="filter"
          label="기숙사"
          options={DORM_OPTIONS}
          value={dorm}
          onChange={setDorm}
        />
        <Dropdown
          variant="filter"
          label="메뉴"
          options={MENU_OPTIONS}
          visibleOptions={5}
          value={menu}
          onChange={setMenu}
        />
        <Dropdown
          variant="filter"
          label="주문 예정 시간"
          options={ORDER_TIME_OPTIONS}
          value={orderTimeMinutes}
          onChange={setOrderTimeMinutes}
        />
      </div>

      {filteredPods.length === 0 ? (
        <PodEmptyState onCreateClick={onCreateClick} />
      ) : (
        <>
          <ul className="flex flex-col gap-xxl px-xl pb-24">
            {filteredPods.map((pod) => (
              <li key={pod.id}>
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => onCardClick(pod)}
                >
                  <Card {...pod} hideStatusBadge />
                </button>
              </li>
            ))}
          </ul>
          <CreatePodFab onClick={onCreateClick} />
        </>
      )}
    </div>
  );
}
