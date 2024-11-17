import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-900">
            <Navbar />
            <div className="pt-16">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/statistics"
                  element={
                    <ProtectedRoute>
                      <Statistics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/income"
                  element={
                    <ProtectedRoute>
                      <Income />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/expenses"
                  element={
                    <ProtectedRoute>
                      <Expenses />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
