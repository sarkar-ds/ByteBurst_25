import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, GraduationCap, Building, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    rollNo: '',
    college: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState([]);
  const { login, signup } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setError('');
      setErrors([]);
      setFormData({
        email: '',
        password: '',
        name: '',
        rollNo: '',
        college: ''
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setErrors([]);

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        success = await signup({
          email: formData.email,
          name: formData.name,
          rollNo: formData.rollNo,
          college: formData.college,
          password: formData.password
        });
      }

      if (success) {
        onClose();
        setFormData({
          email: '',
          password: '',
          name: '',
          rollNo: '',
          college: ''
        });
      }
    } catch (error) {
      // Handle new error format with multiple errors
      if (error.errors && Array.isArray(error.errors)) {
        setErrors(error.errors);
        setError(error.message || 'Please fix the following errors:');
      } else {
        setError(error.message || 'An error occurred');
        setErrors([]);
      }
    }

    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setErrors([]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-sm w-full">
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              {isLogin ? 'Login' : 'Student Sign Up'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {(error || errors.length > 0) && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              {error && (
                <div className="flex items-start space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-300 font-medium">{error}</p>
                </div>
              )}
              {errors.length > 0 && (
                <ul className="space-y-1">
                  {errors.map((err, index) => (
                    <li key={index} className="text-xs text-red-300 flex items-start space-x-2">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>{err}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Roll Number
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="rollNo"
                    required
                    value={formData.rollNo}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
                    placeholder="Enter your roll number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  College
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="college"
                    required
                    value={formData.college}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
                    placeholder="Enter your college name"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-9 pr-3 py-2 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-9 pr-3 py-2 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-blue-500/25 text-sm"
          >
            {isLoading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Login"
              }
            </button>
          </div>

          {isLogin && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <p className="text-xs text-blue-300 mb-1">Demo Credentials:</p>
              <p className="text-xs text-gray-400">
                Student: any email + any password<br />
                Admin: admin@gmail.com + admin123456
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 