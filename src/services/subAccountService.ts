/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";

export type SubAccount = {
  id: string;
  fullName: string;
  email: string;
  gender: string;
  lawyerExperience: number;
  isActive: boolean;
  createdAt: string;
  OffersCount: number;
  assignedCasesCount: number;
};

export type SubAccountCase = {
  id: string;
  title: string;
  status: string;
  caseType: string;
  practiceType: string;
  clientId: string;
  assignedLawyerUserId?: string;
  createdAt: string;
};

export type SubAccountCasesResponse = {
  data: SubAccountCase[];
  total: number;
  page: number;
  limit: number;
};

export type SubAccountOffer = {
  id: string;
  caseId: string;
  lawyerUserId: string;
  status: string;
  createdAt: string;
};

export type SubAccountOffersResponse = {
  data: SubAccountOffer[];
  total: number;
  page: number;
  limit: number;
};

export class SubAccountService {
  static async getSubAccounts(params?: { limit?: number; page?: number }): Promise<SubAccount[]> {
    const response = await api.get("/api/users/lawyers/me/sub-accounts", {
      params,
    });
    return response.data.data;
  }



  static async getSubAccountById(
    id: string
  ): Promise<{ success: boolean; message: string; data: SubAccount }> {
    const response = await api.get(`/api/users/lawyers/me/sub-accounts/${id}`);
    return response.data;
  }

  static async getSubAccountData<T>(
    id: string,
    type: "cases" | "offers",
    params?: Record<string, any>
  ): Promise<T> {
    const response = await api.get(`/api/users/lawyers/me/sub-accounts/${id}/${type}`, {
      params,
    });
    return response.data;
  }
  static async createSubAccount(data: {
    fullName: string;
    gender: "male" | "female";
    email: string;
    password: string;
    lawyerExperience: number;
  }): Promise<SubAccount> {
    const response = await api.post("/api/users/lawyers/me/sub-accounts", data);
    return response.data;
  }
  static async updateSubAccount(
    id: string,
    data: {
      fullName?: string;
      gender?: "male" | "female";
      email?: string;
      password?: string;
      lawyerExperience?: number;
      isActive?: boolean;
    }
  ): Promise<{ success: boolean; message: string; data: SubAccount }> {
    const response = await api.patch(`/api/users/lawyers/me/sub-accounts/${id}`, data);
    return response.data;
  }


}
