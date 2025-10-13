import CaseForm from "@/components/sections/client/createCase/caseForm";
import Container from "@/components/ui/container";
import { useTranslation } from "react-i18next";

const CreateRequestPage = () => {
  const { t } = useTranslation("createCase");

  return (
    <>
      <title>{`Dr-Lawyer | ${t("header")}`}</title>
      <Container className="my-6 flex flex-col gap-6">
        <h2 className="text-2xl font-bold">{t("header")}</h2>
        <CaseForm />
      </Container>
    </>
  );
};

export default CreateRequestPage;
