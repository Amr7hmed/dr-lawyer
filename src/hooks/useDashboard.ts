// hooks/useDashboard.ts
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { DashboardService, type DashboardData } from "@/services/dashboardService";

type ApiErrorBody = { message: string; statusCode: number };
export type ApiError = AxiosError<ApiErrorBody>;

export const dashboardKeys = {
  all: ["dashboard"] as const,
  home: () => [...dashboardKeys.all, "home"] as const,
};

export const useGetHomeDashboardQuery = (opts?: {
  options?: Partial<UseQueryOptions<DashboardData, ApiError>>;
}) => {
  const { options } = opts || {};
  return useQuery<DashboardData, ApiError>({
    queryKey: dashboardKeys.home(),
    queryFn: () => DashboardService.getHomeDashboard(),
    ...options,
  });
};
