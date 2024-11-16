import React, { useState } from 'react';
import IncomeForm from '../components/IncomeForm';
import { Income } from '../types';

const IncomePage: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);

  const handleAddIncome = (newIncome: Income) => {
    setIncomes(prev => [...prev, { ...newIncome, id: Date.now() }]);
  };

  const calculateTotalIncome = () => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Income Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Income</h2>
          <IncomeForm onSubmit={handleAddIncome} />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Income Summary</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-green-600 mb-4">
              Total Income: ${calculateTotalIncome().toFixed(2)}
            </div>
            
            <div className="space-y-4">
              {incomes.map(income => (
                <div 
                  key={income.id} 
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-800">{income.source}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(income.date).toLocaleDateString()}
                        {income.isRecurring && ` • ${income.frequency} payment`}
                      </p>
                    </div>
                    <div className="text-lg font-semibold text-green-600">
                      ${income.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomePage;
