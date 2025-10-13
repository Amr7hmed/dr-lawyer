import Header from "@/components/sections/client/header/header";
import AuthGuard from "@/routes/routeGuard/authGuard";
import { Outlet } from "react-router";

export default function LawyerLayout() {
  return (
    <AuthGuard requireRole="client">
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <main className="bg-accent flex w-full flex-1 flex-grow flex-col">
          <Outlet />
        </main>
      </div>
    </AuthGuard>
  );
}
