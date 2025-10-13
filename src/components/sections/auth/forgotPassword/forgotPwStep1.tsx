import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMultiStepForm } from "@/contexts/multiStepFormContext";
import { useForgotPasswordMutation } from "@/hooks/useAuthQueries";
import {
  ForgotPwSchema,
  type ForgotPwFormData,
} from "@/schema/auth/forgotPwSchema";
import { AlertCircleIcon, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import AuthInput from "../authInput";
import ButtonWithIcon from "../ButtonWithIcon";

function ForgotPwStep1() {
  const { nextStep, updateSharedData } = useMultiStepForm<{
    token: string;
    emailOrPhone: string;
  }>();
  const {
    mutateAsync: forgotPassword,
    isPending,
    error,
  } = useForgotPasswordMutation({
    onSuccess(_, variables) {
      updateSharedData({
        data: { emailOrPhone: variables.emailOrPhone },
      });
      nextStep();
    },
  });
  const { t } = useTranslation("forgotPassword");
  const methods = useForm<ForgotPwFormData>({
    resolver: zodResolver(ForgotPwSchema),
    defaultValues: {
      emailOrPhone: "",
    },
    mode: "onSubmit",
  });

  // 2. Define a submit handler.
  async function onSubmit(values: ForgotPwFormData) {
    await forgotPassword(values);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 pb-4 text-start">
        <h1 className="text-3xl font-semibold">{t("header")}</h1>
        <p className="text-muted-foreground text-sm text-balance">
          {t("description")}
        </p>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertDescription>
            {error.response?.data.message || t("error")}
          </AlertDescription>
        </Alert>
      )}
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="grid gap-6">
            <FormField
              control={methods.control}
              name="emailOrPhone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AuthInput placeholder={t("step1.email")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ButtonWithIcon
              loading={isPending || methods.formState.isSubmitting}
              icon={<ArrowRight className="h-4 w-4 text-white" />}
              type="submit"
            >
              {t("submit")}
            </ButtonWithIcon>
          </div>
        </form>
      </Form>
      <div className="mt-4 flex items-center justify-center gap-0.5 text-center text-sm">
        <span>{t("login")}</span>
        <Link
          to="/auth/login"
          className="text-primary font-medium underline underline-offset-4"
        >
          {t("signin")}
        </Link>
      </div>
    </div>
  );
}
export default ForgotPwStep1;
