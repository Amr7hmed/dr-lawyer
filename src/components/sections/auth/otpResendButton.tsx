import { Badge } from "@/components/ui/badge";
import type { buttonVariants } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import { useMultiStepForm } from "@/contexts/multiStepFormContext";
import {
  useForgotPasswordMutation,
  useRegisterMutation,
} from "@/hooks/useAuthQueries";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type ShadcnButtonVariants = VariantProps<typeof buttonVariants>;

type OtpResendButtonProps = NativeButtonProps &
  ShadcnButtonVariants & {
    mode: "signup" | "forgotPassword";
  };

const OTPResendButton = ({
  children,
  className,
  mode,
  ...props
}: OtpResendButtonProps) => {
  const [cooldown, setCooldown] = useState(30); // initial timer

  const {
    sharedData: { emailOrPhone },
  } = useMultiStepForm<{ emailOrPhone: string }>();

  const register = useRegisterMutation({
    onSuccess() {
      toast.success("Verification code sent successfully");
    },
    onError(error) {
      if (error.status === 429) {
        toast.error("Too many requests, please try again later");
      } else {
        toast.error(error.response?.data.message);
      }
    },
    onSettled() {
      setCooldown(30);
    },
  });
  const forgot = useForgotPasswordMutation({
    onSuccess() {
      toast.success("Verification code sent successfully");
      // setCooldown(30);
    },
    onError(error) {
      if (error.status === 429) {
        toast.error("Too many requests, please try again later");
      } else {
        toast.error(error.response?.data.message);
      }
    },
    onSettled() {
      setCooldown(30);
    },
  });

  const action = mode === "signup" ? register : forgot;

  useEffect(() => {
    if (cooldown === 0) return; // stop timer
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const isDisabled = cooldown > 0;

  const resendHandler = () => {
    if (isDisabled) return;
    if (mode === "signup") {
      const isEmail = z.string().email().safeParse(emailOrPhone).success;
      register.mutate(
        isEmail ? { email: emailOrPhone } : { phone: emailOrPhone },
      );
    } else {
      forgot.mutate({ emailOrPhone });
    }
  };

  return (
    <LoadingButton
      disabled={isDisabled}
      loading={action.isPending}
      onClick={resendHandler}
      type="button"
      variant="secondary"
      className={cn(
        "pointer-events-auto! w-fit rounded-4xl px-4 py-2 text-sm font-medium disabled:pointer-events-none! disabled:opacity-100",
        className,
      )}
      {...props}
    >
      <span
        className={cn({
          "opacity-50": isDisabled || action.isPending,
        })}
      >
        {children}
      </span>
      {isDisabled && (
        <Badge
          className="bg-muted h-6 min-w-5 rounded-lg font-mono tabular-nums"
          variant="default"
        >
          {cooldown}
        </Badge>
      )}
    </LoadingButton>
  );
};

export default OTPResendButton;
