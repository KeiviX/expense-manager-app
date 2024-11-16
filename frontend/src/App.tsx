import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ExpenseForm from './components/ExpenseForm';
import Statistics from './pages/Statistics';
import Income from './pages/Income';
import { Expense } from './types';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, { ...expense, id: Date.now() }]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="max-w-2xl mx-auto">
                  <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Expense Tracker
                  </h1>
                  <ExpenseForm onSubmit={handleAddExpense} />
                  {/* We'll add ExpenseList component here later */}
                </div>
              }
            />
            <Route
              path="/statistics"
              element={
                <div className="max-w-2xl mx-auto">
                  <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Statistics
                  </h1>
                  <Statistics expenses={expenses} />
                </div>
              }
            />
            <Route
              path="/income"
              element={
                <div className="max-w-2xl mx-auto">
                  <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Income
                  </h1>
                  <Income />
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
