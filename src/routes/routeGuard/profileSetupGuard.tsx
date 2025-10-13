import React, { type ReactNode } from "react";
import { Navigate } from "react-router";

import Loader from "@/components/common/loader";
import { useAuthStore } from "@/store/authStore";
import { useShallow } from "zustand/shallow";

interface AuthGuardProps {
  children: ReactNode;
}

const ProfileSetupGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, hasRole, isLoading, user } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      hasRole: state.hasRole,
      user: state.user,
      isLoading: state.isLoading,
    })),
  );

  const isClient = hasRole("client");
  const isLawyer = hasRole("lawyer");

  const withRole = hasRole("client") || hasRole("lawyer");

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (withRole && user) {
    if (user.status === "COMPLETED") {
      if (isClient) {
        return <Navigate to="/client" replace />;
      }

      if (isLawyer) {
        return <Navigate to="/lawyer/dashboard" replace />;
      }
    } else if (user.status === "UNDER_REVIEW") {
      return (
        <Navigate
          to="/profile-setup/status"
          replace
          state={{ status: "UNDER_REVIEW" }}
        />
      );
    }
  }

  return <>{children}</>;
};

export default ProfileSetupGuard;
