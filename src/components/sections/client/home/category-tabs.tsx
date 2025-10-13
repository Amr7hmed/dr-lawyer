import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useSpecializationsQuery } from "@/hooks/useConstansQueries";
import { cn } from "@/lib/utils";
import { Link, useSearchParams } from "react-router";

export default function CategoryTabs() {
  const { t, i18n } = useTranslation("clientHome");
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useSpecializationsQuery();

  const filterCategory = searchParams.get("category") || "all";

  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: "start",
          direction: i18n.language === "ar" ? "rtl" : "ltr",
          dragFree: true,
        }}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className="w-full"
      >
        <CarouselContent className="flex cursor-grab gap-2">
          {isLoading ? (
            [...Array(10)].map((_, i) => (
              <CarouselItem key={i} className="shrink-0 basis-auto">
                <Skeleton className="border-border bg-icon/30 h-9 w-[100px] rounded-full border" />
              </CarouselItem>
            ))
          ) : (
            <>
              <CarouselItem className="shrink-0 basis-auto rtl:pl-0">
                <Link to="/client" className="underline-none">
                  <Button
                    variant="outline"
                    className={cn(
                      "border-border text-medium cursor-pointer rounded-full bg-white px-6 py-2 text-sm whitespace-nowrap",
                      filterCategory === "all" &&
                        "bg-primary-deep hover:bg-primary-deep text-white hover:text-white",
                    )}
                  >
                    {t("all")}
                  </Button>
                </Link>
              </CarouselItem>

              {data?.flatMap((category) =>
                category.children.map((child) => (
                  <CarouselItem
                    key={child.code}
                    className="shrink-0 basis-auto pl-0"
                  >
                    <Link
                      to={{
                        pathname: "/client",
                        search: `?category=${child.code}`,
                      }}
                      className="underline-none"
                    >
                      <Button
                        variant="outline"
                        className={cn(
                          "border-border text-medium cursor-pointer rounded-full bg-white px-4 py-2 text-sm whitespace-nowrap",
                          filterCategory === child.code &&
                            "bg-primary-deep hover:bg-primary-deep text-white hover:text-white",
                        )}
                      >
                        {child.name}
                      </Button>
                    </Link>
                  </CarouselItem>
                )),
              )}
            </>
          )}
        </CarouselContent>
      </Carousel>

      {/* 🔽 Right fade overlay */}
      <div className="from-accent pointer-events-none absolute top-0 h-full w-16 to-transparent ltr:right-0 ltr:bg-gradient-to-l rtl:left-0 rtl:bg-gradient-to-r" />
    </div>
  );
}
