import { useState } from "react";

/** 인증 완료된 이메일만 sessionStorage에 보관, 비밀번호 등 나머지 입력값은 보안상 저장하지 않음 */
export function useVerifiedEmail(storageKey: string) {
  const [email, setEmail] = useState(
    () => sessionStorage.getItem(storageKey) ?? ""
  );

  const markVerified = (value: string) => {
    setEmail(value);
    sessionStorage.setItem(storageKey, value);
  };

  const clearVerified = () => {
    sessionStorage.removeItem(storageKey);
  };

  return { email, isVerified: email !== "", markVerified, clearVerified };
}
