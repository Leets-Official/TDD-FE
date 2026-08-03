import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import {
  getMyPage,
  patchProfile,
  postSignup,
  uploadDormVerification,
  uploadProfileImage,
} from "@/api/user/api";
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
