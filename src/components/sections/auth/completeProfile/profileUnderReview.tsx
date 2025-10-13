import { Hourglass } from "lucide-react";
import Spin from "@/assets/spin.svg?react";
import Spinner from "@/components/common/spinner";
import { useTranslation } from "react-i18next";

const ProfileUnderReview = () => {
  const { t } = useTranslation("profileStatus");
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div className="relative flex items-center justify-center">
        <Spin className="h-36 w-36" />
        <Hourglass className="text-primary absolute top-[52%] left-1/2 h-18 w-18 -translate-x-1/2 -translate-y-1/2 rotate-20" />
      </div>
      <h2 className="text-primary max-w-[300px] text-center text-2xl font-semibold">
        {t("pending")}
      </h2>
      <Spinner className="mt-20 h-12 w-12" />
    </div>
  );
};

export default ProfileUnderReview;
