import LoginForm from "@/components/sections/auth/login/loginForm";
import { useTranslation } from "react-i18next";
const LoginPage = () => {
  const { t } = useTranslation("login");

  return (
    <>
      <title>{`Dr-Lawyer | ${t("title")}`}</title>

      <LoginForm />
    </>
  );
};

export default LoginPage;
