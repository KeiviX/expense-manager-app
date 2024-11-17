import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';

const Income: React.FC = () => {
  const { incomes, addIncome, isLoading, error } = useData();
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !source || !date) return;

    try {
      await addIncome({
        amount: parseFloat(amount),
        source,
        date,
        description: description || undefined,
      });
      // Reset form
      setAmount('');
      setSource('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
    } catch (err) {
      console.error('Failed to add income:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500">{error.message}</div>
      </div>
    );
  }

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {/* Add Income Form */}
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-white">Add New Income</h3>
              <p className="mt-1 text-sm text-gray-400">
                Record your income transactions here.
              </p>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-gray-800 space-y-6 sm:p-6">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
                      Amount
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="source" className="block text-sm font-medium text-gray-300">
                      Source
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="source"
                        id="source"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                      Description
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                      Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-700 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Income
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Income List */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium leading-6 text-white">Income History</h3>
            <div className="text-lg font-medium text-green-500">
              Total: ${totalIncome.toFixed(2)}
            </div>
          </div>
          <div className="space-y-4">
            {incomes.map((income, index) => (
              <div
                key={index}
                className="bg-gray-800 shadow overflow-hidden sm:rounded-lg"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-white truncate">
                        {income.source}
                      </div>
                      {income.description && (
                        <div className="text-sm text-gray-400 mt-1">
                          {income.description}
                        </div>
                      )}
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        ${income.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="flex items-center text-sm text-gray-400">
                      {new Date(income.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
