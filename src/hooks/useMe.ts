import { useMyPage } from "@/api/user/query";

export function useMe() {
  const { data: me, isPending, isError, refetch } = useMyPage();

  return {
    me,
    isPending,
    isError,
    refetch,
    userId: me ? String(me.userId) : undefined,
    dormStatus: me?.dormStatus,
    isNoshowRestricted: me?.status === "SUSPENDED",
  };
}
