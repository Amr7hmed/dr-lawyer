import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthLogout = () => {
      // Then navigate using React Router
      navigate("/auth/login", { replace: true });
    };

    window.addEventListener("auth:logout", handleAuthLogout);

    return () => {
      window.removeEventListener("auth:logout", handleAuthLogout);
    };
  }, [navigate]);
  return (
    <>
      <Outlet />
      <Toaster richColors closeButton />
    </>
  );
};

export default RootLayout;
