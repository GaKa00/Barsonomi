import type { AuthResponse, LoginRequest, RegisterRequest } from "./api-types";
import { apiClient } from "./http-client";

const authUrl = "/api/auth";
const accessTokenKey = "barsonomy.accessToken";

export const authApi = {
  register: async (payload: RegisterRequest): Promise<void> => {
    await apiClient.post(`${authUrl}/register`, payload);
  },

  login: async (payload: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      `${authUrl}/login`,
      payload,
    );

    if (typeof window !== "undefined") {
      window.localStorage.setItem(accessTokenKey, response.data.accessToken);
    }

    return response.data;
  },

  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(`${authUrl}/refresh`, {
      refreshToken,
    });
    return response.data;
  },
};
