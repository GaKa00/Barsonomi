import type {
  DashboardSummary,
  UpdateDashboardSettingsRequest,
} from "./api-types";
import { apiClient } from "./http-client";

const dashboardUrl = "/api/Dashboard";

export const dashboardApi = {
  get: async (): Promise<DashboardSummary> => {
    const response = await apiClient.get<DashboardSummary>(dashboardUrl);
    return response.data;
  },

  update: async (
    payload: UpdateDashboardSettingsRequest,
  ): Promise<DashboardSummary> => {
    const response = await apiClient.put<DashboardSummary>(
      dashboardUrl,
      payload,
    );
    return response.data;
  },
};
