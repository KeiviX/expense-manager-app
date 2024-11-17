import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-gray-900"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Track Your Money
          <span className="block text-emerald-400">With Confidence</span>
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Your personal finance companion for smart expense tracking and budgeting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="px-8 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </div>
  );
};

export default Landing;
