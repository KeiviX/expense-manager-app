import React from 'react';
import { Expense } from '../types';

interface StatisticsProps {
  expenses: Expense[];
}

const Statistics: React.FC<StatisticsProps> = ({ expenses }) => {
  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
        <p className="text-4xl font-bold text-indigo-600">
          ${totalExpenses.toFixed(2)}
        </p>
        <p className="text-gray-500">Total Expenses</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">By Category</h2>
        <div className="space-y-4">
          {Object.entries(expensesByCategory).map(([category, amount]) => (
            <div key={category} className="flex justify-between items-center">
              <span className="text-gray-700 capitalize">{category}</span>
              <span className="text-indigo-600 font-medium">
                ${amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
