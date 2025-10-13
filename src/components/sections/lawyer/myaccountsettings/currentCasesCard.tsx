import { IconBudgetCurrentCases, IconCleander, IconProfileCurrentCases } from '@/assets/icons'

const CurrentCasesCard = () => {
    return (
        <div className="self-stretch px-3 py-4 bg-[#F1F4FB] rounded-xl shadow-[0px_0px_4px_0px_rgba(211,218,234,0.40)] 
          flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
                <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['Manrope']">
                        Startup Shareholder Agreement</div>
                    <div className="inline-flex justify-start items-center gap-2">
                        <div className="flex justify-start items-center gap-1">
                            <IconBudgetCurrentCases />
                            <div className="justify-center text-neutral-800 text-sm font-medium font-['Manrope']">AED 2400</div>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        <div className="flex justify-start items-center gap-1">
                            <IconCleander />
                            <div className="justify-center text-neutral-800 text-sm font-medium font-['Manrope']">Due 12 Aug, 2025</div>
                        </div>
                    </div>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                    <div className="flex justify-start items-center gap-[5px]">
                        <IconProfileCurrentCases />
                        <div className="justify-center text-slate-600 text-xs font-medium font-['Manrope']">Stuard Binni</div>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                        <div className="px-2.5 py-1 bg-sky-500/10 rounded-2xl flex justify-center items-center gap-2.5">
                            <div className="justify-center text-sky-500 text-xs font-medium font-['Manrope']">In Progress</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentCasesCard