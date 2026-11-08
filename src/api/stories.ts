import { apiRequest } from "./client";

export interface SuccessStoryRecord {
  id: string;
  legacyId?: string;
  name: string;
  maskedName?: string;
  city: string;
  stream: string;
  review: string;
  rating: number;
  clientPic?: string;
  visaStamp?: string;
  stampId?: string;
  visaGrantDate?: string;
  isPublished?: boolean;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const storiesApi = {
  async getAll(): Promise<SuccessStoryRecord[]> {
    return apiRequest<SuccessStoryRecord[]>("/api/stories");
  },

  async create(data: Partial<SuccessStoryRecord> & { name: string; city: string; stream: string; review: string; rating: number }): Promise<SuccessStoryRecord> {
    return apiRequest<SuccessStoryRecord>("/api/stories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: Partial<SuccessStoryRecord>): Promise<SuccessStoryRecord> {
    return apiRequest<SuccessStoryRecord>(`/api/stories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async sync(stories: Partial<SuccessStoryRecord>[]): Promise<{ count: number; items?: SuccessStoryRecord[] }> {
    return apiRequest<{ count: number; items?: SuccessStoryRecord[] }>("/api/stories/sync", {
      method: "POST",
      body: JSON.stringify({ stories }),
    });
  },

  async delete(id: string): Promise<void> {
    return apiRequest<void>(`/api/stories/${id}`, {
      method: "DELETE",
    });
  },
};
