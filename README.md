# MERN Stack Authentication System

A production-ready full-stack authentication system built with MongoDB, Express, React, and Node.js (MERN), all written in TypeScript with Docker Compose orchestration.

## 🚀 Features

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (HS256) with bcrypt password hashing
- **Validation**: Zod for both client and server-side validation
- **Security**: Helmet, CORS, rate limiting on auth routes
- **Docker**: Multi-stage builds with health checks
- **Testing**: Jest setup for backend unit tests
- **Code Quality**: ESLint + Prettier configured

## 📁 Project Structure

```
auth/
├── backend/                    # Backend Node.js + Express API
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   │   ├── database.ts     # MongoDB connection with pooling
│   │   │   ├── env.ts          # Environment variable validation
│   │   │   └── logger.ts       # Winston logger setup
│   │   ├── middleware/         # Express middleware
│   │   │   ├── auth.ts         # JWT authentication middleware
│   │   │   ├── errorHandler.ts
│   │   │   └── validate.ts     # Zod validation middleware
│   │   ├── models/             # Mongoose models
│   │   │   └── User.ts         # User schema with validation
│   │   ├── routes/             # API routes
│   │   │   ├── authRoutes.ts   # Register/Login endpoints
│   │   │   └── protectedRoutes.ts # Protected user endpoints
│   │   ├── utils/              # Utility functions
│   │   │   ├── __tests__/      # Unit tests
│   │   │   ├── jwt.ts          # JWT generation/verification
│   │   │   └── password.ts     # Bcrypt hashing/comparison
│   │   ├── validators/         # Zod schemas
│   │   │   └── authValidators.ts
│   │   ├── app.ts              # Express app configuration
│   │   └── server.ts           # Server startup with graceful shutdown
│   ├── scripts/
│   │   └── mongo-init.js       # MongoDB initialization script
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── Dockerfile              # Multi-stage production build
│   ├── healthcheck.js          # Docker healthcheck script
│   ├── jest.config.js
│   ├── package.json
│   └── tsconfig.json           # Strict TypeScript config
│
├── frontend/                   # Frontend React + TypeScript
│   ├── src/
│   │   ├── api/                # API service layer
│   │   │   ├── authService.ts  # Auth API calls
│   │   │   └── client.ts       # Axios client with interceptors
│   │   ├── components/         # React components
│   │   │   ├── Navbar.tsx
│   │   │   └── ProtectedRoute.tsx # Route guard component
│   │   ├── context/            # React context
│   │   │   └── AuthContext.tsx # Auth state management
│   │   ├── pages/              # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx       # Login form with validation
│   │   │   ├── Register.tsx    # Registration form
│   │   │   └── Users.tsx       # Protected users table
│   │   ├── types/              # TypeScript types
│   │   │   └── index.ts
│   │   ├── validation/         # Form validation schemas
│   │   │   └── schemas.ts      # Zod schemas for forms
│   │   ├── App.tsx             # Root component with routing
│   │   ├── main.tsx            # App entry point
│   │   └── index.css           # Tailwind CSS styles
│   ├── .eslintrc.cjs
│   ├── .prettierrc
│   ├── Dockerfile              # Multi-stage build with nginx
│   ├── nginx.conf              # Nginx configuration
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .env.example                # Environment variables template
├── .gitignore
├── docker-compose.yml          # Three services: mongo, backend, frontend
└── README.md                   # This file
```

## 🛠️ Prerequisites

- **Docker** (v20.10+)
- **Docker Compose** (v2.0+)
- **Node.js** (v20+) - only for local development without Docker
- **npm** or **yarn** - only for local development

## ⚙️ Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
# Backend Environment Variables
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://mongo:27017/mern_auth
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-minimum-32-chars
JWT_EXPIRATION=1h
BCRYPT_SALT_ROUNDS=10

# Frontend Environment Variables
VITE_API_URL=http://localhost:5000

