import CategoryTabs from "@/components/sections/client/home/category-tabs";
import FAQsSection from "@/components/sections/client/home/faqs-section";
import FeatureCardsSection from "@/components/sections/client/home/feature-cards-section";
import { HeroSection } from "@/components/sections/client/home/hero-section";
import LawyerCarousel from "@/components/sections/client/home/lawyer-carousel";
import Container from "@/components/ui/container";
import { useGetLawyersQuery, useGetFeaturedLawyersQuery } from "@/hooks/useUserQueries";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  LawyerFromAPI, LawyerCardData
} from "@/types/auth";

const transformLawyers = (lawyers: LawyerFromAPI[]): LawyerCardData[] => {
  return lawyers.map((lawyer) => ({
    name: lawyer.fullName,
    location: lawyer.lawyerProfile?.country ?? "Unknown",
    rate: lawyer.practiceTypeTranslated?.title ?? "N/A",
    ratings: "5.0",
    experience: "10",
    avatar: lawyer.profileImage ?? "/placeholder.svg",
  }));
};


const ClientHomePage = () => {
  const { t } = useTranslation("clientHome");
  const { data, isLoading } = useGetLawyersQuery();
  const { data: featuredLawyers, isLoading: isLoadingFeatured } = useGetFeaturedLawyersQuery();
  return (
    <>
      <title>{`Dr-Lawyer | ${t("title")}`}</title>
      <Container className="flex flex-col gap-6 py-6">
        <CategoryTabs />
        <HeroSection />
        <FeatureCardsSection />
        <div className="flex flex-col gap-8 rounded-2xl bg-white p-8 shadow-sm">
          {isLoading ? (
            <div className="mt-4 space-y-4">
              {[...Array(3)].map((_, index) => (
                <div className="space-y-6" key={index}>
                  <Skeleton className="bg-icon/30 w-fill h-8 sm:w-2/3 lg:w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <LawyerCarousel
              title={t("nearbyLawyers")}
              lawyers={data ? transformLawyers(data) : []}
            />
          )}


          <div className="flex flex-col gap-8 rounded-2xl bg-white p-8 shadow-sm">
            {isLoadingFeatured ? (
              <div className="mt-4 space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div className="space-y-6" key={index}>
                    <Skeleton className="bg-icon/30 w-fill h-8 sm:w-2/3 lg:w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <LawyerCarousel
                title={t("featuredLawyers")}
                lawyers={featuredLawyers ? transformLawyers(featuredLawyers) : []}
              />
            )}
          </div>

        </div>
        <FAQsSection />
      </Container>
    </>
  );
};

export default ClientHomePage;
