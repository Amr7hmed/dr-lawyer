import { CaseService } from "@/services/caseService";
import type {
  Case,
  CaseFilter,
  CasesCount,
  CreateCasePayload,
} from "@/types/case";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

// Query Keys
export const caseKeys = {
  all: ["case"] as const,

  getCases: (opts?: CaseFilter & { lang?: string }) => {
    const filterValues = opts
      ? Object.values(opts).filter((value) => value !== undefined) // Only include non-undefined values
      : [];

    return [...caseKeys.all, ...filterValues] as const;
  },

  getCase: (id: string, lang: string) => [...caseKeys.all, id, lang] as const,
  getCasesCount: () => [...caseKeys.all, "count"] as const,

  bestMatches: (opts?: { limit?: number; page?: number; lang?: string }) =>
    [...caseKeys.all, "best-matches", opts] as const,

  favourites: (opts?: { limit?: number; page?: number; lang?: string }) =>
    [...caseKeys.all, "favourites", opts] as const,
};

type ApiErrorBody = { message: string; statusCode: number };
export type ApiError = AxiosError<ApiErrorBody>;
// ============================================
// User Mutations

export const useCreateCaseMutation = (
  options?: UseMutationOptions<void, ApiError, CreateCasePayload>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CaseService.createCase,
    ...options,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: caseKeys.all,
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useGetCasesQuery = (opts?: {
  filters?: CaseFilter;
  options?: Partial<UseQueryOptions<Case[], ApiError>>;
}) => {
  const { i18n } = useTranslation();

  const { filters, options } = opts || {};

  return useQuery({
    queryKey: caseKeys.getCases({ ...(filters || {}), lang: i18n.language }),
    queryFn: () => CaseService.getCases(filters),
    ...options,
  });
};

export const useGetCaseQuery = (
  id: string,
  options?: Partial<UseQueryOptions<Case, ApiError>>,
) => {
  const { i18n } = useTranslation();
  return useQuery<Case, ApiError>({
    queryKey: caseKeys.getCase(id, i18n.language),
    queryFn: () => CaseService.getCase(id),
    ...options,
  });
};

export const useCancelCaseMutation = (
  id: string,
  options?: UseMutationOptions<void, ApiError>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => CaseService.deleteCase(id),
    ...options,
    onSuccess(data, variables, context) {
      options?.onSuccess?.(data, variables, context);
      queryClient.invalidateQueries({
        queryKey: caseKeys.all,
      });
    },
  });
};

export const useGetCasesCountQuery = (
  options?: Partial<UseQueryOptions<CasesCount, ApiError>>,
) => {
  return useQuery({
    queryKey: caseKeys.getCasesCount(),
    queryFn: CaseService.getCasesCount,
    ...options,
  });
};
export const useGetSimilarCasesQuery = (
  id: string,
  options?: Partial<UseQueryOptions<Case[], ApiError>>
) => {
  return useQuery<Case[], ApiError>({
    queryKey: ["cases", id, "similar"],
    queryFn: () => CaseService.getSimilarCases(id),
    enabled: !!id, // عشان ما يشتغلش قبل ما يوصله id
    ...options,
  });
};


export const useAddToFavoritesMutation = () => {
  return useMutation<void, ApiError, string>({
    mutationFn: (caseId: string) => CaseService.addToFavorites(caseId),
  });
};

export const useGetBestMatchesCasesQuery = (opts?: {
  params?: { limit?: number; page?: number };
  options?: Partial<UseQueryOptions<Case[], ApiError>>;
}) => {
  const { i18n } = useTranslation();
  const { params, options } = opts || {};

  return useQuery({
    queryKey: caseKeys.bestMatches({ ...(params || {}), lang: i18n.language }),
    queryFn: () => CaseService.getBestMatches(params),
    ...options,
  });
};

export const useGetFavouriteCasesQuery = (opts?: {
  params?: { limit?: number; page?: number };
  options?: Partial<UseQueryOptions<Case[], ApiError>>;
}) => {
  const { i18n } = useTranslation();
  const { params, options } = opts || {};

  return useQuery({
    queryKey: caseKeys.favourites({ ...(params || {}), lang: i18n.language }),
    queryFn: () => CaseService.getFavouriteCases(params),
    ...options,
  });
};
