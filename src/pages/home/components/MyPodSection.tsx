import { useState } from "react";

import { Card } from "@/components/card/Card";
import { Dropdown } from "@/components/dropdown/Dropdown";

import {
  DORM_OPTIONS,
  MENU_OPTIONS,
  ORDER_TIME_OPTIONS,
  POD_STATE_OPTIONS,
} from "@/constants/home/filterOptions";
import { filterPods } from "@/utils/home/filterPods";

import { CreatePodFab } from "./CreatePodFab";
import { PodEmptyState } from "./PodEmptyState";
import type { PodItem } from "../pods.mock";

export interface MyPodSectionProps {
  inProgressPods: PodItem[];
  pastPods: PodItem[];
  onCreateClick: () => void;
  onCardClick: (pod: PodItem) => void;
}

export function MyPodSection({
  inProgressPods,
  pastPods,
  onCreateClick,
  onCardClick,
}: MyPodSectionProps) {
  const [podState, setPodState] = useState("all");
  const [dorm, setDorm] = useState("");
  const [menu, setMenu] = useState("");
  const [orderTimeMinutes, setOrderTimeMinutes] = useState("");

  const filters = { dorm, menu, orderTimeMinutes };
  const filteredInProgressPods =
    podState === "past" ? [] : filterPods(inProgressPods, filters);
  const filteredPastPods =
    podState === "ongoing" ? [] : filterPods(pastPods, filters);

  return (
    <div className="relative flex flex-col">
      <div className="flex scrollbar-none items-center gap-3.25 overflow-x-auto px-xxl py-s [&::-webkit-scrollbar]:hidden">
        <Dropdown
          variant="filter"
          label="진행중/지난"
          options={POD_STATE_OPTIONS}
          value={podState}
          onChange={setPodState}
        />
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

      {filteredInProgressPods.length === 0 && filteredPastPods.length === 0 ? (
        <PodEmptyState onCreateClick={onCreateClick} />
      ) : (
        <>
          <div className="flex flex-col gap-9 px-xl pb-24">
            {podState !== "past" && (
              <section className="flex flex-col gap-l">
                <h2 className="text-title-1 text-text-1">진행중인 배달팟</h2>
                <ul className="flex flex-col gap-xxl">
                  {filteredInProgressPods.map((pod) => (
                    <li key={pod.id}>
                      <button
                        type="button"
                        className="w-full text-left"
                        onClick={() => onCardClick(pod)}
                      >
                        <Card {...pod} />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {podState !== "ongoing" && (
              <section className="flex flex-col gap-l">
                <h2 className="text-title-1 text-text-1">지난 배달팟</h2>
                <ul className="flex flex-col gap-xxl">
                  {filteredPastPods.map((pod) => (
                    <li key={pod.id}>
                      <button
                        type="button"
                        className="w-full text-left"
                        onClick={() => onCardClick(pod)}
                      >
                        <Card {...pod} />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <CreatePodFab onClick={onCreateClick} />
        </>
      )}
    </div>
  );
}
