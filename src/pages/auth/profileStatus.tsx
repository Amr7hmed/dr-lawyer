import Loader from "@/components/common/loader";
import ProfileUnderReview from "@/components/sections/auth/completeProfile/profileUnderReview";
import Rejected from "@/components/sections/auth/completeProfile/profileRejected";
import Success from "@/components/sections/auth/completeProfile/profileSuccess";
import { useAuthStore } from "@/store/authStore";
import type { UserStatus } from "@/types/auth";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation } from "react-router";
import { useShallow } from "zustand/shallow";

const ProfileStatus = () => {
  const location = useLocation();
  const status = location.state.status as UserStatus | undefined;

  const { isAuthenticated, isLoading } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
    })),
  );

  const { t } = useTranslation("profileStatus");

  if (isLoading) {
    return (
      <>
        <title>{`Dr-Lawyer | ${t("title")}`}</title>
        <Loader />;
      </>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (status) {
    if (status === "UNDER_REVIEW") {
      return (
        <>
          <title>`Dr-Lawyer | ${t("title")}`</title>
          <ProfileUnderReview />;
        </>
      );
    }
    if (status === "REJECTED") {
      return (
        <>
          <title>`Dr-Lawyer | ${t("title")}`</title>
          <Rejected />
        </>
      );
    }
    if (status === "COMPLETED") {
      return (
        <>
          <title>`Dr-Lawyer | ${t("title")}`</title>
          <Success />;
        </>
      );
    }
  }
  return <Navigate to="/" replace />;
};

export default ProfileStatus;
