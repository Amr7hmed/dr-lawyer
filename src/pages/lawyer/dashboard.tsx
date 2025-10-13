import { HeroSection } from "@/components/sections/lawyer/dashboard/hero-section";
import MessagesSection from "@/components/sections/lawyer/dashboard/messages-section";
import RecentCasesSection from "@/components/sections/lawyer/dashboard/recentcases-section";
import RevenueSection from "@/components/sections/lawyer/dashboard/revenue-section";
import SummarySection from "@/components/sections/lawyer/dashboard/summary-section";
import { useGetHomeDashboardQuery } from "@/hooks/useDashboard";


const DashboardPage = () => {
  const { data, isLoading, error } = useGetHomeDashboardQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <title>Dr-Lawyer | Dashboard</title>
      <div className="w-full flex flex-col gap-[15px] h-full">
        <HeroSection dashboard={data!} />
        <div className="w-full flex gap-[12px] items-start">
          <div className="flex flex-col gap-[15px] flex-1">
            
            <SummarySection dashboard={data!} />
            <RecentCasesSection />
          </div>
          <div className="w-120 flex flex-col gap-[15px] h-[100%]">
            <RevenueSection dashboard={data!} />
            <MessagesSection />
          </div>
        </div>
      </div>
    </>
  );
};


export default DashboardPage;
