import Container from "@/components/ui/container";
import { useGetCasesCountQuery } from "@/hooks/useCaseQueries";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router";

const tabs = [
  { to: "/client/cases/requests", label: "requests" },
  { to: "/client/cases/active", label: "active" },
  { to: "/client/cases/completed", label: "completed" },
  { to: "/client/cases/cancelled", label: "cancelled" },
];

export default function ManageCasesLayout() {
  const { t } = useTranslation("manageCases");

  const { data } = useGetCasesCountQuery();

  const tabsNav = tabs.map((tab) => {
    let count: number | undefined;

    if (data) {
      switch (tab.label) {
        case "requests":
          count = data.PENDING;
          break;
        case "active":
          count = data.ACTIVE;
          break;
        case "completed":
          count = data.COMPLETED;
          break;
        case "cancelled":
          count = data.CANCELED;
          break;
        default:
          break;
      }
    }

    return (
      <li key={tab.to} className="flex flex-1 items-center text-center">
        <NavLink
          to={tab.to}
          end
          className={({ isActive }) =>
            cn(
              "w-full py-4 text-center text-sm font-medium transition-colors",
              isActive
                ? "text-primary border-primary border-b-2"
                : "text-muted-foreground hover:text-foreground",
            )
          }
        >
          <span className="flex flex-col items-center justify-center gap-1 sm:flex-row">
            <span>{t(`tabs.${tab.label}`)}</span>
            {count !== undefined && <span>({count})</span>}
          </span>
        </NavLink>
      </li>
    );
  });

  return (
    <>
      <title>{`Dr-Lawyer | ${t("title")}`}</title>
      <Container className="my-6 flex grow flex-col gap-6">
        <h2 className="text-2xl font-bold">{t("heading")}</h2>

        {/* Tab Navigation */}
        <ul className="divide-border flex flex-wrap items-center divide-x-2 overflow-hidden rounded-xl bg-white">
          {tabsNav}
        </ul>

        <div className="grow rounded-xl bg-white p-4">
          <Outlet />
        </div>
      </Container>
    </>
  );
}
