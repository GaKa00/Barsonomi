import { authApi } from "./auth";
import { beerTargetsApi } from "./beer-targets";
import { categoriesApi } from "./categories";
import { dashboardApi } from "./dashboard";
import { expensesApi } from "./expenses";

export { apiClient } from "./http-client";

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
