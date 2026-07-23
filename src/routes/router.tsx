import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/layouts/RootLayout";
import HomePage from "@/pages/home/HomePage";
import OnboardingPage from "@/pages/onboarding/OnboardingPage";
import LoginPage from "@/pages/login/LoginPage";
import { Mypage } from "@/pages/mypage/Mypage";
import DormitoryVerificationPage from "@/pages/mypage/dormitory/DormitoryVerificationPage";
import SignupPage from "@/pages/signup/SignupPage";
import OrderDetailPage from "@/pages/order/detail/OrderDetailPage";
import PasswordResetPage from "@/pages/passwordReset/PasswordResetPage";
import ReviewPage from "@/pages/order/review/ReviewPage";
import ChatPage from "@/pages/order/chat/ChatPage";
import BoardPage from "@/pages/board/BoardPage";
import BoardDetailPage from "@/pages/board/detail/BoardDetailPage";
import BoardCreatePage from "@/pages/board/create/BoardCreatePage";
import { PATH } from "@/routes/paths";
import { NotFoundPage } from "@/pages/notFound/NotFoundPage";
import { SettingsPage } from "@/pages/mypage/settings/SettingsPage";
import { InquiryPage } from "@/pages/mypage/inquiry/InquiryPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: PATH.HOME, element: <HomePage /> },
      { path: PATH.ONBOARDING, element: <OnboardingPage /> },
      { path: PATH.LOGIN, element: <LoginPage /> },
      { path: PATH.SIGNUP, element: <SignupPage /> },
      { path: PATH.PASSWORD_RESET, element: <PasswordResetPage /> },
      { path: PATH.MYPAGE, element: <Mypage /> },
      { path: PATH.MYPAGE_DORMITORY, element: <DormitoryVerificationPage /> },
      { path: PATH.ORDER_CHAT, element: <ChatPage /> },
      { path: PATH.MYPAGE_SETTINGS, element: <SettingsPage /> },
      { path: PATH.MYPAGE_INQUIRY, element: <InquiryPage /> },
      { path: PATH.ORDER_DETAIL, element: <OrderDetailPage /> },
      { path: PATH.ORDER_REVIEW, element: <ReviewPage /> },
      { path: PATH.BOARD, element: <BoardPage /> },
      { path: PATH.BOARD_DETAIL, element: <BoardDetailPage /> },
      { path: PATH.BOARD_CREATE, element: <BoardCreatePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
