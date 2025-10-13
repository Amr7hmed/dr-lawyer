/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { useFAQsByCategoryQuery } from "@/hooks/useConstansQueries";
import { useTranslation } from "react-i18next";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { IconSearch } from "@/assets/icons";

export default function ProfileLawyerHelpAndSupport() {
    const [activeCategory, setActiveCategory] = useState<any>(undefined);
    const { t } = useTranslation("clientHome");

    const { data, isLoading } = useFAQsByCategoryQuery();
    const categories = useMemo(() => {
        if (!data) return [];
        return Object.keys(data).map((key) => ({
            key,
            label: key,
        }));
    }, [data]);

    const faqs = useMemo(() => {
        if (!data) return [];
        if (!activeCategory) {
            return Object.values(data).flat();
        }
        return data[activeCategory] || [];
    }, [data, activeCategory]);


    const [search, setSearch] = useState("");

    const filteredFaqs = useMemo(() => {
        if (!faqs) return [];
        if (!search.trim()) return faqs;
        return faqs.filter((faq: any) =>
            faq.question.toLowerCase().includes(search.toLowerCase())
        );
    }, [faqs, search]);


    return (
        <div className=" w-full flex flex-col gap-3 h-[90vh]  bg-white rounded-2xl overflow-hidden px-[20px] py-[30px]">
            <div className="w-full  inline-flex flex-col justify-start items-start gap-7">

                <div className="w-full self-stretch inline-flex justify-start items-center gap-1.5">
                    <div className={`w-fit px-8 py-2   rounded-[75px] outline cursor-pointer
                            outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5
                            ${!activeCategory ? "bg-slate-600 outline-slate-600" : "bg-white outline-slate-300"
                        }`}
                        onClick={() => setActiveCategory(undefined)}>


                        <div className={`text-center justify-center text-xl font-semibold font-['Manrope'] leading-snug 
                                 ${!activeCategory ? "text-white" : "text-slate-600"
                            }`}>General</div>


                    </div>
                    {categories.map((cat) => (
                        <div
                            key={cat.key}
                            className={`w-fit px-8 py-2 rounded-[75px] outline-1 
                                outline-offset-[-1px] cursor-pointer flex justify-center items-center gap-2.5 ${activeCategory === cat.key
                                    ? "bg-slate-600 outline-slate-600"
                                    : "bg-white outline-slate-300"
                                }`}
                            onClick={() => setActiveCategory(cat.key)}
                        >
                            <div
                                className={` text-center justify-center text-xl font-semibold font-['Manrope'] leading-snug ${activeCategory === cat.key ? "text-white" : "text-slate-600"
                                    }`}
                            >
                                {cat.label}
                            </div>
                        </div>
                    ))}
                </div>


                <div className=" w-full h-14 relative flex items-center gap-2 bg-[#7d8cac17]   rounded-xl px-4">
                    <IconSearch />
                    <input
                        type="text"
                        placeholder="Search topics or questions"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="justify-start text-slate-400 text-base font-normal font-['Manrope'] leading-normal flex-1 h-full focus:outline-none focus:ring-0"
                    />

                </div>


                <div className="w-full justify-start text-gray-700 text-lg font-medium font-['Manrope'] leading-relaxed tracking-tight">Top Questions</div>
                {isLoading ? (
                    <div className="mt-4 space-y-4">
                        {[...Array(3)].map((_, index) => (
                            <div className="space-y-6" key={index}>
                                <Skeleton className="bg-icon/30 w-fill h-8 sm:w-2/3 lg:w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <Accordion type="single" collapsible className="w-full space-y-3">
                        {Array.isArray(filteredFaqs) && filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq) => (
                                <AccordionItem
                                    key={faq.key}
                                    value={faq.key}
                                    className="border border-gray-200 rounded-xl px-4 shadow-sm"
                                >
                                    <AccordionTrigger className="py-4 text-left text-base font-medium hover:no-underline flex justify-between items-center ">
                                        <span>{faq.question}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-500 pb-4">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        ) : (
                            <p className="text-muted-foreground py-4">{t("noFaqs")}</p>
                        )}

                    </Accordion>




                )}
            </div>
        </div>
    );
}
