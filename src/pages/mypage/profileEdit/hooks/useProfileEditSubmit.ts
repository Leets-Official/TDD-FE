import { useEffect, useRef, useState } from "react";

import { getApiErrorMessage } from "@/api/error";
import { useUpdateProfile } from "@/api/user/query";
import {
  API_ERROR_MESSAGE,
  PROFILE_IMAGE_TOAST_MESSAGE,
} from "@/constants/errorMessage";
import {
  isUploadImageContentType,
  type UploadImageContentType,
} from "@/constants/imageUpload";
import { useToast } from "@/hooks/useToast";
import type { ProfileFormValues } from "@/schemas/auth";
import { useGoBack } from "@/hooks/useGoBack";

const PROFILE_UPDATE_SUCCESS_MESSAGE = "프로필 수정이 완료되었습니다!";

interface SelectedImage {
  file: File;
  contentType: UploadImageContentType;
}

export function useProfileEditSubmit() {
  const goBack = useGoBack();
  const { openToast } = useToast();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const previewUrlRef = useRef<string | null>(null);
  const [imageFile, setImageFile] = useState<SelectedImage | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    event.target.value = "";
    if (!selected) return;

    if (!isUploadImageContentType(selected.type)) {
      openToast({
        variant: "warning",
        message: PROFILE_IMAGE_TOAST_MESSAGE.UNSUPPORTED_TYPE,
      });
      return;
    }

    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const url = URL.createObjectURL(selected);
    previewUrlRef.current = url;
    setImageFile({ file: selected, contentType: selected.type });
    setPreviewUrl(url);
  };

  const submitProfile = ({ nickname, dormitory }: ProfileFormValues) => {
    if (!dormitory) return;

    updateProfile(
      { nickname, dormitory, imageFile },
      {
        onSuccess: () => {
          goBack();
          openToast({ message: PROFILE_UPDATE_SUCCESS_MESSAGE });
        },
        onError: (error) => {
          openToast({
            variant: "error",
            message: getApiErrorMessage(
              error,
              API_ERROR_MESSAGE.PROFILE_UPDATE
            ),
          });
        },
      }
    );
  };

  return { previewUrl, selectImage, submitProfile, isPending };
}
