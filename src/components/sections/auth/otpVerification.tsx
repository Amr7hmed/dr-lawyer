import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useMultiStepForm } from "@/contexts/multiStepFormContext";
import { useVerifyOtpMutation } from "@/hooks/useAuthQueries";
import { OTPSchema, type OTPFormData } from "@/schema/auth/loginSchema";
import { AlertCircleIcon, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import ButtonWithIcon from "./ButtonWithIcon";
import OTPResendButton from "./otpResendButton";

type OTPVerificationProps = {
  page?: "signup" | "forgotPassword";
};

const OTPVerification = ({ page = "signup" }: OTPVerificationProps) => {
  const { t } = useTranslation(page);
  const {
    sharedData: { emailOrPhone },
    updateSharedData,
    nextStep,
  } = useMultiStepForm<{
    emailOrPhone: string;
    token: string;
  }>();

  const {
    mutateAsync: verifyOtp,
    isPending,
    error,
  } = useVerifyOtpMutation({
    onSuccess(data) {
      updateSharedData({
        data: {
          token:
            page === "signup"
              ? data.data.temporaryToken
              : data.data.resetPasswordToken,
        },
      });
      nextStep();
    },
  });
  const methods = useForm<OTPFormData>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onSubmit",
  });
  async function onSubmit(data: OTPFormData) {
    await verifyOtp({
      otp: data.otp,
      emailOrPhone,
      type:
        page === "signup"
          ? "SIGNUP"
          : page === "forgotPassword"
            ? "PASSWORD_RESET"
            : "LOGIN_2FA",
    });
  }
  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertDescription>
                {error.response?.data.message}
              </AlertDescription>
            </Alert>
          )}
          <FormField
            control={methods.control}
            name="otp"
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <FormItem>
                  <div>
                    <div className="text-lg font-semibold">
                      {t("otp.label")}
                    </div>
                    <FormDescription className="mb-4 flex flex-col">
                      <span>{t("otp.description")}</span>
                      <span className="font-medium text-black">
                        {emailOrPhone}
                      </span>
                    </FormDescription>
                  </div>

                  <FormControl>
                    <InputOTP
                      maxLength={5}
                      onChange={(value: string) => {
                        const alphanumeric = value.replace(/[^a-zA-Z0-9]/g, "");
                        onChange(alphanumeric);
                      }}
                      {...rest}
                    >
                      <InputOTPGroup className="gap-4 rtl:flex-row-reverse">
                        <InputOTPSlot
                          className="border-muted-foreground/40 h-12 w-12 rounded-full first:rounded-l-full first:border-l last:rounded-r-full"
                          index={0}
                        />
                        <InputOTPSlot
                          className="border-muted-foreground/40 h-12 w-12 rounded-full border-l"
                          index={1}
                        />
                        <InputOTPSlot
                          className="border-muted-foreground/40 h-12 w-12 rounded-full border-l"
                          index={2}
                        />
                        <InputOTPSlot
                          className="border-muted-foreground/40 h-12 w-12 rounded-full border-l"
                          index={3}
                        />
                        <InputOTPSlot
                          className="border-muted-foreground/40 h-12 w-12 rounded-full border-l first:rounded-l-full first:border-l last:rounded-r-full"
                          index={4}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <OTPResendButton mode={page}>{t("otp.resend")}</OTPResendButton>
        </div>
        <ButtonWithIcon
          loading={isPending || methods.formState.isSubmitting}
          type="submit"
          size="lg"
          icon={<ArrowRight className="h-4 w-4 text-white" />}
        >
          {t("submit")}
        </ButtonWithIcon>
      </form>
    </Form>
  );
};

export default OTPVerification;
