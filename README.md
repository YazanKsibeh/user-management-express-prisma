# User Management API

A REST API project for user management with authentication and role-based access control.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM

## Installation

1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env` and update with your database credentials
4. Run `npx prisma migrate dev` to set up the database
5. Run `npx prisma generate` to generate Prisma Client

## Running the Server

Start the development server with:

npm run dev

The server will run on `http://localhost:3000`. You can visit the root endpoint to see a health check response.

## Database Schema

User model fields:
- id : UUID
- name : Full name
- email : Email address
- passwordHash : Hashed password
- role : USER or ADMIN
- createdAt : Creation timestamp
- updatedAt : Last update timestamp

## API Endpoints

Base URL: `http://localhost:3000`

For authenticated endpoints, include the JWT token in the Authorization header:
Authorization: Bearer <token>

### Authentication

**POST /auth/register** - Register user (name, email, password, confirmPassword).

**POST /auth/login** - Login (email, password). Returns token + user.

### User Management

**GET /users** - List users (admin sees all, user sees self). Auth required.

**GET /users/:id** - Get user by ID (admin or owner).

**PUT /users/:id** - Update user (optional: name, email, password, role).

**DELETE /users/:id** - Delete user (admin or owner).

### Admin

**POST /admin/register** - Create admin (admin only).

## Testing

I've included a Postman collection (postman-collection.json) with test cases for all endpoints. Simply import it into Postman.

## Author

Yazan Ksibeh - yazan_ksibeh@outlook.com