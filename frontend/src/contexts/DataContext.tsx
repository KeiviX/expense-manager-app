import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { api } from '../api/client';
import { Expense, Income } from '../types';
import { useAuth } from './AuthContext';

interface DataContextType {
  expenses: Expense[];
  incomes: Income[];
  isLoading: boolean;
  error: Error | null;
  addExpense: (expense: Omit<Expense, 'id' | 'user_id'>) => Promise<void>;
  updateExpense: (id: number, expense: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: number) => Promise<void>;
  addIncome: (income: Omit<Income, 'id' | 'user_id'>) => Promise<void>;
  updateIncome: (id: number, income: Partial<Income>) => Promise<void>;
  deleteIncome: (id: number) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshData = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);
    try {
      const [expensesData, incomesData] = await Promise.all([
        api.get<Expense[]>('/expenses'),
        api.get<Income[]>('/income'),
      ]);
      setExpenses(expensesData);
      setIncomes(incomesData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const addExpense = useCallback(async (expense: Omit<Expense, 'id' | 'user_id'>) => {
    try {
      const newExpense = await api.post<Expense>('/expenses', expense);
      setExpenses(prev => [...prev, newExpense]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add expense'));
      throw err;
    }
  }, []);

  const updateExpense = useCallback(async (id: number, expense: Partial<Expense>) => {
    try {
      const updatedExpense = await api.put<Expense>(`/expenses/${id}`, expense);
      setExpenses(prev => prev.map(exp => exp.id === id ? updatedExpense : exp));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update expense'));
      throw err;
    }
  }, []);

  const deleteExpense = useCallback(async (id: number) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(prev => prev.filter(exp => exp.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete expense'));
      throw err;
    }
  }, []);

  const addIncome = useCallback(async (income: Omit<Income, 'id' | 'user_id'>) => {
    try {
      const newIncome = await api.post<Income>('/income', income);
      setIncomes(prev => [...prev, newIncome]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add income'));
      throw err;
    }
  }, []);

  const updateIncome = useCallback(async (id: number, income: Partial<Income>) => {
    try {
      const updatedIncome = await api.put<Income>(`/income/${id}`, income);
      setIncomes(prev => prev.map(inc => inc.id === id ? updatedIncome : inc));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update income'));
      throw err;
    }
  }, []);

  const deleteIncome = useCallback(async (id: number) => {
    try {
      await api.delete(`/income/${id}`);
      setIncomes(prev => prev.filter(inc => inc.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete income'));
      throw err;
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        expenses,
        incomes,
        isLoading,
        error,
        addExpense,
        updateExpense,
        deleteExpense,
        addIncome,
        updateIncome,
        deleteIncome,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
