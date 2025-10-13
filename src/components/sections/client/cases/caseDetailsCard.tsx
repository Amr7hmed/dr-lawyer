import Budget from "@/assets/budget.svg?react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Case } from "@/types/case";
import dayjs from "@/lib/dayjs";
import CancelRequestModal from "./cancelRequestModal";
import { useTranslation } from "react-i18next";

type CaseCardProps = {
  caseData: Case;
};

export default function CaseDetailsCard({ caseData }: CaseCardProps) {
  const { t, i18n } = useTranslation("caseRequests");

  const {
    title,
    description,
    createdAt,
    budget,
    caseTypeTranslated,
    currency,
  } = caseData;

  return (
    <Card className="border-border w-full rounded-xl border bg-white p-4 shadow-sm">
      <CardContent className="p-0">
        <div className="flex justify-between gap-4">
          <div className="flex w-full flex-col">
            {/* Header */}
            <div className="flex w-full justify-between gap-4">
              <div>
                <div className="text-muted-foreground mb-1 flex items-center space-x-2 text-xs">
                  <span>
                    {dayjs(createdAt).locale(i18n.language).fromNow()}
                  </span>
                  <span className="bg-muted-foreground h-1 w-1 rounded-full" />
                  <span>{t("card.responses", { count: 14 })}</span>
                  {/* Replace 14 with dynamic count if available */}
                </div>

                {/* Title */}
                <h2 className="text-foreground mb-1 text-lg font-semibold">
                  {title}
                </h2>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="rounded-full" size="sm">
                  {t("card.edit")}
                </Button>
                <CancelRequestModal caseId={caseData.id} />
              </div>
            </div>

            {/* Description */}
            <p className="text-muted mb-3 w-full text-sm">{description}</p>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Budget className="h-5 w-5" />
                <span className="text-muted text-sm font-medium">
                  {t("card.budget", { currency, budget })}
                </span>
                <Badge className="bg-secondary text-foreground ml-4 rounded-full px-3 py-1 text-sm font-medium">
                  {caseTypeTranslated}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
