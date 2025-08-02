# Technokratos Backend

Backend API for the Technokratos Management System with MongoDB Atlas integration and JWT authentication.

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/technokratos_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
PORT=5000
NODE_ENV=development
```

### 2. MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string and replace the MONGODB_URI in your .env file
5. Add your IP address to the IP whitelist

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register a new student
- `POST /api/auth/login` - Login user
- `POST /api/auth/create-admin` - Create admin (only if no admin exists)
- `GET /api/auth/me` - Get current user (requires auth)
- `GET /api/auth/check-admin` - Check if admin exists

### Request/Response Examples

#### Register Student
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "rollNo": "2021CSE001",
  "college": "MMMUT Gorakhpur"
}
```

#### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Create Admin
```json
POST /api/auth/create-admin
{
  "name": "Admin User",
  "email": "admin@mmmut.ac.in",
  "password": "admin123"
}
```

## Features

- ✅ MongoDB Atlas integration
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (student/admin)
- ✅ Single admin restriction
- ✅ CORS configuration
- ✅ Error handling
- ✅ Input validation

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS protection
- Input validation and sanitization
- Only one admin can exist in the system 