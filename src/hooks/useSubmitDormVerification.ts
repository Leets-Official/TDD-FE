import { useState } from "react";

import { submitDormVerification } from "@/api/dormVerification";
import type { DormVerification } from "@/types/dormVerification";

interface SubmitDormVerificationOptions {
  onSuccess?: (data: DormVerification) => void;
  onError?: (error: unknown) => void;
}

export function useSubmitDormVerification() {
  const [isPending, setIsPending] = useState(false);

  function mutate(file: File, options?: SubmitDormVerificationOptions) {
    setIsPending(true);
    submitDormVerification(file)
      .then((data) => options?.onSuccess?.(data))
      .catch((error: unknown) => options?.onError?.(error))
      .finally(() => setIsPending(false));
  }

  return { mutate, isPending };
}
