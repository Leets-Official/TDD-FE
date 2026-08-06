import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";

import { getApiErrorMessage } from "@/api/error";
import { useCreateParty } from "@/api/order/query";
import type { FoodCategory } from "@/components/card/categoryIcons";
import { ORDER_ERROR_MESSAGE } from "@/constants/errorMessage/order";
import { FOOD_CATEGORY_ID_MAP } from "@/constants/order/foodCategory";
import { ORDER_TOAST_MESSAGE } from "@/constants/toastMessage";
import { useToast } from "@/hooks/useToast";
import { PATH } from "@/routes/paths";
import {
  orderCreateSchema,
  TARGET_COUNT_MAX,
  TARGET_COUNT_MIN,
  type OrderCreateFormValues,
} from "@/schemas/order";
import { toOrderExpectedAt } from "@/utils/order/toOrderExpectedAt";

export function useOrderCreateForm() {
  const navigate = useNavigate();
  const { openToast } = useToast();
  const { mutate: createParty, isPending: isCreating } = useCreateParty();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OrderCreateFormValues>({
    resolver: zodResolver(orderCreateSchema),
    defaultValues: {
      category: "" as FoodCategory,
      title: "",
      targetRange: [TARGET_COUNT_MIN, TARGET_COUNT_MAX],
      orderTimeMinutes: "",
      dormitory: "",
      description: "",
    },
  });

  const [category, title, orderTimeMinutes, dormitory, description] = useWatch({
    control,
    name: ["category", "title", "orderTimeMinutes", "dormitory", "description"],
  });
  const hasEmptyField =
    !category ||
    !title.trim() ||
    !orderTimeMinutes ||
    !dormitory ||
    !description.trim();

  const submitOrderCreate = handleSubmit((values) => {
    const [minParticipants, maxParticipants] = values.targetRange;
    const orderExpectedAt = toOrderExpectedAt(Number(values.orderTimeMinutes));

    createParty(
      {
        foodCategoryId: FOOD_CATEGORY_ID_MAP[values.category],
        title: values.title,
        description: values.description,
        minParticipants,
        maxParticipants,
        orderExpectedAt,
        dormitory: values.dormitory,
      },
      {
        onSuccess: (result) => {
          // 생성 폼을 히스토리에 남기지 않아, 상세 페이지에서 뒤로가기 누르면 홈으로 바로 이동합니다.
          navigate(PATH.ORDER_DETAIL.replace(":orderId", String(result.id)), {
            replace: true,
          });
          openToast({ message: ORDER_TOAST_MESSAGE.CREATE_SUCCESS });
        },
        onError: (error) => {
          openToast({
            message: getApiErrorMessage(error, ORDER_ERROR_MESSAGE.CREATE),
          });
        },
      }
    );
  });

  return {
    register,
    control,
    errors,
    hasEmptyField,
    // 폼 제출 중과 서버 생성 중 둘 다 버튼을 막아야 한다
    isSubmitting: isSubmitting || isCreating,
    submitOrderCreate,
  };
}
