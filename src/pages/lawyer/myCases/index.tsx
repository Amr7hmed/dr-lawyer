import Spinner from "@/components/common/spinner";
import MyCasesCard from "@/components/sections/lawyer/mycases/myCasesCard";
import MyCasesTabs from "@/components/sections/lawyer/mycases/myCasesTabs";
import { useGetCasesQuery } from "@/hooks/useCaseQueries";
import type { CaseStatus } from "@/types/case";
import { useState } from "react";

export default function MyCases() {
  const [activeTab, setActiveTab] = useState<CaseStatus>("ACTIVE");

  const { data, isLoading } = useGetCasesQuery({
    filters: { status: activeTab },
    // my-cases
  });
  return (
    <>

      <div className="w-full flex gap-3 flex-col">
        <MyCasesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <br />
        {/* Active Cases */}
        <div className="w-full h-[100%]  bg-white rounded-2xl overflow-hidden py-[23px] px-[16px]">
          <div className="w-full h-full inline-flex flex-col justify-start items-start gap-4">
            <div className="justify-center text-neutral-800 text-xl font-bold font-['Manrope']">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).toLowerCase()} Cases
            </div>

            {isLoading && (
              <div className="flex h-full items-center justify-center w-full">
                <Spinner />
              </div>
            )}
            {(!data || data.length === 0) && !isLoading ? (
              <div className="flex justify-center items-center h-full w-full">
                <p className="text-slate-500 text-xl font-medium text-center">
                  No cases found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
                {data?.map((item) => (
                  <MyCasesCard
                    key={item.id} Item={item} />
                ))}
              </div>
            )}
          </div>


        </div>

      </div>
    </>
  );
}


