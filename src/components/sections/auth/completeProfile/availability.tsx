import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { LawyerData } from "@/schema/auth/profileSetupSchema";
import { useFormContext } from "react-hook-form";
import TimezoneSelect from "./timezoneSelect";
import { useTranslation } from "react-i18next";

const dayOrder = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export default function Availability() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<LawyerData>();

  const { t } = useTranslation("profileSetup");

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-bold">{t("step6.title")}</h3>

      <TimezoneSelect />

      <div className="space-y-4">
        <div className="text-muted mb-4 grid grid-cols-4 gap-4 text-sm font-medium">
          <div>{t("step6.day")}</div>
          <div></div>
          <div>{t("step6.from")}</div>
          <div>{t("step6.to")}</div>
        </div>

        {dayOrder.map((dayKey) => {
          const dayEnabled = watch(`availability.days.${dayKey}.enabled`);

          return (
            <div
              key={dayKey}
              className="flex items-start justify-between gap-2"
            >
              <div className="flex items-center gap-3 pt-2">
                <FormField
                  control={control}
                  name={`availability.days.${dayKey}.enabled`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary! bg-muted-foreground!"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <span
                  className={`text-sm ${dayEnabled ? "text-gray-900" : "text-gray-400"}`}
                >
                  {t(`step6.${dayKey}`)}
                </span>
              </div>

              <div className="flex items-start gap-5">
                <FormField
                  control={control}
                  name={`availability.days.${dayKey}.from`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="time"
                          onKeyDown={(e) => {
                            if (e.key === " ") {
                              e.preventDefault(); // prevent native popup
                            }
                          }}
                          disabled={!dayEnabled}
                          className={cn(
                            "border-border appearance-none rounded-4xl text-center text-sm [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
                            !dayEnabled && "bg-stroke text-muted-foreground",
                          )}
                        />
                      </FormControl>
                      <FormMessage className="max-w-23 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`availability.days.${dayKey}.to`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="time"
                          disabled={!dayEnabled}
                          className={cn(
                            "border-border appearance-none rounded-4xl text-center text-sm [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
                            !dayEnabled && "bg-stroke text-muted-foreground",
                          )}
                        />
                      </FormControl>
                      <FormMessage className="max-w-23 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
      {errors.availability?.days && (
        <p className="text-sm text-red-500">
          {errors.availability.days.message}
        </p>
      )}
    </div>
  );
}
