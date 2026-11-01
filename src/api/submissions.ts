import { apiRequest } from "./client";

export interface SubmissionPayload {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  service?: string;
  message?: string;
  status?: "NEW" | "CONTACTED" | "RESOLVED" | "DELETED";
}

export interface SubmissionRecord extends SubmissionPayload {
  id: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionQueryFilters {
  status?: string;
  city?: string;
  service?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface SubmissionsResponse {
  items: SubmissionRecord[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const submissionsApi = {
  async create(data: SubmissionPayload): Promise<SubmissionRecord> {
    return apiRequest<SubmissionRecord>("/api/submissions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getAll(filters: SubmissionQueryFilters = {}): Promise<SubmissionsResponse> {
    const params = new URLSearchParams();
    if (filters.status) params.set("status", filters.status);
    if (filters.city) params.set("city", filters.city);
    if (filters.service) params.set("service", filters.service);
    if (filters.search) params.set("search", filters.search);
    if (filters.page) params.set("page", String(filters.page));
    if (filters.limit) params.set("limit", String(filters.limit));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiRequest<SubmissionsResponse>(`/api/submissions${qs}`);
  },

  async update(id: string, data: Partial<SubmissionRecord>): Promise<SubmissionRecord> {
    return apiRequest<SubmissionRecord>(`/api/submissions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async delete(id: string): Promise<void> {
    return apiRequest<void>(`/api/submissions/${id}`, {
      method: "DELETE",
    });
  },
};
