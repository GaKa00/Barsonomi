export type CreateBeerRequest = {
  title: string;
  targetAmountSek: number;
  targetDate: string;
};

export type BeerGoal = {
  id: number;
  title: string;
  targetAmountSek: number;
  currentSavedSek: number;
  targetDate: string;
};

export type Category = {
  id: number;
  name: string;
  icon: string;
  expenseCount: number;
  totalSum: number;
};

export type DashboardSummary = {
  monthlyIncomeSek: number;
  beerPriceSek: number;
  totalFixedCostsSek: number;
  totalSubscriptionsSek: number;
  totalExpensesSek: number;
  remainingIncomeSek: number;
};

export type UpdateDashboardSettingsRequest = {
  monthlyIncomeSek: number;
  beerPriceSek: number;
};

export type CreateExpenseRequest = {
  name: string;
  amount: number;
  date: string;
  isMonthly: boolean;
  isFixed: boolean;
  categoryId: number;
};

export type Expense = CreateExpenseRequest & {
  id: number;
  categoryName: string;
};

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
