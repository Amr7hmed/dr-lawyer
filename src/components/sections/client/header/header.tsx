/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from "@/assets/logo-2.png";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { Bell, MessageCircleMoreIcon, Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useShallow } from "zustand/shallow";
import MobileMenu from "./mobileMenu";
import ProfileMenu from "./profileMenu";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { IconRightArrow } from "@/assets/icons";
import { usePracticeTypesQuery } from "@/hooks/useConstansQueries";
import Spinner from "@/components/common/spinner";

export default function Header() {
  const { t } = useTranslation("clientHome");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    })),
  );

  const { data: practiceTypes, isLoading: isLoadingPracticeTypes } =
    usePracticeTypesQuery();


  return (
    <>
      <header className="bg-white">
        <Container className="flex h-20 max-w-screen items-center justify-between gap-8">
          <div className="flex flex-1 items-center gap-6">
            <Link to="/client" className="shrink-0">
              <div className="flex items-center overflow-hidden">
                <img src={logo} alt="logo" className="h-[46px] w-[200px]" />
              </div>
            </Link>
            <div className="relative hidden w-full max-w-md xl:flex">
              <Search className="text-muted absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
              <Input
                type="search"
                placeholder={t("search")}
                className="border-border h-11 w-full rounded-2xl border ps-10 pe-4"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center justify-center gap-2 relative">
            <div className="hidden items-center gap-2 xl:flex">
              {/* زرار Create Request + DropDown */}
              <div className="relative">
                <Button
                  className="flex h-10 items-center rounded-full"
                  size={"lg"}
                  onClick={() => setOpen(!open)}
                >
                  <Plus />
                  {t("createRequest")}
                </Button>

                {open && (
                  <div className="absolute right-0 mt-2 rounded-xl border bg-white shadow-lg z-50 p-[16px] min-w-max">
                    <ul className="flex flex-col gap-[16px]">
                      {isLoadingPracticeTypes && (
                        <div className="flex h-12 w-full items-center justify-center">
                          <Spinner />
                        </div>
                      )}

                      {practiceTypes?.map((item: any) => (
                        <li
                          key={item.code}
                          onClick={() => {
                            setOpen(false);
                            navigate(`/client/cases/new/${item.code}`);
                          }}
                          className="p-[16px] cursor-pointer hover:bg-gray-100 rounded-lg flex items-center gap-[12px] justify-between"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-neutral-800 text-sm font-semibold">
                              {item.name}
                            </span>
                            <span className="text-Gray-600 text-xs">
                              {item.desc}
                            </span>
                          </div>
                          <IconRightArrow color={"#667085"} size={20} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Link to="/client/cases/requests">
                <Button variant="ghost" className="text-muted font-bold">
                  {t("manageCases")}
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-0.5">
              <Link to="/client/messages">
                <Button variant="ghost" size="icon">
                  <MessageCircleMoreIcon className="fill-icon h-6.5! w-6.5! text-white" />
                </Button>
              </Link>
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
