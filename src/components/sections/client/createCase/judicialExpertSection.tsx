/* eslint-disable @typescript-eslint/no-explicit-any */

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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import {
  useSpecializationsQuery,
} from "@/hooks/useConstansQueries";

type Props = {
  form: any
}

const JudicialExpertSection = (props: Props) => {
  const { form } = props;
  const { t } = useTranslation("createCase");

  const { data: categories, isLoading } = useSpecializationsQuery();
  return (
    <FormField
      control={form.control}
      name="areaOfExpert"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("areaOfExpert.label")}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="border-border h-12! w-full rounded-xl">
                <SelectValue placeholder={t("areaOfExpert.placeholder")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {isLoading && <div>{t("loading")}</div>}
              {categories?.map((cat) => (
                <SelectGroup key={cat.code}>
                  <SelectLabel className="text-sm font-semibold text-black">
                    {cat.name}
                  </SelectLabel>
                  {cat.children.map((child) => (
                    <SelectItem key={child.code} value={child.code}>
                      <div className="flex items-center gap-1 rtl:flex-row-reverse">
                        <span>•</span> <span>{child.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default JudicialExpertSection;