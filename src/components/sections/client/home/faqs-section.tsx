import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useFAQsQuery } from "@/hooks/useConstansQueries";

export default function FAQsSection() {
  const { t } = useTranslation("clientHome");
  const { data, isLoading } = useFAQsQuery();

  return (
    <section className="border-border rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-2xl font-bold">{t("faqs")}</h2>
      {isLoading ? (
        <div className="mt-4 space-y-4">
          {[...Array(3)].map((_, index) => (
            <div className="space-y-6" key={index}>
              <Skeleton className="bg-icon/30 w-fill h-8 sm:w-2/3 lg:w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((faq) => (
              <AccordionItem
                key={faq.key}
                value={faq.key}
                className="border-border-light border-b"
              >
                <AccordionTrigger className="py-4 text-left text-base hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <p className="text-muted-foreground py-4">{t("noFaqs")}</p>
          )}
        </Accordion>

      )}
    </section>
  );
}
