import { RouterProvider } from "react-router/dom";

import { GlobalModal } from "@/components/modal/GlobalModal";
import { GlobalToast } from "@/components/toast/GlobalToast";
import { router } from "@/routes/router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalModal />
      <GlobalToast />
    </>
  );
}

export default App;
