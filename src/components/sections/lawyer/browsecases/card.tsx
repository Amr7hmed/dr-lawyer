/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconFavouriteEmpity,
  IconFavourite,
  IconUAEDirhamSymbol,
} from "@/assets/icons/index";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router";

dayjs.extend(relativeTime);

export default function CardBrowseCases({ Item }: any) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/lawyer/browse-cases/${Item.id}`);
  };


  const practiceTypeStyles: Record<
    string,
    { bg: string; text: string }
  > = {
    NOTARY: { bg: "bg-[#F4F3FF]", text: "text-[#6938EF]" },
    GENERAL_LAWYER: { bg: "bg-[#F8EAEB]", text: "text-[#642329]" },
    LEGAL_TRANSLATOR: { bg: "bg-[#EAECF5]", text: "text-[#3E4784]" },
    JUDICIAL_EXPERT: { bg: "bg-[#D0D5DD]", text: "text-[##101828]" },
    DEFAULT: { bg: "bg-[#D0D5DD]", text: "text-[##101828]" },
  };
  const typeKey = Item?.practiceType ?? "DEFAULT";
  const { bg, text } = practiceTypeStyles[typeKey] || practiceTypeStyles.DEFAULT;
  const formatPracticeType = (value?: string) => {
    if (!value) return "";
    return value
      .toLowerCase() // "general_lawyer"
      .split("_")    // ["general", "lawyer"]
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // ["General", "Lawyer"]
      .join(" ");    // "General Lawyer"
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full px-3.5 py-3 bg-white rounded-xl shadow-[0px_0px_4px_0px_rgba(211,218,234,0.40)] 
        outline-1 outline-offset-[-1px] outline-Overlays-Default/20 flex flex-col justify-start items-start gap-2.5 
        cursor-pointer hover:shadow-md transition-shadow duration-200"
    >
      <div className="w-full flex flex-col justify-start items-start gap-3.5">
        <div className="w-full flex flex-col justify-start items-start gap-1">
          {/* Header */}
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-1.5">
              {/* Time */}
              <div className="text-slate-400 text-xs font-medium font-['Manrope']">
                {dayjs(Item.createdAt).fromNow()}
              </div>
              <div className="w-[3px] h-[3px] bg-slate-400 rounded-full" />
              <div className="text-slate-400 text-xs font-medium font-['Manrope']">
                {Item.responses ?? 0} responses
              </div>
            </div>
            <button
              type="button"
              className="btn cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {Item?.isFavorited == true ?
                <IconFavourite />
                :
                <IconFavouriteEmpity />
              }
            </button>
          </div>

          {/* Title + Budget + Category */}
          <div className="w-full flex flex-col justify-start items-start gap-1.5">
            <div className="text-neutral-800 text-base font-bold font-['Manrope']">
              {Item.title}
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-1">
                <IconUAEDirhamSymbol />
                <div className="text-slate-600 text-xs font-medium font-['Manrope']">
                  Budget: {Item.budget} {Item.currency}
                </div>
              </div>


              <div className={`px-2.5 py-1 ${bg} rounded-xl inline-flex justify-start items-center gap-1.5`}>
                <div className={`justify-center ${text} text-xs font-medium  font-['Manrope']`}>
                  {formatPracticeType(Item?.practiceType)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-slate-400 text-xs font-medium font-['Manrope']">
          {Item.description}
        </div>
      </div>
    </div>
  );
}
