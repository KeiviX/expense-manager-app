import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';

const Dashboard: React.FC = () => {
  const { expenses, incomes, isLoading, error } = useData();

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const balance = totalIncome - totalExpenses;

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
          Financial Overview
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-gray-800 rounded-lg p-6 shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-lg font-semibold text-emerald-400 mb-2">
              Total Income
            </h2>
            <p className="text-2xl font-bold text-white">
              ${totalIncome.toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg p-6 shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-lg font-semibold text-red-400 mb-2">
              Total Expenses
            </h2>
            <p className="text-2xl font-bold text-white">
              ${totalExpenses.toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg p-6 shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-lg font-semibold text-blue-400 mb-2">
              Current Balance
            </h2>
            <p className="text-2xl font-bold text-white">
              ${balance.toFixed(2)}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Expenses
            </h2>
            <div className="space-y-4">
              {expenses.slice(0, 5).map((expense) => (
                <div
                  key={expense.id}
                  className="flex justify-between items-center border-b border-gray-700 pb-2"
                >
                  <div>
                    <p className="text-white">{expense.description || expense.category}</p>
                    <p className="text-sm text-gray-400">{expense.date}</p>
                  </div>
                  <p className="text-red-400">${expense.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Income
            </h2>
            <div className="space-y-4">
              {incomes.slice(0, 5).map((income) => (
                <div
                  key={income.id}
                  className="flex justify-between items-center border-b border-gray-700 pb-2"
                >
                  <div>
                    <p className="text-white">{income.description || income.source}</p>
                    <p className="text-sm text-gray-400">{income.date}</p>
                  </div>
                  <p className="text-emerald-400">${income.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
