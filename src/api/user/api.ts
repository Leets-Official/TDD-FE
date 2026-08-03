import { authInstance, publicInstance } from "@/api/instance";
import { uploadPresignedUrl } from "@/api/upload";
import type { UploadImageContentType } from "@/constants/imageUpload";
import type { ApiResponse } from "@/types/api";
import type { DormVerificationUploadResponse } from "@/types/dormVerification";
import type {
  MyPageResponse,
  ProfileImageUploadResponse,
  ProfileUpdateRequest,
  ProfileUpdateResponse,
  SignupRequest,
  SignupResponse,
} from "@/types/user/user";

export const postSignup = async (body: SignupRequest) => {
  const { data } = await publicInstance.post<ApiResponse<SignupResponse>>(
    "/users/me",
    body
  );

  return data.data;
};

export const getMyPage = async () => {
  const { data } =
    await authInstance.get<ApiResponse<MyPageResponse>>("/users/me");

  return data.data;
};

export const patchProfile = async (body: ProfileUpdateRequest) => {
  const { data } = await authInstance.patch<ApiResponse<ProfileUpdateResponse>>(
    "/users/me/profile",
    body
  );

  return data.data;
};

export const uploadProfileImage = async (
  file: File,
  contentType: UploadImageContentType
) => {
  const { profile_image_url } =
    await uploadPresignedUrl<ProfileImageUploadResponse>(
      "/users/me/profile-image",
      file,
      contentType
    );

  return profile_image_url;
};

export const uploadDormVerification = (
  file: File,
  contentType: UploadImageContentType
) =>
  uploadPresignedUrl<DormVerificationUploadResponse>(
    "/users/me/dormitory-verification",
    file,
    contentType
  );
