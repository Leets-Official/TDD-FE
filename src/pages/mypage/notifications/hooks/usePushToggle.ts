import { useState } from "react";

import { getApiErrorMessage } from "@/api/error";
import {
  useRegisterPushSubscription,
  useUpdatePushSetting,
} from "@/api/notification/query";
import { useMyPage } from "@/api/user/query";
import {
  API_ERROR_MESSAGE,
  PUSH_PERMISSION_GUIDE,
  PUSH_TOAST_MESSAGE,
} from "@/constants/errorMessage";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import {
  isPushPermissionGranted,
  isPushSupported,
  requestNotificationPermission,
  subscribeToPush,
} from "@/utils/push";

export function usePushToggle() {
  const { data: profile } = useMyPage();
  const [changed, setChanged] = useState<boolean | null>(null);

  // 브라우저 권한이 꺼져 있으면 서버가 켜져 있어도 알림이 안 오므로 꺼짐으로 보여줍니다
  const pushEnabled =
    isPushPermissionGranted() && (changed ?? profile?.pushEnabled ?? true);

  const { openToast } = useToast();
  const { openModal } = useModal();
  const { mutateAsync: registerSubscription } = useRegisterPushSubscription();
  const { mutateAsync: updatePushSetting } = useUpdatePushSetting();

  const handleChange = async (checked: boolean) => {
    if (checked) {
      if (!isPushSupported()) {
        openToast({ message: PUSH_TOAST_MESSAGE.UNSUPPORTED });

        return;
      }

      const permission = await requestNotificationPermission();
      if (permission !== "granted") {
        // 차단 상태는 팝업을 다시 못 띄우므로 직접 켜는 경로를 안내합니다
        if (permission === "denied") {
          openModal({
            props: {
              title: PUSH_PERMISSION_GUIDE.TITLE,
              description: PUSH_PERMISSION_GUIDE.DESCRIPTION,
              primaryLabel: "확인",
            },
          });
        }

        return;
      }
    }

    const previous = pushEnabled;
    setChanged(checked);

    try {
      if (checked) {
        await registerSubscription(await subscribeToPush());
      }

      const saved = await updatePushSetting({ pushEnabled: checked });
      setChanged(saved.pushEnabled);
    } catch (error) {
      // 저장에 실패하면 화면만 바뀐 상태가 되므로 되돌립니다
      setChanged(previous);
      openToast({
        message: getApiErrorMessage(error, API_ERROR_MESSAGE.PUSH_SETTING),
      });
    }
  };

  return { pushEnabled, handleChange };
}
