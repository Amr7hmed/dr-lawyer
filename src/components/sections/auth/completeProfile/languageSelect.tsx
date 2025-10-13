import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import flags from "react-phone-number-input/flags";
import type { ProfileSetupFormData } from "@/schema/auth/profileSetupSchema";

import { Check, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import InputWithIcon from "../inputWithIcon";
import type { FlagProps } from "react-phone-number-input";
import { useTranslation } from "react-i18next";
import { useLanguagesQuery } from "@/hooks/useConstansQueries";
import Spinner from "@/components/common/spinner";

export default function LanguageSelect() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useLanguagesQuery();

  const { control, setValue } = useFormContext<ProfileSetupFormData>();
  const { t } = useTranslation("profileSetup");

  // useWatch subscribes only to the needed piece of state (prevents extra re-renders)
  const selectedLanguages = useWatch({
    control,
    name: "languages",
  });

  /* ----------  Derived data  ---------- */
  const filteredLanguages = useMemo(
    () =>
      data?.filter((l) =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, data],
  );

  /* ----------  Callback helpers  ---------- */
  const toggleLanguage = useCallback(
    (code: string) => {
      const currentSelected = selectedLanguages ?? [];
      const newSelected = currentSelected.includes(code)
        ? currentSelected.filter((x) => x !== code)
        : [...currentSelected, code];
      setValue("languages", newSelected);
    },
    [selectedLanguages, setValue],
  );

  const handleClearAll = useCallback(
    () => setValue("languages", []),
    [setValue],
  );

  /* ----------  UI  ---------- */
  return (
    <motion.div layout className="flex flex-col gap-6">
      <h3 className="text-lg font-semibold">{t("step2.title")}</h3>

      <AnimatePresence>
        {selectedLanguages && selectedLanguages.length > 0 && (
          <motion.div
            key="selected-languages"
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-secondary rounded-2xl border p-4">
              <h3 className="mb-3 text-sm font-medium text-gray-700">
                {t("step2.selected")} ({selectedLanguages.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {selectedLanguages.map((code) => {
                    const language = data?.find((l) => l.code === code);
                    const Flag = flags[language?.flag as FlagProps["country"]];
                    return (
                      <motion.div
                        key={language?.code}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm"
                      >
                        {Flag && (
                          <span className="flex h-4 w-4 items-center justify-center">
                            <Flag title={language!.name} />
                          </span>
                        )}
                        <span className="font-medium">{language?.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleLanguage(language!.code)}
                          className="h-4 w-4 rounded-full"
                        >
                          <X className="h-3 w-3 text-red-600" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}

      <InputWithIcon
        icon={<Search className="text-muted-foreground" />}
        placeholder={t("step2.searchPlaceholder")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* List */}
      <div className="bg-secondary rounded-2xl pr-2 pb-4 pl-4">
        <div className="mb-4 flex items-center justify-between pt-4 pr-2">
          <h2 className="text-muted-foreground text-base font-medium">
            {t("step2.languagesLabel")}
          </h2>
          <Button
            variant="outline"
            disabled={!selectedLanguages?.length}
            size="sm"
            type="button"
            onClick={handleClearAll}
          >
            {t("step2.clear")}
          </Button>
        </div>

        {/* Controller only wraps the list – keeps RHF in sync */}
        <FormField
          control={control}
          name="languages"
          render={() => (
            <FormItem>
              <FormControl>
                {isLoading ? (
                  <div className="flex h-64 items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <ScrollArea className="h-64 w-full">
                    <div className="w-full space-y-2 pr-4">
                      {filteredLanguages && filteredLanguages.length > 0 ? (
                        filteredLanguages.map((lang) => {
                          const isSelected =
                            selectedLanguages?.includes(lang.code) ?? false;
                          const Flag =
                            flags[lang?.flag as FlagProps["country"]];
                          return (
                            <Button
                              key={lang.code}
                              type="button"
                              variant="ghost"
                              onClick={() => toggleLanguage(lang.code)}
                              className={`h-auto w-full justify-between rounded-full border-2 bg-white px-6 py-2 text-left transition-all rtl:flex-row-reverse ${
                                isSelected
                                  ? "border-primary text-black"
                                  : "text-muted-foreground border-muted-foreground/40"
                              }`}
                            >
                              <div className="flex items-center gap-2 rtl:flex-row-reverse">
                                {Flag && (
                                  <span className="flex h-5 w-5 items-center justify-center">
                                    <Flag title={lang.name} />
                                  </span>
                                )}
                                <span className="text-base font-medium">
                                  {lang.name}
                                </span>
                              </div>
                              {isSelected && (
                                <div className="bg-primary rounded-full p-1">
                                  <Check className="h-3.5! w-3.5! text-white" />
                                </div>
                              )}
                            </Button>
                          );
                        })
                      ) : (
                        <div className="text-muted-foreground flex h-60 w-full items-center justify-center text-center text-sm">
                          {t("step2.languagesEmpty")}
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                )}
              </FormControl>
              <FormMessage className="pt-2" />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );
}
