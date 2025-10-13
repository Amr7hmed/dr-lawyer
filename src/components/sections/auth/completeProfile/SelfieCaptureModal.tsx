import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Spinner from "@/components/common/spinner";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Ban } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onCapture: (file: File) => void; // Now returns File, not base64
}

export default function SelfieCaptureModal({
  open,
  onClose,
  onCapture,
}: Props) {
  const webcamRef = useRef<Webcam>(null);
  const [capturing, setCapturing] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const { t } = useTranslation("profileSetup");

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) {
      try {
        const file = await dataURLToFile(imageSrc, "selfie.jpg");
        onCapture(file);
        onClose();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error(t("step7.modal.captureError"));
      }
    }
  };

  // Convert base64 to File
  const dataURLToFile = async (
    dataUrl: string,
    fileName: string,
  ): Promise<File> => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  useEffect(() => {
    if (!open) {
      setCapturing(false);
      setCameraError(false);
    }
  }, [open]);

  const handleRetry = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setCameraError(false);
      setCapturing(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error(t("step7.modal.cameraError"));
      setCameraError(true);
      setCapturing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose} modal>
      <DialogContent
        className="w-full max-w-sm gap-6"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("step7.modal.title")}</DialogTitle>
          <DialogDescription>{t("step7.modal.description")}</DialogDescription>
        </DialogHeader>

        {cameraError ? (
          <Alert variant={"destructive"}>
            <AlertTitle className="text-center text-lg">
              <div className="ga-2 flex flex-col items-center">
                <Ban className="h-8 w-8" />
                {t("step7.modal.denied")}
              </div>
            </AlertTitle>
            <AlertDescription className="flex flex-col items-center justify-center gap-2">
              <p className="text-muted-foreground max-w-xs text-sm">
                {t("step7.modal.unAvailable")}
              </p>
              <Button
                type="button"
                onClick={handleRetry}
                className="rounded-full"
              >
                {t("step7.modal.retry")}
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              screenshotQuality={1}
              videoConstraints={{
                width: { ideal: 1280 },
                height: { ideal: 1280 },
                facingMode: "user",
              }}
              onUserMedia={() => {
                setCapturing(true);
                setCameraError(false);
              }}
              onUserMediaError={() => {
                setCapturing(false);
                setCameraError(true);
              }}
              className="mx-auto h-60 w-60 rounded-full object-cover sm:h-80 sm:w-80"
            />

            {!capturing && (
              <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4">
                <Spinner className="h-14 w-14" />
                <p className="text-muted-foreground mt-2 text-center text-sm">
                  {t("step7.modal.loading")}
                </p>
              </div>
            )}

            <DialogFooter className="mt-2 gap-4">
              <Button
                type="button"
                onClick={capturePhoto}
                size={"lg"}
                disabled={!capturing}
                className="rounded-full sm:flex-1"
              >
                {t("step7.modal.capture")}
              </Button>
              <Button
                type="button"
                size={"lg"}
                onClick={onClose}
                variant="outline"
                className="rounded-full sm:flex-1"
              >
                {t("step7.modal.cancel")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
