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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useCaseDocTypesQuery,useServicesNeededQuery
} from "@/hooks/useConstansQueries";
type Props = {
  form: any
}

const NotarySection = (props: Props) => {
  const { form } = props;
  const { t } = useTranslation("createCase");

  const { data: caseServicesNeed, isLoading: isLoadingcaseServicesNeed } = useServicesNeededQuery();
  const { data: caseDocTypes, isLoading: isLoadingCaseDocTypes } = useCaseDocTypesQuery();

  return (
    <div className="flex items-center gap-[23px]">
      <div className="flex-1">
        <FormField
          control={form.control}
          name="documentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("documentType.label")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="border-border h-12! w-full rounded-xl">
                    <SelectValue placeholder={t("documentType.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoadingCaseDocTypes && <div>{t("loading")}</div>}
                  {caseDocTypes?.map((doc) => (
                    <SelectItem key={doc.code} value={doc.code}>
                      <div className="flex items-center gap-1 rtl:flex-row-reverse">
                        <span>{doc.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

      </div>
      <div className="flex-1">
        <FormField
          control={form.control}
          name="serviceNeeded"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("serviceNeeded.label")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="border-border h-12! w-full rounded-xl">
                    <SelectValue placeholder={t("serviceNeeded.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoadingcaseServicesNeed && <div>{t("loading")}</div>}
                  {caseServicesNeed?.map((doc) => (
                    <SelectItem key={doc.code} value={doc.code}>
                      <div className="flex items-center gap-1 rtl:flex-row-reverse">
                        <span>{doc.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

      </div>

    </div>
  )
}

export default NotarySection;