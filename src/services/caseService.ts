import api from "@/lib/axios";
import type {
  Case,
  CaseFilter,
  CasesCount,
  CreateCasePayload,
} from "@/types/case";

export class CaseService {
  static async createCase(payload: CreateCasePayload): Promise<void> {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("practiceType", payload.practiceType);
    if (payload.documentType) {
      formData.append("documentType", payload.documentType);
    }
    if (payload.serviceNeeded) {
      formData.append("serviceNeeded", payload.serviceNeeded);
    }
    if (payload.caseType) {
      formData.append("caseType", payload.caseType);
    }
    if (payload.sourcelangauge) {
      formData.append("sourcelangauge", payload.sourcelangauge);
    }
    if (payload.targetlangauge) {
      formData.append("targetlangauge", payload.targetlangauge);
    }
    if (payload.areaOfExpert) {
      formData.append("areaOfExpert", payload.areaOfExpert);
    }

    if (payload.attachments && payload.attachments.length > 0) {
      payload.attachments.forEach((file) => {
        formData.append("attachments", file); // keep the key name consistent
      });
    }

    const response = await api.post("/api/cases", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  static async getCases(filter?: CaseFilter): Promise<Case[]> {
    const response = await api.get("/api/cases", {
      params: filter,
    });
    return response.data.data;
  }

  static async getCase(id: string): Promise<Case> {
    const response = await api.get(`/api/cases/${id}`);
    return response.data.data;
  }

  static async deleteCase(id: string): Promise<void> {
    const response = await api.patch(`/api/cases/${id}/cancel`);
    return response.data;
  }

  static async getCasesCount(): Promise<CasesCount> {
    const response = await api.get("/api/cases/stats");
    return response.data.data;
  }
  static async getSimilarCases(id: string): Promise<Case[]> {
    const response = await api.get(`/api/cases/${id}/similar`);
    return response.data.data;
  }
  static async addToFavorites(caseId: string): Promise<void> {
    const response = await api.post(`/api/favorites-cases/${caseId}`);
    return response.data;
  }

  static async getBestMatches(params?: { limit?: number; page?: number }): Promise<Case[]> {
    const response = await api.get("/api/cases/actions/best-matches", { params });
    return response.data.data;
  }

  static async getFavouriteCases(params?: { limit?: number; page?: number }): Promise<Case[]> {
    const response = await api.get("/api/favorites-cases", { params });
    return response.data.data;
  }
}
