// src/pages/RootRedirector.jsx

import Loader from "@/components/common/loader";
import { useAuthStore } from "@/store/authStore";

import { Navigate } from "react-router";
import { useShallow } from "zustand/shallow";
// A custom hook to get auth status

const RootPage = () => {
  // This is a hypothetical custom hook that gives you user info.
  // It might return { isLoading: true } initially, then user data.
  const { isAuthenticated, hasRole, isLoading, user } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      hasRole: state.hasRole,
      isLoading: state.isLoading,
      user: state.user,
    })),
  );

  const isClient = hasRole("client");
  const isLawyer = hasRole("lawyer");

  if (isLoading) {
    return <Loader />;
  }

  // If the user is logged in, redirect them based on their role.
  if (isAuthenticated) {
    if (isLawyer && user?.status === "COMPLETED") {
      return <Navigate to="/lawyer/dashboard" replace />;
    } else if (isClient && user?.status === "COMPLETED") {
      return <Navigate to="/client" replace />;
    } else {
      return <Navigate to="/profile-setup" replace />;
    }
  }

  // If no one is logged in, redirect to the login page.
  return <Navigate to="/auth/login" replace />;
};

export default RootPage;
