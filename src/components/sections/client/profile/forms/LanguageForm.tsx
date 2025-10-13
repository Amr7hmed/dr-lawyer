import { IconClose } from "@/assets/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import IconAr from "@/assets/icon-ar.png";
import IconEn from "@/assets/icon-en.png";

const LanguageForm = () => {
    const { t } = useTranslation("profileStatus");
    const [languages, setLanguages] = useState<string[]>(["English", "French"]);
    const [selectedLang, setSelectedLang] = useState<string>("English");

    const handleRemove = (lang: string) => {
        setLanguages(languages.filter((l) => l !== lang));
    };

    const handleAdd = () => {
        const newLang = prompt("Enter a new language:");
        if (newLang && !languages.includes(newLang)) {
            setLanguages([...languages, newLang]);
        }
    };
    const LanguageList = [
        { name: "English", icon: IconEn },
        { name: "Arabic", icon: IconAr },
    ];

    return (
        <div className="flex w-full flex-col items-start gap-5">
            {/* Languages List */}
            <div className="flex w-full flex-col items-start gap-5">
                <div className="flex justify-between items-center w-full">
                    <h3 className="text-[color:var(--Text,#212121)] [font-family:Manrope] text-[22px] font-bold leading-[normal]">
                        {t("language")}
                    </h3>
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="hover:underline text-[color:#485470] [font-family:Manrope] text-base font-semibold leading-[normal] *:flex w-[116px] h-[33.585px] 
                        flex-col justify-center items-center gap-2.5 shrink-0 [background:#F1F4FB]  rounded-[70px]"
                    >
                        {t("AddMore")}
                    </button>
                </div>

                <div className="flex flex-col gap-3 w-full">
                    {languages.map((lang) => (
                        <div
                            key={lang}
                            className="flex justify-between items-center px-4 py-2 
                            w-full h-14 shrink-0 border [background:#FFF] rounded-xl border-solid border-[#C8D1E5]"
                        >
                            <span className="text-[#00142D] [font-family:Manrope] text-base font-semibold leading-[23px]">
                                {lang}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleRemove(lang)}
                                className="text-[#818CA2] hover:text-red-500 cursor-pointer"
                            >
                                <IconClose />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="h-[1px] [background:#D3DAEA] w-full" />

            {/* Change Language */}
            <div>
                <h3 className="text-lg font-bold text-[#212121] mb-4">Change Language</h3>
                <div className="grid grid-cols-2 gap-4">
                    {LanguageList.map((lang) => (
                        <div
                            key={lang.name}
                            onClick={() => setSelectedLang(lang.name)}
                            className={`flex flex-col items-center justify-center gap-2 border cursor-pointer transition px-[80px] py-[30px]
                                shrink-0  [background:#F1F4FB] rounded-[10px]
                                ${selectedLang === lang.name
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
            </div>
        </div>
    );
};

export default LanguageForm;
