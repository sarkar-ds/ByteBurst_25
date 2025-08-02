const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Name validation function
const isValidName = (name) => {
  return name && name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
};

// Roll number validation function
const isValidRollNo = (rollNo) => {
  return rollNo && rollNo.trim().length >= 3 && /^[a-zA-Z0-9]+$/.test(rollNo.trim());
};

// College validation function
const isValidCollege = (college) => {
  return college && college.trim().length >= 3;
};

// @route   POST /api/auth/register
// @desc    Register a new student
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, rollNo, college } = req.body;

    // Initialize errors array
    const errors = [];

    // Validate name
    if (!name || !name.trim()) {
      errors.push('Name is required');
    } else if (!isValidName(name)) {
      errors.push('Name must be at least 2 characters long and contain only letters and spaces');
    }

    // Validate email
    if (!email || !email.trim()) {
      errors.push('Email is required');
    } else if (!isValidEmail(email)) {
      errors.push('Please enter a valid email address (e.g., user@example.com)');
    }

    // Validate password
    if (!password) {
      errors.push('Password is required');
    } else if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    } else if (password.length > 50) {
      errors.push('Password must be less than 50 characters');
    }

    // Validate roll number
    if (!rollNo || !rollNo.trim()) {
      errors.push('Roll number is required');
    } else if (!isValidRollNo(rollNo)) {
      errors.push('Roll number must be at least 3 characters long and contain only letters and numbers');
    }

    // Validate college
    if (!college || !college.trim()) {
      errors.push('College name is required');
    } else if (!isValidCollege(college)) {
      errors.push('College name must be at least 3 characters long');
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Please fix the following errors:',
        errors: errors
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Registration failed',
        errors: ['An account with this email already exists']
      });
    }

    // Check if roll number already exists (for students)
    const existingRollNo = await User.findOne({ rollNo: rollNo.trim() });
    if (existingRollNo) {
      return res.status(400).json({ 
        message: 'Registration failed',
        errors: ['This roll number is already registered']
      });
    }

    // Create new student
    const user = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      rollNo: rollNo.trim(),
      college: college.trim(),
      role: 'student'
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Student registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rollNo: user.rollNo,
        college: user.college
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ 
        message: 'Registration failed',
        errors: [`${field} already exists`]
      });
    }
    
    res.status(500).json({ 
      message: 'Server error',
      errors: ['An unexpected error occurred. Please try again.']
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Initialize errors array
    const errors = [];

    // Validate email
    if (!email || !email.trim()) {
      errors.push('Email is required');
    } else if (!isValidEmail(email)) {
      errors.push('Please enter a valid email address');
    }

    // Validate password
    if (!password) {
      errors.push('Password is required');
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Please fix the following errors:',
        errors: errors
      });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({ 
        message: 'Login failed',
        errors: ['Invalid email or password']
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ 
        message: 'Login failed',
        errors: ['Invalid email or password']
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rollNo: user.rollNo,
        college: user.college
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error',
      errors: ['An unexpected error occurred. Please try again.']
    });
  }
});

