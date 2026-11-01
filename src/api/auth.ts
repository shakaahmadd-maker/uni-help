import { apiRequest, setAuthToken, getAuthToken } from "./client";

export interface UserProfile {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: UserProfile;
}

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await apiRequest<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setAuthToken(res.token);
    return res;
  },

  async logout(): Promise<void> {
    try {
      if (getAuthToken()) {
        await apiRequest("/api/auth/logout", { method: "POST" });
      }
    } catch (e) {
      // Ignore logout network errors
    } finally {
      setAuthToken(null);
    }
  },

  async getCurrentUser(): Promise<UserProfile> {
    const res = await apiRequest<{ user: UserProfile }>("/api/auth/me");
    return res.user;
  },

  async getAdminCredentials(): Promise<any[]> {
    return apiRequest<any[]>("/api/admin/credentials");
  },

  async createAdminCredential(data: { email: string; password: string; name?: string; role?: string }): Promise<any> {
    return apiRequest<any>("/api/admin/credentials", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateAdminCredential(id: string, data: { password?: string; role?: string; name?: string; isActive?: boolean }): Promise<any> {
    return apiRequest<any>(`/api/admin/credentials/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async deleteAdminCredential(id: string): Promise<void> {
    return apiRequest<void>(`/api/admin/credentials/${id}`, {
      method: "DELETE",
    });
  },
};
