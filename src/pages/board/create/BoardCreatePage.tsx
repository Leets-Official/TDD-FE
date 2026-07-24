import { useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/button/Button";
import { PageHeader } from "@/components/header/PageHeader";
import { TextField } from "@/components/textField/TextField";
import { Textarea } from "@/components/textarea/Textarea";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";

import { boardPosts } from "../board.mock";

export default function BoardCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  function handleSubmit() {
    if (!isValid) return;

    // TODO: 게시글 작성 API 연동 때 응답값 postId를 사용
    const postId = `post-${Date.now()}`;
    boardPosts.push({
      id: postId,
      title,
      content,
      commentCount: 0,
      timeLabel: "방금 전",
      nickname: "나",
    });
    navigate(PATH.BOARD_DETAIL.replace(":postId", postId));
  }

  return (
    <PageShell
      header={
        <PageHeader
          title="글쓰기"
          onBack={() => navigate(-1)}
          rightElement={
            <Button size="small" disabled={!isValid} onClick={handleSubmit}>
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
