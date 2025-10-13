import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages } from "@/data/languages";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { FlagProps } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const current = languages.find((lang) => lang.code === currentLang);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  const CurrentFlag = flags[current?.flag as FlagProps["country"]];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          className={cn(
            "text-foreground h-9 rounded-4xl border pe-1.5! text-sm font-medium",
            "flex items-center gap-1",
          )}
        >
          {CurrentFlag && <CurrentFlag title={current?.label as string} />}
          {currentLang.toUpperCase()}
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={currentLang === "ar" ? "start" : "end"}>
        {languages.map(({ code, label, flag }) => {
          const CountryFlag = flags[flag as FlagProps["country"]];
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => changeLanguage(code)}
              className="flex items-center justify-between gap-2 rtl:flex-row-reverse"
            >
              <div className="flex items-center gap-2 rtl:flex-row-reverse">
                {CountryFlag && <CountryFlag title={label} />}
                <span className={cn(code === currentLang && "text-black")}>
                  {label}
                </span>
              </div>
              {code === currentLang && (
                <Check className="text-muted-foreground h-4 w-4" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
