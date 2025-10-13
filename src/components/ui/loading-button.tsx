import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type ShadcnButtonVariants = VariantProps<typeof buttonVariants>;

type LoadingButtonProps = NativeButtonProps &
  ShadcnButtonVariants & {
    loading?: boolean;
  };

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading, children, className, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        className={cn("", className)}
        {...props}
      >
        {loading && <Loader2 className="animate-spin" />}
        {children}
      </Button>
    );
  },
);

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;
