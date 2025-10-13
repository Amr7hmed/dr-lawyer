import { useTranslation } from "react-i18next";
import { Handshake, Headset, Scale, Wallet } from "lucide-react";

export default function FeatureCardsSection() {
  const { t } = useTranslation("clientHome");

  return (
    <section className="">
      <h2 className="mb-6 text-2xl font-bold">{t("featuresTitle")}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-card-border flex items-center gap-2 rounded-xl border bg-white p-6 shadow-sm">
          <div className="bg-accent flex h-13 w-13 shrink-0 items-center justify-center rounded-full">
            <Scale className="text-primary h-8 w-8" />
          </div>
          <p className="text-sm font-medium">{t("feature1")}</p>
        </div>
        <div className="border-card-border flex items-center gap-2 rounded-xl border bg-white p-6 shadow-sm">
          <div className="bg-accent flex h-13 w-13 shrink-0 items-center justify-center rounded-full">
            <Handshake className="text-primary h-8 w-8" />
          </div>
          <p className="text-sm font-medium">{t("feature2")}</p>
        </div>
        <div className="border-card-border flex items-center gap-2 rounded-xl border bg-white p-6 shadow-sm">
          <div className="bg-accent flex h-13 w-13 shrink-0 items-center justify-center rounded-full">
            <Headset className="text-primary h-8 w-8" />
          </div>
          <p className="text-sm font-medium">{t("feature3")}</p>
        </div>
        <div className="border-card-border flex items-center gap-2 rounded-xl border bg-white p-6 shadow-sm">
          <div className="bg-accent flex h-13 w-13 shrink-0 items-center justify-center rounded-full">
            <Wallet className="text-primary h-8 w-8" />
          </div>
          <p className="text-sm font-medium">{t("feature4")}</p>
        </div>
      </div>
    </section>
  );
}
