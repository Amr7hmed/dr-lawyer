/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";

export class SettingsService {
  static async getSettings(): Promise<any> {
    const response = await api.get("/api/notifications/settings");
    return response.data;
  }

static async updateSettings(data: Record<string, boolean>): Promise<any> {
  const response = await api.patch("/api/notifications/settings", data);
  return response.data;
}

  
  static async sendMessage(formData: FormData): Promise<any> {
    const response = await api.post("/api/users/contact-support", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}
