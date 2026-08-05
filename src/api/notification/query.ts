import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchPushSetting, postPushSubscription } from "@/api/notification/api";

export const useRegisterPushSubscription = () => {
  return useMutation({ mutationFn: postPushSubscription });
};

export const useUpdatePushSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchPushSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
};
