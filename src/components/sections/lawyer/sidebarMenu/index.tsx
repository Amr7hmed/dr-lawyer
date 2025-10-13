import { Link, useLocation } from "react-router";
import {
  IconDashboard,
  IconBrowseCases,
  IconMyCases,
  IconMessages,
  IconSettings
} from "@/assets/icons/index";

import drlawyerlogo from "@/assets/dr-lawyer-logo.png";
import upgradecard from "@/assets/upgrade-card.png";
import OfferSentModal from "../profileLawyer/offerSentModal";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/lawyer/dashboard", icon: IconDashboard },
  { label: "Browse Cases", path: "/lawyer/browse-cases/most-recent", icon: IconBrowseCases },
  { label: "My Cases", path: "/lawyer/my-cases/all", icon: IconMyCases },
  { label: "Messages", path: "/lawyer/messages", icon: IconMessages },
  { label: "Settings", path: "/lawyer/settings/profile", icon: IconSettings },
];

export default function Sidebar() {
  const location = useLocation();
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  return (<>
    <aside className="flex flex-col justify-between h-full bg-white w-full shadow-sm p-[16px]">
      <div>
        <div className="flex flex-col items-center" style={{ margin: "20px 0px 40px 0px" }}>
          <img
            src={drlawyerlogo}
            alt="Dr Lawyer"
            className="w-[145.164px] h-[95.016px] shrink-0"
          />
        </div>

        <nav className="flex flex-col gap-2 mt-6">

          {navItems.map((item) => {
            let isActive = false;

            if (item.path.includes("/settings")) {
              isActive = location.pathname.startsWith("/lawyer/settings");
            } else if (item.path.includes("/browse-cases")) {
              isActive = location.pathname.startsWith("/lawyer/browse-cases");
            }else if (item.path.includes("/my-cases")) {
              isActive = location.pathname.startsWith("/lawyer/my-cases");
            }  else {
              isActive = location.pathname.startsWith(item.path);
            }

            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex w-full h-12 items-center gap-4 px-4 py-0 rounded-xl 
        ${isActive ? "[background:#F1F4FB]" : ""}`}
              >
                <span
                  className="flex items-center justify-center"
                  style={{ width: "50px", height: "50px" }}
                >
                  <Icon color={isActive ? "#642329" : "#CFD7ED"} />
                </span>
                <span
                  className={`text-[color:#818CA3] [font-family:Manrope] 
          text-[17px] font-medium leading-[normal] 
          ${isActive ? "text-[color:#642329] font-bold" : ""}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}

        </nav>
      </div>

      {/* Bottom Promo */}
      <div className="w-full h-auto shrink-0 [background:#F6EFE3] rounded-[18px] flex flex-col items-center gap-3 p-[20px]">
        <img src={upgradecard} className="w-[112.908px] h-[71px] shrink-0" />
        <p className="flex w-[155px] flex-col justify-center shrink-0 text-[color:#642329] text-center [font-family:Manrope] text-[17px] font-bold leading-[18.2px]">
          Do more with Premium
        </p>
        <button className="inline-flex justify-center items-center [background:#642329] pl-[26px] pr-[25px] pt-2 pb-1.5 rounded-[32px] cursor-pointer"



          type="button"
          onClick={() => setIsOfferModalOpen(true)} >
          <span className="text-white [font-family:Manrope] text-sm font-bold leading-[25px]">
            Upgrade Now
          </span>
        </button>
      </div>
    </aside>
    {/* Modal */}
    {isOfferModalOpen && (
      <OfferSentModal onClose={() => setIsOfferModalOpen(false)} />
    )}
  </>
  );
}
