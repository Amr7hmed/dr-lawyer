import MultiStepSignup from "@/components/sections/auth/register/multiStepSignup";
import { MultiStepFormProvider } from "@/contexts/multiStepFormContext";
import { useTranslation } from "react-i18next";

const SignupPage = () => {
  const { t } = useTranslation("signup");
  return (
    <>
      <title>{`Dr-Lawyer | ${t("title")}`}</title>
      <MultiStepFormProvider<{ emailOrPhone: string; token: string }>
        totalSteps={3}
        initialSharedData={{ emailOrPhone: "", token: "" }}
      >
        <MultiStepSignup />
      </MultiStepFormProvider>
    </>
  );
};

export default SignupPage;
