/* eslint-disable @typescript-eslint/no-explicit-any */
import Budget from "@/assets/budget.svg?react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import dayjs from "@/lib/dayjs";
import type { Case } from "@/types/case";
import { MoreHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";

type CaseCardProps = {
  caseData: Case;
};

export default function CaseCard({ caseData }: CaseCardProps) {
  const { t, i18n } = useTranslation("manageCases");
  const navigate = useNavigate();
  const {
    title,
    description,
    createdAt,
    budget,
    caseTypeTranslated,
    currency,
  } = caseData;
const practiceTypeStyles: Record<
  string,
  { bg: string; text: string }
> = {
  NOTARY: { bg: "bg-[#F4F3FF]", text: "text-[#6938EF]" },
  GENERAL_LAWYER: { bg: "bg-[#F8EAEB]", text: "text-[#642329]" },
  LEGAL_TRANSLATOR: { bg: "bg-[#EAECF5]", text: "text-[#3E4784]" },
  JUDICIAL_EXPERT: { bg: "bg-[#D0D5DD]", text: "text-[##101828]" },
  DEFAULT: { bg: "bg-[#D0D5DD]", text: "text-[##101828]" },
};
const typeKey = caseData?.practiceType ?? "DEFAULT";
const { bg, text } = practiceTypeStyles[typeKey] || practiceTypeStyles.DEFAULT;
const formatPracticeType = (value?: string) => {
  if (!value) return "";
  return value
    .toLowerCase() // "general_lawyer"
    .split("_")    // ["general", "lawyer"]
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // ["General", "Lawyer"]
    .join(" ");    // "General Lawyer"
};

  return (
    <Card
      className="border-border w-full cursor-pointer rounded-xl border bg-white p-4 shadow-sm"
      onClick={() => navigate(`/client/cases/${caseData.id}`)}
    >
      <CardContent className="p-0">
        {/* Header */}
      <div className={`p-1 ${bg} rounded-xl inline-flex justify-start items-center gap-1.5`}>
        <div className={`justify-center ${text} text-sm font-bold font-['Manrope']`}>
           {formatPracticeType(caseData?.practiceType)}
        </div>
      </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground flex items-center space-x-2 text-xs">
            <span>{dayjs(createdAt).locale(i18n.language).fromNow()}</span>
            <span className="bg-muted-foreground h-1 w-1 rounded-full" />
            <span>
              {t("requests.responses", {
                count: 14, // replace 14 with real count if available
              })}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted h-fit! w-fit! px-1.5! py-1!"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-5 w-5" />
            <span className="sr-only">{t("requests.moreOptions")}</span>
          </Button>
        </div>

        {/* Title */}
        <h2 className="text-foreground mb-1 text-lg font-semibold">{title}</h2>

        {/* Description */}
        <p className="text-muted mb-2 w-full truncate overflow-hidden text-sm text-ellipsis">
          {description}
        </p>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Budget className="h-5 w-5" />
            <span className="text-muted text-sm font-medium">
              {t("requests.budget")}: {currency} {budget}
            </span>
            <Badge className="bg-secondary text-foreground ml-4 rounded-full px-3 py-1 text-sm font-medium">
              {caseTypeTranslated}
            </Badge>
          </div>
          <div className="ms-auto flex gap-3">
            <Button
              variant="outline"
              className="border-foreground text-foreground h-auto rounded-full border bg-transparent px-6 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {t("requests.edit")}
            </Button>
            <Link
              to={`/client/cases/${caseData.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Button className="bg-foreground hover:bg-foreground/90 h-9.5 rounded-full px-6 py-2 text-white">
                {t("requests.viewResponses", {
                  count: 14,
                })}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
