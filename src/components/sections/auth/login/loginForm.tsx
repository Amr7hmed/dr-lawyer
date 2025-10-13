import InputPassword from "@/components/ui/input-password";

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

import { loginSchema, type LoginFormData } from "@/schema/auth/loginSchema";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLoginMutation } from "@/hooks/useAuthQueries";
import { AlertCircleIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import AuthInput from "../authInput";
import ButtonWithIcon from "../ButtonWithIcon";
import SocialLogin from "../socialLogin";

function LoginForm() {
  const { t } = useTranslation("login");
  const { mutateAsync: login, isPending, error } = useLoginMutation();
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
    mode: "onSubmit",
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginFormData) {
    await login({
      emailOrPhone: values.emailOrPhone,
      password: values.password,
    });
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3 pb-2 text-start">
        <h1 className="text-3xl font-semibold">{t("header")}</h1>
        <p className="text-muted-foreground text-sm text-balance">
          {t("description")}
        </p>
      </div>
      <div className="flex flex-col gap-6">
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
              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputPassword
                        placeholder={t("step1.password")}
                        className="h-12 rounded-4xl px-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Link
                to="/auth/forgot-password"
                className="bg-accent w-fit rounded-4xl px-4 py-2 text-sm font-medium hover:underline"
              >
                {t("step1.forgotPassword")}
              </Link>

              <ButtonWithIcon loading={isPending} type="submit">
                {t("submit")}
              </ButtonWithIcon>
            </div>
          </form>
        </Form>
        <SocialLogin />
        <div className="flex items-center justify-center gap-0.5 text-center text-sm">
          <span>{t("noAccount")}</span>
          <Link
            to="/auth/register"
            className="text-primary font-medium underline underline-offset-4"
          >
            {t("signup")}
          </Link>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
