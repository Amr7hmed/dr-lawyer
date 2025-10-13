import { lazy } from "react";
import ProfileSetupGuard from "./routeGuard/profileSetupGuard";
import Loadable from "@/components/common/loadable";

const ProfileSetupLayout = Loadable(
  lazy(() => import("@/layout/profileSetup")),
);
const ProfileSetupPage = Loadable(
  lazy(() => import("@/pages/auth/profileSetup")),
);
const ProfileStatus = Loadable(
  lazy(() => import("@/pages/auth/profileStatus")),
);

const ProfileSetupRoutes = {
  path: "/profile-setup",
  element: <ProfileSetupLayout />,

  children: [
    {
      index: true,
      element: (
        <ProfileSetupGuard>
          <ProfileSetupPage />
        </ProfileSetupGuard>
      ),
    },
    {
      path: "status",
      element: <ProfileStatus />,
    },
  ],
};

export default ProfileSetupRoutes;
