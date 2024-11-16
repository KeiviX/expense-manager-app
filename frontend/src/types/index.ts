export interface Expense {
  id?: number;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface Income {
  id?: number;
  amount: number;
  source: string;
  date: string;
  isRecurring: boolean;
  frequency?: 'monthly' | 'weekly' | 'yearly';
}

export interface ExpenseFormProps {
  onSubmit: (expense: Expense) => void;
}

export interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

export interface IncomeFormProps {
  onSubmit: (income: Income) => void;
}

export interface StatisticsProps {
  expenses: Expense[];
  incomes: Income[];
}
