/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "@/lib/axios";

export class StreamService {
  static async getStreamToken(): Promise<{ token: string }> {
    const response = await api.post("/stream/token");
    return response.data;
  }
  
  static async getChannels(): Promise<any[]> {
    const response = await api.get("/stream/channels");
    return response.data;
  }
  
  static async sendMessage(channelId: string, message: string): Promise<any> {
    const response = await api.post(`/stream/channel/${channelId}/message`, {
      message,
    });
    return response.data;
  }
  
}
