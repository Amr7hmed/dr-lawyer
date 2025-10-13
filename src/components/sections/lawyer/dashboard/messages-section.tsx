
import { useNavigate } from "react-router";

const MessagesSection = () => {

    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate("/lawyer/messages");
    };
    return (<div className="w-full px-4 py-4 bg-white rounded-2xl 
                    inline-flex flex-col justify-center items-start gap-[17px]">
        <div className="w-full flex justify-between items-center">
            <div className="justify-start text-neutral-800 text-xl font-bold font-['Manrope'] leading-loose tracking-tight">Messages</div>
            <button type="button" className="w-20 h-9 bg-slate-300 rounded-lg flex justify-between items-center cursor-pointer"
                onClick={() => handleCardClick()} >
                <div className="w-16 text-center justify-center text-slate-600 text-base font-semibold font-['Manrope']">See All</div>
            </button>
        </div>

        <div className="w-full h-[1px] bg-[#F1F4FB]" />

        <div className="w-full inline-flex flex-col justify-start items-start gap-2">
            <div className="w-full flex justify-between items-center gap-2">
                <div className="w-full flex  items-center gap-3">
                    <img className="w-14 h-14 rounded-full" src="https://placehold.co/56x56" />
                    <div className="flex flex-col gap-1">
                        <h6 className="justify-start text-neutral-800 text-base font-bold font-['Manrope']">Doris B</h6>
                        <p className="justify-start text-neutral-800 text-sm font-medium font-['Manrope']">Have a good one!</p>
                    </div>
                </div>
                <span className="text-right justify-start text-slate-400 text-xs font-medium font-['Manrope'] w-20">3:02 PM</span>
            </div>

            <div className="w-full flex justify-between items-center gap-2">
                <div className="w-full flex  items-center gap-3">
                    <img className="w-14 h-14 rounded-full" src="https://placehold.co/56x56" />
                    <div className="flex flex-col gap-1">
                        <h6 className="justify-start text-neutral-800 text-base font-bold font-['Manrope']">Todd S. Ertel</h6>
                        <p className="justify-start text-neutral-800 text-sm font-medium font-['Manrope']">Hi there!</p>
                    </div>
                </div>
                <span className="text-right justify-start text-slate-400 text-xs font-medium font-['Manrope'] w-20">3:02 PM</span>
            </div>

            <div className="w-full flex justify-between items-center gap-2">
                <div className="w-full flex  items-center gap-3">
                    <img className="w-14 h-14 rounded-full" src="https://placehold.co/56x56" />
                    <div className="flex flex-col gap-1">
                        <h6 className="justify-start text-neutral-800 text-base font-bold font-['Manrope']">Abigail Baxter</h6>
                        <p className="justify-start text-neutral-800 text-sm font-medium font-['Manrope']">Hi there!</p>
                    </div>
                </div>
                <span className="text-right justify-start text-slate-400 text-xs font-medium font-['Manrope'] w-20">3:02 PM</span>
            </div>

        </div>
    </div>
    )
}

export default MessagesSection