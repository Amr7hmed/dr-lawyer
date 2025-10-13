/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  SubAccountService,
  type SubAccount,
} from "@/services/subAccountService";

type ApiErrorBody = { message: string; statusCode: number };
export type ApiError = AxiosError<ApiErrorBody>;

export const subAccountKeys = {
  all: ["sub-accounts"] as const,
  list: (params?: { limit?: number; page?: number }) => [...subAccountKeys.all, "list", params] as const,
  data: (id: string, type: "cases" | "offers", params?: any) =>
    [...subAccountKeys.all, id, type, params] as const,
};

export const useGetSubAccountsQuery = (opts?: {
  params?: { limit?: number; page?: number };
  options?: Partial<UseQueryOptions<SubAccount[], ApiError>>;
}) => {
  const { params, options } = opts || {};
  return useQuery<SubAccount[], ApiError>({
    queryKey: subAccountKeys.list(params),
    queryFn: () => SubAccountService.getSubAccounts(params),
    ...options,
  });
};

export const useGetSubAccountDataQuery = <T>(
  id: string,
  type: "cases" | "offers",
  opts?: {
    params?: Record<string, any>;
    options?: Partial<UseQueryOptions<T, ApiError>>;
  }
) => {
  const { params, options } = opts || {};
  return useQuery<T, ApiError>({
    queryKey: subAccountKeys.data(id, type, params),
    queryFn: () => SubAccountService.getSubAccountData<T>(id, type, params),
    ...options,
  });
};

export const useGetSubAccountByIdQuery = (
  id: string,
  opts?: {
    options?: Partial<UseQueryOptions<{ success: boolean; message: string; data: SubAccount }, ApiError>>;
  }
) => {
  const { options } = opts || {};
  return useQuery<{ success: boolean; message: string; data: SubAccount }, ApiError>({
    queryKey: [...subAccountKeys.all, "details", id],
    queryFn: () => SubAccountService.getSubAccountById(id),
    enabled: !!id,
    ...options,
  });
};
