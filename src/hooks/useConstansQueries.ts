/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConstantsService } from "@/services/constantsService";
import type {
  Currency,
  FAQ,
  languages,
  SpecializationsCategory,
} from "@/types/constants";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

// Query Keys
export const constantsKeys = {
  all: ["constants"] as const,
  currencies: (lang: string) =>
    [...constantsKeys.all, "currencies", lang] as const,
  specializations: (lang: string) =>
    [...constantsKeys.all, "specializations", lang] as const,
  faq: (lang: string) => [...constantsKeys.all, "faq", lang] as const,
  languages: (lang: string) =>
    [...constantsKeys.all, "languages", lang] as const,
  banners: (opts: {
    lang: string;
    filters?: { isActive?: boolean; title?: string };
  }) => {
    const filterValues = opts
      ? Object.values(opts).filter((value) => value !== undefined) // Only include non-undefined values
      : [];

    return [...constantsKeys.all, ...filterValues] as const;
  },
};

type ApiErrorBody = { message: string; statusCode: number };
export type ApiError = AxiosError<ApiErrorBody>;

export const useCurrenciesQuery = (
  options?: Partial<
    UseQueryOptions<
      Currency[], // raw response
      ApiError
    >
  >,
) => {
  const { i18n } = useTranslation();
  return useQuery<Currency[], ApiError>({
    queryKey: constantsKeys.currencies(i18n.language),
    queryFn: ConstantsService.getCurrencies,
    ...options,
  });
};
export const useSpecializationsQuery = (
  options?: Partial<
    UseQueryOptions<
      SpecializationsCategory[], // raw response
      ApiError
    >
  >,
) => {
  const { i18n } = useTranslation();
  return useQuery<SpecializationsCategory[], ApiError>({
    queryKey: constantsKeys.specializations(i18n.language),
    queryFn: ConstantsService.getSpecializations,
    ...options,
  });
};
export const useLanguagesQuery = (
  options?: Partial<
    UseQueryOptions<
      languages[], // raw response
      ApiError
    >
  >,
) => {
  const { i18n } = useTranslation();
  return useQuery<languages[], ApiError>({
    queryKey: constantsKeys.languages(i18n.language),
    queryFn: ConstantsService.getLanguages,
    ...options,
  });
};

export const useFAQsQuery = (
  options?: Partial<UseQueryOptions<FAQ[], ApiError>>,
) => {
  const { i18n } = useTranslation();
  return useQuery<FAQ[], ApiError>({
    queryKey: constantsKeys.faq(i18n.language),
    queryFn: ConstantsService.getFAQs,
    ...options,
  });
};

export const useFAQsByCategoryQuery = (
  categoryKey?: string,
  options?: Partial<UseQueryOptions<FAQ[], ApiError>>,
) => {
  const { i18n } = useTranslation();
  return useQuery<FAQ[], ApiError>({
    queryKey: [...constantsKeys.faq(i18n.language), categoryKey || "all"],
    queryFn: () => ConstantsService.getFAQsByCategory(categoryKey),
    ...options,
  });
};

export const useGetBannersQuery = (opts?: {
  filters?: { isActive?: boolean; title?: string };
  options?: Partial<UseQueryOptions<unknown, ApiError>>;
}) => {
  const { i18n } = useTranslation();

  const { filters, options } = opts || {};
  return useQuery<unknown, ApiError>({
    queryKey: constantsKeys.banners({ lang: i18n.language, filters }),
    queryFn: () => ConstantsService.getBanners(filters),
    ...options,
  });
  
};
export const usePracticeTypesQuery = (
  options?: Partial<
    UseQueryOptions<
      { code: string; name: string }[], // response
      ApiError
    >
  >,
) => {
  const { i18n } = useTranslation();
  return useQuery<any[], ApiError>({
    queryKey: [...constantsKeys.all, "practiceTypes", i18n.language],
    queryFn: ConstantsService.getPracticeTypes,
    ...options,
  });
};
export const useCaseDocTypesQuery = (
  options?: Partial<UseQueryOptions<any[], ApiError>>
) => {
  return useQuery<any[], ApiError>({
    queryKey: [...constantsKeys.all, "caseDocTypes"],
    queryFn: ConstantsService.getCaseDocTypes,
    ...options,
  });
};

export const useServicesNeededQuery = (
  options?: Partial<UseQueryOptions<any[], ApiError>>
) => {
  return useQuery<any[], ApiError>({
    queryKey: [...constantsKeys.all, "caseServicesNeed"],
    queryFn: ConstantsService.getServicesNeeded,
    ...options,
  });
};


