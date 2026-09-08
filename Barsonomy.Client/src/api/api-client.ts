import axios from "axios";
import { authApi } from "./auth";
import { beerTargetsApi } from "./beer-targets";
import { categoriesApi } from "./categories";
import { dashboardApi } from "./dashboard";
import { expensesApi } from "./expenses";

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

export const api = {
  auth: authApi,
  beergoals: beerTargetsApi,
  categories: categoriesApi,
  dashboard: dashboardApi,
  expenses: {
    list: expensesApi.list,
    create: expensesApi.create,
    update: expensesApi.update,
    remove: expensesApi.remove,
  },
};
