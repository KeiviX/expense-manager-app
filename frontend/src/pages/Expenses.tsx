import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ExpenseForm from '../components/ExpenseForm';
import { Expense } from '../types/index';

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:8000/expenses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (newExpense: Omit<Expense, 'id'>) => {
    try {
      const response = await fetch('http://localhost:8000/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newExpense)
      });

      if (response.ok) {
        const data = await response.json();
        setExpenses([...expenses, data]);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setExpenses(expenses.filter(expense => expense.id !== id));
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-white mb-8"
          variants={itemVariants}
        >
          Manage Expenses
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">
                Add New Expense
              </h2>
              <ExpenseForm 
                onSubmit={handleAddExpense}
                onExpenseAdded={fetchExpenses}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">
                Recent Expenses
              </h2>
              {loading ? (
                <p className="text-gray-400">Loading expenses...</p>
              ) : (
                <div className="space-y-4">
                  {expenses.map((expense) => (
                    <motion.div
                      key={expense.id}
                      className="flex justify-between items-center p-4 bg-gray-700 rounded-lg"
                      variants={itemVariants}
                    >
                      <div>
                        <p className="text-white font-medium">
                          {expense.description}
                        </p>
                        <p className="text-sm text-gray-400">
                          {expense.category} - {expense.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-emerald-400 font-medium">
                          ${expense.amount.toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Expenses;
