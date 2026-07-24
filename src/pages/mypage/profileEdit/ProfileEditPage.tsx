import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/avatar/Avatar";
import { Button } from "@/components/button/Button";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";
import { ProfileForm } from "@/pages/signup/components/ProfileForm";
import { mockMyPageSuspended } from "@/pages/mypage/MyPage.mock";
import type { ProfileFormValues } from "@/schemas/auth";
import { useNavigate } from "react-router";

const PROFILE_EDIT_FORM_ID = "profile-edit-form";

export function ProfileEditPage() {
  const navigate = useNavigate();
  // TODO: 프로필 조회 API 연동 (mock 대체)
  const profile = mockMyPageSuspended;
  const [isValid, setIsValid] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    event.target.value = "";
    if (!selected) return;

    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const url = URL.createObjectURL(selected);
    previewUrlRef.current = url;
    setImageFile(selected);
    setPreviewUrl(url);
  };

  const handleSubmit = (_values: ProfileFormValues) => {
    // TODO: 프로필 수정 API 연동 (_values + imageFile)
    void imageFile;
    navigate(-1);
  };

  return (
    <PageShell
      header={<BackHeader title="프로필 수정" />}
      bottom={
        <Button
          type="submit"
          form={PROFILE_EDIT_FORM_ID}
          className="w-full"
          disabled={!isValid}
        >
          수정 완료
        </Button>
      }
    >
      <ProfileForm
        formId={PROFILE_EDIT_FORM_ID}
        isEdit
        defaultValues={{
          nickname: profile.nickname,
          dormitory: profile.dormitory,
        }}
        onSubmit={handleSubmit}
        onValidityChange={setIsValid}
      >
        <h1 className="text-title-1">프로필 수정</h1>
        <div className="mt-2 flex flex-col items-center gap-2">
          <Avatar
            size={110}
            src={previewUrl ?? profile.profileImageUrl ?? undefined}
            alt="프로필 사진 미리보기"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
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
    </PageShell>
  );
}
