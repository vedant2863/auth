# Quick Start Guide

## Get Started in 3 Steps

### Step 1: Create Environment File
```bash
# Copy the example environment file
Copy-Item .env.example .env

# IMPORTANT: Edit .env and change the JWT_SECRET to a strong random string
# Minimum 32 characters for production security
```

### Step 2: Build and Run with Docker
```bash
# Build and start all services (MongoDB, Backend, Frontend)
docker-compose up --build
```

This will:
- Start MongoDB on port 27017
- Start Backend API on port 5000
- Start Frontend on port 3000

### Step 3: Test the Application

Open your browser: http://localhost:3000

#### Register a User
1. Click "Register" or go to http://localhost:3000/register
2. Fill in:
   - Name: Your Name
   - Date of Birth: Select a past date
   - Email: your@email.com
   - Password: password123
3. Click "Register"
4. You'll be automatically logged in and redirected to the Users page

#### View Protected Users Page
- The Users page shows all registered users
- Try logging out and accessing /users - you'll be redirected to login
- This demonstrates the protected route functionality

## Useful Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongo
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove all data (fresh start)
docker-compose down -v
```

### Test API Endpoints

#### Health Check
```bash
curl http://localhost:5000/health
```

#### Register (via curl)
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "dob": "1990-01-15",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login (via curl)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Get Users (Protected - requires token)
```bash
# Replace YOUR_TOKEN with the token from login response
curl http://localhost:5000/api/protected/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Troubleshooting

### Port Already in Use
If you see port conflicts:
- Change ports in docker-compose.yml
- Or stop the conflicting service

### MongoDB Connection Issues
```bash
# Check MongoDB is running
docker-compose ps

# Restart MongoDB
docker-compose restart mongo
```

### Clear Everything and Restart
```bash
docker-compose down -v
docker system prune -f
docker-compose up --build
```

## What's Included

✅ **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS  
✅ **Backend**: Node.js + Express + TypeScript  
✅ **Database**: MongoDB with Mongoose  
✅ **Authentication**: JWT + bcrypt password hashing  
✅ **Validation**: Zod (client & server)  
✅ **Security**: Helmet, CORS, Rate Limiting  
✅ **Testing**: Jest with example tests  
✅ **Docker**: Production-ready multi-stage builds  

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Customize the frontend UI and add more features
- Add more protected routes and functionality
- Deploy to production (see README for deployment guide)

---

**Need Help?** Check the main [README.md](README.md) for comprehensive documentation.
