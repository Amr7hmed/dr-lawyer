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

import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMultiStepForm } from "@/contexts/multiStepFormContext";
import { useSetPasswordMutation } from "@/hooks/useAuthQueries";
import {
  registerPasswordSchema,
  type RegisterPasswordFormData,
} from "@/schema/auth/signup";
import { AlertCircleIcon, ArrowRight, LockKeyhole } from "lucide-react";
import { useTranslation } from "react-i18next";
import ButtonWithIcon from "../ButtonWithIcon";
import InputWithIcon from "../inputWithIcon";
import { useNavigate } from "react-router";

const SignupStep3 = () => {
  const { t } = useTranslation("signup");
  const navigate = useNavigate();
  const {
    sharedData: { token },
  } = useMultiStepForm<{ emailOrPhone: string; token: string }>();

  const {
    mutateAsync: setPassword,
    isPending,
    error,
  } = useSetPasswordMutation({
    onSuccess() {
      navigate("/auth/login");
    },
  });
  const methods = useForm<RegisterPasswordFormData>({
    resolver: zodResolver(registerPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterPasswordFormData) {
    await setPassword({
      setPasswordToken: token,
      password: values.password,
    });
  }
  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertDescription>{error.response?.data.message}</AlertDescription>
          </Alert>
        )}
        <div>
          <h2 className="text-lg font-semibold">{t("step3.title")}</h2>
          <FormDescription className="mb-4">
            {t("step3.description")}
          </FormDescription>
        </div>
        <div className="grid gap-6">
          <FormField
            control={methods.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithIcon
                    icon={
                      <LockKeyhole className="text-muted-foreground/60 h-4.5 w-4.5" />
                    }
                    type="password"
                    placeholder={t("step3.password")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithIcon
                    icon={
                      <LockKeyhole className="text-muted-foreground/60 h-4.5 w-4.5" />
                    }
                    type="password"
                    placeholder={t("step3.confirmPassword")}
                    {...field}
                  />
                </FormControl>
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

export default SignupStep3;
