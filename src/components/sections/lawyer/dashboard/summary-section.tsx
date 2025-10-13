

import {
    IconCasesCompleted,
    IconProposalsSent,
    IconHires,
    IconUniqueClients
} from "@/assets/icons/index";
import type { DashboardData } from "@/services/dashboardService";
const SummarySection = ({ dashboard }: { dashboard: DashboardData }) => {

     const List = [
    { id: 1, title: "Cases Completed", value: dashboard.activity.casesCompleted, icon: <IconCasesCompleted /> },
    { id: 2, title: "Proposals Sent", value: dashboard.activity.offersSent, icon: <IconProposalsSent /> },
    { id: 3, title: "Hires", value: dashboard.activity.hires, icon: <IconHires /> },
    { id: 4, title: "Unique Clients", value: dashboard.clicks, icon: <IconUniqueClients /> },
  ];
    return (<div className="w-full flex flex-col gap-[9px] bg-white rounded-2xl pt-[14px] pb-[24px] px-[20px]">

        <div className="flex items-center justify-between w-full gap-2.5">
            <h3 className="text-neutral-800 text-xl font-bold font-['Manrope'] leading-loose">Summary</h3>
        </div>
        <div className="w-full  flex justify-start items-center gap-3">

            {List.map(item => (
                <div className="px-[10px] py-[16px] bg-neutral-800 rounded-xl flex justify-start items-center gap-3 flex-1 w-44" key={item.id}>
                    <div className="w-10 h-10 opacity-50 rounded-full border border-slate-300 flex flex-col justify-center items-center" >
                        {item.icon}
                    </div>
                    <div className="inline-flex flex-col justify-start items-start">
                        <div className="text-center justify-start text-white text-xs font-normal font-['Manrope'] leading-tight">{item.title}</div>
                        <div className="text-center justify-start text-white text-base font-bold font-['Manrope'] leading-normal tracking-tight">{item.value}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}

export default SummarySection;


