import type { CreateExpenseRequest, Expense } from "./api-types";
import { apiClient } from "./http-client";

const expensesUrl = "/api/Expense";

export const expensesApi = {
  list: async (): Promise<Expense[]> => {
    const response = await apiClient.get<Expense[]>(expensesUrl);
    return response.data;
  },

  create: async (payload: CreateExpenseRequest): Promise<Expense> => {
    const response = await apiClient.post<Expense>(expensesUrl, payload);
    return response.data;
  },

  update: async (payload: Expense): Promise<Expense> => {
    const response = await apiClient.put<Expense>(expensesUrl, payload);
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(expensesUrl, { params: { id } });
  },
};
