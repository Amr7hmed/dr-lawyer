/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useGetStreamTokenQuery.ts
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { StreamService } from "@/services/streamService";
import type { AxiosError } from "axios";

// Hook للـ Stream Token
export const useGetStreamTokenQuery = (
  options?: Partial<UseQueryOptions<{ token: string }, AxiosError>>
) => {
  return useQuery<{
    data: any; token: string 
}, AxiosError>({
    queryKey: ["stream", "token"],
    queryFn: () => StreamService.getStreamToken(),
    ...options,
  });
};
export const useGetStreamChannelsQuery = (
  options?: Partial<UseQueryOptions<any[], AxiosError>>
) => {
  return useQuery<any[], AxiosError>({
    queryKey: ["stream", "channels"],
    queryFn: () => StreamService.getChannels(),
    ...options,
  });
};
export const useSendMessageMutation = (
  options?: UseMutationOptions<any, AxiosError, { channelId: string; message: string }>
) => {
  return useMutation<any, AxiosError, { channelId: string; message: string }>({
    mutationFn: ({ channelId, message }) =>
      StreamService.sendMessage(channelId, message),
    ...options,
  });
};