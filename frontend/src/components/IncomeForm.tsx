import React, { useState } from 'react';

export interface Income {
  id?: number;
  amount: number;
  source: string;
  date: string;
  isRecurring: boolean;
  frequency?: 'monthly' | 'weekly' | 'yearly';
}

interface IncomeFormProps {
  onSubmit: (income: Income) => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ onSubmit }) => {
  const [income, setIncome] = useState<Income>({
    amount: 0,
    source: '',
    date: new Date().toISOString().split('T')[0],
    isRecurring: false,
    frequency: 'monthly'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(income);
    setIncome({
      amount: 0,
      source: '',
      date: new Date().toISOString().split('T')[0],
      isRecurring: false,
      frequency: 'monthly'
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setIncome(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              name === 'amount' ? parseFloat(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={income.amount}
          onChange={handleChange}
          required
          step="0.01"
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="source" className="block text-sm font-medium text-gray-700">
          Source
        </label>
        <input
          type="text"
          id="source"
          name="source"
          value={income.source}
          onChange={handleChange}
          required
          placeholder="e.g., Salary, Freelance, Investments"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={income.date}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isRecurring"
          name="isRecurring"
          checked={income.isRecurring}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="isRecurring" className="ml-2 block text-sm text-gray-700">
          Recurring Income
        </label>
      </div>

      {income.isRecurring && (
        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
            Frequency
          </label>
          <select
            id="frequency"
            name="frequency"
            value={income.frequency}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Add Income
      </button>
    </form>
  );
};

export default IncomeForm;
