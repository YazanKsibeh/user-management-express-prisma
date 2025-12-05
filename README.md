# User Management API

A REST API project for user management with authentication and role-based access control.

## Project Setup

This is the initial setup of the project.
The Express server is configured and the database schema is defined.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM

## Currently Implemented

- Express server running on port 3000
- CORS and JSON middleware configured
- Prisma schema with User model
- Database migrations setup
- User registration endpoint (POST /auth/register)
- User login endpoint (POST /auth/login) with JWT token generation
- Input validation with Zod schemas
- Password hashing with bcrypt

## Installation

1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env` and update with your database credentials
4. Run `npx prisma migrate dev` to set up the database
5. Run `npx prisma generate` to generate Prisma Client

## Running the Server

npm run dev
Visit `http://localhost:3000` to see the health check response.

## Database Schema

The User model includes:
- id, name, email, passwordHash, role, createdAt, updatedAt

Role can be either USER or ADMIN.

## API Endpoints

### Authentication

**POST /auth/register**
- Register a new user account
- Request body: `{ name, email, password, confirmPassword }`
- Password requirements: minimum 8 characters, must include number and uppercase letter
- Returns: User object (without password) and success message
- Status codes: 201 (success), 400 (validation error), 409 (email already exists)

**POST /auth/login**
- Login with email and password
- Request body: `{ email, password }`
- Returns: JWT token and user object
- Status codes: 200 (success), 400 (validation error), 401 (invalid credentials)

### Testing

A Postman collection is included in the repository with test cases for all endpoints. Import `postman-collection.json` into Postman to test the API.

## License

MIT

## Author

Yazan Ksibeh - yazan_ksibeh@outlook.com