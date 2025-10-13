import AppliedOffersCard from "@/components/sections/lawyer/myaccountsettings/appliedOffersCard";
import CurrentCasesCard from "@/components/sections/lawyer/myaccountsettings/currentCasesCard";
import MyAccountscardHeader from "@/components/sections/lawyer/myaccountsettings/myaccountscardheader";
import { useState } from "react";
import { useParams } from "react-router";
import { useGetSubAccountDataQuery } from "@/hooks/useSubAccounts";
import type { SubAccountCasesResponse, SubAccountOffersResponse } from "@/services/subAccountService";
import ProfileHeader from "@/components/sections/lawyer/myaccountsettings/profileheader";

const MyAccountsettingsDetails = () => {
  const { id, status } = useParams();
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "PENDING" | "COMPLETED" | "CANCELED">("ACTIVE");


// cases query
const {
  data: casesData,
  isLoading: casesLoading,
  error: casesError,
} = useGetSubAccountDataQuery<SubAccountCasesResponse>(id!, "cases", {
  params: { status: activeTab },
  options: {
    enabled: status === "cases", 
  },
});

// offers query
const {
  data: offersData,
  isLoading: offersLoading,
  error: offersError,
} = useGetSubAccountDataQuery<SubAccountOffersResponse>(id!, "offers", {
  options: {
    enabled: status === "offers",
  },
});

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <ProfileHeader />
      <div className="w-full h-full relative bg-white rounded-2xl overflow-hidden p-[30px] flex flex-col gap-[17px]">
        <MyAccountscardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {status === "cases" ? (
            casesLoading ? (
              <p>Loading cases...</p>
            ) : casesError ? (
              <p>Error loading cases</p>
            ) : (
              casesData?.data.map((c) => <CurrentCasesCard key={c.id} caseItem={c} />)
            )
          ) : offersLoading ? (
            <p>Loading offers...</p>
          ) : offersError ? (
            <p>Error loading offers</p>
          ) : (
            offersData?.data.map((o) => <AppliedOffersCard key={o.id} offerItem={o} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccountsettingsDetails;
