import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useMultiStepForm } from "@/contexts/multiStepFormContext";
import { useRegisterMutation } from "@/hooks/useAuthQueries";
import {
  registerEmailSchema,
  type RegisterEmailFormData,
} from "@/schema/auth/signup";
import { AlertCircleIcon, ArrowRight, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import ButtonWithIcon from "../ButtonWithIcon";
import InputWithIcon from "../inputWithIcon";

const SignupEmail = () => {
  const { nextStep, updateSharedData } = useMultiStepForm<{
    emailOrPhone: string;
    token: string;
  }>();
  const {
    mutateAsync: register,
    isPending,
    error,
  } = useRegisterMutation({
    onSuccess(_, variables) {
      updateSharedData({
        data: { emailOrPhone: variables.email },
      });
      nextStep();
    },
  });

  const { t } = useTranslation("signup");
  const methods = useForm<RegisterEmailFormData>({
    resolver: zodResolver(registerEmailSchema),
    defaultValues: {
      email: "",
      isAccepted: false,
    },
    mode: "onSubmit",
  });

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterEmailFormData) {
    await register({ email: values.email });
  }
  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertDescription>
              {error.response?.data.message || t("error")}
            </AlertDescription>
          </Alert>
        )}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{t("step1.emailTitle")} ✉️</h2>
          <FormDescription>{t("step1.emailDescription")}</FormDescription>
        </div>
        <div className="grid gap-6">
          <FormField
            control={methods.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithIcon
                    icon={
                      <Mail className="text-muted-foreground/60 h-4.5 w-4.5" />
                    }
                    type="email"
                    placeholder={t("step1.email")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="isAccepted"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3">
                  <FormControl>
                    <Checkbox
                      id="isAccepted"
                      className="h-5 w-5"
                      checked={field.value}
                      onCheckedChange={
                        field.onChange as (value: boolean) => void
                      }
                    />
                  </FormControl>
                  <Label
                    htmlFor="isAccepted"
                    className="flex flex-wrap text-sm font-light"
                  >
                    <span className="whitespace-nowrap">
                      {t("terms.label")}
                    </span>{" "}
                    <Link
                      className="font-medium whitespace-nowrap underline"
                      to="/terms"
                    >
                      {t("terms.terms")}
                    </Link>{" "}
                    <span>{t("terms.and")}</span>{" "}
                    <Link
                      className="font-medium whitespace-nowrap underline"
                      to="/privacy"
                    >
                      {t("terms.privacy")}
                    </Link>
                  </Label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <ButtonWithIcon
            icon={<ArrowRight className="h-4 w-4 text-white" />}
            loading={isPending || methods.formState.isSubmitting}
            type="submit"
          >
            {t("submit")}
          </ButtonWithIcon>
        </div>
      </form>
    </Form>
  );
};

export default SignupEmail;
