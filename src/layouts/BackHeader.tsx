import { useNavigate } from "react-router";

import {
  PageHeader,
  type PageHeaderProps,
} from "@/components/header/PageHeader";

/* 뒤로 가기가 navigate(-1)인 일반적인 페이지 헤더 */
export function BackHeader(props: Omit<PageHeaderProps, "onBack">) {
  const navigate = useNavigate();

  return <PageHeader {...props} onBack={() => navigate(-1)} />;
}
