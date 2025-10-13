import { IconAllAppliedOffers, IconBudgetAppliedOffers} from '@/assets/icons'

const AppliedOffersCard = () => {
    return (<div className=" px-3.5 py-3 bg-[#F2F4F7] rounded-xl shadow-[0px_0px_4px_0px_rgba(211,218,234,0.40)] inline-flex flex-col justify-start items-start gap-2.5">
            <div className="w-full flex flex-col justify-start items-start gap-3.5">
                <div className="self-stretch flex flex-col justify-start items-start gap-1">
                    <div className="self-stretch inline-flex justify-between items-center">
                        <div className="p-1 bg-violet-50 rounded-xl flex justify-start items-center gap-1.5">
                            <div className="justify-center text-violet-600 text-sm font-bold font-['Manrope']">Notary</div>
                        </div>
                        <IconAllAppliedOffers />
                    </div>
                    <div className="self-stretch inline-flex justify-between items-center">
                        <div className="flex justify-start items-center gap-1.5">
                            <div className="justify-center text-slate-400 text-xs font-medium font-['Manrope']">2 min ago</div>
                            <div className="w-[3px] h-[3px] bg-slate-400 rounded-full" />
                            <div className="justify-center text-slate-400 text-xs font-medium font-['Manrope']">14 responses</div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                        <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['Manrope']">Need lawyer for Accidental issue, want to handle it quickly.</div>
                        <div className="inline-flex justify-start items-center gap-2">
                            <div className="flex justify-start items-center gap-1">
                                <IconBudgetAppliedOffers/>
                                <div className="justify-center text-slate-600 text-xs font-medium font-['Manrope']">Budget: $2400</div>
                            </div>
                            <div className="px-2.5 py-1 bg-slate-100 rounded-2xl flex justify-center items-center gap-2.5">
                                <div className="justify-center text-neutral-800 text-xs font-medium font-['Manrope']">Vehicle Accidents</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="self-stretch justify-center text-slate-400 text-xs font-medium font-['Manrope']">I had car accident yesterday and I have the complete recorded video of this accident that...</div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="w-full h-8 px-7 py-2 bg-neutral-800 rounded-[20px] flex justify-center items-center gap-2.5">
                    <div className="text-center justify-center text-white text-xs font-semibold font-['Manrope']">View Amr’s offer</div>
                </div>
            </div>
        </div>
    )
}

export default AppliedOffersCard