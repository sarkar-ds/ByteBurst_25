const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Setup hardcoded admin on server start
const setupHardcodedAdmin = async () => {
  try {
    const adminExists = await User.checkAdminExists();
    
    if (!adminExists) {
      await User.createHardcodedAdmin();
      console.log('✅ Hardcoded admin created successfully');
      console.log('📧 Email: admin@gmail.com');
      console.log('🔑 Password: admin123456');
    } else {
      console.log('✅ Admin already exists');
    }
  } catch (error) {
    console.error('❌ Error setting up admin:', error.message);
  }
};

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    errors: ['An unexpected error occurred']
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    errors: ['The requested endpoint does not exist']
  });
});

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    if (process.env.MONGODB_URI) {
      await connectDB();
      console.log('✅ MongoDB connected successfully');
    } else {
      console.log('⚠️  MONGODB_URI not found in .env file');
      console.log('⚠️  Server will start without database connection');
    }

    // Setup hardcoded admin
    await setupHardcodedAdmin();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 