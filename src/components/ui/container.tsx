import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "container mx-auto w-full max-w-screen-xl px-2.5 md:px-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
