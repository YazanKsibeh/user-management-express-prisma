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

## License

MIT

## Author

Yazan Ksibeh - yazan_ksibeh@outlook.com