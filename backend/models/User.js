const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  rollNo: {
    type: String,
    required: function() { return this.role === 'student'; },
    unique: function() { return this.role === 'student'; },
    trim: true
  },
  college: {
    type: String,
    required: function() { return this.role === 'student'; },
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if admin exists
userSchema.statics.checkAdminExists = async function() {
  const admin = await this.findOne({ role: 'admin' });
  return !!admin;
};

// Create hardcoded admin (only if no admin exists)
userSchema.statics.createHardcodedAdmin = async function() {
  const adminExists = await this.checkAdminExists();
  
  if (adminExists) {
    throw new Error('Admin already exists. Only one admin is allowed.');
  }

  const admin = new this({
    name: 'System Administrator',
    email: 'admin@gmail.com',
    password: 'admin123456',
    role: 'admin'
  });

  await admin.save();
  return admin;
};

module.exports = mongoose.model('User', userSchema); 