/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconFavouriteEmpity, IconBudget } from "@/assets/icons";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface CaseInfoCardProps {
  caseData: any;
}

export default function CaseInfoCard({ caseData }: CaseInfoCardProps) {
  const { t } = useTranslation("cases");

  return (
    <div className="self-stretch px-3.5 py-3 bg-slate-100 rounded-xl inline-flex flex-col justify-start items-start gap-2.5 w-full">
      <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="flex justify-start items-center gap-1.5">
              <div className="justify-center text-slate-400 text-xs font-medium font-['Manrope']">
                {caseData.createdAt
                  ? `Due ${dayjs(caseData.createdAt).format("DD MMM, YYYY")}`
                  : ""}
              </div>
              <div className="w-[3px] h-[3px] bg-slate-400 rounded-full" />
              <div className="justify-center text-slate-400 text-xs font-medium font-['Manrope']">
                {caseData.offers?.length ?? 0} {t("offers")}
              </div>
            </div>
            <div className="w-6 h-6 bg-slate-100 rounded-full" />
            <IconFavouriteEmpity />
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
            <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['Manrope']">
              {caseData.title}
            </div>
            <div className="self-stretch justify-center text-slate-400 text-base font-medium font-['Manrope']">
              {caseData.description}
            </div>
            <div className="inline-flex justify-start items-center gap-2">
              <div className="flex justify-start items-center gap-1">
                {caseData.budget && (
                  <>
                    <IconBudget />
                    <div className="justify-center text-slate-600 text-xs font-medium font-['Manrope']">
                      {t("Budget")} : {`${caseData.budget} ${caseData.currency}`}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
