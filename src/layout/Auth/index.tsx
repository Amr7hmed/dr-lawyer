import GuestGuard from "@/routes/routeGuard/guestGuard";
import { Outlet } from "react-router";

import AuthWrapper from "@/components/sections/auth/authWrapper";

// ==============================|| LAYOUT - AUTH ||============================== //

export default function AuthLayout() {
  return (
    <GuestGuard>
      <AuthWrapper>
        <Outlet />
      </AuthWrapper>
    </GuestGuard>
  );
}
