/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconReport,
  IconVector,
  IconDownload,
  IconFavouriteEmpityBig
} from "@/assets/icons";
import CardBrowseCases from "@/components/sections/lawyer/browsecases/card";
import { useParams } from "react-router";
import {
  useGetSimilarCasesQuery,
  useGetCaseQuery,
  useAddToFavoritesMutation,
} from "@/hooks/useCaseQueries";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";
import CreateOfferModal from "@/components/sections/lawyer/browsecases/createoffermodal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CaseDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("cases");

  const { data: caseData, isLoading } = useGetCaseQuery(id!);
  const { data: similarCases } = useGetSimilarCasesQuery(id!);

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const addToFavoritesMutation = useAddToFavoritesMutation();

  const handleAddToFavorites = () => {
    if (!id) return;
    addToFavoritesMutation.mutate(id, {
      onSuccess: () => {
        console.log("Added to favorites ✅");
      },
      onError: (error) => {
        console.error("Error adding to favorites ❌", error);
      },
    });
  };


  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="w-full h-10 mb-4" />
        <Skeleton className="w-full h-32 mb-4" />
        <Skeleton className="w-full h-64" />
      </div>
    );
  }

  if (!caseData) {
    return <div className="p-6 text-center text-gray-500">{t("CaseNotfound")}</div>;
  }
  console.log("caseData>>", caseData);
  const formatCaseType = (text: string) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());
  };
  return (<>

    <div className="w-full flex gap-2">
      {/* Main Case Details */}
      <div className="flex-1 h-[90vh] relative bg-white rounded-2xl overflow-hidden py-[40px] px-[27px]">
        <div className=" justify-center text-slate-600 text-base font-semibold font-['Manrope'] mb-3">{t("CaseDetails")}</div>
        {/* Title */}
        <div className="w-full text-neutral-800 text-xl font-extrabold font-['Manrope']">
          {caseData.title}
        </div>

        {/* Created At + Offers */}
        <div className="w-full inline-flex justify-start items-center gap-1.5 mt-1">
          <div className="text-slate-400 text-xs font-medium font-['Manrope']">
            {caseData.createdAt
              ? `Due ${dayjs(caseData.createdAt).format("DD MMM, YYYY")}`
              : ""}
          </div>
          <div className="w-[3px] h-[3px] bg-slate-400 rounded-full" />
          <div className="text-slate-400 text-xs font-medium font-['Manrope']">
            {caseData.offers?.length ?? 0} {t("offers")}
          </div>
        </div>

        {/* Budget, Type, Location */}
        <div className="h-min px-4 py-3.5 w-full bg-slate-100 rounded-2xl inline-flex flex-col gap-2.5 mt-3">
          <div className="self-stretch flex flex-col gap-2.5">
            {caseData.budget && <>
              <CaseDetailsItem title={t("Budget")} value={`${caseData.budget}${" "}${caseData.currency}`} />
              <div className="h-0 outline-1 outline-offset-[-0.50px] outline-slate-300" />
            </>}
            {caseData.practiceType == "GENERAL_LAWYER" ? <>
              <CaseDetailsItem title={t("Casetype")} value={formatCaseType(caseData.caseType)} />
              <div className="h-0 outline-1 outline-offset-[-0.50px] outline-slate-300" />
            </> : null}
            <CaseDetailsItem title={t("practiceType")} value={formatCaseType(caseData.practiceType)} />
            <div className="h-0 outline-1 outline-offset-[-0.50px] outline-slate-300" />
            
            {caseData.documentType && <>
            <CaseDetailsItem title={t("documentType")} value={formatCaseType(caseData.documentType)} />
            <div className="h-0 outline-1 outline-offset-[-0.50px] outline-slate-300" />
            </>}
            {caseData.serviceNeeded && <>
            <CaseDetailsItem title={t("serviceNeeded")} value={formatCaseType(caseData.serviceNeeded)} />
            <div className="h-0 outline-1 outline-offset-[-0.50px] outline-slate-300" />
            </>}
            {caseData.sourceLanguage && <>
            <CaseDetailsItem title={t("sourceLanguage")} value={formatCaseType(caseData.sourceLanguage)} />
            <div className="h-0 outline-1 outline-offset-[-0.50px] outline-slate-300" />
            </>}
            {caseData.targetLanguage && <>
            <CaseDetailsItem title={t("targetLanguage")} value={formatCaseType(caseData.targetLanguage)} />
            <div className="h-0 outline-1 outline-offset-[-0.50px] outline-slate-300" />
            </>}
            <CaseDetailsItem title={t("Location")} value={caseData.location ?? "N/A"} />
          </div>
        </div>

        {/* Description */}
        <div className="my-6">
          <h3 className="text-lg font-bold mb-2">{t("CaseDescription")}</h3>
          <p className="text-base text-neutral-800">{caseData.description}</p>
        </div>

        {/* Attachments */}
        {Array.isArray(caseData.attachments) &&
          caseData.attachments.length > 0 && (
            <>
              <h3 className="text-base font-bold">{t("Attachments")}</h3>
              <div className="h-fit w-full bg-slate-100 rounded-[10px] p-[10px] mt-2 overflow-y-auto">
                <div className="flex flex-col gap-2">
                  {caseData.attachments.map((file: string, idx: number) => {
                    const fileName = file.split("/").pop();
                    const isLast = idx === caseData.attachments!.length - 1;
                    return (
                      <div
                        key={idx}
                        className={`flex justify-between items-center pb-1 ${isLast ? "" : "border-b border-slate-300"
                          }`}
                      >
                        <div className="flex gap-2 items-center">
                          <IconVector />
                          <a
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm font-semibold"
                          >
                            {fileName}
                          </a>
                        </div>
                        <IconDownload />
                      </div>
                    );
                  })}

                </div>
              </div>
            </>
          )
        }


        {/* Actions */}
        <div className="flex justify-between mt-5">
          <button
            type="button"
            className="w-36 h-14 px-3.5 py-2 rounded-[32px]  outline-1 outline-slate-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <IconReport />
            <span className="text-slate-400 text-xs font-semibold">{t("Report")}</span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              className="w-72 h-14 bg-red-900 rounded-[32px] shadow text-white font-bold cursor-pointer"
              onClick={() => setIsOfferModalOpen(true)}
            >
              {t("SendOffer")}
            </button>

            <button
              type="button"
              className="w-14 h-14 bg-slate-100 rounded-[32px] shadow flex items-center justify-center cursor-pointer"
              onClick={handleAddToFavorites}
            >
              <IconFavouriteEmpityBig />
            </button>
          </div>
        </div>
      </div>

      {/* Similar Cases */}
      <div className="w-120 h-[90vh] bg-white rounded-2xl overflow-auto p-2.5">
        <div className="text-neutral-800 text-xl font-bold mb-[16px]">
          Similar Cases
        </div>
        <div className="flex flex-col gap-3.5">
          {similarCases?.map((item: any) => (
            <CardBrowseCases key={item.id} Item={item} />
          ))}
        </div>
      </div>
    </div>

    {/* Modal */}
    {isOfferModalOpen && (
      <CreateOfferModal onClose={() => setIsOfferModalOpen(false)} caseData={caseData}/>
    )}
  </>
  );
}




export const CaseDetailsItem = ({ title, value }: any) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-neutral-800 text-sm font-medium">
        {title}
      </span>
      <span className="text-neutral-800 text-sm font-semibold">
        {value}
      </span>
    </div>
  )
}
