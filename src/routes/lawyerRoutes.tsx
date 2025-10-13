import ProfileLawyer from "@/pages/lawyer/profile/profileLawyer";
import ProfileEdit from "@/pages/lawyer/profile/ProfileEdit";
import ProfileLawyerAbout from "@/pages/lawyer/profile/profileLawyerAbout";
import ProfileLawyerHelpAndSupport from "@/pages/lawyer/profile/profileLawyerHelpAndSupport";
import ProfileLawyerContactSupport from "@/pages/lawyer/profile/ProfileLawyerContactSupport";
import ProfileLawyerNotificationSettings from "@/pages/lawyer/profile/profileNotificationSettings";

import { lazy } from "react";
import { Navigate } from "react-router";

const LawyerLayout = lazy(() => import("@/layout/lawyer"));
const DashboardPage = lazy(() => import("@/pages/lawyer/dashboard"));
// get all Cases
const MostRecentPage = lazy(() => import("@/pages/lawyer/browsecases/mostRecent/index"));
const BestMatchesPage = lazy(() => import("@/pages/lawyer/browsecases/bestMatches/index"));
const FavouritePage = lazy(() => import("@/pages/lawyer/browsecases/favourite/index"));
const CaseDetails = lazy(() => import("@/pages/lawyer/browsecases/[id]"));
const MyCases = lazy(() => import("@/pages/lawyer/myCases"));
const MyCaseDetails = lazy(() => import("@/pages/lawyer/myCases/[id]/myCasesDetails"));
const MyAccountsettings = lazy(() => import("@/pages/lawyer/profile/myAccounts/index"));
const MyAccountsettingsDetails = lazy(() => import("@/pages/lawyer/profile/myAccounts/[id]/index"));
const CreateUserForm = lazy(() => import("@/pages/lawyer/profile/myAccounts/createUserForm"));
const EditeUserForm = lazy(() => import("@/pages/lawyer/profile/myAccounts/[id]/editeUserForm"));


const MessagesLawyer = lazy(() => import("@/pages/lawyer/messages"));

const LawyerRoutes = {
  path: "/lawyer",
  element: <LawyerLayout />,

  children: [
    {
      index: true,
      element: <Navigate to="/lawyer/dashboard" replace />,
    },
    {
      path: "dashboard",
      element: <DashboardPage />,
    },
    {
      path: "browse-cases",
      children: [
        {
          path: "most-recent",
          element: <MostRecentPage />,
        },
        {
          path: "best-matches",
          element: <BestMatchesPage />,
        },
        {
          path: "favourite",
          element: <FavouritePage />,
        },
        {
          path: ":id",
          element: <CaseDetails />,
        },
      ],
    },
    {
      path: "my-cases",
      children: [
        {
          path: "all",
          element: <MyCases />,
        },
        {
          path: ":id",
          element: <MyCaseDetails />,
        },
      ],
    },
    {
      path: "settings",
      children: [
        {
          path: "profile",
          element: <ProfileLawyer />,
        },
        {
          path: "aboutus",
          element: <ProfileLawyerAbout />,
        },
        {
          path: "edit",
          element: <ProfileEdit />,
        },
        {
          path: "helpandsupport",
          element: <ProfileLawyerHelpAndSupport />,
        },
        {
          path: "contactsupport",
          element: <ProfileLawyerContactSupport />,
        },
        {
          path: "notification",
          element: <ProfileLawyerNotificationSettings />,
        },
        {
          path: "myaccountsettings",
          element: <MyAccountsettings />,
        },
        {
          path: "myaccountsettings/:id/:status",
          element: <MyAccountsettingsDetails />,
        },
        {
          path: "createuserform",
          element: <CreateUserForm />,
        },{
          path: "editeuserform/:id",
          element: <EditeUserForm />,
        }

      ],
    },
    {
      path: "messages",
      element: <MessagesLawyer />,
    },
  ],
};

export default LawyerRoutes;
