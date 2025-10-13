
import { useTranslation } from "react-i18next";
import { useState } from "react";

const ProfileNotifications = () => {
    const { t } = useTranslation("profileStatus");
    return (
        <>
            <form className="w-full flex flex-col items-start gap-[35.014px]">
                <div className="w-full  flex flex-col items-start gap-3">
                    <h2 className="text-xl font-semibold w-full ">{t("AllowNotifications")}</h2>
                    <div className="flex  flex-col items-start gap-[18px] w-full ">
                        <div className="flex flex-col items-start gap-[7px] self-stretch">
                            <ToggleItem
                                label={t("AllowNotifications")}
                                defaultChecked={true}
                                onChange={(val) => console.log("Toggle:", val)}
                            />

                            <span className="self-stretch text-[color:var(--Text-3,#818CA3)] [font-family:Manrope] text-xs font-normal leading-[normal]">
                                Incognito mode make you invisible in events
                            </span>
                        </div>

                        <div className="flex flex-col items-start gap-1.5 self-stretch">

                            <ToggleItem
                                label={t("NewRequest")}
                                defaultChecked={true}
                                onChange={(val) => console.log("Toggle:", val)}
                            />
                            <ToggleItem
                                label={t("Message")}
                                defaultChecked={true}
                                onChange={(val) => console.log("Toggle:", val)}
                            />
                            <ToggleItem
                                label={t("RequestAccepted")}
                                defaultChecked={true}
                                onChange={(val) => console.log("Toggle:", val)}
                            />
                        </div>
                    </div>
                </div>

            </form>
        </>
    );
};

export default ProfileNotifications;



type ToggleItemProps = {
    label: string;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
};

const ToggleItem = ({ label, defaultChecked = false, onChange }: ToggleItemProps) => {
    const [checked, setChecked] = useState(defaultChecked);

    const handleToggle = () => {
        setChecked((prev) => {
            const newVal = !prev;
            onChange?.(newVal);
            return newVal;
        });
    };

    return (
        <div
            className="w-full shrink-0 border [background:#FFF] rounded-[10px] border-solid 
            border-[#D3DAEA] flex justify-between items-center px-[24px] py-[17px]"
        >
            <span className="text-[color:var(--Text-2,#485470)] [font-family:Manrope] text-base font-semibold leading-[normal]">
                {label}
            </span>

            <button
                type="button"
                onClick={handleToggle}
                className={`relative inline-flex h-[20px] w-[38px] shrink-0 cursor-pointer rounded-full border-2 
                    border-transparent transition-colors duration-200 ease-in-out  items-center
                    ${checked ? "bg-[#642329]" : "bg-[#D3DAEA]"}`}
            >
                <span
                    className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow transition duration-200 ease-in-out
                    ${checked ? "translate-x-[18px]" : "translate-x-0"}`} />
            </button>
        </div>
    );
};

