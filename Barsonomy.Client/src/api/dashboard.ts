import type { DashboardSummary } from "./api-types";
import { apiClient } from "./http-client";

const dashboardUrl = "/api/Dashboard";

export const dashboardApi = {
  get: async (): Promise<DashboardSummary> => {
    const response = await apiClient.get<DashboardSummary>(dashboardUrl);
    return response.data;
  },
};
