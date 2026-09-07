import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export const apiRoutes = {
  auth: {
    register: "/api/auth/register",
    login: "/api/auth/login",
    refresh: "/api/auth/refresh",
  },
  beergoals: "/api/Beer",
  categories: "/api/Category",
  dashboard: "/api/Dashboard",
  expenses: "/api/Expense",
} as const;

const accessTokenKey = "barsonomy.accessToken";

export type LoginRequest = {
  email: string;
  password: string;
  twoFactorCode?: string;
  twoFactorRecoveryCode?: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

export const apiClient = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const accessToken = window.localStorage.getItem(accessTokenKey);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.localStorage.removeItem(accessTokenKey);
    }

    return Promise.reject(error);
  },
);

async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.request<T>(config);
  return response.data;
}

export const api = {
  auth: {
    register: (payload: RegisterRequest) =>
      request<void>({
        method: "POST",
        url: apiRoutes.auth.register,
        data: payload,
      }),
    login: async (payload: LoginRequest) => {
      const response = await request<AuthResponse>({
        method: "POST",
        url: apiRoutes.auth.login,
        data: payload,
      });

      if (typeof window !== "undefined") {
        window.localStorage.setItem(accessTokenKey, response.accessToken);
      }

      return response;
    },
    refresh: (refreshToken: string) =>
      request<AuthResponse>({
        method: "POST",
        url: apiRoutes.auth.refresh,
        data: { refreshToken },
      }),
  },
  beergoals: {
    list: () => request<unknown[]>({ method: "GET", url: apiRoutes.beergoals }),
    get: (id: number) =>
      request<unknown>({ method: "GET", url: `${apiRoutes.beergoals}/${id}` }),
    create: <TRequest, TResponse>(payload: TRequest) =>
      request<TResponse>({
        method: "POST",
        url: apiRoutes.beergoals,
        data: payload,
      }),
    update: <TRequest, TResponse>(id: number, payload: TRequest) =>
      request<TResponse>({
        method: "PUT",
        url: `${apiRoutes.beergoals}/${id}`,
        data: payload,
      }),
    remove: (id: number) =>
      request<void>({ method: "DELETE", url: `${apiRoutes.beergoals}/${id}` }),
  },
  categories: {
    list: () =>
      request<unknown[]>({ method: "GET", url: apiRoutes.categories }),
  },
  dashboard: {
    get: () => request<unknown>({ method: "GET", url: apiRoutes.dashboard }),
  },
  expenses: {
    list: () => request<unknown[]>({ method: "GET", url: apiRoutes.expenses }),
    create: <TRequest, TResponse>(payload: TRequest) =>
      request<TResponse>({
        method: "POST",
        url: apiRoutes.expenses,
        data: payload,
      }),
    update: <TRequest, TResponse>(payload: TRequest) =>
      request<TResponse>({
        method: "PUT",
        url: apiRoutes.expenses,
        data: payload,
      }),
    remove: (id: number) =>
      request<void>({
        method: "DELETE",
        url: apiRoutes.expenses,
        params: { id },
      }),
  },
};
