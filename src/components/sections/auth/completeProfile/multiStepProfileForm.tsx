import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, type FieldPath } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  getProfileDefaults,
  profileSetupFormSchema,
  type ClientData,
  type LawyerData,
  type ProfileSetupFormData,
} from "@/schema/auth/profileSetupSchema";
import { AlertCircleIcon, ArrowRight } from "lucide-react";
import { useEffect, type JSX } from "react";

import LoadingButton from "@/components/ui/loading-button";
import { useMultiStepForm } from "@/contexts/multiStepFormContext";
import { useProfileSetupMutation } from "@/hooks/useUserQueries";
import { transformProfilePayload } from "@/lib/utils";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Availability from "./availability";
import IDCardUpload from "./idCard";
import LicenseCertificate from "./licenseCertificate";
import LicenseDetails from "./licenseDetails";
import LocationSelect from "./locationSelect";
import ProfilePicture from "./profilePic";
import ProfileStep1 from "./profileStep1";
import ProfileStep2 from "./profileStep2";
import RatePerHour from "./ratePerHour";
import Specialization from "./specializations";
import XpSelect from "./xpSelect";
import { useQueryClient } from "@tanstack/react-query";
import { authKeys } from "@/hooks/useAuthQueries";
import { useAuthStore } from "@/store/authStore";
import { useShallow } from "zustand/shallow";
import LawyerFinalForm from "./profileSetupLawyer/lawyerFinalForm";
type LawyerStep = {
  id: string;
  component: JSX.Element;
  fields: FieldPath<LawyerData>[];
};

type ClientStep = {
  id: string;
  component: JSX.Element;
  fields: FieldPath<ClientData>[];
};
const lawyerSteps: LawyerStep[] = [
  {
    id: "step1",
    component: <ProfileStep1 />,
    fields: ["fullName", "gender", "role"],
  },
  {
    id: "step2",
    component: (
      <ProfileStep2>
        <XpSelect />
      </ProfileStep2>
    ),
    fields: ["languages", "experience"],
  },
  {
    id: "step3",
    component: <LocationSelect />,
    fields: ["country", "city", "address", "postalCode", "countryCode"],
  },
  {
    id: "step4",
    component: <RatePerHour />,
    fields: ["consultationRate", "rateCurrency"],
  },
  {
    id: "step5",
    component: <Specialization />,
    fields: ["specializations"],
  },
  {
    id: "step6",
    component: <Availability />,
    fields: ["availability"],
  },
  {
    id: "step7",
    component: <ProfilePicture />,
    fields: ["profileImage"],
  },
  {
    id: "step8",
    component: <IDCardUpload />,
    fields: ["idCardFront", "idCardBack", "agreedToTerms"],
  },
  {
    id: "step9",
    component: <LicenseCertificate />,
    fields: ["licenseCertificate", "agreedToTerms", "companyCertificate"],
  },
  {
    id: "step10",
    component: <LicenseDetails />,
    fields: ["achievements"],
  },
  {
    id: "step11",
    component: <LawyerFinalForm />,
    fields: ["achievements"],
  },
];

const clientSteps: ClientStep[] = [
  {
    id: "step1",
    component: <ProfileStep1 />,
    fields: ["fullName", "gender", "role"],
  },
  {
    id: "step2",
    component: <ProfileStep2 />,
    fields: ["languages"],
  },
  {
    id: "step3",
    component: <ProfilePicture />,
    fields: ["profileImage"],
  },
];

const getSteps = (role: "lawyer" | "client" | undefined) => {
  if (!role || role === "client") return clientSteps;
  return lawyerSteps;
};

const MultiStepProfileForm = () => {
  //   const { t } = useTranslation("login");
  const methods = useForm<ProfileSetupFormData>({
    resolver: zodResolver(profileSetupFormSchema),
    defaultValues: getProfileDefaults("lawyer"),
    mode: "onSubmit",
  });

  const { updateUser } = useAuthStore(
    useShallow((state) => ({
      updateUser: state.updateUser,
    })),
  );

  const { t } = useTranslation("profileSetup");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const role = useWatch({
    name: "role",
    defaultValue: "lawyer",
    control: methods.control,
  });

  const steps = getSteps(role);

  const {
    currentStep,
    isFirstStep,
    isLastStep,
    updateStepsCount,
    nextStep,
    prevStep,
    stepsCount,
  } = useMultiStepForm();

  useEffect(() => {
    updateStepsCount(steps.length);
  }, [updateStepsCount, steps.length]);

  const {
    mutateAsync: profileSetup,
    isPending,
    error,
  } = useProfileSetupMutation({
    onError(error) {
      const responseData = error?.response?.data.message;

      if (responseData && typeof responseData === "object") {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(responseData).forEach(([field, _]) => {
          methods.setError(field as keyof ProfileSetupFormData, {
            type: "server",
            message: "Invalid value", // You can use (messages as string[])[0] if needed
          });
        });
      }
    },
    onSuccess(data) {
      setTimeout(() => {
        navigate("/profile-setup/status", {
          replace: true,
          state: {
            status: data.data.status,
          },
        });
      }, 0);

      updateUser(data.data);
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });

  const percentage = (currentStep / stepsCount) * 100;

  async function onSubmit(values: ProfileSetupFormData) {
    const transformedValues = transformProfilePayload(values);

    await profileSetup(transformedValues);
  }

  const nextStepHandler = async () => {
    const result = await methods.trigger(steps[currentStep - 1].fields);
    if (result) nextStep();
  };
  return (
    <div className="flex w-full flex-col gap-6 overflow-hidden">
      <div className="flex flex-col gap-3 pb-2 text-start">
        <h1 className="text-3xl font-semibold">{t("header")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
        <Progress value={percentage} className="w-full" />
      </div>
      {error && (
        <Alert variant={"destructive"}>
          <AlertCircleIcon />
          <AlertDescription>
            {typeof error?.response?.data.message === "object"
              ? t("error")
              : error?.response?.data.message || error.message}
          </AlertDescription>
        </Alert>
      )}
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={steps[currentStep - 1].id}
              initial={currentStep === 1 ? false : { x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-1"
            >
              {steps[currentStep - 1].component}
              {/* {lawyerSteps[9].component} */}
            </motion.div>
          </AnimatePresence>

          {!(
            (role === "client" && isLastStep) ||
            [7, 8, 9].includes(currentStep)
          ) && (
            <div className="mt-4 flex items-center justify-between">
              
              <Button
                onClick={prevStep}
                disabled={isFirstStep}
                variant="secondary"
                type="button"
                size={"icon"}
                className="h-11 w-11 rounded-full"
              >
                <ArrowRight className="w-8 ltr:rotate-180" />
              </Button>
              {isLastStep ? (
                <LoadingButton
                  type="submit"
                  loading={methods.formState.isSubmitting || isPending}
                  className="h-11 rounded-full px-5!"
                >
                  {t("next")} <ArrowRight className="rtl:rotate-180" />
                </LoadingButton>
              ) : (
                <Button
                  onClick={nextStepHandler}
                  type="button"
                  className="h-11 rounded-full px-5!"
                >
                  {t("next")} <ArrowRight className="rtl:rotate-180" />
                </Button>
              )}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default MultiStepProfileForm;
