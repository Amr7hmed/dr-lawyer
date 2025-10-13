import { useState } from "react";
import { IconCloseModule, IconContinue } from "@/assets/icons";
import IconAr from "@/assets/icon-ar.png";
import IconEn from "@/assets/icon-en.png";

const LanguageModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [selectedLang, setSelectedLang] = useState<string>("en");

    if (!isOpen) return null;

    const handleContinue = () => {
        console.log("Selected language:", selectedLang);
        onClose();
    };
    const LanguageList = [
        { name: "English", icon: IconEn,value:"en" },
        { name: "Arabic", icon: IconAr,value:"ar"  },
    ];

    return (
        <div className="fixed inset-0 bg-[#00000099] bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[500px] max-w-full relative flex flex-col gap-[60px] px-[25px] py-[20px]">
                <div className="flex items-center justify-between w-full">
                    <span></span>
                    <h2 className="text-center justify-center text-neutral-800 text-xl font-bold font-['Manrope']">Change Language</h2>
                    <button onClick={onClose}
                        className=" text-gray-500 hover:text-gray-700">
                        <IconCloseModule />
                    </button>
                </div>
                {/* Close button */}

                <div className="flex gap-[15px] items-center justify-center">

                    {LanguageList.map((lang) => (
                        <div
                            key={lang.name}
                            onClick={() => setSelectedLang(lang.value)}
                            className={`flex flex-col items-center justify-center gap-2 border cursor-pointer transition px-[80px] py-[30px]
                                shrink-0  [background:#F1F4FB] rounded-[10px]
                                ${selectedLang === lang.value
                                    ? "border-[#642329] bg-[#F9F5F5]"
                                    : "border-[#D3DAEA] bg-white"
                                }`}
                        >
                            <img
                                src={lang.icon}
                                alt={lang.name}
                                className="w-12 h-12 object-contain"
                            />
                            <span className="font-medium text-[#212121]">{lang.name}</span>
                        </div>
                    ))}
                </div>



                <button
                    onClick={handleContinue} className="w-80 h-14  bg-[#642329] rounded-[32px] shadow-[15px_0px_30px_0px_rgba(70,195,255,0.04)] 
                    flex items-center justify-center gap-2 mx-[auto]">
                    <span className=" text-center justify-center text-white text-base font-bold font-['Manrope'] leading-normal">Continue</span>
                    <IconContinue />
                </button>
            </div>
        </div>
    );
};

export default LanguageModal;