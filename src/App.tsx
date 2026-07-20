import { RouterProvider } from "react-router/dom";

import { GlobalModal } from "@/components/modal/GlobalModal";
import { router } from "@/routes/router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalModal />
    </>
  );
}

export default App;
