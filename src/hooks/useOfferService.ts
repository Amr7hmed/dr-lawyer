/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { OfferService, type CreateOfferPayload } from "@/services/offerService";

type ApiErrorBody = { message: string; statusCode: number };
export type ApiError = AxiosError<ApiErrorBody>;

export const useCreateOfferMutation = (
  options?: UseMutationOptions<any, ApiError, { payload: CreateOfferPayload; config?: AxiosRequestConfig }>
) => {
  return useMutation({
    mutationFn: ({ payload, config }) => OfferService.createOffer(payload, config),
    ...options,
  });
};
