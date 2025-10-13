import { ArrowRight, Check } from "lucide-react";
import ButtonWithIcon from "../ButtonWithIcon";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const ProfileSuccess = () => {
  const { t } = useTranslation("profileStatus");
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-full max-w-[300px] flex-col items-center justify-center gap-10">
        <div className="bg-primary relative flex h-40 w-40 items-center justify-center rounded-full">
          <Check className="h-20 w-20 text-white" />
          <div className="bg-primary absolute -top-7 -left-5 h-5 w-5 rounded-full"></div>
          <div className="bg-primary absolute bottom-5 -left-5 h-3 w-3 rounded-full"></div>
          <div className="bg-primary absolute -top-0 -right-7 h-4 w-4 rounded-full"></div>
          <div className="bg-primary absolute -right-2 -bottom-2 h-1.5 w-1.5 rounded-full"></div>
        </div>
        <h2 className="text-center text-2xl font-bold text-black">
          {t("success")}
        </h2>
        <Link className="w-full" to="/" replace>
          <ButtonWithIcon
            icon={<ArrowRight className="text-white rtl:rotate-180" />}
            className="text-primary h-12 w-full bg-[#F6EFE3] font-semibold hover:text-white"
          >
            {t("continue")}
          </ButtonWithIcon>
        </Link>
      </div>
    </div>
  );
};

export default ProfileSuccess;
