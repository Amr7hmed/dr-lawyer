// services/dashboardService.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";

export type DashboardData = {
  activity: {
    casesCompleted: number;
    hires: number;
    offersSent: number;
  };
  avatarUrl: string | null;
  clicks: number;
  id: string;
  name: string;
  performancePercent: number;
  ratingCount: number;
  ratingValue: number;
  revenue: {
    totalEarnings: number;
    activeCasesEarnings: number;
    activeCasesCount: number;
  };
  message: string;
  success: boolean;
};

export class DashboardService {
  static async getHomeDashboard(): Promise<DashboardData> {
    const response = await api.get("/api/users/lawyers/home-dashboard");
    return response.data.data; // لان الـ API بيرجع { data, message, success }
  }
}
