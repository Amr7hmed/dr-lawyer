import { AuthService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import type {
  ForgotPasswordCredentials,
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
  ResetPasswordCredentials,
  SetPasswordCredentials,
  User,
  VerifyOtpCredentials,
  VerifyOtpResponse,
} from "@/types/auth";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

// Query Keys
export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
};

type ApiErrorBody = { message: string; statusCode: number };
export type ApiError = AxiosError<ApiErrorBody>;
// ============================================
// Auth Mutations
export const useLoginMutation = (
  options?: UseMutationOptions<LoginResponse, ApiError, LoginCredentials>,
) => {
  const queryClient = useQueryClient();
  const { setSession } = useAuthStore(
    useShallow((state) => ({
      setSession: state.setSession,
    })),
  );

  return useMutation({
    mutationFn: AuthService.login,
    ...options,
    onSuccess: (data, variables, context) => {
      setSession({
        user: data.data.user,
        tokens: { accessToken: data.data.accessToken },
      });

      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      queryClient.setQueryData(authKeys.me(), data.data.user);

      // external logic
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useRegisterMutation = (
  options?: UseMutationOptions<RegisterResponse, ApiError, RegisterCredentials>,
) => {
  return useMutation({
    mutationFn: AuthService.register,
    ...options,
  });
};

export const useVerifyOtpMutation = (
  options?: UseMutationOptions<
    VerifyOtpResponse,
    ApiError,
    VerifyOtpCredentials
  >,
) => {
  return useMutation({
    mutationFn: AuthService.verifyOtp,
    ...options,
  });
};

export const useLogoutMutation = (
  options?: UseMutationOptions<void, Error, void>,
) => {
  const queryClient = useQueryClient();
  const { clearSession } = useAuthStore(
    useShallow((state) => ({
      clearSession: state.clearSession,
    })),
  );

  return useMutation({
    mutationFn: AuthService.logout,
    ...options,
    onSuccess: (data, variables, context) => {
      clearSession();
      // Clear all queries
      queryClient.clear();

      // external logic
      options?.onSuccess?.(data, variables, context);
    },
    onError(error, variables, context) {
      // Clear session even if API call fails
      clearSession();
      queryClient.clear();

      // external logic
      options?.onError?.(error, variables, context);
    },
  });
};

// export const useUpdateProfileMutation = (
//   options?: UseMutationOptions<User, Error, Partial<User>>,
// ) => {
//   const queryClient = useQueryClient();
//   const { updateUser } = useAuthStore(
//     useShallow((state) => ({
//       updateUser: state.updateUser,
//     })),
//   );

//   return useMutation({
//     mutationFn: AuthService.updateProfile,
//     onSuccess: (data) => {
//       updateUser(data);
//       // Update cached user data
//       queryClient.setQueryData(authKeys.me(), data);
//       queryClient.invalidateQueries({ queryKey: authKeys.profile() });
//     },
//     ...options,
//   });
// };

export const useResetPasswordMutation = (
  options?: UseMutationOptions<void, ApiError, ResetPasswordCredentials>,
) => {
  return useMutation({
    mutationFn: AuthService.resetPassword,
    ...options,
  });
};

export const useForgotPasswordMutation = (
  options?: UseMutationOptions<void, ApiError, ForgotPasswordCredentials>,
) => {
  return useMutation({
    mutationFn: AuthService.forgotPassword,
    ...options,
  });
};

export const useSetPasswordMutation = (
  options?: UseMutationOptions<void, ApiError, SetPasswordCredentials>,
) => {
  return useMutation({
    mutationFn: AuthService.setPassword,
    ...options,
  });
};

// ============================================
// Auth Queries
export const useMeQuery = (
  options?: Partial<UseQueryOptions<{ data: User }, ApiError>>,
) => {
  const { isAuthenticated, setIsLoading } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      setIsLoading: state.setIsLoading,
    })),
  );
  const meQuery = useQuery({
    queryKey: authKeys.me(),
    queryFn: AuthService.getCurrentUser,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
    ...options,
    enabled: options?.enabled ?? isAuthenticated,
  });

  useEffect(() => {
    setIsLoading(meQuery.isLoading);
  }, [meQuery.isLoading, setIsLoading]);

  return meQuery;
};
