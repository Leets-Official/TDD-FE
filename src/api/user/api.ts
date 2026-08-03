import { authInstance, publicInstance } from "@/api/instance";
import { uploadPresignedUrl } from "@/api/upload";
import type { UploadImageContentType } from "@/constants/imageUpload";
import type { ApiResponse } from "@/types/api";
import type { DormVerificationUploadResponse } from "@/types/dormVerification";
import type {
  BankAccount,
  MyPageResponse,
  PasswordChangeRequest,
  ProfileImageUploadResponse,
  ProfileUpdateRequest,
  ProfileUpdateResponse,
  SignupRequest,
  SignupResponse,
  WithdrawRequest,
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

// 성공하면 서버가 refresh token을 무효화합니다
export const patchPassword = async (body: PasswordChangeRequest) => {
  await authInstance.patch<ApiResponse<null>>("/users/me/password", body);
};

// soft delete(status=DELETED) 처리라 같은 이메일로 재가입이 막힐 수 있습니다
export const deleteAccount = async (body: WithdrawRequest) => {
  await authInstance.delete<ApiResponse<null>>("/users/me", { data: body });
};

export const getBankAccount = async () => {
  const { data } = await authInstance.get<ApiResponse<BankAccount | null>>(
    "/users/me/bank-account"
  );

  return data.data;
};

export const postBankAccount = async (body: BankAccount) => {
  const { data } = await authInstance.post<ApiResponse<BankAccount>>(
    "/users/me/bank-account",
    body
  );

  return data.data;
};

export const patchBankAccount = async (body: BankAccount) => {
  const { data } = await authInstance.patch<ApiResponse<BankAccount>>(
    "/users/me/bank-account",
    body
  );

  return data.data;
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
