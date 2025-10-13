import { UserService } from "@/services/userService";
import type {
  CompleteProfilePayload,
  FileUploadType,
  User,LawyerFromAPI
} from "@/types/auth";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError, AxiosRequestConfig } from "axios";

// Query Keys
export const userKeys = {
  all: ["user"] as const,
  lawyers: () => [...userKeys.all, "lawyers"] as const, 
  // me: () => [...userKeys.all, "me"] as const,
};

type ApiErrorBody = { message: string; statusCode: number };
export type ApiError = AxiosError<ApiErrorBody>;
// ============================================
// User Mutations
type UploadProfileImageArgs = {
  formData: FormData;
  config?: AxiosRequestConfig;
};


export const useGetLawyersQuery = (
  options?: Partial<UseQueryOptions<LawyerFromAPI[], ApiError>>,
) => {
  return useQuery<LawyerFromAPI[], ApiError>({
    queryKey: userKeys.lawyers(),
    queryFn: async () => {
      const res = await UserService.getLawyers();
      return res;
    },
    ...options,
  });
};

export const useGetFeaturedLawyersQuery = (
  options?: Partial<UseQueryOptions<LawyerFromAPI[], ApiError>>,
) => {
  return useQuery<LawyerFromAPI[], ApiError>({
    queryKey: [...userKeys.lawyers(), "featured"],
    queryFn: () => UserService.getFeaturedLawyers(),
    ...options,
  });
};



export const useUploadProfileImgMutation = (
  options?: UseMutationOptions<void, ApiError, UploadProfileImageArgs>,
) => {
  return useMutation({
    mutationFn: ({ formData, config }) =>
      UserService.uploadProfileImg(formData, config),
    ...options,
  });
};

export const useUploadLawyerDocumentMutation = (
  options?: UseMutationOptions<
    void,
    ApiError,
    {
      formData: FormData;
      type: FileUploadType;
      config?: AxiosRequestConfig; // ✅ support passing upload progress handler
    }
  >,
) => {
  return useMutation({
    mutationFn: ({ formData, type, config }) =>
      UserService.uploadLawyerDocument({ formData, type, config }),
    ...options,
  });
};

export const useProfileSetupMutation = (
  options?: UseMutationOptions<
    { data: User },
    ApiError,
    CompleteProfilePayload
  >,
) => {
  return useMutation({
    mutationFn: UserService.profileSetup,
    ...options,
  });
};
