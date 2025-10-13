import Container from "@/components/ui/container";
import CaseDetailsCard from "./caseDetailsCard";
import type { Case } from "@/types/case";
import Empty from "@/assets/empty-requests.svg?react";
import { Button } from "@/components/ui/button";
import { useGetCaseQuery } from "@/hooks/useCaseQueries";
import { useState } from "react";
import RequestCard from "./requestCard";
import { useTranslation } from "react-i18next";

type RequestDetailsProps = {
  caseData: Case;
};

type request = {
  profileImage: string;
  fullName: string;
  duration: string;
  description: string;
  budget: number;
  rate: number;
  reviews: number;
};

const dummyRequests: request[] = new Array(5).fill({
  profileImage: "",
  fullName: "Joel Zongomo",
  duration: "1 Month",
  description:
    "Hi there, I understand your concern and I am the perfect match for this case because of my experience handling similar legal matters. I’ll review your details thoroughly and ensure you get the best possible guidance and representation for your case as a lawyer Hi there, I understand your concern and I am the perfect match for this case because of my experience handling similar legal matters. I’ll review your details thoroughly and ensure you get the best possible guidance and representation for your case as a lawyer",
  budget: 1200,
  rate: 5.0,
  reviews: 120,
});

const RequestDetails = ({ caseData }: RequestDetailsProps) => {
  const { t } = useTranslation("caseRequests");
  const [requests, setRequests] = useState<request[]>([]);
  const { refetch } = useGetCaseQuery(caseData.id);

  return (
    <>
      <title>{`Dr-Lawyer | ${t("title")}`}</title>
      <Container className="my-6 flex grow flex-col gap-8">
        {/* Case Request Section */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{t("title")}</h2>
          <CaseDetailsCard caseData={caseData} />
        </section>

        {/* Offers/Responses Section */}
        <section className="flex grow flex-col gap-4">
          <h3 className="text-lg font-bold">
            {t("offers.title", { count: requests.length })}
          </h3>
          {requests.length > 0 ? (
            <div className="flex grow flex-col gap-4">
              {requests.map((request, index) => (
                <RequestCard key={index} request={request} />
              ))}
            </div>
          ) : (
            <div className="flex grow flex-col items-center justify-center">
              <Empty className="h-22 w-40" />
              <div className="flex flex-col items-center">
                <h4 className="text-base font-medium">
                  {t("offers.empty.title")}
                </h4>
                <p className="text-muted text-sm">
                  {t("offers.empty.description")}
                </p>
              </div>

              <Button
                variant="outline"
                className="mt-4 rounded-full"
                onClick={() => {
                  setRequests(dummyRequests);
                  refetch();
                }}
              >
                {t("offers.empty.refresh")}
              </Button>
            </div>
          )}
        </section>
      </Container>
    </>
  );
};

export default RequestDetails;
