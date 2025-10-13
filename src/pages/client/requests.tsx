import Spinner from "@/components/common/spinner";
import CaseCard from "@/components/sections/client/cases/caseCard";
import { useGetCasesQuery } from "@/hooks/useCaseQueries";

const RequestsPage = () => {
  const { data, isLoading } = useGetCasesQuery({
    filters: { status: "PENDING" },
  });

  return (
    <div className="flex w-full flex-col gap-4">
      {isLoading && (
        <div className="flex h-100 items-center justify-center">
          <Spinner />
        </div>
      )}
      {data?.map((caseData) => (
        <CaseCard key={caseData.id} caseData={caseData} />
      ))}
    </div>
  );
};

export default RequestsPage;
