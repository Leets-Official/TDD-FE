import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router/dom";

import { queryClient } from "@/api/queryClient";
import { GlobalModal } from "@/components/modal/GlobalModal";
import { GlobalToast } from "@/components/toast/GlobalToast";
import { router } from "@/routes/router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <GlobalModal />
      <GlobalToast />
    </QueryClientProvider>
  );
}

export default App;
