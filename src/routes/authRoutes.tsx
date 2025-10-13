import Loadable from "@/components/common/loadable";

import { lazy } from "react";
import { Navigate } from "react-router";

// project-imports

// render - login
const LoginPage = Loadable(lazy(() => import("@/pages/auth/login")));
const SignupPage = Loadable(lazy(() => import("@/pages/auth/signup")));
const AuthLayout = Loadable(lazy(() => import("@/layout/Auth")));
const ForgotPasswordPage = Loadable(
  lazy(() => import("@/pages/auth/forgotPassword")),
);

const OAuthCallbackPage = Loadable(lazy(() => import("@/pages/auth/callback")));

// ==============================|| AUTH ROUTES ||============================== //

const AuthRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="/auth/login" replace />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <SignupPage />,
    },
    {
      path: "forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      path: "callback",
      element: <OAuthCallbackPage />, // only if using OAuth redirect
    },
  ],
};

export default AuthRoutes;
