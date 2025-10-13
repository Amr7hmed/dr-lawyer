import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrenciesQuery } from "@/hooks/useConstansQueries";
import { cn } from "@/lib/utils";
import type { ProfileSetupFormData } from "@/schema/auth/profileSetupSchema";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const RatePerHour = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProfileSetupFormData>();
  const { data, isLoading } = useCurrenciesQuery();
  const { t } = useTranslation("profileSetup");

  return (
    <div className="mt-4 flex flex-col gap-4">
      <h3 className="text-base font-semibold">{t("step4.title")}</h3>
      {/* Rate per hour */}
      <div className="flex items-start">
        <FormField
          control={control}
          name="rateCurrency"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="border-border h-12! w-full rounded-4xl px-4 text-sm ltr:rounded-e-none rtl:rounded-s-none rtl:rounded-e-4xl">
                    <SelectValue placeholder={t("step4.currency")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoading && (
                    <div className="text-muted-foreground p-2 text-sm">
                      {t("step4.loading")}
                    </div>
                  )}
                  {data &&
                    data.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="consultationRate"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative">
                  <span className="text-muted-foreground absolute top-1/2 -translate-y-1/2 text-sm ltr:right-4 rtl:left-4">
                    {t("step4.h")}
                  </span>
                  <Input
                    className={cn(
                      "border-border h-12 rounded-4xl rounded-s-none border border-s-0 ltr:pe-10 rtl:pe-16",
                      // @ts-expect-error -- ignore
                      errors.consultationRate && "border-destructive",
                    )}
                    type="number"
                    {...field}
                  />
                </div>
              </FormControl>

              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RatePerHour;
