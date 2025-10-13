import LoginLogo from "@/components/sections/auth/loginLogo";

import Logo from "@/assets/logo-sm.svg?react";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "@/components/common/languageSelector";

// ==============================|| LAYOUT - AUTH ||============================== //

export default function AuthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className="grid min-h-dvh bg-white lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <LoginLogo />
      </div>
      <div className="flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b px-6 py-3">
          <Logo className="h-12 w-18 overflow-hidden" />
          <LanguageSelector />
        </header>
        <div className="flex flex-1 items-center justify-center p-6">
          <div
            className={cn(
              "flex w-full max-w-md items-center justify-center",
              className,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
