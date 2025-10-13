import { cn } from "@/lib/utils";
import React from "react";
import AuthInput from "./authInput";

type InputWithiconProps = {
  icon: React.ReactNode;
} & React.ComponentProps<"input">;

const InputWithIcon = ({ icon, className, ...props }: InputWithiconProps) => {
  return (
    <div className="relative">
      <span className="absolute top-1/2 left-4 -translate-y-1/2 rtl:right-4 rtl:left-auto">
        {icon}
      </span>

      <AuthInput
        {...props}
        className={cn(
          "rtl:pr:11 border-border h-12 rounded-4xl pr-4 pl-12 rtl:pr-12 rtl:pl-4",
          className,
        )}
      />
    </div>
  );
};

export default InputWithIcon;
