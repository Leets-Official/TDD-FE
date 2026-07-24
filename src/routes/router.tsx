import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/layouts/RootLayout";
import HomePage from "@/pages/home/HomePage";
import OnboardingPage from "@/pages/onboarding/OnboardingPage";
import LoginPage from "@/pages/login/LoginPage";
import { MyPage } from "@/pages/mypage/MyPage";
import DormitoryVerificationPage from "@/pages/mypage/dormitory/DormitoryVerificationPage";
import SignupPage from "@/pages/signup/SignupPage";
import OrderDetailPage from "@/pages/order/detail/OrderDetailPage";
import PasswordResetPage from "@/pages/passwordReset/PasswordResetPage";
import ReviewPage from "@/pages/order/review/ReviewPage";
import ChatPage from "@/pages/order/chat/ChatPage";
import { PATH } from "@/routes/paths";
import { NotFoundPage } from "@/pages/notFound/NotFoundPage";
import { SettingsPage } from "@/pages/mypage/settings/SettingsPage";
import { InquiryPage } from "@/pages/mypage/inquiry/InquiryPage";
import { ProfileEditPage } from "@/pages/mypage/profileEdit/ProfileEditPage";
import { AccountManagementPage } from "@/pages/mypage/account/AccountManagementPage";
import { NotificationPage } from "@/pages/mypage/notifications/NotificationPage";
import { PasswordChangePage } from "@/pages/mypage/password/PasswordChangePage";
import { WithdrawPage } from "@/pages/mypage/withdraw/WithdrawPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: PATH.HOME, element: <HomePage /> },
      { path: PATH.ONBOARDING, element: <OnboardingPage /> },
      { path: PATH.LOGIN, element: <LoginPage /> },
      { path: PATH.SIGNUP, element: <SignupPage /> },
      { path: PATH.PASSWORD_RESET, element: <PasswordResetPage /> },
      { path: PATH.MYPAGE, element: <MyPage /> },
      { path: PATH.MYPAGE_DORMITORY, element: <DormitoryVerificationPage /> },
      { path: PATH.ORDER_CHAT, element: <ChatPage /> },
      { path: PATH.MYPAGE_SETTINGS, element: <SettingsPage /> },
      { path: PATH.MYPAGE_INQUIRY, element: <InquiryPage /> },
      { path: PATH.MYPAGE_PROFILE_EDIT, element: <ProfileEditPage /> },
      { path: PATH.MYPAGE_ACCOUNT, element: <AccountManagementPage /> },
      { path: PATH.MYPAGE_NOTIFICATIONS, element: <NotificationPage /> },
      { path: PATH.MYPAGE_PASSWORD, element: <PasswordChangePage /> },
      { path: PATH.MYPAGE_WITHDRAW, element: <WithdrawPage /> },
      { path: PATH.ORDER_DETAIL, element: <OrderDetailPage /> },
      { path: PATH.ORDER_REVIEW, element: <ReviewPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
