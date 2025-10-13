import Loadable from "@/components/common/loadable";
import { lazy } from "react";
import { Navigate } from "react-router";

const ClientLayout = Loadable(lazy(() => import("@/layout/client")));

// Pages
const HomePage = Loadable(lazy(() => import("@/pages/client/home")));
const ProfileClient = Loadable(lazy(() => import("@/pages/client/profileClient")));
const CreateCasePage = Loadable(
  lazy(() => import("@/pages/client/createRequest")),
);
const CaseDetailsPage = Loadable(
  lazy(() => import("@/pages/client/caseDetails")),
);
// const EditCasePage = Loadable(lazy(() => import("@/pages/client/case/edit")));

// // Manage Cases (Tabs)
const ManageCasesLayout = Loadable(lazy(() => import("@/layout/manageCases")));
const RequestsPage = Loadable(lazy(() => import("@/pages/client/requests")));
const ActiveCasesPage = Loadable(
  lazy(() => import("@/pages/client/activeCases")),
);
const CompletedCasesPage = Loadable(
  lazy(() => import("@/pages/client/completedCases")),
);
const CancelledCasesPage = Loadable(
  lazy(() => import("@/pages/client/cancelledCases")),
);

const MessagesClient = Loadable(
  lazy(() => import("@/pages/client/messages/index")),
);
const ClientRoutes = {
  path: "/client",
  element: <ClientLayout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "cases",
      children: [
        // Create new case
        {
          path: "new/:status",
          element: <CreateCasePage />,
        },

        // Manage Cases (shared tabs)
        {
          path: "",
          element: <ManageCasesLayout />,
          children: [
            {
              index: true,
              element: <Navigate to="/client/cases/requests" replace />, // Or use <Navigate to="requests" />
            },
            {
              path: "requests",
              element: <RequestsPage />,
            },
            {
              path: "active",
              element: <ActiveCasesPage />,
            },
            {
              path: "completed",
              element: <CompletedCasesPage />,
            },
            {
              path: "cancelled",
              element: <CancelledCasesPage />,
            },
          ],
        },

        // Case details and edit (dynamic)
        {
          path: ":caseId",
          children: [
            {
              index: true,
              element: <CaseDetailsPage />,
            },
            // {
            //   path: "edit",
            //   element: <EditCasePage />,
            // },
          ],
        },
      ],
    }, {
      path: "profile",
      children: [
        // Create new case
        {
          path: "settings",
          element: <ProfileClient />,
        },
      ]
    },
    {
      path: "messages",
      element: <MessagesClient />,
    },
  ],
};

export default ClientRoutes;
