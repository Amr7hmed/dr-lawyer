/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from "@tanstack/react-query";
import { SettingsService } from "@/services/settingsService";
import type { AxiosError } from "axios";

export const useGetNotificationSettingsQuery = (
  options?: Partial<UseQueryOptions<any, AxiosError>>
) => {
  return useQuery<any, AxiosError>({
    queryKey: ["notification", "settings"],
    queryFn: () => SettingsService.getSettings(),
    ...options,
  });
};

export const useUpdateNotificationSettingsMutation = (
  options?: UseMutationOptions<any, AxiosError, Record<string, boolean>>
) => {
  return useMutation<any, AxiosError, Record<string, boolean>>({
    mutationFn: (data) => SettingsService.updateSettings(data),
    ...options,
  });
};

export const useContactSupportMutation = (
  options?: UseMutationOptions<any, AxiosError, FormData>
) => {
  return useMutation<any, AxiosError, FormData>({
    mutationFn: (formData) => SettingsService.sendMessage(formData),
    ...options,
  });
};