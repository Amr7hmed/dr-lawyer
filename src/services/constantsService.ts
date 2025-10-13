/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";
import type {
  Currency,
  FAQ,
  languages,
  SpecializationsCategory,
} from "@/types/constants";

export class ConstantsService {
  static async getCurrencies(): Promise<Currency[]> {
    const response = await api.get("/api/public/constants/currencies");
    return response.data.data;
  }

  static async getSpecializations(): Promise<SpecializationsCategory[]> {
    const response = await api.get("/api/public/constants/specializations");
    return response.data.data;
  }

  static async getLanguages(): Promise<languages[]> {
    const response = await api.get("/api/public/constants/languages");
    return response.data.data;
  }

  static async getFAQs(): Promise<FAQ[]> {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await api.get("/api/public/constants/faqs");
    return response.data.data;
  }
  static async getFAQsByCategory(categoryKey?: string): Promise<FAQ[]> {
    const response = await api.get("/api/public/constants/faqs", {
      params: categoryKey ? { categoryKey } : undefined,
    });
    return response.data.data;
  }

  static async getBanners(opts?: {
    isActive?: boolean;
    title?: string;
  }): Promise<unknown> {
    const response = await api.get("/api/banners", { params: opts });
    return response.data.data;
  }
  static async getPracticeTypes(): Promise<any> {
  const response = await api.get("/api/public/constants/practice-types");
  return response.data.data;
}
static async getCaseDocTypes(): Promise<any[]> {
  const response = await api.get("/api/public/constants/case-doc-types");
  return response.data.data;
}
static async getServicesNeeded(): Promise<any[]> {
  const response = await api.get("/api/public/constants/services-needed");
  return response.data.data;
}

}
