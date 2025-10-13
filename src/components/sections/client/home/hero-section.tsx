import Autoplay from "embla-carousel-autoplay";

import hero from "@/assets/hero.png";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  // Receive Embla API instance from Carousel
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // const { data } = useGetBannersQuery({ filters: { isActive: true } });

  const {
    i18n: { language },
  } = useTranslation();

  // Update selected index when slide changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    setScrollSnaps(api.scrollSnapList());

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  const slides = [
    {
      title: "Easily connect with verified Lawyers",
      description: "From fast turnover to get it done",
      image: hero,
    },
    {
      title: "Find the Right Legal Expert for You",
      description: "Browse by specialty, location, and experience",
      image: hero,
    },
    {
      title: "Secure and Confidential Consultations",
      description: "Your privacy is our top priority",
      image: hero,
    },
  ];

  return (
    <section className="relative h-[225px]! w-full overflow-hidden pb-6">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
          direction: language === "ar" ? "rtl" : "ltr",
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        dir={language === "ar" ? "rtl" : "ltr"}
        className="h-full w-full"
      >
        <CarouselContent className="h-full!">
          {slides.map((slide, i) => (
            <CarouselItem key={i} className="min-h-full rtl:flex-row-reverse">
              <div className="bg-primary relative flex h-full w-full items-center justify-between rounded-xl p-6 md:p-10 rtl:flex-row-reverse">
                <div className="z-10 max-w-md text-white">
                  <h1 className="mb-2 text-2xl font-bold">{slide.title}</h1>
                  <p className="mb-4 text-sm md:mb-6 md:text-lg">
                    {slide.description}
                  </p>
                  <Button
                    variant={"outline"}
                    className="text-primary hover:text-primary h-10 rounded-full px-4 text-sm font-semibold md:px-6 md:text-base"
                  >
                    Create Request
                  </Button>
                </div>

                {/* Background image & gradient */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt="Hero"
                    className="absolute right-0 h-full object-cover opacity-70"
                  />
                  <div className="from-primary-dark absolute inset-0 bg-gradient-to-r to-transparent" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Prev / Next buttons */}
      </Carousel>

      {/* Pagination dots */}
      <div className="absolute bottom-0.5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              selectedIndex === i ? "bg-primary" : "cursor-pointer bg-gray-400",
            )}
          />
        ))}
      </div>
    </section>
  );
}
