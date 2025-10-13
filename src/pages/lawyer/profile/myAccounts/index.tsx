/* eslint-disable @typescript-eslint/no-explicit-any */
import MyAccountHeader from "@/components/sections/lawyer/myaccountsettings/myaccountheader";
import MyAccountsCard from "@/components/sections/lawyer/myaccountsettings/myaccountscard";
import { useGetSubAccountsQuery } from "@/hooks/useSubAccounts";
import type { Key } from "react";

export default function MyAccountsettings() {
  const { data, isLoading, error } = useGetSubAccountsQuery({
    params: { limit: 20, page: 1 },
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="w-full h-full flex flex-col gap-[24px] pt-[50px]">
      <MyAccountHeader />
      <div className="w-full flex flex-col gap-[8px]">
        {data?.map((account: { id: Key | null | undefined; fullName: string; isActive: any; assignedCasesCount: any; OffersCount: any; }) => (
          <MyAccountsCard
            key={account.id}
            Image="https://placehold.co/48x48"
            Title={account.fullName}
            RoleUser={account.isActive ? "Active User" : "Inactive User"}
            CurrentCases={String(account.assignedCasesCount)}
            OffersSent={String(account.OffersCount)}
            ToLink={`/lawyer/settings/myaccountsettings/${account.id}/cases`}
          />
        ))}
      </div>
    </div>
  );
}
