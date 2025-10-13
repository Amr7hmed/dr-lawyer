import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import ar from "react-phone-number-input/locale/ar.json";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { useMultiStepForm } from "@/contexts/multiStepFormContext";
import { useRegisterMutation } from "@/hooks/useAuthQueries";
import {
  registerPhoneSchema,
  type RegisterPhoneFormData,
} from "@/schema/auth/signup";
import { AlertCircleIcon, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import ButtonWithIcon from "../ButtonWithIcon";

export default function SignupPhone() {
  const { i18n, t } = useTranslation("signup");
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
        data: { emailOrPhone: variables.phone },
      });
      nextStep();
    },
  });
  const language = i18n.language;

  const methods = useForm<RegisterPhoneFormData>({
    resolver: zodResolver(registerPhoneSchema),
    defaultValues: {
      phone: "",
      isAccepted: false,
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: RegisterPhoneFormData) {
    await register({ phone: data.phone });
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
        <div className="grid gap-6">
          <FormField
            control={methods.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <div>
                  <h2 className="text-lg font-semibold">{t("step1.label")}</h2>
                  <FormDescription>
                    {t("step1.phoneDescription")}
                  </FormDescription>
                </div>
                <FormControl className="mt-4 w-full">
                  <PhoneInput
                    labels={language === "ar" ? ar : undefined}
                    placeholder={t("step1.phonePlaceholder")}
                    international
                    defaultCountry="AE"
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
}
