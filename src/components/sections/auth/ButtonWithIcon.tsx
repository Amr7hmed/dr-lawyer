import { buttonVariants } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type ShadcnButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonWithIconProps = NativeButtonProps &
  ShadcnButtonVariants & {
    loading?: boolean;
    icon?: React.ReactNode;
  };

const ButtonWithIcon = ({
  loading,
  children,
  className,
  icon,
  size = "lg",
  ...props
}: ButtonWithIconProps) => {
  return (
    <LoadingButton
      loading={loading}
      className={cn("relative h-14 w-full rounded-4xl", className)}
      size={size}
      {...props}
    >
      {children}
      {icon && (
        <span className="bg-primary-deep/50 absolute top-1/2 right-6 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full p-3 rtl:right-auto rtl:left-6 rtl:rotate-180">
          {icon}
        </span>
      )}
    </LoadingButton>
  );
};

export default ButtonWithIcon;
