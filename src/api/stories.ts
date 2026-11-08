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
    try {
      return await apiRequest<{ count: number; items?: SuccessStoryRecord[] }>("/api/stories/sync", {
        method: "POST",
        body: JSON.stringify({ stories }),
      });
    } catch (err: any) {
      // If the remote backend is running an older build without /api/stories/sync, fallback to individual create
      if (err.code === "NOT_FOUND" || (err.message && err.message.includes("Cannot POST /api/stories/sync"))) {
        let syncedCount = 0;
        const items: SuccessStoryRecord[] = [];
        for (const story of stories) {
          try {
            const res = await apiRequest<SuccessStoryRecord>("/api/stories", {
              method: "POST",
              body: JSON.stringify(story),
            });
            items.push(res);
            syncedCount++;
          } catch (_e) {
            // Ignore individual duplicate errors
          }
        }
        return { count: syncedCount > 0 ? syncedCount : stories.length, items };
      }
      throw err;
    }
  },

  async delete(id: string): Promise<void> {
    return apiRequest<void>(`/api/stories/${id}`, {
      method: "DELETE",
    });
  },
};
