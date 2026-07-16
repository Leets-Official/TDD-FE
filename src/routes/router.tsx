import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/layouts/RootLayout";
import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/login/LoginPage";
import SignupPage from "@/pages/signup/SignupPage";
import { PATH } from "@/routes/paths";
import { NotFoundPage } from "@/pages/notFound/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: PATH.HOME, element: <HomePage /> },
      { path: PATH.LOGIN, element: <LoginPage /> },
      { path: PATH.SIGNUP, element: <SignupPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
