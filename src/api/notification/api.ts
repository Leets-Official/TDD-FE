import { authInstance } from "@/api/instance";
import type { ApiResponse } from "@/types/api";
import type {
  PushSetting,
  PushSubscriptionRequest,
} from "@/types/notification/notification";

export const postPushSubscription = async (body: PushSubscriptionRequest) => {
  await authInstance.post<ApiResponse<null>>(
    "/users/me/push-subscription",
    body
  );
};

export const patchPushSetting = async (body: PushSetting) => {
  const { data } = await authInstance.patch<ApiResponse<PushSetting>>(
    "/users/me/push-setting",
    body
  );

  return data.data;
};
