// lib/axios.ts
import { useAuthStore } from "@/store/authStore";
import type { AuthTokens, User } from "@/types/auth";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { queryClient } from "./queryClient";
import i18next from "i18next";

// --- Type Augmentation for AxiosRequestConfig ---
// This tells TypeScript that AxiosRequestConfig can have these custom properties.
declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
    _skipAuth?: boolean; // Flag to skip auth for certain requests
  }
}

// --- End Type Augmentation ---

// Types for better type safety
interface RefreshResponse {
  accessToken: string;
  user: User; // Replace with your actual user type
}

interface QueueItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (value: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (error: any) => void;
}

// interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
//   _retry?: boolean;
//   _skipAuth?: boolean; // Flag to skip auth for certain requests
// }

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  // timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Refresh token state management
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    // Set Accept-Language header
    config.headers["Accept-Language"] = i18next.language === "ar" ? "ar" : "en";
    // Skip auth for certain endpoints (like refresh token)
    if (config._skipAuth) {
      return config;
    }

    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Only handle 401 errors for requests that aren't already retries
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest._skipAuth
    ) {
      originalRequest._retry = true;

      // If already refreshing, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(api(originalRequest));
            },
            reject: (err: AxiosError) => reject(err),
          });
        });
      }

      // Start refresh process
      isRefreshing = true;

      try {
        // Make refresh request with skip auth flag
        const refreshResponse = await api.post<RefreshResponse>(
          "/auth/refresh",
          {},
          {
            _skipAuth: true,
            withCredentials: true,
          },
        );

        const { accessToken, user } = refreshResponse.data;

        // Update auth store
        useAuthStore
          .getState()
          .setSession({ tokens: accessToken as unknown as AuthTokens, user });

        // ✅ Invalidate React Query cache
        queryClient.invalidateQueries();

        // Process queued requests
        processQueue(null, accessToken);

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh failure
        const axiosError = refreshError as AxiosError;

        // Process failed queue
        processQueue(axiosError, null);

        // Clear auth state
        useAuthStore.getState().clearSession();

        // ✅ Invalidate React Query cache

        queryClient.clear();

        // Only redirect if it's a 401/403 refresh error (not network error)
        if (
          axiosError.response?.status === 401 ||
          axiosError.response?.status === 403
        ) {
          // Redirect to login page
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("auth:logout"));
            // window.location.href = "/auth/login";
          }
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// Helper function to check if a request is currently being refreshed
export const isTokenRefreshing = (): boolean => isRefreshing;

// Helper function to clear the refresh queue (useful for testing)
export const clearRefreshQueue = (): void => {
  failedQueue = [];
  isRefreshing = false;
};

export default api;
