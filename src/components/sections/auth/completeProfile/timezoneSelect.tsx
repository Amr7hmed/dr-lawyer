import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { allTimezones, useTimezoneSelect } from "react-timezone-select";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { ProfileSetupFormData } from "@/schema/auth/profileSetupSchema";

// Optional: customize timezone labels
const customTimezones = {
  ...allTimezones,
  "Europe/Berlin": "Frankfurt",
  "America/Lima": "Pittsburgh",
};

export default function TimezoneSelect() {
  const { control, setValue, watch } = useFormContext<ProfileSetupFormData>();

  // 👀 The stored value from the form (should be tz.value like "Europe/Berlin")
  const currentValue = watch("availabilityTimeZone");

  // 🧠 Get options from hook
  const { options, parseTimezone } = useTimezoneSelect({
    labelStyle: "original", // could be 'altName' or 'abbrev'
    displayValue: "GMT", // shows (GMT+2:00)
    timezones: customTimezones, // optional override
  });

  // 📦 Get selected object from current form value
  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.value === currentValue) || null;
  }, [options, currentValue]);

  return (
    <FormField
      control={control}
      name="availabilityTimeZone"
      render={({ field }) => (
        <FormItem>
          <Select
            onValueChange={(val) => {
              const parsed = parseTimezone(val);
              setValue("availabilityTimeZone", parsed.value); // store only tz string (e.g. "Asia/Dubai")
            }}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger className="border-border h-12 w-full rounded-4xl">
                <SelectValue
                  placeholder="Select a timezone"
                  // Shows selected label or fallback
                  defaultValue={selectedOption?.label}
                />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value} // e.g. "Asia/Dubai"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
