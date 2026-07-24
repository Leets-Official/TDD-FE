import { useRef, useState } from "react";
import { useParams } from "react-router";

import { ChatInput } from "@/components/chatInput/ChatInput";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";
import { formatRelativeTime } from "@/utils/board/formatRelativeTime";

import { getBoardPostDetail } from "./boardDetail.mock";
import { BoardCommentItem } from "./components/BoardCommentItem";
import { BoardPostSection } from "./components/BoardPostSection";
import { useBoardComments } from "./hooks/useBoardComments";

export default function BoardDetailPage() {
  const { postId } = useParams();

  // postId가 바뀌면 새 게시글로 완전히 리마운트되어 댓글/답글 대상 상태가 초기화되도록 key 사용
  return <BoardDetailPageContent key={postId} postId={postId} />;
}

function BoardDetailPageContent({ postId }: { postId: string | undefined }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageValue, setMessageValue] = useState("");

  const post = getBoardPostDetail(postId ?? "")!;
  const {
    comments,
    topLevelComments,
    getReplies,
    replyTargetId,
    handleReplyClick,
    handleSend,
  } = useBoardComments(postId);

  // 답글 달기 버튼 클릭 시 실행 함수
  function handleReply(commentId: number) {
    const willFocus = replyTargetId !== commentId;
    handleReplyClick(commentId);
    if (willFocus) {
      inputRef.current?.focus();
    }
  }

  // 메시지 전송 시 실행 함수
  function handleSendMessage(value: string) {
    handleSend(value);
    setMessageValue("");
  }

  return (
    <>
      <PageShell header={<BackHeader title="게시판" />}>
        <BoardPostSection
          title={post.title}
          content={post.content}
          commentCount={comments.length}
          nickname={post.authorNickname}
          timeLabel={formatRelativeTime(post.createdAt)}
        />

        <div className="flex w-full flex-col">
          {topLevelComments.map((comment) => (
            <BoardCommentItem
              key={comment.commentId}
              nickname={comment.authorNickname}
              content={comment.content}
              timeLabel={formatRelativeTime(comment.createdAt)}
              replies={getReplies(comment.commentId).map((reply) => ({
                commentId: reply.commentId,
                nickname: reply.authorNickname,
                content: reply.content,
                timeLabel: formatRelativeTime(reply.createdAt),
              }))}
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
