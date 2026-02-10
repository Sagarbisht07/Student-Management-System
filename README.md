# Student Management System

A full-stack Student Management System built with React, Node.js, Express, and SQLite.
Features include JWT Authentication, Role-Based Access Control (Admin vs User), and CRUD operations.

## Features
- **Authentication**: Login with email and password (JWT).
- **Role-Based Access**:
  - **Admin**: Full access (Create, Read, Update, Delete).
  - **User**: Read-only access (View Dashboard, View Student List/Details).
- **Student Management**: Manage student records (Name, Email, Age, Course, Status).
- **Tech Stack**: React (Vite), Node.js, Express, SQLite.

## Project Structure
- `backend/`: Node.js + Express API
- `frontend/`: React + Vite Client

## Prerequisites
- Node.js installed

## Setup Instructions

### 1. Backend Setup
1. Open a terminal in the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   # or
   node server.js
   ```
   The server runs on `http://localhost:5000`.
   The database `student_database.sqlite` will be created automatically in the project root.
   Admin and User accounts will be seeded automatically.

### 2. Frontend Setup
1. Open a new terminal in the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the browser at `http://localhost:5173`.

## Demo Credentials

| Role  | Email              | Password |
|-------|--------------------|----------|
| Admin | admin@example.com  | admin123 |
| User  | user@example.com   | user123  |

## API Endpoints (Backend)
- `POST /api/auth/login` - Login
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student (Admin only)
- `PUT /api/students/:id` - Update student (Admin only)
- `DELETE /api/students/:id` - Delete student (Admin only)

