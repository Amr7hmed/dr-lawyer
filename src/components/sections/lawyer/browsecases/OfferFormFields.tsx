/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconUploadFile } from "@/assets/icons";
import { useTranslation } from "react-i18next";

interface OfferFormFieldsProps {
    description: string;
    setDescription: (value: string) => void;
    duration: string;
    setDuration: (value: string) => void;
    price: string;
    setPrice: (value: string) => void;
    attachments: File[];
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setShowSignatureModal: any;
    onNextStep: () => void;
}

export default function OfferFormFields({
    description,
    setDescription,
    duration,
    setDuration,
    price,
    setPrice,
    attachments,
    handleFileChange,
    onNextStep
}: OfferFormFieldsProps) {
    const { t } = useTranslation("cases");

    return (
        <>
            {/* Offer Textarea */}
            <div>
                <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['Manrope']">
                    {t("MakeourOffer")}
                </div>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-2 w-full min-h-[80px] border border-gray-300 
            rounded-xl p-3 focus:outline-none focus:ring-2 
            focus:ring-blue-500 resize-none"
                    placeholder={t("DescribeYourOffer")}
                />
            </div>

            {/* Duration */}
            <div>
                <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['Manrope']">
                    {t("HowLongWillThisProjectTake")}
                </div>
                <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="mt-2 w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">{t("SelectADuration")}</option>
                    <option value="1 day">1 Day</option>
                    <option value="3 days">3 Days</option>
                    <option value="1 week">1 Week</option>
                </select>
            </div>

            {/* Pricing */}
            <div>
                <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['Manrope']">
                    {t("Pricing")}
                </div>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-2 w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Attachment */}
            <div>
                <div className="self-stretch justify-center">
                    <span className="text-neutral-800 text-base font-bold font-['Manrope']">
                        {t("Attachments")}{" "}
                    </span>
                    <span className="text-slate-400 text-xs font-medium font-['Manrope']">
                        ({t("optional")})
                    </span>
                </div>

                <label className="w-full h-14 px-32 py-4 rounded-2xl bg-gray-50 outline-1 outline-offset-[-0.5px]
          outline-slate-300 inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer">
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div className="inline-flex justify-center items-center gap-2">
                        <IconUploadFile />
                        <span className="justify-center text-slate-600 text-sm font-semibold font-['Manrope']">
                            {t("AttachFile")}
                        </span>
                    </div>
                </label>

                {attachments.length > 0 && (
                    <ul className="mt-2 text-sm text-slate-500">
                        {attachments.map((file, idx) => (
                            <li key={idx}>{file.name}</li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Submit Button */}
            <button
                onClick={onNextStep}
                className="bg-[#7D1D26] text-white rounded-full py-3 font-semibold hover:bg-[#65171e]"
            >
                {t("AddSignature")}
            </button>
        </>
    );
}
