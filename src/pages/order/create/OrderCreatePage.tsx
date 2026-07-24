import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import { Button } from "@/components/button/Button";
import type { FoodCategory } from "@/components/card/categoryIcons";
import { Dropdown } from "@/components/dropdown/Dropdown";
import { Slider } from "@/components/slider/Slider";
import { TextField } from "@/components/textField/TextField";
import { Textarea } from "@/components/textarea/Textarea";
import { cn } from "@/utils/cn";
import { DORMITORY_OPTIONS } from "@/constants/dormitory";
import {
  MENU_OPTIONS,
  ORDER_TIME_OPTIONS,
} from "@/constants/home/filterOptions";
import { useToast } from "@/hooks/useToast";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";
import {
  orderCreateSchema,
  TARGET_COUNT_MAX,
  TARGET_COUNT_MIN,
  type OrderCreateFormValues,
} from "@/schemas/order";

import { createPodDetail } from "../detail/detail.mock";

const ORDER_CREATE_FORM_ID = "order-create-form";
const MENU_SELECT_OPTIONS = MENU_OPTIONS.filter(
  (option) => option.value !== ""
);
const ORDER_TIME_SELECT_OPTIONS = ORDER_TIME_OPTIONS.filter(
  (option) => option.value !== ""
);

export default function OrderCreatePage() {
  const navigate = useNavigate();
  const { openToast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OrderCreateFormValues>({
    resolver: zodResolver(orderCreateSchema),
    defaultValues: {
      category: "",
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
    !category || !title || !orderTimeMinutes || !dormitory || !description;

  const onSubmit = (values: OrderCreateFormValues) => {
    const [minCount, maxCount] = values.targetRange;
    const pod = createPodDetail({
      category: values.category as FoodCategory,
      title: values.title,
      description: values.description,
      location: values.dormitory,
      orderTimeMinutes: Number(values.orderTimeMinutes),
      minCount,
      maxCount,
    });

    // 생성 폼을 히스토리에 남기지 않아, 상세 페이지에서 뒤로가기 누르면 홈으로 바로 이동합니다.
    navigate(PATH.ORDER_DETAIL.replace(":orderId", pod.id), { replace: true });
    openToast({ message: "배달팟이 성공적으로 만들어졌어요!" });
  };

  return (
    <PageShell
      header={<BackHeader title="배달팟 생성" />}
      bottom={
        <Button
          type="submit"
          form={ORDER_CREATE_FORM_ID}
          className={cn(
            "w-full",
            hasEmptyField && "bg-disabled hover:bg-disabled active:bg-disabled"
          )}
          disabled={isSubmitting}
        >
          완료
        </Button>
      }
    >
      <form
        id={ORDER_CREATE_FORM_ID}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-xxl px-5 pt-l"
      >
        <h1 className="text-title-1 text-text-1">배달팟 만들기</h1>

        <div>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Dropdown
                label="메뉴 카테고리"
                placeholder="메뉴(한식, 치킨)를 선택하세요"
                options={MENU_SELECT_OPTIONS}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.category && (
            <p className="mt-1 px-padding-s text-caption-1 text-error">
              {errors.category.message}
            </p>
          )}
        </div>

        <TextField
          label="제목"
          placeholder="제목 입력(ex. OO피자 먹을 사람~)"
          state={errors.title ? "error" : "default"}
          feedback={errors.title?.message}
          {...register("title")}
        />

        <div className="flex flex-col gap-xxs">
          <span className="text-body-1 text-text-1">
            목표인원<span className="text-text-5">(본인포함)</span>
          </span>
          <Controller
            control={control}
            name="targetRange"
            render={({ field }) => (
              <Slider
                min={TARGET_COUNT_MIN}
                max={TARGET_COUNT_MAX}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex gap-l">
          <div className="flex-1">
            <Controller
              control={control}
              name="orderTimeMinutes"
              render={({ field }) => (
                <Dropdown
                  label="주문 예정 시간"
                  placeholder="10분 후"
                  options={ORDER_TIME_SELECT_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.orderTimeMinutes && (
              <p className="mt-1 px-padding-s text-caption-1 text-error">
                {errors.orderTimeMinutes.message}
              </p>
            )}
          </div>

          <div className="flex-1">
            <Controller
              control={control}
              name="dormitory"
              render={({ field }) => (
                <Dropdown
                  label="기숙사"
                  placeholder="1기숙사"
                  options={DORMITORY_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.dormitory && (
              <p className="mt-1 px-padding-s text-caption-1 text-error">
                {errors.dormitory.message}
              </p>
            )}
          </div>
        </div>

        <Textarea
          label="상세설명"
          placeholder="장소, 세부내역"
          {...register("description")}
        />
        {errors.description && (
          <p className="-mt-xl px-padding-s text-caption-1 text-error">
            {errors.description.message}
          </p>
        )}
      </form>
    </PageShell>
  );
}
