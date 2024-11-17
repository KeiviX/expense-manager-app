// Authentication Types
interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

interface RegisterProps {
  setIsAuthenticated: (value: boolean) => void;
}

// API Response Types
interface AuthResponse {
  access_token: string;
  token_type: string;
}

// User Types
interface User {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
}

// Data Types
interface Expense {
  id: number;
  amount: number;
  category: string;
  description?: string;
  notes?: string;
  date: string;
  user_id?: number;
}

interface Income {
  id: number;
  amount: number;
  source: string;
  description?: string;
  notes?: string;
  date: string;
  user_id?: number;
}

// Component Props Types
interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id' | 'user_id'>) => void;
  initialValues?: Partial<Expense>;
  onExpenseAdded?: () => void;
}

interface ExpenseListProps {
  expenses: Expense[];
  onDelete?: (id: number) => void;
  onEdit?: (expense: Expense) => void;
}

interface StatisticsProps {
  expenses: Expense[];
  incomes: Income[];
}

interface DashboardProps {
  expenses: Expense[];
  incomes: Income[];
}

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

// API Error Types
interface ApiError {
  detail: string;
}

// Form Types
type ExpenseFormData = Omit<Expense, 'id' | 'user_id'>;
type IncomeFormData = Omit<Income, 'id' | 'user_id'>;

// Export all types
export type {
  LoginProps,
  RegisterProps,
  Expense,
  Income,
  ExpenseFormProps,
  ExpenseListProps,
  StatisticsProps,
  DashboardProps,
  NavbarProps,
  AuthResponse,
  ApiError,
  ExpenseFormData,
  IncomeFormData,
  User,
};
