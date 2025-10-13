import { Country, State, type ICountry, type IState } from "country-state-city";
import { ChevronsUpDown } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { FixedSizeList as List } from "react-window";
import flags from "react-phone-number-input/flags";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import type { ProfileSetupFormData } from "@/schema/auth/profileSetupSchema";
import { lazy, useEffect, useMemo, useRef, useState } from "react";
import AuthInput from "../authInput";

import type { FlagProps } from "react-phone-number-input";
import Loadable from "@/components/common/loadable";
import { useTranslation } from "react-i18next";

const MapModal = Loadable(lazy(() => import("./mapModal")));

const ITEM_HEIGHT = 40;
const LIST_HEIGHT = 250;

export default function LocationSelect() {
  const { control, setValue } = useFormContext<ProfileSetupFormData>();
  const selectedCountryCode = useWatch({
    control,
    name: "countryCode",
  });
  const selectedCity = useWatch({ control, name: "city" });

  const countries = useMemo(() => Country.getAllCountries(), []);
  const [cityList, setCityList] = useState<IState[]>([]);
  const [city, setCity] = useState(selectedCity);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { t } = useTranslation("profileSetup");

  const filteredCountries = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    return countries.filter((c) => c.name.toLowerCase().includes(term));
  }, [countries, debouncedSearch]);

  const selectedCountry = countries.find(
    (c) => c.isoCode === selectedCountryCode,
  );
  const selectedIndex = filteredCountries.findIndex(
    (c) => c.isoCode === selectedCountryCode,
  );

  const listRef = useRef<List>(null);

  useEffect(() => {
    async function detectCountryFromIP() {
      try {
        const res = await fetch("https://ipapi.co/json/");

        if (!res.ok) return; // silently fail

        const data = await res.json();
        const code = data.country_code;
        const country = Country.getCountryByCode(code)?.name;

        if (code && country) {
          setValue("countryCode", code);
          setValue("country", country);
        }
      } catch {
        // silently ignore error
      }
    }

    if (!selectedCountryCode) {
      detectCountryFromIP();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔘 Simulated map click (call this from your map component)

  useEffect(() => {
    if (selectedCountryCode) {
      const states = State.getStatesOfCountry(selectedCountryCode) || [];
      setCityList(states);

      if (city && states.find((s) => s.name === city)) {
        setTimeout(() => {
          setValue("city", city);
        }, 0);
        setCity("");
      } else {
        setValue("city", "");
      }
    }
  }, [selectedCountryCode, setValue, city]);

  useEffect(() => {
    if (open && selectedIndex > -1) {
      listRef.current?.scrollToItem(selectedIndex, "center");
    }
  }, [open, selectedIndex]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="mb-2 text-lg font-semibold">{t("step3.title")}</h3>

      {/* Country Field */}
      <FormField
        control={control}
        name="countryCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("step3.country")}</FormLabel>
            <Popover
              open={open}
              onOpenChange={(o) => {
                setOpen(o);
                if (!o) setSearch("");
              }}
            >
              <PopoverTrigger asChild>
                <SelectButton selectedCountry={selectedCountry} />
              </PopoverTrigger>
              <PopoverContent className="w-[320px] p-0 sm:w-[420px]">
                <Command shouldFilter={false}>
                  <CommandInput
                    value={search}
                    onValueChange={setSearch}
                    placeholder={t("step3.countryPlaceholder")}
                  />
                  <CommandList className="p-0">
                    <div className="h-[250px]">
                      {filteredCountries.length === 0 ? (
                        <div className="text-muted-foreground py-6 text-center text-sm">
                          {t("step3.countryEmpty")}
                        </div>
                      ) : (
                        <List
                          ref={listRef}
                          height={LIST_HEIGHT}
                          itemCount={filteredCountries.length}
                          itemSize={ITEM_HEIGHT}
                          width={"100%"}
                          itemData={{
                            items: filteredCountries,
                            selected: selectedCountryCode,
                            onChange: (val: string) => {
                              field.onChange(val);
                              setValue(
                                "country",
                                Country.getCountryByCode(val)?.name ?? val,
                              );
                              setOpen(false);
                            },
                          }}
                        >
                          {CountryItem}
                        </List>
                      )}
                    </div>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* City Field */}
      <FormField
        control={control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("step3.city")}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="border-border w-full rounded-4xl px-4 py-6 text-sm">
                  <SelectValue placeholder={t("step3.cityPlaceholder")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {cityList.length === 0 ? (
                  <div className="text-muted-foreground p-2 text-sm">
                    {t("step3.cityEmpty")}
                  </div>
                ) : (
                  cityList.map((city) => (
                    <SelectItem
                      key={city.name}
                      value={city.name}
                      className="rtl:flex-row"
                    >
                      {city.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Address Field */}
      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("step3.address")}</FormLabel>
            <FormControl>
              <AuthInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Postal Code */}
      <FormField
        control={control}
        name="postalCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("step3.postalCode")}</FormLabel>
            <FormControl>
              <AuthInput type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Divider */}
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2 font-light">
          {t("step3.or")}
        </span>
      </div>

      {/* Map Dialog */}
      <MapModal setCity={setCity} />
    </div>
  );
}

const CountryItem = ({
  index,
  style,
  data,
}: {
  index: number;
  style: React.CSSProperties;
  data: {
    items: ICountry[];
    selected: string;
    onChange: (val: string) => void;
  };
}) => {
  const country = data.items[index];
  const isSelected = country.isoCode === data.selected;
  const Flag = flags[country.isoCode as FlagProps["country"]];
  return (
    <div
      style={style}
      className={cn(
        "hover:bg-accent flex cursor-pointer items-center gap-2 px-4 py-2 text-sm",
        isSelected ? "bg-secondary text-accent-foreground" : "",
      )}
      onClick={() => data.onChange(country.isoCode)}
    >
      {Flag && (
        <span className="flex h-4 w-4 items-center justify-center">
          <Flag title={country.name} />
        </span>
      )}
      <span className="flex items-center align-middle">{country.name}</span>
    </div>
  );
};

const SelectButton = ({
  selectedCountry,
  ...props
}: {
  selectedCountry?: ICountry;
}) => {
  const Flag = selectedCountry
    ? flags[selectedCountry?.isoCode as FlagProps["country"]]
    : undefined;
  return (
    <Button
      {...props}
      variant="outline"
      type="button"
      className="w-full justify-between rounded-4xl px-4! py-6 text-sm"
    >
      {selectedCountry ? (
        <div className="flex items-center gap-2">
          {Flag && (
            <span className="flex items-center justify-center">
              <Flag title={selectedCountry.name} />
            </span>
          )}
          <span className="flex items-center align-middle">
            {selectedCountry.name}
          </span>
        </div>
      ) : (
        "Select a country"
      )}
      <ChevronsUpDown className="size-4 opacity-50" />
    </Button>
  );
};
