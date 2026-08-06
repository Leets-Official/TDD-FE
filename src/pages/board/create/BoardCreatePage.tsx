import { useState } from "react";
import { useNavigate } from "react-router";

import { useCreateBoardPost } from "@/api/board/query";
import { getApiErrorMessage } from "@/api/error";
import { Button } from "@/components/button/Button";
import { TextField } from "@/components/textField/TextField";
import { Textarea } from "@/components/textarea/Textarea";
import { BOARD_ERROR_MESSAGE } from "@/constants/errorMessage/board";
import { BOARD_TOAST_MESSAGE } from "@/constants/toastMessage";
import { useToast } from "@/hooks/useToast";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";

export default function BoardCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { mutate: createPost, isPending } = useCreateBoardPost();
  const { openToast } = useToast();

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  function handleSubmit() {
    if (!isValid) return;

    createPost(
      { title, content },
      {
        onSuccess: (postId) => {
          openToast({ message: BOARD_TOAST_MESSAGE.CREATE_SUCCESS });
          navigate(PATH.BOARD_DETAIL.replace(":postId", String(postId)), {
            replace: true,
          });
        },
        onError: (error) => {
          openToast({
            message: getApiErrorMessage(error, BOARD_ERROR_MESSAGE.CREATE),
          });
        },
      }
    );
  }

  return (
    <PageShell
      header={
        <BackHeader
          title="글쓰기"
          rightElement={
            <Button
              size="small"
              disabled={!isValid || isPending}
              onClick={handleSubmit}
            >
              완료
            </Button>
          }
        />
      }
    >
      <div className="flex h-full flex-col gap-5 px-5 pt-5.5">
        <TextField
          label="제목"
          placeholder="제목 입력"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Textarea
          label="내용"
          placeholder="내용 입력"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="h-69.25"
        />
      </div>
    </PageShell>
  );
}
