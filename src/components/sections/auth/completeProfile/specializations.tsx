import Spinner from "@/components/common/spinner";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSpecializationsQuery } from "@/hooks/useConstansQueries";
import { cn } from "@/lib/utils";
import type { ProfileSetupFormData } from "@/schema/auth/profileSetupSchema";
import type { SpecializationsSubCategory } from "@/types/constants";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function Specialization() {
  const { control, setValue, getValues } =
    useFormContext<ProfileSetupFormData>();

  const specialization = useWatch({
    control,
    name: "specializations",
  });

  const { t } = useTranslation("profileSetup");

  const { data, isLoading, error } = useSpecializationsQuery();

  useEffect(() => {
    if (error) {
      toast.error(t("step5.toastError"));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const toggleSpecialization = (categoryCode: string, itemCode: string) => {
    const current = getValues("specializations") || {};
    const selected = current[categoryCode] || [];

    const newSelection = selected.includes(itemCode)
      ? selected.filter((i) => i !== itemCode)
      : [...selected, itemCode];

    const updated = {
      ...current,
      [categoryCode]: newSelection,
    };

    if (updated[categoryCode].length === 0) {
      delete updated[categoryCode];
    }

    setValue("specializations", updated, { shouldValidate: true });
  };

  const isSelected = (categoryCode: string, itemCode: string) =>
    specialization?.[categoryCode]?.includes(itemCode);

  const TagButton = ({
    categoryCode,
    item,
  }: {
    categoryCode: string;
    item: SpecializationsSubCategory;
  }) => (
    <button
      type="button"
      onClick={() => toggleSpecialization(categoryCode, item.code)}
      className={cn(
        "cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors",
        isSelected(categoryCode, item.code)
          ? "bg-primary-deep text-white"
          : "bg-accent hover:bg-secondary text-black",
      )}
    >
      {item.name}
    </button>
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-xl font-bold">{t("step5.title")}</h4>
        <p className="text-muted-foreground">{t("step5.description")}</p>
      </div>
      <FormField
        control={control}
        name="specializations"
        render={() => (
          <FormItem className="flex-1">
            <FormControl>
              <div className="flex flex-col gap-6">
                {isLoading && (
                  <div className="flex h-[200px] w-full items-center justify-center">
                    <Spinner className="h-12 w-12" />
                  </div>
                )}
                {error && (
                  <div className="text-destructive text-sm">
                    {t("step5.error")}
                  </div>
                )}
                {data?.map(({ code: categoryCode, name, children }) => (
                  <div key={categoryCode}>
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">
                      {name}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {children.map((item) => (
                        <TagButton
                          key={item.code}
                          categoryCode={categoryCode}
                          item={item}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage className="mt-4" />
          </FormItem>
        )}
      />
    </div>
  );
}
