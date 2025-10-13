import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/loading-button";
import { useCancelCaseMutation } from "@/hooks/useCaseQueries";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CancelRequestModal = ({ caseId }: { caseId: string }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("caseRequests");
  const navigate = useNavigate();
  const { mutate, isPending } = useCancelCaseMutation(caseId, {
    onSuccess: () => {
      setOpen(false);
      navigate("/client/cases/requests");
    },
    onError: (error) => {
      toast.error(error.response?.data.message || error.message);
    },
  });

  const handleCancel = async () => {
    mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-destructive text-destructive hover:text-destructive rounded-full"
        >
          {t("cancel.button")}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[400px]!"
        aria-describedby={undefined}
        // onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col items-center gap-3 sm:items-start">
              <div className="flex w-fit items-center rounded-full bg-red-50 p-2">
                <div className="flex w-fit items-center gap-2 rounded-full bg-red-100 p-3">
                  <CircleAlert className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <h2>{t("cancel.title")}</h2>
            </div>
          </DialogTitle>
          <DialogDescription>{t("cancel.description")}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2 justify-between! gap-y-4">
          <DialogClose asChild>
            <Button
              className="h-10.5 w-full flex-1 rounded-full"
              variant="outline"
            >
              {t("cancel.close")}
            </Button>
          </DialogClose>

          <LoadingButton
            className="h-10.5 flex-1 rounded-full"
            variant="destructive"
            onClick={handleCancel}
            loading={isPending}
          >
            {t("cancel.confirm")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelRequestModal;
