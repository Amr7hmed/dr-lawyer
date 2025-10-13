import { useState } from "react";
import { Search } from "lucide-react";
import { IconRightArrow } from "@/assets/icons";

const HelpSupportForm = () => {
    const [activeTab, setActiveTab] = useState("General");

    const tabs = ["General", "Account", "Service", "Payment method"];

    const faqs = [
        "Is the app free?",
        "How can I turn on my notification?",
        "How to change my password?",
        "Can I earn with this app?",
        "How can I change my email?",
    ];

    return (
        <div className="flex w-full flex-col gap-6">
            {/* Title */}
            <h3 className="flex h-[30px] flex-col justify-center self-stretch text-[color:var(--Text,#212121)] [font-family:Manrope] text-[22px] font-bold leading-[normal]">Help and Support</h3>

            {/* Tabs */}
            <div className="flex gap-3 flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-full border transition font-semibold text-sm
              ${activeTab === tab
                                ? "bg-[#485470] text-white border-[#485470]"
                                : "bg-white text-[#485470] border-[#D3DAEA]"
                            }`}
                    >
                        <span className={`flex flex-col justify-center shrink-0 ${activeTab === tab ? "text-white" : "text-[#485470]"}
                         text-center [font-family:Manrope] text-l font-semibold leading-[23px]`}>

                            {tab}
                        </span>
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#F1F4FB] rounded-xl">
                <Search size={18} className="text-[#818CA2]" />
                <input
                    type="text"
                    placeholder="Search topics or questions"
                    className="flex-1 bg-transparent outline-none text-sm text-[#212121]"
                />
            </div>

            {/* FAQ List */}
            <div className="flex flex-col gap-3">
                <h4 className="text-base font-semibold text-[#212121]">Top Questions</h4>
                {faqs.map((q, idx) => (
                    <button
                        key={idx}
                        className="flex justify-between items-center p-[16px] border rounded-xl 
                       border-[#D3DAEA] bg-white text-sm font-medium text-[#212121] hover:bg-[#F9F9FC]"
                    >
                        {q}
                        <IconRightArrow color={"#D3DAEA"} size={16} />
                    </button>
                ))}
            </div>

            {/* Contact Support */}
            <button className="flex flex-col justify-center items-center gap-2.5 [background:#642329] px-[73px] py-4 rounded-[32px] max-w-[343px]">
                <span className="text-white [font-family:Manrope] text-base font-bold leading-[normal]">
                    Contact support
                </span>
            </button>
        </div>
    );
};

export default HelpSupportForm;
