import { AnimatePresence, motion } from "motion/react";

import { useMultiStepForm } from "@/contexts/multiStepFormContext";

import OTPVerification from "../otpVerification";
import ForgotPwStep1 from "./forgotPwStep1";
import ForgotPwStep3 from "./forgotPwStep3";

const steps = [
  { id: "step1", component: <ForgotPwStep1 /> },
  { id: "step2", component: <OTPVerification page="forgotPassword" /> },
  { id: "step3", component: <ForgotPwStep3 /> },
];

const MultiStepForgotPw = () => {
  const { currentStep } = useMultiStepForm();

  const StepComponent = steps[currentStep - 1].component;

  return (
    <div className="flex w-full flex-col gap-6">
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
    </div>
  );
};

export default MultiStepForgotPw;
