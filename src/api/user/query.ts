import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import {
  deleteAccount,
  getBankAccount,
  getMyPage,
  patchBankAccount,
  patchPassword,
  patchProfile,
  postBankAccount,
  postSignup,
  uploadDormVerification,
  uploadProfileImage,
} from "@/api/user/api";
import { ensurePushSubscription } from "@/api/notification/ensurePushSubscription";
import type { UploadImageContentType } from "@/constants/imageUpload";
import { PATH } from "@/routes/paths";
import { useAuthStore } from "@/stores/useAuthStore";
import type { ProfileUpdateRequest } from "@/types/user/user";

export const useSignup = () => {
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: postSignup,
    onSuccess: (data) => {
      setTokens(data);
      void ensurePushSubscription();
      navigate(PATH.HOME, { replace: true });
    },
  });
};

export const useMyPage = () => {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: getMyPage,
  });
};

export interface UpdateProfileVariables extends ProfileUpdateRequest {
  imageFile?: { file: File; contentType: UploadImageContentType } | null;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ imageFile, ...body }: UpdateProfileVariables) => {
      if (imageFile) {
        await uploadProfileImage(imageFile.file, imageFile.contentType);
      }

      return patchProfile(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({ mutationFn: patchPassword });
};

export const useWithdraw = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccount,
    // 실패하면 계정이 남아 있으므로 성공했을 때만 정리합니다
    onSuccess: () => {
      clearAuth();
      queryClient.removeQueries();
    },
  });
};

export const useBankAccount = () => {
  return useQuery({
    queryKey: ["user", "bank-account"],
    queryFn: getBankAccount,
  });
};

// 등록된 계좌가 없을 때만 성공합니다
export const useRegisterBankAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBankAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "bank-account"] });
    },
  });
};

// 등록된 계좌가 있을 때만 성공합니다
export const useUpdateBankAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchBankAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "bank-account"] });
    },
  });
};

interface SubmitDormVerificationVariables {
  file: File;
  contentType: UploadImageContentType;
}

export const useSubmitDormVerification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, contentType }: SubmitDormVerificationVariables) =>
      uploadDormVerification(file, contentType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
};
