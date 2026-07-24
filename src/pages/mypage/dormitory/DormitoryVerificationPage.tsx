import { useRef, useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/button/Button";
import { BackHeader } from "@/layouts/BackHeader";
import { useSubmitDormVerification } from "@/hooks/useSubmitDormVerification";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";

import AddDocumentIcon from "@/assets/icons/AddDocumentIcon.svg?react";

import { FilePreviewCard } from "./components/FilePreviewCard";

export default function DormitoryVerificationPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const { mutate: submit, isPending: isSubmitting } =
    useSubmitDormVerification();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (selected) setFile(selected);
    event.target.value = "";
  }

  function handleSubmit() {
    if (!file) return;
    submit(file, { onSuccess: () => navigate(PATH.HOME) });
  }

  return (
    <PageShell
      header={<BackHeader title="기숙사 인증" />}
      bottom={
        <Button
          className="w-full"
          disabled={!file || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "제출 중..." : "완료"}
        </Button>
      }
    >
      <div className="flex flex-col gap-xxs px-xl pt-l">
        <div className="flex flex-col gap-xxl">
          <h1 className="text-title-1 text-text-1">
            기숙사 합격 메일 등록 영수증 첨부
          </h1>
          <p className="text-body-1 text-text-1">
            26년도 2학기 기숙사 합격 메일 등록 영수증을 캡처, 혹은 다운해서
            첨부해주세요
          </p>
        </div>
        <p className="text-body-2 whitespace-pre-line text-text-4">
          {
            "- 성명, 학번(또는 개인정보)이 보이도록 캡처\n- 기숙사명 및 합격/입사 여부가 명확히 보일 것\n\n첨부 후 확인이 완료되면 인증이 처리됩니다."
          }
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          variant="default"
          onClick={() => fileInputRef.current?.click()}
          className="w-fit"
        >
          <AddDocumentIcon className="size-5" aria-hidden="true" />
          파일 선택
        </Button>

        {file && <FilePreviewCard file={file} onRemove={() => setFile(null)} />}
      </div>
    </PageShell>
  );
}
