import type { Category } from "./api-types";
import { apiClient } from "./api-client";

const categoriesUrl = "/api/Category";

export const categoriesApi = {
  list: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>(categoriesUrl);
    return response.data;
  },
};
