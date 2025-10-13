/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconUAEDirhamSymbol,
  IconProfileMen,
  IconCalendar,
} from "@/assets/icons/index";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

export default function MyCasesCard({ Item }: any) {

  console.log("Item..",Item);
  
  const formattedDate = Item.createdAt
    ? `Due ${dayjs(Item.createdAt).format("DD MMM, YYYY")}`
    : "";


    
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/lawyer/my-cases/${Item.id}`);
  };

  return (
    <div
      onClick={handleCardClick} 
      className="w-full px-3.5 py-3 bg-white rounded-xl shadow-[0px_0px_4px_0px_rgba(211,218,234,0.40)] 
                    outline-1 outline-offset-[-1px] outline-Overlays-Default/20 flex flex-col justify-start items-start gap-2.5 cursor-pointer hover:shadow-md ">
      <div className="w-full flex flex-col justify-start items-start gap-3.5">
        <div className="w-full flex flex-col justify-start items-start gap-1">
          {/* Title */}
          <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['Manrope']">
            {Item.title}
          </div>

          {/* Budget + Date */}
          <div className="inline-flex justify-start items-center gap-2">
            <div className="flex justify-start items-center gap-1">
              <IconUAEDirhamSymbol />
              <div className="justify-center text-neutral-800 text-sm font-medium font-['Manrope']">
                {Item.budget} {Item.currency}
              </div>
            </div>

            <div className="w-1 h-1 bg-slate-300 rounded-full" />

            <div className="flex justify-start items-center gap-1">
              <IconCalendar />
              <div className="justify-center text-neutral-800 text-sm font-medium font-['Manrope']">
                {formattedDate}
              </div>
            </div>
          </div>
        </div>

        {/* Lawyer + Status */}
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-[5px]">
            <IconProfileMen />
            <div className="justify-center text-slate-600 text-xs font-medium font-['Manrope']">
              {Item.assignedLawyer?.fullName ?? "-"}
            </div>
          </div>
          <div className="flex justify-start items-center gap-2">
            <div className="px-2.5 py-1 bg-sky-500/10 rounded-2xl flex justify-center items-center gap-2.5">
              <div className="justify-center text-sky-500 text-xs font-medium font-['Manrope']">
                {Item.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
