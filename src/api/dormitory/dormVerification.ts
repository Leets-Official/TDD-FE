import {
  mockFetchDormVerification,
  mockSubmitDormVerification,
} from "@/pages/mypage/dormitory/dormVerification.mock";
import type { DormVerification } from "@/types/dormVerification";

export function getDormVerification(): Promise<DormVerification | null> {
  return mockFetchDormVerification();
}

export function submitDormVerification(file: File): Promise<DormVerification> {
  return mockSubmitDormVerification(file);
}
