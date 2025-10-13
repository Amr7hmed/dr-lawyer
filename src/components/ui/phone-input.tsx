import { ChevronsUpDown } from "lucide-react";
import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { FixedSizeList as List } from "react-window";

import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={cn("flex rtl:flex-row-reverse", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={false}
          value={value || undefined}
          /**
           * Handles the onChange event.
           *
           * react-phone-number-input might trigger the onChange event as undefined
           * when a valid phone number is not entered. To prevent this,
           * the value is coerced to an empty string.
           *
           * @param {E164Number | undefined} value - The entered value
           */
          onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
          {...props}
        />
      );
    },
  );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <Input
    className={cn(
      "border-muted-foreground/40 h-12! rounded-s-none rounded-e-4xl",
      className,
    )}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

// Virtual list item component for react-window
const VirtualCountryItem = React.memo<{
  index: number;
  style: React.CSSProperties;
  data: {
    countries: CountryEntry[];
    selectedCountry: RPNInput.Country;
    onChange: (country: RPNInput.Country) => void;
    onSelectComplete: () => void;
  };
}>(({ index, style, data }) => {
  const { countries, selectedCountry, onChange, onSelectComplete } = data;
  const countryData = countries[index];

  if (!countryData?.value) return null;

  const handleSelect = () => {
    onChange(countryData.value!);
    onSelectComplete();
  };

  return (
    <div style={style} className="px-2">
      <div
        className={cn(
          "hover:bg-accent group flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm rtl:flex-row-reverse",
          countryData.value === selectedCountry &&
            "bg-secondary text-accent-foreground",
        )}
        onClick={handleSelect}
        role="option"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleSelect();
          }
        }}
      >
        <FlagComponent
          country={countryData.value}
          countryName={countryData.label}
        />

        <span
          className={cn(
            "group-hover:text-foreground flex-1 rtl:text-right",
            countryData.value === selectedCountry
              ? "text-foreground"
              : "text-muted",
          )}
        >
          {countryData.label}
        </span>
        <span
          className={cn(
            "group-hover:text-foreground text-sm",
            countryData.value === selectedCountry
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        >{`+${RPNInput.getCountryCallingCode(countryData.value)}`}</span>
        {/* <CheckIcon
          className={`ml-auto size-4 ${countryData.value === selectedCountry ? "opacity-100" : "opacity-0"}`}
        /> */}
      </div>
    </div>
  );
});
VirtualCountryItem.displayName = "VirtualCountryItem";

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const listRef = React.useRef<List>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation("signup");

  // Debounce search value to reduce filtering frequency
  const debouncedSearchValue = useDebounce(searchValue, 300);

  // Memoize filtered countries with debounced search
  const filteredCountries = React.useMemo(() => {
    if (!debouncedSearchValue) return countryList.filter((item) => item.value);

    const searchLower = debouncedSearchValue.toLowerCase();
    return countryList.filter(
      ({ label, value }) => value && label.toLowerCase().includes(searchLower),
    );
  }, [countryList, debouncedSearchValue]);

  // Scroll to selected country when opening
  React.useEffect(() => {
    if (isOpen && listRef.current && selectedCountry) {
      const selectedIndex = filteredCountries.findIndex(
        (country) => country.value === selectedCountry,
      );
      if (selectedIndex >= 0) {
        listRef.current.scrollToItem(selectedIndex, "center");
      }
    }
  }, [isOpen, selectedCountry, filteredCountries]);

  const handleSearchChange = React.useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleOpenChange = React.useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearchValue("");
    }
  }, []);

  const handleSelectComplete = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  // Prepare data for virtual list
  const listData = React.useMemo(
    () => ({
      countries: filteredCountries,
      selectedCountry,
      onChange,
      onSelectComplete: handleSelectComplete,
    }),
    [filteredCountries, selectedCountry, onChange, handleSelectComplete],
  );

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange} modal>
      <PopoverTrigger asChild>
        <Button
          size={"lg"}
          type="button"
          variant="outline"
          className="flex h-12 gap-1 rounded-s-4xl rounded-e-none border border-r-0 px-3 focus:z-10 rtl:flex-row-reverse rtl:rounded-s-none rtl:rounded-e-4xl"
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown
            className={cn(
              "-mr-2 size-4 opacity-50",
              disabled ? "hidden" : "opacity-100",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            value={searchValue}
            onValueChange={handleSearchChange}
            placeholder={t("step1.searchPlaceholder")}
          />
          <CommandList>
            <div className="h-72 border-t">
              {filteredCountries.length === 0 ? (
                <div className="text-muted-foreground py-6 text-center text-sm">
                  {t("step1.searchEmpty")}
                </div>
              ) : (
                <List
                  ref={listRef}
                  height={287} // 72 * 4 = 288px (h-72 in pixels)
                  width={300} // Add width prop to match PopoverContent width
                  itemCount={filteredCountries.length}
                  itemSize={48} // Height of each item
                  itemData={listData}
                  overscanCount={5} // Render 5 extra items for smooth scrolling
                  className="scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
                >
                  {VirtualCountryItem}
                </List>
              )}
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// Memoized flag component to prevent unnecessary re-renders
const FlagComponent = React.memo<RPNInput.FlagProps>(
  ({ country, countryName }) => {
    const Flag = flags[country];

    return (
      <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm [&_svg:not([class*='size-'])]:size-full">
        {Flag && <Flag title={countryName} />}
      </span>
    );
  },
);
FlagComponent.displayName = "FlagComponent";

export { PhoneInput };
