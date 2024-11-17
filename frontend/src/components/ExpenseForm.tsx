import React, { useState } from 'react';
import { Expense, ExpenseFormProps } from '../types/index';

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, onExpenseAdded }) => {
  const [expense, setExpense] = useState<Omit<Expense, 'id' | 'user_id'>>({
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    category: 'other'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(expense);
    onExpenseAdded?.();
    setExpense({
      description: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      category: 'other'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExpense(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-750 transition-colors duration-300">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-200">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={expense.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
          placeholder="Enter expense description"
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-200">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
          placeholder="Enter amount"
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-200">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-200">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={expense.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
        >
          <option value="food">Food</option>
          <option value="transportation">Transportation</option>
          <option value="utilities">Utilities</option>
          <option value="entertainment">Entertainment</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
