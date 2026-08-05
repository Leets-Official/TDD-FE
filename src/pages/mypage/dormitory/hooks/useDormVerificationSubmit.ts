import { useState } from "react";

import { getApiErrorMessage } from "@/api/error";
import { useSubmitDormVerification } from "@/api/user/query";
import { USER_ERROR_MESSAGE } from "@/constants/errorMessage/user";
import {
  isUploadImageContentType,
  type UploadImageContentType,
} from "@/constants/imageUpload";
import { PROFILE_IMAGE_TOAST_MESSAGE } from "@/constants/toastMessage";
import { useGoBack } from "@/hooks/useGoBack";
import { useToast } from "@/hooks/useToast";

const DORM_VERIFICATION_SUCCESS_MESSAGE = "인증 서류가 제출되었습니다!";

interface SelectedFile {
  file: File;
  contentType: UploadImageContentType;
}

export function useDormVerificationSubmit() {
  const goBack = useGoBack();
  const { openToast } = useToast();
  const { mutate: submit, isPending } = useSubmitDormVerification();
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    setSelectedFile({ file: selected, contentType: selected.type });
  };

  const clearFile = () => setSelectedFile(null);

  const submitVerification = () => {
    if (!selectedFile) return;

    submit(selectedFile, {
      onSuccess: () => {
        goBack();
        openToast({ message: DORM_VERIFICATION_SUCCESS_MESSAGE });
      },
      onError: (error) => {
        openToast({
          variant: "error",
          message: getApiErrorMessage(
            error,
            USER_ERROR_MESSAGE.DORM_VERIFICATION
          ),
        });
      },
    });
  };

  return {
    selectedFile,
    selectFile,
    clearFile,
    submitVerification,
    isPending,
  };
}
