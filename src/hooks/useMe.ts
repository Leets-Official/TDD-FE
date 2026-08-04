import { useMyPage } from "@/api/user/query";

export function useMe() {
  const { data: me, isPending } = useMyPage();

  return {
    me,
    isPending,
    userId: me ? String(me.userId) : undefined,
    dormStatus: me?.dormStatus,
    isNoshowRestricted: me?.status === "SUSPENDED",
  };
}
