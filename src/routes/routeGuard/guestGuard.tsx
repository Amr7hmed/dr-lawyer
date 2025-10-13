import Loader from "@/components/common/loader";
import { useAuthStore } from "@/store/authStore";

import React, { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useShallow } from "zustand/shallow";

interface GuestGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

const GuestGuard: React.FC<GuestGuardProps> = ({ children, redirectTo }) => {
  const { isAuthenticated, isLoading, hasRole } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
      hasRole: state.hasRole,
    })),
  );

  const location = useLocation();

  const isClient = hasRole("client");
  const isLawyer = hasRole("lawyer");

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    // Redirect to intended destination or default
    const path =
      redirectTo ||
      location.state?.from ||
      (isClient
        ? "/client"
        : isLawyer
          ? "/lawyer/dashboard"
          : "/profile-setup");
    return <Navigate to={path} replace />;
  }

  return <>{children}</>;
};

export default GuestGuard;
