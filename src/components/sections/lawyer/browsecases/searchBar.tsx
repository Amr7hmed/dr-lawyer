/* eslint-disable @typescript-eslint/no-explicit-any */
import { Filter } from "lucide-react";
import { useNavigate } from "react-router";


export default function SearchBar({ tabBar }: any) {



  const navigate = useNavigate();

  const handleCardClick = (tab: any) => {
    navigate(tab.link);
  };

  return (
    <div className="flex items-center justify-between  px-4 py-2 gap-4 mb-5  w-full  shrink-0  h-20 bg-white rounded-xl" >
      {/* Input */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Title, Keyword"
          className="w-[264px] text-[color:#818CA3] [font-family:Manrope] text-md font-normal leading-[160%]"
        />
      </div>
      <span className="w-[2.05px] h-8 shrink-0 [background:#D3DAEA] rounded-[5px]" />

      {/* Tabs */}
      <div className="inline-flex justify-start items-start gap-1.5">
        {tabBar.map((tab: any) => (
          <button
            key={tab?.id}
            onClick={() => handleCardClick(tab)}
            className={`px-5 py-2 rounded-2xl inline-flex justify-center items-center gap-2.5 overflow-hidden cursor-pointer 
              ${tab.active === true ? "bg-[#651C1C]"
                : "bg-white"
              }`}
          >
            <span className={`justify-center text-slate-600 text-xs font-medium font-['Manrope'] 
            ${tab.active === true ? "text-white" : "text-[#485470]"}`}>
              {tab?.name}
            </span>

          </button>
        ))}
      </div>

      {/* Divider */}
      <span className="w-[2.05px] h-8 shrink-0 [background:#D3DAEA] rounded-[5px]" />

      {/* Filter */}
      <button className="text-gray-500 hover:text-gray-700">
        <Filter size={18} />
      </button>

      {/* Search */}
      <button className="px-6 py-2 rounded-lg bg-[#651C1C] text-white font-medium hover:bg-[#500f0f] transition">
        Search
      </button>
    </div>
  );
}
