import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/hooks/useAuthQueries";
import { ChevronDown, CircleAlert, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

type ProfileMenuProps = {
  fullName: string;
  profileImage?: string | null;
};

const ProfileMenu = ({ fullName, profileImage }: ProfileMenuProps) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: logout, isPending } = useLogoutMutation({
    onSettled: () => setOpen(false),
  });
  const navigate = useNavigate();
  const { t } = useTranslation("clientHome");

  const handleLogout = async () => {
    await logout();
  };

  function getGreeting(): string {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return t("greetingMorning");
    if (hour >= 12 && hour < 17) return t("greetingAfternoon");
    if (hour >= 17 && hour < 21) return t("greetingEvening");
    return t("greetingNight");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="hidden xl:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-fit cursor-pointer items-center gap-2 ring-0 focus-visible:ring-0 focus-visible:outline-none"
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profileImage || ""} alt="User Avatar" />
                  <AvatarFallback className="bg-icon">
                    {fullName?.[0]?.toUpperCase() ?? "M"}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute right-0 bottom-1 block h-3 w-3 rounded-full border-2 border-white bg-green-500" />
              </div>
              <div className="flex flex-col text-start text-sm">
                <span className="text-muted">{getGreeting()}</span>
                <span className="text-foreground max-w-[120px] truncate font-medium">
                  {fullName}
                </span>
              </div>
              <ChevronDown className="text-muted h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 py-2"
              onClick={() => navigate("/client/profile/settings")}
            >
              <User className="h-5 w-5" />
              <span>{t("profile")}</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DialogTrigger asChild>
              <DropdownMenuItem className="text-destructive hover:text-destructive! flex cursor-pointer items-center gap-2 py-2">
                <LogOut className="text-destructive h-4 w-4" />
                <span>{t("logout")}</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DialogContent
        className="sm:max-w-[400px]!"
        onInteractOutside={(event) => {
          event.preventDefault(); // Prevent dialog from closing on outside click
        }}
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col items-center gap-3 sm:items-start">
              <div className="flex w-fit items-center rounded-full bg-red-50 p-2.5">
                <div className="flex w-fit items-center gap-2 rounded-full bg-red-100 p-3">
                  <CircleAlert className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <h2>{t("confirmLogout")}</h2>
            </div>
          </DialogTitle>
          <DialogDescription>{t("logoutMessage")}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2 justify-between! gap-y-4">
          <DialogClose asChild>
            <Button className="h-10.5 flex-1 rounded-full" variant="outline">
              {t("cancel")}
            </Button>
          </DialogClose>

          <Button
            className="h-10.5 flex-1 rounded-full"
            disabled={isPending}
            variant="destructive"
            onClick={handleLogout}
          >
            {t("logout")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileMenu;
