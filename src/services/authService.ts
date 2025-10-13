import api from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import type {
  CompleteProfilePayload,
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

export class AuthService {
  static async getCurrentUser(): Promise<{ data: User }> {
    const response = await api.get<{ data: User }>("api/users/me");

    const res = response.data;

    // Update Zustand with new user info
    useAuthStore.getState().updateUser(res.data);

    return res;
  }

  static async register(
    credentials: RegisterCredentials,
  ): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(
      "/auth/register",
      credentials,
      {
        _skipAuth: true,
      },
    );
    return response.data;
  }

  static async verifyOtp(
    credentials: VerifyOtpCredentials,
  ): Promise<VerifyOtpResponse> {
    const response = await api.post("/auth/verify-otp", credentials, {
      _skipAuth: true,
    });
    return response.data;
  }

  static async setPassword(credentials: SetPasswordCredentials): Promise<void> {
    const response = await api.post("/auth/set-password", credentials);
    return response.data;
  }

  static async profileSetup(
    credentials: CompleteProfilePayload,
  ): Promise<void> {
    const response = await api.post("/api/users/complete-profile", credentials);
    return response.data;
  }

  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/login", credentials, {
      _skipAuth: true,
    });
    return response.data;
  }

  static async forgotPassword(
    credentials: ForgotPasswordCredentials,
  ): Promise<void> {
    const response = await api.post(
      "/auth/request-password-reset",
      credentials,
      {
        _skipAuth: true,
      },
    );
    return response.data;
  }

  static async resetPassword(
    credentials: ResetPasswordCredentials,
  ): Promise<void> {
    const response = await api.post("/auth/reset-password", credentials, {
      _skipAuth: true,
    });
    return response.data;
  }

  // OAuth Methods
  // static async googleLogin(): Promise<string> {
  //   // Returns the Google OAuth URL
  //   const response = await api.get<{ url: string }>("/auth/google", {
  //     _skipAuth: true,
  //   });
  //   return response.data.url;
  // }

  static async logout(): Promise<void> {
    const response = await api.post("/auth/logout");
    return response.data;
  }

  // static async refreshToken(): Promise<AuthResponse> {
  //   const response = await api.post<AuthResponse>("/auth/refresh");
  //   return response.data;
  // }

  // static async updateProfile(data: Partial<User>): Promise<User> {
  //   const response = await api.put<User>("/auth/profile", data);
  //   return response.data;
  // }

  // static async changePassword(data: {
  //   currentPassword: string;
  //   newPassword: string;
  // }): Promise<void> {
  //   await api.post("/auth/change-password", data);
  // }

  // static async resendVerification(): Promise<void> {
  //   await api.post("/auth/resend-verification");
  // }
}
