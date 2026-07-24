import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { ChatInput } from "@/components/chatInput/ChatInput";
import { PageHeader } from "@/components/header/PageHeader";
import { PageShell } from "@/layouts/PageShell";

import { boardPosts } from "../board.mock";
import { BoardCommentItem } from "./components/BoardCommentItem";
import { BoardPostSection } from "./components/BoardPostSection";
import { useBoardComments } from "./hooks/useBoardComments";

export default function BoardDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageValue, setMessageValue] = useState("");

  const post = boardPosts.find((item) => item.id === postId)!;
  const { comments, replyTargetId, handleReplyClick, handleSend } =
    useBoardComments(postId);

  // 답글 달기 버튼 클릭 시 실행 함수 - 답글 대상으로 새로 선택될 때만 입력창 포커스
  function handleReply(commentId: string) {
    const willFocus = replyTargetId !== commentId;
    handleReplyClick(commentId);
    if (willFocus) {
      inputRef.current?.focus();
    }
  }

  function handleSendMessage(value: string) {
    handleSend(value);
    setMessageValue("");
  }

  return (
    <>
      <PageShell
        header={<PageHeader title="게시판" onBack={() => navigate(-1)} />}
      >
        <BoardPostSection
          title={post.title}
          content={post.content}
          commentCount={comments.length}
          nickname={post.nickname}
          timeLabel={post.timeLabel}
        />

        <div className="flex w-full flex-col">
          {comments.map((comment) => (
            <BoardCommentItem
              key={comment.commentId}
              nickname={comment.nickname}
              content={comment.content}
              timeLabel={comment.timeLabel}
              replies={comment.replies}
              isHighlighted={replyTargetId === comment.commentId}
              onReplyClick={() => handleReply(comment.commentId)}
            />
          ))}
        </div>
      </PageShell>
      <ChatInput
        ref={inputRef}
        value={messageValue}
        onChange={(event) => setMessageValue(event.target.value)}
        onSend={handleSendMessage}
        showImageUpload={false}
        placeholder="메시지 입력"
      />
    </>
  );
}
