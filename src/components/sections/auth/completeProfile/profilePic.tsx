import { ArrowRight, Camera, RotateCcw } from "lucide-react";
import { lazy, useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import LoadingButton from "@/components/ui/loading-button";
import { useMultiStepForm } from "@/contexts/multiStepFormContext";
import { useUploadProfileImgMutation } from "@/hooks/useUserQueries";
import type { ProfileSetupFormData } from "@/schema/auth/profileSetupSchema";

import { toast } from "sonner";
import Loadable from "@/components/common/loadable";
import { useTranslation } from "react-i18next";
import { Progress } from "@/components/ui/progress";

const SelfieCaptureModal = Loadable(lazy(() => import("./SelfieCaptureModal")));

export default function ProfilePic() {
  const {
    control,
    setValue,
    trigger,
    formState: { isSubmitting },
  } = useFormContext<ProfileSetupFormData>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { nextStep, prevStep } = useMultiStepForm();

  const { t } = useTranslation("profileSetup");

  const profileImage = useWatch({
    control,
    name: "profileImage",
  }) as File | null;

  const { mutateAsync: uploadProfileImg, isPending } =
    useUploadProfileImgMutation({
      onError(error) {
        toast.error(error.response?.data.message);
        handleReset();
      },
    });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [openCamera, setOpenCamera] = useState(false);
  const [progress, setProgress] = useState(0);
  const role = useWatch({ control, name: "role" });

  // Preview when profileImage changes
  useEffect(() => {
    if (profileImage instanceof File) {
      const url = URL.createObjectURL(profileImage);
      setPreviewUrl(url);
      const formData = new FormData();
      formData.append("file", profileImage);

      uploadProfileImg({
        formData,
        config: {
          onUploadProgress: (event) => {
            const percent = Math.round(
              (event.loaded * 100) / (event.total || 1),
            );
            setProgress(percent);
          },
        },
      });

      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
      setProgress(0);
    }
  }, [profileImage, uploadProfileImg]);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profileImage", file);
    }
  };
  const nextStepHandler = async () => {
    if (role === "lawyer") {
      const result = await trigger("profileImage");
      if (result) nextStep();
    }
  };

  const handleReset = () => {
    setValue("profileImage", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setPreviewUrl(null);
    setProgress(0);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-semibold">{t("step7.title")}</h3>
          <p className="text-muted-foreground text-sm">
            {t("step7.description")}
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          {previewUrl ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <Avatar className="h-48 w-48">
                <AvatarImage
                  src={previewUrl}
                  className="object-cover"
                  alt="Profile preview"
                />
                <AvatarFallback>
                  <Camera className="text-muted-foreground h-12 w-12" />
                </AvatarFallback>
              </Avatar>

              {(progress > 0 && progress < 100) || isPending ? (
                <div className="flex w-full items-center gap-2">
                  <Progress className="flex-1" value={progress} />
                  <span className="text-muted-foreground text-center text-sm">
                    {progress}%
                  </span>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="bg-accent text-muted flex h-10 items-center rounded-full px-6"
                >
                  <RotateCcw className="h-4 w-4" />
                  {t("step7.retake")}
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="bg-accent flex h-44 w-44 items-center justify-center rounded-full">
                <Camera className="text-muted h-12 w-12" />
              </div>

              <p className="text-muted text-center text-sm">
                {t("step7.gallery")}
              </p>

              <FormField
                control={control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="file"
                        accept="image/*"
                        aria-hidden="true"
                        ref={(el) => {
                          fileInputRef.current = el;
                          field.ref(el);
                        }}
                        onChange={handleSelectFile}
                        className="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="outline"
                className="border-primary text-primary h-12 w-full rounded-4xl bg-transparent"
                onClick={() => fileInputRef.current?.click()}
              >
                {t("step7.upload")}
              </Button>

              <Button
                type="button"
                className="bg-primary h-12 w-full rounded-4xl text-white"
                onClick={() => setOpenCamera(true)}
              >
                {t("step7.selfie")}
              </Button>
            </>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button
            onClick={prevStep}
            disabled={isPending}
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
            disabled={!profileImage || isPending}
            loading={role === "lawyer" ? false : isSubmitting}
            type={role === "client" ? "submit" : "button"}
            className="h-11 rounded-full px-5!"
          >
            {t("step7.next")} <ArrowRight className="rtl:rotate-180" />
          </LoadingButton>
          {/* )} */}
        </div>
        {/* Modal with react‑webcam */}
        <SelfieCaptureModal
          open={openCamera}
          onClose={() => setOpenCamera(false)}
          onCapture={(file: File) => {
            setValue("profileImage", file);
          }}
        />
      </div>
    </>
  );
}
