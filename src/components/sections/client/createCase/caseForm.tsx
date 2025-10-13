import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  allowedMimeTypes,
  caseSchema,
  type CaseFormValues,
} from "@/schema/case/createCaseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, X } from "lucide-react";
import type React from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Import shadcn Form components
import LoadingButton from "@/components/ui/loading-button";
import { useCreateCaseMutation } from "@/hooks/useCaseQueries";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useParams } from "react-router";
import NotarySection from "./notarySection";
import GeneralLawyerSection from "./generalLawyerSection";
import LegalTranslatorSection from "./legalTranslatorSection";
import JudicialExpertSection from "./judicialExpertSection";

export default function CaseForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation("createCase");
  const { status } = useParams();
  const navigate = useNavigate();

  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      title: "",
      description: "",
      caseType: "",
      practiceType: status,
      documentType: "",
      serviceNeeded: "",
      sourcelangauge:"",
      targetlangauge:"",
      areaOfExpert:"",
      attachments: [],
    },
  });
  const attachments = form.watch("attachments");

  const { mutateAsync, isPending } = useCreateCaseMutation({
    onSuccess: () => {
      toast.success(t("toast.success"));
      form.reset();
      navigate("/client/cases/requests");
    },
    onError: (error) => {
      toast.error(t("toast.error"), {
        description: error.response?.data.message || error.message,
      });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const currentAttachments = attachments || [];
    const newAttachments = [...currentAttachments, ...files];

    if (newAttachments.length > 8) {
      toast.error(t("file.tooMany"), {
        description: t("file.limitDescription"),
      });
      fileInputRef.current!.value = "";
      return;
    }

    for (const file of files) {
      if (currentAttachments.some((f) => f.name === file.name)) {
        toast.error(t("file.duplicate"), {
          description: t("file.duplicateDescription", { name: file.name }),
        });
        fileInputRef.current!.value = "";
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t("file.tooBig"), {
          description: t("file.tooBigDescription", { name: file.name }),
        });
        fileInputRef.current!.value = "";
        return;
      }
      if (!allowedMimeTypes.includes(file.type)) {
        toast.error(t("file.invalid"), {
          description: t("file.invalidDescription", { name: file.name }),
        });
        fileInputRef.current!.value = "";
        return;
      }
    }

    form.setValue("attachments", newAttachments, { shouldValidate: true });
    fileInputRef.current!.value = "";
  };

  const handleRemoveFile = (index: number) => {
    const newAttachments = attachments?.filter((_, i) => i !== index);
    form.setValue("attachments", newAttachments, { shouldValidate: true });
  };

  const onSubmit = async (data: CaseFormValues) => {
    await mutateAsync(data);
  };

  const statusComponents: Record<string, React.FC<{ form: typeof form }>> = {
    GENERAL_LAWYER: GeneralLawyerSection,
    NOTARY: NotarySection,
    LEGAL_TRANSLATOR: LegalTranslatorSection,
    JUDICIAL_EXPERT: JudicialExpertSection,
  };

  const SectionComponent =
    status && statusComponents[status] ? statusComponents[status] : null;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 rounded-xl bg-white p-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("title.label")}</FormLabel>
              <FormControl>
                <Input
                  className="border-border h-12 rounded-xl border px-4"
                  placeholder={t("title.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("description.label")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("description.placeholder")}
                  {...field}
                  className="border-border min-h-[120px] rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {SectionComponent && <SectionComponent form={form} />}

        <FormField
          control={form.control}
          name="attachments"
          render={() => (
            <FormItem>
              <FormLabel className="font-semibold">
                {t("attachments.label")}{" "}
                <span className="text-muted-foreground">
                  ({t("attachments.optional")})
                </span>
              </FormLabel>
              <FormControl>
                <label
                  htmlFor="file-upload"
                  className={cn(
                    "border-border bg-accent flex cursor-pointer items-center justify-center rounded-xl border border-dashed",
                    form.formState.errors.attachments && "border-red-500",
                  )}
                >
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    disabled={isPending || form.formState.isSubmitting}
                    className="sr-only"
                    accept="application/*,image/*,video/*,text/plain"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                  <div className="text-muted dash border-muted flex items-center space-x-2 py-4 text-sm font-semibold">
                    <Link className="h-5 w-5" />
                    <span>{t("attachments.cta")}</span>
                  </div>
                </label>
              </FormControl>
              <FormMessage />
              {attachments && attachments.length > 0 && (
                <div className="bg-accent divide-border mt-2 w-full divide-y overflow-hidden px-4 py-1">
                  {attachments.map((file, index) => (
                    <div
                      key={file.name + index}
                      className="flex w-full items-center justify-between gap-2 p-1 text-sm text-blue-700"
                    >
                      <span className="w-fit max-w-[calc(100%-50px)] truncate overflow-hidden text-ellipsis">
                        {file.name}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </FormItem>
          )}
        />
        <LoadingButton
          type="submit"
          className="mx-auto mt-2 h-12 w-full rounded-full sm:w-80"
          loading={isPending}
        >
          {t("submit")}
        </LoadingButton>
      </form>
    </Form>
  );
}
