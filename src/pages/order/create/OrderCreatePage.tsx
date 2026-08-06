import { Controller } from "react-hook-form";

import { Button } from "@/components/button/Button";
import { Dropdown } from "@/components/dropdown/Dropdown";
import { Slider } from "@/components/slider/Slider";
import { TextField } from "@/components/textField/TextField";
import { Textarea } from "@/components/textarea/Textarea";
import {
  MENU_OPTIONS,
  ORDER_TIME_OPTIONS,
} from "@/constants/home/filterOptions";
import { DORMITORY_OPTIONS } from "@/constants/user/dormitory";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";
import { TARGET_COUNT_MAX, TARGET_COUNT_MIN } from "@/schemas/order";
import { cn } from "@/utils/cn";

import { useOrderCreateForm } from "./hooks/useOrderCreateForm";

const ORDER_CREATE_FORM_ID = "order-create-form";
const MENU_SELECT_OPTIONS = MENU_OPTIONS.filter(
  (option) => option.value !== ""
);
const ORDER_TIME_SELECT_OPTIONS = ORDER_TIME_OPTIONS.filter(
  (option) => option.value !== ""
);

export default function OrderCreatePage() {
  const {
    register,
    control,
    errors,
    hasEmptyField,
    isSubmitting,
    submitOrderCreate,
  } = useOrderCreateForm();

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
        onSubmit={submitOrderCreate}
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
