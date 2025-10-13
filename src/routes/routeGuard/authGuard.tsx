import React, { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

import Loader from "@/components/common/loader";
import { useAuthStore } from "@/store/authStore";
import { useShallow } from "zustand/shallow";

interface AuthGuardProps {
  children: ReactNode;
  requireRole?: "client" | "lawyer";

  fallback?: ReactNode;
  redirectTo?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireRole,

  fallback,
  redirectTo,
}) => {
  const { isAuthenticated, hasRole, isLoading, user } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      hasRole: state.hasRole,
      user: state.user,

      isLoading: state.isLoading,
    })),
  );
  const location = useLocation();

  const isClient = hasRole("client");
  const isLawyer = hasRole("lawyer");

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  if (user && user.status !== "COMPLETED") {
    return <Navigate to={"/profile-setup"} replace />;
  }

  if (requireRole && !hasRole(requireRole)) {
    return (
      fallback || (
        <Navigate
          to={
            redirectTo || isClient
              ? "/client"
              : isLawyer
                ? "/lawyer/dashboard"
                : "/profile-setup"
          }
          replace
        />
      )
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
