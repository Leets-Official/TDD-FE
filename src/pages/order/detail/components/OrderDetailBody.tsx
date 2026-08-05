import { Profiles, type ProfilesItem } from "@/components/profiles/Profiles";
import type { OrderDetail } from "@/types/order/orderDetail";

import { OrderParticipantsSkeleton } from "./OrderDetailSkeleton";
import { OrderHostProfile } from "./OrderHostProfile";

interface OrderDetailBodyProps {
  order: OrderDetail;
  participants: ProfilesItem[];
  isParticipantsPending: boolean;
}

export function OrderDetailBody({
  order,
  participants,
  isParticipantsPending,
}: OrderDetailBodyProps) {
  return (
    <div className="flex flex-col px-5 pb-8">
      <div className="flex flex-col gap-xxl">
        <div className="flex flex-col">
          <OrderHostProfile
            nickname={order.host.nickname}
            temperature={order.host.temperature}
            src={order.host.src}
          />

          <div className="flex items-center gap-1 text-body-2 text-text-4">
            <span>{order.category}</span>
            {order.location && (
              <>
                <span aria-hidden="true">·</span>
                <span>{order.location}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-title-2 text-text-1">{order.title}</h1>
          <p className="text-body-1 whitespace-pre-line text-text-1">
            {order.description}
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-xl">
        <div className="-mx-5 h-px bg-divider-1" />
        {isParticipantsPending ? (
          <OrderParticipantsSkeleton count={order.maxCount} />
        ) : (
          <Profiles participants={participants} maxCount={order.maxCount} />
        )}
      </div>
    </div>
  );
}
