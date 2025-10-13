import type { AuthTokens, User } from "@/types/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  tokenExpiry: number | null;

  // Actions
  setSession: (data: { user: User; tokens: AuthTokens }) => void;
  clearSession: () => void;
  updateUser: (user: Partial<User>) => void;
  setIsLoading: (isLoading: boolean) => void;

  // Helpers
  // isTokenExpired: () => boolean;
  // getTimeUntilExpiry: () => number;
  hasRole: (role: User["role"]) => boolean;
  // hasPermission: (permission: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      tokenExpiry: null,
      isLoading: false,

      setSession: ({ user, tokens }) => {
        // const expiryTime = Date.now() + tokens.expiresIn * 1000;
        set((state) => {
          state.user = user;
          state.accessToken = tokens.accessToken;
          // state.refreshToken = tokens.refreshToken;
          state.isAuthenticated = true;

          // state.tokenExpiry = expiryTime;
        });
      },

      clearSession: () => {
        set((state) => {
          state.user = null;
          state.accessToken = null;
          state.refreshToken = null;
          state.isAuthenticated = false;
          state.tokenExpiry = null;
        });
      },

      setIsLoading: (isLoading) => {
        set((state) => {
          state.isLoading = isLoading;
        });
      },
      updateUser: (userData) => {
        set((state) => {
          if (state.user) {
            Object.assign(state.user, userData);
          }
        });
      },

      // isTokenExpired: () => {
      //   const { tokenExpiry } = get();
      //   if (!tokenExpiry) return true;
      //   return Date.now() >= tokenExpiry - 300000;
      // },

      // getTimeUntilExpiry: () => {
      //   const { tokenExpiry } = get();
      //   if (!tokenExpiry) return 0;
      //   return Math.max(0, tokenExpiry - Date.now());
      // },

      hasRole: (role: string) => {
        const { user } = get();
        return user?.role === role;
      },

      // hasPermission: (permission: string) => {
      //   const { user } = get();
      //   if (!user) return false;

      //   const permissions: Record<string, string[]> = {
      //     admin: ["read", "write", "delete", "manage_users"],
      //     moderator: ["read", "write", "moderate"],
      //     user: ["read", "write_own"],
      //   };

      //   return permissions[user.role]?.includes(permission) || false;
      // },
    })),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
      }),
      // ✅ Track hydration status
    },
  ),
);
