import Loader from "@/components/common/loader";
import RequestDetails from "@/components/sections/client/cases/requestDetails";
import { useGetCaseQuery } from "@/hooks/useCaseQueries";
import { Navigate, useParams } from "react-router";

const CaseDetailsPage = () => {
  const { caseId } = useParams();
  const { data, isLoading } = useGetCaseQuery(caseId as string, {
    enabled: !!caseId,
  });
  if (!caseId) {
    return <Navigate to="/not-found" replace />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <Navigate to="/not-found" replace />;
  }

  return <RequestDetails caseData={data} />;
};

export default CaseDetailsPage;
