import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getProfileDefaults,
  type ProfileSetupFormData,
} from "@/schema/auth/profileSetupSchema";
import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AuthInput from "../authInput";

const options = [
  { id: "lawyer", label: "yes" },
  { id: "client", label: "no" },
] as const;

export default function RoleSelect() {
  const { control, reset, getValues } = useFormContext<ProfileSetupFormData>();
  const { t } = useTranslation("profileSetup");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-semibold">{t("step1.role")}</h3>
        <FormField
          control={control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-4">
                  {options.map((option) => {
                    const isSelected = field.value === option.id;
                    return (
                      <Button
                        key={option.id}
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          if (!isSelected) {
                            const current = getValues();
                            const defaults =
                              option.id === "client"
                                ? getProfileDefaults("client") // narrowed to literal "client"
                                : getProfileDefaults("lawyer"); // narrowed to literal "lawyer"

                            reset({
                              ...defaults,
                              // Preserve shared values
                              fullName: current.fullName,
                              gender: current.gender,
                              languages: current.languages,
                              profileImage: current.profileImage,
                            });

                            field.onChange(option.id);
                          }
                        }}
                        className={`h-auto w-full justify-between rounded-full border-2 px-6 py-3 text-left transition-all ${
                          isSelected
                            ? "border-primary text-black"
                            : "text-muted-foreground border-border"
                        }`}
                      >
                        <span className="text-base font-medium">
                          {t(`step1.${option.label}`)}
                        </span>
                        {isSelected && (
                          <div className="bg-primary rounded-full p-1">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </Button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-2 text-base font-semibold">
              {t("step1.name")}
            </FormLabel>
            <FormControl>
              <AuthInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-2 text-base font-semibold">
              {t("step1.gender")}
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="border-border w-full rounded-4xl px-6 py-6">
                  <SelectValue placeholder={t("step1.genderPlaceholder")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem className="px-6" value="male">
                  {t("step1.male")}
                </SelectItem>
                <SelectItem className="px-6" value="female">
                  {t("step1.female")}
                </SelectItem>
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
