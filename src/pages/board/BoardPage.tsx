import { useNavigate } from "react-router";

import { Fab } from "@/components/fab/Fab";
import { PageHeader } from "@/components/header/PageHeader";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";

import { boardPosts } from "./board.mock";
import { BoardListItem } from "./components/BoardListItem";

export default function BoardPage() {
  const navigate = useNavigate();

  return (
    <PageShell
      header={<PageHeader title="게시판" onBack={() => navigate(-1)} />}
    >
      <ul className="flex flex-col">
        {boardPosts.map((post) => (
          <li key={post.id}>
            <BoardListItem
              {...post}
              onClick={() =>
                navigate(PATH.BOARD_DETAIL.replace(":postId", post.id))
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
    </PageShell>
  );
}
