import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar, { NavbarProps } from './components/Navbar';
import ExpenseForm from './components/ExpenseForm';
import Statistics from './pages/Statistics';
import Income from './pages/Income';
import Login from './pages/Login';
import Register from './pages/Register';
import { Expense } from './types';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, { ...expense, id: Date.now() }]);
  };

  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  };

  const navbarProps: NavbarProps = {
    isAuthenticated,
    setIsAuthenticated
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar {...navbarProps} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                      Expense Tracker
                    </h1>
                    <ExpenseForm onSubmit={handleAddExpense} />
                    {/* We'll add ExpenseList component here later */}
                  </div>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/statistics"
              element={
                <PrivateRoute>
                  <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                      Statistics
                    </h1>
                    <Statistics expenses={expenses} />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/income"
              element={
                <PrivateRoute>
                  <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                      Income
                    </h1>
                    <Income />
                  </div>
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
