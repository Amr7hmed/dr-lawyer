
import { Outlet } from "react-router";
import Sidebar from "@/components/sections/lawyer/sidebarMenu";
import Header from "@/components/sections/lawyer/header";
import AuthGuard from "@/routes/routeGuard/authGuard";

export default function LawyerLayout() {
  return (
    <AuthGuard requireRole="lawyer">
      <div className="flex w-full  [background:#F1F4FB] h-full">
        <aside className="hidden md:flex w-90 bg-white  shrink-0  shadow-[10px_10px_50px_0_rgba(100,116,139,0.04)] h-[100vh]">
          <Sidebar />
        </aside>
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
/*
import { Outlet } from "react-router";
import Sidebar from "@/components/sections/lawyer/sidebarMenu";
import Header from "@/components/sections/lawyer/header";
import AuthGuard from "@/routes/routeGuard/authGuard";

export default function LawyerLayout() {
  return (
    <AuthGuard requireRole="lawyer">
      <div className="flex w-full  [background:#F1F4FB] h-full">
        <aside className="hidden md:flex w-90 bg-white  shrink-0  shadow-[10px_10px_50px_0_rgba(100,116,139,0.04)] h-[100vh]">
          <Sidebar />
        </aside>
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
*/
