import { useRef, useState } from "react";

import { ProfileForm } from "@/components/auth/ProfileForm";
import { Avatar } from "@/components/avatar/Avatar";
import { Button } from "@/components/button/Button";
import { UPLOAD_IMAGE_ACCEPT } from "@/constants/imageUpload";
import { useMe } from "@/hooks/useMe";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";

import { useProfileEditSubmit } from "./hooks/useProfileEditSubmit";

const PROFILE_EDIT_FORM_ID = "profile-edit-form";

export function ProfileEditPage() {
  const { me: profile } = useMe();
  const [isValid, setIsValid] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { previewUrl, selectImage, submitProfile, isPending } =
    useProfileEditSubmit();

  return (
    <PageShell
      header={<BackHeader title="프로필 수정" />}
      bottom={
        <Button
          type="submit"
          form={PROFILE_EDIT_FORM_ID}
          className="w-full"
          disabled={!isValid || isPending}
        >
          수정 완료
        </Button>
      }
    >
      {profile && (
        <ProfileForm
          formId={PROFILE_EDIT_FORM_ID}
          isEdit
          defaultValues={{
            nickname: profile.nickname,
            dormitory: profile.dormitory ?? null,
          }}
          onSubmit={submitProfile}
          onValidityChange={setIsValid}
        >
          <h1 className="text-title-1">프로필 수정</h1>
          <div className="mt-2 flex flex-col items-center gap-2">
            <Avatar
              size={110}
              src={previewUrl ?? profile.profileImageUrl}
              alt="프로필 사진 미리보기"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept={UPLOAD_IMAGE_ACCEPT}
              className="hidden"
              onChange={selectImage}
            />
            <Button
              variant="outline"
              size="small"
              onClick={() => fileInputRef.current?.click()}
            >
              프로필 사진 업로드
            </Button>
          </div>
        </ProfileForm>
      )}
    </PageShell>
  );
}
