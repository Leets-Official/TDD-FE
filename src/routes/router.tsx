import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/layouts/RootLayout";
import HomePage from "@/pages/home/HomePage";
import OnboardingPage from "@/pages/onboarding/OnboardingPage";
import LoginPage from "@/pages/login/LoginPage";
import DormitoryVerificationPage from "@/pages/mypage/dormitory/DormitoryVerificationPage";
import SignupPage from "@/pages/signup/SignupPage";
import OrderDetailPage from "@/pages/order/detail/OrderDetailPage";
import PasswordResetPage from "@/pages/passwordReset/PasswordResetPage";
import ReviewPage from "@/pages/order/review/ReviewPage";
import ChatPage from "@/pages/order/chat/ChatPage";
import { PATH } from "@/routes/paths";
import { NotFoundPage } from "@/pages/notFound/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: PATH.HOME, element: <HomePage /> },
      { path: PATH.ONBOARDING, element: <OnboardingPage /> },
      { path: PATH.LOGIN, element: <LoginPage /> },
      { path: PATH.SIGNUP, element: <SignupPage /> },
      { path: PATH.PASSWORD_RESET, element: <PasswordResetPage /> },
      { path: PATH.MYPAGE_DORMITORY, element: <DormitoryVerificationPage /> },
      { path: PATH.ORDER_CHAT, element: <ChatPage /> },
      { path: PATH.ORDER_DETAIL, element: <OrderDetailPage /> },
      { path: PATH.ORDER_REVIEW, element: <ReviewPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