// @route   PUT /api/auth/update-profile
// @desc    Update user profile
// @access  Private
router.put('/update-profile', auth, async (req, res) => {
  try {
    const { name, email, college, rollNo, oldPassword, newPassword } = req.body;
    const userId = req.user._id;

    // Initialize errors array
    const errors = [];

    // Validate name
    if (!name || !name.trim()) {
      errors.push('Name is required');
    } else if (!isValidName(name)) {
      errors.push('Name must be at least 2 characters long and contain only letters and spaces');
    }

    // Validate email
    if (!email || !email.trim()) {
      errors.push('Email is required');
    } else if (!isValidEmail(email)) {
      errors.push('Please enter a valid email address');
    }

    // Validate college (only for students)
    if (req.user.role === 'student') {
      if (!college || !college.trim()) {
        errors.push('College name is required');
      } else if (!isValidCollege(college)) {
        errors.push('College name must be at least 3 characters long');
      }
    }

    // Validate roll number (only for students)
    if (req.user.role === 'student') {
      if (!rollNo || !rollNo.trim()) {
        errors.push('Roll number is required');
      } else if (!isValidRollNo(rollNo)) {
        errors.push('Roll number must be at least 3 characters long and contain only letters and numbers');
      }
    }

    // Validate new password if provided
    if (newPassword) {
      if (!oldPassword) {
        errors.push('Current password is required to change password');
      } else if (newPassword.length < 6) {
        errors.push('New password must be at least 6 characters long');
      } else if (newPassword.length > 50) {
        errors.push('New password must be less than 50 characters');
      }
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Please fix the following errors:',
        errors: errors
      });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ 
      email: email.trim().toLowerCase(),
      _id: { $ne: userId }
    });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Update failed',
        errors: ['An account with this email already exists']
      });
    }

    // Check if roll number is already taken by another user (for students)
    if (req.user.role === 'student' && rollNo) {
      const existingRollNo = await User.findOne({ 
        rollNo: rollNo.trim(),
        _id: { $ne: userId }
      });
      if (existingRollNo) {
        return res.status(400).json({ 
          message: 'Update failed',
          errors: ['This roll number is already registered by another user']
        });
      }
    }

    // Get the user to update
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        message: 'Update failed',
        errors: ['User not found']
      });
    }

    // Verify old password if changing password
    if (oldPassword && newPassword) {
      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch) {
        return res.status(400).json({ 
          message: 'Update failed',
          errors: ['Current password is incorrect']
        });
      }
    }

    // Update user fields
    user.name = name.trim();
    user.email = email.trim().toLowerCase();
    
    if (req.user.role === 'student') {
      user.college = college.trim();
      user.rollNo = rollNo.trim();
    }

    // Update password if provided
    if (newPassword) {
      user.password = newPassword;
    }

    await user.save();

    // Generate new token
    const token = generateToken(user._id);

    res.json({
      message: 'Profile updated successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rollNo: user.rollNo,
        college: user.college
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    
    // Handle specific validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ 
        message: 'Update failed',
        errors: [`${field} already exists`]
      });
    }
    
    res.status(500).json({ 
      message: 'Server error',
      errors: ['An unexpected error occurred. Please try again.']
    });
  }
});

// @route   POST /api/auth/setup-admin
// @desc    Setup hardcoded admin (only if no admin exists)
// @access  Public (but should be protected in production)
router.post('/setup-admin', async (req, res) => {
  try {
    const adminExists = await User.checkAdminExists();
    
    if (adminExists) {
      return res.status(400).json({ 
        message: 'Setup failed',
        errors: ['Admin already exists. Only one admin is allowed.']
      });
    }

    // Create hardcoded admin
    const admin = await User.createHardcodedAdmin();

    // Generate token
    const token = generateToken(admin._id);

    res.status(201).json({
      message: 'Hardcoded admin created successfully',
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin setup error:', error);
    
    if (error.message === 'Admin already exists. Only one admin is allowed.') {
      return res.status(400).json({ 
        message: 'Setup failed',
        errors: [error.message]
      });
    }
    
    res.status(500).json({ 
      message: 'Server error',
      errors: ['An unexpected error occurred. Please try again.']
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        rollNo: req.user.rollNo,
        college: req.user.college
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      message: 'Server error',
      errors: ['An unexpected error occurred. Please try again.']
    });
  }
});

// @route   GET /api/auth/check-admin
// @desc    Check if admin exists
// @access  Public
router.get('/check-admin', async (req, res) => {
  try {
    const adminExists = await User.checkAdminExists();
    res.json({ adminExists });
  } catch (error) {
    console.error('Check admin error:', error);
    res.status(500).json({ 
      message: 'Server error',
      errors: ['An unexpected error occurred. Please try again.']
    });
  }
});

module.exports = router; 