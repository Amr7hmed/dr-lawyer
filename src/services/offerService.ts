/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/offerService.ts
import api from "@/lib/axios";
import type { AxiosRequestConfig } from "axios";

export type CreateOfferPayload = {
  caseId: string;
  description: string;
  duration: string;
  price: string;
  attachments?: File[];
  signature?: string;
};

export class OfferService {
  static async createOffer(
    { caseId, description, duration, price, attachments, signature }: CreateOfferPayload,
    config?: AxiosRequestConfig
  ): Promise<any> {
    const formData = new FormData();
    formData.append("caseId", caseId);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("price", price);
    if (attachments && attachments.length > 0) {
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });
    }
    if (signature) {
      formData.append("signature", signature);
    }

    const response = await api.post("/api/offers", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    });
    return response.data;
  }
}
