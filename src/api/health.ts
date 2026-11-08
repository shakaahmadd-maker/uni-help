import { apiRequest } from "./client";

export interface HealthResponse {
  status: string;
  service?: string;
  version?: string;
  timestamp?: string;
}

export const healthApi = {
  /**
   * Checks backend availability.
   * A response with status === "ok" indicates the backend service is healthy.
   * Does not require uptime or container age fields.
   */
  async check(): Promise<HealthResponse> {
    return apiRequest<HealthResponse>("/api/health");
  },

  async isAvailable(): Promise<boolean> {
    try {
      const res = await this.check();
      return res?.status === "ok";
    } catch {
      return false;
    }
  },
};
