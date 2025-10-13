import api from "@/lib/axios";
import type {
  CompleteProfilePayload,
  FileUploadType,
  User,LawyerFromAPI
} from "@/types/auth";
import type { AxiosRequestConfig } from "axios";

export class UserService {
  static async profileSetup(
    credentials: CompleteProfilePayload,
  ): Promise<{ data: User }> {
    const response = await api.post("/api/users/complete-profile", credentials);
    return response.data;
  }
  static async uploadProfileImg(
    formData: FormData,
    config?: AxiosRequestConfig,
  ): Promise<void> {
    const response = await api.post(
      "/api/users/upload-profile-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        ...config, // 👈 merge onUploadProgress here
      },
    );

    return response.data;
  }

  static async uploadLawyerDocument({
    formData,
    type,
    config,
  }: {
    formData: FormData;
    type: FileUploadType;
    config?: AxiosRequestConfig;
  }): Promise<void> {
    const response = await api.post(
      "/api/users/upload-lawyer-document",
      formData,
      {
        params: { type },
        headers: {
          "Content-Type": "multipart/form-data",
        },
        ...config, // ✅ spread the extra config like onUploadProgress
      },
    );

    return response.data;
  }
  static async getLawyers(): Promise<LawyerFromAPI[]> {
    const response = await api.get("/api/users/lawyers");
    return response.data.data;
  }
  static async getFeaturedLawyers(): Promise<LawyerFromAPI[]> {
  const response = await api.get("/api/users/lawyers/featured");
  return response.data.data; 
}
}
