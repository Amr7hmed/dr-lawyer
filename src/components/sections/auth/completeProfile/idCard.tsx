import { ArrowRight, Image, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/ui/loading-button";
import { useMultiStepForm } from "@/contexts/multiStepFormContext";
import { useUploadLawyerDocumentMutation } from "@/hooks/useUserQueries";
import type { ProfileSetupFormData } from "@/schema/auth/profileSetupSchema";
import { Link } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Progress } from "@/components/ui/progress";

export default function IDCardUpload() {
  const { control, setValue, trigger } = useFormContext<ProfileSetupFormData>();

  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);
  const { nextStep, prevStep } = useMultiStepForm();
  const { t } = useTranslation("profileSetup");

  const frontFile = useWatch({ control, name: "idCardFront" }) as File | null;
  const backFile = useWatch({ control, name: "idCardBack" }) as File | null;

  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const [frontProgress, setFrontProgress] = useState(0);
  const [backProgress, setBackProgress] = useState(0);

  const { mutate: uploadFront, isPending: isUploadingFront } =
    useUploadLawyerDocumentMutation({
      onError(error) {
        toast.error(error.response?.data.message || error.message);
        resetFile("front");
      },
    });

  const { mutate: uploadBack, isPending: isUploadingBack } =
    useUploadLawyerDocumentMutation({
      onError(error) {
        toast.error(error.response?.data.message || error.message);
        resetFile("back");
      },
    });

  // Preview for front
  useEffect(() => {
    if (frontFile instanceof File) {
      const url = URL.createObjectURL(frontFile);
      setFrontPreview(url);
      const formData = new FormData();
      formData.append("file", frontFile); // adjust key name if your backend uses another

      uploadFront({
        formData,
        type: "idCardFront",
        config: {
          onUploadProgress: (event) => {
            const percent = Math.round(
              (event.loaded * 100) / (event.total || 1),
            );
            setFrontProgress(percent);
          },
        },
      });
      return () => URL.revokeObjectURL(url);
    } else {
      setFrontPreview(null);
      setFrontProgress(0);
    }
  }, [frontFile, uploadFront]);

  // Preview for back
  useEffect(() => {
    if (backFile instanceof File) {
      const url = URL.createObjectURL(backFile);
      setBackPreview(url);
      const formData = new FormData();
      formData.append("file", backFile); // adjust key name if your backend uses another

      uploadBack({
        formData,
        type: "idCardBack",
        config: {
          onUploadProgress: (event) => {
            const percent = Math.round(
              (event.loaded * 100) / (event.total || 1),
            );
            setBackProgress(percent);
          },
        },
      });
      return () => URL.revokeObjectURL(url);
    } else {
      setBackPreview(null);
      setBackProgress(0);
    }
  }, [backFile, uploadBack]);

  const resetFile = (side: "front" | "back") => {
    if (side === "front") {
      setValue("idCardFront", undefined);
      if (frontRef.current) {
        frontRef.current.value = "";
      }
      setFrontPreview(null);
      setFrontProgress(0);
    } else {
      setValue("idCardBack", undefined);
      if (backRef.current) {
        backRef.current.value = "";
      }
      setBackPreview(null);
      setBackProgress(0);
    }
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
          <h3 className="text-lg font-semibold">{t("step8.title")}</h3>
          <p className="text-muted-foreground text-sm">
            {t("step8.description")}
          </p>
        </div>

        {/* Front Image Upload */}
        <FormField
          control={control}
          name="idCardFront"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    aria-hidden="true"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setValue("idCardFront", file);
                    }}
                    ref={(el) => {
                      frontRef.current = el;
                      field.ref(el);
                    }}
                    className="hidden"
                  />

                  {frontPreview ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="bg-accent flex h-60 w-full items-center justify-center rounded-xl text-center">
                        <img
                          src={frontPreview}
                          alt="Front ID"
                          className="h-full w-full rounded-xl object-cover"
                        />
                      </div>
                      {(frontProgress > 0 && frontProgress < 100) ||
                      isUploadingFront ? (
                        <div className="flex w-full items-center gap-2">
                          <Progress className="flex-1" value={frontProgress} />
                          <span className="text-muted-foreground text-center text-sm">
                            {frontProgress}%
                          </span>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => resetFile("front")}
                          className="bg-accent text-muted h-9 rounded-4xl px-6"
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          {t("step8.retake")}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => frontRef.current?.click()}
                      className="bg-accent group hover:border-primary flex h-60 w-full cursor-pointer items-center justify-center rounded-xl border border-dashed text-center transition"
                    >
                      <div className="text-muted flex items-center justify-center gap-2">
                        <Image className="h-6 w-6" />
                        <span className="text-sm font-medium">
                          {t("step8.uploadFront")}
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

        {/* Back Image Upload */}
        <FormField
          control={control}
          name="idCardBack"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    aria-hidden="true"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setValue("idCardBack", file);
                    }}
                    ref={(el) => {
                      backRef.current = el;
                      field.ref(el);
                    }}
                    className="hidden"
                  />

                  {backPreview ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="bg-accent flex h-60 w-full items-center justify-center rounded-xl text-center">
                        <img
                          src={backPreview}
                          alt="Back ID"
                          className="h-full w-full rounded-xl object-cover"
                        />
                      </div>
                      {(backProgress > 0 && backProgress < 100) ||
                      isUploadingBack ? (
                        <div className="flex w-full items-center gap-2">
                          <Progress className="flex-1" value={backProgress} />
                          <span className="text-muted-foreground text-center text-sm">
                            {backProgress}%
                          </span>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => resetFile("back")}
                          className="bg-accent text-muted h-9 rounded-4xl px-6"
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          {t("step8.retake")}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => backRef.current?.click()}
                      className="bg-accent group hover:border-primary flex h-60 w-full cursor-pointer items-center justify-center rounded-xl border border-dashed text-center transition"
                    >
                      <div className="text-muted flex items-center justify-center gap-2">
                        <Image className="h-6 w-6" />
                        <span className="text-sm font-medium">
                          {t("step8.uploadBack")}
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

        {/* Terms & Conditions */}
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
          disabled={isUploadingBack || isUploadingFront}
          variant="secondary"
          type="button"
          size={"icon"}
          className="h-11 w-11 rounded-full"
        >
          <ArrowRight className="w-8 ltr:rotate-180" />
        </Button>

        <LoadingButton
          onClick={nextStepHandler}
          disabled={
            !frontFile || !backFile || isUploadingBack || isUploadingFront
          }
          type={"button"}
          className="h-11 rounded-full px-5!"
        >
          {t("step8.next")} <ArrowRight className="rtl:rotate-180" />
        </LoadingButton>
      </div>
    </>
  );
}
