import React, { useState, useEffect } from 'react';
import { User, Camera, Edit, Save, X, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function StudentProfile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    rollNo: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      // Load user data into form
      setFormData({
        name: user.name || '',
        email: user.email || '',
        college: user.college || '',
        rollNo: user.rollNo || '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    if (error) {
      setError('');
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = [];

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.push('Please enter a valid email address');
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.push('Name is required');
    } else if (formData.name.trim().length < 2) {
      newErrors.push('Name must be at least 2 characters long');
    }

    // College validation
    if (!formData.college.trim()) {
      newErrors.push('College name is required');
    } else if (formData.college.trim().length < 3) {
      newErrors.push('College name must be at least 3 characters long');
    }

    // Roll number validation
    if (!formData.rollNo.trim()) {
      newErrors.push('Roll number is required');
    } else if (formData.rollNo.trim().length < 3) {
      newErrors.push('Roll number must be at least 3 characters long');
    }

    // Password validation (only if changing password)
    if (formData.newPassword || formData.oldPassword || formData.confirmPassword) {
      if (!formData.oldPassword) {
        newErrors.push('Current password is required');
      }
      if (!formData.newPassword) {
        newErrors.push('New password is required');
      } else if (formData.newPassword.length < 6) {
        newErrors.push('New password must be at least 6 characters long');
      }
      if (!formData.confirmPassword) {
        newErrors.push('Please confirm your new password');
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.push('New passwords do not match');
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');
    setErrors([]);
    setSuccessMessage('');

    try {
      const updateData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        college: formData.college.trim(),
        rollNo: formData.rollNo.trim()
      };

      // Add password change if provided
      if (formData.oldPassword && formData.newPassword) {
        updateData.oldPassword = formData.oldPassword;
        updateData.newPassword = formData.newPassword;
      }

      const result = await updateUser(updateData);

      if (result.success) {
        setSuccessMessage('Profile updated successfully!');
        setIsEditing(false);
        
        // Reset password fields
        setFormData(prev => ({
          ...prev,
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }
    } catch (error) {
      // Handle new error format
      if (error.errors && Array.isArray(error.errors)) {
        setErrors(error.errors);
        setError(error.message || 'Update failed');
      } else {
        setError(error.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setErrors([]);
    setSuccessMessage('');
    
    // Reset form to original user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        college: user.college || '',
        rollNo: user.rollNo || '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  // Redirect if no user
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 pb-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please log in to view your profile</h2>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {user.role === 'admin' ? 'Admin Profile' : 'Student Profile'}
                  </h1>
                  <p className="text-blue-100">Manage your account information</p>
                </div>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 space-y-8">
            {/* Error/Success Messages */}
            {(error || errors.length > 0 || successMessage) && (
              <div className={`rounded-lg p-4 ${
                successMessage 
                  ? 'bg-green-500/10 border border-green-500/20' 
                  : 'bg-red-500/10 border border-red-500/20'
              }`}>
                {successMessage && (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    <p className="text-sm text-green-300">{successMessage}</p>
                  </div>
                )}
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

            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700 border-4 border-blue-500">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer transition-all duration-200 shadow-lg">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              {isEditing && (
                <p className="text-sm text-gray-400 text-center">
                  Click the camera icon to upload a new profile picture
                </p>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                    isEditing
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      : 'bg-gray-700/50 border-gray-600 text-gray-300 cursor-not-allowed'
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                    isEditing
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      : 'bg-gray-700/50 border-gray-600 text-gray-300 cursor-not-allowed'
                  }`}
                />
              </div>

              {/* College */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  College
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                    isEditing
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      : 'bg-gray-700/50 border-gray-600 text-gray-300 cursor-not-allowed'
                  }`}
                />
              </div>

              {/* Roll Number */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                    isEditing
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      : 'bg-gray-700/50 border-gray-600 text-gray-300 cursor-not-allowed'
                  }`}
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={user.role === 'admin' ? 'Administrator' : 'Student'}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border bg-gray-700/50 border-gray-600 text-gray-300 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password Change Section */}
            {isEditing && (
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Change Password
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showOldPassword ? 'text' : 'password'}
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pr-10 rounded-lg border transition-all duration-200 bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pr-10 rounded-lg border transition-all duration-200 bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pr-10 rounded-lg border transition-all duration-200 bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-blue-500/25"
                >
                  <Save className="w-4 h-4" />
                  <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 