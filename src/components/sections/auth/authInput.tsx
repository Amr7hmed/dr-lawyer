import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const AuthInput = (props: React.ComponentProps<"input">) => {
  return (
    <Input
      className={cn(
        "border-border h-12 rounded-4xl border px-4",
        props.className,
      )}
      {...props}
    />
  );
};

export default AuthInput;
