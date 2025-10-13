import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { ProfileSetupFormData } from "@/schema/auth/profileSetupSchema";
import { useFormContext } from "react-hook-form";
import AuthInput from "../authInput";
import { useTranslation } from "react-i18next";

const XpSelect = () => {
  const { control } = useFormContext<ProfileSetupFormData>();
  const { t } = useTranslation("profileSetup");
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-2 text-base font-semibold">
              {t("step2.experience")}
            </FormLabel>
            <FormControl>
              <AuthInput type="number" min={0} step={1} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default XpSelect;
