import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type {
  BeerGoal,
  Category,
  CreateBeerRequest,
  CreateExpenseRequest,
  DashboardSummary,
  Expense,
} from "./api-types";

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
    list: () =>
      request<BeerGoal[]>({ method: "GET", url: apiRoutes.beergoals }),
    get: (id: number) =>
      request<BeerGoal>({ method: "GET", url: `${apiRoutes.beergoals}/${id}` }),
    create: (payload: CreateBeerRequest) =>
      request<BeerGoal>({
        method: "POST",
        url: apiRoutes.beergoals,
        data: payload,
      }),
    update: (id: number, payload: BeerGoal) =>
      request<BeerGoal>({
        method: "PUT",
        url: `${apiRoutes.beergoals}/${id}`,
        data: payload,
      }),
    remove: (id: number) =>
      request<void>({ method: "DELETE", url: `${apiRoutes.beergoals}/${id}` }),
  },
  categories: {
    list: () =>
      request<Category[]>({ method: "GET", url: apiRoutes.categories }),
  },
  dashboard: {
    get: () =>
      request<DashboardSummary>({ method: "GET", url: apiRoutes.dashboard }),
  },
  expenses: {
    list: () => request<Expense[]>({ method: "GET", url: apiRoutes.expenses }),
    create: (payload: CreateExpenseRequest) =>
      request<Expense>({
        method: "POST",
        url: apiRoutes.expenses,
        data: payload,
      }),
    update: (payload: Expense) =>
      request<Expense>({
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
