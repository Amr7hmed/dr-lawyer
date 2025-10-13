import CoverDashboard from "@/assets/cover-dashboard.png";
import {
  IconStar,
  IconUneStar,
  IconHalfStar,
  IconClicks,
  IconPerformance
} from "@/assets/icons/index";
import type { DashboardData } from "@/services/dashboardService";

export function HeroSection({ dashboard }: { dashboard: DashboardData }) {
  


  return (
    <section className="relative  h-48 w-full overflow-hidden  bg-red-900 rounded-xl py-[10px] px-[30px] flex justify-between items-center gap-5">

      <div className="flex flex-col justify-start items-start gap-[38px] h-full py-[30px]">
        <div className="flex justify-start items-center gap-2">
          <h3 className="justify-center text-white text-3xl font-extrabold font-['Manrope']">Welcome Back!</h3>
          <p className="justify-center text-white text-3xl font-normal font-['Manrope']">{dashboard.name}</p>


          <div className="w-32 h-6 px-3 py-2.5 bg-rose-100 rounded-md inline-flex justify-start items-center gap-2.5">
            <div className="flex justify-start items-center gap-1">
              <IconStar />
              <IconStar />
              <IconStar />
              <IconHalfStar />
              <IconUneStar />

            </div>
            <div className="justify-start text-neutral-800 text-sm font-semibold font-['Manrope'] leading-tight">{dashboard.ratingValue}</div>
          </div>
        </div>


        <div className="flex justify-start items-center gap-[28px]">
          <div className="flex items-center gap-[18px]">

            <div className="flex justify-start items-center gap-[8px]">
              <IconClicks/>
              <p className="justify-center text-white text-base font-medium font-['Manrope']">Clicks</p>
            </div>
            <span className="text-right justify-center text-white text-xl font-bold font-['Manrope']">{dashboard.clicks}</span>
          </div>
{/*
          <div className="w-[1px] h-[20px]  bg-[#D3DAEA]"/>

          <div className="flex items-center gap-[18px]">

            <div className="flex justify-start items-center gap-[8px]">
              <IconImpressions/>
              <p className="justify-center text-white text-base font-medium font-['Manrope']">Impressions</p>
            </div>
            <span className="text-right justify-center text-white text-xl font-bold font-['Manrope']">27</span>
          </div>
              */}

          <div className="w-[1px] h-[20px]   bg-[#D3DAEA]"/>

          <div className="flex items-center gap-[18px]">

            <div className="flex justify-start items-center gap-[8px]">
              <IconPerformance/>
              <p className="justify-center text-white text-base font-medium font-['Manrope']">Performance</p>
            </div>
            <span className="text-right justify-center text-white text-xl font-bold font-['Manrope']">{dashboard.performancePercent}%</span>
          </div>
        </div>



      </div>
      <div className="w-80 h-40 relative" style={{
        transform: "translate(0px, 17px)"
      }}>
        <img src={CoverDashboard} className="w-full h-full" />
      </div>
    </section>
  );
}
