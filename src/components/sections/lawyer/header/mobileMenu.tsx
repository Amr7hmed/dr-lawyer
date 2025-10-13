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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLogoutMutation } from "@/hooks/useAuthQueries";
import {
  CircleAlert,
  Edit,
  LogOut,
  Menu,
  TableOfContents,
} from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

type MobileMenuProps = {
  fullName: string;
  profileImage?: string;
};

const MobileMenu = ({ fullName, profileImage }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const {
    i18n: { language },
  } = useTranslation();
  const { t } = useTranslation("clientHome");

  const searchRef = useRef<HTMLInputElement>(null);
  function getGreeting(): string {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return t("greetingMorning");
    if (hour >= 12 && hour < 17) return t("greetingAfternoon");
    if (hour >= 17 && hour < 21) return t("greetingEvening");
    return t("greetingNight");
  }

  return (
    <div className="flex items-center gap-2 xl:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-text-medium">
            <Menu className="h-6! w-6!" />
            <span className="sr-only">{t("toggleMenu")}</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={language === "ar" ? "left" : "right"}
          className="w-[300px] gap-2 sm:w-[400px]"
          aria-describedby={undefined}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            searchRef.current?.focus();
          }}
        >
          <SheetHeader>
            <SheetTitle>
              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
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
                    <span className="text-foreground max-w-[130px] truncate font-medium">
                      {fullName}
                    </span>
                  </div>

                  <span className="bg-green-online absolute right-0 bottom-0 block h-3 w-3 rounded-full ring-2 ring-white" />
                </div>
                <div className="flex items-center">
                  <Tooltip defaultOpen={false}>
                    <TooltipTrigger asChild>
                      <SheetClose asChild>
                        <Button
                          onClick={() => setOpen(true)}
                          variant="ghost"
                          size="icon"
                        >
                          <LogOut className="text-muted h-4 w-4" />
                        </Button>
                      </SheetClose>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("logout")}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                          <Edit className="text-muted h-4 w-4" />
                        </Button>
                      </SheetClose>
                    </TooltipTrigger>
                    <TooltipContent>{t("profile")}</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-start gap-4 px-4">
            <Input
              placeholder={t("search")}
              ref={searchRef}
              className="border-border h-10 w-full rounded-full"
            />
            <Separator />
            <h4 className="text-muted text-sm font-bold">{t("requests")}</h4>
            <div className="flex w-full flex-col gap-2">
              <SheetClose asChild>
              </SheetClose>
              <SheetClose asChild>
                <Link to={"/client/cases/requests"} className="w-full">
                  <Button
                    variant={"ghost"}
                    className="text-muted w-full justify-start px-0!"
                  >
                    <TableOfContents className="text-foreground h-5! w-5! rotate-180" />
                    {t("manageCases")}
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <LogoutModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default MobileMenu;

const LogoutModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (boolean: boolean) => void;
}) => {
  const { mutateAsync: logout, isPending } = useLogoutMutation({
    onSettled: () => setOpen(false),
  });

  const handleLogout = async () => {
    await logout();
  };

  const { t } = useTranslation("clientHome");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[400px]!"
        onInteractOutside={(event) => event.preventDefault()}
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col items-center gap-3 sm:items-start">
              <div className="flex w-fit items-center rounded-full bg-red-50 p-2">
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
