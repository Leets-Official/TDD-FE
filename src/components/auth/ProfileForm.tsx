import { useEffect, type ReactNode } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dropdown } from "@/components/dropdown/Dropdown";
import { DORMITORY_OPTIONS } from "@/constants/dormitory";
import { TextField } from "@/components/textField/TextField";
import { cn } from "@/utils/cn";
import {
  profileFormSchema,
  NICKNAME_MIN_LENGTH,
  NICKNAME_MAX_LENGTH,
  type ProfileFormValues,
} from "@/schemas/auth";

export interface ProfileFormProps {
  formId: string;
  onSubmit: (values: ProfileFormValues) => void;
  onValidityChange?: (isValid: boolean) => void;
  isEdit?: boolean;
  children?: ReactNode;
  /** 수정 화면에서 기존 값을 채워둘 때 사용합니다. 첫 렌더에만 반영됩니다. */
  defaultValues?: Partial<ProfileFormValues>;
}

export function ProfileForm({
  formId,
  onSubmit,
  onValidityChange,
  isEdit = false,
  children,
  defaultValues,
}: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { nickname: "", dormitory: null, ...defaultValues },
  });

  const nicknameValue = useWatch({ control, name: "nickname" });
  const nicknameLength = (nicknameValue ?? "").length;
  const isNicknameValid =
    nicknameLength >= NICKNAME_MIN_LENGTH &&
    nicknameLength <= NICKNAME_MAX_LENGTH;

  useEffect(() => {
    onValidityChange?.(isNicknameValid);
  }, [isNicknameValid, onValidityChange]);

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full flex-col px-5 pt-l"
    >
      {!isEdit && <h1 className="text-title-1 text-black">프로필 설정</h1>}
      {children}
      <div className={cn("mt-6 flex flex-col", isEdit ? "gap-6" : "gap-2")}>
        <div className="flex flex-col gap-2">
          <TextField
            label="닉네임"
            placeholder={isEdit ? "닉네임 수정" : "닉네임 입력"}
            autoFocus
            state={errors.nickname ? "error" : "default"}
            feedback={errors.nickname?.message}
            {...register("nickname")}
          />
          <div className="text-caption-1 text-text-5">
            {isEdit ? (
              <p>
                닉네임은 {NICKNAME_MIN_LENGTH}~{NICKNAME_MAX_LENGTH}자로
                입력해주세요(한글, 영문, 숫자 사용 가능)
              </p>
            ) : (
              <>
                <ul className="list-disc space-y-1 pl-4">
                  <li>
                    닉네임은 {NICKNAME_MIN_LENGTH}~{NICKNAME_MAX_LENGTH}자로
                    입력해주세요.
                  </li>
                  <li>한글, 영문, 숫자 사용 가능</li>
                </ul>
                <p className="mt-4">
                  건너뛰기를 하면 닉네임이 자동으로 할당되며, 마이페이지에서
                  변경이 가능합니다
                </p>
              </>
            )}
          </div>
        </div>

        <Controller
          control={control}
          name="dormitory"
          render={({ field }) => (
            <Dropdown
              label="기숙사"
              placeholder="기숙사 동을 선택하세요(1기숙사)"
              options={DORMITORY_OPTIONS}
              value={field.value ?? undefined}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </form>
  );
}
