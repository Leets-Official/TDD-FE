import axios from "axios";

import { authInstance } from "@/api/instance";
import type { UploadImageContentType } from "@/constants/imageUpload";
import type { ApiResponse } from "@/types/api";

interface PresignResponse {
  key: string;
  upload_url: string;
}

const post = async <T>(path: string, body: unknown) => {
  const { data } = await authInstance.post<ApiResponse<T>>(path, body);

  return data.data;
};

export const uploadPresignedUrl = async <TConfirmResponse>(
  basePath: string,
  file: File,
  contentType: UploadImageContentType
) => {
  const { key, upload_url } = await post<PresignResponse>(
    `${basePath}/presign`,
    { contentType }
  );

  await axios.put(upload_url, file, {
    headers: { "Content-Type": contentType },
  });

  return post<TConfirmResponse>(`${basePath}/confirm`, { key });
};
