import MultiStepForgotPw from "@/components/sections/auth/forgotPassword/multiStepForgotPw";
import { MultiStepFormProvider } from "@/contexts/multiStepFormContext";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation("forgotPassword");
  return (
    <>
      <title>{`Dr-Lawyer | ${t("title")}`}</title>
      <MultiStepFormProvider<{
        token: string;
        emailOrPhone: string;
      }>
        totalSteps={3}
        initialSharedData={{ token: "", emailOrPhone: "" }}
      >
        <MultiStepForgotPw />
      </MultiStepFormProvider>
    </>
  );
};

export default ForgotPassword;
