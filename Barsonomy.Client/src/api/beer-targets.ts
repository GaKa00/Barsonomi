import type { BeerGoal, CreateBeerRequest } from "./api-types";
import { apiClient } from "./api-client";

const beerTargetsUrl = "/api/Beer";

export const beerTargetsApi = {
  list: async (): Promise<BeerGoal[]> => {
    const response = await apiClient.get<BeerGoal[]>(beerTargetsUrl);
    return response.data;
  },

  get: async (id: number): Promise<BeerGoal> => {
    const response = await apiClient.get<BeerGoal>(`${beerTargetsUrl}/${id}`);
    return response.data;
  },

  create: async (payload: CreateBeerRequest): Promise<BeerGoal> => {
    const response = await apiClient.post<BeerGoal>(beerTargetsUrl, payload);
    return response.data;
  },

  update: async (id: number, payload: BeerGoal): Promise<BeerGoal> => {
    const response = await apiClient.put<BeerGoal>(
      `${beerTargetsUrl}/${id}`,
      payload,
    );
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(`${beerTargetsUrl}/${id}`);
  },
};
