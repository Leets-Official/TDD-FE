import { useNavigate } from "react-router";

import { useBoardPosts } from "@/api/board/query";
import { Fab } from "@/components/fab/Fab";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";
import { formatRelativeTime } from "@/utils/board/formatRelativeTime";

import { BoardEmptyState } from "./components/BoardEmptyState";
import { BoardListItem } from "./components/BoardListItem";
import { BoardListSkeleton } from "./components/BoardListSkeleton";

export default function BoardPage() {
  return (
    <PageShell header={<BackHeader title="게시판" />}>
      <BoardPageContent />
    </PageShell>
  );
}

function BoardPageContent() {
  const navigate = useNavigate();
  const { data: posts, isPending } = useBoardPosts();

  if (isPending) return <BoardListSkeleton />;

  if (!posts) return null;

  return (
    <>
      {posts.length === 0 ? (
        <BoardEmptyState onCreateClick={() => navigate(PATH.BOARD_CREATE)} />
      ) : (
        <>
          <ul className="flex flex-col">
            {posts.map((post) => (
              <li key={post.postId}>
                <BoardListItem
                  title={post.title}
                  content={post.content}
                  commentCount={post.commentCount}
                  timeLabel={formatRelativeTime(post.createdAt)}
                  nickname={post.authorNickname}
                  onClick={() =>
                    navigate(
                      PATH.BOARD_DETAIL.replace(":postId", String(post.postId))
                    )
                  }
                />
              </li>
            ))}
          </ul>

          <div className="pointer-events-none fixed inset-x-0 bottom-[calc(20px+env(safe-area-inset-bottom))] z-10 mx-auto flex max-w-107.5 justify-end px-l">
            <Fab
              label="글쓰기"
              onClick={() => navigate(PATH.BOARD_CREATE)}
              className="pointer-events-auto"
            />
          </div>
        </>
      )}
    </>
  );
}
