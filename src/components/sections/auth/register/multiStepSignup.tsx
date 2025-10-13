import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router";
import SocialLogin from "../socialLogin";

import { useMultiStepForm } from "@/contexts/multiStepFormContext";
import { useTranslation } from "react-i18next";

import SignupStep1 from "./signupStep1";
import SignupStep3 from "./signupStep3";
import OTPVerification from "../otpVerification";

const steps = [
  { id: "step1", component: <SignupStep1 /> },
  { id: "step2", component: <OTPVerification page="signup" /> },
  { id: "step3", component: <SignupStep3 /> },
];

const MultiStepSignup = () => {
  const { currentStep, isLastStep } = useMultiStepForm();

  const { t } = useTranslation("signup");

  const StepComponent = steps[currentStep - 1].component;

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3 text-start">
        <h1 className="text-3xl font-semibold">{t("header")}</h1>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={steps[currentStep - 1].id}
          initial={currentStep === 1 ? false : { x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {StepComponent}
        </motion.div>
      </AnimatePresence>

      {!isLastStep && (
        <>
          <SocialLogin />
          <div className="flex items-center justify-center gap-0.5 text-center text-sm">
            <span>{t("haveAccount")}</span>
            <Link
              to="/auth/login"
              className="text-primary font-medium underline underline-offset-4"
            >
              {t("signin")}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MultiStepSignup;
