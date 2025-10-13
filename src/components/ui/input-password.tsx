import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const InputPassword = (props: React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        className={cn(
          "border-border h-12 rounded-4xl ltr:pr-10! rtl:pl-10!",
          props.className,
        )}
      />
      <Button
        type="button"
        variant="link"
        size="icon"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute top-1/2 right-2 -translate-y-1/2 rtl:right-auto rtl:left-2"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="text-muted-foreground h-4 w-4" />
        ) : (
          <Eye className="text-muted-foreground h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default InputPassword;
