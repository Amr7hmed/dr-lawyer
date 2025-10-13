import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import PdfViewer from "@/components/sections/auth/completeProfile/pdfViewer"; // adjust import if needed
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import { useMultiStepForm } from "@/contexts/multiStepFormContext";
import type { ProfileSetupFormData } from "@/schema/auth/profileSetupSchema";
import { ArrowRight, Image, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Label } from "@radix-ui/react-label";
import { Link } from "react-router";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useUploadLawyerDocumentMutation } from "@/hooks/useUserQueries";
import { Progress } from "@/components/ui/progress";

export default function CertificateUploadForm() {
  const { control, setValue, trigger } = useFormContext<ProfileSetupFormData>();
  const { nextStep, prevStep } = useMultiStepForm();

  const licenseFile = useWatch({ control, name: "licenseCertificate" }) as File;
  const [licensePreview, setLicensePreview] = useState<string | null>(null);
  const [licenseFileType, setLicenseFileType] = useState<
    "image" | "pdf" | null
  >(null);
  const compFile = useWatch({ control, name: "companyCertificate" }) as File;
  const [compPreview, setCompPreview] = useState<string | null>(null);
  const [compFileType, setCompFileType] = useState<"image" | "pdf" | null>(
    null,
  );
  const [licenseProgress, setLicenseProgress] = useState(0);
  const [compProgress, setCompProgress] = useState(0);
  const licenseInputRef = useRef<HTMLInputElement>(null);
  const compInputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation("profileSetup");

  const { mutate: uploadLicense, isPending: isUploadingLicense } =
    useUploadLawyerDocumentMutation({
      onError(error) {
        toast.error(error.response?.data.message || error.message);
        handleLicenseReset();
      },
    });

  const { mutate: uploadCompany, isPending: isUploadingCompany } =
    useUploadLawyerDocumentMutation({
      onError(error) {
        toast.error(error.response?.data.message || error.message);
        handleCompReset();
      },
    });

  useEffect(() => {
    if (licenseFile instanceof File) {
      const url = URL.createObjectURL(licenseFile);
      setLicensePreview(url);
      setLicenseFileType(licenseFile.type.includes("pdf") ? "pdf" : "image");
      const formData = new FormData();
      formData.append("file", licenseFile); // adjust key name if your backend uses another

      uploadLicense({
        formData,
        type: "licenseCertificate",
        config: {
          onUploadProgress: (event) => {
            const percent = Math.round(
              (event.loaded * 100) / (event.total || 1),
            );
            setLicenseProgress(percent);
          },
        },
      });
      return () => URL.revokeObjectURL(url);
    } else {
      setLicensePreview(null);
      setLicenseFileType(null);
      setLicenseProgress(0);
    }
  }, [licenseFile, uploadLicense]);

  useEffect(() => {
    if (compFile instanceof File) {
      const url = URL.createObjectURL(compFile);
      setCompPreview(url);
      setCompFileType(compFile.type.includes("pdf") ? "pdf" : "image");
      const formData = new FormData();
      formData.append("file", compFile); // adjust key name if your backend uses another

      uploadCompany({
        formData,
        type: "companyLicense",
        config: {
          onUploadProgress: (event) => {
            const percent = Math.round(
              (event.loaded * 100) / (event.total || 1),
            );
            setCompProgress(percent);
          },
        },
      });
      return () => URL.revokeObjectURL(url);
    } else {
      setCompPreview(null);
      setCompFileType(null);
      setCompProgress(0);
    }
  }, [compFile, uploadCompany]);

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setValue("licenseCertificate", file);
  };

  const handleLicenseReset = () => {
    setValue("licenseCertificate", undefined);
    if (licenseInputRef.current) licenseInputRef.current.value = "";
    setLicensePreview(null);
    setLicenseFileType(null);
    setLicenseProgress(0);
  };

  const handleCompChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setValue("companyCertificate", file);
  };

  const handleCompReset = () => {
    setValue("companyCertificate", undefined);
    if (compInputRef.current) compInputRef.current.value = "";
    setCompPreview(null);
    setCompFileType(null);
    setCompProgress(0);
  };

  const nextStepHandler = async () => {
    const result = await trigger([
      "idCardFront",
      "idCardBack",
      "agreedToTerms",
    ]);
    if (result) nextStep();
  };
  return (
    <>
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-semibold">{t("step9.title")}</h3>
          <p className="text-muted-foreground text-sm">
            {t("step9.description")}
          </p>
        </div>
        <FormField
          control={control}
          name="licenseCertificate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col">
                  <input
                    ref={(el) => {
                      field.ref(el);
                      licenseInputRef.current = el;
                    }}
                    aria-hidden="true"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleLicenseChange}
                    className="hidden"
                  />
                  {licensePreview ? (
                    <div className="flex flex-col items-center gap-4">
                      {licenseFileType === "image" ? (
                        <div className="bg-accent flex h-60 w-full items-center justify-center overflow-hidden rounded-xl">
                          <img
                            src={licensePreview}
                            alt="License"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="bg-accent w-full overflow-hidden rounded-xl border shadow-sm">
                          <PdfViewer file={licenseFile} />
                        </div>
                      )}
                      {(licenseProgress > 0 && licenseProgress < 100) ||
                      isUploadingLicense ? (
                        <div className="flex w-full items-center gap-2">
                          <Progress
                            className="flex-1"
                            value={licenseProgress}
                          />
                          <span className="text-muted-foreground text-center text-sm">
                            {licenseProgress}%
                          </span>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleLicenseReset}
                          className="bg-accent text-muted h-9 rounded-4xl px-6"
                        >
                          <RotateCcw className="h-4 w-4" />
                          {t("step9.retake")}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => licenseInputRef.current?.click()}
                      className="bg-accent group hover:border-primary flex h-60 w-full cursor-pointer items-center justify-center rounded-xl border border-dashed transition"
                    >
                      <div className="text-muted flex items-center gap-2">
                        <Image className="h-6 w-6" />
                        <span className="text-sm font-medium">
                          {t("step9.uploadLicense")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comp Certificate Upload */}
        <FormField
          control={control}
          name="companyCertificate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex w-full flex-col">
                  <input
                    ref={(el) => {
                      field.ref(el);
                      compInputRef.current = el;
                    }}
                    aria-hidden="true"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleCompChange}
                    className="hidden"
                  />
                  {compPreview ? (
                    <div className="flex w-full flex-col items-center gap-4">
                      {compFileType === "image" ? (
                        <div className="bg-accent flex h-60 w-full items-center justify-center overflow-hidden rounded-xl">
                          <img
                            src={compPreview}
                            alt="Comp Certificate"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="bg-accent w-full overflow-hidden rounded-xl border shadow-sm">
                          <PdfViewer file={compFile} />
                        </div>
                      )}
                      {(compProgress > 0 && compProgress < 100) ||
                      isUploadingCompany ? (
                        <div className="flex w-full items-center gap-2">
                          <Progress className="flex-1" value={compProgress} />
                          <span className="text-muted-foreground text-center text-sm">
                            {compProgress}%
                          </span>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCompReset}
                          className="bg-accent text-muted h-9 rounded-4xl px-6"
                        >
                          <RotateCcw className="h-4 w-4" />
                          {t("step9.retake")}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => compInputRef.current?.click()}
                      className="bg-accent group hover:border-primary flex h-60 w-full cursor-pointer items-center justify-center rounded-xl border border-dashed transition"
                    >
                      <div className="text-muted flex items-center gap-2">
                        <Image className="h-6 w-6" />
                        <span className="text-sm font-medium">
                          {t("step9.uploadCompany")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="agreedToTerms"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="mt-1 flex items-center gap-3">
                  <Checkbox
                    id="isAccepted"
                    className="h-5 w-5"
                    checked={field.value}
                    onCheckedChange={field.onChange as (value: boolean) => void}
                  />
                  <Label
                    htmlFor="isAccepted"
                    className="text-muted-foreground flex flex-wrap gap-1 text-sm"
                  >
                    <span className="whitespace-nowrap">
                      {t("step8.agree")}
                    </span>
                    <Link
                      to="/terms"
                      className="text-muted font-semibold whitespace-nowrap"
                    >
                      {t("step8.terms")}
                    </Link>
                  </Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="mt-8 flex items-center justify-between">
        <Button
          onClick={prevStep}
          disabled={isUploadingCompany || isUploadingLicense}
          variant="secondary"
          type="button"
          size={"icon"}
          className="h-11 w-11 rounded-full"
        >
          <ArrowRight className="w-8 ltr:rotate-180" />
        </Button>
        {/* {profileImage && ( */}
        <LoadingButton
          onClick={nextStepHandler}
          disabled={
            !compFile ||
            !licenseFile ||
            isUploadingCompany ||
            isUploadingLicense
          }
          type={"button"}
          className="h-11 rounded-full px-5!"
        >
          {t("step9.next")} <ArrowRight className="rtl:rotate-180" />
        </LoadingButton>
        {/* )} */}
      </div>
    </>
  );
}
