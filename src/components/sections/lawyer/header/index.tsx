
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { Bell,  Search } from "lucide-react";
import { useShallow } from "zustand/shallow";
import MobileMenu from "./mobileMenu";
import ProfileMenu from "./profileMenu";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation("clientHome");

  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    })),
  );

  return (
    <>
      <header className="bg-white">
        <Container className="flex h-20 max-w-screen items-center justify-between gap-8">
          <div className="flex  items-center gap-6">
            <p className="text-[color:var(--Text,#212121)] [font-family:Manrope] text-2xl font-bold leading-[125%] tracking-[0.2px]">Browse Cases</p>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center justify-center gap-2">
            <div className="relative  max-w-xl xl:flex  flex w-[350px] h-12 ">
              <Search className="text-muted absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
              <Input
                type="search"
                placeholder={t("search")}
                className="border-border h-11 w-full rounded-2xl border ps-10 pe-4"
              />
            </div>

            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon">
                <Bell className="fill-icon text-icon h-5! w-5!" />
              </Button>
            </div>
            <MobileMenu
              fullName={user?.fullName ?? ""}
              profileImage={user?.profileImage ?? ""}
            />
            <ProfileMenu
              fullName={user?.fullName ?? ""}
              profileImage={user?.profileImage}
            />
          </div>
        </Container>
      </header>
    </>
  );
}
