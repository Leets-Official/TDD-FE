import type { DormVerification } from "@/types/dormVerification";

const MOCK_DELAY_MS = 500;

let mockDormVerification: DormVerification | null = null;

function delay<T>(value: T) {
  return new Promise<T>((resolve) =>
    setTimeout(() => resolve(value), MOCK_DELAY_MS)
  );
}

export function mockFetchDormVerification() {
  return delay(mockDormVerification);
}

export function mockSubmitDormVerification(_file: File) {
  mockDormVerification = { status: "PENDING" };
  return delay(mockDormVerification);
}
