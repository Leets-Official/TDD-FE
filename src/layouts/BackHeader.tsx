import {
  PageHeader,
  type PageHeaderProps,
} from "@/components/header/PageHeader";
import { useGoBack } from "@/hooks/useGoBack";

/* 뒤로 가기가 이전 화면 복귀인 일반적인 페이지 헤더 */
export function BackHeader(props: Omit<PageHeaderProps, "onBack">) {
  const goBack = useGoBack();

  return <PageHeader {...props} onBack={goBack} />;
}
