import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { type ProfileSetupFormData } from "@/schema/auth/profileSetupSchema";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import AuthInput from "../authInput";
import { useTranslation } from "react-i18next";

export default function LicenseDetails() {
  const { control, clearErrors, setValue } =
    useFormContext<ProfileSetupFormData>();

  const { t } = useTranslation("profileSetup");

  const enabled = useWatch({ control, name: "achievements.isHave" });
  const name = useWatch({ control, name: "achievements.details.0.name" });
  const by = useWatch({ control, name: "achievements.details.0.by" });
  const year = useWatch({ control, name: "achievements.details.0.year" });

  // Disable button if any field has a value
  const hasDetails = !!(
    name?.trim() ||
    by?.trim() ||
    (year !== ("" as unknown as number) && !isNaN(Number(year)))
  );

  // Auto-enable license info when user types
  useEffect(() => {
    if (hasDetails && !enabled) {
      setValue("achievements.isHave", true);
    }
  }, [hasDetails, enabled, setValue]);

  const disableCertificate = () => {
    if (enabled) {
      setValue("achievements.isHave", false);
      setValue("achievements.details.0.name", "");
      setValue("achievements.details.0.by", "");
      setValue("achievements.details.0.year", "" as unknown as number);

      clearErrors([
        "achievements.details.0.name",
        "achievements.details.0.by",
        "achievements.details.0.year",
      ]);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-semibold">{t("step10.title")}</h3>
      </div>

      {/* Certificate Name */}
      <FormField
        control={control}
        name="achievements.details.0.name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <AuthInput placeholder={t("step10.name")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Certified By */}
      <FormField
        control={control}
        name="achievements.details.0.by"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <AuthInput placeholder={t("step10.by")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Year */}
      <FormField
        control={control}
        name="achievements.details.0.year"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <AuthInput
                placeholder={t("step10.year")}
                type="number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Toggle Button */}
      <Button
        type="button"
        onClick={disableCertificate}
        variant="outline"
        className={cn(
          "bg-accent text-muted-foreground mt-2 h-12 w-full rounded-full text-sm font-medium",
          !enabled && "text-primary border-primary border-2 bg-white",
        )}
      >
        {t("step10.none")}
      </Button>
    </div>
  );
}
