import { useState } from "react";
import { useNavigate } from "react-router";

import { getApiErrorMessage } from "@/api/error";
import { useSubmitDormVerification } from "@/api/user/query";
import {
  API_ERROR_MESSAGE,
  PROFILE_IMAGE_TOAST_MESSAGE,
} from "@/constants/errorMessage";
import {
  isUploadImageContentType,
  type UploadImageContentType,
} from "@/constants/imageUpload";
import { useToast } from "@/hooks/useToast";

const DORM_VERIFICATION_SUCCESS_MESSAGE = "인증 서류가 제출되었습니다!";

interface SelectedFile {
  file: File;
  contentType: UploadImageContentType;
}

export function useDormVerificationSubmit() {
  const navigate = useNavigate();
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
        navigate(-1);
        openToast({ message: DORM_VERIFICATION_SUCCESS_MESSAGE });
      },
      onError: (error) => {
        openToast({
          variant: "error",
          message: getApiErrorMessage(
            error,
            API_ERROR_MESSAGE.DORM_VERIFICATION
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
