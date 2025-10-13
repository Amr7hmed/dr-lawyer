import RootLayout from "@/layout";
import RootPage from "@/pages";
import { createBrowserRouter } from "react-router";
import AuthRoutes from "./authRoutes";
import ClientRoutes from "./clientRoutes";
import LawyerRoutes from "./lawyerRoutes";
import ProfileSetupRoutes from "./profileSetup";

// project-imports

// ==============================|| ROUTES RENDER ||============================== //

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <RootPage />,
      },
      ProfileSetupRoutes,
      AuthRoutes,
      LawyerRoutes,
      ClientRoutes,
    ],
  },
]);

export default router;
