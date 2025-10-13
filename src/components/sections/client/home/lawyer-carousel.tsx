import LawyerCard from "@/components/sections/client/home/lawyer-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface LawyerCardData {
  name: string;
  location: string;
  rate: string;
  ratings: string;
  experience: string;
  avatar?: string;
}

interface LawyerCarouselProps {
  title: string;
  lawyers: LawyerCardData[];
}

export default function LawyerCarousel({
  title,
  lawyers,
}: LawyerCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const {
    i18n: { language },
  } = useTranslation();

  const onSelect = useCallback(() => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section>
      <h2 className="text-text-dark mb-6 text-2xl font-bold">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          direction: language === "ar" ? "rtl" : "ltr",
        }}
        setApi={setApi}
        className="w-full"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <CarouselContent className="-ml-4">
          {lawyers.map((lawyer, index) => (
            <CarouselItem
              key={index}
              className="basis-full pl-4 md:basis-1/2 xl:basis-1/3"
            >
              <LawyerCard {...lawyer} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className={cn(
            "border-card-border absolute top-1/2 left-0 -ml-5 h-10 w-10 -translate-y-1/2 rounded-full border bg-white shadow-md transition-opacity",
            !canScrollPrev && "pointer-events-none opacity-0!"
          )}
        />
        <CarouselNext
          className={cn(
            "border-card-border absolute top-1/2 right-0 -mr-5 h-10 w-10 -translate-y-1/2 rounded-full border bg-white shadow-md transition-opacity",
            !canScrollNext && "pointer-events-none opacity-0!"
          )}
        />
      </Carousel>
    </section>
  );
}
