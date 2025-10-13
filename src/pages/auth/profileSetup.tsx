import MultiStepProfileForm from "@/components/sections/auth/completeProfile/multiStepProfileForm";
import { MultiStepFormProvider } from "@/contexts/multiStepFormContext";
import { useTranslation } from "react-i18next";
const LoginPage = () => {
  const { t } = useTranslation("profileSetup");

  return (
    <>
      <title>{`Dr-Lawyer | ${t("title")}`}</title>
      <MultiStepFormProvider totalSteps={10} initialSharedData={null}>
        <MultiStepProfileForm />
      </MultiStepFormProvider>
    </>
  );
};

export default LoginPage;
