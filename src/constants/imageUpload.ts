// presign 업로드에서 서버가 허용하는 이미지 형식 — 프로필 사진, 기숙사 인증 공통
export const UPLOAD_IMAGE_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type UploadImageContentType =
  (typeof UPLOAD_IMAGE_CONTENT_TYPES)[number];

export const UPLOAD_IMAGE_ACCEPT = UPLOAD_IMAGE_CONTENT_TYPES.join(",");

export const isUploadImageContentType = (
  type: string
): type is UploadImageContentType =>
  UPLOAD_IMAGE_CONTENT_TYPES.includes(type as UploadImageContentType);
