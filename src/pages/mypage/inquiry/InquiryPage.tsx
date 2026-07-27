import { Button } from "@/components/button/Button";
import { BackHeader } from "@/layouts/BackHeader";
import { INQUIRY_CHAT_URL } from "@/constants/links";
import { PageShell } from "@/layouts/PageShell";
import qrImage from "@/assets/QR.png";

export function InquiryPage() {
  return (
    <PageShell header={<BackHeader title="문의하기" />}>
      <div className="flex w-full flex-col gap-6.5 px-5">
        <h1 className="text-title-2 text-black">운영자에게 문의하기</h1>
        <div className="flex flex-col items-center gap-4">
          <Button
            variant="outline"
            size="small"
            className="w-full"
            onClick={() =>
              window.open(INQUIRY_CHAT_URL, "_blank", "noopener,noreferrer")
            }
          >
            문의하기(채팅방 링크)
          </Button>
          <img
            className="size-[183px]"
            src={qrImage}
            alt="문의 채팅방 QR 코드"
          />
        </div>
      </div>
    </PageShell>
  );
}
