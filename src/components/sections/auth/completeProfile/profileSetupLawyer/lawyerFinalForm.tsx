import { useFormContext } from "react-hook-form";
import { usePracticeTypesQuery } from "@/hooks/useConstansQueries";
import { useTranslation } from "react-i18next";

type Package = {
    code: string;
    name: string;
    price: number;
    currency: string;
};

type PracticeType = {
    code: string;
    name: string;
    desc?: string;
    packages: Package[];
};

const LawyerFinalForm = () => {
    const { register, watch } = useFormContext();
    const selected: string = watch("practiceType");

    const { data, isLoading } = usePracticeTypesQuery();
      const { t } = useTranslation("profileSetup");

    if (isLoading) {
        return (
            <div className="flex h-12 w-full items-center justify-center">
                <span>
                      {t("step4.loading")}</span>
            </div>
        );
    }

    const practiceTypes: PracticeType[] = data || [];


    return (
        <>
            <table className="w-full border-collapse rounded-lg self-stretch bg-white  shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06)] 
            outline-1 outline-offset-[-1px] outline-gray-200  overflow-hidden
            ">
                <thead>
                    <tr className="bg-[#F9FAFB] text-left  border-b border-gray-200 ">
                        <th >
                            <div data-checkbox="False" data-color="Gray" data-text="True"
                                className="self-stretch h-11 px-2 py-4  inline-flex justify-start items-start gap-1  w-full">
                                <div data-arrow="False" data-help-icon="False" data-state="Default" className="flex justify-start items-center gap-1">
                                    <div className="justify-start text-gray-500 text-xs font-medium font-['Manrope']">{t("step10.Type")}</div>
                                </div>
                            </div>
                        </th>

                        {practiceTypes[0]?.packages?.map((pkg: Package) => (
                            <th key={pkg.code} className="p-3">
                                <div data-checkbox="False" data-color="Gray" data-text="True"
                                    className="self-stretch h-11 px-2 py-4 inline-flex justify-start items-start gap-1 w-full">
                                    <div data-arrow="False" data-help-icon="False" data-state="Default" className="flex justify-start items-center gap-1">
                                        <div className="justify-start text-gray-500 text-xs font-medium font-['Manrope']">{pkg.name}</div>
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {practiceTypes.map((type: PracticeType) => {
                        const isSelected = selected === type.code;

                        return (
                            <tr
                                key={type.code}
                                className={`border-b transition-colors ${isSelected ? "bg-[#F8EAEB]" : "hover:bg-gray-50"
                                    }`}
                            >
                                <td data-state="Default" data-style="Lead radio button" data-supporting-text="False"
                                    className="self-stretch h-16 p-4 inline-flex justify-start items-center gap-3">

                                    <input
                                        type="radio"
                                        value={type.code}
                                        {...register("practiceType")}
                                        className="
                                            w-5 h-5 rounded-full border-2 border-gray-400
                                            appearance-none cursor-pointer relative
                                            checked:border-[#824B50]
                                            after:content-[''] after:w-2.5 after:h-2.5 after:rounded-full after:bg-[#824B50]
                                            after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
                                            after:hidden checked:after:block"
                                    />


                                    <div className="justify-start text-gray-900 text-sm font-medium font-['Manrope']">{type.name}</div>
                                </td>
                                {type.packages.map((pkg: Package) => (
                                    <td
                                        key={pkg.code}
                                        className="px-2 py-4 text-green-500 text-center justify-start text-Foundation-accent-positive text-xs font-medium font-['Manrope']"
                                    >
                                        {pkg.price} {pkg.currency}
                                    </td>

                                ))}

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default LawyerFinalForm;




