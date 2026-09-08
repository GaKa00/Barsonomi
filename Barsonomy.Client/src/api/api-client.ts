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
  auth: {
    register: (...args: Parameters<typeof authApi.register>) =>
      authApi.register(...args),
    login: (...args: Parameters<typeof authApi.login>) =>
      authApi.login(...args),
    refresh: (...args: Parameters<typeof authApi.refresh>) =>
      authApi.refresh(...args),
  },
  beergoals: {
    list: (...args: Parameters<typeof beerTargetsApi.list>) =>
      beerTargetsApi.list(...args),
    get: (...args: Parameters<typeof beerTargetsApi.get>) =>
      beerTargetsApi.get(...args),
    create: (...args: Parameters<typeof beerTargetsApi.create>) =>
      beerTargetsApi.create(...args),
    update: (...args: Parameters<typeof beerTargetsApi.update>) =>
      beerTargetsApi.update(...args),
    remove: (...args: Parameters<typeof beerTargetsApi.remove>) =>
      beerTargetsApi.remove(...args),
  },
  categories: {
    list: (...args: Parameters<typeof categoriesApi.list>) =>
      categoriesApi.list(...args),
  },
  dashboard: {
    get: (...args: Parameters<typeof dashboardApi.get>) =>
      dashboardApi.get(...args),
  },
  expenses: {
    list: (...args: Parameters<typeof expensesApi.list>) =>
      expensesApi.list(...args),
    create: (...args: Parameters<typeof expensesApi.create>) =>
      expensesApi.create(...args),
    update: (...args: Parameters<typeof expensesApi.update>) =>
      expensesApi.update(...args),
    remove: (...args: Parameters<typeof expensesApi.remove>) =>
      expensesApi.remove(...args),
  },
};
