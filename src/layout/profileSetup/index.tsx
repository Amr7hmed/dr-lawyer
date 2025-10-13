import { Outlet } from "react-router";

import AuthWrapper from "@/components/sections/auth/authWrapper";

// ==============================|| LAYOUT - AUTH ||============================== //

export default function ProfileSetupLayout() {
  return (
    <AuthWrapper className="max-w-md">
      <Outlet />
    </AuthWrapper>
  );
}
