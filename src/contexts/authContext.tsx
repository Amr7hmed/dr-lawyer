import { useMeQuery } from "@/hooks/useAuthQueries";
import { useAuthStore } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import React, { type ReactNode, useEffect } from "react";
import { useShallow } from "zustand/shallow";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { clearSession } = useAuthStore(
    useShallow((state) => ({
      clearSession: state.clearSession,
    })),
  );

  const queryClient = useQueryClient();

  const { error } = useMeQuery();

  useEffect(() => {
    if (error) {
      clearSession();
      queryClient.clear();
    }
  }, [error, clearSession, queryClient]);

  return <>{children}</>;
};
