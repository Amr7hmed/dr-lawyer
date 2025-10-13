import type { DashboardData } from "@/services/dashboardService";

const RevenueSection = ({ dashboard }: { dashboard: DashboardData }) => (
  <div className="w-full px-4 py-4 bg-white rounded-2xl flex flex-col gap-2.5">
    <h3 className="text-neutral-800 text-xl font-bold mb-[16px]">Revenue</h3>
    <div className="w-full h-[1px] bg-[#D3DAEA]"/>
    <div className="flex flex-col gap-[12px] mt-[10px]">
      <div className="flex justify-between">
        <div>Total Earnings</div>
        <div>{dashboard.revenue.totalEarnings} $</div>
      </div>
      <div className="w-full h-[1px] bg-[#D3DAEA]"/>
      <div className="flex justify-between">
        <div>Active Cases</div>
        <div>{dashboard.revenue.activeCasesEarnings} $</div>
      </div>
    </div>
  </div>
);

export default RevenueSection