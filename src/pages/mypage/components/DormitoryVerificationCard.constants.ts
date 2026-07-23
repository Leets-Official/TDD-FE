import type { ComponentType, SVGProps } from "react";

import ShieldQuestionIcon from "@/assets/icons/ShieldQuestionIcon.svg?react";
import ShieldUserIcon from "@/assets/icons/ShieldUserIcon.svg?react";
import ShieldXIcon from "@/assets/icons/ShieldXIcon.svg?react";
import type { DormVerificationStatus } from "@/types/dormVerification";
import { daysUntil } from "@/utils/date";

export interface DormVerificationDescriptionContext {
  verifiedUntil?: string | null;
  rejectReason?: string | null;
}

interface StatusMeta {
  tone: "verified" | "unverified" | "failed";
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  description: string | ((ctx: DormVerificationDescriptionContext) => string);
}

export const STATUS_META: Record<DormVerificationStatus, StatusMeta> = {
  NONE: {
    tone: "unverified",
    Icon: ShieldQuestionIcon,
    label: "기숙사 미인증",
    description: "기숙사 인증을 하고, 더 많은 기능을 사용해요",
  },
  PENDING: {
    tone: "unverified",
    Icon: ShieldQuestionIcon,
    label: "기숙사 인증 심사 중",
    description: "인증 서류를 확인하고 있어요",
  },
  APPROVED: {
    tone: "verified",
    Icon: ShieldUserIcon,
    label: "기숙사 인증 완료",
    description: ({ verifiedUntil }) => `${daysUntil(verifiedUntil)}일 후 만료`,
  },
  REJECTED: {
    tone: "failed",
    Icon: ShieldXIcon,
    label: "기숙사 인증 실패",
    description: ({ rejectReason }) =>
      rejectReason ?? "반려 사유를 확인하고 재제출해 주세요",
  },
  EXPIRED: {
    tone: "failed",
    Icon: ShieldXIcon,
    label: "기숙사 인증 만료",
    description: "인증이 만료되었어요. 재인증이 필요해요",
  },
};
