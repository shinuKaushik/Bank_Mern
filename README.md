# Secure Banking Management System

A MERN role-based banking platform starter based on `spec.md`.

## Apps

- `server`: Express, MongoDB, JWT, bcrypt, Zod validation, RBAC, audit logs.
- `client`: React, Tailwind CSS, Redux Toolkit, React Router, Axios, React Hook Form.

## Setup

```bash
npm run install:all
cp server/.env.example server/.env
npm run dev
```

The API runs on `http://localhost:5000` by default and the client runs on Vite's default port.

## First Flow

1. Register a customer with a password and transaction PIN.
2. Log in to receive a JWT.
3. Deposit, withdraw, transfer, and view transaction history from customer routes.