# MongoDB Environment Variables
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password123
MONGO_INITDB_DATABASE=mern_auth
```

**⚠️ Important Security Notes:**
- Change `JWT_SECRET` to a strong random string (minimum 32 characters)
- Use different values for development and production
- Never commit `.env` file to version control

## 🚀 Quick Start with Docker

### 1. Clone and Setup

```bash
cd C:\data\project\auth
```

### 2. Create Environment File

```bash
cp .env.example .env
# Edit .env and update JWT_SECRET and other values
```

### 3. Build and Run

```bash
docker-compose up --build
```

This will:
- Build the backend API (Node.js + Express)
- Build the frontend (React + Vite)
- Start MongoDB with health checks
- Expose services on:
  - Frontend: http://localhost:3000
  - Backend API: http://localhost:5000
  - MongoDB: localhost:27017

### 4. Access the Application

Open your browser and navigate to: http://localhost:3000

## 🧪 Testing the Application

### 1. Register a New User

1. Go to http://localhost:3000/register
2. Fill in the registration form:
   - **Name**: John Doe
   - **Date of Birth**: 1990-01-15
   - **Email**: john@example.com
   - **Password**: password123
3. Click "Register"
4. Upon success, you'll be redirected to the Users page

### 2. Login

1. Go to http://localhost:3000/login
2. Enter credentials:
   - **Email**: john@example.com
   - **Password**: password123
3. Click "Sign in"
4. You'll be redirected to the protected Users page

### 3. View Protected Users Page

- The `/users` route is protected
- If not authenticated, you'll be redirected to `/login`
- Once logged in, you can view all registered users in a table
- JWT token is stored in localStorage
- Token is automatically sent in `Authorization` header for API requests

### 4. Logout

- Click the "Logout" button in the navbar
- Token and user data are removed from localStorage
- You'll be redirected to the home page

## 📡 API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "dob": "1990-01-15",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "dob": "1990-01-15T00:00:00.000Z",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /api/auth/login
Login an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "dob": "1990-01-15T00:00:00.000Z",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Protected Endpoints

All protected endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### GET /api/protected/users
Get all registered users.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "users": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "dob": "1990-01-15T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /api/protected/profile
Get current user profile.

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "dob": "1990-01-15T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Health Check

#### GET /health
Check if the backend is running.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 💻 Local Development (Without Docker)

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Create .env file with local MongoDB URI
# MONGO_URI=mongodb://localhost:27017/mern_auth

# Run in development mode (with hot reload)
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Build for production
npm run build

# Start production build
npm start
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Run development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🐳 Docker Commands

### Build and start all services
```bash
docker-compose up --build
```

### Start services (without rebuild)
```bash
docker-compose up
```

### Stop all services
```bash
docker-compose down
```

### Stop and remove volumes (clean slate)
```bash
docker-compose down -v
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongo
```

### Rebuild specific service
```bash
docker-compose up --build backend
docker-compose up --build frontend
```

## 🔒 Security Features

### Backend Security
- **Helmet**: Sets security-related HTTP headers
- **CORS**: Configured to accept requests from frontend origin
- **Rate Limiting**: 10 requests per 15 minutes for auth endpoints
- **Password Hashing**: Bcrypt with configurable salt rounds (default: 10)
- **JWT**: HS256 algorithm with configurable expiration (default: 1h)
- **Input Validation**: Zod schemas validate all request bodies
- **Error Handling**: Centralized error handler, no sensitive data leaked
- **Non-root User**: Docker containers run as non-root user

### Frontend Security
- **JWT Storage**: Token stored in localStorage (consider httpOnly cookies for production)
- **Protected Routes**: Route guards redirect unauthenticated users
- **Form Validation**: Client-side validation with Zod before API calls
- **Error Handling**: User-friendly error messages

## 🎯 Optimization Features

### Backend Optimizations
- **Multi-stage Docker Build**: Separate dependency, build, and production stages
- **Layer Caching**: Optimized Dockerfile for faster rebuilds
- **Connection Pooling**: MongoDB connection pool (min: 2, max: 10)
- **Graceful Shutdown**: Proper cleanup of connections on termination
- **Health Checks**: Docker health checks for backend and MongoDB
- **Environment Validation**: Zod validates environment variables on startup

### Frontend Optimizations
- **Code Splitting**: React.lazy() + Suspense for route-based splitting
- **Vite**: Fast build tool with ESBuild
- **Production Build**: Optimized bundle with minification
- **Multi-stage Build**: Build in Node container, serve with nginx
- **nginx**: Lightweight web server for production
- **Tailwind CSS**: Utility-first CSS with PurgeCSS

## 🧪 Testing

### Backend Tests

The project includes Jest setup with example tests for password utilities.

```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

**Test Files:**
- `src/utils/__tests__/password.test.ts` - Password hashing and comparison
- `src/utils/__tests__/jwt.test.ts` - JWT generation and verification

### Adding More Tests

Create test files in `__tests__` directories or with `.test.ts` suffix:

```typescript
// Example: src/routes/__tests__/authRoutes.test.ts
import request from 'supertest';
import { createApp } from '../../app';

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const app = createApp();
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        dob: '1990-01-01',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
```

## 🔧 Troubleshooting

### MongoDB Connection Issues

If backend fails to connect to MongoDB:

1. Check if MongoDB container is healthy:
   ```bash
   docker-compose ps
   ```

2. Check MongoDB logs:
   ```bash
   docker-compose logs mongo
   ```

3. Verify MONGO_URI in .env file

### Port Already in Use

If ports 3000, 5000, or 27017 are already in use:

1. Stop the conflicting service, or
2. Change ports in docker-compose.yml

### Frontend Can't Connect to Backend

1. Ensure VITE_API_URL is set correctly in .env
2. Check backend is running: http://localhost:5000/health
3. Verify CORS settings in backend/src/app.ts

### Docker Build Fails

1. Clear Docker cache:
   ```bash
   docker-compose down
   docker system prune -a
   docker-compose up --build
   ```

2. Check Docker logs for specific errors

## 📚 Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM with connection pooling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Zod** - Schema validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - Rate limiting
- **Winston** - Logging
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool with ESBuild
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Zod** - Form validation
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS
- **ESLint** - Code linting
- **Prettier** - Code formatting

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **nginx** - Production web server

## 📝 License

MIT

## 👨‍💻 Development Notes

### Code Style
- Strict TypeScript mode enabled
- ESLint + Prettier configured for consistent formatting
- Functional components with hooks in React
- Async/await for asynchronous operations

### Best Practices Implemented
- Environment variable validation
- Centralized error handling
- Request validation middleware
- Graceful shutdown handlers
- Connection pooling
- Rate limiting on sensitive endpoints
- Non-root Docker users
- Multi-stage Docker builds
- Health checks
- Code splitting
- Protected routes

## 🚀 Production Deployment

For production deployment:

1. **Update Environment Variables**
   - Generate strong JWT_SECRET (32+ characters)
   - Use production MongoDB URI
   - Set NODE_ENV=production

2. **Security Enhancements**
   - Use HTTPS/TLS certificates
   - Configure CORS with specific frontend URL
   - Consider httpOnly cookies instead of localStorage
   - Set up rate limiting based on traffic
   - Use secrets management (AWS Secrets Manager, Vault)

3. **Infrastructure**
   - Use managed MongoDB service (MongoDB Atlas, AWS DocumentDB)
   - Deploy backend to container orchestration (Kubernetes, ECS)
   - Use CDN for frontend static assets
   - Set up monitoring and alerting
   - Configure log aggregation

4. **Docker Compose for Production**
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

---

**Happy Coding! 🎉**
