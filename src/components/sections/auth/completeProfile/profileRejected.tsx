import { Button } from "@/components/ui/button";
import { Check, IdCard, Image } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const ProfileRejected = () => {
  const { t } = useTranslation("profileStatus");
  return (
    <div className="flex h-full w-full max-w-sm flex-col items-center justify-center py-4">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <div className="bg-primary relative flex h-40 w-40 items-center justify-center rounded-full">
          <Check className="h-20 w-20 text-white" />
          <div className="bg-primary absolute -top-7 -left-5 h-5 w-5 rounded-full"></div>
          <div className="bg-primary absolute bottom-5 -left-5 h-3 w-3 rounded-full"></div>
          <div className="bg-primary absolute -top-0 -right-7 h-4 w-4 rounded-full"></div>
          <div className="bg-primary absolute -right-2 -bottom-2 h-1.5 w-1.5 rounded-full"></div>
        </div>
        <h2 className="max-w-[300px] text-center text-2xl font-bold text-black">
          {t("rejected")}
        </h2>
        <div className="flex w-full flex-col gap-4">
          <div className="border-border flex w-full items-center gap-3 rounded-full border px-6 py-4 text-sm">
            <span className="bg-primary rounded-full p-2">
              <Image className="h-5 w-5 text-white" />
            </span>
            <p className="font-semibold">{t("rejectedMsg1")}</p>
          </div>
          <div className="border-border flex w-full items-center gap-3 rounded-full border px-6 py-4 text-sm">
            <span className="bg-primary rounded-full p-2">
              <Image className="h-5 w-5 text-white" />
            </span>
            <p className="font-semibold">{t("rejectedMsg2")}</p>
          </div>
          <div className="border-border flex w-full items-center gap-3 rounded-full border px-6 py-4 text-sm">
            <span className="bg-primary rounded-full p-2">
              <IdCard className="h-5 w-5 text-white" />
            </span>
            <p className="font-semibold">{t("rejectedMsg3")}</p>
          </div>
        </div>
        <Link
          className="w-full"
          to="/profile-setup"
          replace
          state={{ type: "REJECTED" }}
        >
          <Button className="text-primary h-12 w-full rounded-full bg-[#F6EFE3] font-semibold hover:text-white">
            {t("understand")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileRejected;
